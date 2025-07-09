import React, { useState, useMemo, useRef, useEffect } from 'react';
import DownloadMenuPopup from './DownloadMenuPopup';
import { categories, menuItems } from './MenuData';
import { useNavigate } from 'react-router-dom';

// Helper to count items per category and veg/non-veg
const getCategoryStats = (category) => {
  const items = menuItems.filter(item => item.category === category);
  const veg = items.filter(i => i.vegType === 'Veg').length;
  const nonVeg = items.filter(i => i.vegType === 'Non-Veg').length;
  return { total: items.length, veg, nonVeg };
};

// Category to image mapping
const categoryImages = {
  "Bar Bites": "/Categories/barbites.png",
  "Appetizers, Chips, and Dips": "/Categories/APPETIZERS.png",
  "Middle Eastern Platters & Mains": "/Categories/platters.png",
  "Indian Specialties": "/Categories/Specialties.png",
  "Oriental": "/Categories/Oriental.png",
  "Soups & Salads": "/Categories/salad.png",
  "Burgers": "/Categories/burger.png",
  "Wood-Fired Pizzas": "/Categories/pizza.png",
  "Pastas": "/Categories/pasta.png",
  "North Indian Mains": "/Categories/northindian.png",
  "Naans / Rotis": "/Categories/naan.png",
  "Dal Preparation": "/Categories/dal.png",
  "Rice Preparation": "/Categories/rice.png",
  "Dessert": "/Categories/desert.png",
  "Extras": "/Categories/extras.png",
};

