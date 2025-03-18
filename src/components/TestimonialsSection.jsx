import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

// Testimonial Card Component
const TestimonialCard = ({ testimonial, isActive }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      style={{
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
        backdropFilter: 'blur(10px)',
        borderRadius: '12px',
        padding: '2rem',
        height: '100%',
        border: `1px solid ${testimonial.color}20`,
        boxShadow: isActive ? `0 0 30px ${testimonial.color}30` : 'none',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        transition: 'all 0.3s ease'
      }}
    >
      {/* Quote icon */}
      <div style={{ position: 'absolute', top: '1.5rem', right: '1.5rem', opacity: 0.2 }}>
        <svg width="32" height="32" viewBox="0 0 24 24" fill={testimonial.color}>
          <path d="M21,5H3A2,2 0 0,0 1,7V17A2,2 0 0,0 3,19H21A2,2 0 0,0 23,17V7A2,2 0 0,0 21,5M21,17H3V7H21V17M5,8V16H7V8H5M9,8V16H11V8H9M13,8V16H15V8H13M17,8V16H19V8H17Z" />
        </svg>
      </div>
      
      {/* Testimonial text */}
      <p 
        style={{
          color: 'rgba(255,255,255,0.9)',
          fontSize: '1.05rem',
          lineHeight: 1.7,
          marginBottom: '2.5rem',
          flexGrow: 1,
          position: 'relative',
          zIndex: 10
        }}
      >
        {testimonial.text}
      </p>
      
      {/* Author info container */}
      <div 
        style={{
          display: 'flex',
          alignItems: 'center',
          marginTop: 'auto'
        }}
      >
        {/* Avatar with neon border */}
        <div 
          style={{ 
            width: '70px', 
            height: '70px', 
            borderRadius: '50%',
            padding: '2px',
            background: `linear-gradient(45deg, ${testimonial.color}, transparent)`,
            boxShadow: `0 0 15px ${testimonial.color}50`,
            flexShrink: 0,
            marginRight: '20px'
          }}
        >
          <img 
            src={testimonial.avatar} 
            alt={testimonial.name}
            style={{ 
              width: '100%', 
              height: '100%', 
              objectFit: 'cover', 
              borderRadius: '50%',
              border: '1px solid rgba(0,0,0,0.3)' 
            }}
          />
        </div>
        
        {/* Author info with subtle neon styling */}
        <div style={{ 
          display: 'flex', 
          flexDirection: 'column', 
          justifyContent: 'center',
          flexGrow: 1, 
          minWidth: 0 
        }}>
          <p 
            style={{ 
              color: 'white',
              fontFamily: 'var(--cyber-font)',
              letterSpacing: '0.05em',
              marginBottom: '8px',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              fontSize: '1.1rem',
              fontWeight: 600
            }}
          >
            {testimonial.name}
          </p>
          <p 
            style={{ 
              color: testimonial.color,
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              lineHeight: 1.2,
              fontSize: '0.9rem'
            }}
          >
            {testimonial.title}, {testimonial.company}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

const TestimonialsSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const testimonialTimerRef = useRef(null);
  
  // Testimonials data
  const testimonials = [
    {
      id: 1,
      name: 'Michael Rodriguez',
      title: 'Lead ML Engineer',
      company: 'DataStream AI',
      text: 'The real-time analytics dashboard has become an essential part of our model training workflow. Being able to visualize performance metrics and identify anomalies at a glance has cut our debugging time in half.',
      avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
      color: '#00FFFF'
    },
    {
      id: 2,
      name: 'Aisha Johnson',
      title: 'UX Research Lead',
      company: 'Neural Design Co.',
      text: 'As someone who works at the intersection of design and machine learning, CogniCube\'s interface is a breath of fresh air. The visualizations are not only informative but also aesthetically stunning, making technical presentations to non-technical stakeholders much more effective.',
      avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
      color: '#FF00FF'
    },
    {
      id: 3,
      name: 'David Chen',
      title: 'Director of AI Research',
      company: 'NeuroTech Industries',
      text: 'CogniCube has dramatically accelerated our research cycle. The ability to visualize complex models in 3D and collaborate in real-time has enabled our distributed team to work as if we were in the same room. I cannot imagine going back to our previous tools.',
      avatar: 'https://randomuser.me/api/portraits/men/67.jpg',
      color: '#FFDD00'
    }
  ];
  
  // Auto-rotate testimonials
  useEffect(() => {
    testimonialTimerRef.current = setInterval(() => {
      setActiveIndex(prev => (prev + 1) % testimonials.length);
    }, 8000);
    
    return () => clearInterval(testimonialTimerRef.current);
  }, [testimonials.length]);
  
  // Handle click on indicator
  const handleIndicatorClick = (index) => {
    setActiveIndex(index);
    clearInterval(testimonialTimerRef.current);
    testimonialTimerRef.current = setInterval(() => {
      setActiveIndex(prev => (prev + 1) % testimonials.length);
    }, 8000);
  };
  
  return (
    <section 
      id="testimonials"
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
      <div style={{ width: '100%', maxWidth: '1200px', margin: '0 auto', padding: '0 2rem' }}>
        <div style={{ marginBottom: '4rem', textAlign: 'center' }}>
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
            What Our <span style={{ color: '#00FFFF' }}>Users</span> Say
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
            Discover how professionals across industries are using CogniCube to transform their AI development workflow.
          </motion.p>
        </div>
        
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <div style={{ position: 'relative' }}>
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.5 }}
            >
              <TestimonialCard 
                testimonial={testimonials[activeIndex]}
                isActive={true}
              />
            </motion.div>
          </div>
          
          {/* Indicators */}
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '2rem', gap: '0.75rem' }}>
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => handleIndicatorClick(index)}
                style={{
                  width: '12px',
                  height: '12px',
                  borderRadius: '50%',
                  backgroundColor: index === activeIndex ? testimonials[index].color : 'rgba(255,255,255,0.2)',
                  boxShadow: index === activeIndex ? `0 0 10px ${testimonials[index].color}` : 'none',
                  border: 'none',
                  padding: 0,
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}
                aria-label={`Go to testimonial ${index + 1}`}
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
            #00FFFF 0%,
            #FFFFFF 50%,
            #00FFFF 100%
          );
          background-size: 200% auto;
          background-clip: text;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: shimmer 3s linear infinite;
          filter: drop-shadow(0 0 5px #00FFFF);
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

export default TestimonialsSection; 