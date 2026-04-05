import React from 'react';
import { Link } from 'react-router-dom';
import './Login.css';

const Login = () => {
  const [role, setRole] = React.useState('client');

  return (
    <div className="login-page">
      <div className="login-overlay"></div>
      
      {/* DYNAMIC MESH BACKDROP */}
      <div className="mesh-bg-container">
        <div className="mesh-ball ball-1"></div>
        <div className="mesh-ball ball-2" style={{ background: role === 'pro' ? '#8B5A2B' : '#7F1D1D' }}></div>
        <div className="mesh-ball ball-3"></div>
      </div>

      {/* FLOAT EXIT BUTTON */}
      <Link to="/" className="portal-exit-btn stagger-reveal">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
      </Link>

      <div className="login-content-wrapper">
        {/* LEFT SIDE: HERO CONTENT */}
        <div className="login-hero-section">
          <h1 className="hero-login-title" style={{ fontSize: '5.5rem', marginBottom: '16px' }}>Welcome<br />Back.</h1>
          <p className="hero-login-desc" style={{ fontSize: '1.25rem', opacity: '0.9', fontWeight: '500', lineHeight: '1.6', maxWidth: '500px' }}>
            <Link to="/" className="hero-brand-link">
              <span style={{ color: role === 'pro' ? '#8B5A2B' : '#7F1D1D', fontWeight: '800' }}>LAWEZY</span>
            </Link> provide you platform to find expert to help you,
            and for professionals to reach the clients who need them.
          </p>
        </div>

        {/* RIGHT SIDE: GLASS FORM */}
        <div className="login-form-section">
          <div className="glass-login-card">
            {/* ROLE SELECTOR */}
            <div className={`role-selector stagger-reveal delay-1 ${role}`}>
              <div 
                className={`role-option ${role === 'client' ? 'active' : ''}`} 
                onClick={() => setRole('client')}
              >
                Clients
              </div>
              <div 
                className={`role-option ${role === 'pro' ? 'active' : ''}`} 
                onClick={() => setRole('pro')}
              >
                Professionals
              </div>
              <div className="role-pill"></div>
            </div>

            <form className="login-form" onSubmit={(e) => e.preventDefault()}>
              <div className="login-group stagger-reveal delay-2">
                <label className="login-label">Email or Phone Number</label>
                <div className="input-with-icon">
                  <input type="text" className="login-input" placeholder="Enter email or phone number" required />
                  <div className="input-icon">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                  </div>
                </div>
              </div>

              <div className="login-group stagger-reveal delay-2">
                <label className="login-label">Password</label>
                <div className="input-with-icon">
                  <input 
                    type="password" 
                    className="login-input" 
                    placeholder="••••••••••••" 
                    minLength="8"
                    pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$"
                    title="Password must be at least 8 characters, include at least one uppercase letter, one lowercase letter, one number and one special character."
                    required 
                  />
                  <div className="input-icon">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
                  </div>
                </div>
              </div>

              <div className="login-forgot stagger-reveal delay-3">
                <Link to="/forgot-password" title="Recover your access" className="login-link-subtle">Forgot password?</Link>
              </div>

              <button type="submit" className="btn-login-primary stagger-reveal delay-4">
                <div className="btn-content">
                  <span>Login</span>
                  <svg className="btn-arrow" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                </div>
              </button>

              <p className="login-footer stagger-reveal delay-5">
                Are you new?
                <Link to="/signup" className="login-link-bold">Create an Account</Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
