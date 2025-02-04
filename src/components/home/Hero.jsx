import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ScrollFadeOut } from '../animations/ScrollFadeOut';
import { ChevronDown } from 'lucide-react';
import backgroundImage from '../../assets/background.jpg';
import { useLoading } from '../../contexts/LoadingContext';

const Hero = () => {
  const heroRef = useRef(null);
  const storyRef = useRef(null);
  const { setIsLoading } = useLoading();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000); // Adjust timing as needed
    return () => clearTimeout(timer);
  }, [setIsLoading]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2,
        when: "beforeChildren"
      }
    }
  };

  const itemVariants = {
    hidden: { 
      opacity: 0,
      y: 20
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  };

  const backgroundVariants = {
    hidden: { opacity: 0, scale: 1.1 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 1.2,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  };

  const scrollToStory = () => {
    const storySection = document.getElementById('story');
    if (storySection) {
      storySection.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  return (
    <motion.section
      ref={heroRef}
      className="relative min-h-screen z-10"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      onAnimationComplete={() => setIsLoading(false)}
    >
      {/* Background with Tint */}
      <motion.div 
        className="fixed inset-0 w-full h-full z-[-1]"
        initial="hidden"
        animate="visible"
        variants={backgroundVariants}
      >
        <img
          src={backgroundImage}
          alt="Hero Background"
          className="w-full h-full object-cover"
        />
        <div 
          className="absolute inset-0 bg-black/15" 
          style={{ mixBlendMode: 'multiply' }}
        />
      </motion.div>

      {/* Moving Content */}
      <motion.div 
        className="relative min-h-screen flex items-center justify-center"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <div className="relative z-10 text-center px-4">
          <motion.div variants={itemVariants}>
            <ScrollFadeOut
              yOffset={0.4}
              scale={1.3}
              fadePoint={0.3}
              exitPoint={0.6}
            >
              <h1 className="sr-only">Tipsy Turk - Rooftop & Bar Restaurant in Sadar, Nagpur</h1>
              <div 
                aria-hidden="true"
                className="block text-[150px] mb-4 leading-[1.1] text-[#C69545]" 
                style={{ fontFamily: 'BillyOhio' }}
              >
                Tipsy Turk
              </div>
            </ScrollFadeOut>
          </motion.div>

          <motion.div variants={itemVariants}>
            <ScrollFadeOut
              delay={0.2}
              yOffset={0.2}
              scale={1.1}
              fadePoint={0.5}
              exitPoint={0.4}
            >
              <p className="text-2xl tracking-wide text-white font-reforma-bold">
              An experience that awakens all the senses
              </p>
            </ScrollFadeOut>
          </motion.div>
        </div>

        {/* Scroll Down Button */}
        <motion.button
          onClick={scrollToStory}
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-12 h-24 bg-white flex flex-col items-center justify-center rounded-t-full cursor-pointer shadow-lg"
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          transition={{
            duration: 0.8,
            delay: 1,
            ease: [0.22, 1, 0.36, 1]
          }}
          whileHover={{ y: -5 }}
          whileTap={{ y: 0 }}
          variants={itemVariants}
        >
          <motion.div
            animate={{
              y: [0, 5, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <ChevronDown
              size={24}
              className="text-[#212b49]"
            />
          </motion.div>
        </motion.button>
      </motion.div>
    </motion.section>
  );
};

export default Hero;