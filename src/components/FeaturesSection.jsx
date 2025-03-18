import React from 'react';
import { motion } from 'framer-motion';
import { COLORS } from './OpeningAnimation';

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

const FeatureCard = ({ title, description, iconElement, index }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true, margin: "-100px" }}
      whileHover={{ 
        y: -5, 
        boxShadow: `0 15px 30px rgba(0, 0, 0, 0.3), 0 0 20px ${CYBERPUNK_COLORS.neonYellow}30`
      }}
      className="floating-animation"
      style={{
        position: 'relative',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        backdropFilter: 'blur(10px)',
        borderLeft: `1px solid ${CYBERPUNK_COLORS.neonYellow}50`,
        transition: 'all 0.3s ease',
        height: '100%',
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      {/* Feature title header */}
      <div style={{
        padding: '0.75rem 1rem',
        borderBottom: `1px solid ${CYBERPUNK_COLORS.neonYellow}30`,
        backgroundColor: 'rgba(0, 0, 0, 0.4)'
      }}>
        <h3
          style={{ 
            margin: 0,
            color: CYBERPUNK_COLORS.neonYellow,
            fontSize: '1.25rem',
            fontFamily: 'var(--cyber-font)',
            fontWeight: '600',
            letterSpacing: '0.05em'
          }}
        >
          {title}
        </h3>
      </div>
      
      {/* Feature content */}
      <div style={{ 
        padding: '1rem', 
        display: 'flex', 
        flexDirection: 'column',
        flexGrow: 1
      }}>
        <p style={{ 
          color: 'rgba(255, 255, 255, 0.8)',
          fontSize: '0.9rem',
          marginBottom: '1.5rem',
          lineHeight: 1.6
        }}>
          {description}
        </p>
        
        {/* Icon container */}
        <div style={{
          marginTop: 'auto',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '2rem'
        }}>
          {iconElement}
        </div>
      </div>
    </motion.div>
  );
};

// SVG Icon components
const RealTimeAnalyticsIcon = () => (
  <svg width="150" height="150" viewBox="0 0 150 150" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M75 20L75 75M75 75L130 75M75 75L20 75M75 75L75 130" stroke={CYBERPUNK_COLORS.neonYellow} strokeWidth="12" strokeLinecap="round"/>
    <circle cx="75" cy="35" r="20" fill={CYBERPUNK_COLORS.neonYellow}/>
    <circle cx="75" cy="115" r="20" fill={CYBERPUNK_COLORS.neonYellow}/>
    <circle cx="35" cy="75" r="20" fill={CYBERPUNK_COLORS.neonYellow}/>
    <circle cx="115" cy="75" r="20" fill={CYBERPUNK_COLORS.neonYellow}/>
  </svg>
);

const HyperparameterTuningIcon = () => (
  <svg width="150" height="150" viewBox="0 0 150 150" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="20" y="40" width="30" height="100" rx="5" fill={CYBERPUNK_COLORS.neonYellow}/>
    <rect x="60" y="65" width="30" height="75" rx="5" fill={CYBERPUNK_COLORS.neonYellow}/>
    <rect x="100" y="20" width="30" height="120" rx="5" fill={CYBERPUNK_COLORS.neonYellow}/>
    <circle cx="35" cy="25" r="12" fill={CYBERPUNK_COLORS.neonYellow}/>
    <circle cx="75" cy="50" r="12" fill={CYBERPUNK_COLORS.neonYellow}/>
    <circle cx="115" cy="12" r="12" fill={CYBERPUNK_COLORS.neonYellow}/>
  </svg>
);

const ModelVisualizationIcon = () => (
  <svg width="150" height="150" viewBox="0 0 150 150" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="75" cy="75" r="60" stroke={CYBERPUNK_COLORS.neonYellow} strokeWidth="10"/>
    <line x1="25" y1="75" x2="125" y2="75" stroke={CYBERPUNK_COLORS.neonYellow} strokeWidth="10"/>
    <line x1="75" y1="25" x2="75" y2="125" stroke={CYBERPUNK_COLORS.neonYellow} strokeWidth="10"/>
  </svg>
);

