import React from 'react'
import { Link, useLocation } from 'react-router-dom'

const Navbar = () => {
  const location = useLocation();
  return (
    <nav className="navbar-premium glass">
      <div className="section-container nav-content">
        <div className="brand-section">
          <Link to="/" className="brand-link">
            <span className="brand-name">LAWEZY</span>
          </Link>
          <div className="brand-divider"></div>
          <Link to="/lawino-ai" className="ai-brand-link">
            <div className="ai-brand">
              <span className="ai-name">Lawino.ai</span>
              <span className="ai-tagline">LEGAL INTELLIGENCE</span>
            </div>
          </Link>
        </div>
        <div className="nav-links">
          <Link to="/" className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}>
            HOME
          </Link>
          <Link to="/lawino-ai" className={`nav-link ${location.pathname === '/lawino-ai' ? 'active' : ''}`}>
            LAWINO.AI
          </Link>
          <Link to="/library" className={`nav-link ${location.pathname === '/library' ? 'active' : ''}`}>
            LIBRARY
          </Link>
          <Link to="/experts" className={`nav-link ${location.pathname === '/experts' ? 'active' : ''}`}>
            EXPERTS
          </Link>
          <Link to="/community" className={`nav-link ${location.pathname === '/community' ? 'active' : ''}`}>
            COMMUNITY
          </Link>
          <Link to="/about" className={`nav-link ${location.pathname === '/about' ? 'active' : ''}`}>
            ABOUT
          </Link>
        </div>
        <div className="nav-actions">
          <Link to="/help" className="nav-help">
            <div className="help-icon-wrapper">
              <span className="help-text">HELP</span>
              <div className="help-tail"></div>
            </div>
          </Link>
          <Link to="/login" className="nav-link login-link">Login</Link>
          <button className="btn-premium">Get Consultations</button>
        </div>
      </div>

      <style jsx="true">{`
        .navbar-premium {
          background: rgba(255, 255, 255, 0.75);
          backdrop-filter: blur(25px) saturate(180%);
          -webkit-backdrop-filter: blur(25px) saturate(180%);
          border-bottom: 1px solid rgba(127, 29, 29, 0.08);
          height: 70px; /* MORE COMPACT FOR DENSITY */
          display: flex;
          align-items: center;
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 2000;
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
          box-shadow: 0 4px 30px rgba(0, 0, 0, 0.02);
        }
        .nav-content {
          display: flex;
          align-items: center;
          padding: 0 5%; /* SLIGHTLY WIDER FOR MORE LINKS */
          width: 100%;
          max-width: 1600px;
          margin: 0 auto;
        }
        .brand {
          text-decoration: none;
        }
        .logo-wrapper {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .logo-svg {
          height: 20px;
          width: auto;
          color: var(--accent-burgundy);
        }
        .brand-section {
          display: flex;
          align-items: center;
          gap: 15px;
        }
        .brand-link, .ai-brand-link {
          text-decoration: none;
          color: inherit;
          display: block;
        }
        .brand-name {
          font-family: 'Outfit', sans-serif;
          font-weight: 900;
          font-size: 1.2rem;
          color: var(--accent-burgundy);
          letter-spacing: -0.05em;
          text-transform: uppercase;
        }
        .brand-divider {
          width: 1px;
          height: 30px;
          background: rgba(127, 29, 29, 0.15);
        }
        .ai-brand {
          display: flex;
          flex-direction: column;
        }
        .ai-name {
          font-family: 'Outfit', sans-serif;
          font-weight: 900;
          font-size: 1rem;
          color: var(--accent-burgundy);
          letter-spacing: -0.04em;
        }
        .ai-tagline {
          font-family: 'Outfit', sans-serif;
          font-size: 0.55rem;
          font-weight: 800;
          color: #8B5A2B;
          letter-spacing: 1.5px;
          margin-top: -2px;
        }
        .nav-links {
          display: flex;
          gap: 25px; /* TIGHTER GAP FOR DENSITY */
          margin-left: 40px;
        }
        .nav-link {
          color: rgba(15, 23, 42, 0.6);
          text-decoration: none;
          font-size: 0.75rem; /* SMALLER FOR DENSITY */
          font-weight: 700;
          letter-spacing: 0.5px;
          text-transform: uppercase;
          transition: all 0.3s ease;
          position: relative;
        }
        .nav-link::after {
          content: '';
          position: absolute;
          bottom: -5px;
          left: 0;
          width: 0;
          height: 2px;
          background: var(--accent-gold);
          transition: width 0.3s ease;
        }
        .nav-link:hover {
          color: var(--accent-burgundy);
        }
        .nav-link:hover::after {
          width: 100%;
        }
        .nav-actions {
          margin-left: auto;
          display: flex;
          align-items: center;
          gap: 20px;
        }
        .nav-help {
          text-decoration: none;
          margin-right: 5px;
        }
        .help-icon-wrapper {
          position: relative;
          border: 1.5px solid var(--accent-burgundy);
          padding: 2px 8px;
          border-radius: 4px;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s ease;
        }
        .help-text {
          font-size: 0.65rem;
          font-weight: 900;
          color: var(--accent-burgundy);
          letter-spacing: 0.5px;
        }
        .help-tail {
          position: absolute;
          bottom: -6px;
          left: 6px;
          width: 0;
          height: 0;
          border-left: 5px solid transparent;
          border-right: 5px solid transparent;
          border-top: 5px solid var(--accent-burgundy);
        }
        .nav-help:hover .help-icon-wrapper {
          background: var(--accent-burgundy);
          transform: translateY(-2px);
        }
        .nav-help:hover .help-text {
          color: white;
        }
        .login-link {
          margin-right: 5px;
        }
        .btn-secondary {
          padding: 8px 18px;
          background: transparent;
          color: var(--accent-burgundy);
          border: 1.5px solid var(--accent-burgundy);
          font-weight: 800;
          font-size: 0.7rem;
          text-transform: uppercase;
          letter-spacing: 1px;
          border-radius: 4px;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        .btn-secondary:hover {
          background: rgba(127, 29, 29, 0.05);
          transform: translateY(-1px);
        }
        .btn-premium {
          padding: 8px 20px;
          background: linear-gradient(135deg, var(--accent-burgundy) 0%, #8B5A2B 100%);
          color: white;
          border: none;
          font-weight: 800;
          font-size: 0.7rem;
          text-transform: uppercase;
          letter-spacing: 1px;
          border-radius: 4px;
          cursor: pointer;
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
          box-shadow: 0 4px 15px rgba(127, 29, 29, 0.15);
        }
        .btn-premium:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(127, 29, 29, 0.25);
        }
      `}</style>
    </nav>
  )
}

export default Navbar
