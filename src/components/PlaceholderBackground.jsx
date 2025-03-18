import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import backgroundImage from '../assets/background.png';

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

// If you don't have a background image, you can use a gradient or a solid color:
const PlaceholderBackground = ({ show = false }) => {
  const particlesRef = useRef(null);
  const [particles, setParticles] = useState([]);
  const animationRef = useRef(null);
  
  // Create particles
  useEffect(() => {
    const numParticles = 75; // Number of particles
    const newParticles = [];
    
    const colors = [
      CYBERPUNK_COLORS.neonCyan,
      CYBERPUNK_COLORS.neonPink,
      CYBERPUNK_COLORS.neonYellow,
      CYBERPUNK_COLORS.purple
    ];
    
    for (let i = 0; i < numParticles; i++) {
      newParticles.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        size: Math.random() * 3 + 0.5,
        speedX: Math.random() * 0.3 - 0.15,
        speedY: Math.random() * 0.3 - 0.15,
        color: colors[Math.floor(Math.random() * colors.length)],
        alpha: Math.random() * 0.5 + 0.2
      });
    }
    
    setParticles(newParticles);
    
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);
  
  // Animation loop
  useEffect(() => {
    if (!particlesRef.current) return;
    
    const canvas = particlesRef.current;
    const ctx = canvas.getContext('2d');
    
    // Set canvas size
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw particles
      particles.forEach(particle => {
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = particle.color;
        ctx.globalAlpha = particle.alpha;
        ctx.fill();
        
        // Update position
        particle.x += particle.speedX;
        particle.y += particle.speedY;
        
        // Border check with repositioning
        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.height;
        if (particle.y > canvas.height) particle.y = 0;
      });
      
      animationRef.current = requestAnimationFrame(animate);
    };
    
    animate();
    
    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationRef.current);
    };
  }, [particles]);
  
  return (
    <div style={{
      position: 'absolute',
      inset: 0,
      width: '100%',
      height: '100%',
      zIndex: 0
    }}>
      {/* Static background image */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          opacity: 0.01, // Always barely visible to prevent abrupt appearance
          transition: 'opacity 0s'
        }}
      />
      
      {/* Animated overlay for fade-in effect */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: show ? 0.8 : 0 }}
        transition={{ 
          duration: 1.8, // Match main content fade-in duration
          ease: "easeInOut"
        }}
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      />
      
      {/* Grid overlay */}
      <div style={{
        position: 'absolute',
        inset: 0,
        backgroundImage: `
          linear-gradient(to right, rgba(0, 255, 255, 0.05) 1px, transparent 1px),
          linear-gradient(to bottom, rgba(0, 255, 255, 0.05) 1px, transparent 1px)
        `,
        backgroundSize: '40px 40px',
        opacity: 0.3,
        mixBlendMode: 'overlay'
      }} />
      
      {/* Particles canvas */}
      <canvas 
        ref={particlesRef}
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          zIndex: 1,
          mixBlendMode: 'screen'
        }}
      />
    </div>
  );
};

export default PlaceholderBackground; 