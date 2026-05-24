import React from 'react';
import { Award, BookOpen, Users, ShieldCheck, ArrowRight } from 'lucide-react';

export default function Hero({ onExploreClick, onVerifyClick }) {
  const stats = [
    { icon: <BookOpen size={20} color="var(--primary-neon)" />, value: '180+', label: 'Short Courses' },
    { icon: <Users size={20} color="var(--secondary-neon)" />, value: '450K+', label: 'Active Learners' },
    { icon: <Award size={20} color="var(--accent-rose)" />, value: '100% Free', label: 'Video Lectures' },
    { icon: <ShieldCheck size={20} color="var(--accent-amber)" />, value: 'Cryptographic', label: 'Ledger Secured' }
  ];

  return (
    <section style={{ 
      padding: '120px 0 80px 0',
      position: 'relative',
      overflow: 'hidden',
      background: 'var(--bg-deep)'
    }}>
      
      {/* Decorative Blob Spheres (Light Mode) */}
      <div style={{
        position: 'absolute',
        top: '-10%',
        left: '-10%',
        width: '500px',
        height: '500px',
        background: 'radial-gradient(circle, rgba(99, 102, 241, 0.04) 0%, transparent 70%)',
        zIndex: 0,
        pointerEvents: 'none'
      }} />
      <div style={{
        position: 'absolute',
        bottom: '-10%',
        right: '-10%',
        width: '600px',
        height: '600px',
        background: 'radial-gradient(circle, rgba(6, 182, 212, 0.05) 0%, transparent 70%)',
        zIndex: 0,
        pointerEvents: 'none'
      }} />

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: '1.2fr 0.8fr', 
          gap: '48px', 
          alignItems: 'center' 
        }} className="hero-grid">
          
          {/* Left Block: Heading and description */}
          <div style={{ textAlign: 'left' }} className="hero-left">
            <div style={{ 
              display: 'inline-flex', 
              alignItems: 'center', 
              gap: '8px', 
              background: 'rgba(99, 102, 241, 0.06)', 
              border: '1px solid rgba(99, 102, 241, 0.1)',
              borderRadius: '99px',
              padding: '8px 16px',
              marginBottom: '28px',
              fontSize: '0.8rem',
              fontWeight: '800',
              color: 'var(--primary-neon-hover)',
              textTransform: 'uppercase',
              letterSpacing: '0.05em'
            }}>
              <Award size={14} /> Rebranding Professional Upskilling
            </div>

            <h1 style={{ 
              fontSize: '3.8rem', 
              lineHeight: '1.1', 
              marginBottom: '24px',
              fontWeight: '800',
              color: 'var(--text-primary)',
              letterSpacing: '-0.03em'
            }} className="hero-title">
              Sought-After Skills. <br/>
              <span style={{ 
                background: 'linear-gradient(135deg, var(--primary-neon) 0%, var(--accent-rose) 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}>100% Free Learning.</span>
            </h1>

            <p style={{ 
              fontSize: '1.15rem', 
              lineHeight: '1.6', 
              color: 'var(--text-secondary)',
              marginBottom: '40px',
              fontWeight: '400',
              maxWidth: '620px'
            }} className="hero-subtitle">
              Expand your CV and acquire practical career skills at your own pace. Axlo Organization delivers high-quality education and bite-sized learning materials. Download digital blockchain-verified certificates to showcase your achievements.
            </p>

            {/* CTAs */}
            <div style={{ 
              display: 'flex', 
              gap: '16px', 
              flexWrap: 'wrap',
              marginBottom: '56px'
            }} className="hero-ctas">
              <button onClick={onExploreClick} className="btn-primary">
                Explore Courses <ArrowRight size={18} />
              </button>
              <button onClick={onVerifyClick} className="btn-secondary">
                Verify Certificate
              </button>
            </div>

            {/* Stats block */}
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(4, 1fr)', 
              gap: '16px' 
            }} className="stats-grid">
              {stats.map((stat, i) => (
                <div 
                  key={i} 
                  className="glass-panel" 
                  style={{ 
                    padding: '20px 16px', 
                    textAlign: 'center',
                    border: '1px solid var(--border-subtle)',
                    background: 'var(--bg-white)',
                    boxShadow: 'var(--shadow-sm)'
                  }}
                >
                  <div style={{ 
                    display: 'flex', 
                    justifyContent: 'center', 
                    marginBottom: '10px' 
                  }}>
                    {stat.icon}
                  </div>
                  <div style={{ 
                    fontSize: '1.5rem', 
                    fontWeight: '800', 
                    fontFamily: 'var(--font-heading)',
                    color: 'var(--text-primary)',
                    marginBottom: '4px'
                  }}>
                    {stat.value}
                  </div>
                  <div style={{ 
                    fontSize: '0.75rem', 
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

          {/* Right Block: Simulated Interactive 3D Card Stack (Worth $100K!) */}
          <div style={{ 
            position: 'relative', 
            height: '420px', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center' 
          }} className="hero-right">
            
            {/* Drifting background circles for depth */}
            <div className="animate-float" style={{
              position: 'absolute',
              width: '160px',
              height: '160px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, rgba(6,182,212,0.15) 0%, rgba(99,102,241,0.05) 100%)',
              top: '10px',
              left: '10px',
              zIndex: 0
            }} />
            <div className="animate-float-slow" style={{
              position: 'absolute',
              width: '100px',
              height: '100px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, rgba(236,72,153,0.15) 0%, rgba(99,102,241,0.05) 100%)',
              bottom: '20px',
              right: '10px',
              zIndex: 0
            }} />

            {/* Front Floating Certificate Plaque (3D isometric tilt mockup) */}
            <div 
              className="tilt-card-3d animate-float"
              style={{
                width: '320px',
                height: '220px',
                background: 'var(--bg-white)',
                border: '4px double rgba(197, 160, 89, 0.3)',
                boxShadow: 'var(--shadow-xl), 0 30px 60px rgba(15,23,42,0.1)',
                borderRadius: '8px',
                padding: '24px',
                position: 'absolute',
                zIndex: 2,
                transform: 'perspective(1000px) rotateX(12deg) rotateY(-16deg) rotateZ(-4deg) translateY(-20px)',
                fontFamily: 'serif'
              }}
            >
              {/* Corner Ornaments */}
              <div style={{ position: 'absolute', top: '6px', left: '6px', width: '10px', height: '10px', borderTop: '1px solid #c5a059', borderLeft: '1px solid #c5a059' }} />
              <div style={{ position: 'absolute', top: '6px', right: '6px', width: '10px', height: '10px', borderTop: '1px solid #c5a059', borderRight: '1px solid #c5a059' }} />
              <div style={{ position: 'absolute', bottom: '6px', left: '6px', width: '10px', height: '10px', borderBottom: '1px solid #c5a059', borderLeft: '1px solid #c5a059' }} />
              <div style={{ position: 'absolute', bottom: '6px', right: '6px', width: '10px', height: '10px', borderBottom: '1px solid #c5a059', borderRight: '1px solid #c5a059' }} />
              
              <div style={{ textAlign: 'center', marginBottom: '8px' }}>
                <Award size={20} color="#c5a059" style={{ margin: '0 auto' }} />
                <div style={{ fontSize: '0.45rem', letterSpacing: '0.2em', color: '#c5a059', fontWeight: 'bold', fontFamily: 'var(--font-heading)', marginTop: '2px' }}>
                  AXLO ACADEMY
                </div>
              </div>

              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '0.5rem', color: 'var(--text-muted)', fontStyle: 'italic', marginBottom: '2px' }}>This certifies that</div>
                <div style={{ fontSize: '0.9rem', fontWeight: 'bold', color: '#c5a059', fontFamily: 'var(--font-heading)', marginBottom: '4px' }}>Sarah Connor</div>
                <div style={{ fontSize: '0.45rem', color: 'var(--text-secondary)', lineHeight: '1.3', padding: '0 10px' }}>
                  completed <strong>Basics of Python Programming</strong> with Distinction
                </div>
              </div>

              <div style={{ borderTop: '1px solid rgba(0,0,0,0.05)', marginTop: '20px', paddingTop: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.4rem', fontFamily: 'var(--font-body)' }}>
                <div>
                  <div style={{ fontWeight: 'bold', color: 'var(--text-primary)' }}>M. Sterling</div>
                  <div style={{ color: 'var(--text-muted)' }}>REGISTRAR</div>
                </div>
                <div style={{ border: '1px solid var(--secondary-neon)', padding: '2px 4px', borderRadius: '4px', color: 'var(--secondary-neon)', fontWeight: 'bold' }}>
                  VERIFIED ID: AXLO-PYTHON-777
                </div>
              </div>

            </div>

            {/* Backing decorative cards for the 3D Stack */}
            <div 
              style={{
                width: '320px',
                height: '220px',
                background: 'rgba(255, 255, 255, 0.65)',
                border: '1px solid var(--border-subtle)',
                boxShadow: 'var(--shadow-lg)',
                borderRadius: '8px',
                position: 'absolute',
                zIndex: 1,
                transform: 'perspective(1000px) rotateX(12deg) rotateY(-16deg) rotateZ(-4deg) translateZ(-40px) translateY(10px) translateX(20px)',
                pointerEvents: 'none'
              }}
            />

            {/* Floating verification badge */}
            <div 
              className="glass-panel animate-float-slow"
              style={{
                position: 'absolute',
                top: '40px',
                right: '10px',
                zIndex: 3,
                padding: '12px 18px',
                background: 'var(--bg-white)',
                boxShadow: 'var(--shadow-xl)',
                border: '1px solid var(--border-subtle)',
                borderRadius: '16px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                transform: 'perspective(1000px) rotateX(6deg) rotateY(-12deg) translateY(-20px)'
              }}
            >
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#10B981' }} />
              <span style={{ fontSize: '0.75rem', fontWeight: 'bold', color: 'var(--text-primary)' }}>
                Anchored to Public Ledger
              </span>
            </div>

          </div>

        </div>
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        @media (max-width: 991px) {
          .hero-grid { grid-template-columns: 1fr !important; }
          .hero-left { textAlign: center !important; }
          .hero-subtitle { margin: 0 auto 32px auto !important; }
          .hero-ctas { justify-content: center !important; }
          .hero-right { height: 320px !important; margin-top: 20px; }
        }
        @media (max-width: 768px) {
          .hero-title { font-size: 2.8rem !important; }
          .stats-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
      `}} />
    </section>
  );
}
