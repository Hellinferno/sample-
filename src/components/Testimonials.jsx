import React from 'react';
import { Star, ShieldCheck, User } from 'lucide-react';

export default function Testimonials() {
  const reviews = [
    {
      name: 'Sarah Connor',
      role: 'Software Architect',
      course: 'Basics of Python Programming',
      certId: 'AXLO-PYTHON-777',
      quote: 'The video modules were outstandingly concise. Being able to fit lectures into my busy schedule and verify the certificate on the ledger immediately was a total game changer.',
      rating: 5,
      avatarInit: 'SC',
      avatarColor: 'rgba(99, 102, 241, 0.15)',
      textColor: 'var(--primary-neon)'
    },
    {
      name: 'Alex Mercer',
      role: 'Data Scientist',
      course: 'Essentials of MS Excel - Formulas and Functions',
      certId: 'AXLO-EXCEL-2026',
      quote: 'The material felt structured and practical, not just academic. I added the blockchain credential directly to my LinkedIn profile, and my employers validated it within seconds.',
      rating: 5,
      avatarInit: 'AM',
      avatarColor: 'rgba(6, 182, 212, 0.15)',
      textColor: 'var(--secondary-neon)'
    },
    {
      name: 'David Lightman',
      role: 'Procurement Officer',
      course: 'Executive Diploma in Procurement & Contract Management',
      certId: 'AXLO-MGMT-800',
      quote: 'Highly professional curricula. Axlo Organization made it possible to upskill in logistics models and claim a ledger-anchored certificate for fraction of the usual university cost.',
      rating: 5,
      avatarInit: 'DL',
      avatarColor: 'rgba(236, 72, 153, 0.15)',
      textColor: 'var(--accent-rose)'
    }
  ];

  return (
    <section id="testimonials" style={{ 
      padding: '100px 0', 
      background: 'var(--bg-deep)', 
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
            color: 'var(--accent-rose)',
            background: 'rgba(236, 72, 153, 0.08)',
            padding: '6px 14px',
            borderRadius: '99px'
          }}>
            Success Stories
          </span>
          <h2 style={{ fontSize: '2.5rem', marginTop: '20px', marginBottom: '16px' }}>
            What Our Verified Graduates Say
          </h2>
          <p style={{ color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto' }}>
            Discover reviews from professionals who have accelerated their career paths using AXLO blockchain credentials.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(3, 1fr)', 
          gap: '32px' 
        }} className="testimonials-grid">
          {reviews.map((rev, i) => (
            <div 
              key={i}
              className="glass-panel"
              style={{
                padding: '36px',
                background: 'var(--bg-white)',
                boxShadow: 'var(--shadow-md)',
                border: '1px solid var(--border-subtle)',
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
                transition: 'var(--transition-smooth)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-6px)';
                e.currentTarget.style.boxShadow = 'var(--shadow-xl)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'var(--shadow-md)';
              }}
            >
              {/* Stars */}
              <div style={{ display: 'flex', gap: '4px', marginBottom: '20px', color: '#f59e0b' }}>
                {[...Array(rev.rating)].map((_, idx) => (
                  <Star key={idx} size={16} fill="#f59e0b" />
                ))}
              </div>

              {/* Quote */}
              <p style={{ 
                fontStyle: 'italic',
                fontSize: '0.95rem',
                lineHeight: '1.6',
                color: 'var(--text-secondary)',
                marginBottom: '24px',
                flexGrow: 1
              }}>
                "{rev.quote}"
              </p>

              {/* Graduate info */}
              <div style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '16px',
                borderTop: '1px solid rgba(0,0,0,0.04)',
                paddingTop: '20px'
              }}>
                
                {/* Avatar */}
                <div style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '12px',
                  background: rev.avatarColor,
                  color: rev.textColor,
                  fontWeight: '800',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1rem',
                  fontFamily: 'var(--font-heading)'
                }}>
                  {rev.avatarInit}
                </div>

                <div style={{ flexGrow: 1 }}>
                  <h4 style={{ fontSize: '1rem', fontWeight: '800', color: 'var(--text-primary)' }}>
                    {rev.name}
                  </h4>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: '600' }}>
                    {rev.role}
                  </p>
                </div>

              </div>

              {/* Course tag */}
              <div style={{
                marginTop: '16px',
                padding: '8px 12px',
                borderRadius: '8px',
                background: 'var(--bg-deep)',
                border: '1px solid var(--border-subtle)',
                fontSize: '0.75rem',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}>
                <span style={{ color: 'var(--text-secondary)', fontWeight: '600', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '160px' }}>
                  {rev.course}
                </span>
                <span 
                  onClick={() => {
                    const el = document.getElementById('verifier');
                    if (el) {
                      el.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                  style={{ 
                    color: 'var(--primary-neon)', 
                    fontWeight: '700', 
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px'
                  }}
                >
                  <ShieldCheck size={12} /> {rev.certId}
                </span>
              </div>

            </div>
          ))}
        </div>

      </div>

      <style dangerouslySetInnerHTML={{__html: `
        @media (max-width: 991px) {
          .testimonials-grid { grid-template-columns: 1fr !important; gap: 24px !important; }
        }
      `}} />
    </section>
  );
}
