import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import DownloadMenuPopup from './DownloadMenuPopup';
import { categories, menuItems } from './MenuData';

const MenuPopup = ({ isOpen, onClose }) => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [isDownloadPopupOpen, setIsDownloadPopupOpen] = useState(false);
  const [vegFilter, setVegFilter] = useState("All"); // "All", "Veg", "Non-Veg"
  const [sortBy, setSortBy] = useState("Default"); // "Default", "Price Low-High", "Price High-Low", "Name A-Z"

  // Helper function to extract numeric price for sorting
  const getNumericPrice = (priceString) => {
    const match = priceString.match(/₹(\d+)/);
    return match ? parseInt(match[1]) : 0;
  };

  // Filter and sort items
  const filteredAndSortedItems = useMemo(() => {
    let filtered = activeCategory === "All" 
      ? menuItems 
      : menuItems.filter(item => item.category === activeCategory);

    // Apply veg filter
    if (vegFilter !== "All") {
      filtered = filtered.filter(item => {
        if (vegFilter === "Veg") return item.vegType === "Veg";
        if (vegFilter === "Non-Veg") return item.vegType === "Non-Veg";
        return true;
      });
    }

    // Sort items
    let sorted = [...filtered];
    
    // First, sort by veg type (Veg on top, Non-Veg at bottom)
    sorted.sort((a, b) => {
      if (a.vegType === "Veg" && b.vegType === "Non-Veg") return -1;
      if (a.vegType === "Non-Veg" && b.vegType === "Veg") return 1;
      return 0;
    });

    // Then apply secondary sorting
    if (sortBy === "Price Low-High") {
      sorted.sort((a, b) => {
        const aVegOrder = a.vegType === "Veg" ? 0 : 1;
        const bVegOrder = b.vegType === "Veg" ? 0 : 1;
        if (aVegOrder !== bVegOrder) return aVegOrder - bVegOrder;
        return getNumericPrice(a.price) - getNumericPrice(b.price);
      });
    } else if (sortBy === "Price High-Low") {
      sorted.sort((a, b) => {
        const aVegOrder = a.vegType === "Veg" ? 0 : 1;
        const bVegOrder = b.vegType === "Veg" ? 0 : 1;
        if (aVegOrder !== bVegOrder) return aVegOrder - bVegOrder;
        return getNumericPrice(b.price) - getNumericPrice(a.price);
      });
    } else if (sortBy === "Name A-Z") {
      sorted.sort((a, b) => {
        const aVegOrder = a.vegType === "Veg" ? 0 : 1;
        const bVegOrder = b.vegType === "Veg" ? 0 : 1;
        if (aVegOrder !== bVegOrder) return aVegOrder - bVegOrder;
        return a.name.localeCompare(b.name);
      });
    }

    return sorted;
  }, [activeCategory, vegFilter, sortBy]);

  // Get item count for current filters
  const vegCount = filteredAndSortedItems.filter(item => item.vegType === "Veg").length;
  const nonVegCount = filteredAndSortedItems.filter(item => item.vegType === "Non-Veg").length;

  // Reset filters when category changes
  const handleCategoryChange = (category) => {
    setActiveCategory(category);
    setSortBy("Default");
  };

  // Ensure "All" is selected by default when popup opens
  React.useEffect(() => {
    if (isOpen) {
      setActiveCategory("All");
      setSortBy("Default");
    }
  }, [isOpen]);

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 flex items-start justify-center overflow-y-auto pt-2 sm:pt-4 z-[999999]">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[999999]"
              onClick={onClose}
            />
            
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 50, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="relative bg-white rounded-none sm:rounded-xl w-full max-w-7xl mx-0 sm:mx-4 my-0 sm:my-4 overflow-hidden z-[1000000] min-h-screen sm:min-h-0"
              onClick={e => e.stopPropagation()}
            >
              {/* Header */}
              <div className="border-b border-gray-200 p-3 sm:p-6 sticky top-0 bg-white z-10">
                <div className="flex justify-between items-center mb-4 sm:mb-6">
                  <div>
                    <h2>
                      <span 
                        className="block text-3xl sm:text-4xl lg:text-5xl text-amber-500 mb-1" 
                        style={{ fontFamily: 'BillyOhio' }}
                      >
                        Discover
                      </span>
                      <span className="block text-xl sm:text-2xl lg:text-3xl font-bold font-serif-ui text-zinc-700">
                        Our Menu
                      </span>
                    </h2>
                  </div>
                  <div className="flex gap-2 items-center">
                    <button
                      onClick={() => setIsDownloadPopupOpen(true)}
                      className="group relative inline-flex items-center gap-1 sm:gap-2 px-2 sm:px-4 py-2 rounded-full border-2 border-amber-500 text-amber-500 font-bold hover:border-amber-600 hover:text-amber-600 transition-colors duration-200 text-xs sm:text-sm"
                      style={{ fontFamily: 'Reforma2018-Blanca' }}
                    >
                      <span className="hidden sm:inline">Download Menu</span>
                      <span className="sm:hidden">Download</span>
                    </button>
                    <button onClick={onClose} className="text-zinc-500 hover:text-zinc-700">
                      <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                </div>

                {/* Filters */}
                <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 mt-2 mb-4">
                  {/* Veg Filter */}
                  <div className="flex items-center gap-2 flex-1 sm:flex-none">
                    <label className="text-xs sm:text-sm font-medium text-zinc-700 whitespace-nowrap">Diet:</label>
                    <select
                      value={vegFilter}
                      onChange={(e) => setVegFilter(e.target.value)}
                      className="flex-1 sm:flex-none px-2 sm:px-3 py-2 rounded-lg border border-gray-300 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                    >
                      <option value="All">All Items</option>
                      <option value="Veg">🟢 Veg Only</option>
                      <option value="Non-Veg">🔴 Non-Veg Only</option>
                    </select>
                  </div>

                  {/* Sort Filter */}
                  <div className="flex items-center gap-2 flex-1 sm:flex-none">
                    <label className="text-xs sm:text-sm font-medium text-zinc-700 whitespace-nowrap">Sort:</label>
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="flex-1 sm:flex-none px-2 sm:px-3 py-2 rounded-lg border border-gray-300 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                    >
                      <option value="Default">Default</option>
                      <option value="Price Low-High">Price: Low to High</option>
                      <option value="Price High-Low">Price: High to Low</option>
                      <option value="Name A-Z">Name: A to Z</option>
                    </select>
                  </div>

                  {/* Clear Filters */}
                  {(vegFilter !== "All" || sortBy !== "Default") && (
                    <button
                      onClick={() => {
                        setVegFilter("All");
                        setSortBy("Default");
                      }}
                      className="px-3 py-2 text-xs sm:text-sm text-amber-600 hover:text-amber-700 font-medium self-start sm:self-center"
                    >
                      Clear Filters
                    </button>
                  )}
                </div>

                {/* Category Tabs */}
                <div
                  className="flex overflow-x-auto pb-4 custom-scrollbar relative gap-2 sm:gap-3"
                  style={{
                    scrollbarColor: '#f59e0b #fef3c7',
                    scrollbarWidth: 'thin',
                    marginLeft: '-16px',
                    marginRight: '-16px',
                    paddingLeft: '16px',
                    paddingRight: '16px',
                  }}
                >
                  {/* Animated gradient fade on left */}
                  <div className="pointer-events-none absolute left-0 top-0 h-full w-4 sm:w-8 z-10"
                    style={{
                    
                   
                      left: 0,
                    }}
                  />
                  {/* Animated gradient fade on right */}
                  <div className="pointer-events-none absolute right-0 top-0 h-full w-4 sm:w-8 z-10"
                    style={{
                     
                     
                      right: 0,
                    }}
                  />
                  {/* Category buttons */}
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => handleCategoryChange(category)}
                      className={`px-3 sm:px-6 py-2 sm:py-3 rounded-full whitespace-nowrap transition-all duration-200 flex-shrink-0 font-medium text-xs sm:text-sm
                        ${activeCategory === category
                          ? 'bg-amber-500 text-white shadow-lg transform scale-105'
                          : 'bg-gray-100 text-zinc-600 hover:bg-gray-200 hover:text-zinc-800'
                        }`}
                      style={{
                        minWidth: 'auto',
                        fontWeight: activeCategory === category ? 700 : 500,
                        border: activeCategory === category ? '2px solid #f59e0b' : '2px solid transparent'
                      }}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>

              {/* Menu Items */}
              <div
                className="p-3 sm:p-6 overflow-y-auto max-h-[calc(100vh-240px)] sm:max-h-[calc(90vh-280px)] custom-scrollbar"
                style={{
                  scrollbarColor: '#f59e0b #fef3c7', // amber-500 thumb, amber-100 track
                  scrollbarWidth: 'thin'
                }}
              >
                {filteredAndSortedItems.length === 0 ? (
                  <div className="text-center py-8 sm:py-12">
                    <div className="text-4xl sm:text-6xl mb-4">🍽️</div>
                    <h3 className="text-lg sm:text-xl font-medium text-zinc-700 mb-2">No items found</h3>
                    <p className="text-sm sm:text-base text-zinc-500">Try adjusting your filters to see more items.</p>
                  </div>
                ) : (
                  <div className="space-y-4 sm:space-y-6">
                    {/* Group items by veg type for better visual separation */}
                    {vegCount > 0 && (
                      <div>
                        <div className="flex items-center gap-2 mb-3 sm:mb-4 pb-2 border-b border-green-200">
                          <div className="w-3 h-3 sm:w-4 sm:h-4 bg-green-500 rounded-full"></div>
                          <h3 className="text-base sm:text-lg font-semibold text-green-700">Vegetarian Options</h3>
                          <span className="text-xs sm:text-sm text-green-600">({vegCount} items)</span>
                        </div>
                        <div className="grid gap-3 sm:gap-4">
                          {filteredAndSortedItems
                            .filter(item => item.vegType === "Veg")
                            .map((item, index) => (
                            <MenuItemCard key={`veg-${item.name}`} item={item} index={index} />
                          ))}
                        </div>
                      </div>
                    )}

                    {nonVegCount > 0 && (
                      <div>
                        <div className="flex items-center gap-2 mb-3 sm:mb-4 pb-2 border-b border-red-200">
                          <div className="w-3 h-3 sm:w-4 sm:h-4 bg-red-500 rounded-full"></div>
                          <h3 className="text-base sm:text-lg font-semibold text-red-700">Non-Vegetarian Options</h3>
                          <span className="text-xs sm:text-sm text-red-600">({nonVegCount} items)</span>
                        </div>
                        <div className="grid gap-3 sm:gap-4">
                          {filteredAndSortedItems
                            .filter(item => item.vegType === "Non-Veg")
                            .map((item, index) => (
                            <MenuItemCard key={`non-veg-${item.name}`} item={item} index={index + vegCount} />
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Items without veg type */}
                    {filteredAndSortedItems.filter(item => !item.vegType).length > 0 && (
                      <div className="grid gap-3 sm:gap-4">
                        {filteredAndSortedItems
                          .filter(item => !item.vegType)
                          .map((item, index) => (
                          <MenuItemCard key={`other-${item.name}`} item={item} index={index + vegCount + nonVegCount} />
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
      
      <DownloadMenuPopup
        isOpen={isDownloadPopupOpen}
        onClose={() => setIsDownloadPopupOpen(false)}
      />
    </>
  );
};

// Separate component for menu item card
const MenuItemCard = ({ item, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: index * 0.05 }}
    className="flex flex-col sm:flex-row sm:justify-between sm:items-start p-3 sm:p-5 rounded-xl border border-gray-200 hover:border-amber-300 hover:shadow-lg transition-all duration-200 bg-white hover:bg-amber-50"
  >
    <div className="flex-1 mb-3 sm:mb-0">
      <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 mb-2">
        <h3 className="text-lg sm:text-xl font-medium font-serif-ui text-zinc-800">
          {item.name}
        </h3>
        {item.vegType && (
          <span className={`px-2 sm:px-3 py-1 rounded-full text-xs font-semibold border-2 self-start ${
            item.vegType === "Veg" 
              ? "bg-green-50 text-green-700 border-green-300" 
              : "bg-red-50 text-red-700 border-red-300"
          }`}>
            {item.vegType === "Veg" ? "🟢 Veg" : "🔴 Non-Veg"}
          </span>
        )}
      </div>
      {item.description && (
        <p className="text-zinc-600 text-sm leading-relaxed">{item.description}</p>
      )}
    </div>
    <div className="sm:ml-4 text-left sm:text-right">
      <span className="text-lg sm:text-xl font-bold text-amber-600">{item.price}</span>
    </div>
  </motion.div>
);

export default MenuPopup;