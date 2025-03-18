import React from 'react';
import { motion } from 'framer-motion';

// Colors matching the cyberpunk theme in FeaturesSection
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

const AdvancedFeatureItem = ({ title, description, image, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: index * 0.15 }}
      viewport={{ once: true, margin: "-100px" }}
      style={{
        position: 'relative',
        padding: '2rem',
        marginBottom: '3rem',
        background: 'linear-gradient(to right, rgba(0,0,0,0.7), rgba(26,0,48,0.8))',
        borderLeft: `4px solid ${CYBERPUNK_COLORS.neonYellow}`,
        backdropFilter: 'blur(10px)',
        overflow: 'hidden'
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '1px',
          background: `linear-gradient(90deg, ${CYBERPUNK_COLORS.neonYellow}00, ${CYBERPUNK_COLORS.neonYellow}, ${CYBERPUNK_COLORS.neonYellow}00)`
        }}
      ></div>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <h3 
          style={{ 
            color: CYBERPUNK_COLORS.neonYellow,
            fontFamily: 'var(--cyber-font)',
            fontSize: '1.8rem',
            fontWeight: 'bold',
            letterSpacing: '0.05em',
            marginBottom: '0.5rem'
          }}
        >
          {title}
        </h3>
        
        <p style={{ 
          color: 'rgba(255, 255, 255, 0.85)',
          fontSize: '1.1rem',
          lineHeight: 1.7,
          maxWidth: '800px'
        }}>
          {description}
        </p>
        
        {image && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.3 + index * 0.15 }}
            viewport={{ once: true, margin: "-100px" }}
            style={{
              marginTop: '2rem',
              border: `1px solid ${CYBERPUNK_COLORS.neonYellow}30`,
              padding: '1rem',
              position: 'relative',
              overflow: 'hidden',
              background: 'rgba(0,0,0,0.3)'
            }}
          >
            <div style={{ position: 'relative' }}>
              {image}
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

// Example SVG chart for metrics visualization
const MetricsVisualizationSVG = () => (
  <svg width="100%" height="250" viewBox="0 0 800 250" xmlns="http://www.w3.org/2000/svg">
    {/* Grid lines */}
    {Array.from({ length: 6 }).map((_, i) => (
      <line 
        key={`hgrid-${i}`} 
        x1="50" 
        y1={50 + i * 40} 
        x2="750" 
        y2={50 + i * 40} 
        stroke="rgba(255, 221, 0, 0.2)" 
        strokeDasharray="5,5"
      />
    ))}
    {Array.from({ length: 8 }).map((_, i) => (
      <line 
        key={`vgrid-${i}`} 
        x1={100 + i * 90} 
        y1="50" 
        x2={100 + i * 90} 
        y2="230" 
        stroke="rgba(255, 221, 0, 0.2)" 
        strokeDasharray="5,5"
      />
    ))}
    
    {/* Axes */}
    <line x1="50" y1="230" x2="750" y2="230" stroke={CYBERPUNK_COLORS.neonYellow} strokeWidth="2" />
    <line x1="50" y1="50" x2="50" y2="230" stroke={CYBERPUNK_COLORS.neonYellow} strokeWidth="2" />
    
    {/* Data lines */}
    <path 
      d="M100,200 L190,150 L280,170 L370,130 L460,90 L550,110 L640,80 L730,60" 
      fill="none" 
      stroke={CYBERPUNK_COLORS.neonYellow} 
      strokeWidth="3"
    />
    <path 
      d="M100,190 L190,180 L280,160 L370,150 L460,120 L550,140 L640,100 L730,110" 
      fill="none" 
      stroke={CYBERPUNK_COLORS.neonCyan} 
      strokeWidth="3"
    />
    
    {/* Data points */}
    {[
      [100, 200], [190, 150], [280, 170], [370, 130], [460, 90], [550, 110], [640, 80], [730, 60]
    ].map(([x, y], i) => (
      <circle key={`point1-${i}`} cx={x} cy={y} r="5" fill={CYBERPUNK_COLORS.neonYellow} />
    ))}
    {[
      [100, 190], [190, 180], [280, 160], [370, 150], [460, 120], [550, 140], [640, 100], [730, 110]
    ].map(([x, y], i) => (
      <circle key={`point2-${i}`} cx={x} cy={y} r="5" fill={CYBERPUNK_COLORS.neonCyan} />
    ))}
    
    {/* Labels */}
    <text x="400" y="250" textAnchor="middle" fill="white" fontSize="12">Epochs</text>
    <text x="20" y="140" textAnchor="middle" transform="rotate(-90, 20, 140)" fill="white" fontSize="12">Accuracy</text>
    
    {/* Legend */}
    <circle cx="650" cy="30" r="5" fill={CYBERPUNK_COLORS.neonYellow} />
    <text x="660" y="35" fill="white" fontSize="12">Training</text>
    <circle cx="730" cy="30" r="5" fill={CYBERPUNK_COLORS.neonCyan} />
    <text x="740" y="35" fill="white" fontSize="12">Validation</text>
  </svg>
);

