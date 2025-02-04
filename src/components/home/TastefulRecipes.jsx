import React, { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import frontPageMenu from '/frontpage-menu.jpg';

const TastefulRecipes = () => {
  const parallaxRef = useRef(null);
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  // Simplified transform values
  const textOpacity = useTransform(
    scrollYProgress,
    [0, 0.3, 0.7, 1],
    [1, 1, 1, 0]
  );

  useEffect(() => {
    const handleScroll = () => {
      if (!parallaxRef.current || !sectionRef.current) return;
      
      const rect = sectionRef.current.getBoundingClientRect();
      const scrollPercentage = (window.innerHeight - rect.top) / (window.innerHeight + rect.height);
      const moveAmount = Math.max(0, Math.min(1, scrollPercentage)) * 150; // 150px max movement
      
      parallaxRef.current.style.transform = `translateY(-${moveAmount}px)`;
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const sectionVariants = {
    hidden: { y: 100, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  };

  const textVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut",
        staggerChildren: 0.2,
        delayChildren: 0.3,
      }
    }
  };

  const spanVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  return (
    <motion.section 
      ref={sectionRef}
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      className="relative h-[50vh] bg-black z-20 overflow-hidden"
    >
      {/* Background Container */}
      <div className="absolute inset-0">
        <motion.div 
          ref={parallaxRef}
          className="absolute inset-0 h-[130%] w-full top-0"
          style={{ willChange: 'transform' }}
        >
          <img
            src={frontPageMenu}
            alt="Tasteful Recipes Background"
            className="absolute top-0 w-full h-full object-cover object-top"
          />
          <div className="absolute inset-0 bg-black/15" />
        </motion.div>
      </div>

      {/* Content */}
      <motion.div 
        className="relative h-full z-10 flex items-center justify-center"
        style={{ opacity: textOpacity }}
      >
        <motion.div 
          className="text-center"
          variants={textVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <h2>
            <motion.span 
              variants={spanVariants}
              className="block text-[120px] text-amber-500 leading-none mb-2" 
              style={{ fontFamily: 'BillyOhio' }}
            >
              Tasteful
            </motion.span>
            <motion.span 
              variants={spanVariants}
              className="block text-6xl font-bold text-white tracking-wider"
            >
              Recipes
            </motion.span>
          </h2>
        </motion.div>
      </motion.div>
    </motion.section>
  );
};

export default TastefulRecipes;
