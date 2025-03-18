import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { COLORS } from './OpeningAnimation';
import NeuralNetworkDemo from './NeuralNetworkDemo';

// Enhanced colors based on the cyberpunk reference images
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

// Add cyberpunk text styles via CSS
const addStyles = () => {
  const styleEl = document.createElement('style');
  styleEl.textContent = `
    @keyframes glitch {
      0% {
        transform: translate(0);
      }
      20% {
        transform: translate(-2px, 2px);
      }
      40% {
        transform: translate(-2px, -2px);
      }
      60% {
        transform: translate(2px, 2px);
      }
      80% {
        transform: translate(2px, -2px);
      }
      100% {
        transform: translate(0);
      }
    }
    
    .glitch-text {
      position: relative;
      animation: glitch 5s infinite;
    }
    
    .glitch-text::before,
    .glitch-text::after {
      content: attr(data-text);
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    }
    
    .glitch-text::before {
      left: 2px;
      text-shadow: -1px 0 ${CYBERPUNK_COLORS.neonPink};
      clip: rect(44px, 450px, 56px, 0);
      animation: glitch-anim 5s infinite linear alternate-reverse;
    }
    
    .glitch-text::after {
      left: -2px;
      text-shadow: -1px 0 ${CYBERPUNK_COLORS.neonCyan};
      clip: rect(44px, 450px, 56px, 0);
      animation: glitch-anim2 5s infinite linear alternate-reverse;
      animation-delay: 0.4s;
    }
    
    @keyframes glitch-anim {
      0% {
        clip: rect(32px, 9999px, 12px, 0);
      }
      10% {
        clip: rect(82px, 9999px, 92px, 0);
      }
      20% {
        clip: rect(38px, 9999px, 92px, 0);
      }
      30% {
        clip: rect(47px, 9999px, 8px, 0);
      }
      40% {
        clip: rect(0, 0, 0, 0);
      }
      50% {
        clip: rect(0, 0, 0, 0);
      }
      60% {
        clip: rect(58px, 9999px, 73px, 0);
      }
      70% {
        clip: rect(34px, 9999px, 23px, 0);
      }
      80% {
        clip: rect(63px, 9999px, 36px, 0);
      }
      90% {
        clip: rect(0, 0, 0, 0);
      }
      100% {
        clip: rect(18px, 9999px, 56px, 0);
      }
    }
    
    @keyframes glitch-anim2 {
      0% {
        clip: rect(81px, 9999px, 63px, 0);
      }
      15% {
        clip: rect(35px, 9999px, 29px, 0);
      }
      30% {
        clip: rect(0, 0, 0, 0);
      }
      45% {
        clip: rect(0, 0, 0, 0);
      }
      50% {
        clip: rect(82px, 9999px, 31px, 0);
      }
      65% {
        clip: rect(54px, 9999px, 86px, 0);
      }
      80% {
        clip: rect(0, 0, 0, 0);
      }
      85% {
        clip: rect(0, 0, 0, 0);
      }
      90% {
        clip: rect(25px, 9999px, 46px, 0);
      }
      100% {
        clip: rect(42px, 9999px, 74px, 0);
      }
    }
    
    .cyberpunk-button {
      position: relative;
      background: linear-gradient(90deg, ${CYBERPUNK_COLORS.neonYellow}, ${CYBERPUNK_COLORS.neonYellow}CC);
      color: #000;
      border: none;
      border-radius: 4px;
      padding: 0.75rem 1.5rem;
      font-size: 0.9rem;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      cursor: pointer;
      overflow: hidden;
      transition: all 0.3s ease;
      font-family: 'Rajdhani', sans-serif;
      box-shadow: 0 0 15px ${CYBERPUNK_COLORS.neonYellow}40;
      z-index: 1;
    }
    
    .cyberpunk-button:before {
      content: '';
      position: absolute;
      top: 0;
      left: -100%;
      width: 100%;
      height: 100%;
      background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
      transition: all 0.6s ease;
      z-index: -1;
    }
    
    .cyberpunk-button:hover:before {
      left: 100%;
    }
    
    .cyberpunk-button:hover {
      transform: translateY(-3px);
      box-shadow: 0 5px 20px ${CYBERPUNK_COLORS.neonYellow}80;
    }
    
    .cyberpunk-button-alt {
      position: relative;
      background: transparent;
      color: ${CYBERPUNK_COLORS.neonCyan};
      border: 2px solid ${CYBERPUNK_COLORS.neonCyan};
      border-radius: 4px;
      padding: 0.75rem 1.5rem;
      font-size: 0.9rem;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      cursor: pointer;
      overflow: hidden;
      transition: all 0.3s ease;
      font-family: 'Rajdhani', sans-serif;
      box-shadow: 0 0 10px ${CYBERPUNK_COLORS.neonCyan}40;
    }
    
    .cyberpunk-button-alt:hover {
      background-color: ${CYBERPUNK_COLORS.neonCyan}20;
      transform: translateY(-3px);
      box-shadow: 0 5px 20px ${CYBERPUNK_COLORS.neonCyan}60;
    }
    
    .neuron-connection {
      stroke-dasharray: 10;
      animation: dash 3s linear infinite;
    }
    
    @keyframes dash {
      to {
        stroke-dashoffset: 100;
      }
    }
    
    .pulse {
      animation: pulse 2s infinite;
    }
    
    @keyframes pulse {
      0% {
        transform: scale(0.95);
        box-shadow: 0 0 0 0 ${CYBERPUNK_COLORS.neonCyan}60;
      }
      
      70% {
        transform: scale(1);
        box-shadow: 0 0 0 15px ${CYBERPUNK_COLORS.neonCyan}00;
      }
      
      100% {
        transform: scale(0.95);
        box-shadow: 0 0 0 0 ${CYBERPUNK_COLORS.neonCyan}00;
      }
    }
  `;
  document.head.appendChild(styleEl);
  return () => {
    if (styleEl.parentNode) {
      document.head.removeChild(styleEl);
    }
  };
};

