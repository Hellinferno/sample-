import React, { useState, useMemo } from 'react';
import { Search, Clock, Award, BookOpen, Layers, PlayCircle, Grid } from 'lucide-react';
import coursesData from '../coursesData.json';

export default function CourseExplorer({ onCourseEnrol }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('All');

  const filters = [
    { label: 'All Courses', value: 'All' },
    { label: 'Basics (5 Hours)', value: 'Basics' },
    { label: 'Essentials (Core)', value: 'Essentials' },
    { label: 'Diplomas', value: 'Diploma' },
    { label: 'Executive Diplomas', value: 'Executive' },
    { label: 'MBA Essentials', value: 'MBA' }
  ];

  const getCourseLevel = (title) => {
    const t = title.toLowerCase();
    if (t.includes('basics of') || t.includes('basics in')) return 'Basics';
    if (t.includes('executive diploma')) return 'Executive';
    if (t.includes('diploma')) return 'Diploma';
    if (t.includes('essentials of') || t.includes('essentials in') || t.includes('essential')) return 'Essentials';
    if (t.includes('mba essential') || t.includes('mba')) return 'MBA';
    return 'Other';
  };

  const allCourses = useMemo(() => {
    const list = [];
    const seen = new Set();
    coursesData.sections.forEach(section => {
      section.courses.forEach(course => {
        const uniqueKey = `${course.title}-${course.duration}`;
        if (!seen.has(uniqueKey)) {
          seen.add(uniqueKey);
          list.push({
            ...course,
            level: getCourseLevel(course.title),
            sectionName: section.section_name
          });
        }
      });
    });
    return list;
  }, []);

  const filteredCourses = useMemo(() => {
    return allCourses.filter(course => {
      const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase());
      let matchesFilter = true;
      if (selectedFilter !== 'All') {
        matchesFilter = course.level === selectedFilter;
      }
      return matchesSearch && matchesFilter;
    });
  }, [allCourses, searchTerm, selectedFilter]);

  const isBrowsingAll = searchTerm !== '' || selectedFilter !== 'All';

  const getGradientHeader = (title) => {
    const colors = [
      'linear-gradient(135deg, #6366f1 0%, #a855f7 100%)', // Indigo/Purple (Pearlescent)
      'linear-gradient(135deg, #FF6B6B 0%, #FF8E53 100%)', // Sunset
      'linear-gradient(135deg, #06b6d4 0%, #3b82f6 100%)', // Cyan/Blue
      'linear-gradient(135deg, #10b981 0%, #059669 100%)', // Mint/Emerald
      'linear-gradient(135deg, #ec4899 0%, #f43f5e 100%)', // Rose
    ];
    let sum = 0;
    for (let i = 0; i < title.length; i++) {
      sum += title.charCodeAt(i);
    }
    return colors[sum % colors.length];
  };

  const getCourseIcon = (title) => {
    const t = title.toLowerCase();
    if (t.includes('excel') || t.includes('data') || t.includes('analytics') || t.includes('sql')) {
      return <Grid size={22} color="#fff" />;
    }
    if (t.includes('python') || t.includes('machine learning') || t.includes('artificial intelligence') || t.includes('chatgpt') || t.includes('it')) {
      return <PlayCircle size={22} color="#fff" />;
    }
    return <BookOpen size={22} color="#fff" />;
  };

  return (
    <section id="courses" style={{ 
      padding: '100px 0', 
      borderTop: '1px solid var(--border-subtle)', 
      background: 'var(--bg-deep)',
      position: 'relative'
    }}>
      
      {/* Background glow overlay */}
      <div className="glow-bubble" style={{
        top: '20%',
        left: '20%',
        width: '400px',
        height: '400px',
        background: 'rgba(99, 102, 241, 0.03)'
      }} />

      <div className="container">
        
        {/* Section Header */}
        <div style={{ textAlign: 'center', marginBottom: '56px' }}>
          <span style={{
            fontSize: '0.8rem',
            fontWeight: '800',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            color: 'var(--secondary-neon)',
            background: 'rgba(6, 182, 212, 0.08)',
            padding: '6px 14px',
            borderRadius: '99px'
          }}>
            AXLO CATALOG
          </span>
          <h2 style={{ fontSize: '2.5rem', marginTop: '20px', marginBottom: '16px' }}>
            Choose Your Upskilling Path
          </h2>
          <p style={{ color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto' }}>
            Select from our curriculum of free professional certifications. Study bite-sized courses designed by industry experts.
          </p>
        </div>

        {/* Filter controls */}
        <div style={{ 
          background: 'var(--bg-white)',
          border: '1px solid var(--border-subtle)',
          borderRadius: '20px',
          padding: '24px',
          marginBottom: '48px',
          boxShadow: 'var(--shadow-md)'
        }}>
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            gap: '24px',
            flexWrap: 'wrap'
          }}>
            
            {/* Filter buttons */}
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              {filters.map((f) => (
                <button
                  key={f.value}
                  onClick={() => setSelectedFilter(f.value)}
                  style={{
                    background: selectedFilter === f.value ? 'linear-gradient(135deg, var(--primary-neon) 0%, var(--primary-neon-hover) 100%)' : 'rgba(15, 23, 42, 0.02)',
                    border: '1px solid ' + (selectedFilter === f.value ? 'transparent' : 'var(--border-subtle)'),
                    color: selectedFilter === f.value ? '#fff' : 'var(--text-secondary)',
                    padding: '10px 20px',
                    borderRadius: '10px',
                    fontFamily: 'var(--font-heading)',
                    fontWeight: '700',
                    fontSize: '0.85rem',
                    cursor: 'pointer',
                    transition: 'var(--transition-smooth)'
                  }}
                  className={selectedFilter !== f.value ? 'filter-hover-btn' : ''}
                >
                  {f.label}
                </button>
              ))}
            </div>

            {/* Search Input */}
            <div style={{ position: 'relative', width: '320px' }} className="search-wrapper">
              <span style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', display: 'flex', color: 'var(--text-muted)' }}>
                <Search size={18} />
              </span>
              <input
                type="text"
                placeholder="Search courses..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{
                  width: '100%',
                  background: 'var(--bg-deep)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: '10px',
                  padding: '12px 16px 12px 44px',
                  color: 'var(--text-primary)',
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.9rem',
                  outline: 'none',
                  transition: 'var(--transition-smooth)'
                }}
                className="search-input-box"
              />
            </div>

          </div>
        </div>

        {/* Dynamic content rendering */}
        {isBrowsingAll ? (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
              <div style={{ fontSize: '1.1rem', fontWeight: '800' }}>
                Found <span style={{ color: 'var(--primary-neon)' }}>{filteredCourses.length}</span> specializations
              </div>
            </div>
            {filteredCourses.length > 0 ? (
              <div style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(4, 1fr)', 
                gap: '32px' 
              }} className="courses-grid perspective-container">
                {filteredCourses.map((course, idx) => (
                  <CourseCard 
                    key={idx} 
                    course={course} 
                    getGradientHeader={getGradientHeader}
                    getCourseIcon={getCourseIcon}
                    onCourseEnrol={onCourseEnrol}
                  />
                ))}
              </div>
            ) : (
              <div style={{ textAlign: 'center', padding: '80px 24px', background: 'var(--bg-white)', border: '1px solid var(--border-subtle)', borderRadius: '20px', boxShadow: 'var(--shadow-md)' }}>
                <Layers size={40} style={{ color: 'var(--text-muted)', marginBottom: '16px' }} />
                <h3 style={{ marginBottom: '8px' }}>No Courses Found</h3>
                <p style={{ color: 'var(--text-secondary)' }}>Try adjusting your search terms or active level filter.</p>
              </div>
            )}
          </div>
        ) : (
          /* Render by Section mapping UniAthena layout */
          <div style={{ display: 'flex', flexDirection: 'column', gap: '80px' }}>
            {coursesData.sections
              .filter(sec => sec.courses.length > 0)
              .map((section, secIdx) => (
                <div key={secIdx}>
                  <div style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'baseline', 
                    marginBottom: '28px',
                    borderBottom: '1px solid var(--border-subtle)',
                    paddingBottom: '14px'
                  }}>
                    <h3 style={{ fontSize: '1.7rem', color: 'var(--text-primary)', fontWeight: '800' }}>
                      {section.section_name}
                    </h3>
                    <div style={{ fontSize: '0.85rem', color: 'var(--primary-neon)', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                      {section.courses.length} Specializations
                    </div>
                  </div>
                  
                  <div style={{ 
                    display: 'grid', 
                    gridTemplateColumns: 'repeat(4, 1fr)', 
                    gap: '32px' 
                  }} className="courses-grid perspective-container">
                    {section.courses.map((course, courseIdx) => (
                      <CourseCard 
                        key={courseIdx} 
                        course={course} 
                        getGradientHeader={getGradientHeader}
                        getCourseIcon={getCourseIcon}
                        onCourseEnrol={onCourseEnrol}
                      />
                    ))}
                  </div>
                </div>
              ))}
          </div>
        )}

      </div>

      <style dangerouslySetInnerHTML={{__html: `
        .filter-hover-btn:hover {
          background: rgba(99, 102, 241, 0.05) !important;
          border-color: rgba(99, 102, 241, 0.2) !important;
          color: var(--primary-neon) !important;
        }
        .search-input-box:focus {
          border-color: var(--primary-neon) !important;
          background: var(--bg-white) !important;
          box-shadow: var(--shadow-md) !important;
        }
        @media (max-width: 1200px) {
          .courses-grid { grid-template-columns: repeat(3, 1fr) !important; }
        }
        @media (max-width: 991px) {
          .courses-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .search-wrapper { width: 100% !important; }
        }
        @media (max-width: 576px) {
          .courses-grid { grid-template-columns: 1fr !important; }
        }
      `}} />
    </section>
  );
}

