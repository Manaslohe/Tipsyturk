import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowLeft, ZoomIn, ImageOff } from 'lucide-react';
import { Link } from 'react-router-dom';

const categories = ['Ambiance', 'Crowd', 'Desert', 'Drinks', 'Food'];
const maxPhotos = {
  Ambiance: 12,
  Crowd: 19,
  Desert: 6,
  Drinks: 16,
  Food: 20
};

const fileExtensions = {
  Ambiance: 'JPG',
  Crowd: 'JPG',  // Changed from 'jpg' to 'JPG'
  Desert: 'JPG',
  Drinks: 'jpg',
  Food: 'jpg'
};

const Gallery = () => {
  const [selectedCategory, setSelectedCategory] = useState('Ambiance');
  const [selectedImage, setSelectedImage] = useState(null);
  const [loadingImages, setLoadingImages] = useState({});
  const [failedImages, setFailedImages] = useState({});

  // Add touch scroll handling for mobile
  const [touchStart, setTouchStart] = useState(0);
  const categoryContainerRef = useRef(null);

  const handleTouchStart = (e) => {
    setTouchStart(e.touches[0].clientX);
  };

  const handleTouchMove = (e) => {
    if (!categoryContainerRef.current) return;
    const touchDelta = touchStart - e.touches[0].clientX;
    categoryContainerRef.current.scrollLeft += touchDelta;
    setTouchStart(e.touches[0].clientX);
  };

  // Enhanced animation variants
  const pageVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        duration: 0.6,
        staggerChildren: 0.03,
        when: "beforeChildren",
        ease: [0.22, 1, 0.36, 1]
      }
    },
    exit: { 
      opacity: 0,
      transition: { duration: 0.4 }
    }
  };

  const categoryVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1]
      }
    })
  };

  const gridVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.04,
        delayChildren: 0.1,
        ease: [0.22, 1, 0.36, 1]
      }
    },
    exit: {
      opacity: 0,
      y: -20,
      transition: { duration: 0.3 }
    }
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.4, ease: "easeOut" }
    },
    exit: { 
      opacity: 0,
      scale: 0.9,
      transition: { duration: 0.3 }
    }
  };

  // Reset loading states when category changes
  useEffect(() => {
    setLoadingImages({});
    setFailedImages({});
  }, [selectedCategory]);

  const getImagePath = (category, number) => {
    // Update path to use /gallery instead of /src/components/gallary
    return `/gallery/${category}/${number}.${fileExtensions[category]}`;
  };

  const getImages = (category) => {
    return Array.from({ length: maxPhotos[category] }, (_, i) => i + 1);
  };

  const handleImageLoad = (category, index) => {
    setLoadingImages(prev => ({
      ...prev,
      [`${category}-${index}`]: false
    }));
  };

  const handleImageError = (category, index) => {
    setLoadingImages(prev => ({
      ...prev,
      [`${category}-${index}`]: false
    }));
    setFailedImages(prev => ({
      ...prev,
      [`${category}-${index}`]: true
    }));
  };

  useEffect(() => {
    // Preload images for the initial category
    const imagesToLoad = getImages(selectedCategory).length;
    let loadedImages = 0;

    getImages(selectedCategory).forEach((index) => {
      const img = new Image();
      img.src = getImagePath(selectedCategory, index);
      img.onload = () => {
        loadedImages++;
      };
      img.onerror = () => {
        loadedImages++;
      };
    });
  }, []); // Only run once on mount

  // Add this function near other utility functions
  const getImageLoadingPriority = (index) => {
    // First 6 images load with high priority
    return index <= 6 ? 'eager' : 'lazy';
  };

  // Update useEffect for preloading
  useEffect(() => {
    const preloadImages = async () => {
      const imagesToPreload = getImages(selectedCategory).slice(0, 4); // Reduced from 6 to 4
      
      for (const index of imagesToPreload) {
        const img = new Image();
        img.src = getImagePath(selectedCategory, index);
        img.loading = 'eager';
        img.decoding = 'async';
        await new Promise((resolve) => {
          img.onload = resolve;
          img.onerror = resolve;
        });
      }
    };

    preloadImages();
  }, [selectedCategory]);

  return (
    <div className="relative w-full min-h-screen overflow-y-auto bg-gradient-to-br from-[#1a1a2e] via-[#16213e] to-[#0f3460]">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="relative z-10"
      >
        {/* Updated Header with better backdrop */}
        <div className="fixed top-0 left-0 right-0 h-20 bg-gradient-to-b from-black/95 via-black/80 to-transparent z-50 ">
          <div className="absolute inset-0  bg-black/10"></div>
          <div className="container mx-auto px-4 relative">
            <div className="h-16 md:h-20 flex items-center">
              <Link 
                to="/"
                className="flex items-center text-white hover:text-amber-400 transition-colors group"
              >
                <ArrowLeft className="mr-2 group-hover:-translate-x-1 transition-transform" />
                <span className="font-medium text-lg hidden md:inline">Back to Home</span>
                <span className="font-medium text-lg md:hidden">Back</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="container mx-auto px-2 md:px-4">
          <div className="pt-24 md:pt-28 pb-8">
            {/* Updated Gallery Title */}
            <motion.h1 
              variants={categoryVariants}
              custom={0}
              initial="hidden"
              animate="visible"
              className="text-5xl md:text-7xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600 pb-6 md:mb-12 font-[Reforma2018-Blanca]"
            >
              Gallery
            </motion.h1>

            {/* Updated Categories Section with larger text */}
            <div className="relative px-2">
              <div className="flex flex-wrap justify-center gap-2 md:gap-4 mb-8 md:mb-16">
                {categories.map((category, index) => (
                  <motion.button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`
                      px-4 md:px-8 py-2.5 md:py-3 rounded-full text-sm md:text-base font-semibold
                      whitespace-nowrap flex-shrink-0
                      ${selectedCategory === category 
                        ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-white shadow-lg shadow-amber-500/30' 
                        : 'bg-white/10 text-white hover:bg-white/20'}
                      transition-all duration-300 ease-out
                      touch-none select-none
                    `}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    layout="position"
                  >
                    {category}
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Image Grid */}
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={selectedCategory}
                variants={gridVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-6"
                layoutId="gallery-grid"
              >
                {getImages(selectedCategory).map((index) => {
                  const imageKey = `${selectedCategory}-${index}`;
                  const isFailed = failedImages[imageKey];
                  
                  return (
                    <motion.div
                      key={imageKey}
                      variants={imageVariants}
                      className={`
                        relative overflow-hidden rounded-xl cursor-pointer group
                        ${isFailed ? 'bg-gray-800' : ''}
                        aspect-square transform-gpu
                      `}
                      onClick={() => !isFailed && setSelectedImage({ category: selectedCategory, index })}
                    >
                      {!isFailed ? (
                        <>
                          <img
                            src={getImagePath(selectedCategory, index)}
                            alt={`${selectedCategory} Gallery Image ${index}`}
                            loading={getImageLoadingPriority(index)}
                            decoding="async"
                            fetchpriority={index <= 4 ? "high" : "auto"} // Changed from fetchPriority to fetchpriority
                            onLoad={() => handleImageLoad(selectedCategory, index)}
                            onError={() => handleImageError(selectedCategory, index)}
                            className="object-cover w-full h-full transform transition-all duration-500 ease-out group-hover:scale-110"
                            style={{
                              contentVisibility: 'auto',
                              containIntrinsicSize: '400px'
                            }}
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300">
                            <motion.div
                              whileHover={{ scale: 1.1 }}
                              className="absolute inset-0 flex items-center justify-center"
                            >
                              <ZoomIn size={24} className="text-white/90" />
                            </motion.div>
                          </div>
                        </>
                      ) : (
                        <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-500 bg-gray-800/50">
                          <ImageOff size={32} />
                          <span className="mt-2 text-sm">Image not available</span>
                        </div>
                      )}
                    </motion.div>
                  );
                })}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Enhanced Lightbox */}
        <AnimatePresence>
          {selectedImage && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/98 z-50 flex items-center justify-center p-4"
              onClick={() => setSelectedImage(null)}
            >
              <motion.div
                className="relative max-w-[95vw] md:max-w-[90vw] max-h-[90vh]"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                onClick={(e) => e.stopPropagation()}
              >
                <img
                  src={getImagePath(selectedImage.category, selectedImage.index)}
                  alt="Gallery Image"
                  className="max-h-[90vh] w-full object-contain rounded-lg"
                />
                <motion.button
                  className="absolute top-2 right-2 md:top-4 md:right-4 p-2 md:p-3 rounded-full bg-black/50 text-white/90 backdrop-blur-sm"
                  whileHover={{ scale: 1.1, backgroundColor: "rgba(255, 255, 255, 0.2)" }}
                  whileTap={{ scale: 0.95 }}
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedImage(null);
                  }}
                >
                  <X size={20} className="md:w-6 md:h-6" />
                </motion.button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

// Add this to your global CSS or tailwind config
const styles = `
  .scrollbar-hide {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
  .scrollbar-hide::-webkit-scrollbar {
    display: none;
  }
`;

export default Gallery;
