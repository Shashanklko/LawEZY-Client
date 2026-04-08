import React, { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MOCK_EXPERTS } from './mockExperts';
import './ExpertProfile.css';

const ExpertProfile = ({ expertId, isModal }) => {
  const { id: paramId } = useParams();
  const id = expertId || paramId;
  const navigate = useNavigate();
  const [expert, setExpert] = useState(null);
  const [activeTab, setActiveTab] = useState('summary');
  const heroRef = useRef(null);
  const [showStickyBar, setShowStickyBar] = useState(false);

  useEffect(() => {
    if (!isModal) {
      window.scrollTo(0, 0);
    }
    const found = MOCK_EXPERTS.find(ex => ex.id === id);
    if (found) {
      setExpert(found);
    } else if (!isModal) {
      navigate('/experts');
    }
  }, [id, navigate, isModal]);

  useEffect(() => {
    if (!heroRef.current) return;
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        setShowStickyBar(!entry.isIntersecting);
      },
      { threshold: 0.1 }
    );
    
    observer.observe(heroRef.current);
    
    return () => observer.disconnect();
  }, [expert]); // Re-attach if expert loads delayed

  if (!expert) return (
    <div className="loading-state">
      <div className="loader-strategic"></div>
      Initializing Strategic Profile...
    </div>
  );

  return (
    <div className={`expert-profile-page ${isModal ? 'is-in-modal' : ''}`}>
      <div className="profile-hero" ref={heroRef}>
        {!isModal && (
          <button className="btn-back-circle" onClick={() => navigate(-1)} aria-label="Go Back">←</button>
        )}
        
        <div className="profile-hero-content">
          <div className="profile-header-main">
            <div className="profile-avatar-large">
              <div className="avatar-wrapper-elite">
                <img src={expert.avatar} alt={expert.name} />
                <span className={`status-badge ${expert.online ? 'online' : 'offline'}`}>
                  {expert.online ? 'AVAILABLE NOW' : 'OFFLINE'}
                </span>
              </div>
              <div className="expert-stats-row-header">
                <span className="rating-v">★ {expert.rating}</span>
                <span className="rating-l">STRATEGIC RATING</span>
              </div>
            </div>
            
            <div className="profile-info-primary">
              <div className="badge-expert-type">{expert.category} Professional</div>
              <h1>{expert.name}</h1>
              <p className="expert-designation">{expert.title} • {expert.experience} Experience</p>
              
              <div className="expert-meta-markers">
                <span className="marker-item">📍 {expert.location.split(',')[0]}</span>
                <span className="marker-item">⚖️ {expert.primaryCourt}</span>
                <span className="marker-divider">|</span>
                {expert.isVerified ? (
                  <span className="marker-item verified">
                    🛡️ VERIFIED LICENSE: {expert.licenseNo} 
                    <a href="#" className="license-verify-link" onClick={(e) => { e.preventDefault(); alert('Certificate verification coming soon!'); }}>[View Certificate]</a>
                  </span>
                ) : (
                  <span className="marker-item pending-verification">
                    ⏳ LICENSE PENDING VERIFICATION
                  </span>
                )}
              </div>

              <div className="expert-languages-row">
                <span className="lang-label">Languages:</span>
                {expert.languages?.map(lang => (
                  <span key={lang} className="lang-tag">{lang}</span>
                ))}
              </div>

              <div className="profile-actions">
                <button className="btn-primary-consult">Book 1:1 Consultation →</button>
                <button className="btn-secondary-msg">Send Message</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="profile-body-container">
        <nav className="profile-tabs">
          <button className={activeTab === 'summary' ? 'active' : ''} onClick={() => setActiveTab('summary')}>Professional Summary</button>
          <button className={activeTab === 'journey' ? 'active' : ''} onClick={() => setActiveTab('journey')}>Professional Journey</button>
          <button className={activeTab === 'experience' ? 'active' : ''} onClick={() => setActiveTab('experience')}>Experience Snapshot</button>
          <button className={activeTab === 'expertise' ? 'active' : ''} onClick={() => setActiveTab('expertise')}>Specialized Domains</button>
          <button className={activeTab === 'reviews' ? 'active' : ''} onClick={() => setActiveTab('reviews')}>Client Testimonials</button>
        </nav>

        <div className="tab-content">
          {(activeTab === 'summary' || activeTab === 'bio') && (
            <div className="bio-section animate-reveal">
              <div className="bio-split-layout">
                <div className="bio-text-main">
                  <h3>Professional Summary & Strategy</h3>
                  <p>{expert.bioSmall}</p>
                  <p>With a career spanning over a decade, {expert.name} has consistently delivered high-impact results for both corporate entities and individual clients. Specializing in high-stakes strategy and absolute compliance, they are a cornerstone of the LawEZY Elite Network.</p>
                  <p>Their approach is rooted in precision, extreme diligence, and a multi-disciplinary understanding of modern markets. This ensures that every strategic engagement yields measurable, defensible value.</p>
                </div>

                <div className="bio-credentials-sidebar">
                  <div className="credentials-list">
                    <h4>Credentials & Education</h4>
                    <ul>
                      <li>National Law School of India (NLSIU) - LLM</li>
                      <li>Fellow of the Chartered Institute of Arbitrators</li>
                      <li>Strategic Litigation Excellence Award 2024</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="affiliations-section horizontal">
                <h4>Institutional Trust</h4>
                <div className="affiliations-grid">
                  {expert.affiliations?.map(aff => (
                    <div key={aff.name} className="affiliation-badge">
                      <div className="badge-meta">
                        <span>TRUSTED BY</span>
                        <strong>{aff.name}</strong>
                      </div>
                      {aff.verificationLink && (
                        <a 
                          href={aff.verificationLink} 
                          className="badge-verify-lnk"
                          onClick={(e) => { e.preventDefault(); alert('Redirecting to regulatory database...'); }}
                          title="Verify Credential"
                          aria-label="Verify Credential"
                        >
                          ↗
                        </a>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'journey' && (
            <div className="journey-section animate-reveal">
              <h3>Professional Trajectory</h3>
              <div className="career-roadmap">
                <div className="roadmap-timeline">
                  {expert.professionalHistory?.map((job, idx) => (
                    <div key={idx} className="roadmap-item">
                      <div className="roadmap-marker"></div>
                      <div className="roadmap-content">
                        <span className="job-period">{job.period}</span>
                        <strong>{job.role}</strong>
                        <span>{job.org} • {job.status}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'experience' && (
            <div className="experience-section animate-reveal">
              {/* STRATEGIC CASE LOG */}
              {expert.evidence?.cases && (
                <div className="evidence-subsection">
                  <h4 className="evidence-title">Strategic Case Log</h4>
                  <div className="case-log-grid">
                    {expert.evidence.cases.map((cs, idx) => (
                      <div key={idx} className="case-card-elite">
                        <div className="case-card-header">
                          <span className="case-year">{cs.year}</span>
                          <span className="case-outcome">{cs.outcome}</span>
                        </div>
                        <h5>{cs.title}</h5>
                        <p>{cs.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* NEW: ACHIEVEMENT GALLERY */}
              {expert.evidence?.achievements && (
                <div className="evidence-subsection">
                  <h4 className="evidence-title">Awards & Direct Evidence</h4>
                  <div className="achievement-media-grid">
                    {expert.evidence.achievements.map((ach, idx) => (
                      <div key={idx} className="media-card-elite">
                        <div className="media-frame">
                          <img src={ach.url} alt={ach.title} />
                        </div>
                        <span className="media-caption">{ach.title}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* NEW: VIDEO INSIGHTS */}
              {expert.evidence?.videos && (
                <div className="evidence-subsection">
                  <h4 className="evidence-title">Video Strategic Insights</h4>
                  <div className="video-insights-grid">
                    {expert.evidence.videos.map((vid, idx) => (
                      <div key={idx} className="video-card-elite">
                        <div className="video-container-wrapper">
                          <iframe 
                            src={vid.url} 
                            title={vid.title}
                            frameBorder="0" 
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                            allowFullScreen
                          ></iframe>
                        </div>
                        <span className="video-caption">{vid.title}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === 'portfolio' && (
            <div className="portfolio-section animate-reveal">
              <h3>Strategic Service Portfolio</h3>
              <div className="portfolio-grid">
                {expert.servicePortfolio?.map(service => (
                  <div key={service.id} className="service-card-elite">
                    <div className="service-card-header">
                      <strong>{service.title}</strong>
                      <span className="service-price">{service.price}</span>
                    </div>
                    <p>{service.value}</p>
                    <button className="btn-service-inquiry">Inquire Strategically →</button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'expertise' && (
            <div className="expertise-section animate-reveal">
              <h3>Core Specialized Domains</h3>
              <div className="expertise-grid">
                {expert.domains.map(domain => (
                  <div key={domain} className="expertise-item">
                    <span className="check-icon">◈</span>
                    <div className="expertise-text">
                      <strong>{domain}</strong>
                      <p>Institutional-grade counsel and strategic execution in this high-impact domain.</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'reviews' && (
            <div className="reviews-section animate-reveal">
              <div className="reviews-header-group">
                <h3>Verified Client Testimonials</h3>
                <p className="section-subtitle">Direct feedback on strategic execution and professional satisfaction.</p>
              </div>

              <div className="reviews-list-v2">
                {expert.testimonials?.length > 0 ? (
                  expert.testimonials.map((test) => (
                    <div key={test.id} className="review-card-premium">
                      <div className="review-meta-header">
                        <div className="meta-left">
                          <strong className="reviewer-name">{test.clientName}</strong>
                          <span className="review-date">{test.date}</span>
                        </div>
                        <div className="meta-right">
                          <span className="review-rating-star">★ {test.rating}</span>
                        </div>
                      </div>

                      <div className="review-content-single">
                        <p className="review-text-elite">"{test.review}"</p>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="no-reviews-state">
                    <p>No verified reviews for this expert yet. Be among the first to leave feedback after your consultation.</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {showStickyBar && (
        <div className="sticky-action-bar animate-reveal-up">
          <div className="sticky-bar-content">
            <div className="sticky-expert-info">
              <img src={expert.avatar} alt={expert.name} className="sticky-avatar" />
              <div className="sticky-text">
                <strong>{expert.name}</strong>
                <span>{expert.price ? `₹${expert.price}/session` : 'Value-Based Pricing'}</span>
              </div>
            </div>
            <div className="sticky-actions">
              <button className="btn-secondary-msg">Message</button>
              <button className="btn-primary-consult">Book Consultation →</button>
            </div>
          </div>
        </div>
      )}
      
    </div>
  );
};

export default ExpertProfile;
