import { useState, useEffect } from 'react'
import { BrowserRouter } from 'react-router-dom';
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

function App() {
  useScrollAnimation()

  return (
    <LoadingProvider>
      <PopupProvider>
        <main className="relative">
          <Navbar />
          <Hero />
          <div className="relative z-20 bg-white">
            <Story />
            <TastefulRecipes />
            <Menu />
            <PerfectBlend /> {/* Add the new component here */}
            <Reservation /> {/* Add this component */}
            <Contact />
            <Footer />
          </div>
        </main>
      </PopupProvider>
    </LoadingProvider>
  );
}

export default App
