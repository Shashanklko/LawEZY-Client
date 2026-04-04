import React from 'react';
import HeroCarousel from '../features/hero/HeroCarousel';
import ExpertEcosystem from '../features/experts/ExpertEcosystem';
import AIFeature from '../features/ai/AIFeature';
import ResourceHub from '../features/resources/ResourceHub';
import EResources from '../features/resources/EResources';
import CommunityShowcase from '../features/community/CommunityShowcase';
import Footer from '../components/Footer';

const Home = () => {
  return (
    <div className="snapped-container">
      <style jsx="true">{`
        .snapped-container {
          height: 100vh;
          overflow-y: scroll;
          scroll-snap-type: y mandatory;
          scroll-behavior: smooth;
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .snapped-container::-webkit-scrollbar {
          display: none;
        }
        
        section, .hero-container, .footer-premium {
          scroll-snap-align: start;
          scroll-snap-stop: always;
        }
      `}</style>
      {/* SECTION 1: THE SOVEREIGN HERO */}
      <HeroCarousel />

      {/* SECTION 2: THE DUAL PILLARS (LEGAL & CA) */}
      <ExpertEcosystem />

      {/* SECTION 3: THE CROWN JEWEL (LAWINO.AI) */}
      <AIFeature />

      {/* SECTION 4: SOVEREIGN ARCHIVE (E-RESOURCES) */}
      <EResources />

      {/* SECTION 5: WORLD NETWORK & TRUST */}
      <CommunityShowcase />

      {/* SECTION 6: INSTITUTIONAL FOOTER (FINAL SNAP) */}
      <Footer />
    </div>
  );
};

export default Home;
