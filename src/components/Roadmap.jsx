import React from 'react';
import { Compass, BookOpen, CheckSquare, ShieldCheck, ArrowRight } from 'lucide-react';

export default function Roadmap() {
  const steps = [
    {
      icon: <Compass size={24} />,
      num: '01',
      title: 'Choose Specialization',
      desc: 'Select from 180+ business, tech, and engineering courses corresponding to modern industry demands.'
    },
    {
      icon: <BookOpen size={24} />,
      num: '02',
      title: 'Self-Paced Study',
      desc: 'Watch pre-recorded video modules and read documentation at your own convenience with lifetime portal access.'
    },
    {
      icon: <CheckSquare size={24} />,
      num: '03',
      title: 'Chapter Quizzes',
      desc: 'Assess your skills with formal quizzes configured after every chapter. Secure 50% or above to pass.'
    },
    {
      icon: <ShieldCheck size={24} />,
      num: '04',
      title: 'Blockchain Registry',
      desc: 'Claim your certification. Get a cryptographic hash registered in the public ledger for instant verification.'
    }
  ];

  return (
    <section style={{ 
      padding: '100px 0', 
      background: 'var(--bg-white)', 
      borderTop: '1px solid var(--border-subtle)',
      position: 'relative'
    }}>
      <div className="container">
        
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '64px' }}>
          <span style={{
            fontSize: '0.8rem',
            fontWeight: '800',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            color: 'var(--primary-neon)',
            background: 'rgba(99, 102, 241, 0.08)',
            padding: '6px 14px',
            borderRadius: '99px'
          }}>
            How It Works
          </span>
          <h2 style={{ fontSize: '2.5rem', marginTop: '20px', marginBottom: '16px' }}>
            Your Path to Blockchain Accreditation
          </h2>
          <p style={{ color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto' }}>
            We've streamlined the learning and validation processes into four simple, self-directed milestones.
          </p>
        </div>

        {/* Timeline Grid */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(4, 1fr)', 
          gap: '32px',
          position: 'relative'
        }} className="roadmap-grid">
          
          {/* Connector Line (Desktop Only) */}
          <div style={{
            position: 'absolute',
            top: '40px',
            left: '10%',
            right: '10%',
            height: '2px',
            background: 'linear-gradient(90deg, var(--primary-neon) 0%, var(--secondary-neon) 100%)',
            opacity: 0.15,
            zIndex: 1
          }} className="desktop-connector" />

          {steps.map((step, idx) => (
            <div 
              key={idx}
              className="glass-panel"
              style={{
                padding: '32px',
                textAlign: 'center',
                zIndex: 2,
                background: 'var(--bg-white)',
                boxShadow: 'var(--shadow-lg)',
                border: '1px solid var(--border-subtle)',
                position: 'relative',
                transition: 'var(--transition-smooth)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-8px)';
                e.currentTarget.style.boxShadow = 'var(--shadow-xl), var(--shadow-glow)';
                e.currentTarget.style.borderColor = 'rgba(99, 102, 241, 0.2)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'var(--shadow-lg)';
                e.currentTarget.style.borderColor = 'var(--border-subtle)';
              }}
            >
              
              {/* Step indicator */}
              <div style={{
                position: 'absolute',
                top: '-16px',
                right: '24px',
                fontSize: '2rem',
                fontWeight: '900',
                fontFamily: 'var(--font-heading)',
                background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.08) 0%, rgba(99, 102, 241, 0.02) 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                pointerEvents: 'none'
              }}>
                {step.num}
              </div>

              {/* Icon Capsule */}
              <div style={{
                width: '60px',
                height: '60px',
                borderRadius: '16px',
                background: idx % 2 === 0 ? 'rgba(99, 102, 241, 0.06)' : 'rgba(6, 182, 212, 0.06)',
                color: idx % 2 === 0 ? 'var(--primary-neon)' : 'var(--secondary-neon)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 24px auto',
                boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.02)',
                border: '1px solid rgba(255, 255, 255, 0.8)'
              }}>
                {step.icon}
              </div>

              <h3 style={{ 
                fontSize: '1.15rem', 
                fontWeight: '800', 
                marginBottom: '12px',
                color: 'var(--text-primary)' 
              }}>
                {step.title}
              </h3>
              <p style={{ 
                fontSize: '0.85rem', 
                lineHeight: '1.6', 
                color: 'var(--text-secondary)' 
              }}>
                {step.desc}
              </p>

            </div>
          ))}

        </div>

      </div>

      <style dangerouslySetInnerHTML={{__html: `
        @media (max-width: 991px) {
          .roadmap-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .desktop-connector { display: none !important; }
        }
        @media (max-width: 576px) {
          .roadmap-grid { grid-template-columns: 1fr !important; }
        }
      `}} />
    </section>
  );
}
