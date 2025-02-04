import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Phone, Mail, MapPin, Clock, Send, Copy, Check, MapPinned } from 'lucide-react';

const Contact = () => {
  const contactRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: contactRef,
    offset: ["start end", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [100, 0, 0, -100]);

  const fadeInUp = {
    initial: { opacity: 0, y: 50 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-50px" },
    transition: { duration: 0.8, ease: "easeOut" }
  };

  const stagger = {
    initial: { opacity: 0 },
    whileInView: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const cardVariants = {
    initial: { opacity: 0, y: 20 },
    whileInView: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    }
  };

  const formVariants = {
    initial: { opacity: 0, scale: 0.95 },
    whileInView: {
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 20
      }
    }
  };

  const notificationVariants = {
    initial: { 
      opacity: 0,
      scale: 0.85,
      y: 10
    },
    animate: { 
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 20
      }
    },
    exit: { 
      opacity: 0,
      scale: 0.9,
      y: -10,
      transition: {
        duration: 0.2
      }
    }
  };

  return (
    <motion.section
      id="contact"
      ref={contactRef}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 1 }}
      className="bg-white py-24 px-4"
    >
      <motion.div 
        style={{ y }}
        className="max-w-7xl mx-auto"
      >
        {/* Header */}
        <motion.div 
          className="text-center mb-20"
          {...fadeInUp}
        >
          <h2 className="flex flex-col items-center gap-3">
            <motion.span 
              className="text-7xl md:text-8xl text-amber-500"
              style={{ fontFamily: 'BillyOhio' }}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              Get in Touch
            </motion.span>
            <span className="text-2xl md:text-3xl font-light text-zinc-800 tracking-wide">
              We'd Love to Hear From You
            </span>
          </h2>
        </motion.div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-16">
          {/* Left Column */}
          <motion.div className="space-y-10" variants={stagger} initial="initial" whileInView="whileInView">
            {/* Map */}
            <div className="h-[300px] rounded-2xl overflow-hidden shadow-md">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3720.8436723733907!2d79.07815417526015!3d21.158618680523453!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bd4c141e643b58b%3A0xf5f4fdca8a4454b4!2sTipsy%20Turk!5e0!3m2!1sen!2sin!4v1738663735430!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>

            {/* Contact Info Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {[
                { 
                  icon: Phone, 
                  title: "Call Us", 
                  info: "088888 83910",
                  displayInfo: "+91 88888 83910", // Added formatted display
                  copyable: true,
                  link: "tel:08888883910"
                },
                { 
                  icon: Mail, 
                  title: "Order Online", 
                  info: [
                    { 
                      name: "Swiggy",
                      link: "https://www.swiggy.com/city/nagpur/tipsy-turk-2nd-floor-buty-building-sadar-rest866833",
                      color: "text-amber-500 hover:text-amber-600"
                    },
                    { 
                      name: "Zomato",
                      link: "https://www.zomato.com/nagpur/tipsy-turk-sadar",
                      color: "text-[#9d1826] hover:text-[#8a1521]"
                    }
                  ],
                  isOrderLinks: true
                },
                { 
                  icon: MapPin, 
                  title: "Location", 
                  info: "2nd Floor, Buty Building, Mount Rd...",
                  fullAddress: "2nd Floor, Buty Building, Mount Rd Ext, Sadar, Nagpur, Maharashtra 440001",
                  hasNavigation: true,
                  navigationLink: "https://www.google.com/maps/dir/?api=1&destination=Tipsy+Turk+Nagpur",
                  copyable: true
                },
                { 
                  icon: Clock, 
                  title: "Opening Hours", 
                  info: "Open daily until 1 AM",
                }
              ].map((item, index) => {
                const [copied, setCopied] = useState(false);

                const handleClick = async (e) => {
                  if (e.target.closest('.nav-button')) {
                    window.open(item.navigationLink, '_blank');
                    return;
                  }

                  if (item.copyable) {
                    await navigator.clipboard.writeText(item.fullAddress || item.info);
                    setCopied(true);
                    setTimeout(() => setCopied(false), 2000);
                  } else if (item.link) {
                    window.open(item.link, '_blank');
                  }
                };

                return (
                  <motion.div
                    key={index}
                    className={`
                      bg-white p-5 rounded-2xl shadow-md transition-all duration-300
                      hover:shadow-lg relative overflow-visible h-[110px]
                      ${(item.copyable || item.link) ? 'cursor-pointer hover:bg-amber-50' : ''}
                    `}
                    onClick={handleClick}
                    whileHover={{ y: -2 }}
                    transition={{ duration: 0.2 }}
                    variants={cardVariants}
                  >
                    <div className="flex flex-col h-full">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <item.icon className="w-6 h-6 text-amber-500 font-bold" />
                          <h3 className="font-heading text-lg text-zinc-800 font-semibold tracking-wide">
                            {item.title}
                          </h3>
                        </div>
                        {item.hasNavigation && (
                          <motion.button
                            className="nav-button p-1.5 rounded-full hover:bg-amber-100 transition-colors"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <MapPinned className="w-4 h-4 text-amber-500" />
                          </motion.button>
                        )}
                      </div>
                      <div className="flex-grow">
                        {item.isOrderLinks ? (
                          <div className="flex items-center gap-4">
                            {item.info.map((orderLink, idx) => (
                              <a
                                key={idx}
                                href={orderLink.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={`font-medium text-base ${orderLink.color} 
                                          transition-colors duration-200 hover:underline`}
                                onClick={(e) => e.stopPropagation()}
                              >
                                {orderLink.name}
                              </a>
                            ))}
                          </div>
                        ) : (
                          <div className="flex items-center gap-2 group relative">
                            <p className={`
                              text-zinc-700 font-body text-base leading-relaxed truncate max-w-[90%]
                              ${item.title === "Call Us" ? "font-mono text-lg tracking-wide" : "font-medium"}
                            `}>
                              {item.displayInfo || item.info}
                            </p>
                            {/* Tooltip for full address */}
                            {item.fullAddress && (
                              <motion.div
                                className="absolute left-0 -bottom-20 bg-zinc-800 text-white p-2 rounded-lg text-xs 
                                         w-72 opacity-0 pointer-events-none z-10 shadow-lg"
                                initial={{ opacity: 0, y: 10 }}
                                whileHover={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.2 }}
                              >
                                {item.fullAddress}
                                <div className="absolute -top-2 left-4 w-4 h-4 bg-zinc-800 transform rotate-45" />
                              </motion.div>
                            )}
                          </div>
                        )}
                      </div>
                      {item.copyable && (
                        <motion.div 
                          className="absolute right-3 bottom-3"
                          initial={{ opacity: 0.5 }}
                          whileHover={{ opacity: 1 }}
                        >
                          {copied ? (
                            <Check className="w-4 h-4 text-green-500" />
                          ) : (
                            <Copy className="w-4 h-4 text-amber-500" />
                          )}
                        </motion.div>
                      )}
                    </div>
                    <AnimatePresence>
                      {copied && (
                        <motion.div
                          variants={notificationVariants}
                          initial="initial"
                          animate="animate"
                          exit="exit"
                          className="absolute inset-0 flex items-center justify-center bg-amber-500/95 
                                   backdrop-blur-sm rounded-2xl"
                        >
                          <div className="flex items-center gap-2 text-white">
                            <Check className="w-4 h-4" />
                            <span className="font-medium text-sm">Copied!</span>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* Right Column - Form */}
          <motion.div 
            className="bg-white p-8 md:p-10 rounded-2xl shadow-md"
            {...fadeInUp}
            variants={formVariants}
          >
            <form className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="group">
                  <label className="block text-sm font-medium text-zinc-700 mb-2">Name</label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 bg-white border border-zinc-200 rounded-xl text-zinc-800 
                             focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent
                             transition-all duration-300 group-hover:border-amber-300"
                    placeholder="John Doe"
                  />
                </div>
                <div className="group">
                  <label className="block text-sm font-medium text-zinc-700 mb-2">Email</label>
                  <input
                    type="email"
                    className="w-full px-4 py-3 bg-white border border-zinc-200 rounded-xl text-zinc-800 
                             focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent
                             transition-all duration-300 group-hover:border-amber-300"
                    placeholder="john@example.com"
                  />
                </div>
              </div>
              <div className="group">
                <label className="block text-sm font-medium text-zinc-700 mb-2">Subject</label>
                <input
                  type="text"
                  className="w-full px-4 py-3 bg-white border border-zinc-200 rounded-xl text-zinc-800 
                           focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent
                           transition-all duration-300 group-hover:border-amber-300"
                  placeholder="How can we help?"
                />
              </div>
              <div className="group">
                <label className="block text-sm font-medium text-zinc-700 mb-2">Message</label>
                <textarea
                  rows="5"
                  className="w-full px-4 py-3 bg-white border border-zinc-200 rounded-xl text-zinc-800 
                           focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent
                           transition-all duration-300 group-hover:border-amber-300 resize-none"
                  placeholder="Tell us more about your inquiry..."
                />
              </div>
              <motion.button
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                className="w-full bg-amber-500 text-white py-4 rounded-xl font-semibold 
                         hover:bg-amber-400 transition-colors duration-200 flex items-center justify-center gap-2"
              >
                <span>Send Message</span>
                <Send className="w-5 h-5" />
              </motion.button>
            </form>
          </motion.div>
        </div>
      </motion.div>
    </motion.section>
  );
};

export default Contact;
