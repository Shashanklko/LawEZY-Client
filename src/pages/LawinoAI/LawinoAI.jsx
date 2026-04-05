import React, { useState, useRef, useEffect } from 'react';
import './LawinoAI.css';

const LawinoAI = () => {
  const [messages, setMessages] = useState([
    { 
      role: 'user', 
      content: "I'm buying a 2BHK in South Delhi, but the builder is delaying possession by 12 months. What are my rights under RERA?" 
    },
    { 
      role: 'ai', 
      content: "Under **RERA Section 18**, you have the right to claim a full refund with interest, or monthly compensation for the delay. I recommend a formal legal notice to the builder as your first strategic step.",
      expert: {
        name: "Adv. Sameer Khan",
        label: "Real Estate Attorney • 15+ Years Experience • 4.9 ★",
        avatar: "SK"
      }
    }
  ]);
  const [input, setInput] = useState('');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [theme, setTheme] = useState('dark');
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 1200);
  const textareaRef = useRef(null);

  // Responsive Detection
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 1200);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleSend = () => {
    setMessages([...messages, { role: 'user', content: input }]);
    setInput('');
    setTimeout(() => {
      setMessages(prev => [...prev, { role: 'ai', content: 'Strategy protocols updated. Identifying absolute risk-mitigation vectors based on LawEZY expert database.' }]);
    }, 1200);
  };

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [input]);

  return (
    <div className={`lawino-ai-container theme-${theme}`}>
      {/* Mobile Sidebar Backdrop */}
      {isMobile && isMobileSidebarOpen && (
        <div className="sidebar-backdrop" onClick={() => setIsMobileSidebarOpen(false)}></div>
      )}

      {/* Strategic Left Sidebar */}
      <aside className={`ai-sidebar ${isSidebarCollapsed ? 'collapsed' : ''} ${isMobile && isMobileSidebarOpen ? 'mobile-open' : ''}`}>
        <button 
          className="sidebar-toggle" 
          onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
        >
          {isSidebarCollapsed ? '→' : '←'}
        </button>

        {/* Mobile-Only Close Button */}
        {isMobile && (
          <button 
            className="mobile-close-btn" 
            onClick={() => setIsMobileSidebarOpen(false)}
            aria-label="Close History"
          >
            ✕
          </button>
        )}

        {(!isSidebarCollapsed || isMobile) && (
          <div className="sidebar-middle">
            <div className="theme-switch-container">
              <button 
                className="theme-switch-btn" 
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              >
                <span className="theme-icon">{theme === 'dark' ? '☀' : '☾'}</span>
                <span>{theme === 'dark' ? 'Switch to Light' : 'Switch to Dark'}</span>
              </button>
            </div>
            
            <div className="sidebar-group">
              <span className="sidebar-label">History</span>
              <div className="history-flow">
                <div className="history-entry">
                  <span className="entry-icon">◈</span>
                  Legal Compliance Audit
                </div>
                <div className="history-entry">
                  <span className="entry-icon">◈</span>
                  Taxation Strategy v2
                </div>
                <div className="history-entry">
                  <span className="entry-icon">◈</span>
                  M&A Risk Assessment
                </div>
                <div className="history-entry">
                  <span className="entry-icon">◈</span>
                  Employment Law Review
                </div>
              </div>
            </div>
          </div>
        )}
        
        {!isSidebarCollapsed && (
          <div className="sidebar-bottom">
            <div className="user-profile-card">
              <div className="profile-avatar">GU</div>
              <div className="profile-meta">
                <span className="profile-name">Guest User</span>
                <span className="profile-badge">Strategic Tier</span>
              </div>
            </div>
          </div>
        )}
      </aside>

      {/* Main Command Workspace */}
      <main className={`ai-workspace ${isSidebarCollapsed ? 'expanded' : ''}`}>
        {/* Mobile Sidebar Trigger */}
        {isMobile && (
          <button 
            className="mobile-sidebar-trigger" 
            onClick={() => setIsMobileSidebarOpen(true)}
            aria-label="Toggle History"
          >
            <span className="history-icon-symbol">◈</span>
            <span className="history-label">HISTORY</span>
          </button>
        )}
        {messages.length === 0 ? (
          <div className="workspace-hero">
            <div className="hero-centerpiece">
              <div className="hero-icon-wrapper">
                <svg className="intelligence-core mini" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle className="core-orbit" cx="50" cy="50" r="45" stroke="currentColor" strokeWidth="0.5" />
                  <path className="core-star" d="M50 15L55 45L85 50L55 55L50 85L45 55L15 50L45 45L50 15Z" fill="currentColor" />
                  <path className="core-star secondary" d="M50 25L53 47L75 50L53 53L50 75L47 53L25 50L47 47L50 25Z" fill="currentColor" opacity="0.5" />
                </svg>
              </div>
              <h1 className="hero-greeting">How can <span className="brand-highlight">Lawino<span className="brand-dot small">.</span>ai Copilot</span> help you today?</h1>
            </div>

            <div className="hero-suggestions">
              <button className="suggestion-box" onClick={() => setInput('Ask a basic legal business query...')}>
                <div className="suggest-header">
                  <span className="suggest-icon">🔍</span>
                  <strong>Basic Query</strong>
                </div>
                <p>Instant answers for legal or business questions.</p>
              </button>
              
              <button className="suggestion-box" onClick={() => setInput('Explain every clause in this document...')}>
                <div className="suggest-header">
                  <span className="suggest-icon">📄</span>
                  <strong>Analyze Clauses</strong>
                </div>
                <p>Upload a document to identify risks and hidden terms.</p>
              </button>
              
              <button className="suggestion-box" onClick={() => setInput('Suggest a Lawyer or CA for my case...')}>
                <div className="suggest-header">
                  <span className="suggest-icon">⚖️</span>
                  <strong>Suggest Expert</strong>
                </div>
                <p>Match with the right specialized Lawyer or CA.</p>
              </button>

              <button className="suggestion-box" onClick={() => setInput('Draft a professional agreement for...')}>
                <div className="suggest-header">
                  <span className="suggest-icon">✍️</span>
                  <strong>Drafting Engine</strong>
                </div>
                <p>Generate high-precision legal and business templates.</p>
              </button>
            </div>
            
            <div className="hero-badge">LawEZY Strategic Agent (v4.6)</div>
          </div>
        ) : (
          <div className="conversation-flow">
            {messages.map((msg, i) => (
              <div key={i} className={`chat-row ${msg.role}`}>
                <div className="chat-bubble">
                  <div className="bubble-sender">{msg.role === 'user' ? 'YOU' : 'LAWINO AI'}</div>
                  <div className="bubble-content">{msg.content}</div>
                  
                  {msg.expert && (
                    <div className="expert-match-notification">
                      <div className="expert-avatar">{msg.expert.avatar}</div>
                      <div className="expert-info">
                        <span className="expert-name">{msg.expert.name}</span>
                        <span className="expert-label">{msg.expert.label}</span>
                      </div>
                      <button className="btn-connect-expert">Connect →</button>
                    </div>
                  )}
                </div>
              </div>
            ))}
            <div className="flow-anchor"></div>
          </div>
        )}

        {/* Sovereign Command Bar */}
        <div className="command-bar-wrapper">
            <div className="command-bar glass-dock">
              <button className="btn-tool-dock" title="Upload Reference Document">
                <span className="icon-sign">+</span>
              </button>

              <textarea 
                ref={textareaRef}
                className="command-textarea" 
                placeholder="Message Lawino Copilot..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSend();
                  }
                }}
                rows={1}
              ></textarea>

              <div className="dock-actions">
                <button className="btn-tool-dock" title="Voice Search">
                  <span className="icon-native">🎤</span>
                </button>
                <button className={`btn-send-dock ${input.trim() ? 'active' : ''}`} onClick={handleSend}>
                  <span className="icon-arrow">↑</span>
                </button>
              </div>
            </div>
            <p className="command-disclaimer">Strategic insights should be verified with matched LawEZY Experts.</p>
        </div>
      </main>
    </div>
  );
};

export default LawinoAI;
