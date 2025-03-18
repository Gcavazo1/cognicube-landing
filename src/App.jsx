import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

// Components
import OpeningAnimation, { COLORS } from './components/OpeningAnimation';
import CyberpunkOverlay from './components/CyberpunkOverlay';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import FeaturesSection from './components/FeaturesSection';
import AdvancedFeaturesSection from './components/AdvancedFeaturesSection';
import UseCasesSection from './components/UseCasesSection';
import TestimonialsSection from './components/TestimonialsSection';
import PricingSection from './components/PricingSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import PlaceholderBackground from './components/PlaceholderBackground';
import BackToTop from './components/BackToTop';

// Import background image for preloading
import backgroundImage from './assets/background.png';

function App() {
  const [loading, setLoading] = useState(true);
  const [mainContentReady, setMainContentReady] = useState(false);
  const [transitionComplete, setTransitionComplete] = useState(false);
  const [transitionInProgress, setTransitionInProgress] = useState(false);
  
  useEffect(() => {
    // Add global styles directly
    const style = document.createElement('style');
    style.textContent = `
      html, body, #root {
        margin: 0;
        padding: 0;
        width: 100%;
        height: 100%;
        background-color: #000000;
        color: white;
        font-family: 'Inter', sans-serif;
      }
      
      /* Critical fix: Enable scrolling */
      html {
        scroll-behavior: smooth;
        overflow-y: auto !important;
        overflow-x: hidden;
      }
      
      /* Enable scrolling on body */
      body {
        overflow-y: auto !important;
        overflow-x: hidden;
        min-height: 100vh;
        display: block;
      }
      
      /* Show scrollbar */
      ::-webkit-scrollbar {
        width: 8px;
        background-color: rgba(0, 0, 0, 0.5);
      }
      
      ::-webkit-scrollbar-thumb {
        background-color: ${COLORS.delayedCyan}80;
        border-radius: 10px;
      }
      
      ::-webkit-scrollbar-track {
        background-color: rgba(0, 0, 0, 0.3);
      }
      
      #root {
        display: flex;
        flex-direction: column;
        min-height: 100vh;
        overflow-y: auto !important;
        overflow-x: hidden;
      }
      
      /* Content must be scrollable */
      .content-container {
        position: relative;
        width: 100%;
        z-index: 10;
        overflow: visible;
      }
      
      /* Make sure sections take full viewport height */
      section {
        position: relative;
        min-height: 100vh;
        display: flex;
        align-items: center;
        width: 100%;
      }
      
      /* Fix button styling */
      .primary-button:hover {
        transform: translateY(-2px);
        transition: all 0.3s ease;
      }
      
      .secondary-button:hover {
        transform: translateY(-2px);
        transition: all 0.3s ease;
      }
    `;
    document.head.appendChild(style);
    
    return () => {
      if (style.parentNode) {
        document.head.removeChild(style);
      }
    };
  }, []);
  
  useEffect(() => {
    // Apply global styles for cyberpunk fonts
    document.documentElement.style.setProperty('--cyber-font', "'Cyber Alert', 'Rajdhani', sans-serif");
    document.documentElement.style.setProperty('--lunar-font', "'Lunar Escape', 'Orbitron', sans-serif");
  }, []);
  
  // Preload main content before the transition completes
  useEffect(() => {
    // Preload main content in the background, but only AFTER "Click to Enter" is visible
    // We'll start this process when transitionInProgress is set to true
    if (transitionInProgress && !mainContentReady) {
      setMainContentReady(true);
    }
  }, [transitionInProgress, mainContentReady]);
  
  // Register a notification when animation is ready
  const handleAnimationReady = () => {
    // Animation is now showing "Click to Enter" prompt
    // but we don't want to prep the main content yet to avoid flashing
  };
  
  // Notify when user starts transition (clicks the button)
  const handleTransitionStart = () => {
    // User has clicked, now we can begin prepping main content
    setTransitionInProgress(true);
    
    // We'll start preloading content while the zoom animation plays
    // This gives us ~2 seconds to prepare the content
  };
  
  const handleAnimationComplete = () => {
    // Main content should be ready by this point
    setTransitionComplete(true);
    
    // After a short delay, complete the transition by removing the opening animation
    setTimeout(() => {
      setLoading(false);
      
      // Make document scrollable
      document.documentElement.style.overflow = 'auto';
      document.body.style.overflow = 'auto';
    }, 800); // Shorter delay for smoother transition
  };
  
  return (
    <>
      {/* Preload background image */}
      <img 
        src={backgroundImage} 
        alt="Preload background" 
        style={{ 
          position: 'absolute', 
          width: 1, 
          height: 1, 
          opacity: 0,
          pointerEvents: 'none',
          zIndex: -9999
        }} 
      />
      
      {/* Background with fixed positioning - always visible */}
      <div 
        style={{ 
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: 0,
          backgroundColor: '#000000',
          pointerEvents: 'none'
        }}
      >
        <PlaceholderBackground show={transitionInProgress} />
        
        {/* Semi-transparent overlay */}
        <div 
          style={{ 
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            backdropFilter: 'blur(2px)',
            zIndex: 1,
            pointerEvents: 'none'
          }}
        />
      </div>
      
      {/* Cyberpunk overlay effects */}
      <CyberpunkOverlay intensity={0.1} />
      
      {/* Loading/Opening animation layer */}
      <AnimatePresence mode="wait">
        {loading && (
          <OpeningAnimation 
            key="opening" 
            onComplete={handleAnimationComplete}
            onReady={handleAnimationReady}
            onTransitionStart={handleTransitionStart}
          />
        )}
      </AnimatePresence>
      
      {/* Main content - initially hidden, then fades in */}
      {mainContentReady && (
        <motion.div 
          key="main-content" 
          initial={{ opacity: 0 }}
          animate={{ 
            opacity: transitionComplete ? 1 : 0, // Completely invisible until animation is done
            scale: transitionComplete ? 1 : 0.6, // Start much more zoomed out
          }}
          transition={{ 
            opacity: { duration: 1.8, ease: "easeInOut" }, // Slower fade-in
            scale: { duration: 4.2, ease: [0.16, 0.8, 0.3, 1] } // Much slower zoom for dramatic effect
          }}
          style={{
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            minHeight: '100vh',
            width: '100%',
            zIndex: loading ? 5 : 10, // Behind opening animation when loading
            overflow: 'visible',
            pointerEvents: transitionComplete ? 'auto' : 'none', // Prevent interaction until fully transitioned
            transformOrigin: 'center center' // Ensure zoom is from center
          }}
        >
          {/* Fixed navbar */}
          <Navbar />
          
          {/* Back to top button */}
          <BackToTop />
          
          {/* Main content - scrollable */}
          <main 
            className="content-container"
            style={{
              position: 'relative',
              width: '100%',
              zIndex: 10,
              overflowY: 'visible',
              paddingTop: '70px' // Ensure content starts below navbar
            }}
          >
            <HeroSection />
            <FeaturesSection />
            <AdvancedFeaturesSection />
            <UseCasesSection />
            <TestimonialsSection />
            <PricingSection />
            <ContactSection />
            <Footer />
          </main>
        </motion.div>
      )}
    </>
  );
}

export default App;
