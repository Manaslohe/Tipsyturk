import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

export const ScrollFadeOut = ({ 
  children, 
  yOffset = 0.3,
  scale = 1.2,
  delay = 0,
  duration = 0.8,
  fadePoint = 0.4,
  exitPoint = 0.5
}) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });

  const contentOpacity = useTransform(
    scrollYProgress,
    [0, fadePoint, 1],
    [1, 0.5, 0]
  );

  const contentY = useTransform(
    scrollYProgress,
    [0, exitPoint, 1],
    [0, -50, -100]
  );

  const contentScale = useTransform(
    scrollYProgress,
    [0, exitPoint, 1],
    [1, scale, scale * 1.1]
  );

  return (
    <motion.div
      ref={ref}
      style={{
        y: contentY,
        scale: contentScale,
        opacity: contentOpacity
      }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: duration,
        delay: delay,
        ease: [0.22, 1, 0.36, 1]
      }}
    >
      {children}
    </motion.div>
  );
};
