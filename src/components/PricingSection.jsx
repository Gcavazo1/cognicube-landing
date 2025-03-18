import React, { useState } from 'react';
import { motion } from 'framer-motion';

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

// Feature check component
const FeatureCheck = ({ included }) => {
  return included ? (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path 
        d="M7.5 13.5L4 10L3 11L7.5 15.5L17.5 5.5L16.5 4.5L7.5 13.5Z" 
        fill={CYBERPUNK_COLORS.neonYellow} 
        stroke={CYBERPUNK_COLORS.neonYellow}
        strokeWidth="0.5"
      />
    </svg>
  ) : (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path 
        d="M14 6L6 14M6 6L14 14" 
        stroke="rgba(255,255,255,0.4)" 
        strokeWidth="1.5" 
        strokeLinecap="round" 
      />
    </svg>
  );
};

const PricingCard = ({ title, price, features, isPopular, color, delay }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: delay }}
      viewport={{ once: true, margin: "-50px" }}
      whileHover={{ 
        y: -8,
        boxShadow: `0 10px 40px rgba(0, 0, 0, 0.4), 0 0 20px ${color}50`
      }}
      style={{
        position: 'relative',
        borderRadius: '0.75rem',
        overflow: 'hidden',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        backdropFilter: 'blur(10px)',
        border: `1px solid ${color}30`,
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      {/* Popular flag */}
      {isPopular && (
        <div 
          style={{
            position: 'absolute',
            top: '1.5rem',
            right: '-3rem',
            backgroundColor: CYBERPUNK_COLORS.neonPink,
            color: '#000',
            fontWeight: 'bold',
            padding: '0.35rem 3.5rem',
            transform: 'rotate(45deg)',
            boxShadow: `0 0 15px ${CYBERPUNK_COLORS.neonPink}50`,
            zIndex: 10,
            fontSize: '0.75rem',
            letterSpacing: '0.05em',
            textTransform: 'uppercase'
          }}
        >
          Most Popular
        </div>
      )}
      
      {/* Glowing top border */}
      <div 
        style={{
          position: 'absolute',
          top: 0,
          left: '5%',
          width: '90%',
          height: '2px',
          background: `linear-gradient(90deg, transparent, ${color}, transparent)`,
          boxShadow: `0 0 10px ${color}80`
        }}
      />
      
      {/* Card Content */}
      <div style={{
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        padding: '2rem 1.25rem',
        height: '100%'
      }}>
        {/* Title */}
        <h3 
          style={{ 
            color: color,
            fontFamily: 'var(--cyber-font)',
            fontSize: '1.75rem',
            fontWeight: 'bold',
            marginBottom: '1rem',
            letterSpacing: '0.05em'
          }}
        >
          {title}
        </h3>
        
        {/* Price */}
        <div style={{ marginBottom: '1.25rem' }}>
          <span 
            style={{ 
              color: '#FFF', 
              fontFamily: 'var(--cyber-font)',
              fontSize: '2.5rem',
              fontWeight: 'bold',
              lineHeight: 1.1
            }}
          >
            ${price}
          </span>
          <span style={{ color: 'rgba(255,255,255,0.6)', marginLeft: '0.25rem' }}>/month</span>
        </div>
        
        {/* Divider line */}
        <div 
          style={{
            height: '1px',
            background: `linear-gradient(to right, ${color}30, ${color}80, ${color}30)`,
            marginBottom: '1.25rem'
          }}
        />
        
        {/* Features */}
        <ul style={{ 
          listStyle: 'none', 
          padding: 0, 
          margin: 0, 
          marginBottom: '1.25rem',
          flexGrow: 1
        }}>
          {features.map((feature, index) => (
            <li 
              key={index}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                marginBottom: '0.6rem',
                color: feature.included ? 'white' : 'rgba(255,255,255,0.5)',
                fontSize: '0.95rem'
              }}
            >
              <FeatureCheck included={feature.included} />
              <span>{feature.text}</span>
            </li>
          ))}
        </ul>
        
        {/* Button */}
        <motion.button
          whileHover={{ 
            y: -3,
            boxShadow: `0 10px 25px rgba(0, 0, 0, 0.3), 0 0 20px ${color}60`
          }}
          whileTap={{ scale: 0.95 }}
          style={{
            marginTop: '2rem',
            width: '100%',
            padding: '0.75rem 1.5rem',
            backgroundColor: isPopular ? color : 'rgba(0, 0, 0, 0.4)',
            border: `2px solid ${color}`,
            borderRadius: '4px',
            color: isPopular ? '#000' : color,
            fontWeight: 'bold',
            fontSize: '1rem',
            textTransform: 'uppercase',
            cursor: 'pointer',
            letterSpacing: '0.05em',
            transition: 'all 0.3s ease',
            fontFamily: 'var(--cyber-font)'
          }}
        >
          Get Started
        </motion.button>
      </div>
    </motion.div>
  );
};

