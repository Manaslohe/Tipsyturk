import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

const AboutPopup = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <>
        <motion.div
          key="backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
        />

        <motion.div
          key="modal"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 
                   w-[95%] max-w-3xl z-50 bg-gradient-to-b from-[#1F2937] to-[#111827] rounded-2xl 
                   overflow-hidden shadow-2xl border border-gray-800"
        >
          {/* Design Elements */}
          <div className="absolute top-0 left-0 w-72 h-72 bg-amber-500/10 
                        rounded-full -translate-x-1/2 -translate-y-1/2 blur-xl" />
          <div className="absolute bottom-0 right-0 w-72 h-72 bg-amber-500/10 
                        rounded-full translate-x-1/2 translate-y-1/2 blur-xl" />
          
          {/* Top Pattern */}
          <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-amber-500/30 to-transparent" />
          
          {/* Close Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onClose();
            }}
            className="absolute right-5 top-5 p-2.5 text-gray-400 hover:text-white
                      bg-black/30 hover:bg-black/50 rounded-full transition-all
                      border border-gray-700 hover:border-gray-500
                      transform hover:scale-105 z-50"
          >
            <X size={22} />
          </button>

          {/* Content */}
          <div className="relative px-6 py-12 sm:p-12">
            <div className="flex flex-col items-center text-center max-w-2xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="relative mb-10"
              >
                <img
                  src="/logo.jpg"
                  alt="Tipsy Turk Logo"
                  className="w-48 h-48 sm:w-56 sm:h-56 object-contain
                          transform hover:scale-105 transition-all duration-500"
                />
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-4xl sm:text-5xl font-bold text-transparent bg-clip-text 
                          bg-amber-500 mb-8"
                style={{ fontFamily: 'Reforma2018-Blanca' }}
              >
                About Us
              </motion.h2>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="space-y-6"
              >
                <p className="text-gray-300 text-lg leading-relaxed">
                  Nestled in the heart of Sadar, Nagpur, Tipsy Turk is a vibrant rooftop 
                  restaurant and bar offering a fusion of Turkish, Middle Eastern, and 
                  Indian flavors. Known for its lively ambiance, delicious platters, and 
                  refreshing mocktails, it's the perfect spot for casual hangouts, date 
                  nights, and celebrations.
                </p>
                <p className="text-amber-400/90 text-xl font-medium italic">
                  Tipsy Turk brings a delightful mix of global and local cuisines to your plate.
                </p>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </>
    </AnimatePresence>
  );
};

export default AboutPopup;
