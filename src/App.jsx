import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Hero from './components/home/Hero'
import Story from './components/home/Story'
import TastefulRecipes from './components/home/TastefulRecipes' // Add this import
import Menu from './components/home/Menu'
import Contact from './components/home/Contact'
import Footer from './components/layout/Footer'
import useScrollAnimation from './hooks/useScrollAnimation'
import { PopupProvider } from './contexts/PopupContext';
import PerfectBlend from './components/home/PerfectBlend'
import Reservation from './components/home/Reservation' // Add this import
import { LoadingProvider } from './contexts/LoadingContext';
import { GalleryProvider } from './contexts/GalleryContext';
import Gallery from './components/gallery/Gallery';
import { AboutProvider } from './contexts/AboutContext';
import AboutPopup from './components/home/AboutUs';
import { useAbout } from './contexts/AboutContext';
import { TransitionProvider } from './contexts/TransitionContext';

const AppRoutes = () => {
  const location = useLocation();
  useScrollAnimation();

  return (
    <Routes location={location} key={location.pathname}>
      <Route path="/gallery" element={<Gallery />} />
      <Route path="/" element={
        <main className="relative">
          <Navbar />
          <Hero />
          <div className="relative z-20 bg-white">
            <Story />
            <TastefulRecipes />
            <Menu />
            <PerfectBlend />
            <Reservation />
            <Contact />
            <Footer />
          </div>
        </main>
      } />
    </Routes>
  );
};

const AppContent = () => {
  const { isAboutOpen, closeAbout } = useAbout();
  
  return (
    <>
      <BrowserRouter>
        <LoadingProvider>
          <PopupProvider>
            <GalleryProvider>
              <AppRoutes />
            </GalleryProvider>
          </PopupProvider>
        </LoadingProvider>
      </BrowserRouter>
      <AboutPopup isOpen={isAboutOpen} onClose={closeAbout} />
    </>
  );
};

const App = () => {
  return (
    <AboutProvider>
      <TransitionProvider>
        <AppContent />
      </TransitionProvider>
    </AboutProvider>
  );
};

export default App;
