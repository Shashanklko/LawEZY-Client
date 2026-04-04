import React from 'react';
import './ExpertEcosystem.css';

const ExpertEcosystem = () => {
  return (
    <section className="expert-immersive">
      {/* Background Texture (Massive Typography) */}
      <div className="bg-text-wrapper left">
        <span className="bg-giant-text">LEGAL</span>
      </div>
      <div className="bg-text-wrapper right">
        <span className="bg-giant-text">FINANCE</span>
      </div>

      <div className="immersive-container">
        {/* Pillar 1: Legal Counsel */}
        <div className="expert-pillar legal-counsel">
          <div className="pillar-overlay"></div>
          <div className="pillar-content">
            <div className="pillar-header">
              <img 
                src="/legal_icon_3d_1775306056559.png" 
                alt="Legal Icon" 
                className="expert-3d-icon" 
              />
              <span className="pillar-tagline">Dual Pillar Ecosystem</span>
              <h2 className="pillar-title">Legal Counsel <span className="accent-dot burgundy">.</span></h2>
            </div>
            
            <p className="pillar-desc">
              Connect with Senior Advocates and Corporate Specialists for 50+ practice areas. 
              High-end legal power, now inclusive for everyone.
            </p>

            <ul className="pillar-features">
              <li>Intellectual Property Law</li>
              <li>Commercial & Civil Litigation</li>
              <li>Family & Personal Legal Services</li>
            </ul>

            <div className="expert-cta-group">
              <button className="btn-primary-pillar">Consult a Specialist</button>
            </div>
          </div>
        </div>

        {/* Pillar 2: Financial Advisory */}
        <div className="expert-pillar financial-hub">
          <div className="pillar-overlay"></div>
          <div className="pillar-content">
            <div className="pillar-header">
              <img 
                src="/finance_icon_3d_1775306080134.png" 
                alt="Finance Icon" 
                className="expert-3d-icon" 
              />
              <span className="pillar-tagline">Strategic Compliance</span>
              <h2 className="pillar-title">Financial Expert <span className="accent-dot blue">.</span></h2>
            </div>
            
            <p className="pillar-desc">
              Expert CAs and CS professionals to manage your compliance, audit, and tax strategy. 
              Corporate excellence for your growing venture.
            </p>

            <ul className="pillar-features">
              <li>GST & Direct Tax Advisory</li>
              <li>Startup Valuation & Audit</li>
              <li>Corporate Strategic Planning</li>
            </ul>

            <div className="expert-cta-group">
              <button className="btn-primary-pillar yellow">Schedule Financial Audit</button>
            </div>
          </div>
        </div>
      </div>

      {/* SOVEREIGN PROVIDER NEXUS (FOR NETWORK PARTNERS) */}
      <div className="floating-partner-banner">
        <div className="banner-txt">
          <h4>Are you a Legal or Financial Professional?</h4>
          <p>Join the world's most elite professional marketplace. Scale your firm with Lawino.ai.</p>
        </div>
        <div className="banner-actions">
          <button className="btn-secondary-outline">Join Expert Network →</button>
        </div>
      </div>
    </section>
  );
};

export default ExpertEcosystem;
