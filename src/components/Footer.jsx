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

const FooterLink = ({ href, children }) => (
  <motion.a 
    href={href}
    className="text-white text-opacity-70 hover:text-opacity-100 transition-all duration-300"
    whileHover={{ 
      color: CYBERPUNK_COLORS.neonCyan,
      textShadow: `0 0 8px ${CYBERPUNK_COLORS.neonCyan}`,
      x: 5
    }}
    style={{ 
      fontFamily: 'var(--cyber-font)',
      display: 'block',
      padding: '0.4rem 0'
    }}
  >
    {children}
  </motion.a>
);

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="relative pt-24 pb-12 overflow-hidden">
      {/* Background elements */}
      <div 
        className="absolute inset-0 -z-10" 
        style={{ 
          background: `linear-gradient(to top, #000510, rgba(0,5,30,0.7))`,
          backgroundSize: '100% 100%',
          backgroundPosition: 'center' 
        }}
      />
      
      {/* Grid pattern overlay */}
      <div 
        className="absolute inset-0 -z-5 opacity-5"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 255, 255, 0.2) 1px, transparent 1px), 
                           linear-gradient(90deg, rgba(0, 255, 255, 0.2) 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }}
      />
      
      {/* Decorative elements */}
      <div className="absolute -top-6 right-20 w-80 h-80 -z-1 opacity-20 blur-[80px]" 
        style={{ background: `radial-gradient(circle, ${CYBERPUNK_COLORS.neonCyan}, transparent)` }} 
      />
      
      <div className="absolute -bottom-6 left-20 w-80 h-80 -z-1 opacity-20 blur-[80px]" 
        style={{ background: `radial-gradient(circle, ${CYBERPUNK_COLORS.neonYellow}, transparent)` }} 
      />
      
      {/* Top border with glow */}
      <div className="relative">
        <div 
          className="absolute -top-10 left-0 right-0 h-[1px]"
          style={{ 
            background: `linear-gradient(to right, transparent, ${CYBERPUNK_COLORS.neonCyan}60, transparent)`,
            boxShadow: `0 0 20px ${CYBERPUNK_COLORS.neonCyan}30`
          }}
        />
        
        {/* Animated light moving across the top border */}
        <motion.div
          className="absolute -top-10 h-[3px] w-[100px]"
          initial={{ left: '-10%' }}
          animate={{ left: '110%' }}
          transition={{ 
            duration: 4, 
            repeat: Infinity, 
            ease: 'linear',
            repeatDelay: 2
          }}
          style={{ 
            background: CYBERPUNK_COLORS.neonCyan,
            boxShadow: `0 0 20px ${CYBERPUNK_COLORS.neonCyan}, 0 0 40px ${CYBERPUNK_COLORS.neonCyan}`,
            borderRadius: '50%'
          }}
        />
      </div>
      
      <div className="container mx-auto px-6 relative z-10">
        {/* Logo and newsletter section */}
        <div className="flex flex-col md:flex-row justify-between items-start border-b border-gray-800 pb-16 mb-16">
          {/* Logo and tagline */}
          <div className="w-full md:w-1/3 mb-10 md:mb-0">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="mb-6"
            >
              <h3 
                className="text-3xl font-bold mb-4 tracking-wider"
                style={{ 
                  fontFamily: 'var(--lunar-font)',
                  position: 'relative',
                  display: 'inline-block'
                }}
              >
                <span className="relative z-10">COGNI<span style={{ color: CYBERPUNK_COLORS.neonYellow }}>CUBE</span></span>
                <div 
                  className="absolute -bottom-2 left-0 h-[1px] w-1/2" 
                  style={{ 
                    background: `linear-gradient(to right, ${CYBERPUNK_COLORS.neonCyan}, transparent)`,
                    boxShadow: `0 0 10px ${CYBERPUNK_COLORS.neonCyan}30`
                  }}
                />
              </h3>
              <p className="text-gray-400 mb-8 text-lg leading-relaxed">
                Revolutionizing AI visualization and model development for researchers and engineers.
              </p>
            </motion.div>
            
            {/* Social icons with enhanced styling */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="flex space-x-5"
            >
              {['twitter', 'linkedin', 'github', 'discord'].map((social, index) => (
                <motion.a 
                  key={social}
                  href="#" 
                  whileHover={{ y: -5, boxShadow: `0 10px 20px rgba(0,0,0,0.3), 0 0 15px ${CYBERPUNK_COLORS.neonCyan}50` }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.05 * index }}
                  viewport={{ once: true }}
                  style={{ 
                    width: '45px',
                    height: '45px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: '8px',
                    backgroundColor: 'rgba(0, 0, 0, 0.4)',
                    border: `1px solid ${CYBERPUNK_COLORS.neonCyan}40`,
                    boxShadow: `0 0 10px ${CYBERPUNK_COLORS.neonCyan}20`,
                    transition: 'all 0.3s ease'
                  }}
                >
                  <svg 
                    width="20" 
                    height="20" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24" 
                    xmlns="http://www.w3.org/2000/svg"
                    style={{ 
                      color: CYBERPUNK_COLORS.neonCyan,
                      filter: `drop-shadow(0 0 3px ${CYBERPUNK_COLORS.neonCyan}70)`
                    }}
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d={
                        social === 'twitter' ? "M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" :
                        social === 'linkedin' ? "M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z M2 4a2 2 0 114 0 2 2 0 01-4 0z" :
                        social === 'github' ? "M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77 5.07 5.07 0 0019.91 1S18.73.65 16 2.48a13.38 13.38 0 00-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 005 4.77a5.44 5.44 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 009 18.13V22" :
                        "M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"
                      }
                    />
                  </svg>
                </motion.a>
              ))}
            </motion.div>
          </div>
          
          {/* Newsletter */}
          <div className="w-full md:w-1/2 md:pl-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <h4 
                className="text-xl font-semibold mb-5"
                style={{ 
                  fontFamily: 'var(--cyber-font)',
                  color: CYBERPUNK_COLORS.neonYellow,
                  letterSpacing: '0.05em',
                  textShadow: `0 0 5px ${CYBERPUNK_COLORS.neonYellow}40`
                }}
              >
                JOIN THE COGNICUBE MOVEMENT
              </h4>
              <p className="text-gray-300 mb-6 text-lg">
                Subscribe to our newsletter for the latest updates, features, and early access.
              </p>
              <div className="flex flex-col sm:flex-row">
                <div className="relative flex-grow mb-4 sm:mb-0">
                  <input 
                    type="email" 
                    placeholder="Enter your email" 
                    className="w-full px-5 py-4 bg-transparent text-white border-2 border-gray-700 focus:border-cyan-500 outline-none rounded-md transition duration-300"
                    style={{ 
                      backgroundColor: 'rgba(0, 0, 0, 0.3)',
                      boxShadow: 'inset 0 0 10px rgba(0, 0, 0, 0.2)'
                    }}
                  />
                  <div className="absolute top-0 left-0 mt-2 ml-2 opacity-10 pointer-events-none">
                    <svg width="20" height="20" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                      <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                    </svg>
                  </div>
                </div>
                <motion.button
                  whileHover={{ 
                    scale: 1.05,
                    boxShadow: `0 0 20px ${CYBERPUNK_COLORS.neonYellow}70`
                  }}
                  whileTap={{ scale: 0.95 }}
                  className="sm:ml-4 px-6 py-4 rounded"
                  style={{ 
                    backgroundColor: CYBERPUNK_COLORS.neonYellow,
                    color: CYBERPUNK_COLORS.black,
                    fontWeight: 'bold',
                    fontFamily: 'var(--cyber-font)',
                    letterSpacing: '0.05em',
                    position: 'relative',
                    overflow: 'hidden'
                  }}
                >
                  <span className="relative z-10">SUBSCRIBE</span>
                  <motion.span 
                    className="absolute inset-0 z-0"
                    initial={{ x: "-100%", opacity: 0.5 }}
                    whileHover={{ x: "100%" }}
                    transition={{ duration: 1 }}
                    style={{ 
                      background: `linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)`,
                      top: 0,
                      height: '100%',
                      width: '100%',
                      transform: 'skewX(-20deg)'
                    }}
                  />
                </motion.button>
              </div>
            </motion.div>
          </div>
        </div>
        
        {/* Main links grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 md:gap-6 mb-16">
          {/* Links sections with improved layout */}
          {[
            { 
              title: 'Product', 
              links: ['Features', 'Use Cases', 'Pricing', 'Resources', 'Roadmap'],
              icon: (
                <svg width="20" height="20" fill="currentColor" viewBox="0 0 20 20" style={{ color: CYBERPUNK_COLORS.neonCyan }}>
                  <path fillRule="evenodd" d="M12 1.586l-4 4v12.828l4-4V1.586zM3.707 3.293A1 1 0 002 4v10a1 1 0 00.293.707L6 18.414V5.586L3.707 3.293zM17.707 5.293L14 1.586v12.828l2.293 2.293A1 1 0 0018 16V6a1 1 0 00-.293-.707z" clipRule="evenodd" />
                </svg>
              )
            },
            { 
              title: 'Company', 
              links: ['About Us', 'Careers', 'Blog', 'Press', 'Contact'],
              icon: (
                <svg width="20" height="20" fill="currentColor" viewBox="0 0 20 20" style={{ color: CYBERPUNK_COLORS.neonPink }}>
                  <path fillRule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 01-1 1h-2a1 1 0 01-1-1v-2a1 1 0 00-1-1H7a1 1 0 00-1 1v2a1 1 0 01-1 1H3a1 1 0 01-1-1V4zm3 1h2v2H7V5zm2 4H7v2h2V9zm2-4h2v2h-2V5zm2 4h-2v2h2V9z" clipRule="evenodd" />
                </svg>
              )
            },
            { 
              title: 'Resources', 
              links: ['Documentation', 'API Reference', 'Community', 'Support', 'Status'],
              icon: (
                <svg width="20" height="20" fill="currentColor" viewBox="0 0 20 20" style={{ color: CYBERPUNK_COLORS.neonYellow }}>
                  <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
                </svg>
              )
            },
            { 
              title: 'Legal', 
              links: ['Privacy Policy', 'Terms of Service', 'Cookie Policy', 'Data Processing', 'Compliance'],
              icon: (
                <svg width="20" height="20" fill="currentColor" viewBox="0 0 20 20" style={{ color: CYBERPUNK_COLORS.turquoise }}>
                  <path fillRule="evenodd" d="M10 2a1 1 0 00-1 1v1a1 1 0 002 0V3a1 1 0 00-1-1zM4 4h3a3 3 0 006 0h3a2 2 0 012 2v9a2 2 0 01-2 2H4a2 2 0 01-2-2V6a2 2 0 012-2zm2.5 7a1.5 1.5 0 100-3 1.5 1.5 0 000 3zm2.45 4a2.5 2.5 0 10-4.9 0h4.9zM12 9a1 1 0 100 2h3a1 1 0 100-2h-3zm-1 4a1 1 0 011-1h2a1 1 0 110 2h-2a1 1 0 01-1-1z" clipRule="evenodd" />
                </svg>
              )
            }
          ].map((section, index) => (
            <motion.div 
              key={section.title} 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="flex items-center mb-5">
                <div className="mr-3">
                  {section.icon}
                </div>
                <h4 
                  className="text-lg font-semibold"
                  style={{ 
                    fontFamily: 'var(--cyber-font)',
                    color: 'white',
                    letterSpacing: '0.05em',
                  }}
                >
                  {section.title}
                </h4>
              </div>
              
              <ul className="space-y-1">
                {section.links.map((link, linkIndex) => (
                  <li key={`${section.title}-${link}`}>
                    <FooterLink href="#">
                      <motion.span
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: 0.05 * linkIndex + 0.2 }}
                        viewport={{ once: true }}
                      >
                        {link}
                      </motion.span>
                    </FooterLink>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
        
        {/* Contact information */}
        <div className="mb-16 grid grid-cols-1 md:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="bg-gray-900 bg-opacity-50 p-6 rounded-lg border border-gray-800"
          >
            <h4 
              className="text-lg font-semibold mb-4"
              style={{ 
                fontFamily: 'var(--cyber-font)',
                color: CYBERPUNK_COLORS.neonCyan,
                letterSpacing: '0.05em'
              }}
            >
              SAN FRANCISCO
            </h4>
            <p className="text-gray-400 mb-2">535 Market Street, Suite 1000</p>
            <p className="text-gray-400 mb-4">San Francisco, CA 94105</p>
            <p className="text-white font-medium">+1 (415) 555-0123</p>
            <div className="mt-4 w-12 h-[2px]" style={{ background: CYBERPUNK_COLORS.neonCyan }}></div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="bg-gray-900 bg-opacity-50 p-6 rounded-lg border border-gray-800"
          >
            <h4 
              className="text-lg font-semibold mb-4"
              style={{ 
                fontFamily: 'var(--cyber-font)',
                color: CYBERPUNK_COLORS.neonYellow,
                letterSpacing: '0.05em'
              }}
            >
              LONDON
            </h4>
            <p className="text-gray-400 mb-2">87-89 Albert Embankment</p>
            <p className="text-gray-400 mb-4">London, SE1 7TP, UK</p>
            <p className="text-white font-medium">+44 (20) 7946-0321</p>
            <div className="mt-4 w-12 h-[2px]" style={{ background: CYBERPUNK_COLORS.neonYellow }}></div>
          </motion.div>
        </div>
        
        {/* Bottom section with copyright */}
        <div className="pt-8 border-t border-gray-800 flex flex-col md:flex-row md:justify-between md:items-center">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="mb-6 md:mb-0"
          >
            <p className="text-gray-500 text-sm">
              &copy; {currentYear} CogniCube. All rights reserved.
            </p>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="flex space-x-8"
          >
            {['Terms', 'Privacy', 'Cookies'].map((item, index) => (
              <motion.a 
                key={item} 
                href="#" 
                className="text-gray-500 hover:text-white text-sm transition-colors duration-300"
                whileHover={{ color: CYBERPUNK_COLORS.neonCyan }}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.1 * index + 0.2 }}
                viewport={{ once: true }}
              >
                {item}
              </motion.a>
            ))}
          </motion.div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 