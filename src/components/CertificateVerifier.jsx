import React, { useState } from 'react';
import { ShieldCheck, Search, Award, CheckCircle, AlertCircle, Copy, ArrowRight, Download } from 'lucide-react';

export default function CertificateVerifier() {
  const [certId, setCertId] = useState('');
  const [searched, setSearched] = useState(false);
  const [result, setResult] = useState(null);
  const [copied, setCopied] = useState(false);

  // Mock certificate database
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
      padding: '80px 0', 
      borderTop: '1px solid var(--border-subtle)',
      position: 'relative'
    }}>
      <div className="container">
        
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '56px' }}>
          <div style={{ display: 'inline-flex', padding: '10px', background: 'rgba(6, 182, 212, 0.1)', border: '1px solid rgba(6, 182, 212, 0.2)', borderRadius: '12px', marginBottom: '16px', color: 'var(--secondary-neon)' }}>
            <ShieldCheck size={28} />
          </div>
          <h2 style={{ fontSize: '2.5rem', marginBottom: '16px' }}>
            Secured Blockchain Verification
          </h2>
          <p style={{ color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto' }}>
            Every AXLO certificate is anchored to a public cryptographic ledger. Validate legitimacy and student transcripts instantly.
          </p>
        </div>

        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: result ? '1.1fr 1fr' : '1fr', 
          gap: '40px',
          alignItems: 'start',
          transition: 'var(--transition-smooth)'
        }} className="verifier-grid">
          
          {/* Left panel: Verification form */}
          <div className="glass-panel" style={{ padding: '40px', border: '1px solid var(--border-subtle)', background: 'rgba(17, 24, 39, 0.4)' }}>
            <h3 style={{ fontSize: '1.4rem', marginBottom: '12px' }}>Verify Student Credentials</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', marginBottom: '24px' }}>
              Enter the unique certificate identification hash displayed on the digital document to load credentials details.
            </p>

            <form onSubmit={handleVerify} style={{ display: 'flex', gap: '12px', marginBottom: '24px' }}>
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
                    background: 'rgba(8, 11, 17, 0.6)',
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
              <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', display: 'block', marginBottom: '8px' }}>
                Test credentials using these verified codes:
              </span>
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                {Object.keys(certDatabase).map((code) => (
                  <button
                    key={code}
                    onClick={() => { setCertId(code); setSearched(false); setResult(null); }}
                    style={{
                      background: 'rgba(255, 255, 255, 0.03)',
                      border: '1px solid var(--border-subtle)',
                      color: 'var(--secondary-neon)',
                      fontSize: '0.8rem',
                      fontWeight: '700',
                      padding: '6px 12px',
                      borderRadius: '6px',
                      cursor: 'pointer',
                      transition: 'var(--transition-smooth)'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = 'rgba(6, 182, 212, 0.1)';
                      e.currentTarget.style.borderColor = 'rgba(6, 182, 212, 0.3)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'rgba(255, 255, 255, 0.03)';
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
                marginTop: '24px', 
                padding: '16px', 
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                background: result ? 'rgba(16, 185, 129, 0.06)' : 'rgba(244, 63, 94, 0.06)',
                border: '1px solid ' + (result ? 'rgba(16, 185, 129, 0.2)' : 'rgba(244, 63, 94, 0.2)'),
                color: result ? '#10B981' : 'var(--accent-rose)',
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

          {/* Right panel: Digital Certificate mockup rendering */}
          {result && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              
              {/* Certificate Canvas Mock */}
              <div style={{
                background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
                border: '8px double rgba(197, 160, 89, 0.4)',
                borderRadius: '8px',
                padding: '32px',
                position: 'relative',
                boxShadow: '0 15px 40px rgba(0,0,0,0.5)',
                color: '#fff',
                fontFamily: 'serif'
              }} className="certificate-mock">
                
                {/* Gold corner ornaments */}
                <div style={{ position: 'absolute', top: '10px', left: '10px', fontSize: '1rem', color: '#c5a059', borderTop: '2px solid #c5a059', borderLeft: '2px solid #c5a059', width: '20px', height: '20px' }} />
                <div style={{ position: 'absolute', top: '10px', right: '10px', fontSize: '1rem', color: '#c5a059', borderTop: '2px solid #c5a059', borderRight: '2px solid #c5a059', width: '20px', height: '20px' }} />
                <div style={{ position: 'absolute', bottom: '10px', left: '10px', fontSize: '1rem', color: '#c5a059', borderBottom: '2px solid #c5a059', borderLeft: '2px solid #c5a059', width: '20px', height: '20px' }} />
                <div style={{ position: 'absolute', bottom: '10px', right: '10px', fontSize: '1rem', color: '#c5a059', borderBottom: '2px solid #c5a059', borderRight: '2px solid #c5a059', width: '20px', height: '20px' }} />

                {/* Insignia / Seal */}
                <div style={{ textAlign: 'center', marginBottom: '16px' }}>
                  <Award size={36} color="#c5a059" style={{ margin: '0 auto' }} />
                  <div style={{ fontSize: '0.75rem', fontFamily: 'var(--font-heading)', color: '#c5a059', letterSpacing: '0.2em', fontWeight: 'bold', marginTop: '6px' }}>
                    AXLO ACADEMY
                  </div>
                </div>

                <div style={{ textAlign: 'center', fontFamily: 'var(--font-heading)' }}>
                  <h4 style={{ color: '#fff', fontSize: '1.2rem', fontFamily: 'serif', fontStyle: 'italic', fontWeight: 'normal', marginBottom: '8px' }}>
                    This is to certify that
                  </h4>
                  <h3 style={{ color: '#c5a059', fontSize: '1.8rem', fontWeight: 'bold', marginBottom: '12px' }}>
                    {result.studentName}
                  </h3>
                  <p style={{ fontSize: '0.85rem', color: '#94a3b8', fontStyle: 'italic', fontFamily: 'serif', marginBottom: '12px' }}>
                    has successfully completed the curriculum and exam for the specialization course
                  </p>
                  <h4 style={{ color: '#fff', fontSize: '1.1rem', fontWeight: '700', marginBottom: '16px', lineHeight: '1.4' }}>
                    {result.courseName}
                  </h4>
                  <p style={{ fontSize: '0.8rem', color: '#64748b', marginBottom: '24px' }}>
                    Completed with grade: <strong style={{ color: '#fff' }}>{result.grade}</strong> on {result.issueDate}
                  </p>
                </div>

                {/* Bottom line: Signature & verification info */}
                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'flex-end',
                  borderTop: '1px solid rgba(255,255,255,0.06)',
                  paddingTop: '16px',
                  fontFamily: 'var(--font-body)'
                }}>
                  
                  {/* Left: Signatures */}
                  <div style={{ textAlign: 'left' }}>
                    <div style={{ fontSize: '0.7rem', color: '#94a3b8', fontStyle: 'italic', fontFamily: 'cursive', marginBottom: '2px', color: '#c5a059' }}>
                      M. G. Sterling
                    </div>
                    <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '2px', fontSize: '0.6rem', color: '#64748b', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                      Academic Registrar
                    </div>
                  </div>

                  {/* Center: Seal mock */}
                  <div style={{
                    width: '44px',
                    height: '44px',
                    borderRadius: '50%',
                    border: '2px dashed #c5a059',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#c5a059',
                    fontSize: '0.5rem',
                    fontWeight: 'bold',
                    textAlign: 'center'
                  }}>
                    AXLO SECURE
                  </div>

                  {/* Right: ID code */}
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '0.6rem', color: '#64748b', fontWeight: 'bold' }}>
                      BLOCKCHAIN TXN HASH:
                    </div>
                    <div style={{ fontSize: '0.65rem', color: '#c5a059', fontFamily: 'monospace' }}>
                      {result.blockchainTx}
                    </div>
                  </div>

                </div>

              </div>

              {/* Certificate Meta Actions */}
              <div className="glass-panel" style={{ padding: '20px', background: 'rgba(17, 24, 39, 0.3)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
                  <div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>BLOCKCHAIN CREDENTIAL ID</div>
                    <div style={{ fontSize: '0.95rem', fontWeight: '700', color: 'var(--secondary-neon)' }}>{result.id}</div>
                  </div>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button 
                      onClick={() => handleCopyHash(result.blockchainTx)}
                      style={{
                        background: 'rgba(255,255,255,0.03)',
                        border: '1px solid var(--border-subtle)',
                        color: 'var(--text-primary)',
                        padding: '8px 12px',
                        borderRadius: '8px',
                        fontSize: '0.8rem',
                        fontWeight: '600',
                        cursor: 'pointer',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px'
                      }}
                    >
                      <Copy size={14} />
                      {copied ? 'Copied!' : 'Copy Tx Hash'}
                    </button>
                    <button 
                      onClick={() => alert('Certificate PDF printing simulation initiated.')}
                      style={{
                        background: 'linear-gradient(135deg, var(--primary-neon) 0%, #7c3aed 100%)',
                        border: 'none',
                        color: '#fff',
                        padding: '8px 12px',
                        borderRadius: '8px',
                        fontSize: '0.8rem',
                        fontWeight: '600',
                        cursor: 'pointer',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px'
                      }}
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
          border-color: var(--secondary-neon) !important;
          box-shadow: 0 0 15px rgba(6, 182, 212, 0.15) !important;
        }
        @media (max-width: 991px) {
          .verifier-grid { grid-template-columns: 1fr !important; }
        }
      `}} />
    </section>
  );
}
