import React, { useState, useEffect } from 'react';
import './CommunityShowcase.css';

const CommunityShowcase = () => {
  const [startIndex, setStartIndex] = useState(0);

  const allTestimonials = [
    {
      text: "As an out-of-state entrepreneur, LawEZY was the perfect bridge. I met a top Senior Advocate through the interface and discussed my case in minutes without any court queues.",
      author: "James Chen",
      role: "Client",
      avatar: "JC"
    },
    {
      text: "LawEZY allowed me to reach a nationwide client base from my home premises. It's the best approach to grow my legal practice and reach more customers who need specialized help.",
      author: "Sita Iyer",
      role: "Senior Advocate",
      avatar: "SI"
    },
    {
      text: "I avoided physical line-ups at regional offices by connecting to a CA expert through LawEZY. We discussed my trade licensing strategy remotely with zero friction.",
      author: "Rashid Al-Mazroui",
      role: "Client",
      avatar: "RA"
    },
    {
      text: "As a CA, this platform helped me reach triple the clients remotely. It's a much better approach to get high-quality customers without leaving my home premises.",
      author: "Karan Mehta",
      role: "Chartered Accountant",
      avatar: "KM"
    },
    {
      text: "Being a founder means I don't have time for court queues. LawEZY's interface helped me meet and discuss my audit strategy with the right CA expert instantly.",
      author: "Kavita Iyer",
      role: "Client",
      avatar: "KI"
    },
    {
      text: "As a graduation student just entering the field, LawEZY helped me get my first real-world clients. It's my professional bridge to reach customers and solve their problems.",
      author: "Arjun Rao",
      role: "Advocate",
      avatar: "AR"
    }
  ];

  // Stabilized Infinite Loop Logic
  useEffect(() => {
    const timer = setInterval(() => {
      setStartIndex((prev) => (prev + 1) % allTestimonials.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [allTestimonials.length]);

  const getVisibleItems = () => {
    // We double the list to ensure we have enough for a smooth infinite overflow
    return [...allTestimonials, ...allTestimonials];
  };

  return (
    <section className="community-showcase">
      <div className="community-layout">
        <div className="net-intro">
          <h2 className="net-title">The LawEZY <br />Community Network <span className="net-dot">.</span></h2>
          
          <p className="net-desc">
            Building trust through visibility. Our community is a 
            living ecosystem of top-tier legal and financial 
            experts serving thousands daily.
          </p>

          <button className="btn-explore-community">
            Explore Community Network →
          </button>
        </div>

        <div className="testimonial-ticker-wrapper">
          <div className="ticker-label-vertical">SUCCESS STORIES</div>
          <div className="ticker-viewport">
            <div 
                className="ticker-stream"
                style={{ transform: `translateY(-${startIndex * 195}px)` }}
            >
              {getVisibleItems().map((t, idx) => (
                <div 
                  key={idx} 
                  className="testimonial-card ticker-item"
                >
                  <p className="t-text">"{t.text}"</p>
                  <div className="t-author">
                    <div className="t-avatar">{t.avatar}</div>
                    <div className="t-info">
                      <span className="t-name">{t.author}</span>
                      <span className="t-role">{t.role}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CommunityShowcase;