const PricingSection = () => {
  const [billingCycle, setBillingCycle] = useState('monthly');
  
  const pricingOptions = [
    {
      title: 'Starter',
      prices: { monthly: 39, annual: 31 },
      color: CYBERPUNK_COLORS.neonCyan,
      isPopular: false,
      features: [
        { text: '3D model visualization', included: true },
        { text: 'Basic analytics dashboard', included: true },
        { text: 'Up to 5 projects', included: true },
        { text: '2GB storage', included: true },
        { text: 'Email support', included: true },
        { text: 'Advanced visualization options', included: false },
        { text: 'Team collaboration', included: false },
        { text: 'API access', included: false }
      ]
    },
    {
      title: 'Professional',
      prices: { monthly: 89, annual: 71 },
      color: CYBERPUNK_COLORS.neonYellow,
      isPopular: true,
      features: [
        { text: '3D model visualization', included: true },
        { text: 'Advanced analytics dashboard', included: true },
        { text: 'Unlimited projects', included: true },
        { text: '25GB storage', included: true },
        { text: 'Priority support', included: true },
        { text: 'Advanced visualization options', included: true },
        { text: 'Team collaboration (up to 5 users)', included: true },
        { text: 'API access', included: false }
      ]
    },
    {
      title: 'Enterprise',
      prices: { monthly: 199, annual: 159 },
      color: CYBERPUNK_COLORS.neonPink,
      isPopular: false,
      features: [
        { text: '3D model visualization', included: true },
        { text: 'Advanced analytics dashboard', included: true },
        { text: 'Unlimited projects', included: true },
        { text: 'Unlimited storage', included: true },
        { text: 'Dedicated support', included: true },
        { text: 'Advanced visualization options', included: true },
        { text: 'Team collaboration (unlimited)', included: true },
        { text: 'Full API access', included: true }
      ]
    }
  ];
  
  return (
    <section 
      id="pricing"
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
            Pricing <span style={{ color: CYBERPUNK_COLORS.neonYellow }}>Plans</span>
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
            Choose the plan that fits your needs. All plans include access to our core visualization tools.
          </motion.p>
          
          {/* Billing toggle */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '1rem',
              marginBottom: '3rem'
            }}
          >
            <button
              onClick={() => setBillingCycle('monthly')}
              style={{
                background: 'none',
                border: 'none',
                color: billingCycle === 'monthly' ? 'white' : 'rgba(255,255,255,0.5)',
                fontWeight: billingCycle === 'monthly' ? 'bold' : 'normal',
                padding: '0.5rem 1rem',
                cursor: 'pointer',
                fontSize: '1rem',
                position: 'relative'
              }}
            >
              Monthly
              {billingCycle === 'monthly' && (
                <motion.div
                  layoutId="billing-indicator"
                  style={{
                    position: 'absolute',
                    bottom: 0,
                    left: '10%',
                    right: '10%',
                    height: '2px',
                    background: CYBERPUNK_COLORS.neonYellow,
                    borderRadius: '4px'
                  }}
                />
              )}
            </button>
            
            <button
              onClick={() => setBillingCycle('annual')}
              style={{
                background: 'none',
                border: 'none',
                color: billingCycle === 'annual' ? 'white' : 'rgba(255,255,255,0.5)',
                fontWeight: billingCycle === 'annual' ? 'bold' : 'normal',
                padding: '0.5rem 1rem',
                cursor: 'pointer',
                fontSize: '1rem',
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}
            >
              Annual
              {billingCycle === 'annual' && (
                <motion.div
                  layoutId="billing-indicator"
                  style={{
                    position: 'absolute',
                    bottom: 0,
                    left: '10%',
                    right: '10%',
                    height: '2px',
                    background: CYBERPUNK_COLORS.neonYellow,
                    borderRadius: '4px'
                  }}
                />
              )}
              <span 
                style={{
                  backgroundColor: CYBERPUNK_COLORS.neonYellow,
                  color: 'black',
                  padding: '0.25rem 0.5rem',
                  borderRadius: '4px',
                  fontSize: '0.75rem',
                  fontWeight: 'bold'
                }}
              >
                Save 20%
              </span>
            </button>
          </motion.div>
        </div>
        
        {/* Pricing cards grid */}
        <div 
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(290px, 1fr))',
            gap: '2rem',
            position: 'relative',
            zIndex: 10
          }}
        >
          {pricingOptions.map((option, index) => (
            <PricingCard
              key={index}
              title={option.title}
              price={billingCycle === 'annual' ? option.prices.annual : option.prices.monthly}
              features={option.features}
              isPopular={option.isPopular}
              color={option.color}
              delay={index * 0.1}
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
            ${CYBERPUNK_COLORS.neonYellow} 0%,
            #FFFFFF 50%,
            ${CYBERPUNK_COLORS.neonYellow} 100%
          );
          background-size: 200% auto;
          background-clip: text;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: shimmer 3s linear infinite;
          filter: drop-shadow(0 0 5px ${CYBERPUNK_COLORS.neonYellow});
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

export default PricingSection; 