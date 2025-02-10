import { createContext, useContext, useState } from 'react';

const GalleryContext = createContext();

export const GalleryProvider = ({ children }) => {
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('Ambiance');

  const openGallery = (category = 'Ambiance') => {
    setSelectedCategory(category);
    setIsGalleryOpen(true);
  };

  const closeGallery = () => {
    setIsGalleryOpen(false);
  };

  return (
    <GalleryContext.Provider value={{
      isGalleryOpen,
      selectedCategory,
      openGallery,
      closeGallery,
      setSelectedCategory
    }}>
      {children}
    </GalleryContext.Provider>
  );
};

export const useGallery = () => useContext(GalleryContext);
