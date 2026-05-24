import React, { useState } from 'react';
import { X, Mail, Lock, User, Loader2, CheckCircle } from 'lucide-react';

export default function AuthModal({ isOpen, onClose, initialMode = 'login', onAuthSuccess }) {
  if (!isOpen) return null;

  const [mode, setMode] = useState(initialMode); // 'login' or 'register'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password || (mode === 'register' && !name)) return;

    setLoading(true);
    // Simulate API query latency
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        onAuthSuccess({
          email,
          name: mode === 'register' ? name : email.split('@')[0],
          isLoggedIn: true
        });
        onClose();
        // Reset state
        setEmail('');
        setPassword('');
        setName('');
      }, 1200);
    }, 1500);
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0, left: 0, right: 0, bottom: 0,
      background: 'rgba(5, 7, 11, 0.85)',
      backdropFilter: 'blur(10px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 2000,
      padding: '20px'
    }}>
      
      {/* Modal card */}
      <div 
        className="glass-panel" 
        style={{
          width: '100%',
          maxWidth: '440px',
          padding: '36px',
          background: 'var(--bg-card)',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          position: 'relative',
          boxShadow: '0 20px 50px rgba(0, 0, 0, 0.5)',
          animation: 'modalScale 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)'
        }}
      >
        {/* Close button */}
        <button 
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            background: 'rgba(255,255,255,0.03)',
            border: '1px solid var(--border-subtle)',
            borderRadius: '50%',
            width: '32px',
            height: '32px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--text-secondary)',
            cursor: 'pointer',
            transition: 'var(--transition-smooth)'
          }}
          onMouseEnter={(e) => e.currentTarget.style.color = '#fff'}
          onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-secondary)'}
        >
          <X size={16} />
        </button>

        {success ? (
          /* Success Screen animation */
          <div style={{ textAlign: 'center', padding: '32px 0' }}>
            <div style={{ display: 'inline-flex', color: '#10B981', marginBottom: '20px', animation: 'successPop 0.4s ease-out' }}>
              <CheckCircle size={56} />
            </div>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '8px' }}>
              {mode === 'login' ? 'Welcome Back!' : 'Account Created!'}
            </h3>
            <p style={{ color: 'var(--text-secondary)' }}>
              {mode === 'login' ? 'Authenticating and loading portal...' : 'Setting up student dashboard...'}
            </p>
          </div>
        ) : (
          /* Form Screen */
          <div>
            <h3 style={{ fontSize: '1.8rem', fontWeight: '800', marginBottom: '8px', fontFamily: 'var(--font-heading)' }}>
              {mode === 'login' ? 'Sign In' : 'Create Account'}
            </h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '32px' }}>
              {mode === 'login' 
                ? 'Access your saved courses and certificate history.' 
                : 'Start your upskilling journey with Axlo Organization.'
              }
            </p>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              
              {/* Full Name (register only) */}
              {mode === 'register' && (
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', color: 'var(--text-secondary)', marginBottom: '8px' }}>
                    Full Name
                  </label>
                  <div style={{ position: 'relative' }}>
                    <span style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', display: 'flex', color: 'var(--text-muted)' }}>
                      <User size={18} />
                    </span>
                    <input
                      type="text"
                      required
                      placeholder="John Doe"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      style={{ paddingLeft: '44px' }}
                      className="form-input"
                    />
                  </div>
                </div>
              )}

              {/* Email */}
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', color: 'var(--text-secondary)', marginBottom: '8px' }}>
                  Email Address
                </label>
                <div style={{ position: 'relative' }}>
                  <span style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', display: 'flex', color: 'var(--text-muted)' }}>
                    <Mail size={18} />
                  </span>
                  <input
                    type="email"
                    required
                    placeholder="john@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    style={{ paddingLeft: '44px' }}
                    className="form-input"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', color: 'var(--text-secondary)', marginBottom: '8px' }}>
                  Password
                </label>
                <div style={{ position: 'relative' }}>
                  <span style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', display: 'flex', color: 'var(--text-muted)' }}>
                    <Lock size={18} />
                  </span>
                  <input
                    type="password"
                    required
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    style={{ paddingLeft: '44px' }}
                    className="form-input"
                  />
                </div>
              </div>

              {/* Submit button */}
              <button 
                type="submit" 
                className="btn-primary" 
                disabled={loading}
                style={{ 
                  borderRadius: '12px', 
                  padding: '14px', 
                  marginTop: '10px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '10px'
                }}
              >
                {loading ? (
                  <>
                    <Loader2 size={18} className="spinner" />
                    Processing...
                  </>
                ) : (
                  mode === 'login' ? 'Sign In' : 'Sign Up'
                )}
              </button>

            </form>

            {/* Toggle Mode */}
            <div style={{ marginTop: '24px', textAlign: 'center', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
              {mode === 'login' ? (
                <>
                  New to Axlo?{' '}
                  <button 
                    onClick={() => setMode('register')} 
                    style={{ background: 'none', border: 'none', color: 'var(--primary-neon-hover)', fontWeight: '700', cursor: 'pointer' }}
                  >
                    Create an account
                  </button>
                </>
              ) : (
                <>
                  Already have an account?{' '}
                  <button 
                    onClick={() => setMode('login')} 
                    style={{ background: 'none', border: 'none', color: 'var(--primary-neon-hover)', fontWeight: '700', cursor: 'pointer' }}
                  >
                    Sign in
                  </button>
                </>
              )}
            </div>

          </div>
        )}

      </div>

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes modalScale {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        @keyframes successPop {
          0% { transform: scale(0.6); opacity: 0; }
          70% { transform: scale(1.1); }
          100% { transform: scale(1); opacity: 1; }
        }
        .spinner {
          animation: spin 1s linear infinite;
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}} />
    </div>
  );
}
