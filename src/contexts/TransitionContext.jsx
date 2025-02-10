import { createContext, useContext, useState, useCallback } from 'react';
import { AnimatePresence } from 'framer-motion'; // Add this import
import PageTransition from '../components/transitions/PageTransition';

const TransitionContext = createContext();

export const TransitionProvider = ({ children }) => {
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [key, setKey] = useState(0); // Add key to force remount

  const startTransition = useCallback(() => {
    setKey(prev => prev + 1); // Increment key to force remount
    setIsTransitioning(true);
  }, []);

  const endTransition = useCallback(() => {
    setIsTransitioning(false);
  }, []);

  return (
    <TransitionContext.Provider value={{ startTransition, endTransition }}>
      {children}
      <AnimatePresence mode="wait">
        {isTransitioning && (
          <div key={key} className="fixed inset-0 z-[100] pointer-events-none">
            <PageTransition />
          </div>
        )}
      </AnimatePresence>
    </TransitionContext.Provider>
  );
};

export const useTransition = () => {
  const context = useContext(TransitionContext);
  if (!context) {
    throw new Error('useTransition must be used within a TransitionProvider');
  }
  return context;
};
