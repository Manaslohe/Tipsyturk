import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { usePopup } from '../../contexts/PopupContext';
import { useLoading } from '../../contexts/LoadingContext';

const navItems = [
  { label: "Story", href: "#story" },
  { label: "Menu", href: "#menu" },
  { label: "Contact", href: "#contact" },
  { label: "About", href: "#about" },
  { label: "Reservations", href: "#reservations", highlight: true },
  { label: "Gallery", href: "#gallery" }
];

const AnnouncementBar = ({ isVisible, onVisibilityChange }) => {
  const { isLoading } = useLoading();
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (date) => {
    return date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ 
            height: 60, 
            opacity: 1,
            transition: {
              height: { delay: isLoading ? 2.5 : 0, duration: 0.3 },
              opacity: { delay: isLoading ? 2.7 : 0, duration: 0.3 }
            }
          }}
          exit={{ height: 0, opacity: 0 }}
          className="bg-[#212b49] text-white fixed w-full top-0 z-[20]"
        >
          <motion.div 
            className="container mx-auto h-[60px] flex items-center justify-center"
            initial={{ opacity: 0, y: -10 }}
            animate={{ 
              opacity: 1, 
              y: 0,
              transition: {
                delay: isLoading ? 2.8 : 0,
                duration: 0.3
              }
            }}
          >
            <span className="text-lg tracking-wide font-[Reforma2018-Blanca]">
              It's <span className="font-bold">{formatTime(currentTime)}</span> and we're Open until 1:00 AM
            </span>
            <button
              onClick={() => onVisibilityChange(false)}
              className="absolute right-4 hover:opacity-75 transition-opacity"
            >
              <X size={20} />
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const Navigation = () => {
  const [scrollState, setScrollState] = useState({
    isScrolled: false,
    isAtTop: true
  });
  const [isAnnounceVisible, setIsAnnounceVisible] = useState(true);
  const lastScrollY = useRef(0);
  const hasClosedAnnouncement = useRef(false);
  const { isLoading } = useLoading();

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const scrollThreshold = 50; // Earlier threshold for announcement close

      // Update scroll states
      setScrollState({
        isScrolled: currentScrollY > 100,
        isAtTop: currentScrollY < 100
      });

      // Close announcement bar before navbar reaches top
      if (currentScrollY > scrollThreshold && !hasClosedAnnouncement.current) {
        setIsAnnounceVisible(false);
        hasClosedAnnouncement.current = true;
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navbarClasses = `
    fixed w-full transition-all duration-300
    ${isAnnounceVisible ? 'top-[60px]' : 'top-0'}
    ${scrollState.isScrolled 
      ? 'bg-white/90 backdrop-blur-md shadow-lg text-gray-900' 
      : 'bg-transparent text-white'}
  `;

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <>
      <AnnouncementBar 
        isVisible={isAnnounceVisible && !hasClosedAnnouncement.current}
        onVisibilityChange={(value) => {
          setIsAnnounceVisible(value);
          if (!value) hasClosedAnnouncement.current = true;
        }}
      />
      <motion.nav
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: isLoading ? 1.8 : 0, duration: 0.5 }}
        className={navbarClasses}
      >
        <div className="max-w-screen-2xl mx-auto">
          <div className="flex items-center justify-between h-24">
            {/* Left Navigation */}
            <div className="hidden lg:flex items-center space-x-8 pl-4">
              {navItems.slice(0, 4).map((item, index) => (
                <NavLink key={item.label} {...item} index={index} isPastHero={scrollState.isScrolled} />
              ))}
            </div>

            {/* Logo */}
            <button
              onClick={scrollToTop}
              className="absolute left-1/2 -translate-x-1/2 hover:opacity-90 transition-opacity"
            >
              <img
                src="/logo.jpg"
                alt="Rosa Logo"
                className={`
                  h-[60px] w-auto transition-all duration-300
                  ${scrollState.isScrolled ? 'scale-90' : 'scale-100'}
                  object-contain
                  lg:h-[70px]
                `}
                style={{
                  filter: scrollState.isScrolled ? 'none' : 'brightness(1.2)'
                }}
              />
            </button>

            {/* Right Navigation */}
            <div className="hidden lg:flex items-center space-x-8 pr-4">
              {navItems.slice(4).map((item, index) => (
                <NavLink key={item.label} {...item} index={index} isPastHero={scrollState.isScrolled} />
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button className="lg:hidden p-2">
              <div className="w-6 h-0.5 bg-current mb-1.5" />
              <div className="w-6 h-0.5 bg-current mb-1.5" />
              <div className="w-6 h-0.5 bg-current" />
            </button>
          </div>
        </div>
      </motion.nav>
    </>
  );
};

const NavLink = ({ label, href, isPastHero, highlight, index }) => {
  const { isLoading } = useLoading();
  
  return (
    <motion.a
      href={href}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        delay: isLoading ? 2 + (index * 0.1) : 0,
        duration: 0.5
      }}
      className={`
        relative text-lg tracking-wide font-bold transition-colors
        group overflow-hidden py-2
        ${highlight ? 'text-amber-500 hover:text-amber-600' : 
          isPastHero ? 'hover:text-gray-600' : 'hover:text-white/80'}
      `}
    >
      {label}
      <span 
        className={`
          absolute bottom-0 left-0 w-full h-[2px] 
          translate-x-[-100%] group-hover:translate-x-0
          transition-transform duration-300 ease-out
          ${highlight ? 'bg-amber-500' : 'bg-amber-400'}
        `}
        style={{
          transformOrigin: 'left'
        }}
      />
    </motion.a>
  );
};

const Header = () => {
  const { isPopupOpen } = usePopup();
  if (isPopupOpen) return null;

  return (
    <div className="nav-wrapper fixed w-full">
      <Navigation />
    </div>
  );
};

export default Header;