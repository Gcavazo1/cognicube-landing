import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';
import FractalTunnel from './FractalTunnel';

// Project color palette
export const COLORS = {
  delayedYellow: '#FFDD00', // Main brand color
  black: '#000000',
  darkGrey: '#121212',
  mediumGrey: '#2A2A2A',
  lightGrey: '#3F3F3F',
  cyan: '#00FFFF',
  delayedCyan: '#00FFFF', // Adding this for compatibility
  neonPink: '#FF00FF',
  neonBlue: '#00AAFF',
  white: '#FFFFFF',
};

// Enhanced cyberpunk colors
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

// Background plane that fills the screen
const FullscreenQuad = () => {
  return (
    <mesh>
      <planeGeometry args={[2, 2]} />
      <meshBasicMaterial color={COLORS.black} />
    </mesh>
  );
};

const OpeningAnimation = ({ 
  onComplete = () => {},
  onReady = () => {},
  onTransitionStart = () => {} 
}) => {
  const [showEnterPrompt, setShowEnterPrompt] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [zoomProgress, setZoomProgress] = useState(0);
  const [loadingNumbers, setLoadingNumbers] = useState("00");
  const [neuralStatus, setNeuralStatus] = useState("");
  const [neuralSequenceComplete, setNeuralSequenceComplete] = useState(false);
  const [numbersFading, setNumbersFading] = useState(false);
  const animationFrameRef = useRef(null);

  // When the enter prompt becomes visible, notify parent
  useEffect(() => {
    if (showEnterPrompt) {
      onReady();
    }
  }, [showEnterPrompt, onReady]);

  // Simulate loading numbers in bottom left - synchronized with neural sequence
  useEffect(() => {
    let frame = 0;
    let loadCount = 0;
    let isComplete = false;
    
    const updateLoadingNumbers = () => {
      frame++;
      
      // Calculate target load time to match neural sequence + button appearance
      // Estimating total neural sequence time around 6-7 seconds
      const targetFrames = 400; // Approx frames needed to complete around the same time
      const speedFactor = targetFrames / 99; // Scale to ensure we reach 99 at the right time
      
      // Update counter with gradually increasing speed
      if (frame % Math.max(2, Math.floor(speedFactor - loadCount / 20)) === 0) {
        loadCount++;
        const displayNum = Math.min(99, loadCount);
        setLoadingNumbers(displayNum.toString().padStart(2, '0'));
        
        // When we reach 99, wait briefly before starting to fade
        if (displayNum === 99 && !isComplete) {
          isComplete = true;
          // Wait a bit before triggering the fade-out animation
          setTimeout(() => {
            setNumbersFading(true);
          }, 600);
        }
      }
      
      // Continue animation unless explicitly stopped
      if (!isComplete || !numbersFading) {
        animationFrameRef.current = requestAnimationFrame(updateLoadingNumbers);
      }
    };
    
    animationFrameRef.current = requestAnimationFrame(updateLoadingNumbers);
    
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  // Neural network text sequence
  useEffect(() => {
    const neuralSequences = [
      "Initializing neural interface...",
      "Calibrating neural network...",
      "Neural network online."
    ];
    
    let sequenceIndex = 0;
    let charIndex = 0;
    let currentText = "";
    
    const typeNextChar = () => {
      if (sequenceIndex < neuralSequences.length) {
        const targetText = neuralSequences[sequenceIndex];
        
        if (charIndex < targetText.length) {
          // Type next character
          currentText += targetText[charIndex];
          setNeuralStatus(currentText);
          charIndex++;
          setTimeout(typeNextChar, 40 + Math.random() * 25); // Slightly slower typing
        } else {
          // Move to next sequence after pause
          setTimeout(() => {
            if (sequenceIndex === neuralSequences.length - 1) {
              // Last sequence complete, allow enter prompt to show
              setNeuralSequenceComplete(true);
            } else {
              currentText = "";
              charIndex = 0;
              sequenceIndex++;
              typeNextChar();
            }
          }, sequenceIndex === neuralSequences.length - 1 ? 400 : 500); // Slightly longer pauses
        }
      }
    };
    
    // Start typing after initial delay
    setTimeout(typeNextChar, 800);
    
    return () => clearTimeout(typeNextChar);
  }, []);

  // Show enter prompt after animation initializes and neural sequence completes
  useEffect(() => {
    if (neuralSequenceComplete) {
      const timer = setTimeout(() => {
        setShowEnterPrompt(true);
      }, 700);

      return () => clearTimeout(timer);
    }
  }, [neuralSequenceComplete]);

  // Handle the user clicking the "CLICK TO ENTER" button
  const handleCubeZoom = useCallback(() => {
    if (isTransitioning) return; // Prevent double-clicks
    
    setIsTransitioning(true);
    setShowEnterPrompt(false); // Hide the enter prompt immediately
    
    // Notify parent that transition has started
    onTransitionStart();
    
    // Start the zoom animation with slower timing
    let startTime = performance.now();
    const animationDuration = 2800; // 2.8 seconds for full transition (slower)
    
    const animateZoom = (currentTime) => {
      const elapsedTime = currentTime - startTime;
      const progress = Math.min(1, elapsedTime / animationDuration);
      
      // Use easeInOutQuart for smooth acceleration and deceleration
      // This creates a more gradual acceleration and gentle deceleration
      const easedProgress = progress < 0.5
        ? 8 * progress * progress * progress * progress
        : 1 - Math.pow(-2 * progress + 2, 4) / 2;
      
      setZoomProgress(easedProgress);
      
      if (progress < 1) {
        requestAnimationFrame(animateZoom);
      } else {
        // Animation complete
        onComplete(); // Notify parent component to show main content
      }
    };
    
    // Start animation
    requestAnimationFrame(animateZoom);
  }, [isTransitioning, onTransitionStart, onComplete]);

  return (
    <div className="fixed inset-0 z-50 w-full h-full overflow-hidden" style={{ margin: 0, padding: 0 }}>
      <Canvas 
        className="absolute inset-0"
        style={{ 
          position: 'absolute', 
          width: '100vw', 
          height: '100vh',
          margin: 0,
          padding: 0,
          display: 'block',
          left: 0,
          top: 0
        }}
        gl={{ antialias: true, alpha: false, stencil: false, depth: false }}
        dpr={[1, 2]}
        camera={{ position: [0, 0, 5], near: 0.1, far: 1000 }}
      >
        <Suspense fallback={<FullscreenQuad />}>
          <FractalTunnel 
            onFinishAnimation={() => {}} // Now controlled by neural sequence
            zoomProgress={zoomProgress}
            isTransitioning={isTransitioning}
          />
        </Suspense>
      </Canvas>
      
      {/* Neural network initialization status */}
      {neuralStatus && !showEnterPrompt && !isTransitioning && (
        <div 
          style={{
            position: 'absolute',
            bottom: '15%',
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 1000,
            textAlign: 'center',
            maxWidth: '90%'
          }}
        >
          <div className="neural-status-container">
            <p 
              className="neural-status-text"
              style={{
                fontFamily: 'var(--lunar-font)',
                fontSize: '18px',
                fontWeight: '500',
                letterSpacing: '0.05em',
                textAlign: 'center',
                margin: 0,
                position: 'relative',
              }}
            >
              {neuralStatus}<span className="blink-cursor">_</span>
            </p>
          </div>
        </div>
      )}
      
      {/* Enhanced CLICK TO ENTER button with RGB animation */}
      {showEnterPrompt && !isTransitioning && (
        <div 
          style={{
            position: 'absolute',
            left: '50%',
            bottom: '10%', // Lower position
            transform: 'translateX(-50%)',
            zIndex: 1000,
            padding: '12px 24px',
            background: 'rgba(0, 0, 0, 0.45)',
            borderRadius: '4px',
            boxShadow: `0 0 20px ${COLORS.delayedYellow}40, 0 0 60px ${COLORS.delayedYellow}20`,
            border: `1px solid ${COLORS.delayedYellow}80`,
            cursor: 'pointer',
            backdropFilter: 'blur(4px)',
            animation: 'pulse 2.5s infinite ease-in-out',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            fontFamily: 'var(--cyber-font)',
            overflow: 'hidden'
          }}
          onClick={handleCubeZoom}
          className="cyberpunk-button-container"
        >
          {/* Animated RGB edge effect */}
          <div className="rgb-border-effect"></div>
          
          <div className="cyberpunk-border-top" style={{
            position: 'absolute',
            top: '-2px',
            left: '10%',
            width: '80%',
            height: '2px',
            background: COLORS.delayedYellow
          }}></div>
          
          <p 
            style={{
              color: COLORS.delayedYellow,
              fontSize: '1.2rem', // Smaller font
              fontWeight: '600',
              textAlign: 'center',
              margin: 0,
              padding: 0,
              textShadow: `0 0 8px ${COLORS.delayedYellow}90`,
              position: 'relative'
            }}
            className="cyberpunk-text-glitch"
            data-text="CLICK TO ENTER"
          >
            CLICK TO ENTER
          </p>
          
          <div className="cyberpunk-border-bottom" style={{
            position: 'absolute',
            bottom: '-2px',
            right: '10%',
            width: '80%',
            height: '2px',
            background: COLORS.delayedYellow
          }}></div>
        </div>
      )}

      {/* Loading counter at bottom left */}
      {!isTransitioning && (
        <div 
          style={{
            position: 'absolute',
            left: '20px',
            bottom: '20px',
            zIndex: 1500,
            opacity: numbersFading ? 0 : 1,
            transform: numbersFading ? 'translateY(30px)' : 'translateY(0)',
            transition: 'opacity 1s ease-out, transform 1s ease-out'
          }}
        >
          <svg width="120px" height="100px" viewBox="0 0 120 100">
            <defs>
              <linearGradient id="numberGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor={CYBERPUNK_COLORS.neonCyan} />
                <stop offset="100%" stopColor={CYBERPUNK_COLORS.neonPink} />
              </linearGradient>
            </defs>
            <text
              x="50%"
              y="75"
              fontFamily="var(--cyber-font)"
              fontSize="90px"
              fontWeight="bold"
              textAnchor="middle"
              fill="url(#numberGradient)"
              stroke={COLORS.delayedYellow}
              strokeWidth="2px"
              style={{ 
                filter: `drop-shadow(0 0 5px ${CYBERPUNK_COLORS.neonCyan}90)`,
              }}
            >
              {loadingNumbers}
            </text>
          </svg>
        </div>
      )}

      {/* CSS for animations */}
      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 0.8; transform: translateX(-50%) scale(0.98); }
          50% { opacity: 1; transform: translateX(-50%) scale(1.02); }
        }
        
        @keyframes glow {
          0%, 100% { text-shadow: 0 0 8px ${COLORS.delayedYellow}60; }
          50% { text-shadow: 0 0 16px ${COLORS.delayedYellow}90, 0 0 30px ${COLORS.delayedYellow}30; }
        }
        
        .neural-status-text {
          background: linear-gradient(
            to right,
            ${CYBERPUNK_COLORS.neonCyan} 0%,
            ${CYBERPUNK_COLORS.neonPink} 50%,
            ${CYBERPUNK_COLORS.neonCyan} 100%
          );
          background-size: 200% auto;
          background-clip: text;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          text-shadow: 0 0 10px rgba(0, 255, 255, 0.3);
          animation: shimmer 3s linear infinite;
          display: inline-block;
        }
        
        @keyframes shimmer {
          0% {
            background-position: -100% 0;
          }
          100% {
            background-position: 100% 0;
          }
        }
        
        .blink-cursor {
          color: ${CYBERPUNK_COLORS.neonYellow};
          animation: blink-animation 1s steps(5, start) infinite;
          -webkit-text-fill-color: ${CYBERPUNK_COLORS.neonYellow};
        }
        
        @keyframes blink-animation {
          to {
            visibility: hidden;
          }
        }
        
        .cyberpunk-text-glitch {
          position: relative;
          animation: textGlow 2s infinite alternate-reverse;
        }
        
        .cyberpunk-text-glitch::before {
          content: attr(data-text);
          position: absolute;
          left: -2px;
          text-shadow: 3px 0 ${CYBERPUNK_COLORS.neonPink};
          background: rgba(0,0,0,0.2);
          overflow: hidden;
          clip: rect(0, 900px, 0, 0);
          animation: noise-anim 3s infinite linear alternate-reverse;
          width: 100%;
          height: 100%;
          top: 0;
          z-index: -1;
        }

        .cyberpunk-text-glitch::after {
          content: attr(data-text);
          position: absolute;
          left: 2px;
          text-shadow: -3px 0 ${CYBERPUNK_COLORS.neonCyan};
          background: rgba(0,0,0,0.2);
          overflow: hidden;
          clip: rect(0, 900px, 0, 0);
          animation: noise-anim-2 5s infinite linear alternate-reverse;
          width: 100%;
          height: 100%;
          top: 0;
          z-index: -2;
        }
        
        @keyframes noise-anim {
          0% {
            clip: rect(37px, 9999px, 21px, 0);
          }
          5% {
            clip: rect(23px, 9999px, 12px, 0);
          }
          10% {
            clip: rect(58px, 9999px, 64px, 0);
          }
          15% {
            clip: rect(0, 0, 0, 0);
          }
          20% {
            clip: rect(72px, 9999px, 43px, 0);
          }
          25% {
            clip: rect(0, 0, 0, 0);
          }
          30% {
            clip: rect(23px, 9999px, 92px, 0);
          }
          100% {
            clip: rect(0, 0, 0, 0);
          }
        }
        
        @keyframes noise-anim-2 {
          0% {
            clip: rect(12px, 9999px, 52px, 0);
          }
          5% {
            clip: rect(48px, 9999px, 24px, 0);
          }
          10% {
            clip: rect(58px, 9999px, 42px, 0);
          }
          15% {
            clip: rect(0, 0, 0, 0);
          }
          20% {
            clip: rect(0, 0, 0, 0);
          }
          25% {
            clip: rect(0, 0, 0, 0);
          }
          30% {
            clip: rect(23px, 9999px, 92px, 0);
          }
          100% {
            clip: rect(0, 0, 0, 0);
          }
        }
        
        @keyframes textGlow {
          0%, 18%, 22%, 25%, 53%, 57%, 100% {
            text-shadow: 0 0 10px ${COLORS.delayedYellow}90, 0 0 20px ${COLORS.delayedYellow}80;
          }
          20%, 24%, 55% { 
            text-shadow: none;
          }
        }
        
        .rgb-border-effect {
          position: absolute;
          inset: 0;
          padding: 2px;
          border-radius: 4px;
          background: linear-gradient(90deg, 
            ${CYBERPUNK_COLORS.neonCyan}, 
            ${CYBERPUNK_COLORS.neonPink}, 
            ${CYBERPUNK_COLORS.neonYellow},
            ${CYBERPUNK_COLORS.neonCyan});
          background-size: 400% 100%;
          animation: rgb-border-animation 3s linear infinite;
          opacity: 0.6;
          z-index: -1;
        }
        
        @keyframes rgb-border-animation {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
      `}</style>
    </div>
  );
};

export default OpeningAnimation; 