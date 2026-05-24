import React, { useState, useEffect } from 'react';
import { Menu, X, CheckSquare, GraduationCap, ChevronDown, Lock } from 'lucide-react';

export default function Header({ onLoginClick, onRegisterClick, activeTab, setActiveTab }) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'courses', label: 'Explore Courses' },
    { id: 'verifier', label: 'Verify Certificate' },
    { id: 'faqs', label: 'FAQs' }
  ];

  const handleNavClick = (id) => {
    setActiveTab(id);
    setIsOpen(false);
    
    // Smooth scroll to target element
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <header className={`header-glass ${scrolled ? 'header-scrolled' : ''}`}>
      <div className="container">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: '80px' }}>
          
          {/* Logo */}
          <a href="#" onClick={() => handleNavClick('home')} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ 
              background: 'linear-gradient(135deg, var(--primary-neon) 0%, var(--secondary-neon) 100%)',
              padding: '10px',
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 15px rgba(139, 92, 246, 0.3)'
            }}>
              <GraduationCap size={24} color="#fff" />
            </div>
            <div>
              <span style={{ 
                fontFamily: 'var(--font-heading)', 
                fontSize: '1.6rem', 
                fontWeight: '800', 
                letterSpacing: '-0.04em',
                background: 'linear-gradient(135deg, #fff 30%, #a78bfa 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}>
                AXLO
              </span>
              <span style={{ 
                display: 'block', 
                fontSize: '0.65rem', 
                color: 'var(--secondary-neon)', 
                fontWeight: '700', 
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                marginTop: '-4px'
              }}>
                Organization
              </span>
            </div>
          </a>

          {/* Desktop Nav */}
          <nav style={{ display: 'none', display: 'flex', gap: '32px', alignItems: 'center' }} className="desktop-only-flex">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: activeTab === item.id ? 'var(--text-primary)' : 'var(--text-secondary)',
                  fontFamily: 'var(--font-heading)',
                  fontWeight: '600',
                  fontSize: '0.95rem',
                  cursor: 'pointer',
                  padding: '8px 0',
                  position: 'relative',
                  transition: 'var(--transition-smooth)'
                }}
              >
                {item.label}
                {activeTab === item.id && (
                  <span style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: '2px',
                    background: 'linear-gradient(90deg, var(--primary-neon), var(--secondary-neon))',
                    borderRadius: '999px'
                  }} />
                )}
              </button>
            ))}
          </nav>

          {/* User actions */}
          <div style={{ display: 'none', display: 'flex', alignItems: 'center', gap: '16px' }} className="desktop-only-flex">
            <button 
              onClick={onLoginClick} 
              style={{
                background: 'none',
                border: 'none',
                color: 'var(--text-primary)',
                fontFamily: 'var(--font-heading)',
                fontWeight: '600',
                fontSize: '0.95rem',
                cursor: 'pointer',
                padding: '10px 20px',
                transition: 'var(--transition-smooth)'
              }}
              hover-style={{ color: 'var(--primary-neon)' }}
            >
              Log in
            </button>
            <button onClick={onRegisterClick} className="btn-primary" style={{ padding: '10px 24px', fontSize: '0.9rem' }}>
              Get Started
            </button>
          </div>

          {/* Mobile menu toggle */}
          <button 
            onClick={() => setIsOpen(!isOpen)} 
            style={{ 
              background: 'none', 
              border: 'none', 
              color: 'var(--text-primary)', 
              cursor: 'pointer', 
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '8px'
            }}
            className="mobile-only-block"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

        </div>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div style={{ 
          background: 'rgba(8, 11, 17, 0.98)', 
          backdropFilter: 'blur(20px)',
          borderBottom: '1px solid var(--border-subtle)',
          padding: '24px',
          display: 'flex',
          flexDirection: 'column',
          gap: '20px'
        }} className="mobile-only-block">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              style={{
                background: 'none',
                border: 'none',
                color: activeTab === item.id ? 'var(--primary-neon)' : 'var(--text-primary)',
                fontFamily: 'var(--font-heading)',
                fontWeight: '600',
                fontSize: '1.1rem',
                cursor: 'pointer',
                textAlign: 'left',
                padding: '10px 0'
              }}
            >
              {item.label}
            </button>
          ))}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '10px', paddingTop: '20px', borderTop: '1px solid var(--border-subtle)' }}>
            <button 
              onClick={() => { setIsOpen(false); onLoginClick(); }} 
              style={{
                width: '100%',
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid var(--border-subtle)',
                color: 'var(--text-primary)',
                fontFamily: 'var(--font-heading)',
                fontWeight: '600',
                fontSize: '1rem',
                padding: '14px',
                borderRadius: '12px',
                cursor: 'pointer'
              }}
            >
              Log in
            </button>
            <button 
              onClick={() => { setIsOpen(false); onRegisterClick(); }} 
              className="btn-primary" 
              style={{ width: '100%', borderRadius: '12px', padding: '14px' }}
            >
              Get Started
            </button>
          </div>
        </div>
      )}

      {/* Embedded CSS for desktop/mobile query responsiveness since we don't have Tailwind */}
      <style dangerouslySetInnerHTML={{__html: `
        @media (min-width: 769px) {
          .mobile-only-block { display: none !important; }
        }
        @media (max-width: 768px) {
          .desktop-only-flex { display: none !important; }
        }
      `}} />
    </header>
  );
}
