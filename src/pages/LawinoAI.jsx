import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './LawinoAI.css';

const LawinoAI = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const handleSend = () => {
    if (!input.trim()) return;
    setMessages([...messages, { role: 'user', content: input }]);
    setInput('');
    setTimeout(() => {
      setMessages(prev => [...prev, { role: 'ai', content: 'Strategy protocols updated. Identifying absolute risk-mitigation vectors across global jurisdictions.' }]);
    }, 1500);
  };

  return (
    <div className="lawino-ai-container">
      {/* Strategic Left Sidebar */}
      <aside className={`ai-sidebar ${isSidebarCollapsed ? 'collapsed' : ''}`}>
        <button 
          className="sidebar-toggle" 
          onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
          title={isSidebarCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
        >
          {isSidebarCollapsed ? '→' : '←'}
        </button>

        {!isSidebarCollapsed && (
          <div className="sidebar-top">
            <div className="sidebar-section">
              <span className="section-label">History</span>
              <div className="history-list">
                <div className="history-item">Legal Compliance Audit</div>
                <div className="history-item">Taxation Strategy v2</div>
                <div className="history-item">M&A Risk Assessment</div>
                <div className="history-item">Employment Law Review</div>
              </div>
            </div>
          </div>
        )}
        
        {!isSidebarCollapsed && (
          <div className="sidebar-bottom">
            <div className="sidebar-footer">
              <div className="nav-profile-section">
              <div className="user-avatar-small">GU</div>
              <div className="user-info">
                <span className="user-name">Guest User</span>
                <span className="user-tier">FREE TIER</span>
              </div>
            </div>
            </div>
          </div>
        )}
      </aside>

      {/* Main Command Workspace */}
      <main className="ai-workspace">
        {messages.length === 0 ? (
          <div className="workspace-hero">
            <div className="hero-main-greeting">
              <svg className="intelligence-core mini" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle className="core-orbit" cx="50" cy="50" r="45" stroke="currentColor" strokeWidth="0.5" strokeDasharray="4 4" />
                <path className="core-star" d="M50 15L55 45L85 50L55 55L50 85L45 55L15 50L45 45L50 15Z" fill="currentColor" />
                <path className="core-star secondary" d="M50 25L53 47L75 50L53 53L50 75L47 53L25 50L47 47L50 25Z" fill="currentColor" opacity="0.5" />
                <circle className="core-center" cx="50" cy="50" r="4" fill="currentColor" />
              </svg>
              <h1 className="hero-greeting">How can I help you today?</h1>
            </div>
            <div className="hero-suggestions">
              <button className="suggestion-box">Analyze commercial lease for risks</button>
              <button className="suggestion-box">Review funding round term sheet</button>
              <button className="suggestion-box">Analyze startup compliance status</button>
            </div>
            <div className="hero-badge">Lawino 4.6 (O-1 Logic)</div>
          </div>
        ) : (
          <div className="conversation-flow">
            {messages.map((msg, i) => (
              <div key={i} className={`chat-row ${msg.role}`}>
                <div className="chat-bubble">{msg.content}</div>
              </div>
            ))}
          </div>
        )}

        {/* Global Command Bar */}
        <div className="command-bar-wrapper">
            <div className="command-bar glass">
              <div className="command-left">
                <button className="btn-tool" title="Upload Media (Image, PDF)">
                  <span className="plus">+</span>
                </button>
              </div>

              <textarea 
                className="chat-textarea" 
                placeholder="Ask me any question related to legal or business..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && !e.shiftKey && handleSend()}
              ></textarea>

              <div className="command-right">
                <button className="btn-tool" title="Voice Strategic Analysis">
                  <span className="native-icon">🎤</span>
                </button>
                <button className="btn-send" onClick={handleSend} title="Send Strategic Request">
                  <span className="send-arrow">↑</span>
                </button>
              </div>
            </div>
        </div>
      </main>
    </div>
  );
};

export default LawinoAI;
