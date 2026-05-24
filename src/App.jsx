import React, { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Partners from './components/Partners';
import CourseExplorer from './components/CourseExplorer';
import Roadmap from './components/Roadmap';
import Testimonials from './components/Testimonials';
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
    if (!user.isLoggedIn) {
      handleOpenAuth('register');
      return;
    }
    
    // Open dynamic player cockpit
    setActiveCourse(course);
    setActiveChapter(0);
    setQuizActive(false);
    setQuizScore(null);
    setQuizAnswers({});
    setCertClaimed(false);
    setGeneratedCertCode('');
  };

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
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', background: 'var(--bg-deep)' }}>
      
      {/* Top Session Bar (Light Theme) */}
      {user.isLoggedIn && (
        <div style={{
          background: 'linear-gradient(90deg, #f8fafc 0%, #f1f5f9 100%)',
          borderBottom: '1px solid var(--border-subtle)',
          padding: '10px 24px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          fontSize: '0.8rem',
          color: 'var(--text-secondary)',
          position: 'fixed',
          top: 0, left: 0, right: 0,
          zIndex: 1010,
          boxShadow: 'var(--shadow-sm)'
        }} className="user-top-bar">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#10B981', display: 'inline-block' }} />
            <span>Active Student: <strong>{user.name}</strong></span>
          </div>
          <button 
            onClick={handleSignOut}
            style={{
              background: 'none', border: 'none', color: 'var(--accent-rose)', cursor: 'pointer', fontSize: '0.8rem', fontWeight: '800'
            }}
          >
            Sign Out
          </button>
        </div>
      )}

      {/* Header navbar */}
      <Header 
        onLoginClick={() => handleOpenAuth('login')}
        onRegisterClick={() => handleOpenAuth('register')}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      <main style={{ flexGrow: 1, marginTop: user.isLoggedIn ? '126px' : '80px' }}>
        
        <Hero 
          onExploreClick={() => handleScrollTo('courses')}
          onVerifyClick={() => handleScrollTo('verifier')}
        />

        <Partners />
        
        <CourseExplorer onCourseEnrol={handleCourseEnrol} />

        <Roadmap />

        <Testimonials />
        
        <CertificateVerifier />
        
        <FaqSection />

      </main>

      {/* Footer */}
      <footer style={{ 
        background: '#ffffff', 
        borderTop: '1px solid var(--border-subtle)', 
        padding: '80px 0 32px 0',
        color: 'var(--text-secondary)'
      }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1.5fr repeat(3, 1fr)', gap: '48px', marginBottom: '48px' }} className="footer-grid">
            
            {/* Branding */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
                <div style={{ 
                  background: 'linear-gradient(135deg, var(--primary-neon) 0%, #4f46e5 100%)',
                  padding: '8px',
                  borderRadius: '10px'
                }}>
                  <Award size={20} color="#fff" />
                </div>
                <span style={{ fontSize: '1.4rem', fontWeight: '800', color: 'var(--text-primary)', fontFamily: 'var(--font-heading)' }}>
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
              <h4 style={{ color: 'var(--text-primary)', fontSize: '0.95rem', marginBottom: '16px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Upskill Path</h4>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '0.9rem' }}>
                <li><a href="#courses" onClick={(e) => { e.preventDefault(); handleScrollTo('courses'); }} className="foot-link">Basics Certifications</a></li>
                <li><a href="#courses" onClick={(e) => { e.preventDefault(); handleScrollTo('courses'); }} className="foot-link">Essential Programs</a></li>
                <li><a href="#courses" onClick={(e) => { e.preventDefault(); handleScrollTo('courses'); }} className="foot-link">Executive Diplomas</a></li>
                <li><a href="#courses" onClick={(e) => { e.preventDefault(); handleScrollTo('courses'); }} className="foot-link">MBA Specializations</a></li>
              </ul>
            </div>

            {/* Links 2 */}
            <div>
              <h4 style={{ color: 'var(--text-primary)', fontSize: '0.95rem', marginBottom: '16px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Security & Ledger</h4>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '0.9rem' }}>
                <li><a href="#verifier" onClick={(e) => { e.preventDefault(); handleScrollTo('verifier'); }} className="foot-link">Certificate Registry</a></li>
                <li><a href="#" className="foot-link">Smart Contracts</a></li>
                <li><a href="#" className="foot-link">Developer API</a></li>
                <li><a href="#" className="foot-link">Node Status</a></li>
              </ul>
            </div>

            {/* Links 3 */}
            <div>
              <h4 style={{ color: 'var(--text-primary)', fontSize: '0.95rem', marginBottom: '16px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Legal & Org</h4>
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
            &copy; {new Date().getFullYear()} Axlo Organization. All rights reserved. Redesigned and rebuilt with premium 3D light assets.
          </div>

        </div>
      </footer>

      {/* Auth Modal overlay */}
      <AuthModal 
        isOpen={authOpen} 
        onClose={() => setAuthOpen(false)} 
        initialMode={authMode}
        onAuthSuccess={handleAuthSuccess}
      />

      {/* Dynamic Simulated Course Player Dashboard overlay (Light Cockpit Theme) */}
      {activeCourse && (
        <div style={{
          position: 'fixed',
          top: 0, left: 0, right: 0, bottom: 0,
          background: 'rgba(15, 23, 42, 0.4)',
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
            background: 'var(--bg-white)',
            border: '1px solid var(--border-subtle)',
            borderRadius: '20px',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            boxShadow: 'var(--shadow-2xl)',
            animation: 'modalScale 0.3s ease-out'
          }}>
            
            {/* Player Header */}
            <div style={{
              background: '#f8fafc',
              borderBottom: '1px solid var(--border-subtle)',
              padding: '20px 28px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <div>
                <span style={{ fontSize: '0.75rem', color: 'var(--primary-neon)', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  {activeCourse.badge} • Student Cockpit Portal
                </span>
                <h3 style={{ fontSize: '1.3rem', color: 'var(--text-primary)', marginTop: '2px' }}>{activeCourse.title}</h3>
              </div>
              <button 
                onClick={() => setActiveCourse(null)}
                style={{
                  background: 'var(--bg-white)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: '50%',
                  width: '36px',
                  height: '36px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--text-secondary)',
                  cursor: 'pointer',
                  transition: 'var(--transition-smooth)',
                  boxShadow: 'var(--shadow-sm)'
                }}
                onMouseEnter={(e) => e.currentTarget.style.background = '#f1f5f9'}
                onMouseLeave={(e) => e.currentTarget.style.background = 'var(--bg-white)'}
              >
                <X size={18} />
              </button>
            </div>

            {/* Player Body Container */}
            <div style={{ display: 'flex', flexGrow: 1, overflow: 'hidden' }} className="player-body">
              
              {/* Left Sidebar: Outline */}
              <div style={{
                width: '300px',
                borderRight: '1px solid var(--border-subtle)',
                background: '#f8fafc',
                display: 'flex',
                flexDirection: 'column',
                overflowY: 'auto'
              }} className="player-sidebar">
                
                <div style={{ padding: '20px', borderBottom: '1px solid var(--border-subtle)' }}>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', fontWeight: '800', textTransform: 'uppercase' }}>
                    Course Outline
                  </span>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  
                  {/* Chapter 1 */}
                  <button 
                    onClick={() => { setActiveChapter(0); setQuizActive(false); }}
                    style={{
                      background: activeChapter === 0 && !quizActive ? 'rgba(99, 102, 241, 0.05)' : 'none',
                      border: 'none',
                      borderLeft: '3px solid ' + (activeChapter === 0 && !quizActive ? 'var(--primary-neon)' : 'transparent'),
                      padding: '18px 24px',
                      textAlign: 'left',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      color: activeChapter === 0 && !quizActive ? 'var(--primary-neon)' : 'var(--text-primary)',
                      transition: 'var(--transition-smooth)'
                    }}
                  >
                    <div style={{ width: '22px', height: '22px', borderRadius: '50%', background: activeChapter > 0 ? '#10B981' : 'var(--primary-neon)', display: 'flex', alignItems: 'center', justifyContext: 'center', color: '#fff', fontSize: '0.7rem', fontWeight: 'bold' }}>
                      <span style={{ margin: '0 auto' }}>{activeChapter > 0 ? <Check size={12} /> : '1'}</span>
                    </div>
                    <div>
                      <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontWeight: '600' }}>MODULE 1</div>
                      <div style={{ fontSize: '0.85rem', fontWeight: '700' }}>Introduction & Basic Foundation</div>
                    </div>
                  </button>

                  {/* Chapter 2 */}
                  <button 
                    onClick={() => { setActiveChapter(1); setQuizActive(false); }}
                    style={{
                      background: activeChapter === 1 && !quizActive ? 'rgba(99, 102, 241, 0.05)' : 'none',
                      border: 'none',
                      borderLeft: '3px solid ' + (activeChapter === 1 && !quizActive ? 'var(--primary-neon)' : 'transparent'),
                      padding: '18px 24px',
                      textAlign: 'left',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      color: activeChapter === 1 && !quizActive ? 'var(--primary-neon)' : 'var(--text-primary)',
                      transition: 'var(--transition-smooth)'
                    }}
                  >
                    <div style={{ width: '22px', height: '22px', borderRadius: '50%', background: activeChapter > 1 ? '#10B981' : 'var(--text-muted)', display: 'flex', alignItems: 'center', justifyContext: 'center', color: '#fff', fontSize: '0.7rem', fontWeight: 'bold' }}>
                      <span style={{ margin: '0 auto' }}>{activeChapter > 1 ? <Check size={12} /> : '2'}</span>
                    </div>
                    <div>
                      <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontWeight: '600' }}>MODULE 2</div>
                      <div style={{ fontSize: '0.85rem', fontWeight: '700' }}>Intermediate Exercises</div>
                    </div>
                  </button>

                  {/* Chapter 3 */}
                  <button 
                    onClick={() => { setActiveChapter(2); setQuizActive(false); }}
                    style={{
                      background: activeChapter === 2 && !quizActive ? 'rgba(99, 102, 241, 0.05)' : 'none',
                      border: 'none',
                      borderLeft: '3px solid ' + (activeChapter === 2 && !quizActive ? 'var(--primary-neon)' : 'transparent'),
                      padding: '18px 24px',
                      textAlign: 'left',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      color: activeChapter === 2 && !quizActive ? 'var(--primary-neon)' : 'var(--text-primary)',
                      transition: 'var(--transition-smooth)'
                    }}
                  >
                    <div style={{ width: '22px', height: '22px', borderRadius: '50%', background: activeChapter > 2 ? '#10B981' : 'var(--text-muted)', display: 'flex', alignItems: 'center', justifyContext: 'center', color: '#fff', fontSize: '0.7rem', fontWeight: 'bold' }}>
                      <span style={{ margin: '0 auto' }}>{activeChapter > 2 ? <Check size={12} /> : '3'}</span>
                    </div>
                    <div>
                      <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontWeight: '600' }}>MODULE 3</div>
                      <div style={{ fontSize: '0.85rem', fontWeight: '700' }}>Advanced Application</div>
                    </div>
                  </button>

                  {/* Assessment */}
                  <button 
                    onClick={() => setQuizActive(true)}
                    style={{
                      background: quizActive ? 'rgba(6, 182, 212, 0.05)' : 'none',
                      border: 'none',
                      borderLeft: '3px solid ' + (quizActive ? 'var(--secondary-neon)' : 'transparent'),
                      padding: '18px 24px',
                      textAlign: 'left',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      color: quizActive ? 'var(--secondary-neon)' : 'var(--text-primary)',
                      transition: 'var(--transition-smooth)'
                    }}
                  >
                    <div style={{ width: '22px', height: '22px', borderRadius: '50%', background: certClaimed ? '#10B981' : 'rgba(6, 182, 212, 0.15)', display: 'flex', alignItems: 'center', justifyContext: 'center', color: certClaimed ? '#fff' : 'var(--secondary-neon)', fontSize: '0.7rem', fontWeight: 'bold' }}>
                      <span style={{ margin: '0 auto', display: 'flex', alignItems: 'center' }}>{certClaimed ? <Check size={12} /> : <Award size={10} />}</span>
                    </div>
                    <div>
                      <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontWeight: '600' }}>ASSESSMENT</div>
                      <div style={{ fontSize: '0.85rem', fontWeight: '700' }}>Graded Final Quiz</div>
                    </div>
                  </button>

                </div>

              </div>

              {/* Right content window: Video or Quiz */}
              <div style={{ flexGrow: 1, padding: '40px', overflowY: 'auto', display: 'flex', flexDirection: 'column', background: 'var(--bg-white)' }}>
                
                {quizActive ? (
                  /* Quiz Screen */
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', maxWidth: '640px' }}>
                    <div style={{ borderBottom: '1px solid var(--border-subtle)', paddingBottom: '16px' }}>
                      <span style={{ fontSize: '0.8rem', color: 'var(--secondary-neon)', fontWeight: '800', textTransform: 'uppercase' }}>
                        FINAL COURSE ASSESSMENT
                      </span>
                      <h4 style={{ fontSize: '1.5rem', color: 'var(--text-primary)', fontWeight: '800', marginTop: '4px' }}>Graded Validation Quiz</h4>
                      <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginTop: '4px' }}>
                        Answer all questions correctly. Minimum score to pass and unlock certificate is 50%.
                      </p>
                    </div>

                    {quizScore !== null ? (
                      /* Quiz Results */
                      <div style={{ textAlign: 'center', padding: '32px 0' }}>
                        <div style={{ display: 'inline-flex', color: quizScore >= 50 ? '#10B981' : 'var(--accent-rose)', marginBottom: '20px' }}>
                          {quizScore >= 50 ? <CheckCircle size={56} /> : <AlertCircle size={56} />}
                        </div>
                        <h4 style={{ fontSize: '1.5rem', fontWeight: '800', marginBottom: '8px', color: 'var(--text-primary)' }}>
                          Quiz Completed! Score: {quizScore}%
                        </h4>
                        <p style={{ color: 'var(--text-secondary)', marginBottom: '32px' }}>
                          {quizScore >= 50 
                            ? 'Excellent! You passed the chapter evaluation requirement.' 
                            : 'Score is below 50%. Please retake the quiz to pass.'
                          }
                        </p>

                        {quizScore >= 50 ? (
                          certClaimed ? (
                            <div className="glass-panel" style={{ padding: '24px', background: 'rgba(16,185,129,0.05)', borderColor: '#a7f3d0', textAlign: 'left', boxShadow: 'var(--shadow-sm)' }}>
                              <h5 style={{ color: '#047857', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '1rem', marginBottom: '8px', fontWeight: '800' }}>
                                <CheckCircle size={16} /> Certificate Claimed Successfully!
                              </h5>
                              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '14px' }}>
                                Your certificate is anchored to the ledger. Copy the code below and search in the **Verify Certificate** section of the landing page.
                              </p>
                              <div style={{ background: '#f8fafc', padding: '14px', borderRadius: '10px', border: '1px solid var(--border-subtle)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <span style={{ fontFamily: 'monospace', fontWeight: 'bold', color: 'var(--primary-neon)' }}>{generatedCertCode}</span>
                                <button 
                                  onClick={() => {
                                    navigator.clipboard.writeText(generatedCertCode);
                                    alert('Copied certificate ID to clipboard!');
                                  }}
                                  style={{
                                    background: 'none', border: 'none', color: 'var(--primary-neon)', cursor: 'pointer', fontSize: '0.8rem', fontWeight: '800'
                                  }}
                                >
                                  Copy Code
                                </button>
                              </div>
                            </div>
                          ) : (
                            <button onClick={claimCertificate} className="btn-primary">
                              Claim Secure Blockchain Certificate
                            </button>
                          )
                        ) : (
                          <button 
                            onClick={() => { setQuizScore(null); setQuizAnswers({}); }} 
                            className="btn-primary" 
                          >
                            Retake Quiz
                          </button>
                        )}
                      </div>
                    ) : (
                      /* Quiz rendering */
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                        {mockQuizQuestions.map((question, qIdx) => (
                          <div key={qIdx} className="glass-panel" style={{ padding: '24px', border: '1px solid var(--border-subtle)', background: '#f8fafc', boxShadow: 'var(--shadow-sm)' }}>
                            <div style={{ fontWeight: '800', fontSize: '1rem', marginBottom: '14px', color: 'var(--text-primary)' }}>
                              Q{qIdx + 1}: {question.q}
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                              {question.options.map((opt, optIdx) => (
                                <label 
                                  key={optIdx}
                                  style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '10px',
                                    padding: '12px 16px',
                                    background: quizAnswers[qIdx] === optIdx ? 'rgba(99, 102, 241, 0.05)' : 'var(--bg-white)',
                                    border: '1px solid ' + (quizAnswers[qIdx] === optIdx ? 'rgba(99, 102, 241, 0.25)' : 'var(--border-subtle)'),
                                    borderRadius: '10px',
                                    cursor: 'pointer',
                                    fontSize: '0.9rem',
                                    transition: 'var(--transition-smooth)',
                                    boxShadow: 'var(--shadow-sm)'
                                  }}
                                >
                                  <input 
                                    type="radio" 
                                    name={`q_${qIdx}`}
                                    checked={quizAnswers[qIdx] === optIdx}
                                    onChange={() => handleQuizAnswer(qIdx, optIdx)}
                                    style={{ accentColor: 'var(--primary-neon)' }}
                                  />
                                  <span style={{ fontWeight: '500', color: 'var(--text-secondary)' }}>{opt}</span>
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
                            borderRadius: '10px',
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
                    
                    {/* Video Player */}
                    <div style={{
                      aspectRatio: '16/9',
                      background: '#0f172a',
                      borderRadius: '16px',
                      border: '1px solid var(--border-subtle)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      position: 'relative',
                      overflow: 'hidden',
                      boxShadow: 'var(--shadow-lg)'
                    }}>
                      
                      {/* Video graphics */}
                      <div style={{
                        position: 'absolute',
                        top: 0, left: 0, right: 0, bottom: 0,
                        background: 'linear-gradient(135deg, rgba(99,102,241,0.1) 0%, rgba(6,182,212,0.06) 100%)',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        zIndex: 2
                      }}>
                        <PlayCircle size={64} style={{ cursor: 'pointer', color: '#fff', filter: 'drop-shadow(0 0 15px rgba(99,102,241,0.3))' }} />
                        <span style={{ fontSize: '0.85rem', color: '#e2e8f0', marginTop: '12px', fontWeight: 'bold', letterSpacing: '0.05em' }}>
                          Play Simulated Video Lecture • Module {activeChapter + 1}
                        </span>
                      </div>

                      {/* Video HUD */}
                      <div style={{
                        position: 'absolute',
                        bottom: 0, left: 0, right: 0,
                        padding: '20px',
                        background: 'linear-gradient(to top, rgba(15,23,42,0.9) 0%, transparent 100%)',
                        zIndex: 3,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        fontSize: '0.75rem',
                        color: '#94a3b8'
                      }}>
                        <div>0:00 / 12:45</div>
                        <div style={{ flexGrow: 1, height: '4px', background: 'rgba(255,255,255,0.15)', margin: '0 20px', borderRadius: '99px', position: 'relative' }}>
                          <div style={{ width: '0%', height: '100%', background: 'var(--primary-neon)', borderRadius: '99px' }} />
                        </div>
                        <div>1080p HD</div>
                      </div>

                    </div>

                    {/* Lesson Notes */}
                    <div style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: '28px' }}>
                      <h4 style={{ fontSize: '1.3rem', fontWeight: '800', marginBottom: '8px', color: 'var(--text-primary)' }}>
                        {activeChapter === 0 && "Module 1: Course Overview & Basic Foundation"}
                        {activeChapter === 1 && "Module 2: Practical Exercises & Intermediate Concepts"}
                        {activeChapter === 2 && "Module 3: Advanced Architectures & Application Studies"}
                      </h4>
                      <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: '1.6' }}>
                        In this module, we walk through the conceptual background of {activeCourse.title}. Study the provided reference handouts below. Complete the reading material before heading to the next chapter. After completing all three modules, take the final certification assessment quiz.
                      </p>
                    </div>

                    {/* Navigation buttons */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid var(--border-subtle)', paddingTop: '24px' }}>
                      <button 
                        disabled={activeChapter === 0}
                        onClick={() => setActiveChapter(activeChapter - 1)}
                        style={{
                          background: 'rgba(15, 23, 42, 0.02)',
                          border: '1px solid var(--border-subtle)',
                          color: activeChapter === 0 ? 'var(--text-muted)' : 'var(--text-primary)',
                          padding: '10px 20px',
                          borderRadius: '8px',
                          fontWeight: '600',
                          fontSize: '0.85rem',
                          cursor: activeChapter === 0 ? 'not-allowed' : 'pointer'
                        }}
                      >
                        Previous Module
                      </button>
                      
                      {activeChapter < 2 ? (
                        <button 
                          onClick={() => setActiveChapter(activeChapter + 1)}
                          className="btn-primary" 
                          style={{ borderRadius: '8px', padding: '10px 20px', fontSize: '0.85rem' }}
                        >
                          Next Module <ChevronRight size={16} />
                        </button>
                      ) : (
                        <button 
                          onClick={() => setQuizActive(true)}
                          className="btn-primary" 
                          style={{ borderRadius: '8px', padding: '10px 20px', fontSize: '0.85rem', background: 'linear-gradient(135deg, var(--secondary-neon) 0%, #0891b2 100%)' }}
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

      {/* Responsive adjustment CSS */}
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