const CrossFrameworkIcon = () => (
  <svg width="150" height="150" viewBox="0 0 150 150" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M20 75H130" stroke={CYBERPUNK_COLORS.neonYellow} strokeWidth="10" strokeLinecap="round"/>
    <path d="M75 20L120 130" stroke={CYBERPUNK_COLORS.neonYellow} strokeWidth="10" strokeLinecap="round"/>
    <path d="M75 20L30 130" stroke={CYBERPUNK_COLORS.neonYellow} strokeWidth="10" strokeLinecap="round"/>
    <circle cx="75" cy="20" r="15" fill={CYBERPUNK_COLORS.neonYellow}/>
    <circle cx="120" cy="130" r="15" fill={CYBERPUNK_COLORS.neonYellow}/>
    <circle cx="30" cy="130" r="15" fill={CYBERPUNK_COLORS.neonYellow}/>
  </svg>
);

const FeaturesSection = () => {
  const features = [
    {
      title: 'Real-time Analytics',
      description: 'Monitor training progress and model performance metrics with live updates and alerts.',
      iconElement: <RealTimeAnalyticsIcon />
    },
    {
      title: 'Hyperparameter Tuning',
      description: 'Optimize your models with intelligent parameter suggestions and automated experimentation.',
      iconElement: <HyperparameterTuningIcon />
    },
    {
      title: '3D Model Visualization',
      description: 'Explore your neural networks in an interactive 3D environment with detailed node analysis.',
      iconElement: <ModelVisualizationIcon />
    },
    {
      title: 'Cross-Framework',
      description: 'Seamlessly work with models from different frameworks including TensorFlow, PyTorch, and JAX.',
      iconElement: <CrossFrameworkIcon />
    }
  ];

  return (
    <section 
      id="features"
      style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        overflow: 'hidden',
        padding: '6rem 0'
      }}
    >
      <div style={{ 
        width: '100%', 
        maxWidth: '1200px', 
        margin: '0 auto',
        padding: '0 2rem'
      }}>
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="shimmer-text"
            style={{ 
              color: 'white', 
              fontFamily: 'var(--lunar-font)',
              letterSpacing: '0.05em',
              fontSize: '2.5rem',
              fontWeight: 'bold',
              marginBottom: '1rem',
              position: 'relative',
              display: 'inline-block'
            }}
          >
            Key <span style={{ color: CYBERPUNK_COLORS.neonYellow }}>Features</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            style={{
              color: 'rgba(255, 255, 255, 0.8)',
              maxWidth: '700px',
              fontSize: '1.1rem',
              lineHeight: 1.6,
              margin: '0 auto'
            }}
          >
            Our platform provides cutting-edge tools for AI researchers and engineers to visualize, analyze, and optimize neural networks.
          </motion.p>
        </div>
        
        <div style={{ 
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '2rem',
          justifyContent: 'center'
        }}>
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              title={feature.title}
              description={feature.description}
              iconElement={feature.iconElement}
              index={index}
            />
          ))}
        </div>
      </div>
      
      <style jsx>{`
        @keyframes float {
          0% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-8px);
          }
          100% {
            transform: translateY(0px);
          }
        }
        
        .floating-animation {
          animation: float 6s ease-in-out infinite;
        }
        
        .floating-animation:nth-child(2) {
          animation-delay: 1s;
        }
        
        .floating-animation:nth-child(3) {
          animation-delay: 2s;
        }
        
        .floating-animation:nth-child(4) {
          animation-delay: 1.5s;
        }
        
        .floating-animation:nth-child(5) {
          animation-delay: 0.5s;
        }
        
        .floating-animation:nth-child(6) {
          animation-delay: 2.5s;
        }
        
        @keyframes pulse {
          0% {
            filter: drop-shadow(0 0 8px ${CYBERPUNK_COLORS.neonYellow}70);
          }
          50% {
            filter: drop-shadow(0 0 15px ${CYBERPUNK_COLORS.neonYellow}90);
          }
          100% {
            filter: drop-shadow(0 0 8px ${CYBERPUNK_COLORS.neonYellow}70);
          }
        }
        
        .icon-pulse {
          animation: pulse 3s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
};

export default FeaturesSection; 