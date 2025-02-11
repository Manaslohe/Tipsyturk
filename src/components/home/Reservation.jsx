import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import ReservationPopup from '../reservation/ReservationPopup';

const Reservation = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const reservationRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: reservationRef,
    offset: ["start end", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [100, 0, 0, -100]);

  return (
    <>
      <ReservationPopup 
        isOpen={isPopupOpen} 
        onClose={() => setIsPopupOpen(false)} 
      />
      <motion.section 
        id="reservations"
        ref={reservationRef}
        style={{ opacity }}
        className="bg-white py-8 sm:py-12 lg:py-16 px-4 min-h-fit scroll-mt-24"
      >
        <motion.div 
          style={{ y }}
          className="max-w-8xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-12 items-center px-4 lg:px-8"
        >
          {/* Left content column */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-center justify-center max-w-3xl mx-auto text-center mb-8 lg:mb-0"
          >
            <h1 className="mb-4 sm:mb-6 lg:mb-8">
              <span className="block text-6xl sm:text-7xl lg:text-8xl text-amber-500 mb-0" 
                    style={{ fontFamily: 'BillyOhio' }}>
               Culinary
              </span>
              <span className="block text-5xl sm:text-6xl lg:text-7xl font-bold font-serif-ui text-[#423421] -mt-2">
              Delightful
              </span>
            </h1>
            <p className="text-lg sm:text-xl text-zinc-700 mb-6 sm:mb-8 max-w-xl leading-relaxed px-4">
            Housed on a Roof Top, we promise an intimate and relaxed dining experience that offers something different to local and foreign patrons and ensures you enjoy a memorable food experience every time.
            </p>
            <div className="inline-block relative">
              <button 
                onClick={() => setIsPopupOpen(true)}
                className="inline-block text-amber-500 border-b-2 border-amber-500 pb-1 
                         hover:text-amber-600 hover:border-amber-600 transition-colors 
                         text-xl sm:text-2xl font-bold"
              >
                Make a Reservation
              </button>
            </div>
          </motion.div>

          {/* Right images column */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="grid grid-cols-2 gap-3 sm:gap-4 lg:gap-6 
                       max-w-3xl lg:max-w-4xl mx-auto w-full"
          >
            {[
              { src: "/gallery/Food/18.jpg", alt: "Delicious toffee dessert" },
              { src: "/gallery/Drinks/5.jpg", alt: "Refreshing apple cider" }
            ].map((img, index) => (
              <div 
                key={index}
                className="relative overflow-hidden rounded-lg shadow-md
                           aspect-[7/8] lg:aspect-[8/9] xl:aspect-[9/14]
                           w-full"
              >
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.4 }}
                  className="h-full w-full"
                >
                  <img
                    src={img.src}
                    alt={img.alt}
                    className="object-cover w-full h-full transform-gpu"
                    loading="lazy"
                  />
                </motion.div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </motion.section>
    </>
  );
};

export default Reservation;