const MenuPopup = () => {
  const [activeCategory, setActiveCategory] = useState(null); // null = categories view
  const [isDownloadPopupOpen, setIsDownloadPopupOpen] = useState(false);
  const [vegFilter, setVegFilter] = useState("All");
  const [sortBy, setSortBy] = useState("Default");
  const navigate = useNavigate();

  const getNumericPrice = (priceString) => {
    const match = priceString.match(/₹(\d+)/);
    return match ? parseInt(match[1]) : 0;
  };

  // Filter/sort items for selected category
  const filteredAndSortedItems = useMemo(() => {
    if (!activeCategory) return [];
    let filtered = menuItems.filter(item => item.category === activeCategory);

    if (vegFilter !== "All") {
      filtered = filtered.filter(item =>
        vegFilter === "Veg" ? item.vegType === "Veg" : item.vegType === "Non-Veg"
      );
    }

    let sorted = [...filtered];
    if (sortBy === "Price Low-High") {
      sorted.sort((a, b) => getNumericPrice(a.price) - getNumericPrice(b.price));
    } else if (sortBy === "Price High-Low") {
      sorted.sort((a, b) => getNumericPrice(b.price) - getNumericPrice(a.price));
    } else if (sortBy === "Name A-Z") {
      sorted.sort((a, b) => a.name.localeCompare(b.name));
    }
    return sorted;
  }, [activeCategory, vegFilter, sortBy]);

  // Group items by veg/non-veg for display
  const groupedItems = useMemo(() => {
    if (!filteredAndSortedItems.length) return {};
    return {
      Veg: filteredAndSortedItems.filter(i => i.vegType === 'Veg'),
      'Non-Veg': filteredAndSortedItems.filter(i => i.vegType === 'Non-Veg'),
      Other: filteredAndSortedItems.filter(i => !i.vegType),
    };
  }, [filteredAndSortedItems]);

  // Breadcrumbs
  const Breadcrumbs = () => (
    <nav className="flex items-center gap-2 text-sm mb-4">
      <button
        className="text-amber-600 hover:underline"
        onClick={() => {
          setActiveCategory(null);
          setVegFilter("All");
          setSortBy("Default");
        }}
      >
        Categories
      </button>
      {activeCategory && (
        <>
          <span className="text-zinc-400">/</span>
          <span className="font-semibold text-zinc-700">{activeCategory}</span>
        </>
      )}
    </nav>
  );

  // CategoryCard with lazy loading background image
  const CategoryCard = ({ category, onClick, imageUrl, children }) => {
    const ref = useRef();
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
      const observer = new window.IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.disconnect();
          }
        },
        { rootMargin: '100px' }
      );
      if (ref.current) observer.observe(ref.current);
      return () => observer.disconnect();
    }, []);

    return (
      <button
        ref={ref}
        onClick={onClick}
        className="group flex flex-col items-center justify-center p-3 sm:p-6 rounded-2xl border border-amber-100 bg-white hover:bg-amber-50 hover:border-amber-400 shadow-sm hover:shadow-md transition text-center relative focus:outline-none focus:ring-2 focus:ring-amber-300 overflow-hidden"
        style={{
          minHeight: '140px',
          backgroundImage: isVisible && imageUrl ? `url(${imageUrl.replace(/ /g, '%20')})` : undefined,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundColor: '#f8fafc', // fallback color
        }}
      >
        {/* Black overlay tint for readability */}
        {isVisible && imageUrl && (
          <span
            className="absolute inset-0 w-full h-full bg-black opacity-50 z-0 pointer-events-none"
            aria-hidden="true"
          />
        )}
        <span className="relative z-10 font-semibold text-xs sm:text-base text-white mb-0.5 truncate w-full" style={{textShadow: isVisible && imageUrl ? '0 1px 6px rgba(0,0,0,0.45)' : undefined}}>{children}</span>
      </button>
    );
  };

  return (
    <div className="min-h-screen w-full flex flex-col bg-gradient-to-br from-amber-50 via-white to-amber-100">
      {/* Header */}
      <div className="border-b border-amber-100 px-2 sm:px-6 py-2 sm:py-4 sticky top-0 bg-white/90 backdrop-blur z-10 w-full shadow-sm">
        <div className="max-w-screen-2xl mx-auto flex items-center justify-between gap-2">
          {/* Left: Back button */}
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-1 px-2 py-2 rounded-full border border-amber-200 bg-white text-amber-500 hover:bg-amber-50 font-semibold shadow-sm transition text-xs sm:text-sm"
            aria-label="Back"
          >
            <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" className="inline-block"><path d="M13 16l-4-4 4-4"/></svg>
            <span className="hidden sm:inline">Back</span>
          </button>
          {/* Center: Logo/Title */}
          <div className="flex flex-col items-center flex-1 min-w-0">
            <span
              className="text-2xl sm:text-3xl lg:text-4xl text-amber-500 font-bold leading-none"
              style={{ fontFamily: 'BillyOhio' }}
            >
              Discover
            </span>
            <span className="text-base sm:text-lg font-bold font-serif-ui text-zinc-700 leading-none truncate">
              Our Menu
            </span>
          </div>
          {/* Right: Download */}
          <button
            onClick={() => setIsDownloadPopupOpen(true)}
            className="group flex items-center gap-1 px-2 py-2 rounded-full border-2 border-amber-500 text-amber-500 font-bold hover:border-amber-600 hover:text-amber-600 transition-colors duration-200 text-xs sm:text-sm whitespace-nowrap"
            style={{ fontFamily: 'Reforma2018-Blanca' }}
          >
            <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" className="inline-block"><path d="M9 4v8m0 0l-3-3m3 3l3-3M4 14h10"/></svg>
            <span className="hidden sm:inline">Download Menu</span>
            <span className="sm:hidden">Download</span>
          </button>
        </div>
      </div>
      {/* Main Content */}
      <div className="flex-1 w-full max-w-screen-2xl mx-auto px-2 sm:px-6 py-4 sm:py-8 overflow-y-auto custom-scrollbar">
        {!activeCategory ? (
          <>
            <h3 className="text-xl sm:text-2xl font-bold text-zinc-700 mb-6 text-center">Browse Menu Categories</h3>
            <div className="grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-6">
              {categories.filter(c => c !== "All").map(category => (
                <CategoryCard
                  key={category}
                  category={category}
                  onClick={() => setActiveCategory(category)}
                  imageUrl={categoryImages[category]}
                >
                  {category}
                </CategoryCard>
              ))}
            </div>
          </>
        ) : (
          <>
            <Breadcrumbs />
            {/* Filters */}
            <div className="flex flex-col md:flex-row gap-2 sm:gap-4 mb-4 w-full">
              <div className="flex items-center gap-2 flex-1">
                <label className="text-xs sm:text-sm font-medium text-zinc-700 whitespace-nowrap">Diet:</label>
                <select
                  value={vegFilter}
                  onChange={(e) => setVegFilter(e.target.value)}
                  className="flex-1 px-2 sm:px-3 py-2 rounded-lg border border-gray-300 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                >
                  <option value="All">All Items</option>
                  <option value="Veg">🟢 Veg Only</option>
                  <option value="Non-Veg">🔴 Non-Veg Only</option>
                </select>
              </div>
              <div className="flex items-center gap-2 flex-1">
                <label className="text-xs sm:text-sm font-medium text-zinc-700 whitespace-nowrap">Sort:</label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="flex-1 px-2 sm:px-3 py-2 rounded-lg border border-gray-300 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                >
                  <option value="Default">Default</option>
                  <option value="Price Low-High">Price: Low to High</option>
                  <option value="Price High-Low">Price: High to Low</option>
                  <option value="Name A-Z">Name: A to Z</option>
                </select>
              </div>
              {(vegFilter !== "All" || sortBy !== "Default") && (
                <button
                  onClick={() => {
                    setVegFilter("All");
                    setSortBy("Default");
                  }}
                  className="px-3 py-2 text-xs sm:text-sm text-amber-600 hover:text-amber-700 font-medium self-start md:self-center"
                >
                  Clear Filters
                </button>
              )}
            </div>
            {/* Items */}
            {filteredAndSortedItems.length === 0 ? (
              <div className="text-center py-8 sm:py-12">
                <div className="text-4xl sm:text-6xl mb-4">🍽️</div>
                <h3 className="text-lg sm:text-xl font-medium text-zinc-700 mb-2">No items found</h3>
                <p className="text-sm sm:text-base text-zinc-500">Try adjusting your filters to see more items.</p>
              </div>
            ) : (
              <div className="space-y-8">
                {groupedItems.Veg && groupedItems.Veg.length > 0 && (
                  <div>
                    <div className="flex items-center gap-2 mb-3 pb-2 border-b border-green-200">
                      <div className="w-3 h-3 sm:w-4 sm:h-4 bg-green-500 rounded-full"></div>
                      <h3 className="text-base sm:text-lg font-semibold text-green-700">Vegetarian Options</h3>
                      <span className="text-xs sm:text-sm text-green-600">({groupedItems.Veg.length} items)</span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
                      {groupedItems.Veg.map((item, idx) => (
                        <MenuItemCard key={item.name + idx} item={item} />
                      ))}
                    </div>
                  </div>
                )}
                {groupedItems['Non-Veg'] && groupedItems['Non-Veg'].length > 0 && (
                  <div>
                    <div className="flex items-center gap-2 mb-3 pb-2 border-b border-red-200">
                      <div className="w-3 h-3 sm:w-4 sm:h-4 bg-red-500 rounded-full"></div>
                      <h3 className="text-base sm:text-lg font-semibold text-red-700">Non-Vegetarian Options</h3>
                      <span className="text-xs sm:text-sm text-red-600">({groupedItems['Non-Veg'].length} items)</span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
                      {groupedItems['Non-Veg'].map((item, idx) => (
                        <MenuItemCard key={item.name + idx} item={item} />
                      ))}
                    </div>
                  </div>
                )}
                {groupedItems.Other && groupedItems.Other.length > 0 && (
                  <div>
                    <div className="flex items-center gap-2 mb-3 pb-2 border-b border-amber-200">
                      <div className="w-3 h-3 sm:w-4 sm:h-4 bg-amber-400 rounded-full"></div>
                      <h3 className="text-base sm:text-lg font-semibold text-amber-700">Other Options</h3>
                      <span className="text-xs sm:text-sm text-amber-600">({groupedItems.Other.length} items)</span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
                      {groupedItems.Other.map((item, idx) => (
                        <MenuItemCard key={item.name + idx} item={item} />
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </>
        )}
      </div>

      <DownloadMenuPopup
        isOpen={isDownloadPopupOpen}
        onClose={() => setIsDownloadPopupOpen(false)}
      />
    </div>
  );
};

const MenuItemCard = ({ item }) => (
  <div
    className="flex flex-col h-full justify-between p-4 sm:p-6 rounded-xl border border-gray-200 hover:border-amber-300 hover:shadow-lg transition-all duration-200 bg-white hover:bg-amber-50"
  >
    <div className="flex-1 mb-2">
      <div className="flex flex-row items-center gap-2 mb-2">
        <h3 className="text-lg sm:text-xl font-semibold font-serif-ui text-zinc-800 flex-1">
          {item.name}
        </h3>
        {item.vegType && (
          <span className={`px-2 py-1 rounded-full text-xs font-semibold border-2 ${
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
    <div className="mt-2 text-right">
      <span className="text-lg sm:text-xl font-bold text-amber-600">{item.price}</span>
    </div>
  </div>
);

export default MenuPopup;