const HeroSection = () => {
  const canvasRef = useRef(null);
  const neuronsRef = useRef(null);
  const [animate, setAnimate] = useState(false);
  
  // Add CSS styles
  useEffect(() => {
    return addStyles();
  }, []);
  
  // Cyberpunk circuit animation effect
  useEffect(() => {
    if (!canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let particles = [];
    
    // Set canvas dimensions
    const setCanvasDimensions = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    
    // Initialize particles
    const initParticles = () => {
      particles = [];
      const particleCount = Math.floor(canvas.width / 10);
      
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 2 + 1,
          speedX: (Math.random() - 0.5) * 2,
          speedY: (Math.random() - 0.5) * 2,
          color: [
            CYBERPUNK_COLORS.neonYellow,
            CYBERPUNK_COLORS.neonPink,
            CYBERPUNK_COLORS.neonCyan,
            CYBERPUNK_COLORS.turquoise
          ][Math.floor(Math.random() * 4)]
        });
      }
    };
    
    // Draw circuit lines
    const drawCircuit = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw background grid
      ctx.strokeStyle = 'rgba(255, 221, 0, 0.1)';
      ctx.lineWidth = 0.5;
      
      const gridSize = 40;
      for (let x = 0; x < canvas.width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }
      
      for (let y = 0; y < canvas.height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }
      
      // Update and draw particles
      particles.forEach((particle, index) => {
        particle.x += particle.speedX;
        particle.y += particle.speedY;
        
        // Wrap around edges
        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.height;
        if (particle.y > canvas.height) particle.y = 0;
        
        // Draw particle
        ctx.fillStyle = particle.color;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();
        
        // Connect nearby particles
        for (let j = index + 1; j < particles.length; j++) {
          const dx = particles[j].x - particle.x;
          const dy = particles[j].y - particle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 100) {
            ctx.strokeStyle = particle.color;
            ctx.globalAlpha = 0.7 * (1 - distance / 100);
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
        ctx.globalAlpha = 1;
      });
      
      animationFrameId = requestAnimationFrame(drawCircuit);
    };
    
    // Handle resize
    const handleResize = () => {
      setCanvasDimensions();
      initParticles();
    };
    
    window.addEventListener('resize', handleResize);
    setCanvasDimensions();
    initParticles();
    drawCircuit();
    
    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);
  
  // Neural network visualization animation
  useEffect(() => {
    // Start animation after a delay
    const timer = setTimeout(() => {
      setAnimate(true);
    }, 800);
    
    return () => clearTimeout(timer);
  }, []);
  
  return (
    <section 
      id="home"
      style={{
        position: 'relative',
        paddingTop: '7rem',
        paddingBottom: '5rem',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        width: '100%',
        overflow: 'hidden'
      }}
    >
      {/* Animated circuit background canvas */}
      <canvas 
        ref={canvasRef}
        style={{ 
          position: 'absolute', 
          inset: 0,
          width: '100%',
          height: '100%',
          zIndex: 0,
          opacity: 0.2 
        }}
      />
      
      <div 
        style={{
          display: 'flex',
          width: '100%',
          maxWidth: '1400px',
          margin: '0 auto',
          alignItems: 'center',
          justifyContent: 'space-between',
          position: 'relative',
          padding: '0 2rem'
        }}
      >
        <div style={{ maxWidth: '800px', marginLeft: '0', position: 'relative', zIndex: 10 }}>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="glitch-text"
            data-text="Visualize Your Neural Networks In 3D"
            style={{ 
              color: 'white',
              fontFamily: 'var(--lunar-font)',
              fontSize: 'clamp(2.5rem, 5vw, 4rem)',
              fontWeight: 'bold',
              marginBottom: '1.5rem',
              lineHeight: 1.1,
              letterSpacing: '0.05em',
              textShadow: '0 0 20px rgba(0, 255, 255, 0.3)'
            }}
          >
            Visualize Your <span style={{ color: CYBERPUNK_COLORS.neonYellow }}>Neural Networks</span> In 3D
          </motion.h1>
        
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            style={{ 
              color: 'rgba(255, 255, 255, 0.8)',
              fontSize: 'clamp(1.1rem, 2vw, 1.3rem)',
              marginBottom: '2.5rem',
              maxWidth: '650px',
              lineHeight: 1.6,
              textShadow: '0 2px 5px rgba(0, 0, 0, 0.5)'
            }}
          >
            CogniCube provides powerful, intuitive tools for researchers and engineers to visualize, understand, and optimize complex neural network architectures in real time.
          </motion.p>
        
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}
          >
            <motion.button
              className="hero-cta-button"
              whileHover={{ 
                scale: 1.05,
                boxShadow: `0 0 25px ${CYBERPUNK_COLORS.neonYellow}90`,
                transition: { duration: 0.2 }
              }}
              whileTap={{ scale: 0.95 }}
              style={{
                backgroundColor: CYBERPUNK_COLORS.neonYellow,
                color: '#000',
                border: 'none',
                padding: 'clamp(0.8rem, 2vw, 1rem) clamp(1.5rem, 3vw, 2rem)',
                borderRadius: '4px',
                fontWeight: 'bold',
                cursor: 'pointer',
                fontSize: 'clamp(0.9rem, 1.5vw, 1.1rem)',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                position: 'relative',
                overflow: 'hidden',
                fontFamily: 'var(--cyber-font)'
              }}
            >
              Get Started Free
              
              {/* Animated glow effect */}
              <span className="cta-button-glow"></span>
            </motion.button>
            
            <motion.button
              whileHover={{ 
                scale: 1.05,
                textShadow: '0 0 8px rgba(255, 255, 255, 0.8)',
                color: '#fff',
                transition: { duration: 0.2 }
              }}
              whileTap={{ scale: 0.95 }}
              style={{
                backgroundColor: 'transparent',
                color: 'rgba(255, 255, 255, 0.9)',
                border: `2px solid rgba(255, 255, 255, 0.3)`,
                padding: 'clamp(0.8rem, 2vw, 1rem) clamp(1.5rem, 3vw, 2rem)',
                borderRadius: '4px',
                fontWeight: 'bold',
                cursor: 'pointer',
                fontSize: 'clamp(0.9rem, 1.5vw, 1.1rem)',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                fontFamily: 'var(--cyber-font)'
              }}
            >
              Watch Demo
            </motion.button>
          </motion.div>
        </div>
        
        {/* 3D Neural Network Visualization */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 1 }}
          style={{ 
            flex: '1 1 500px',
            position: 'relative',
            minHeight: '500px',
            backgroundColor: 'rgba(0, 0, 0, 0.3)',
            borderRadius: '8px',
            overflow: 'hidden',
            border: `1px solid ${CYBERPUNK_COLORS.neonCyan}40`,
            boxShadow: `0 0 20px ${CYBERPUNK_COLORS.neonCyan}20, inset 0 0 30px rgba(0, 0, 0, 0.5)`,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          {/* Interactive Neural Network Visualization */}
          <NeuralNetworkDemo width={600} height={500} />
          
          {/* UI Controls Overlay */}
          <div style={{
            position: 'absolute',
            bottom: '20px',
            left: '20px',
            right: '20px',
            display: 'flex',
            justifyContent: 'space-between'
          }}>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              style={{
                background: 'rgba(0,0,0,0.5)',
                border: `1px solid ${CYBERPUNK_COLORS.neonYellow}`,
                color: CYBERPUNK_COLORS.neonYellow,
                padding: '8px 16px',
                borderRadius: '4px',
                fontSize: '0.85rem',
                cursor: 'pointer'
              }}
            >
              RESET
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              style={{
                background: 'rgba(0,0,0,0.5)',
                border: `1px solid ${CYBERPUNK_COLORS.neonCyan}`,
                color: CYBERPUNK_COLORS.neonCyan,
                padding: '8px 16px',
                borderRadius: '4px',
                fontSize: '0.85rem',
                cursor: 'pointer'
              }}
            >
              ANIMATE
            </motion.button>
          </div>
        </motion.div>
      </div>
      
      {/* Stats and highlights section - Fades in on scroll */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true, margin: "-100px" }}
        style={{
          display: 'flex',
          justifyContent: 'center',
          flexWrap: 'wrap',
          gap: 'clamp(1rem, 3vw, 3rem)',
          marginTop: '4rem',
          padding: '0 clamp(1rem, 5vw, 3rem)'
        }}
      >
        {/* Stats content would go here */}
      </motion.div>

      {/* Add this style at the end of the component's return statement */}
      <style jsx>{`
        .hero-cta-button {
          transition: all 0.3s ease;
        }
        
        .cta-button-glow {
          position: absolute;
          top: 0;
          left: -100%;
          width: 50%;
          height: 100%;
          background: linear-gradient(
            90deg,
            transparent,
            rgba(255, 255, 255, 0.3),
            transparent
          );
          transform: skewX(-25deg);
          animation: cta-glow 3s infinite;
        }
        
        @keyframes cta-glow {
          0% {
            left: -100%;
          }
          50%, 100% {
            left: 100%;
          }
        }
        
        /* Mobile responsiveness */
        @media (max-width: 768px) {
          .hero-cta-button {
            width: 100%;
          }
        }
      `}</style>
    </section>
  );
};

export default HeroSection; 