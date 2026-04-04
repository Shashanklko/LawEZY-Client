import React, { useState, useEffect } from 'react';
import './HeroCarousel.css';

const images = [
  {
    url: '/src/assets/homepage/Gemini_Generated_Image_26oxq626oxq626ox.png',
    title: 'Elite Expert Ecosystem',
    subtitle: 'The strategic bridge connecting ambitious clients with world-class legal and financial expertise. We facilitate direct synergy for absolute professional advantage.',
    cta: 'Consult Our Legal Expert'
  },
  {
    url: '/src/assets/homepage/Gemini_Generated_Image_26oxq626oxq626ox.png',
    title: 'Precision CA & CFA Support',
    subtitle: 'A centralized gateway where sophisticated enterprises meet elite CAs and CFAs. Helping you navigate complex systems with institutional-grade financial strategy.',
    cta: 'Connect with an Expert'
  },
  {
    url: '/src/assets/homepage/Gemini_Generated_Image_fsbtxtfsbtxtfsbt.png',
    title: 'Lawino.ai Legal Copilot',
    subtitle: 'Beyond human expertise, access our 24/7 intelligence core for absolute clarity. Designed to empower both clients and professionals with predictive legal logic.',
    cta: 'Try Lawino.ai'
  }
];

const HeroCarousel = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    }, 10000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="hero-carousel">
      {images.map((img, index) => (
        <div 
          key={index} 
          className={`slide ${index === current ? 'active' : ''}`}
          style={{ backgroundImage: `url(${img.url})` }}
        >
          <div className="overlay">
            <div className="section-container hero-content">
              <h1 className="hero-title">
                {img.title.split(' ').map((word, i) => (
                  <span key={i} className={i === img.title.split(' ').length - 1 ? 'highlight' : ''}>
                    {word}{' '}
                  </span>
                ))}
              </h1>
              <p className="hero-subtitle">{img.subtitle}</p>
              <div className="hero-actions">
                <button className="btn-premium">{img.cta}</button>
              </div>
            </div>
          </div>
        </div>
      ))}
      <div className="carousel-indicators">
        {images.map((_, i) => (
          <span 
            key={i} 
            className={`indicator ${i === current ? 'active' : ''}`}
            onClick={() => setCurrent(i)}
          ></span>
        ))}
      </div>
    </section>
  );
};

export default HeroCarousel;
