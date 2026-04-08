import React, { useState, useRef, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isHelpOpen, setIsHelpOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  
  // MOCK AUTH STATE (In real app, this comes from an Auth Context)
  const [isLoggedIn, setIsLoggedIn] = useState(false); 
  const [userRole, setUserRole] = useState('seeker'); // 'seeker' or 'expert'
  
  const location = useLocation();
  const helpRef = useRef(null);
  const notifyRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (helpRef.current && !helpRef.current.contains(event.target)) {
        setIsHelpOpen(false);
      }
      if (notifyRef.current && !notifyRef.current.contains(event.target)) {
        setIsNotificationsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const closeMenu = () => {
    setIsMobileMenuOpen(false);
    setIsHelpOpen(false);
    setIsNotificationsOpen(false);
  };

  return (
    <nav className="navbar-premium glass">
      <div className="section-container nav-content">
        <div className="brand-section">
          <Link to="/" className="brand-link" onClick={closeMenu}>
            <span className="brand-name">LAWEZY</span>
          </Link>
          <div className="brand-divider"></div>
          <Link to="/lawino-ai" className="ai-brand-link" onClick={closeMenu}>
            <div className="ai-brand">
              <span className="ai-name">Lawino.ai</span>
              <span className="ai-tagline">LEGAL & BUSINESS INTELLIGENCE</span>
            </div>
          </Link>
        </div>

        <button 
          className={`mobile-toggle ${isMobileMenuOpen ? 'active' : ''}`}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle Navigation"
        >
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
        </button>

        {/* COMBINED MOBILE MENU WRAPPER */}
        <div className={`nav-menu-wrapper ${isMobileMenuOpen ? 'mobile-open' : ''}`}>
          <div className="nav-links">
            <Link to="/" className={`nav-link ${location.pathname === '/' ? 'active' : ''}`} onClick={closeMenu}>HOME</Link>
            <Link to="/lawino-ai" className={`nav-link ${location.pathname === '/lawino-ai' ? 'active' : ''}`} onClick={closeMenu}>LAWINO.AI</Link>
            <Link to="/library" className={`nav-link ${location.pathname === '/library' ? 'active' : ''}`} onClick={closeMenu}>LIBRARY</Link>
            <Link to="/experts" className={`nav-link ${location.pathname === '/experts' ? 'active' : ''}`} onClick={closeMenu}>EXPERTS</Link>
            <Link to="/messages" className={`nav-link ${location.pathname === '/messages' ? 'active' : ''}`} onClick={closeMenu}>MESSAGES</Link>
            <Link to="/community" className={`nav-link ${location.pathname === '/community' ? 'active' : ''}`} onClick={closeMenu}>COMMUNITY</Link>
            <Link to="/about" className={`nav-link ${location.pathname === '/about' ? 'active' : ''}`} onClick={closeMenu}>ABOUT</Link>
          </div>

          <div className="nav-actions">
            <div className="nav-help-container" ref={helpRef}>
              <div 
                className={`nav-help ${isHelpOpen ? 'active' : ''}`} 
                onClick={() => setIsHelpOpen(!isHelpOpen)}
              >
                <div className="help-icon-wrapper">
                  <span className="help-text">HELP</span>
                  <span className="help-caret">▼</span>
                </div>
              </div>
              {isHelpOpen && (
                <div className="help-dropdown glass">
                  <Link to="/contact" className="dropdown-item" onClick={closeMenu}>CONTACT US</Link>
                  <Link to="/faq" className="dropdown-item" onClick={closeMenu}>FAQ</Link>
                </div>
              )}
            </div>
            
            {!isLoggedIn ? (
              <>
                <Link to="/login" className="nav-link login-link" onClick={closeMenu}>Login</Link>
                
                <Link to="/signup?role=expert" onClick={closeMenu}>
                  <button className="btn-secondary">Join Us (As Expert)</button>
                </Link>

                <Link to="/signup?role=seeker" onClick={closeMenu}>
                  <button className="btn-premium">Get Consultations</button>
                </Link>
              </>
            ) : (
              <div className="logged-in-actions">
                <div className="nav-notifications-container" ref={notifyRef}>
                  <button 
                    className={`btn-icon-nav ${isNotificationsOpen ? 'active' : ''}`}
                    onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
                  >
                    <span className="notify-bell">🔔</span>
                    <span className="notify-dot"></span>
                  </button>
                  {isNotificationsOpen && (
                    <div className="notifications-dropdown glass">
                      <div className="notify-header">NOTIFICATIONS</div>
                      <div className="notify-list">
                        <div className="notify-empty">No strategic updates yet.</div>
                      </div>
                    </div>
                  )}
                </div>

                {userRole === 'expert' ? (
                  <Link to="/dashboard" onClick={closeMenu}>
                    <button className="btn-secondary">Dashboard</button>
                  </Link>
                ) : (
                  <Link to="/profile" onClick={closeMenu}>
                    <button className="btn-secondary">My Profile</button>
                  </Link>
                )}
                
                <button className="btn-premium" onClick={() => setIsLoggedIn(false)}>Logout</button>
              </div>
            )}
          </div>
        </div>
      </div>

      <style jsx="true">{`
        .navbar-premium {
          background: rgba(255, 255, 255, 0.75);
          backdrop-filter: blur(25px) saturate(180%);
          -webkit-backdrop-filter: blur(25px) saturate(180%);
          border-bottom: 1px solid rgba(127, 29, 29, 0.08);
          height: 70px;
          display: flex;
          align-items: center;
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 2000;
          box-shadow: 0 4px 30px rgba(0, 0, 0, 0.02);
        }
        .nav-content {
          display: flex;
          align-items: center;
          padding: 0 3%;
          width: 100%;
          max-width: 1800px;
          margin: 0 auto;
        }
        .brand-section {
          display: flex;
          align-items: center;
          gap: 28px;
        }
        .brand-link, .ai-brand-link { text-decoration: none; color: inherit; display: block; }
        .brand-name {
          font-family: 'Outfit', sans-serif;
          font-weight: 900;
          font-size: 1.25rem;
          color: var(--accent-burgundy);
          letter-spacing: -0.05em;
        }
        .brand-divider { width: 1px; height: 30px; background: rgba(127, 29, 29, 0.15); }
        .ai-brand { display: flex; flex-direction: column; }
        .ai-name { font-family: 'Outfit', sans-serif; font-weight: 900; font-size: 1rem; color: var(--accent-burgundy); }
        .ai-tagline { font-family: 'Outfit', sans-serif; font-size: 0.55rem; font-weight: 800; color: #8B5A2B; letter-spacing: 0.5px; margin-top: -2px; }

        .nav-menu-wrapper {
          display: flex;
          flex: 1;
          align-items: center;
          justify-content: space-between;
        }

        .nav-links { display: flex; gap: 20px; margin-left: 3rem; }
        .nav-link {
          color: rgba(15, 23, 42, 0.6);
          text-decoration: none;
          font-size: 0.72rem;
          font-weight: 700;
          letter-spacing: 0.5px;
          text-transform: uppercase;
          transition: all 0.3s ease;
        }
        .nav-link:hover { color: var(--accent-burgundy); }
        .nav-link.active { color: var(--accent-burgundy); }

        .nav-help-container { position: relative; }
        .nav-help { 
          text-decoration: none; 
          cursor: pointer;
        }
        .help-icon-wrapper {
          border: 1.5px solid var(--accent-burgundy);
          padding: 2px 10px;
          border-radius: 4px;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          gap: 6px;
        }
        .help-text { font-size: 0.65rem; font-weight: 900; color: var(--accent-burgundy); }
        .help-caret { font-size: 0.5rem; color: var(--accent-burgundy); margin-top: 1px; }
        
        .help-dropdown {
          position: absolute;
          top: 100%;
          right: 0;
          margin-top: 10px;
          min-width: 160px;
          background: rgba(255, 255, 255, 0.95);
          border: 1px solid rgba(127, 29, 29, 0.1);
          border-radius: 8px;
          overflow: hidden;
          box-shadow: 0 10px 40px rgba(0,0,0,0.1);
          z-index: 2100;
          display: flex;
          flex-direction: column;
        }
        .dropdown-item {
          padding: 12px 20px;
          text-decoration: none;
          color: var(--accent-burgundy);
          font-size: 0.68rem;
          font-weight: 800;
          letter-spacing: 0.5px;
          transition: all 0.2s;
        }
        .dropdown-item:hover {
          background: var(--accent-burgundy);
          color: white;
        }
        /* NOTIFICATIONS & LOGGED IN */
        .nav-actions { 
          display: flex; 
          align-items: center; 
          gap: 18px; 
          margin-left: auto; 
        }
        .logged-in-actions { 
          display: flex; 
          align-items: center; 
          gap: 18px; 
        }
        .btn-icon-nav {
          background: transparent;
          border: 1.5px solid rgba(127, 29, 29, 0.1);
          width: 38px;
          height: 38px;
          border-radius: 4px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          position: relative;
        }
        .notify-dot {
          position: absolute;
          top: 8px;
          right: 8px;
          width: 6px;
          height: 6px;
          background: #ef4444;
          border-radius: 50%;
        }
        
        .notifications-dropdown {
          position: absolute;
          top: 100%;
          right: 0;
          margin-top: 10px;
          min-width: 280px;
          background: white;
          border: 1px solid rgba(127, 29, 29, 0.1);
          border-radius: 8px;
          box-shadow: 0 10px 40px rgba(0,0,0,0.1);
          z-index: 2000;
        }
        .notify-header {
          padding: 12px 20px;
          border-bottom: 1px solid #eee;
          font-size: 0.65rem;
          font-weight: 800;
          color: #888;
          letter-spacing: 1px;
        }
        .notify-empty {
          padding: 30px 20px;
          text-align: center;
          font-size: 0.85rem;
          color: #bbb;
        }

        .btn-secondary {
          padding: 8px 16px;
          background: transparent;
          color: var(--accent-burgundy);
          border: 1.5px solid var(--accent-burgundy);
          font-weight: 800;
          font-size: 0.68rem;
          border-radius: 4px;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        .btn-secondary:hover {
          background: rgba(127, 29, 29, 0.05);
        }
        
        .btn-premium {
          padding: 8px 18px;
          background: linear-gradient(135deg, var(--accent-burgundy) 0%, #8B5A2B 100%);
          color: white;
          border: none;
          font-weight: 800;
          font-size: 0.68rem;
          border-radius: 4px;
          cursor: pointer;
          box-shadow: 0 4px 15px rgba(127, 29, 29, 0.15);
          transition: all 0.3s;
        }
        .btn-premium:hover {
          transform: translateY(-1px);
          box-shadow: 0 6px 20px rgba(127, 29, 29, 0.25);
        }

        .mobile-toggle { display: none; }

        @media (max-width: 1200px) {
          .mobile-toggle {
            display: flex;
            flex-direction: column;
            gap: 5px;
            background: transparent;
            border: none;
            cursor: pointer;
            z-index: 2100;
            margin-left: auto;
          }
          .hamburger-line { width: 22px; height: 2px; background: var(--accent-burgundy); transition: 0.3s; }
          .mobile-toggle.active .hamburger-line:nth-child(1) { transform: translateY(7px) rotate(45deg); }
          .mobile-toggle.active .hamburger-line:nth-child(2) { opacity: 0; }
          .mobile-toggle.active .hamburger-line:nth-child(3) { transform: translateY(-7px) rotate(-45deg); }

          .nav-menu-wrapper {
            position: fixed;
            top: 0;
            right: -100%;
            width: 85%;
            max-width: 380px;
            height: 100vh;
            background: rgba(255, 255, 255, 0.98);
            backdrop-filter: blur(20px);
            flex-direction: column;
            padding: 100px 40px;
            box-shadow: -10px 0 30px rgba(0,0,0,0.1);
            transition: 0.4s cubic-bezier(0.16, 1, 0.3, 1);
            z-index: 2050;
            overflow-y: auto;
            justify-content: flex-start;
            gap: 40px;
          }
          .nav-menu-wrapper.mobile-open { right: 0; }

          .nav-links {
            flex-direction: column;
            width: 100%;
            margin-left: 0;
            gap: 25px;
          }
          .nav-links .nav-link { font-size: 1.1rem; border-bottom: 1px solid rgba(0,0,0,0.05); padding-bottom: 10px; }

          .nav-actions {
            flex-direction: column;
            width: 100%;
            margin-left: 0;
            gap: 15px;
            padding-top: 20px;
            border-top: 2px solid rgba(127, 29, 29, 0.1);
          }
          .nav-actions > *, .nav-actions button { width: 100% !important; text-align: center; }
          .btn-secondary, .btn-premium { font-size: 0.95rem; padding: 14px; }
          .help-icon-wrapper { padding: 12px; border-width: 2px; }
          .help-text { font-size: 0.9rem; }
        }

        @media (max-width: 480px) {
          .brand-divider, .ai-brand-link { display: none; }
          .brand-name { font-size: 1.15rem; }
          .nav-menu-wrapper { width: 100%; max-width: none; }
        }
      `}</style>
    </nav>
  )
}

export default Navbar
