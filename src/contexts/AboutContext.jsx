import { createContext, useContext, useState } from 'react';

const AboutContext = createContext();

export const AboutProvider = ({ children }) => {
  const [isAboutOpen, setIsAboutOpen] = useState(false);

  const openAbout = () => setIsAboutOpen(true);
  const closeAbout = () => setIsAboutOpen(false);

  return (
    <AboutContext.Provider value={{ isAboutOpen, openAbout, closeAbout }}>
      {children}
    </AboutContext.Provider>
  );
};

export const useAbout = () => {
  const context = useContext(AboutContext);
  if (!context) {
    throw new Error('useAbout must be used within an AboutProvider');
  }
  return context;
};
