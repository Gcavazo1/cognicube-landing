import React, { useState } from 'react';
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

const InputField = ({ label, type, name, value, onChange, placeholder, isTextarea = false }) => {
  return (
    <div style={{ marginBottom: '1.75rem', position: 'relative' }}>
      <label 
        htmlFor={name}
        style={{ 
          display: 'block',
          marginBottom: '0.5rem',
          color: CYBERPUNK_COLORS.neonCyan,
          fontFamily: 'Rajdhani, sans-serif',
          letterSpacing: '0.05em',
          fontSize: '0.95rem',
          fontWeight: '500'
        }}
      >
        {label}
      </label>
      
      <div style={{ position: 'relative' }}>
        {isTextarea ? (
          <textarea
            id={name}
            name={name}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            rows={6}
            style={{ 
              width: '100%',
              padding: '0.75rem 1rem',
              backgroundColor: 'rgba(0, 0, 0, 0.4)',
              border: `1px solid ${CYBERPUNK_COLORS.neonCyan}40`,
              borderRadius: '4px',
              color: 'white',
              boxShadow: 'inset 0 0 10px rgba(0, 0, 0, 0.4)',
              transition: 'all 0.3s ease',
              fontFamily: 'Inter, sans-serif',
              fontSize: '0.95rem',
              lineHeight: 1.5,
              outline: 'none'
            }}
            onFocus={(e) => {
              e.target.style.borderColor = `${CYBERPUNK_COLORS.neonCyan}80`;
              e.target.style.boxShadow = `inset 0 0 10px rgba(0, 0, 0, 0.4), 0 0 8px ${CYBERPUNK_COLORS.neonCyan}40`;
            }}
            onBlur={(e) => {
              e.target.style.borderColor = `${CYBERPUNK_COLORS.neonCyan}40`;
              e.target.style.boxShadow = 'inset 0 0 10px rgba(0, 0, 0, 0.4)';
            }}
          />
        ) : (
          <input
            type={type}
            id={name}
            name={name}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            style={{ 
              width: '100%',
              padding: '0.75rem 1rem',
              backgroundColor: 'rgba(0, 0, 0, 0.4)',
              border: `1px solid ${CYBERPUNK_COLORS.neonCyan}40`,
              borderRadius: '4px',
              color: 'white',
              boxShadow: 'inset 0 0 10px rgba(0, 0, 0, 0.4)',
              transition: 'all 0.3s ease',
              fontFamily: 'Inter, sans-serif',
              fontSize: '0.95rem',
              outline: 'none'
            }}
            onFocus={(e) => {
              e.target.style.borderColor = `${CYBERPUNK_COLORS.neonCyan}80`;
              e.target.style.boxShadow = `inset 0 0 10px rgba(0, 0, 0, 0.4), 0 0 8px ${CYBERPUNK_COLORS.neonCyan}40`;
            }}
            onBlur={(e) => {
              e.target.style.borderColor = `${CYBERPUNK_COLORS.neonCyan}40`;
              e.target.style.boxShadow = 'inset 0 0 10px rgba(0, 0, 0, 0.4)';
            }}
          />
        )}
        
        {/* Animated bottom border */}
        <div 
          style={{ 
            position: 'absolute',
            bottom: '0',
            left: '50%',
            transform: 'translateX(-50%)',
            height: '2px',
            width: '0',
            background: `linear-gradient(90deg, transparent, ${CYBERPUNK_COLORS.neonCyan}, transparent)`,
            transition: 'width 0.3s ease',
            opacity: 0
          }}
          className="focus-line"
        />
      </div>
    </div>
  );
};

