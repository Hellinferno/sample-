import React, { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import CourseExplorer from './components/CourseExplorer';
import CertificateVerifier from './components/CertificateVerifier';
import FaqSection from './components/FaqSection';
import AuthModal from './components/AuthModal';
import { PlayCircle, CheckCircle, Award, Compass, HelpCircle, Shield, AlertCircle, ArrowRight, X, ChevronRight, Check } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('courses');
  const [authOpen, setAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState('login');
  const [user, setUser] = useState({ isLoggedIn: false, name: '' });
  
  // Simulated course player state
  const [activeCourse, setActiveCourse] = useState(null);
  const [activeChapter, setActiveChapter] = useState(0);
  const [quizActive, setQuizActive] = useState(false);
  const [quizScore, setQuizScore] = useState(null);
  const [quizAnswers, setQuizAnswers] = useState({});
  const [certClaimed, setCertClaimed] = useState(false);
  const [generatedCertCode, setGeneratedCertCode] = useState('');

  const handleOpenAuth = (mode) => {
    setAuthMode(mode);
    setAuthOpen(true);
  };

  const handleAuthSuccess = (userData) => {
    setUser(userData);
  };

  const handleSignOut = () => {
    setUser({ isLoggedIn: false, name: '' });
  };

  const handleCourseEnrol = (course) => {
    // If not logged in, trigger auth modal first
    if (!user.isLoggedIn) {
      handleOpenAuth('register');
      return;
    }
    
    // Open dynamic player simulator
    setActiveCourse(course);
    setActiveChapter(0);
    setQuizActive(false);
    setQuizScore(null);
    setQuizAnswers({});
    setCertClaimed(false);
    setGeneratedCertCode('');
  };

  // Mock quiz questions based on active course
  const mockQuizQuestions = [
    {
      q: "What is the primary benefit of taking self-paced courses with Axlo?",
      options: [
        "Fixed classroom hours",
        "Lifetime access to study material and flexible scheduling",
        "Mandatory physical exams",
        "Paid video lectures"
      ],
      correct: 1
    },
    {
      q: "How can employers verify the validity of your Axlo certificate?",
      options: [
        "By calling the registrar",
        "Using the blockchain TX verification code on the public ledger",
        "Through standard post mail",
        "Certificates cannot be verified"
      ],
      correct: 1
    },
    {
      q: "What is the minimum score required to pass the chapter assessment?",
      options: [
        "30%",
        "50%",
        "75%",
        "90%"
      ],
      correct: 1
    }
  ];

  const handleQuizAnswer = (qIdx, optIdx) => {
    setQuizAnswers({
      ...quizAnswers,
      [qIdx]: optIdx
    });
  };

  const submitQuiz = () => {
    let score = 0;
    mockQuizQuestions.forEach((q, i) => {
      if (quizAnswers[i] === q.correct) {
        score++;
      }
    });
    const percentage = Math.round((score / mockQuizQuestions.length) * 100);
    setQuizScore(percentage);
  };

  const claimCertificate = () => {
    // Generate a valid mock cert code
    const initials = user.name.substring(0, 3).toUpperCase();
    const courseCode = activeCourse.title.substring(0, 5).toUpperCase().replace(/\s/g, 'X');
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    const code = `AXLO-${initials}-${courseCode}-${randomNum}`;
    
    setGeneratedCertCode(code);
    setCertClaimed(true);
  };

  const handleScrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      
      {/* Top Banner (simulating user state) */}
      {user.isLoggedIn && (
        <div style={{
          background: 'linear-gradient(90deg, #1e1b4b 0%, #311042 100%)',
          borderBottom: '1px solid rgba(255,255,255,0.05)',
          padding: '8px 24px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          fontSize: '0.8rem',
          color: 'var(--text-secondary)',
          marginTop: '0px',
          position: 'fixed',
          top: 0, left: 0, right: 0,
          zIndex: 1010
        }} className="user-top-bar">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#10B981', display: 'inline-block' }} />
            <span>Active Student Session: <strong>{user.name}</strong></span>
          </div>
          <button 
            onClick={handleSignOut}
            style={{
              background: 'none', border: 'none', color: 'var(--accent-rose)', cursor: 'pointer', fontSize: '0.8rem', fontWeight: 'bold'
            }}
          >
            Sign Out
          </button>
        </div>
      )}

      {/* Header component */}
      <Header 
        onLoginClick={() => handleOpenAuth('login')}
        onRegisterClick={() => handleOpenAuth('register')}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      <main style={{ flexGrow: 1, marginTop: user.isLoggedIn ? '116px' : '80px' }}>
        
        {/* Landing Page Sections */}
        <Hero 
          onExploreClick={() => handleScrollTo('courses')}
          onVerifyClick={() => handleScrollTo('verifier')}
        />
        
        <CourseExplorer onCourseEnrol={handleCourseEnrol} />
        
        <CertificateVerifier />
        
        <FaqSection />

      </main>

      {/* Footer component */}
      <footer style={{ 
        background: '#04060a', 
        borderTop: '1px solid var(--border-subtle)', 
        padding: '64px 0 32px 0',
        color: 'var(--text-secondary)'
      }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1.5fr repeat(3, 1fr)', gap: '48px', marginBottom: '48px' }} className="footer-grid">
            
            {/* Branding */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
                <div style={{ 
                  background: 'linear-gradient(135deg, var(--primary-neon) 0%, #6d28d9 100%)',
                  padding: '8px',
                  borderRadius: '10px'
                }}>
                  <Award size={20} color="#fff" />
                </div>
                <span style={{ fontSize: '1.4rem', fontWeight: '800', color: '#fff', fontFamily: 'var(--font-heading)' }}>
                  AXLO
                </span>
              </div>
              <p style={{ fontSize: '0.9rem', lineHeight: '1.5', marginBottom: '24px' }}>
                Rebranding professional online certifications. Study on your schedule, complete course validation quizzes, and acquire public blockchain-verified certificates.
              </p>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                Powered by Axlo Organization Ledger Network.
              </div>
            </div>

            {/* Links 1 */}
            <div>
              <h4 style={{ color: '#fff', fontSize: '0.95rem', marginBottom: '16px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Upskill Path</h4>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '0.9rem' }}>
                <li><a href="#courses" onClick={(e) => { e.preventDefault(); handleScrollTo('courses'); }} className="foot-link">Basics Certifications</a></li>
                <li><a href="#courses" onClick={(e) => { e.preventDefault(); handleScrollTo('courses'); }} className="foot-link">Essential Programs</a></li>
                <li><a href="#courses" onClick={(e) => { e.preventDefault(); handleScrollTo('courses'); }} className="foot-link">Executive Diplomas</a></li>
                <li><a href="#courses" onClick={(e) => { e.preventDefault(); handleScrollTo('courses'); }} className="foot-link">MBA Specializations</a></li>
              </ul>
            </div>

            {/* Links 2 */}
            <div>
              <h4 style={{ color: '#fff', fontSize: '0.95rem', marginBottom: '16px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Security & Ledger</h4>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '0.9rem' }}>
                <li><a href="#verifier" onClick={(e) => { e.preventDefault(); handleScrollTo('verifier'); }} className="foot-link">Certificate Registry</a></li>
                <li><a href="#" className="foot-link">Smart Contracts</a></li>
                <li><a href="#" className="foot-link">Developer API</a></li>
                <li><a href="#" className="foot-link">Node Status</a></li>
              </ul>
            </div>

            {/* Links 3 */}
            <div>
              <h4 style={{ color: '#fff', fontSize: '0.95rem', marginBottom: '16px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Legal & Org</h4>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '0.9rem' }}>
                <li><a href="#" className="foot-link">Terms of Service</a></li>
                <li><a href="#" className="foot-link">Privacy Policy</a></li>
                <li><a href="#" className="foot-link">Accreditation Info</a></li>
                <li><a href="#" className="foot-link">Contact Registrar</a></li>
              </ul>
            </div>

          </div>

          <div style={{ 
            borderTop: '1px solid var(--border-subtle)', 
            paddingTop: '32px', 
            textAlign: 'center', 
            fontSize: '0.8rem', 
            color: 'var(--text-muted)' 
          }}>
            &copy; {new Date().getFullYear()} Axlo Organization. All rights reserved. Redesigned and rebuilt from scraped resources.
          </div>

        </div>
      </footer>

      {/* Auth Modal component */}
      <AuthModal 
        isOpen={authOpen} 
        onClose={() => setAuthOpen(false)} 
        initialMode={authMode}
        onAuthSuccess={handleAuthSuccess}
      />

      {/* Dynamic Simulated Course Player Dashboard overlay */}
      {activeCourse && (
        <div style={{
          position: 'fixed',
          top: 0, left: 0, right: 0, bottom: 0,
          background: 'rgba(5, 7, 11, 0.95)',
          backdropFilter: 'blur(15px)',
          zIndex: 3000,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '24px'
        }}>
          
          <div style={{
            width: '100%',
            maxWidth: '1000px',
            height: '90vh',
            background: 'var(--bg-deep)',
            border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: '16px',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            boxShadow: '0 25px 60px rgba(0,0,0,0.6)',
            animation: 'modalScale 0.3s ease-out'
          }}>
            
            {/* Player Header */}
            <div style={{
              background: 'var(--bg-card)',
              borderBottom: '1px solid var(--border-subtle)',
              padding: '16px 24px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <div>
                <span style={{ fontSize: '0.75rem', color: 'var(--primary-neon-hover)', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  {activeCourse.badge} • Student Portal
                </span>
                <h3 style={{ fontSize: '1.25rem', color: '#fff', marginTop: '2px' }}>{activeCourse.title}</h3>
              </div>
              <button 
                onClick={() => setActiveCourse(null)}
                style={{
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: '50%',
                  width: '36px',
                  height: '36px',
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
                <X size={18} />
              </button>
            </div>

            {/* Player Body Container */}
            <div style={{ display: 'flex', flexGrow: 1, overflow: 'hidden' }} className="player-body">
              
              {/* Left Sidebar: Chapters & Lessons */}
              <div style={{
                width: '300px',
                borderRight: '1px solid var(--border-subtle)',
                background: 'rgba(17, 24, 39, 0.3)',
                display: 'flex',
                flexDirection: 'column',
                overflowY: 'auto'
              }} className="player-sidebar">
                
                <div style={{ padding: '20px', borderBottom: '1px solid rgba(255,255,255,0.03)' }}>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: '600', textTransform: 'uppercase' }}>
                    Course Outline
                  </span>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  
                  {/* Chapter 1 */}
                  <button 
                    onClick={() => { setActiveChapter(0); setQuizActive(false); }}
                    style={{
                      background: activeChapter === 0 && !quizActive ? 'rgba(139, 92, 246, 0.08)' : 'none',
                      border: 'none',
                      borderLeft: '3px solid ' + (activeChapter === 0 && !quizActive ? 'var(--primary-neon)' : 'transparent'),
                      padding: '16px 20px',
                      textAlign: 'left',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      color: activeChapter === 0 && !quizActive ? '#fff' : 'var(--text-secondary)'
                    }}
                  >
                    <div style={{ width: '20px', height: '20px', borderRadius: '50%', background: activeChapter > 0 ? '#10B981' : 'var(--primary-neon)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '0.7rem', fontWeight: 'bold' }}>
                      {activeChapter > 0 ? <Check size={12} /> : '1'}
                    </div>
                    <div>
                      <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>MODULE 1</div>
                      <div style={{ fontSize: '0.85rem', fontWeight: '600' }}>Introduction & Fundamentals</div>
                    </div>
                  </button>

                  {/* Chapter 2 */}
                  <button 
                    onClick={() => { setActiveChapter(1); setQuizActive(false); }}
                    style={{
                      background: activeChapter === 1 && !quizActive ? 'rgba(139, 92, 246, 0.08)' : 'none',
                      border: 'none',
                      borderLeft: '3px solid ' + (activeChapter === 1 && !quizActive ? 'var(--primary-neon)' : 'transparent'),
                      padding: '16px 20px',
                      textAlign: 'left',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      color: activeChapter === 1 && !quizActive ? '#fff' : 'var(--text-secondary)'
                    }}
                  >
                    <div style={{ width: '20px', height: '20px', borderRadius: '50%', background: activeChapter > 1 ? '#10B981' : 'var(--text-muted)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '0.7rem', fontWeight: 'bold' }}>
                      {activeChapter > 1 ? <Check size={12} /> : '2'}
                    </div>
                    <div>
                      <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>MODULE 2</div>
                      <div style={{ fontSize: '0.85rem', fontWeight: '600' }}>Intermediate Concepts</div>
                    </div>
                  </button>

                  {/* Chapter 3 */}
                  <button 
                    onClick={() => { setActiveChapter(2); setQuizActive(false); }}
                    style={{
                      background: activeChapter === 2 && !quizActive ? 'rgba(139, 92, 246, 0.08)' : 'none',
                      border: 'none',
                      borderLeft: '3px solid ' + (activeChapter === 2 && !quizActive ? 'var(--primary-neon)' : 'transparent'),
                      padding: '16px 20px',
                      textAlign: 'left',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      color: activeChapter === 2 && !quizActive ? '#fff' : 'var(--text-secondary)'
                    }}
                  >
                    <div style={{ width: '20px', height: '20px', borderRadius: '50%', background: activeChapter > 2 ? '#10B981' : 'var(--text-muted)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '0.7rem', fontWeight: 'bold' }}>
                      {activeChapter > 2 ? <Check size={12} /> : '3'}
                    </div>
                    <div>
                      <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>MODULE 3</div>
                      <div style={{ fontSize: '0.85rem', fontWeight: '600' }}>Advanced Application</div>
                    </div>
                  </button>

                  {/* Assessment */}
                  <button 
                    onClick={() => setQuizActive(true)}
                    style={{
                      background: quizActive ? 'rgba(6, 182, 212, 0.08)' : 'none',
                      border: 'none',
                      borderLeft: '3px solid ' + (quizActive ? 'var(--secondary-neon)' : 'transparent'),
                      padding: '16px 20px',
                      textAlign: 'left',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      color: quizActive ? '#fff' : 'var(--text-secondary)'
                    }}
                  >
                    <div style={{ width: '20px', height: '20px', borderRadius: '50%', background: certClaimed ? '#10B981' : 'rgba(6, 182, 212, 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '0.7rem', fontWeight: 'bold' }}>
                      {certClaimed ? <Check size={12} /> : <Award size={10} />}
                    </div>
                    <div>
                      <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>ASSESSMENT</div>
                      <div style={{ fontSize: '0.85rem', fontWeight: '600' }}>Final Quiz Certification</div>
                    </div>
                  </button>

                </div>

              </div>

              {/* Right content window: Video Simulator or Quiz Simulator */}
              <div style={{ flexGrow: 1, padding: '36px', overflowY: 'auto', display: 'flex', flexDirection: 'column' }}>
                
                {quizActive ? (
                  /* Quiz Screen */
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', maxWidth: '600px' }}>
                    <div style={{ borderBottom: '1px solid var(--border-subtle)', paddingBottom: '16px' }}>
                      <span style={{ fontSize: '0.8rem', color: 'var(--secondary-neon)', fontWeight: '700', textTransform: 'uppercase' }}>
                        FINAL COURSE ASSESSMENT
                      </span>
                      <h4 style={{ fontSize: '1.4rem', color: '#fff' }}>Graded Validation Quiz</h4>
                      <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginTop: '4px' }}>
                        Answer all questions correctly. Minimum score to pass and unlock certificate is 50%.
                      </p>
                    </div>

                    {quizScore !== null ? (
                      /* Quiz Results display */
                      <div style={{ textAlign: 'center', padding: '32px 0' }}>
                        <div style={{ display: 'inline-flex', color: quizScore >= 50 ? '#10B981' : 'var(--accent-rose)', marginBottom: '16px' }}>
                          {quizScore >= 50 ? <CheckCircle size={48} /> : <AlertCircle size={48} />}
                        </div>
                        <h4 style={{ fontSize: '1.4rem', marginBottom: '8px' }}>
                          Quiz Completed! Score: {quizScore}%
                        </h4>
                        <p style={{ color: 'var(--text-secondary)', marginBottom: '24px' }}>
                          {quizScore >= 50 
                            ? 'Excellent! You passed the chapter evaluation requirement.' 
                            : 'Score is below 50%. Please retake the quiz to pass.'
                          }
                        </p>

                        {quizScore >= 50 ? (
                          certClaimed ? (
                            <div className="glass-panel" style={{ padding: '24px', background: 'rgba(16,185,129,0.05)', borderColor: 'rgba(16,185,129,0.2)', textAlign: 'left' }}>
                              <h5 style={{ color: '#10B981', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '1rem', marginBottom: '8px' }}>
                                <CheckCircle size={16} /> Certificate Claimed Successfully!
                              </h5>
                              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '12px' }}>
                                Your certificate is anchored to the ledger. Copy the code below and search in the **Verify Certificate** section of the landing page.
                              </p>
                              <div style={{ background: 'rgba(8,11,17,0.5)', padding: '12px', borderRadius: '8px', border: '1px solid var(--border-subtle)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <span style={{ fontFamily: 'monospace', fontWeight: 'bold', color: 'var(--secondary-neon)' }}>{generatedCertCode}</span>
                                <button 
                                  onClick={() => {
                                    navigator.clipboard.writeText(generatedCertCode);
                                    alert('Copied certificate ID to clipboard!');
                                  }}
                                  style={{
                                    background: 'none', border: 'none', color: 'var(--primary-neon-hover)', cursor: 'pointer', fontSize: '0.75rem', fontWeight: 'bold'
                                  }}
                                >
                                  Copy Code
                                </button>
                              </div>
                            </div>
                          ) : (
                            <button onClick={claimCertificate} className="btn-primary" style={{ padding: '14px 32px' }}>
                              Claim Secure Blockchain Certificate
                            </button>
                          )
                        ) : (
                          <button 
                            onClick={() => { setQuizScore(null); setQuizAnswers({}); }} 
                            className="btn-primary" 
                            style={{ padding: '14px 32px' }}
                          >
                            Retake Quiz
                          </button>
                        )}
                      </div>
                    ) : (
                      /* Quiz rendering */
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                        {mockQuizQuestions.map((question, qIdx) => (
                          <div key={qIdx} className="glass-panel" style={{ padding: '20px', border: '1px solid var(--border-subtle)', background: 'rgba(255,255,255,0.01)' }}>
                            <div style={{ fontWeight: '700', fontSize: '0.95rem', marginBottom: '12px' }}>
                              Q{qIdx + 1}: {question.q}
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                              {question.options.map((opt, optIdx) => (
                                <label 
                                  key={optIdx}
                                  style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '10px',
                                    padding: '10px 14px',
                                    background: quizAnswers[qIdx] === optIdx ? 'rgba(139, 92, 246, 0.08)' : 'rgba(255,255,255,0.01)',
                                    border: '1px solid ' + (quizAnswers[qIdx] === optIdx ? 'rgba(139, 92, 246, 0.3)' : 'var(--border-subtle)'),
                                    borderRadius: '8px',
                                    cursor: 'pointer',
                                    fontSize: '0.9rem',
                                    transition: 'var(--transition-smooth)'
                                  }}
                                >
                                  <input 
                                    type="radio" 
                                    name={`q_${qIdx}`}
                                    checked={quizAnswers[qIdx] === optIdx}
                                    onChange={() => handleQuizAnswer(qIdx, optIdx)}
                                    style={{ accentColor: 'var(--primary-neon)' }}
                                  />
                                  <span>{opt}</span>
                                </label>
                              ))}
                            </div>
                          </div>
                        ))}

                        <button 
                          onClick={submitQuiz} 
                          disabled={Object.keys(quizAnswers).length < mockQuizQuestions.length}
                          className="btn-primary" 
                          style={{
                            alignSelf: 'flex-start',
                            borderRadius: '8px',
                            padding: '12px 28px',
                            opacity: Object.keys(quizAnswers).length < mockQuizQuestions.length ? 0.5 : 1,
                            cursor: Object.keys(quizAnswers).length < mockQuizQuestions.length ? 'not-allowed' : 'pointer'
                          }}
                        >
                          Submit Assessment
                        </button>
                      </div>
                    )}

                  </div>
                ) : (
                  /* Lecture Screen Simulator */
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                    
                    {/* Simulated Video Player */}
                    <div style={{
                      aspectRatio: '16/9',
                      background: '#04060a',
                      borderRadius: '12px',
                      border: '1px solid var(--border-subtle)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      position: 'relative',
                      overflow: 'hidden'
                    }}>
                      
                      {/* Video graphic layout */}
                      <div style={{
                        position: 'absolute',
                        top: 0, left: 0, right: 0, bottom: 0,
                        background: 'linear-gradient(135deg, rgba(139,92,246,0.15) 0%, rgba(6,182,212,0.1) 100%)',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        zIndex: 2
                      }}>
                        <PlayCircle size={64} className="animate-pulse-glow" style={{ cursor: 'pointer', color: '#fff' }} />
                        <span style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.7)', marginTop: '12px', fontWeight: 'bold' }}>
                          Play Simulated Video Lecture • Chapter {activeChapter + 1}
                        </span>
                      </div>

                      {/* Video HUD interface */}
                      <div style={{
                        position: 'absolute',
                        bottom: 0, left: 0, right: 0,
                        padding: '16px',
                        background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 100%)',
                        zIndex: 3,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        fontSize: '0.75rem',
                        color: 'rgba(255,255,255,0.7)'
                      }}>
                        <div>0:00 / 12:45</div>
                        <div style={{ flexGrow: 1, height: '4px', background: 'rgba(255,255,255,0.2)', margin: '0 16px', borderRadius: '99px', position: 'relative' }}>
                          <div style={{ width: '0%', height: '100%', background: 'var(--primary-neon)', borderRadius: '99px' }} />
                        </div>
                        <div>1080p HD</div>
                      </div>

                    </div>

                    {/* Lesson Notes */}
                    <div style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: '24px' }}>
                      <h4 style={{ fontSize: '1.25rem', marginBottom: '8px' }}>
                        {activeChapter === 0 && "Module 1: Course Overview & Basic Foundation"}
                        {activeChapter === 1 && "Module 2: Practical Exercises & Intermediate Concepts"}
                        {activeChapter === 2 && "Module 3: Advanced Architectures & Application Studies"}
                      </h4>
                      <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: '1.5' }}>
                        In this module, we walk through the conceptual background of {activeCourse.title}. Study the provided reference handouts below. Complete the reading material before heading to the next chapter. After completing all three modules, take the final certification assessment quiz.
                      </p>
                    </div>

                    {/* Action buttons */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid rgba(255,255,255,0.03)', paddingTop: '20px' }}>
                      <button 
                        disabled={activeChapter === 0}
                        onClick={() => setActiveChapter(activeChapter - 1)}
                        style={{
                          background: 'rgba(255,255,255,0.02)',
                          border: '1px solid var(--border-subtle)',
                          color: activeChapter === 0 ? 'var(--text-muted)' : '#fff',
                          padding: '10px 20px',
                          borderRadius: '8px',
                          cursor: activeChapter === 0 ? 'not-allowed' : 'pointer'
                        }}
                      >
                        Previous Module
                      </button>
                      
                      {activeChapter < 2 ? (
                        <button 
                          onClick={() => setActiveChapter(activeChapter + 1)}
                          className="btn-primary" 
                          style={{ borderRadius: '8px', padding: '10px 20px' }}
                        >
                          Next Module <ChevronRight size={16} />
                        </button>
                      ) : (
                        <button 
                          onClick={() => setQuizActive(true)}
                          className="btn-primary" 
                          style={{ borderRadius: '8px', padding: '10px 20px', background: 'linear-gradient(135deg, var(--secondary-neon) 0%, #0891b2 100%)' }}
                        >
                          Proceed to Quiz <Award size={16} />
                        </button>
                      )}
                    </div>

                  </div>
                )}

              </div>

            </div>

          </div>

        </div>
      )}

      {/* Responsive adjustments CSS */}
      <style dangerouslySetInnerHTML={{__html: `
        @media (max-width: 991px) {
          .footer-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 768px) {
          .footer-grid { grid-template-columns: 1fr !important; }
          .player-body { flexDirection: column !important; }
          .player-sidebar { width: 100% !important; border-right: none !important; border-bottom: 1px solid var(--border-subtle) !important; height: 180px !important; }
        }
      `}} />
    </div>
  );
}
