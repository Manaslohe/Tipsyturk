import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import MenuPopup from '../reservation/MenuPopup';
import { usePopup } from '../../contexts/PopupContext';

const Menu = () => {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [100, 0, 0, -100]);

  const { isPopupOpen, setIsPopupOpen } = usePopup();

  const images = [
    {
      url: "/gallery/Food/6.JPG",
      alt: "Fresh salad with lime garnish"
    },
    {
      url: "/gallery/Food/13.JPG",
      alt: "Lemons and condiments on a serving tray"
    },
    {
      url: "/gallery/Food/5.JPG",
      alt: "Pasta dish with red sauce"
    },
    {
      url: "/gallery/Food/10.JPG",
      alt: "Plated dish with purple cabbage"
    }
  ];

  return (
    <>
      <motion.section 
        id="menu"
        ref={sectionRef}
        style={{ opacity }}
        className="min-h-[90vh] bg-white py-16"
      >
        <motion.div 
          style={{ y }}
          className="container mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 items-center gap-16"
        >
          {/* Left side - Image Grid */}
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-2 gap-4 max-w-3xl mx-auto w-full"
          >
            {images.map((image, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="relative overflow-hidden rounded-lg"
              >
                <img
                  src={image.url}
                  alt={image.alt}
                  className="h-60 w-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </motion.div>
            ))}
          </motion.div>

          {/* Right side - Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-center justify-center text-center max-w-2xl mx-auto w-full"
          >
            <h2 className="mb-12">
              <span 
                className="block text-8xl text-amber-500 mb-2" 
                style={{ fontFamily: 'BillyOhio' }}
              >
                Check out
              </span>
              <span className="block text-7xl font-bold font-serif-ui text-[#423421]">
                Our Menus
              </span>
            </h2>

            {/* Decorative Divider */}
            <div className="flex items-center justify-center py-4">
              <div className="w-16 h-px bg-amber-500"></div>
              <svg 
                viewBox="0 0 31 20" 
                className="w-8 h-8 mx-4 text-amber-500"
                fill="currentColor"
              >
                <path d="M30.721 6.3114c0 .599-.2647 1.1494-.7941 1.651-5.6984 1.4768-8.7774 2.2153-9.2372 2.2153-.5434 0-.815-.1394-.815-.418 0-.2229.3204-.5294.9613-.9195 2.9816-1.6161 4.5072-2.4381 4.5768-2.466 1.3375-.6548 2.4243-.9822 3.2602-.9822 1.031 0 1.5465.4389 1.5465 1.3166zm-4.8485-3.1766c0 .4598-.3553 1.0031-1.0658 1.63-.3901.3345-1.3654 1.059-2.9258 2.1735-2.9676 2.1178-4.6604 3.1766-5.0784 3.1766-.209 0-.3762-.1393-.5016-.418l.2508-.585c.836-.8639 1.7346-1.8531 2.696-2.9677 1.0309-1.1982 1.637-1.8948 1.8181-2.0899 1.4908-1.5743 2.7796-2.3615 3.8663-2.3615.6269 0 .9404.4807.9404 1.442z" />
              </svg>
              <div className="w-16 h-px bg-amber-500"></div>
            </div>

            <p className="text-xl text-zinc-700 mb-8 max-w-lg">
              For those with pure food indulgence in mind, come next door and 
              sate your desires with our ever-changing internationally and 
              seasonally inspired small plates. We love food, lots of 
              different food, just like you.
            </p>

            <div className="inline-block relative">
              <motion.button 
                onClick={() => setIsPopupOpen(true)}
                className="group relative inline-flex items-center gap-2 px-8 py-3"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.2 }}
              >
                {/* Border container with animation */}
                <div className="absolute inset-0 rounded-full border-2 border-amber-500 transition-all duration-300 group-hover:border-amber-600" />
                
                {/* Content */}
                <span 
                  style={{ fontFamily: 'Reforma2018-Blanca' }} 
                  className="relative text-xl font-bold text-amber-500 group-hover:text-amber-600 transition-colors duration-200"
                >
                  View the Food Menu
                </span>
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      </motion.section>

      <MenuPopup 
        isOpen={isPopupOpen} 
        onClose={() => setIsPopupOpen(false)} 
      />
    </>
  );
};

export default Menu;