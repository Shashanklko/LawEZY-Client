import React from 'react';
import { useNavigate } from 'react-router-dom';
import './ExpertCard.css';

const ExpertCard = ({ expert, onViewProfile }) => {
  return (
    <div className="expert-card-v2" onClick={() => onViewProfile(expert.id)}>
      <div className="card-header">
        <div className="avatar-wrapper">
          <img src={expert.avatar || 'https://via.placeholder.com/100'} alt={expert.name} />
          <span className={`status-dot ${expert.online ? 'online' : 'offline'}`}></span>
        </div>
        <div className="expert-meta-header">
          <div className="title-exp-row">
            <span className="expert-title">{expert.title}</span>
            <span className="expert-experience">• {expert.experience} Exp</span>
          </div>
          <h3 className="expert-name">{expert.name}</h3>
        </div>
        <div className="expert-rating">
          <span className="star">★</span>
          <span className="rating-num">{expert.rating}</span>
        </div>
      </div>
      
      <div className="card-body">
        <p className="expert-bio-short">{expert.bioSmall || 'Specialized in multi-jurisdictional compliance and corporate law strategy.'}</p>
        <div className="expert-domains-tags">
          {expert.domains.slice(0, 2).map(domain => (
            <span key={domain} className="domain-chip">{domain}</span>
          ))}
          {expert.domains.length > 2 && <span className="domain-chip plus">+{expert.domains.length - 2} More</span>}
        </div>
      </div>

      <div className="card-footer">
        <div className="price-info">
          <span className="price-label">Starts from</span>
          <span className="price-value">₹{expert.price} <span>/ session</span></span>
        </div>
        <div className="expert-card-actions">
          <button className="btn-connect-expert-small">View Profile →</button>
          <button 
            className="btn-send-message-small"
            onClick={(e) => {
              e.stopPropagation();
              alert('Messaging feature coming soon!');
            }}
          >
            Send Message (₹50)
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExpertCard;
