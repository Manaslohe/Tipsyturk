import { motion } from 'framer-motion';

const PageTransition = () => {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100]"
    >
      {/* First Layer - Quick sweep */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{
          scaleX: [0, 1, 1, 0],
          transition: {
            duration: 2,
            times: [0, 0.4, 0.6, 1],
            ease: [0.645, 0.045, 0.355, 1]
          }
        }}
        className="absolute inset-0 origin-left bg-amber-500"
      />

      {/* Second Layer - Following sweep */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{
          scaleX: [0, 1, 1, 0],
          transition: {
            duration: 2,
            times: [0, 0.4, 0.6, 1],
            ease: [0.645, 0.045, 0.355, 1],
            delay: 0.1
          }
        }}
        className="absolute inset-0 origin-left bg-[#1a1a2e]"
      />

      {/* Logo Animation */}
      <motion.div
        initial={{ opacity: 0, scale: 0.3 }}
        animate={{
          opacity: [0, 1, 1, 0],
          scale: [0.3, 1, 1, 0.3],
          transition: {
            duration: 2,
            times: [0, 0.4, 0.6, 1],
            ease: [0.645, 0.045, 0.355, 1]
          }
        }}
        className="absolute inset-0 flex items-center justify-center"
      >
        <img
          src="/logo.jpg"
          alt="Logo"
          className="w-64 h-64 object-contain rounded-full" // Changed from w-24 h-24 to w-64 h-64
        />
      </motion.div>
    </motion.div>
  );
};

export default PageTransition;
