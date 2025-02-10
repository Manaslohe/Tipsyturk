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
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
        />

        <motion.div
          key="modal"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 
                   w-[92%] max-w-2xl z-50 bg-gradient-to-b from-[#1F2937] to-[#111827] rounded-2xl 
                   overflow-hidden shadow-2xl border border-gray-800"
        >
          {/* Design Elements */}
          <div className="absolute top-0 left-0 w-40 h-40 bg-amber-500/10 
                        rounded-full -translate-x-1/2 -translate-y-1/2 blur-md" />
          <div className="absolute bottom-0 right-0 w-48 h-48 bg-amber-500/10 
                        rounded-full translate-x-1/2 translate-y-1/2 blur-md" />
          
          {/* Top Pattern */}
          <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-amber-500/20 to-transparent" />
          
          {/* Close Button - Updated */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onClose();
            }}
            className="absolute right-4 top-4 p-2.5 text-gray-400 hover:text-white
                      bg-black/20 hover:bg-black/40 rounded-full transition-all
                      border border-gray-700 hover:border-gray-600
                      transform hover:scale-105 z-50"
          >
            <X size={20} />
          </button>

          {/* Content */}
          <div className="relative p-8 sm:p-10">
            <div className="flex flex-col items-center text-center">
              <motion.img
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                src="/logo.jpg"
                alt="Tipsy Turk Logo"
                className="w-28 h-28 object-contain mb-8 rounded-full 
                        border-2 border-amber-500/50 shadow-lg shadow-amber-500/10"
              />

              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-4xl sm:text-5xl font-bold text-white mb-8"
                style={{ fontFamily: 'Reforma2018-Blanca' }}
              >
                About Us
              </motion.h2>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="space-y-6 mb-8"
              >
                <p className="text-gray-300 text-lg leading-relaxed">
                  Nestled in the heart of Sadar, Nagpur, Tipsy Turk is a vibrant rooftop 
                  restaurant and bar offering a fusion of Turkish, Middle Eastern, and 
                  Indian flavors. Known for its lively ambiance, delicious platters, and 
                  refreshing mocktails, it's the perfect spot for casual hangouts, date 
                  nights, and celebrations.
                </p>
                <p className="text-amber-400 text-xl font-medium italic">
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
