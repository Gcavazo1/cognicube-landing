import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { COLORS } from './OpeningAnimation';

// Enhanced cyberpunk colors based on reference images
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

// Add styles to the document head
const addStyles = () => {
  const styleEl = document.createElement('style');
  styleEl.textContent = `
    .navbar-link {
      position: relative;
      text-decoration: none;
      font-weight: 500;
      transition: all 0.3s ease;
    }
    
    .navbar-link:hover {
      color: ${CYBERPUNK_COLORS.neonCyan};
      text-shadow: 0 0 8px ${CYBERPUNK_COLORS.neonCyan}, 0 0 12px ${CYBERPUNK_COLORS.neonCyan}80;
    }
    
    .navbar-link::after {
      content: '';
      position: absolute;
      width: 0;
      height: 2px;
      bottom: -4px;
      left: 50%;
      transform: translateX(-50%);
      background: linear-gradient(90deg, transparent, ${CYBERPUNK_COLORS.neonCyan}, transparent);
      transition: width 0.3s ease;
      box-shadow: 0 0 8px ${CYBERPUNK_COLORS.neonCyan}, 0 0 12px ${CYBERPUNK_COLORS.neonCyan}60;
    }
    
    .navbar-link:hover::after {
      width: 100%;
    }
    
    .nav-glitch-effect {
      position: relative;
    }
    
    .nav-glitch-effect:hover::before {
      content: attr(data-text);
      position: absolute;
      left: -2px;
      text-shadow: 2px 0 ${CYBERPUNK_COLORS.neonPink};
      top: 0;
      color: ${CYBERPUNK_COLORS.neonCyan};
      overflow: hidden;
      clip: rect(0, 900px, 0, 0);
      animation: noise-anim-2 3s infinite linear alternate-reverse;
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
    
    /* Fix for tailwind className hidden on desktop navigation */
    @media (min-width: 768px) {
      .md\\:flex {
        display: flex !important;
      }
      
      .md\\:hidden {
        display: none !important;
      }
    }
    
    /* Fix for tailwind className hidden on mobile button */
    @media (max-width: 767px) {
      .md\\:hidden {
        display: block !important;
      }
      
      .md\\:flex {
        display: none !important;
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

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // Navigation items
  const navItems = [
    { title: 'Home', href: '#' },
    { title: 'Features', href: '#features' },
    { title: 'Advanced', href: '#advanced' },
    { title: 'Use Cases', href: '#use-cases' },
    { title: 'Testimonials', href: '#testimonials' },
    { title: 'Pricing', href: '#pricing' },
    { title: 'Contact', href: '#contact' }
  ];

  // Add CSS styles on component mount
  useEffect(() => {
    return addStyles();
  }, []);
  
  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    document.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      document.removeEventListener('scroll', handleScroll);
    };
  }, [scrolled]);
  
  // Close mobile menu when clicking a link
  const handleNavLinkClick = () => {
    setMobileMenuOpen(false);
  };
  
  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          padding: scrolled ? '0.75rem 0' : '1.25rem 0',
          backgroundColor: scrolled ? 'rgba(0, 0, 0, 0.85)' : 'rgba(0, 0, 0, 0.3)',
          backdropFilter: 'blur(10px)',
          borderBottom: scrolled ? `1px solid ${CYBERPUNK_COLORS.neonCyan}30` : 'none',
          transition: 'all 0.3s ease',
          boxShadow: scrolled ? `0 4px 20px rgba(0, 0, 0, 0.5), 0 0 15px ${CYBERPUNK_COLORS.neonCyan}20` : 'none'
        }}
      >
        {/* Decorative top border with gradient */}
        <div 
          style={{
            height: '2px',
            width: '100%',
            background: `linear-gradient(90deg, 
              ${CYBERPUNK_COLORS.neonPink}00, 
              ${CYBERPUNK_COLORS.neonPink}, 
              ${CYBERPUNK_COLORS.neonCyan}, 
              ${CYBERPUNK_COLORS.neonYellow}, 
              ${CYBERPUNK_COLORS.neonYellow}00
            )`,
            opacity: scrolled ? 1 : 0,
            transition: 'opacity 0.3s ease'
          }}
        />
        
        <div 
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '100%',
            maxWidth: '1200px',
            margin: '0 auto',
            padding: '0 2rem'
          }}
        >
          {/* Logo */}
          <motion.a
            href="#"
            whileHover={{ scale: 1.05 }}
            style={{
              fontFamily: 'var(--cyber-font)',
              fontSize: '1.75rem',
              fontWeight: 'bold',
              color: CYBERPUNK_COLORS.neonCyan,
              textDecoration: 'none',
              letterSpacing: '0.05em',
              textShadow: `0 0 10px ${CYBERPUNK_COLORS.neonCyan}90`,
              display: 'flex',
              alignItems: 'center'
            }}
          >
            COGNICUBE
          </motion.a>

          {/* Desktop Navigation */}
          <div 
            className="desktop-nav"
            style={{
              display: 'flex',
              gap: '1rem',
              alignItems: 'center'
            }}
          >
            {/* Navigation Links */}
            <ul
              style={{
                display: 'flex',
                gap: '1.25rem',
                listStyle: 'none',
                margin: 0,
                padding: 0
              }}
            >
              {navItems.map((item, index) => (
                <li key={index}>
                  <a
                    href={item.href}
                    className="nav-link"
                    style={{
                      color: 'white',
                      textDecoration: 'none',
                      fontWeight: '500',
                      fontSize: '0.95rem',
                      position: 'relative',
                      padding: '0.5rem 0',
                      transition: 'all 0.3s ease'
                    }}
                  >
                    {item.title}
                  </a>
                </li>
              ))}
            </ul>

            {/* Login Button */}
            <motion.a
              href="#"
              whileHover={{ 
                scale: 1.05,
                boxShadow: `0 0 15px ${CYBERPUNK_COLORS.neonYellow}50`
              }}
              whileTap={{ scale: 0.95 }}
              style={{
                backgroundColor: 'transparent',
                color: CYBERPUNK_COLORS.neonYellow,
                border: `1px solid ${CYBERPUNK_COLORS.neonYellow}`,
                padding: '0.5rem 1.25rem',
                borderRadius: '4px',
                fontWeight: 'bold',
                fontSize: '0.9rem',
                textDecoration: 'none',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                transition: 'all 0.3s ease',
                marginLeft: '0.5rem'
              }}
            >
              LOGIN
            </motion.a>
          </div>

          {/* Mobile Menu Button */}
          <div 
            className="mobile-menu-button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            style={{
              display: 'none',
              flexDirection: 'column',
              justifyContent: 'space-between',
              width: '30px',
              height: '21px',
              cursor: 'pointer',
              zIndex: 1001
            }}
          >
            <span 
              style={{
                display: 'block',
                width: '100%',
                height: '3px',
                backgroundColor: mobileMenuOpen ? CYBERPUNK_COLORS.neonPink : CYBERPUNK_COLORS.neonCyan,
                borderRadius: '3px',
                transition: 'all 0.3s ease',
                transform: mobileMenuOpen ? 'rotate(45deg) translate(5px, 6px)' : 'none'
              }}
            />
            <span 
              style={{
                display: 'block',
                width: '100%',
                height: '3px',
                backgroundColor: mobileMenuOpen ? 'transparent' : CYBERPUNK_COLORS.neonCyan,
                borderRadius: '3px',
                transition: 'all 0.3s ease'
              }}
            />
            <span 
              style={{
                display: 'block',
                width: '100%',
                height: '3px',
                backgroundColor: mobileMenuOpen ? CYBERPUNK_COLORS.neonPink : CYBERPUNK_COLORS.neonCyan,
                borderRadius: '3px',
                transition: 'all 0.3s ease',
                transform: mobileMenuOpen ? 'rotate(-45deg) translate(6px, -7px)' : 'none'
              }}
            />
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ duration: 0.3 }}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'rgba(0, 0, 0, 0.95)',
              backdropFilter: 'blur(10px)',
              zIndex: 999,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '2rem'
            }}
          >
            <ul
              style={{
                listStyle: 'none',
                margin: 0,
                padding: 0,
                display: 'flex',
                flexDirection: 'column',
                gap: '1.25rem',
                width: '100%',
                maxWidth: '300px'
              }}
            >
              {navItems.map((item, index) => (
                <motion.li 
                  key={index}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                >
                  <a
                    href={item.href}
                    className="mobile-nav-link"
                    onClick={handleNavLinkClick}
                    style={{
                      color: 'white',
                      textDecoration: 'none',
                      fontWeight: '600',
                      fontSize: '1.5rem',
                      display: 'block',
                      padding: '0.5rem 0',
                      textAlign: 'center',
                      fontFamily: 'Rajdhani, sans-serif',
                      letterSpacing: '0.05em',
                      borderBottom: `1px solid rgba(0, 221, 221, 0.1)`
                    }}
                  >
                    {item.title}
                  </a>
                </motion.li>
              ))}
              
              {/* Login Button (Mobile) */}
              <motion.li
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: navItems.length * 0.05 }}
                style={{
                  marginTop: '1rem'
                }}
              >
                <a
                  href="#"
                  className="mobile-login-button"
                  style={{
                    backgroundColor: 'transparent',
                    color: CYBERPUNK_COLORS.neonYellow,
                    border: `2px solid ${CYBERPUNK_COLORS.neonYellow}`,
                    padding: '0.75rem 1.5rem',
                    borderRadius: '4px',
                    fontWeight: 'bold',
                    fontSize: '1.1rem',
                    textDecoration: 'none',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    display: 'block',
                    textAlign: 'center',
                    boxShadow: `0 0 15px ${CYBERPUNK_COLORS.neonYellow}30`
                  }}
                >
                  LOGIN
                </a>
              </motion.li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>

      {/* CSS for hover effects and responsive design */}
      <style jsx>{`
        .nav-link::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 0;
          height: 2px;
          background-color: ${CYBERPUNK_COLORS.neonCyan};
          transition: width 0.3s ease;
        }
        
        .nav-link:hover {
          color: ${CYBERPUNK_COLORS.neonCyan};
        }
        
        .nav-link:hover::after {
          width: 100%;
        }
        
        .mobile-nav-link:hover {
          color: ${CYBERPUNK_COLORS.neonCyan};
          text-shadow: 0 0 8px ${CYBERPUNK_COLORS.neonCyan}80;
        }
        
        .mobile-login-button:hover {
          background-color: ${CYBERPUNK_COLORS.neonYellow}10;
          box-shadow: 0 0 20px ${CYBERPUNK_COLORS.neonYellow}50;
        }
        
        /* Mobile Styles */
        @media (max-width: 768px) {
          .desktop-nav {
            display: none !important;
          }
          
          .mobile-menu-button {
            display: flex !important;
          }
        }
      `}</style>
    </>
  );
};

export default Navbar; 