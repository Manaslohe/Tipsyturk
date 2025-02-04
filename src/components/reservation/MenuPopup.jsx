import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const categories = [
  "All",
  "Starters & Appetizers",
  "Indian Specialties",
  "Middle Eastern",
  "Burgers & Sandwiches",
  "Sharing Platters",
  "Breads & Sides"
];

const menuItems = [
  // Starters & Appetizers
  {
    name: "Smoked Veggie Bruschetta",
    description: "Lovely colorful toasties with seasoned tomatoes & olive oil",
    price: "₹355",
    category: "Starters & Appetizers"
  },
  {
    name: "Smoked Chicken Bruschetta",
    description: "Smoked chicken toasties with seasoned tomatoes & olive oil",
    price: "₹395",
    category: "Starters & Appetizers"
  },
  {
    name: "Korean Cheesy Garlic Bun",
    description: "Cream cheese, parsley garlic butter, toasted & served with marinara sauce",
    price: "₹395",
    category: "Starters & Appetizers"
  },
  {
    name: "Spicy Fried Sausages",
    description: "Spicy chicken sausages fried to perfection with special dips",
    price: "₹395",
    category: "Starters & Appetizers"
  },
  // North Indian Starters
  {
    name: "Paneer Tikka",
    description: "Vegetarian",
    price: "₹445",
    category: "Indian Specialties"
  },
  {
    name: "Paneer Malai Tikka",
    description: "Vegetarian",
    price: "₹445",
    category: "Indian Specialties"
  },
  {
    name: "Broccoli Mushrooms Tikka",
    description: "Vegetarian",
    price: "₹395",
    category: "Indian Specialties"
  },
  {
    name: "Snack Daal",
    description: "Vegetarian",
    price: "₹395",
    category: "Indian Specialties"
  },
  {
    name: "Chicken Tikka",
    description: "Non-vegetarian",
    price: "₹495",
    category: "Indian Specialties"
  },
  {
    name: "Chicken Malai Tikka",
    description: "Non-vegetarian",
    price: "₹495",
    category: "Indian Specialties"
  },
  {
    name: "Chicken Sukha",
    description: "Non-vegetarian",
    price: "₹495",
    category: "Indian Specialties"
  },
  {
    name: "Mutton Sukha",
    description: "Non-vegetarian",
    price: "₹595",
    category: "Indian Specialties"
  },
  
  // Indian Main Course
  {
    name: "Paneer Makhani",
    description: "Vegetarian",
    price: "₹495",
    category: "Indian Specialties"
  },
  {
    name: "Afghani Paneer Gravy",
    description: "Vegetarian",
    price: "₹495",
    category: "Indian Specialties"
  },
  {
    name: "Broccoli Mushrooms Makhani",
    description: "Vegetarian",
    price: "₹395",
    category: "Indian Specialties"
  },
  {
    name: "Mix Makhani",
    description: "Vegetarian",
    price: "₹495",
    category: "Indian Specialties"
  },
  {
    name: "Daal Makhani",
    description: "Vegetarian",
    price: "₹495",
    category: "Indian Specialties"
  },
  {
    name: "Double Daal Tadka",
    description: "Vegetarian",
    price: "₹495",
    category: "Indian Specialties"
  },
  {
    name: "Dhaba Daal",
    description: "Vegetarian",
    price: "₹495",
    category: "Indian Specialties"
  },
  {
    name: "Smoked Butter Chicken",
    description: "Non-vegetarian",
    price: "₹495",
    category: "Indian Specialties"
  },
  {
    name: "Chicken Curry",
    description: "Non-vegetarian",
    price: "₹495",
    category: "Indian Specialties"
  },
  {
    name: "Afghani Chicken Gravy",
    description: "Vegetarian",
    price: "₹495",
    category: "Indian Specialties"
  },
  {
    name: "Mutton Curry",
    description: "Non-vegetarian",
    price: "₹595",
    category: "Indian Specialties"
  },
  {
    name: "Mutton Kheema",
    description: "Non-vegetarian",
    price: "₹595",
    category: "Indian Specialties"
  },

  // Middle Eastern
  {
    name: "Falafel & Hummus Bowl",
    description: "Fried chickpeas patty served on a bed of hummus",
    price: "₹395",
    category: "Middle Eastern"
  },

  // Indian Bread
  {
    name: "Tandoori Roti",
    description: "Vegetarian",
    price: "₹55",
    category: "Breads & Sides"
  },
  {
    name: "Butter Tandoori Roti",
    description: "Vegetarian",
    price: "₹65",
    category: "Breads & Sides"
  },
  {
    name: "Biscuit Masala Roti",
    description: "Vegetarian",
    price: "₹70",
    category: "Breads & Sides"
  },
  {
    name: "Plain Naan",
    description: "Vegetarian",
    price: "₹70",
    category: "Breads & Sides"
  },
  {
    name: "Butter Naan",
    description: "Vegetarian",
    price: "₹80",
    category: "Breads & Sides"
  },
  {
    name: "Butter Garlic Naan",
    description: "Vegetarian",
    price: "₹90",
    category: "Breads & Sides"
  },
  {
    name: "Cheese Garlic Naan",
    description: "Vegetarian",
    price: "₹120",
    category: "Breads & Sides"
  },
  {
    name: "Laccha Paratha",
    description: "Vegetarian",
    price: "₹80",
    category: "Breads & Sides"
  },

  // Biryani Rice
  {
    name: "Jeera Rice",
    description: "Vegetarian",
    price: "₹195",
    category: "Biryani Rice"
  },
  {
    name: "Lahsun Jeera Rice",
    description: "Vegetarian",
    price: "₹225",
    category: "Biryani Rice"
  },
  {
    name: "Biryani Rice",
    description: "Vegetarian",
    price: "₹225",
    category: "Biryani Rice"
  },
  {
    name: "Chicken Biryani",
    description: "Non-vegetarian",
    price: "₹495",
    category: "Biryani Rice"
  },
  {
    name: "Mutton Biryani",
    description: "Non-vegetarian",
    price: "₹595",
    category: "Biryani Rice"
  },

  // Wood-fired Burgers
  {
    name: "Wood-fired American Veg Burger",
    description: "Veg patty, cheddar cheese, lettuce, caramelized onions, burger sauce, mustard & ketchup, served with fries & dip",
    price: "₹395",
    category: "Burgers & Sandwiches"
  },
  {
    name: "Smoked Shrooms Veggie Burger",
    description: "Sauteed mushrooms, smoked cheese, lettuce, spicy sauce, served with fries & dip",
    price: "₹395",
    category: "Burgers & Sandwiches"
  },
  {
    name: "Skipper's Chicken Burger",
    description: "Chicken patty, cheddar cheese, lettuce tomatoes, caramelized onions, burger sauce, mustard & ketchup, served with fries & dip",
    price: "₹395",
    category: "Burgers & Sandwiches"
  },
  {
    name: "Spicy BBQ Chicken Burger",
    description: "Flame grilled chicken, BBQ sauce, spicy sauce, lettuce, served with fries & dip",
    price: "₹395",
    category: "Burgers & Sandwiches"
  },
  {
    name: "Juicy Lucy Chicken Burger",
    description: "Chicken burger patty stuffed with cheese, served with fries and dip",
    price: "₹495",
    category: "Burgers & Sandwiches"
  },
  {
    name: "Bomber Mutton Burger",
    description: "This Bomber mutton burger is the closest thing to a classic American hamburger",
    price: "₹595",
    category: "Burgers & Sandwiches"
  },
  {
    name: "Spicy BBQ Mutton Burger",
    description: "Flame grilled mutton patty, BBQ sauce, spicy sauce, lettuce, served with fries & dip",
    price: "₹595",
    category: "Burgers & Sandwiches"
  },
  {
    name: "Chimichurri Toasties",
    description: "Grilled chicken meatball & toast with sauce",
    price: "₹495",
    category: "Burgers & Sandwiches"
  },
  {
    name: "Mini Burgers Veg",
    description: "Pack of 3 mini burgers served with fries & dip",
    price: "₹395",
    category: "Burgers & Sandwiches"
  },
  {
    name: "Mini Burgers Chicken",
    description: "Pack of 3 mini burgers served with fries & dip",
    price: "₹395",
    category: "Burgers & Sandwiches"
  },
  {
    name: "OG Frankfurter Chicken Hotdog",
    description: "Long, loaded hotdog with spicy sauces and cheese",
    price: "₹395",
    category: "Burgers & Sandwiches"
  },
  {
    name: "OG Frankfurter Pork Hotdog",
    description: "Long, loaded hotdog with spicy sauces and cheese",
    price: "₹495",
    category: "Burgers & Sandwiches"
  },
  {
    name: "Pulled Chicken Sandwich",
    description: "Slow cooked pulled chicken sandwich served with spicy sauce, fries and dip",
    price: "₹395",
    category: "Burgers & Sandwiches"
  },
  {
    name: "Fried Chicken Sandwich",
    description: "Fried chicken, coleslaw, burger sauce, gherkins, served with fries and dip",
    price: "₹495",
    category: "Burgers & Sandwiches"
  },

  // Sharing Platters
  {
    name: "Cheese, Fruits & Crackers Board",
    description: "Fresh fruits, assorted cheese, crackers served with dips & salad",
    price: "₹495",
    category: "Sharing Platters"
  },

  // Breads & Sides
  {
    name: "Pita Chip & Dip",
    description: "Fried pita, grilled pita, classic fries, peri peri fries served with assorted dip bowls",
    price: "₹395",
    category: "Breads & Sides"
  },
  {
    name: "Peri Peri Fries",
    description: "Peri peri fries served with two house special dips",
    price: "₹295",
    category: "Breads & Sides"
  }
];