// Subcomponent CourseCard (with 3D tilt styling and progress mock)
function CourseCard({ course, getGradientHeader, getCourseIcon, onCourseEnrol }) {
  return (
    <div className="glass-panel tilt-card-3d" style={{ 
      overflow: 'hidden', 
      display: 'flex', 
      flexDirection: 'column',
      height: '100%',
      position: 'relative',
      background: 'var(--bg-white)',
      border: '1px solid var(--border-subtle)'
    }}>
      
      {/* Course Image / Visual Gradient */}
      <div style={{ 
        height: '140px', 
        background: getGradientHeader(course.title),
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px'
      }}>
        {/* Diagonal stripes decor */}
        <div style={{
          position: 'absolute',
          top: 0, left: 0, right: 0, bottom: 0,
          background: 'repeating-linear-gradient(45deg, rgba(255, 255, 255, 0.04), rgba(255, 255, 255, 0.04) 10px, transparent 10px, transparent 20px)'
        }} />
        
        <div style={{ 
          background: 'rgba(0, 0, 0, 0.15)', 
          backdropFilter: 'blur(6px)',
          borderRadius: '14px',
          padding: '12px',
          zIndex: 2,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          boxShadow: '0 8px 32px rgba(0,0,0,0.1)'
        }}>
          {getCourseIcon(course.title)}
        </div>

        {/* Free Badge */}
        <span style={{
          position: 'absolute',
          top: '12px',
          right: '12px',
          background: 'var(--bg-white)',
          border: '1px solid var(--border-subtle)',
          color: course.badge === 'Free Certificate' ? 'var(--accent-rose)' : 'var(--primary-neon)',
          fontSize: '0.65rem',
          fontWeight: '800',
          padding: '4px 10px',
          borderRadius: '99px',
          textTransform: 'uppercase',
          letterSpacing: '0.05em',
          boxShadow: 'var(--shadow-sm)',
          zIndex: 3
        }}>
          {course.badge}
        </span>
      </div>

      {/* Course Body */}
      <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
        
        <span style={{ fontSize: '0.7rem', fontWeight: '800', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '8px', display: 'block' }}>
          {course.level} Specialization
        </span>

        <h4 style={{ 
          fontSize: '1.05rem', 
          lineHeight: '1.4', 
          fontWeight: '800', 
          marginBottom: '16px',
          color: 'var(--text-primary)',
          fontFamily: 'var(--font-heading)',
          flexGrow: 1
        }}>
          {course.title}
        </h4>

        {/* Course Progress Indicator Mock (worth $100K) */}
        <div style={{ marginBottom: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.7rem', color: 'var(--text-muted)', fontWeight: '600', marginBottom: '6px' }}>
            <span>Portal Material</span>
            <span>100% Free Lectures</span>
          </div>
          <div style={{ width: '100%', height: '4px', background: '#f1f5f9', borderRadius: '99px', overflow: 'hidden' }}>
            <div style={{ width: '100%', height: '100%', background: 'linear-gradient(90deg, var(--primary-neon) 0%, var(--secondary-neon) 100%)' }} />
          </div>
        </div>

        {/* Duration Meta & Button */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid #f1f5f9', paddingTop: '16px' }}>
          
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '6px', 
            color: 'var(--text-secondary)',
            fontSize: '0.8rem',
            fontWeight: '700'
          }}>
            <Clock size={14} color="var(--primary-neon)" />
            <span>{course.duration}</span>
          </div>

          <button 
            onClick={() => onCourseEnrol(course)}
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--primary-neon)',
              fontFamily: 'var(--font-heading)',
              fontWeight: '800',
              fontSize: '0.85rem',
              cursor: 'pointer',
              transition: 'var(--transition-smooth)',
              display: 'flex',
              alignItems: 'center',
              gap: '4px'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = 'var(--primary-neon-hover)';
              e.currentTarget.style.transform = 'translateX(2px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = 'var(--primary-neon)';
              e.currentTarget.style.transform = 'translateX(0)';
            }}
          >
            Start Now <ArrowRight size={14} />
          </button>

        </div>

      </div>

    </div>
  );
}
