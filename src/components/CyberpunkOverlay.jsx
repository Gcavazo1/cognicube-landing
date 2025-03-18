import React, { useEffect, useState } from 'react';

// Cyberpunk colors for effects
const CYBERPUNK_COLORS = {
  neonYellow: '#FFDD00',
  neonPink: '#FF00FF',
  neonCyan: '#00FFFF', 
  turquoise: '#00DCDC',
  purple: '#9600FF',
  darkPurple: '#1A0030',
  black: '#000000',
  charcoal: '#111111'
};

const CyberpunkOverlay = ({ intensity = 0.1 }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  // Add styles to document head
  useEffect(() => {
    // Set mounted state to handle SSR
    setIsMounted(true);
    
    // Add the styles to the document
    try {
      const styleEl = document.createElement('style');
      styleEl.textContent = `
        @keyframes flicker {
          0% { opacity: 0.3; }
          5% { opacity: 0.35; }
          10% { opacity: 0.3; }
          15% { opacity: 0.4; }
          20% { opacity: 0.35; }
          25% { opacity: 0.3; }
          30% { opacity: 0.4; }
          35% { opacity: 0.3; }
          40% { opacity: 0.35; }
          45% { opacity: 0.3; }
          50% { opacity: 0.4; }
          55% { opacity: 0.35; }
          60% { opacity: 0.3; }
          65% { opacity: 0.4; }
          70% { opacity: 0.3; }
          75% { opacity: 0.35; }
          80% { opacity: 0.3; }
          85% { opacity: 0.4; }
          90% { opacity: 0.35; }
          95% { opacity: 0.3; }
          100% { opacity: 0.35; }
        }

        .scanlines {
          background: linear-gradient(
            to bottom,
            rgba(255, 255, 255, 0) 50%,
            rgba(0, 0, 0, 0.1) 50%
          );
          background-size: 100% 4px;
          animation: flicker 0.4s infinite;
          pointer-events: none;
        }

        .noise {
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
        }
      `;
      
      document.head.appendChild(styleEl);
      
      // Set visible with a slight delay to avoid flash
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 300);
      
      return () => {
        clearTimeout(timer);
        if (styleEl.parentNode) {
          document.head.removeChild(styleEl);
        }
      };
    } catch (error) {
      console.error("Error in CyberpunkOverlay:", error);
      return () => {};
    }
  }, []);

  // Don't render anything on server or if not mounted
  if (!isMounted || !isVisible) return null;

  return (
    <>
      {/* CRT scanlines effect - very subtle */}
      <div
        className="scanlines fixed inset-0 pointer-events-none z-40"
        style={{ opacity: intensity * 0.5 }}
      />
      
      {/* Noise texture overlay - very subtle */}
      <div
        className="noise fixed inset-0 pointer-events-none z-30"
        style={{ opacity: intensity * 0.2, mixBlendMode: 'overlay' }}
      />
      
      {/* Vignette effect */}
      <div 
        className="fixed inset-0 pointer-events-none z-30"
        style={{
          background: 'radial-gradient(circle, transparent 70%, rgba(0,0,0,0.4) 100%)',
          mixBlendMode: 'multiply',
          opacity: 0.5
        }}
      />
    </>
  );
};

export default CyberpunkOverlay; 