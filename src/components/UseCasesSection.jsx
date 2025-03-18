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

const UseCaseCard = ({ title, description, image, index, reversed }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true, margin: "-50px" }}
      className={`flex flex-col ${reversed ? 'md:flex-row-reverse' : 'md:flex-row'} gap-8 mb-24 last:mb-0`}
    >
      {/* Image Side */}
      <div className="md:w-1/2 relative overflow-hidden group">
        <div className="relative">
          <motion.div 
            className="w-full h-64 md:h-80 rounded-lg overflow-hidden"
            whileHover={{ scale: 1.03 }}
            transition={{ duration: 0.3 }}
          >
            <div 
              className="w-full h-full bg-cover bg-center rounded-lg"
              style={{ 
                backgroundImage: `url(${image})`,
                boxShadow: `0 10px 30px rgba(0, 0, 0, 0.4), 0 0 20px ${CYBERPUNK_COLORS.neonCyan}30`
              }}
            />
            {/* Overlay gradient */}
            <div 
              className="absolute inset-0 rounded-lg" 
              style={{ 
                background: `linear-gradient(45deg, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0) 100%)`, 
                opacity: 0.7 
              }}
            />
          </motion.div>
          
          {/* Decorative elements */}
          <div 
            className="absolute top-0 left-0 w-20 h-2" 
            style={{ 
              background: CYBERPUNK_COLORS.neonPink,
              boxShadow: `0 0 15px ${CYBERPUNK_COLORS.neonPink}`,
              transform: 'translateY(-50%)'
            }}
          />
          <div 
            className="absolute bottom-0 right-0 w-20 h-2" 
            style={{ 
              background: CYBERPUNK_COLORS.neonCyan,
              boxShadow: `0 0 15px ${CYBERPUNK_COLORS.neonCyan}`,
              transform: 'translateY(50%)'
            }}
          />
          
          {/* Corner elements */}
          <div 
            className="absolute top-0 right-0 w-6 h-6" 
            style={{ 
              borderRight: `2px solid ${CYBERPUNK_COLORS.neonYellow}`,
              borderTop: `2px solid ${CYBERPUNK_COLORS.neonYellow}`,
              opacity: 0.8
            }}
          />
          <div 
            className="absolute bottom-0 left-0 w-6 h-6" 
            style={{ 
              borderLeft: `2px solid ${CYBERPUNK_COLORS.neonYellow}`,
              borderBottom: `2px solid ${CYBERPUNK_COLORS.neonYellow}`,
              opacity: 0.8
            }}
          />
        </div>
      </div>
      
      {/* Content Side */}
      <div className="md:w-1/2 flex flex-col justify-center">
        <motion.h3 
          className="text-2xl md:text-3xl font-bold mb-4" 
          initial={{ opacity: 0, x: reversed ? 20 : -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: index * 0.15 }}
          viewport={{ once: true }}
          style={{
            fontFamily: 'var(--cyber-font)',
            color: COLORS.white,
            letterSpacing: '0.05em'
          }}
        >
          <span style={{ color: CYBERPUNK_COLORS.neonCyan }}>{'// '}</span>
          <span>{title}</span>
        </motion.h3>
        
        <motion.div 
          className="w-16 h-1 mb-6" 
          initial={{ width: "0%", opacity: 0 }}
          whileInView={{ width: "4rem", opacity: 1 }}
          transition={{ duration: 0.5, delay: index * 0.2 }}
          viewport={{ once: true }}
          style={{
            background: `linear-gradient(to right, ${CYBERPUNK_COLORS.neonCyan}, transparent)`,
            boxShadow: `0 0 10px ${CYBERPUNK_COLORS.neonCyan}`
          }}
        />
        
        <motion.p 
          className="text-white text-opacity-80 mb-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: index * 0.25 }}
          viewport={{ once: true }}
        >
          {description}
        </motion.p>
        
        <motion.button
          whileHover={{ 
            scale: 1.05, 
            boxShadow: `0 0 20px ${CYBERPUNK_COLORS.neonCyan}80`
          }}
          whileTap={{ scale: 0.95 }}
          className="self-start px-6 py-2 rounded-sm relative overflow-hidden group"
          style={{ 
            backgroundColor: 'rgba(0, 0, 0, 0.4)',
            backdropFilter: 'blur(4px)',
            color: CYBERPUNK_COLORS.neonCyan,
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            fontFamily: 'var(--cyber-font)',
            fontWeight: 600,
            border: `1px solid ${CYBERPUNK_COLORS.neonCyan}`,
            boxShadow: `0 0 10px ${CYBERPUNK_COLORS.neonCyan}50`,
            textShadow: `0 0 5px ${CYBERPUNK_COLORS.neonCyan}60`
          }}
        >
          <span className="relative z-10">View Case Study</span>
          <span 
            className="absolute inset-0 w-0 transition-all duration-300 group-hover:w-full opacity-20"
            style={{ 
              background: CYBERPUNK_COLORS.neonCyan
            }}
          />
        </motion.button>
      </div>
    </motion.div>
  );
};

const UseCasesSection = () => {
  // Placeholder image URLs - replace with your actual images
  const medicineImg = "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80";
  const financeImg = "https://images.unsplash.com/photo-1620714223084-8fcacc6dfd8d?auto=format&fit=crop&q=80";
  const manufacturingImg = "https://images.unsplash.com/photo-1581091226033-d5c48150dbaa?auto=format&fit=crop&q=80";
  
  const useCases = [
    {
      title: "Advanced Medical Diagnostics",
      description: "Medical researchers at Stanford University used CogniCube to visualize and refine complex neural network models for early cancer detection, improving diagnostic accuracy by 34%. The visual representation of neural pathways allowed them to identify and address biases in the training data that were previously invisible.",
      image: medicineImg
    },
    {
      title: "Financial Risk Assessment",
      description: "A leading investment firm deployed CogniCube to analyze patterns in market volatility prediction models. By visually mapping the interconnections between economic indicators and market responses, analysts were able to identify previously unknown correlation patterns, leading to a 28% reduction in prediction error rates.",
      image: financeImg
    },
    {
      title: "Smart Manufacturing Optimization",
      description: "An aerospace manufacturer used CogniCube to optimize their quality control neural networks, resulting in a 47% reduction in false positive defect detection. The 3D visualization enabled engineers to understand precisely how their model interpreted surface irregularities and refine the decision boundaries for more accurate predictions.",
      image: manufacturingImg
    }
  ];

  return (
    <section 
      id="use-cases"
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
        <div className="text-center mb-20">
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
              display: 'inline-block',
              textAlign: 'center'
            }}
          >
            Real-World <span style={{ color: CYBERPUNK_COLORS.neonCyan }}>Use Cases</span>
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
              lineHeight: 1.6,
              textAlign: 'center'
            }}
          >
            See how leading organizations across industries are leveraging CogniCube to transform their AI development workflow.
          </motion.p>
        </div>

        <div>
          {useCases.map((useCase, index) => (
            <UseCaseCard
              key={index}
              title={useCase.title}
              description={useCase.description}
              image={useCase.image}
              index={index}
              reversed={index % 2 === 1}
            />
          ))}
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

export default UseCasesSection; 