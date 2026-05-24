import React, { useState, useMemo } from 'react';
import { Search, Clock, Award, BookOpen, Layers, PlayCircle, Grid } from 'lucide-react';
import coursesData from '../coursesData.json';

export default function CourseExplorer({ onCourseEnrol }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('All');

  // Categories list
  const filters = [
    { label: 'All Courses', value: 'All' },
    { label: 'Basics (5 Hours)', value: 'Basics' },
    { label: 'Essentials (Core Concepts)', value: 'Essentials' },
    { label: 'Diplomas', value: 'Diploma' },
    { label: 'Executive Diplomas', value: 'Executive' },
    { label: 'MBA Essentials', value: 'MBA' }
  ];

  // Helper to check what level a course belongs to
  const getCourseLevel = (title) => {
    const t = title.toLowerCase();
    if (t.includes('basics of') || t.includes('basics in')) return 'Basics';
    if (t.includes('executive diploma')) return 'Executive';
    if (t.includes('diploma')) return 'Diploma';
    if (t.includes('essentials of') || t.includes('essentials in') || t.includes('essential')) return 'Essentials';
    if (t.includes('mba essential') || t.includes('mba')) return 'MBA';
    return 'Other';
  };

  // Compile all courses flattened for search & filter views
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

  // Filter and search computation
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

  // Check if search or filter is active
  const isBrowsingAll = searchTerm !== '' || selectedFilter !== 'All';

  // Helper to generate a unique gradient background for course cards
  const getGradientHeader = (title) => {
    const colors = [
      'linear-gradient(135deg, #4f46e5 0%, #3b82f6 100%)', // Indigo/Blue
      'linear-gradient(135deg, #7c3aed 0%, #db2777 100%)', // Violet/Pink
      'linear-gradient(135deg, #0d9488 0%, #059669 100%)', // Teal/Emerald
      'linear-gradient(135deg, #ea580c 0%, #e11d48 100%)', // Orange/Rose
      'linear-gradient(135deg, #2563eb 0%, #06b6d4 100%)', // Blue/Cyan
    ];
    let sum = 0;
    for (let i = 0; i < title.length; i++) {
      sum += title.charCodeAt(i);
    }
    return colors[sum % colors.length];
  };

  // Icon chooser
  const getCourseIcon = (title) => {
    const t = title.toLowerCase();
    if (t.includes('excel') || t.includes('data') || t.includes('analytics') || t.includes('sql')) {
      return <Grid size={24} color="#fff" />;
    }
    if (t.includes('python') || t.includes('machine learning') || t.includes('artificial intelligence') || t.includes('chatgpt') || t.includes('it')) {
      return <PlayCircle size={24} color="#fff" />;
    }
    return <BookOpen size={24} color="#fff" />;
  };

  return (
    <section id="courses" style={{ padding: '80px 0', borderTop: '1px solid var(--border-subtle)', position: 'relative' }}>
      <div className="container">
        
        {/* Section Header */}
        <div style={{ textAlign: 'center', marginBottom: '56px' }}>
          <h2 style={{ fontSize: '2.5rem', marginBottom: '16px' }}>
            Choose Your Upskilling Path
          </h2>
          <p style={{ color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto' }}>
            Select from our catalog of free certifications. No commitment, self-paced learning.
          </p>
        </div>

        {/* Filter controls */}
        <div style={{ 
          background: 'rgba(17, 24, 39, 0.4)',
          border: '1px solid var(--border-subtle)',
          borderRadius: '16px',
          padding: '20px',
          marginBottom: '40px',
          backdropFilter: 'var(--glass-blur)'
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
                    background: selectedFilter === f.value ? 'linear-gradient(135deg, var(--primary-neon) 0%, #7c3aed 100%)' : 'rgba(255,255,255,0.03)',
                    border: '1px solid ' + (selectedFilter === f.value ? 'rgba(255,255,255,0.1)' : 'var(--border-subtle)'),
                    color: selectedFilter === f.value ? '#fff' : 'var(--text-secondary)',
                    padding: '8px 16px',
                    borderRadius: '8px',
                    fontFamily: 'var(--font-heading)',
                    fontWeight: '600',
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
                  background: 'rgba(255, 255, 255, 0.02)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: '10px',
                  padding: '10px 16px 10px 44px',
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
              <div style={{ fontSize: '1.1rem', fontWeight: '600' }}>
                Found <span style={{ color: 'var(--primary-neon-hover)' }}>{filteredCourses.length}</span> courses
              </div>
              {selectedFilter !== 'All' && (
                <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                  Level: {selectedFilter}
                </div>
              )}
            </div>
            {filteredCourses.length > 0 ? (
              <div style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(4, 1fr)', 
                gap: '24px' 
              }} className="courses-grid">
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
              <div style={{ textAlign: 'center', padding: '80px 24px', background: 'var(--bg-card)', border: '1px solid var(--border-subtle)', borderRadius: '16px' }}>
                <Layers size={40} style={{ color: 'var(--text-muted)', marginBottom: '16px' }} />
                <h3 style={{ marginBottom: '8px' }}>No Courses Found</h3>
                <p style={{ color: 'var(--text-secondary)' }}>Try adjusting your search terms or active level filter.</p>
              </div>
            )}
          </div>
        ) : (
          /* Render by Section mapping UniAthena layout */
          <div style={{ display: 'flex', flexDirection: 'column', gap: '64px' }}>
            {coursesData.sections
              .filter(sec => sec.courses.length > 0)
              .map((section, secIdx) => (
                <div key={secIdx}>
                  <div style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'baseline', 
                    marginBottom: '24px',
                    borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
                    paddingBottom: '12px'
                  }}>
                    <h3 style={{ fontSize: '1.6rem', color: 'var(--text-primary)' }}>
                      {section.section_name}
                    </h3>
                    <div style={{ fontSize: '0.85rem', color: 'var(--primary-neon-hover)', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                      {section.courses.length} Specializations
                    </div>
                  </div>
                  
                  <div style={{ 
                    display: 'grid', 
                    gridTemplateColumns: 'repeat(4, 1fr)', 
                    gap: '24px' 
                  }} className="courses-grid">
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
          background: rgba(255, 255, 255, 0.08) !important;
          border-color: rgba(255, 255, 255, 0.2) !important;
          color: #fff !important;
        }
        .search-input-box:focus {
          border-color: var(--primary-neon) !important;
          box-shadow: 0 0 15px rgba(139, 92, 246, 0.15) !important;
          background: rgba(255, 255, 255, 0.04) !important;
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

// Subcomponent CourseCard
function CourseCard({ course, getGradientHeader, getCourseIcon, onCourseEnrol }) {
  return (
    <div className="glass-panel glass-panel-hover" style={{ 
      overflow: 'hidden', 
      display: 'flex', 
      flexDirection: 'column',
      height: '100%',
      position: 'relative'
    }}>
      
      {/* Course Image / Visual Gradient */}
      <div style={{ 
        height: '130px', 
        background: getGradientHeader(course.title),
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px'
      }}>
        {/* Diagonal stripes decor */}
        <div style={{
          position: 'absolute',
          top: 0, left: 0, right: 0, bottom: 0,
          background: 'repeating-linear-gradient(45deg, rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.05) 10px, transparent 10px, transparent 20px)'
        }} />
        
        <div style={{ 
          background: 'rgba(0, 0, 0, 0.25)', 
          backdropFilter: 'blur(4px)',
          borderRadius: '12px',
          padding: '12px',
          zIndex: 2,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          border: '1px solid rgba(255, 255, 255, 0.1)'
        }}>
          {getCourseIcon(course.title)}
        </div>

        {/* Free Badge */}
        <span style={{
          position: 'absolute',
          top: '12px',
          right: '12px',
          background: 'rgba(8, 11, 17, 0.75)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          color: course.badge === 'Free Certificate' ? 'var(--secondary-neon)' : 'var(--primary-neon-hover)',
          fontSize: '0.7rem',
          fontWeight: '700',
          padding: '4px 10px',
          borderRadius: '99px',
          textTransform: 'uppercase',
          letterSpacing: '0.05em',
          backdropFilter: 'blur(4px)',
          zIndex: 3
        }}>
          {course.badge}
        </span>
      </div>

      {/* Course Body */}
      <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
        <h4 style={{ 
          fontSize: '1rem', 
          lineHeight: '1.4', 
          fontWeight: '700', 
          marginBottom: '12px',
          fontFamily: 'var(--font-heading)',
          flexGrow: 1
        }}>
          {course.title}
        </h4>

        {/* Duration Meta */}
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: '8px', 
          color: 'var(--text-secondary)',
          fontSize: '0.8rem',
          fontWeight: '600',
          marginBottom: '16px'
        }}>
          <Clock size={14} color="var(--primary-neon)" />
          <span>{course.duration}</span>
        </div>

        {/* CTA Enrol */}
        <button 
          onClick={() => onCourseEnrol(course)}
          style={{
            width: '100%',
            background: 'rgba(255,255,255,0.03)',
            border: '1px solid var(--border-subtle)',
            color: '#fff',
            borderRadius: '10px',
            padding: '10px',
            fontFamily: 'var(--font-heading)',
            fontWeight: '600',
            fontSize: '0.85rem',
            cursor: 'pointer',
            transition: 'var(--transition-smooth)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '6px'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'linear-gradient(135deg, var(--primary-neon) 0%, #7c3aed 100%)';
            e.currentTarget.style.borderColor = 'transparent';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'rgba(255,255,255,0.03)';
            e.currentTarget.style.borderColor = 'var(--border-subtle)';
          }}
        >
          Start Now
        </button>

      </div>

    </div>
  );
}
