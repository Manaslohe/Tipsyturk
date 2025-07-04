import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const DownloadMenuPopup = ({ isOpen, onClose, onOpenChange }) => {
  // Notify parent when open/close state changes
  useEffect(() => {
    if (onOpenChange) onOpenChange(isOpen);
    // Optionally clean up on unmount
    return () => {
      if (onOpenChange) onOpenChange(false);
    };
  }, [isOpen, onOpenChange]);

  const downloadPDF = (filename, displayName) => {
    const link = document.createElement('a');
    link.href = `/${filename}`;
    link.download = filename;
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="fixed inset-0 z-[1000001] flex items-center justify-center p-4" // increased z-index above MenuPopup
          style={{ backgroundColor: 'rgba(0, 0, 0, 0.8)' }}
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 50 }}
            transition={{ 
              duration: 0.5,
              type: "spring",
              damping: 25,
              stiffness: 300
            }}
            className="relative bg-white rounded-2xl max-w-3xl w-full max-h-[95vh] overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
            style={{
              // Always allow vertical scroll on mobile/tablet, and ensure popup fills viewport height
              maxHeight: '95vh',
              height: 'auto',
              overflowY: 'auto',
              // On small screens, fill almost the whole viewport
              ...(window.innerWidth <= 640 ? { height: '95vh', maxHeight: '95vh' } : {})
            }}
          
          > 
            {/* Close button */}
            <motion.button
              onClick={onClose}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.3 }}
              whileHover={{ scale: 1.1, backgroundColor: "rgba(239, 68, 68, 0.1)" }}
              whileTap={{ scale: 0.9 }}
              className="absolute top-6 right-6 z-20 w-10 h-10 flex items-center justify-center rounded-full bg-white border border-gray-200 hover:border-red-300 transition-all duration-300 shadow-lg"
            >
              <svg className="w-4 h-4 text-gray-600 hover:text-red-500 transition-colors duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </motion.button>

            {/* Header */}
            <motion.div 
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="text-center py-10 px-8 bg-gradient-to-b from-white to-gray-50 border-b border-gray-100"
            >
              <h2 className="mb-6">
                <motion.span 
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                  className="block text-6xl text-amber-500 mb-3" 
                  style={{ fontFamily: 'BillyOhio' }}
                >
                  Download
                </motion.span>
                <motion.span 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.5 }}
                  className="block text-4xl font-bold font-serif-ui text-[#423421]"
                >
                  Our Menus
                </motion.span>
              </h2>
              
              {/* Decorative Divider */}
              <motion.div 
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6, duration: 0.5 }}
                className="flex items-center justify-center py-4"
              >
                <div className="w-16 h-px bg-amber-500"></div>
                <svg 
                  viewBox="0 0 31 20" 
                  className="w-8 h-8 mx-4 text-amber-500"
                  fill="currentColor"
                >
                  <path d="M30.721 6.3114c0 .599-.2647 1.1494-.7941 1.651-5.6984 1.4768-8.7774 2.2153-9.2372 2.2153-.5434 0-.815-.1394-.815-.418 0-.2229.3204-.5294.9613-.9195 2.9816-1.6161 4.5072-2.4381 4.5768-2.466 1.3375-.6548 2.4243-.9822 3.2602-.9822 1.031 0 1.5465.4389 1.5465 1.3166zm-4.8485-3.1766c0 .4598-.3553 1.0031-1.0658 1.63-.3901.3345-1.3654 1.059-2.9258 2.1735-2.9676 2.1178-4.6604 3.1766-5.0784 3.1766-.209 0-.3762-.1393-.5016-.418l.2508-.585c.836-.8639 1.7346-1.8531 2.696-2.9677 1.0309-1.1982 1.637-1.8948 1.8181-2.0899 1.4908-1.5743 2.7796-2.3615 3.8663-2.3615.6269 0 .9404.4807.9404 1.442z" />
                </svg>
                <div className="w-16 h-px bg-amber-500"></div>
              </motion.div>
            </motion.div>

            {/* Menu Cards */}
            <div className="p-8 bg-white">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                {/* Food Menu Card */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7, duration: 0.5 }}
                  whileHover={{ 
                    y: -4,
                    transition: { duration: 0.3 }
                  }}
                  whileTap={{ scale: 0.98 }}
                  className="group cursor-pointer"
                  onClick={() => downloadPDF('T FOOD.pdf', 'Food Menu')}
                >
                  <div className="relative bg-white rounded-xl p-8 border border-gray-200 hover:border-amber-300 transition-all duration-500 text-center shadow-sm hover:shadow-xl group-hover:bg-gradient-to-br group-hover:from-white group-hover:to-amber-50">
                    {/* Subtle background accent */}
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-amber-400 to-amber-600 rounded-t-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    
                    <div className="mb-6">
                      <div className="w-16 h-16 mx-auto bg-gradient-to-br from-amber-50 to-amber-100 rounded-xl flex items-center justify-center border border-amber-200 group-hover:border-amber-300 transition-all duration-300">
                        {/* Food icon: plate with fork and knife */}
                        <svg className="w-8 h-8 text-amber-600 group-hover:text-amber-700 transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <circle cx="12" cy="12" r="7" strokeWidth="1.5"/>
                          <path strokeWidth="1.5" d="M8.5 12h7M7 7l2 2M17 7l-2 2" />
                          <path strokeWidth="1.5" d="M5 3v7a2 2 0 0 0 4 0V3" />
                        </svg>
                      </div>
                    </div>
                    
                    <h3 
                      className="text-2xl font-bold text-[#423421] mb-3 group-hover:text-amber-700 transition-colors duration-300"
                      style={{ fontFamily: 'Reforma2018-Blanca' }}
                    >
                      Food Menu
                    </h3>
                    <p className="text-gray-600 mb-6 leading-relaxed text-sm">
                      Discover our carefully crafted dishes made with the finest ingredients and authentic flavors
                    </p>
                    
                    <motion.div 
                      className="inline-flex items-center gap-2 px-6 py-2 rounded-full border-2 border-amber-500 text-amber-600 group-hover:bg-amber-500 group-hover:text-white transition-all duration-300"
                      whileHover={{ scale: 1.05 }}
                    >
                      <span className="font-medium text-sm">Download PDF</span>
                      <motion.svg 
                        className="w-4 h-4" 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                        whileHover={{ y: 2 }}
                        transition={{ type: "spring", stiffness: 400 }}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3" />
                      </motion.svg>
                    </motion.div>
                  </div>
                </motion.div>

                {/* Bar Menu Card */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8, duration: 0.5 }}
                  whileHover={{ 
                    y: -4,
                    transition: { duration: 0.3 }
                  }}
                  whileTap={{ scale: 0.98 }}
                  className="group cursor-pointer"
                  onClick={() => downloadPDF('B MENU.pdf', 'Bar Menu')}
                >
                  <div className="relative bg-white rounded-xl p-8 border border-gray-200 hover:border-amber-300 transition-all duration-500 text-center shadow-sm hover:shadow-xl group-hover:bg-gradient-to-br group-hover:from-white group-hover:to-amber-50">
                    {/* Subtle background accent */}
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-amber-400 to-amber-600 rounded-t-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    
                    <div className="mb-6">
                      <div className="w-16 h-16 mx-auto bg-gradient-to-br from-amber-50 to-amber-100 rounded-xl flex items-center justify-center border border-amber-200 group-hover:border-amber-300 transition-all duration-300">
                        {/* Drink icon: cocktail glass */}
                        <svg className="w-8 h-8 text-amber-600 group-hover:text-amber-700 transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeWidth="1.5" d="M3 4h18l-9 9-9-9zm9 9v5m0 0v2m0-2h4m-4 0H8" />
                        </svg>
                      </div>
                    </div>
                    
                    <h3 
                      className="text-2xl font-bold text-[#423421] mb-3 group-hover:text-amber-700 transition-colors duration-300"
                      style={{ fontFamily: 'Reforma2018-Blanca' }}
                    >
                      Bar Menu
                    </h3>
                    <p className="text-gray-600 mb-6 leading-relaxed text-sm">
                      Explore our extensive collection of premium spirits, craft cocktails, and fine wines
                    </p>
                    
                    <motion.div 
                      className="inline-flex items-center gap-2 px-6 py-2 rounded-full border-2 border-amber-500 text-amber-600 group-hover:bg-amber-500 group-hover:text-white transition-all duration-300"
                      whileHover={{ scale: 1.05 }}
                    >
                      <span className="font-medium text-sm">Download PDF</span>
                      <motion.svg 
                        className="w-4 h-4" 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                        whileHover={{ y: 2 }}
                        transition={{ type: "spring", stiffness: 400 }}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3" />
                      </motion.svg>
                    </motion.div>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default DownloadMenuPopup;
