import React from 'react';
import './AIFeature.css';

const AIFeature = () => {
  return (
    <section className="ai-showcase">
      <div className="ai-container">
        <div className="ai-content">
          <span className="ai-badge">Flagship Technology</span>
          <h2 className="ai-title">Lawino<span className="brand-dot">.</span>ai</h2>
          <p className="ai-definition">
            Lawino<span className="brand-dot">.</span>ai is your autonomous 24/7 intelligence core for Legal & Financial clarity.
            It resolves complex queries, explains uploaded documents, and matches you with
            top-tier advocates and CAs for 1-on-1 strategic consultation.
          </p>

          <div className="ai-action-row">
            <button className="btn-ai-launch">
              Try Lawino<span className="brand-dot">.</span>ai
            </button>
          </div>
        </div>

        <div className="ai-preview-window">
          <div className="window-header">
            <div className="dots"><span></span><span></span><span></span></div>
            <div className="address-bar">lawino<span className="brand-dot">.</span>ai/workspace</div>
          </div>
          <div className="window-body">
            <div className="chat-bubble user">
              <div className="user-author">
                <span className="user-tag">User</span>
              </div>
              <p>Analyze my Mumbai Lease agreement and suggest a Senior Advocate specializing in Real Estate.</p>
            </div>

            <div className="chat-bubble ai">
              <div className="ai-author">
                <div className="ai-le-icon">Lawino.ai</div>
              </div>
              <p>I've identified Clause 12.4 (Indemnity) as a critical red flag—it exceeds market standards for Mumbai. To resolve this, I've matched you with our top-rated senior specialist for an immediate consultation.</p>
              
              <div className="expert-profile-mini">
                <div className="expert-avatar">RV</div>
                <div className="expert-details">
                  <span className="expert-name">Adv. Rajiv Verma</span>
                  <span className="expert-specialization">Senior Real Estate Advocate • 4.9 ★</span>
                </div>
                <button className="btn-message-expert">Message →</button>
              </div>
            </div>
          </div>

          <div className="ai-search-bar-wrapper">
            <div className="ai-search-bar">
               <div className="search-icon">🔍</div>
               <span className="search-placeholder">Ask your Queries....</span>
               <div className="send-arrow">→</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AIFeature;