const MenuPopup = ({ isOpen, onClose }) => {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredItems = activeCategory === "All" 
    ? menuItems 
    : menuItems.filter(item => item.category === activeCategory);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 flex items-start justify-center overflow-y-auto pt-4 z-[999999]">
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
            className="relative bg-white rounded-xl w-full max-w-6xl mx-4 my-4 overflow-hidden z-[1000000]"
            onClick={e => e.stopPropagation()}
          >
            {/* Header */}
            <div className="border-b border-gray-200 p-6 sticky top-0 bg-white z-10">
              <div className="flex justify-between items-center mb-6">
                <h2>
                  <span 
                    className="block text-5xl text-amber-500 mb-1" 
                    style={{ fontFamily: 'BillyOhio' }}
                  >
                    Discover
                  </span>
                  <span className="block text-3xl font-bold font-serif-ui text-zinc-700">
                    Our Menu
                  </span>
                </h2>
                <button onClick={onClose} className="text-zinc-500 hover:text-zinc-700">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="flex space-x-3 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-amber-500 scrollbar-track-gray-100">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setActiveCategory(category)}
                    className={`px-4 py-2 rounded-full whitespace-nowrap transition-colors flex-shrink-0 ${
                      activeCategory === category
                        ? 'bg-amber-500 text-white'
                        : 'bg-gray-100 text-zinc-600 hover:bg-gray-200'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            {/* Menu Items */}
            <div className="p-6 overflow-y-auto max-h-[calc(90vh-180px)]">
              <div className="grid gap-6">
                {filteredItems.map((item, index) => (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex justify-between items-start p-4 rounded-lg hover:bg-gray-50"
                  >
                    <div>
                      <h3 className="text-xl font-medium font-serif-ui text-zinc-800">
                        {item.name}
                      </h3>
                      <p className="text-zinc-600 mt-1">{item.description}</p>
                    </div>
                    <span className="text-amber-500 font-medium">{item.price}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default MenuPopup;