// Example SVG for network architecture visualization
const NetworkArchitectureSVG = () => (
  <svg width="100%" height="300" viewBox="0 0 800 300" xmlns="http://www.w3.org/2000/svg">
    {/* Input layer */}
    {Array.from({ length: 6 }).map((_, i) => (
      <circle 
        key={`input-${i}`} 
        cx="100" 
        cy={70 + i * 40} 
        r="15" 
        fill="rgba(0,0,0,0.6)" 
        stroke={CYBERPUNK_COLORS.neonYellow} 
        strokeWidth="2"
      />
    ))}
    
    {/* Hidden layer 1 */}
    {Array.from({ length: 8 }).map((_, i) => (
      <circle 
        key={`h1-${i}`} 
        cx="300" 
        cy={50 + i * 30} 
        r="15" 
        fill="rgba(0,0,0,0.6)" 
        stroke={CYBERPUNK_COLORS.neonYellow} 
        strokeWidth="2"
      />
    ))}
    
    {/* Hidden layer 2 */}
    {Array.from({ length: 8 }).map((_, i) => (
      <circle 
        key={`h2-${i}`} 
        cx="500" 
        cy={50 + i * 30} 
        r="15" 
        fill="rgba(0,0,0,0.6)" 
        stroke={CYBERPUNK_COLORS.neonYellow} 
        strokeWidth="2"
      />
    ))}
    
    {/* Output layer */}
    {Array.from({ length: 4 }).map((_, i) => (
      <circle 
        key={`output-${i}`} 
        cx="700" 
        cy={100 + i * 40} 
        r="15" 
        fill="rgba(0,0,0,0.6)" 
        stroke={CYBERPUNK_COLORS.neonYellow} 
        strokeWidth="2"
      />
    ))}
    
    {/* Connections between input and hidden layer 1 */}
    {Array.from({ length: 6 }).map((_, i) => (
      Array.from({ length: 8 }).map((_, j) => (
        <line 
          key={`conn-i-h1-${i}-${j}`} 
          x1="115" 
          y1={70 + i * 40} 
          x2="285" 
          y2={50 + j * 30} 
          stroke="rgba(255, 221, 0, 0.15)" 
          strokeWidth="1"
        />
      ))
    ))}
    
    {/* Connections between hidden layer 1 and 2 */}
    {Array.from({ length: 8 }).map((_, i) => (
      Array.from({ length: 8 }).map((_, j) => (
        <line 
          key={`conn-h1-h2-${i}-${j}`} 
          x1="315" 
          y1={50 + i * 30} 
          x2="485" 
          y2={50 + j * 30} 
          stroke="rgba(255, 221, 0, 0.15)" 
          strokeWidth="1"
        />
      ))
    ))}
    
    {/* Connections between hidden layer 2 and output */}
    {Array.from({ length: 8 }).map((_, i) => (
      Array.from({ length: 4 }).map((_, j) => (
        <line 
          key={`conn-h2-o-${i}-${j}`} 
          x1="515" 
          y1={50 + i * 30} 
          x2="685" 
          y2={100 + j * 40} 
          stroke="rgba(255, 221, 0, 0.15)" 
          strokeWidth="1"
        />
      ))
    ))}
    
    {/* Layer labels */}
    <text x="100" y="30" textAnchor="middle" fill={CYBERPUNK_COLORS.neonYellow} fontSize="14">Input</text>
    <text x="300" y="30" textAnchor="middle" fill={CYBERPUNK_COLORS.neonYellow} fontSize="14">Hidden Layer 1</text>
    <text x="500" y="30" textAnchor="middle" fill={CYBERPUNK_COLORS.neonYellow} fontSize="14">Hidden Layer 2</text>
    <text x="700" y="30" textAnchor="middle" fill={CYBERPUNK_COLORS.neonYellow} fontSize="14">Output</text>
  </svg>
);

