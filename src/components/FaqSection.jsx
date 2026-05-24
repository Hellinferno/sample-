import React, { useState, useMemo } from 'react';
import { HelpCircle, ChevronDown, ChevronUp, Search } from 'lucide-react';
import coursesData from '../coursesData.json';

export default function FaqSection() {
  const [openIdx, setOpenIdx] = useState(null);
  const [faqSearch, setFaqSearch] = useState('');

  // Extract FAQs from data
  const faqs = coursesData.faqs || [];

  const handleToggle = (idx) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  // Filter FAQs based on keyword search
  const filteredFaqs = useMemo(() => {
    if (!faqSearch.trim()) return faqs;
    return faqs.filter(
      item =>
        item.question.toLowerCase().includes(faqSearch.toLowerCase()) ||
        item.answer.toLowerCase().includes(faqSearch.toLowerCase())
    );
  }, [faqs, faqSearch]);

  return (
    <section id="faqs" style={{ 
      padding: '80px 0', 
      borderTop: '1px solid var(--border-subtle)',
      position: 'relative'
    }}>
      <div className="container">
        
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '56px' }}>
          <div style={{ display: 'inline-flex', padding: '10px', background: 'rgba(139, 92, 246, 0.1)', border: '1px solid rgba(139, 92, 246, 0.2)', borderRadius: '12px', marginBottom: '16px', color: 'var(--primary-neon)' }}>
            <HelpCircle size={28} />
          </div>
          <h2 style={{ fontSize: '2.5rem', marginBottom: '16px' }}>
            Frequently Asked Questions
          </h2>
          <p style={{ color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto' }}>
            Got questions? We've compiled essential information on courses registration, study mode, quizzes, and certificates.
          </p>
        </div>

        {/* Search bar inside FAQs */}
        <div style={{ maxWidth: '600px', margin: '0 auto 40px auto', position: 'relative' }}>
          <span style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', display: 'flex', color: 'var(--text-muted)' }}>
            <Search size={18} />
          </span>
          <input
            type="text"
            placeholder="Search FAQs by keyword..."
            value={faqSearch}
            onChange={(e) => setFaqSearch(e.target.value)}
            style={{
              width: '100%',
              background: 'rgba(17, 24, 39, 0.4)',
              border: '1px solid var(--border-subtle)',
              borderRadius: '12px',
              padding: '14px 16px 14px 44px',
              color: 'var(--text-primary)',
              fontFamily: 'var(--font-body)',
              fontSize: '0.95rem',
              outline: 'none',
              transition: 'var(--transition-smooth)'
            }}
            className="faq-search-box"
          />
        </div>

        {/* FAQs List */}
        <div style={{ maxWidth: '800px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {filteredFaqs.length > 0 ? (
            filteredFaqs.map((faq, idx) => {
              const isOpen = openIdx === idx;
              return (
                <div 
                  key={idx}
                  className="glass-panel"
                  style={{ 
                    border: '1px solid ' + (isOpen ? 'rgba(139, 92, 246, 0.25)' : 'var(--border-subtle)'),
                    background: isOpen ? 'rgba(17, 24, 39, 0.6)' : 'rgba(17, 24, 39, 0.3)',
                    overflow: 'hidden'
                  }}
                >
                  
                  {/* Question header */}
                  <button
                    onClick={() => handleToggle(idx)}
                    style={{
                      width: '100%',
                      background: 'none',
                      border: 'none',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      padding: '20px 24px',
                      cursor: 'pointer',
                      textAlign: 'left',
                      color: isOpen ? '#fff' : 'var(--text-primary)',
                      fontFamily: 'var(--font-heading)',
                      fontWeight: '600',
                      fontSize: '1.05rem',
                      transition: 'var(--transition-smooth)'
                    }}
                  >
                    <span style={{ paddingRight: '16px' }}>{faq.question}</span>
                    <span style={{ color: isOpen ? 'var(--primary-neon)' : 'var(--text-muted)' }}>
                      {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                    </span>
                  </button>

                  {/* Answer slide */}
                  {isOpen && (
                    <div style={{
                      padding: '0 24px 20px 24px',
                      color: 'var(--text-secondary)',
                      fontSize: '0.95rem',
                      lineHeight: '1.6',
                      borderTop: '1px solid rgba(255, 255, 255, 0.03)',
                      paddingTop: '16px',
                      animation: 'slideDown 0.25s ease-out'
                    }}>
                      {faq.answer}
                    </div>
                  )}

                </div>
              );
            })
          ) : (
            <div style={{ textAlign: 'center', padding: '40px 24px', background: 'var(--bg-card)', border: '1px solid var(--border-subtle)', borderRadius: '12px' }}>
              <p style={{ color: 'var(--text-secondary)' }}>No matching questions found. Try search keywords like "free", "certificate", or "quiz".</p>
            </div>
          )}
        </div>

      </div>

      <style dangerouslySetInnerHTML={{__html: `
        .faq-search-box:focus {
          border-color: var(--primary-neon) !important;
          box-shadow: 0 0 15px rgba(139, 92, 246, 0.15) !important;
        }
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-8px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}} />
    </section>
  );
}
