import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { COLORS } from './OpeningAnimation';

// Add styles to the document head
const addStyles = () => {
  const styleEl = document.createElement('style');
  styleEl.textContent = `
    @keyframes borderGlow {
      0% { background-position: 0% 50%; }
      50% { background-position: 100% 50%; }
      100% { background-position: 0% 50%; }
    }
    
    .back-to-top-border-glow {
      background: linear-gradient(45deg, transparent, ${COLORS.delayedCyan}, transparent);
      background-size: 200% 200%;
      animation: borderGlow 2s linear infinite;
      opacity: 0.3;
    }
  `;
  document.head.appendChild(styleEl);
  return () => {
    if (styleEl.parentNode) {
      document.head.removeChild(styleEl);
    }
  };
};

const BackToTop = () => {
  const [isVisible, setIsVisible] = useState(false);
  
  // Add CSS styles on component mount
  useEffect(() => {
    return addStyles();
  }, []);
  
  // Show button when user scrolls down 200px
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 200) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };
    
    // Check visibility immediately
    toggleVisibility();
    
    // Then add scroll listener
    window.addEventListener('scroll', toggleVisibility);
    
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);
  
  const scrollToTop = () => {
    try {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    } catch (error) {
      // Fallback for older browsers
      window.scrollTo(0, 0);
    }
    
    // Force check visibility
    setTimeout(() => {
      if (window.pageYOffset <= 200) {
        setIsVisible(false);
      }
    }, 1000);
  };
  
  return (
    <div style={{ position: 'relative', zIndex: 9999 }}>
      <AnimatePresence>
        {isVisible && (
          <motion.button
            style={{
              position: 'fixed',
              bottom: '2rem',
              right: '2rem',
              padding: '12px',
              zIndex: 9999,
              borderRadius: '50%',
              backgroundColor: 'rgba(0, 0, 0, 0.6)',
              border: `1px solid ${COLORS.delayedCyan}`,
              boxShadow: `0 0 15px ${COLORS.delayedCyan}50`,
              backdropFilter: 'blur(5px)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
            onClick={scrollToTop}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            whileHover={{ 
              scale: 1.1,
              boxShadow: `0 0 20px ${COLORS.delayedCyan}80`,
              y: -3
            }}
            whileTap={{ scale: 0.95 }}
          >
            {/* Arrow Up Icon */}
            <svg 
              width="20" 
              height="20" 
              viewBox="0 0 24 24" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
              style={{ 
                stroke: COLORS.delayedCyan,
                filter: `drop-shadow(0 0 2px ${COLORS.delayedCyan})` 
              }}
            >
              <path 
                d="M12 19V5M5 12L12 5L19 12" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              />
            </svg>
            
            {/* Animated border glow effect */}
            <div style={{
              position: 'absolute',
              inset: 0,
              zIndex: -1,
              borderRadius: '50%',
              background: `linear-gradient(45deg, transparent, ${COLORS.delayedCyan}, transparent)`,
              backgroundSize: '200% 200%',
              animation: 'borderGlow 2s linear infinite',
              opacity: 0.3
            }} />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
};

export default BackToTop; 