import { Facebook, Instagram, Twitter } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Footer() {
  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-50px" },
    transition: { duration: 0.8, ease: "easeOut" }
  };

  return (
    <>
      {/* Enhanced Social Media Ribbon */}
      <motion.div 
        className="bg-gradient-to-r from-amber-600 via-amber-500 to-amber-600 py-6 relative"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle,_rgba(255,255,255,0.1)_1px,_transparent_1px)] bg-[length:20px_20px] opacity-25"></div>
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <span className="text-white/90 text-lg tracking-wider font-light">
              Stay Connected
            </span>
            <div className="flex items-center gap-8">
              {[
                { icon: Facebook, label: "Facebook" },
                { icon: Instagram, label: "Instagram" },
                { icon: Twitter, label: "Twitter" }
              ].map((item, index) => (
                <a
                  key={index}
                  href="#"
                  className="group relative flex items-center justify-center w-12 h-12 
                           rounded-full bg-white/10 hover:bg-white/20 
                           transition-all duration-300 transform hover:scale-110"
                  aria-label={item.label}
                >
                  <item.icon 
                    size={20} 
                    className="text-white transform group-hover:scale-110 
                             transition-all duration-300 relative z-10" 
                  />
                  <div className="absolute inset-0 rounded-full bg-white/5 
                                blur-sm group-hover:blur-md transition-all duration-300"></div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Footer */}
      <footer className="bg-zinc-900">
        <motion.div 
          className="max-w-7xl mx-auto px-6 py-12"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.2
              }
            }
          }}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          <div className="flex flex-col items-center gap-6">
            {/* Logo */}
            <motion.div
              variants={fadeInUp}
            >
              <img 
                src="/logo.jpg" 
                alt="TypsyTurk Logo" 
                className="w-40 h-40 md:w-48 md:h-48 object-contain
                         transform hover:scale-105 transition-all duration-500"
              />
            </motion.div>
            
            <motion.h4 
              variants={fadeInUp}
              className="text-6xl text-amber-500" 
              style={{ fontFamily: 'BillyOhio' }}
            >
              TipsyTurk
            </motion.h4>
            
            <motion.p 
              variants={fadeInUp}
              className="text-zinc-400 text-sm text-center max-w-md"
            >
              Experience authentic Turkish cuisine in a modern atmosphere
            </motion.p>

            {/* Copyright */}
            <motion.div 
              variants={fadeInUp}
              className="pt-6 border-t border-zinc-800 text-center text-zinc-500 text-sm w-full"
            >
              <p>&copy; {new Date().getFullYear()} TypsyTurk. All rights reserved.</p>
            </motion.div>
          </div>
        </motion.div>
      </footer>
    </>
  );
}
