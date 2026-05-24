import React, { useState } from 'react';
import { ShieldCheck, Search, Award, CheckCircle, AlertCircle, Copy, ArrowRight, Download } from 'lucide-react';

export default function CertificateVerifier() {
  const [certId, setCertId] = useState('');
  const [searched, setSearched] = useState(false);
  const [result, setResult] = useState(null);
  const [copied, setCopied] = useState(false);

  const certDatabase = {
    'AXLO-EXCEL-2026': {
      studentName: 'Alex Mercer',
      courseName: 'Essentials of MS Excel - Formulas and Functions',
      issueDate: 'May 12, 2026',
      grade: 'Distinction (94%)',
      blockchainTx: '0x8f2d9b...e71c',
      id: 'AXLO-EXCEL-2026'
    },
    'AXLO-PYTHON-777': {
      studentName: 'Sarah Connor',
      courseName: 'Basics of Python Programming',
      issueDate: 'April 28, 2026',
      grade: 'First Class (88%)',
      blockchainTx: '0x3a4c1f...f902',
      id: 'AXLO-PYTHON-777'
    },
    'AXLO-MGMT-800': {
      studentName: 'David Lightman',
      courseName: 'Executive Diploma in Procurement & Contract Management',
      issueDate: 'March 15, 2026',
      grade: 'Pass (76%)',
      blockchainTx: '0x7e2b1c...d841',
      id: 'AXLO-MGMT-800'
    }
  };

  const handleVerify = (e) => {
    e.preventDefault();
    if (!certId.trim()) return;
    
    setSearched(true);
    const code = certId.trim().toUpperCase();
    if (certDatabase[code]) {
      setResult(certDatabase[code]);
    } else {
      setResult(null);
    }
  };

  const handleCopyHash = (hash) => {
    navigator.clipboard.writeText(hash);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="verifier" style={{ 
      padding: '100px 0', 
      borderTop: '1px solid var(--border-subtle)',
      background: 'var(--bg-white)',
      position: 'relative'
    }}>
      <div className="container">
        
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '64px' }}>
          <div style={{ display: 'inline-flex', padding: '12px', background: 'rgba(99, 102, 241, 0.06)', border: '1px solid rgba(99, 102, 241, 0.1)', borderRadius: '14px', marginBottom: '20px', color: 'var(--primary-neon)' }}>
            <ShieldCheck size={28} />
          </div>
          <h2 style={{ fontSize: '2.5rem', marginBottom: '16px' }}>
            Secured Blockchain Verification
          </h2>
          <p style={{ color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto' }}>
            Every certificate issued is cryptographically anchored to a public ledger. Validate credentials legitimacy instantly.
          </p>
        </div>

        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: result ? '1.15fr 1fr' : '1fr', 
          gap: '48px',
          alignItems: 'start'
        }} className="verifier-grid">
          
          {/* Left panel: Verification form */}
          <div className="glass-panel" style={{ 
            padding: '40px', 
            border: '1px solid var(--border-subtle)', 
            background: 'var(--bg-deep)',
            boxShadow: 'var(--shadow-md)'
          }}>
            <h3 style={{ fontSize: '1.4rem', fontWeight: '800', marginBottom: '12px' }}>Verify Credentials</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', marginBottom: '24px' }}>
              Enter the unique certificate identification hash displayed on the diploma document to load ledger registration details.
            </p>

            <form onSubmit={handleVerify} style={{ display: 'flex', gap: '12px', marginBottom: '28px' }}>
              <div style={{ position: 'relative', flexGrow: 1 }}>
                <span style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', display: 'flex', color: 'var(--text-muted)' }}>
                  <Search size={18} />
                </span>
                <input
                  type="text"
                  placeholder="e.g. AXLO-EXCEL-2026"
                  value={certId}
                  onChange={(e) => setCertId(e.target.value)}
                  style={{
                    width: '100%',
                    background: 'var(--bg-white)',
                    border: '1px solid var(--border-subtle)',
                    borderRadius: '12px',
                    padding: '14px 16px 14px 44px',
                    color: 'var(--text-primary)',
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.95rem',
                    outline: 'none',
                    transition: 'var(--transition-smooth)'
                  }}
                  className="verifier-input"
                />
              </div>
              <button type="submit" className="btn-primary" style={{ borderRadius: '12px', padding: '0 28px' }}>
                Verify
              </button>
            </form>

            {/* Quick try codes */}
            <div style={{ marginBottom: '16px' }}>
              <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', fontWeight: '600', display: 'block', marginBottom: '10px' }}>
                Test credentials database using these verified IDs:
              </span>
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                {Object.keys(certDatabase).map((code) => (
                  <button
                    key={code}
                    onClick={() => { setCertId(code); setSearched(false); setResult(null); }}
                    style={{
                      background: 'var(--bg-white)',
                      border: '1px solid var(--border-subtle)',
                      color: 'var(--primary-neon)',
                      fontSize: '0.8rem',
                      fontWeight: '700',
                      padding: '8px 14px',
                      borderRadius: '8px',
                      cursor: 'pointer',
                      boxShadow: 'var(--shadow-sm)',
                      transition: 'var(--transition-smooth)'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = 'rgba(99, 102, 241, 0.05)';
                      e.currentTarget.style.borderColor = 'rgba(99, 102, 241, 0.2)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'var(--bg-white)';
                      e.currentTarget.style.borderColor = 'var(--border-subtle)';
                    }}
                  >
                    {code}
                  </button>
                ))}
              </div>
            </div>

            {/* Feedback message */}
            {searched && (
              <div style={{ 
                marginTop: '28px', 
                padding: '16px 20px', 
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                background: result ? 'rgba(16, 185, 129, 0.08)' : 'rgba(244, 63, 94, 0.08)',
                border: '1px solid ' + (result ? '#a7f3d0' : '#fecdd3'),
                color: result ? '#047857' : '#be123c',
                fontSize: '0.95rem'
              }}>
                {result ? (
                  <>
                    <CheckCircle size={20} />
                    <span><strong>Verified!</strong> Cryptographic certificate found in AXLO smart contract registry.</span>
                  </>
                ) : (
                  <>
                    <AlertCircle size={20} />
                    <span><strong>Record Not Found.</strong> Verify spelling or check ID hash. Reference database index failed.</span>
                  </>
                )}
              </div>
            )}
          </div>

          {/* Right panel: Premium Ivory & Gold Certificate Mockup */}
          {result && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              
              <div style={{
                background: '#FAF9F6', /* Classic Ivory */
                backgroundImage: 'radial-gradient(#f3e8d2 1px, transparent 1px)',
                backgroundSize: '24px 24px',
                border: '10px double #c5a059',
                borderRadius: '10px',
                padding: '40px',
                position: 'relative',
                boxShadow: '0 20px 40px rgba(15,23,42,0.08)',
                color: '#1e293b',
                fontFamily: 'Georgia, serif'
              }} className="certificate-mock">
                
                {/* Gold corner ornaments */}
                <div style={{ position: 'absolute', top: '10px', left: '10px', borderTop: '2px solid #c5a059', borderLeft: '2px solid #c5a059', width: '24px', height: '24px' }} />
                <div style={{ position: 'absolute', top: '10px', right: '10px', borderTop: '2px solid #c5a059', borderRight: '2px solid #c5a059', width: '24px', height: '24px' }} />
                <div style={{ position: 'absolute', bottom: '10px', left: '10px', borderBottom: '2px solid #c5a059', borderLeft: '2px solid #c5a059', width: '24px', height: '24px' }} />
                <div style={{ position: 'absolute', bottom: '10px', right: '10px', borderBottom: '2px solid #c5a059', borderRight: '2px solid #c5a059', width: '24px', height: '24px' }} />

                {/* Crest */}
                <div style={{ textAlign: 'center', marginBottom: '20px' }}>
                  <Award size={40} color="#b28d46" style={{ margin: '0 auto' }} />
                  <div style={{ fontSize: '0.8rem', fontFamily: 'var(--font-heading)', color: '#b28d46', letterSpacing: '0.25em', fontWeight: 'bold', marginTop: '8px' }}>
                    AXLO ACADEMY
                  </div>
                </div>

                <div style={{ textAlign: 'center' }}>
                  <h4 style={{ fontSize: '1.25rem', fontStyle: 'italic', fontWeight: 'normal', color: '#64748b', marginBottom: '10px' }}>
                    This is to certify that
                  </h4>
                  <h3 style={{ color: '#b28d46', fontSize: '2.1rem', fontWeight: 'bold', marginBottom: '12px', fontFamily: 'Georgia, serif' }}>
                    {result.studentName}
                  </h3>
                  <p style={{ fontSize: '0.9rem', color: '#64748b', fontStyle: 'italic', marginBottom: '14px' }}>
                    has successfully completed the curriculum and assessment for the specialization course
                  </p>
                  <h4 style={{ color: '#0f172a', fontSize: '1.2rem', fontWeight: 'bold', marginBottom: '20px', lineHeight: '1.4' }}>
                    {result.courseName}
                  </h4>
                  <p style={{ fontSize: '0.85rem', color: '#64748b', marginBottom: '32px' }}>
                    Graded at: <strong style={{ color: '#0f172a' }}>{result.grade}</strong> on {result.issueDate}
                  </p>
                </div>

                {/* Bottom signatures */}
                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'flex-end',
                  borderTop: '1px solid rgba(178, 141, 70, 0.2)',
                  paddingTop: '20px',
                  fontFamily: 'var(--font-body)'
                }}>
                  
                  <div>
                    <div style={{ fontSize: '0.85rem', color: '#b28d46', fontStyle: 'italic', fontFamily: 'cursive', marginBottom: '2px' }}>
                      M. G. Sterling
                    </div>
                    <div style={{ borderTop: '1px solid #e2e8f0', paddingTop: '4px', fontSize: '0.65rem', color: '#64748b', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                      Academic Registrar
                    </div>
                  </div>

                  {/* Stamp */}
                  <div style={{
                    width: '52px',
                    height: '52px',
                    borderRadius: '50%',
                    border: '2px dashed #b28d46',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#b28d46',
                    fontSize: '0.55rem',
                    fontWeight: 'bold',
                    textAlign: 'center',
                    transform: 'rotate(-10deg)',
                    background: 'rgba(178, 141, 70, 0.05)'
                  }}>
                    AXLO SECURE
                  </div>

                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '0.6rem', color: '#94a3b8', fontWeight: 'bold' }}>
                      LEDGER TX HASH:
                    </div>
                    <div style={{ fontSize: '0.7rem', color: '#b28d46', fontFamily: 'monospace', fontWeight: 'bold' }}>
                      {result.blockchainTx}
                    </div>
                  </div>

                </div>

              </div>

              {/* Meta details */}
              <div className="glass-panel" style={{ padding: '24px', background: 'var(--bg-white)', border: '1px solid var(--border-subtle)', boxShadow: 'var(--shadow-md)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
                  <div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: '600' }}>BLOCKCHAIN CREDENTIAL ID</div>
                    <div style={{ fontSize: '1rem', fontWeight: '800', color: 'var(--primary-neon)' }}>{result.id}</div>
                  </div>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button 
                      onClick={() => handleCopyHash(result.blockchainTx)}
                      style={{
                        background: 'rgba(15, 23, 42, 0.02)',
                        border: '1px solid var(--border-subtle)',
                        color: 'var(--text-primary)',
                        padding: '10px 16px',
                        borderRadius: '8px',
                        fontSize: '0.8rem',
                        fontWeight: '700',
                        cursor: 'pointer',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px'
                      }}
                    >
                      <Copy size={14} />
                      {copied ? 'Copied!' : 'Copy Hash'}
                    </button>
                    <button 
                      onClick={() => alert('Certificate printing successfully simulated.')}
                      className="btn-primary"
                      style={{ padding: '10px 16px', borderRadius: '8px', fontSize: '0.8rem' }}
                    >
                      <Download size={14} />
                      Download PDF
                    </button>
                  </div>
                </div>
              </div>

            </div>
          )}

        </div>

      </div>

      <style dangerouslySetInnerHTML={{__html: `
        .verifier-input:focus {
          border-color: var(--primary-neon) !important;
          box-shadow: 0 0 15px rgba(99, 102, 241, 0.1) !important;
        }
        @media (max-width: 991px) {
          .verifier-grid { grid-template-columns: 1fr !important; }
        }
      `}} />
    </section>
  );
}
