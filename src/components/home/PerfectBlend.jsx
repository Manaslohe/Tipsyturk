import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const PerfectBlend = () => {
  const sectionRef = useRef(null);
  const contentRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [-50, 150]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.1, 1, 0.9]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const textY = useTransform(scrollYProgress, [0, 0.5, 1], [50, 0, -50]);

  return (
    <motion.section 
      ref={sectionRef}
      className="relative h-[70vh] overflow-hidden bg-zinc-900"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
    >
      {/* Background with enhanced parallax */}
      <motion.div 
        className="absolute inset-0 z-0"
        style={{ y, scale, opacity }}
      >
        <div 
          className="absolute inset-0 -top-20 bg-center bg-cover bg-no-repeat scale-125"
          style={{
            backgroundImage: 'url(/make-a-reservation.jpg)',
            backgroundAttachment: 'fixed'
          }}
        >
          <div className="absolute inset-0 bg-black/40" />
        </div>
      </motion.div>

      {/* Content with floating animation */}
      <motion.div 
        ref={contentRef}
        className="relative z-10 flex items-center justify-center h-full"
        style={{ y: textY }}
      >
        <motion.div 
          className="text-center text-white"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ 
            duration: 0.8,
            type: "spring",
            stiffness: 100 
          }}
        >
          <h2 className="flex flex-col items-center gap-4">
            <span 
              className="block text-9xl text-amber-500" 
              style={{ fontFamily: 'BillyOhio' }}
            >
              The perfect
            </span>
            <span className="block text-6xl font-bold font-serif">
              Blend
            </span>
          </h2>
        </motion.div>
      </motion.div>
    </motion.section>
  );
};

export default PerfectBlend;
