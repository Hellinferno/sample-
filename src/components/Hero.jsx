import React from 'react';
import { Award, BookOpen, Users, ShieldCheck, ArrowRight } from 'lucide-react';

export default function Hero({ onExploreClick, onVerifyClick }) {
  const stats = [
    { icon: <BookOpen size={20} color="var(--primary-neon)" />, value: '180+', label: 'Short Courses' },
    { icon: <Users size={20} color="var(--secondary-neon)" />, value: '450K+', label: 'Active Learners' },
    { icon: <Award size={20} color="var(--accent-rose)" />, value: '100% Free', label: 'Video Lectures' },
    { icon: <ShieldCheck size={20} color="#10B981" />, value: 'Secure', label: 'Blockchain ID' }
  ];

  return (
    <section style={{ 
      padding: '160px 0 80px 0',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Decorative Blur Spheres */}
      <div style={{
        position: 'absolute',
        top: '10%',
        left: '-10%',
        width: '400px',
        height: '400px',
        background: 'radial-gradient(circle, rgba(139, 92, 246, 0.15) 0%, transparent 70%)',
        zIndex: -1
      }} />
      <div style={{
        position: 'absolute',
        bottom: '10%',
        right: '-10%',
        width: '500px',
        height: '500px',
        background: 'radial-gradient(circle, rgba(6, 182, 212, 0.1) 0%, transparent 70%)',
        zIndex: -1
      }} />

      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '48px', alignItems: 'center' }} className="hero-grid">
          
          {/* Main Hero Header */}
          <div style={{ textAlign: 'center', maxWidth: '850px', margin: '0 auto' }}>
            <div style={{ 
              display: 'inline-flex', 
              alignItems: 'center', 
              gap: '8px', 
              background: 'rgba(139, 92, 246, 0.1)', 
              border: '1px solid rgba(139, 92, 246, 0.2)',
              borderRadius: '99px',
              padding: '6px 16px',
              marginBottom: '24px',
              fontSize: '0.85rem',
              fontWeight: '700',
              color: 'var(--primary-neon-hover)',
              textTransform: 'uppercase',
              letterSpacing: '0.05em'
            }}>
              <Award size={14} /> Reimagining Professional Upskilling
            </div>

            <h1 style={{ 
              fontSize: '4rem', 
              lineHeight: '1.1', 
              marginBottom: '24px',
              fontWeight: '800',
              background: 'linear-gradient(135deg, #FFFFFF 40%, #A78BFA 80%, #06B6D4 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }} className="hero-title">
              Sought-After Short Courses. <br/>
              <span style={{ color: 'var(--primary-neon-hover)' }}>100% Free Learning.</span>
            </h1>

            <p style={{ 
              fontSize: '1.2rem', 
              lineHeight: '1.6', 
              color: 'var(--text-secondary)',
              marginBottom: '40px',
              fontWeight: '400'
            }} className="hero-subtitle">
              Expand your CV and acquire practical career skills at your own pace. Axlo Organization delivers high-quality education and bite-sized learning materials. Download digital blockchain-verified certificates to showcase your achievements.
            </p>

            {/* CTAs */}
            <div style={{ 
              display: 'flex', 
              justifyContent: 'center', 
              gap: '16px', 
              flexWrap: 'wrap',
              marginBottom: '64px'
            }}>
              <button onClick={onExploreClick} className="btn-primary" style={{ padding: '16px 36px', fontSize: '1rem' }}>
                Explore Courses <ArrowRight size={18} />
              </button>
              <button onClick={onVerifyClick} className="btn-secondary" style={{ padding: '16px 36px', fontSize: '1rem' }}>
                Verify Certificate
              </button>
            </div>

            {/* Stats block */}
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(4, 1fr)', 
              gap: '20px' 
            }} className="stats-grid">
              {stats.map((stat, i) => (
                <div 
                  key={i} 
                  className="glass-panel" 
                  style={{ 
                    padding: '24px 16px', 
                    textAlign: 'center',
                    border: '1px solid rgba(255, 255, 255, 0.04)',
                    background: 'rgba(255, 255, 255, 0.015)'
                  }}
                >
                  <div style={{ 
                    display: 'flex', 
                    justifyContent: 'center', 
                    marginBottom: '12px' 
                  }}>
                    {stat.icon}
                  </div>
                  <div style={{ 
                    fontSize: '1.8rem', 
                    fontWeight: '800', 
                    fontFamily: 'var(--font-heading)',
                    background: 'linear-gradient(135deg, #fff 60%, var(--text-secondary) 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    marginBottom: '4px'
                  }}>
                    {stat.value}
                  </div>
                  <div style={{ 
                    fontSize: '0.8rem', 
                    color: 'var(--text-secondary)', 
                    fontWeight: '600',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em'
                  }}>
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>

          </div>

        </div>
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        @media (max-width: 991px) {
          .hero-title { font-size: 3.2rem !important; }
        }
        @media (max-width: 768px) {
          .hero-title { font-size: 2.5rem !important; }
          .hero-subtitle { font-size: 1.05rem !important; }
          .stats-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
      `}} />
    </section>
  );
}
