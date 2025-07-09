import React from "react";
import { motion, AnimatePresence } from "framer-motion";

const downloadPDF = (filename) => {
  const link = document.createElement('a');
  link.href = `/${filename}`;
  link.download = filename;
  link.target = '_blank';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

import { useNavigate } from "react-router-dom";

const DownloadMenuPage = () => {
  const navigate = useNavigate();
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="min-h-screen w-full flex flex-col items-center justify-center py-8 px-2 relative"
    >
      {/* Tinted and blurred overlay */}
      <div className="fixed inset-0 z-0 bg-white/10 backdrop-blur-sm" aria-hidden="true"></div>
      <div className="w-full max-w-3xl mx-auto flex flex-col items-center justify-center z-10 relative">
        {/* Header */}
        <div className="relative py-10 px-4 sm:px-8 bg-gradient-to-b from-white/90 to-white/90 border-b border-gray-100 rounded-t-2xl w-full">
          <button
            className="absolute top-3 left-3 sm:top-6 sm:left-6 px-4 py-2 sm:px-6 sm:py-2 rounded-full bg-amber-500 hover:bg-amber-600 text-white text-xs sm:text-base font-semibold shadow transition-colors duration-200 z-10"
            onClick={() => navigate('/menu')}
          >
            See Menu Online
          </button>
          <h2 className="mb-6 text-center">
            <span className="block text-5xl sm:text-6xl text-amber-500 mb-3" style={{ fontFamily: 'BillyOhio' }}>
              Download
            </span>
            <span className="block text-2xl sm:text-4xl font-bold font-serif-ui text-[#423421]">
              Our Menus
            </span>
          </h2>
          {/* Decorative Divider */}
          <div className="flex items-center justify-center py-4">
            <div className="w-16 h-px bg-amber-500"></div>
            <svg viewBox="0 0 31 20" className="w-8 h-8 mx-4 text-amber-500" fill="currentColor">
              <path d="M30.721 6.3114c0 .599-.2647 1.1494-.7941 1.651-5.6984 1.4768-8.7774 2.2153-9.2372 2.2153-.5434 0-.815-.1394-.815-.418 0-.2229.3204-.5294.9613-.9195 2.9816-1.6161 4.5072-2.4381 4.5768-2.466 1.3375-.6548 2.4243-.9822 3.2602-.9822 1.031 0 1.5465.4389 1.5465 1.3166zm-4.8485-3.1766c0 .4598-.3553 1.0031-1.0658 1.63-.3901.3345-1.3654 1.059-2.9258 2.1735-2.9676 2.1178-4.6604 3.1766-5.0784 3.1766-.209 0-.3762-.1393-.5016-.418l.2508-.585c.836-.8639 1.7346-1.8531 2.696-2.9677 1.0309-1.1982 1.637-1.8948 1.8181-2.0899 1.4908-1.5743 2.7796-2.3615 3.8663-2.3615.6269 0 .9404.4807.9404 1.442z" />
            </svg>
            <div className="w-16 h-px bg-amber-500"></div>
          </div>
        </div>

        {/* Menu Cards */}
        <div className="p-4 sm:p-8 bg-white/90 0 w-full rounded-b-2xl shadow-xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Food Menu Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.7, ease: "easeOut" }}
              className="group cursor-pointer"
              onClick={() => downloadPDF('T FOOD.pdf')}
            >
              <div className="relative bg-white rounded-xl p-8 border border-gray-200 hover:border-amber-300 transition-all duration-500 text-center shadow-sm hover:shadow-xl group-hover:bg-gradient-to-br group-hover:from-white group-hover:to-amber-50 overflow-hidden">
                {/* Subtle background accent */}
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-amber-400 to-amber-600 rounded-t-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden sm:block" />
                {/* Food background image */}
                <img src="/menu/food.png" alt="Food Menu" className="absolute inset-0 w-full h-full object-cover opacity-100 pointer-events-none select-none" />
                {/* Black overlay for readability */}
                <div className="absolute inset-0 bg-black/80 group-hover:bg-black/60 transition-colors duration-300 pointer-events-none select-none" />
                {/* Content above overlay */}
                <div className="relative z-10">
                  <div className="mb-6"></div>
                  <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-amber-200 transition-colors duration-300" style={{ fontFamily: 'Reforma2018-Blanca' }}>
                    Food Menu
                  </h3>
                  <p className="text-gray-100 mb-6 leading-relaxed text-sm">
                    Discover our carefully crafted dishes made with the finest ingredients and authentic flavors
                  </p>
                  <div className="inline-flex items-center gap-2 px-6 py-2 rounded-full border-2 border-amber-500 text-amber-100 group-hover:bg-amber-500 group-hover:text-white transition-all duration-300 bg-amber-500/80">
                    <span className="font-medium text-sm">Download PDF</span>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3" />
                    </svg>
                  </div>
                </div>
              </div>
            </motion.div>
            {/* Bar Menu Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.7, ease: "easeOut" }}
              className="group cursor-pointer"
              onClick={() => downloadPDF('B MENU.pdf')}
            >
              <div className="relative bg-white rounded-xl p-8 border border-gray-200 hover:border-amber-300 transition-all duration-500 text-center shadow-sm hover:shadow-xl group-hover:bg-gradient-to-br group-hover:from-white group-hover:to-amber-50 overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-amber-400 to-amber-600 rounded-t-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden sm:block" />
                {/* Bar background image */}
                <img src="/menu/bar.png" alt="Bar Menu" className="absolute inset-0 w-full h-full object-cover opacity-100 pointer-events-none select-none" />
                {/* Black overlay for readability */}
                <div className="absolute inset-0 bg-black/80 group-hover:bg-black/60 transition-colors duration-300 pointer-events-none select-none" />
                {/* Content above overlay */}
                <div className="relative z-10">
                  <div className="mb-6"></div>
                  <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-amber-200 transition-colors duration-300" style={{ fontFamily: 'Reforma2018-Blanca' }}>
                    Bar Menu
                  </h3>
                  <p className="text-gray-100 mb-6 leading-relaxed text-sm">
                    Explore our extensive collection of premium spirits, craft cocktails, and fine wines
                  </p>
                  <div className="inline-flex items-center gap-2 px-6 py-2 rounded-full border-2 border-amber-500 text-amber-100 group-hover:bg-amber-500 group-hover:text-white transition-all duration-300 bg-amber-500/80">
                    <span className="font-medium text-sm">Download PDF</span>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3" />
                    </svg>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default DownloadMenuPage;
