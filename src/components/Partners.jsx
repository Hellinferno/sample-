import React from 'react';
import { Award, ShieldAlert, Globe, GraduationCap, Cpu } from 'lucide-react';

export default function Partners() {
  const partners = [
    { name: 'Cambridge Edu Group', desc: 'Curriculum Alignment', icon: <GraduationCap size={20} /> },
    { name: 'London Business Node', desc: 'Executive Assessment', icon: <Award size={20} /> },
    { name: 'Smart Ledger Inc.', desc: 'Blockchain Verification', icon: <Globe size={20} /> },
    { name: 'Axlo Tech Labs', desc: 'AI Quiz Assessment', icon: <Cpu size={20} /> }
  ];

  return (
    <section style={{ 
      padding: '48px 0', 
      background: 'var(--bg-white)', 
      borderTop: '1px solid var(--border-subtle)',
      borderBottom: '1px solid var(--border-subtle)',
      position: 'relative',
      overflow: 'hidden'
    }}>
      <div className="container">
        
        {/* Caption */}
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <p style={{ 
            fontSize: '0.8rem', 
            fontWeight: '800', 
            letterSpacing: '0.15em', 
            textTransform: 'uppercase', 
            color: 'var(--text-muted)' 
          }}>
            Strategic Academic & Certification Partners
          </p>
        </div>

        {/* Logo Grid */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(4, 1fr)', 
          gap: '24px',
          alignItems: 'center'
        }} className="partners-grid">
          {partners.map((partner, i) => (
            <div 
              key={i}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '16px 24px',
                borderRadius: '12px',
                background: 'var(--bg-deep)',
                border: '1px solid var(--border-subtle)',
                transition: 'var(--transition-smooth)',
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.borderColor = 'rgba(99, 102, 241, 0.2)';
                e.currentTarget.style.boxShadow = 'var(--shadow-md)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.borderColor = 'var(--border-subtle)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <div style={{ 
                color: 'var(--primary-neon)', 
                background: 'rgba(99, 102, 241, 0.08)',
                borderRadius: '8px',
                padding: '8px',
                display: 'flex'
              }}>
                {partner.icon}
              </div>
              <div>
                <h4 style={{ fontSize: '0.9rem', fontWeight: '700', color: 'var(--text-primary)' }}>
                  {partner.name}
                </h4>
                <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                  {partner.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>

      <style dangerouslySetInnerHTML={{__html: `
        @media (max-width: 991px) {
          .partners-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 576px) {
          .partners-grid { grid-template-columns: 1fr !important; }
        }
      `}} />
    </section>
  );
}