const ContactSection = () => {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    company: '',
    message: '',
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitStatus('success');
      
      // Reset form
      setFormState({
        name: '',
        email: '',
        company: '',
        message: '',
      });
      
      // Clear success message after a delay
      setTimeout(() => {
        setSubmitStatus(null);
      }, 5000);
    }, 1500);
  };
  
  return (
    <section 
      id="contact"
      style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        width: '100%',
        overflow: 'hidden',
        padding: '6rem 0'
      }}
    >
      {/* Decorative elements */}
      <div 
        style={{
          position: 'absolute',
          top: '5rem',
          right: '10%',
          width: '150px',
          height: '1px',
          background: `linear-gradient(90deg, transparent, ${CYBERPUNK_COLORS.neonCyan})`,
          boxShadow: `0 0 10px ${CYBERPUNK_COLORS.neonCyan}60`,
          opacity: 0.6
        }}
      />
      <div 
        style={{
          position: 'absolute',
          bottom: '8rem',
          left: '10%',
          width: '100px',
          height: '1px',
          background: `linear-gradient(90deg, ${CYBERPUNK_COLORS.neonYellow}, transparent)`,
          boxShadow: `0 0 10px ${CYBERPUNK_COLORS.neonYellow}60`,
          opacity: 0.6
        }}
      />
      
      <div style={{ width: '100%', maxWidth: '1400px', margin: '0 auto', padding: '0 1.5rem' }}>
        <div style={{ 
          display: 'flex', 
          flexWrap: 'wrap',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          gap: '4rem'
        }}>
          {/* Contact Info */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            style={{ 
              flex: '1 1 400px',
              paddingRight: '2rem'
            }}
          >
            <div style={{ marginBottom: '3rem' }}>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                style={{ 
                  color: 'white', 
                  fontFamily: 'Rajdhani, sans-serif',
                  letterSpacing: '0.05em',
                  fontSize: '2.5rem',
                  fontWeight: 'bold',
                  marginBottom: '1rem'
                }}
              >
                Get In <span style={{ color: CYBERPUNK_COLORS.neonCyan }}>Touch</span>
              </motion.h2>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true }}
                style={{
                  color: 'rgba(255, 255, 255, 0.8)',
                  fontSize: '1.1rem',
                  lineHeight: 1.6,
                  marginBottom: '2rem'
                }}
              >
                Have questions about CogniCube or want to schedule a demo? Our team is ready to help you transform your AI visualization workflow.
              </motion.p>
              
              {/* Contact button */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <div 
                  style={{
                    display: 'inline-block',
                    padding: '0.5rem 1.25rem',
                    backgroundColor: 'rgba(0, 0, 0, 0.3)',
                    border: `1px solid ${CYBERPUNK_COLORS.neonCyan}`,
                    borderRadius: '4px',
                    color: CYBERPUNK_COLORS.neonCyan,
                    fontSize: '0.9rem',
                    fontWeight: 'bold',
                    letterSpacing: '0.05em',
                    textTransform: 'uppercase',
                    marginBottom: '3rem'
                  }}
                >
                  CONTACT SALES
                </div>
              </motion.div>
            </div>
            
            {/* Contact info blocks */}
            <div style={{ marginBottom: '2rem' }}>
              {[
                { 
                  icon: '📧', 
                  title: 'Email', 
                  content: 'info@cognicube.ai',
                  delay: 0.3
                },
                { 
                  icon: '📍', 
                  title: 'Location', 
                  content: '123 AI Street, San Francisco, CA 94103',
                  delay: 0.4
                },
                { 
                  icon: '📱', 
                  title: 'Phone', 
                  content: '+1 (555) 123-4567',
                  delay: 0.5
                }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: item.delay }}
                  viewport={{ once: true }}
                  style={{
                    marginBottom: '1.5rem',
                    display: 'flex',
                    alignItems: 'center'
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      width: '3rem',
                      height: '3rem',
                      backgroundColor: 'rgba(0, 0, 0, 0.3)',
                      borderRadius: '50%',
                      marginRight: '1rem',
                      fontSize: '1.25rem'
                    }}
                  >
                    {item.icon}
                  </div>
                  <div>
                    <h4 
                      style={{ 
                        color: CYBERPUNK_COLORS.neonCyan,
                        fontFamily: 'Rajdhani, sans-serif',
                        fontSize: '1.1rem',
                        fontWeight: 'bold',
                        marginBottom: '0.25rem'
                      }}
                    >
                      {item.title}
                    </h4>
                    <p style={{ color: 'rgba(255, 255, 255, 0.8)' }}>{item.content}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
          
          {/* Contact Form */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            style={{ 
              flex: '1 1 500px',
              backgroundColor: 'rgba(0, 0, 0, 0.2)',
              backdropFilter: 'blur(8px)',
              borderRadius: '8px',
              overflow: 'hidden',
              border: `1px solid rgba(0, 220, 220, 0.15)`,
              boxShadow: '0 15px 35px rgba(0, 0, 0, 0.2)'
            }}
          >
            {/* Form top border */}
            <div 
              style={{
                height: '3px',
                background: `linear-gradient(90deg, transparent, ${CYBERPUNK_COLORS.neonCyan}, transparent)`,
                opacity: 0.7
              }}
            />
            
            <form 
              onSubmit={handleSubmit}
              style={{ padding: '2.5rem' }}
            >
              <div style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(2, 1fr)', 
                gap: '1.5rem',
                marginBottom: '1.5rem'
              }}>
                <div style={{ gridColumn: '1 / 2' }}>
                  <InputField 
                    label="Your Name"
                    type="text"
                    name="name"
                    value={formState.name}
                    onChange={handleChange}
                    placeholder="John Doe"
                  />
                </div>
                <div style={{ gridColumn: '2 / 3' }}>
                  <InputField 
                    label="Email Address"
                    type="email"
                    name="email"
                    value={formState.email}
                    onChange={handleChange}
                    placeholder="john@example.com"
                  />
                </div>
                <div style={{ gridColumn: '1 / 3' }}>
                  <InputField 
                    label="Company Name"
                    type="text"
                    name="company"
                    value={formState.company}
                    onChange={handleChange}
                    placeholder="Your Organization"
                  />
                </div>
                <div style={{ gridColumn: '1 / 3' }}>
                  <InputField 
                    label="Message"
                    name="message"
                    value={formState.message}
                    onChange={handleChange}
                    placeholder="How can we help you?"
                    isTextarea={true}
                  />
                </div>
              </div>
              
              {/* Submit button with loading state */}
              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="submit-button-glow"
                style={{
                  backgroundColor: submitStatus === 'success' ? CYBERPUNK_COLORS.neonCyan : CYBERPUNK_COLORS.neonYellow,
                  color: 'black',
                  border: 'none',
                  padding: '0.75rem 1.5rem',
                  borderRadius: '4px',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  fontSize: '1rem',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  marginTop: '1.5rem',
                  position: 'relative',
                  overflow: 'hidden',
                  transition: 'all 0.3s ease'
                }}
                disabled={isSubmitting || submitStatus === 'success'}
              >
                {isSubmitting ? 'Processing...' : submitStatus === 'success' ? 'Message Sent!' : 'Send Message'}
                
                {/* Add a ripple effect on button */}
                <span className="ripple-effect"></span>
              </motion.button>
              
              {/* Success message */}
              {submitStatus === 'success' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  style={{
                    backgroundColor: 'rgba(0, 255, 100, 0.15)',
                    color: 'rgba(0, 255, 100, 0.9)',
                    padding: '1rem',
                    borderRadius: '4px',
                    marginTop: '1.5rem',
                    textAlign: 'center',
                    border: '1px solid rgba(0, 255, 100, 0.3)'
                  }}
                >
                  Thank you! Your message has been sent successfully.
                </motion.div>
              )}
            </form>
          </motion.div>
        </div>
      </div>
      
      {/* Add this style at the end of the component's return statement */}
      <style jsx>{`
        .submit-button-glow {
          box-shadow: 0 0 15px rgba(255, 221, 0, 0.4);
          animation: button-pulse 2s infinite;
        }
        
        @keyframes button-pulse {
          0% {
            box-shadow: 0 0 15px rgba(255, 221, 0, 0.4);
          }
          50% {
            box-shadow: 0 0 30px rgba(255, 221, 0, 0.7), 0 0 40px rgba(255, 221, 0, 0.4);
          }
          100% {
            box-shadow: 0 0 15px rgba(255, 221, 0, 0.4);
          }
        }
        
        .ripple-effect {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(255, 255, 255, 0.3);
          border-radius: 50%;
          transform: scale(0);
          opacity: 0;
          pointer-events: none;
        }
        
        .submit-button-glow:active .ripple-effect {
          animation: ripple 0.8s ease-out;
        }
        
        @keyframes ripple {
          0% {
            transform: scale(0);
            opacity: 0.5;
          }
          100% {
            transform: scale(2.5);
            opacity: 0;
          }
        }
        
        /* Add responsive styling for mobile */
        @media (max-width: 768px) {
          .submit-button-glow {
            width: 100%;
            padding: 1rem;
            font-size: 0.9rem;
          }
        }
      `}</style>
    </section>
  );
};

export default ContactSection; 