// Example SVG for model comparison
const ModelComparisonSVG = () => (
  <svg width="100%" height="300" viewBox="0 0 800 300" xmlns="http://www.w3.org/2000/svg">
    {/* Grid lines */}
    {Array.from({ length: 6 }).map((_, i) => (
      <line 
        key={`hgrid-${i}`} 
        x1="100" 
        y1={50 + i * 40} 
        x2="700" 
        y2={50 + i * 40} 
        stroke="rgba(255, 221, 0, 0.2)" 
        strokeDasharray="5,5"
      />
    ))}
    
    {/* Bar chart */}
    <rect x="120" y="150" width="80" height="100" fill={CYBERPUNK_COLORS.neonYellow} opacity="0.7" />
    <rect x="220" y="120" width="80" height="130" fill={CYBERPUNK_COLORS.neonCyan} opacity="0.7" />
    <rect x="320" y="90" width="80" height="160" fill={CYBERPUNK_COLORS.neonPink} opacity="0.7" />
    <rect x="420" y="70" width="80" height="180" fill={CYBERPUNK_COLORS.purple} opacity="0.7" />
    <rect x="520" y="100" width="80" height="150" fill={CYBERPUNK_COLORS.turquoise} opacity="0.7" />
    
    {/* X-axis */}
    <line x1="100" y1="250" x2="700" y2="250" stroke="white" strokeWidth="2" />
    
    {/* Labels */}
    <text x="160" y="270" textAnchor="middle" fill="white" fontSize="12">Model A</text>
    <text x="260" y="270" textAnchor="middle" fill="white" fontSize="12">Model B</text>
    <text x="360" y="270" textAnchor="middle" fill="white" fontSize="12">Model C</text>
    <text x="460" y="270" textAnchor="middle" fill="white" fontSize="12">Model D</text>
    <text x="560" y="270" textAnchor="middle" fill="white" fontSize="12">Model E</text>
    
    <text x="400" y="290" textAnchor="middle" fill="white" fontSize="14">Model Architectures</text>
    <text x="50" y="150" textAnchor="middle" transform="rotate(-90, 50, 150)" fill="white" fontSize="14">Performance Score</text>
  </svg>
);

const AdvancedFeaturesSection = () => {
  const advancedFeatures = [
    {
      title: 'Real-time Performance Metrics',
      description: 'Track over 50 different metrics in real-time as your model trains. Our system provides interactive charts and visualizations that update live, allowing you to identify performance bottlenecks and optimization opportunities without interrupting your training process.',
      image: <MetricsVisualizationSVG />
    },
    {
      title: 'Network Architecture Analyzer',
      description: 'Explore the structure of your neural networks in unprecedented detail. Visualize weights, biases, and activations at each layer. Identify patterns and understand how your architecture processes information with our interactive 3D visualization tools.',
      image: <NetworkArchitectureSVG />
    },
    {
      title: 'Automated Model Comparison',
      description: 'Compare multiple model architectures side by side with our comprehensive benchmarking suite. CogniCube automatically generates comparison reports highlighting key differences in performance, efficiency, and resource utilization to help you select the optimal model for your specific use case.',
      image: <ModelComparisonSVG />
    }
  ];

  return (
    <section
      id="advanced"
      style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        overflow: 'hidden',
        padding: '7rem 0'
      }}
    >
      <div style={{ 
        width: '100%', 
        maxWidth: '1200px', 
        margin: '0 auto',
        padding: '0 2rem'
      }}>
        <div style={{ marginBottom: '5rem' }}>
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
              Advanced <span style={{ color: CYBERPUNK_COLORS.neonCyan }}>Features</span>
            </motion.h2>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              style={{
                color: 'rgba(255, 255, 255, 0.8)',
                maxWidth: '700px',
                margin: '0 auto',
                fontSize: '1.1rem',
                lineHeight: 1.6
              }}
            >
              Discover the cutting-edge capabilities that set CogniCube apart from other visualization tools.
            </motion.p>
          </div>
          
          <div>
            {advancedFeatures.map((feature, index) => (
              <AdvancedFeatureItem
                key={index}
                title={feature.title}
                description={feature.description}
                image={feature.image}
                index={index}
              />
            ))}
          </div>
        </div>
      </div>
      <style jsx>{`
        .shimmer-text {
          background: linear-gradient(
            to right,
            rgba(255, 255, 255, 0.1) 0%,
            rgba(255, 255, 255, 0.6) 20%,
            rgba(255, 255, 255, 0.1) 40%
          );
          background-size: 200% auto;
          background-clip: text;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: shimmer 3s linear infinite;
          text-shadow: 0 0 10px rgba(0, 255, 255, 0.3);
        }

        .shimmer-text span {
          background: linear-gradient(
            to right,
            ${CYBERPUNK_COLORS.neonCyan} 0%,
            #FFFFFF 50%,
            ${CYBERPUNK_COLORS.neonCyan} 100%
          );
          background-size: 200% auto;
          background-clip: text;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: shimmer 3s linear infinite;
          filter: drop-shadow(0 0 5px ${CYBERPUNK_COLORS.neonCyan});
        }

        @keyframes shimmer {
          0% {
            background-position: -100% 0;
          }
          100% {
            background-position: 100% 0;
          }
        }
      `}</style>
    </section>
  );
};

export default AdvancedFeaturesSection; 