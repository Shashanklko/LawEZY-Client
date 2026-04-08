import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './Messages.css';

const MOCK_CHATS = [
  {
    id: 1,
    name: 'Adv. Sameer Khanna',
    role: 'Senior Corporate Counsel',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
    lastMessage: 'I have reviewed the shareholder agreement.',
    time: '10:42 AM',
    unread: 2,
    online: true,
    typing: false,
    history: [
      { id: 1, sender: 'me', text: 'Hello, could you review the attached SHA for the upcoming seed round?', time: '09:00 AM', status: 'read' },
      { id: 2, sender: 'expert', text: 'I have reviewed the shareholder agreement.', time: '10:42 AM' },
      { id: 3, sender: 'expert', text: 'There are two exclusionary clauses we need to renegotiate before signing.', time: '10:43 AM' }
    ]
  },
  {
    id: 2,
    name: 'Adv. Priyanka Joshi',
    role: 'Family & Civil Litigator',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop',
    lastMessage: 'typing...',
    time: 'Yesterday',
    unread: 0,
    online: true,
    typing: true,
    history: [
      { id: 1, sender: 'me', text: 'Have you filed the petition yet?', time: 'Yesterday', status: 'read' },
      { id: 2, sender: 'expert', text: 'The petition has been filed successfully.', time: 'Yesterday' }
    ]
  }
];

const Messages = () => {
  const navigate = useNavigate();
  const [chats, setChats] = useState(MOCK_CHATS);
  const [activeChatId, setActiveChatId] = useState(null);
  const [messageText, setMessageText] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('ALL');
  const [showOptionsDropdown, setShowOptionsDropdown] = useState(false);
  const [showChatSearch, setShowChatSearch] = useState(false);
  const [chatSearchQuery, setChatSearchQuery] = useState('');
  const [videoCallActive, setVideoCallActive] = useState(false);
  const [replyingToMsg, setReplyingToMsg] = useState(null);
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  
  const [showMediaModal, setShowMediaModal] = useState(false);
  const [showReportModal, setShowReportModal] = useState(false);
  const [reportReason, setReportReason] = useState('');
  const [reportDetails, setReportDetails] = useState('');
  
  const [activeMessageMenu, setActiveMessageMenu] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTimer, setRecordingTimer] = useState(0);
  const [showApptDropdown, setShowApptDropdown] = useState(false);
  const [showApptModal, setShowApptModal] = useState(false);
  const [showProfCreateModal, setShowProfCreateModal] = useState(false);
  const [showActiveRoomModal, setShowActiveRoomModal] = useState(false);
  const [isKnocking, setIsKnocking] = useState(false);
  const [apptDate, setApptDate] = useState('');
  const [apptTime, setApptTime] = useState('');
  const [apptPrice, setApptPrice] = useState('2500');
  const [userRole, setUserRole] = useState('client'); // For demo purposes
  const [activeMediaTab, setActiveMediaTab] = useState('MEDIA');
  const recordingIntervalRef = useRef(null);
  const fileInputRef = useRef(null);
  
  const chatEndRef = useRef(null);

  const activeChat = chats.find(c => c.id === activeChatId);

  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [chats, activeChatId]);

  const handleChatClick = (id) => {
    setActiveChatId(id);
    setChats(prev => prev.map(chat => chat.id === id ? { ...chat, unread: 0 } : chat));
    setReplyingToMsg(null);
  };

  const handleSendMessage = () => {
    if (messageText.trim() === '') return;
    const newMsg = {
      id: Date.now(),
      sender: 'me',
      text: messageText,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      status: 'delivered'
    };
    
    setChats(prev => prev.map(chat => {
      if (chat.id === activeChatId) {
         return {
            ...chat,
            lastMessage: messageText,
            time: newMsg.time,
            history: [...chat.history, newMsg]
         };
      }
      return chat;
    }));
    setMessageText('');
    setReplyingToMsg(null);
  };

  const handleExportChat = () => {
    if (!activeChat) return;

    let content = `Chat Export with ${activeChat.name}\n`;
    content += `Role: ${activeChat.role || 'Expert'}\n`;
    content += `Date: ${new Date().toLocaleDateString()}\n`;
    content += `==============================================\n\n`;

    activeChat.history.forEach(msg => {
      const senderName = msg.sender === 'me' ? 'You' : activeChat.name;
      content += `[${msg.time}] ${senderName}:\n${msg.text}\n\n`;
    });

    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `Chat_Export_${activeChat.name.replace(/\s+/g, '_')}.txt`);
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    URL.revokeObjectURL(url);
    setShowOptionsDropdown(false);
  };

  const handleNegotiate = (msg, percent) => {
    const currentPrice = parseInt(msg.price);
    const discount = Math.round(currentPrice * (percent / 100));
    const newPrice = currentPrice - discount;
    
    const negotiationMsg = {
      id: Date.now(),
      sender: userRole === 'client' ? 'me' : 'expert',
      type: 'appointment',
      date: msg.date,
      time: msg.time,
      price: newPrice.toString(),
      text: `${userRole === 'client' ? 'Client' : 'Expert'} proposed a ${percent}% price adjustment.`,
      time_sent: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      status: 'sent',
      apptStatus: 'pending'
    };

    setChats(prev => prev.map(c => c.id === activeChatId ? { ...c, history: [...c.history, negotiationMsg] } : c));
  };

  const handleApptAction = (msgId, action) => {
    setChats(prev => prev.map(chat => {
      if (chat.id === activeChatId) {
        return {
          ...chat,
          history: chat.history.map(msg => {
            if (msg.id === msgId) {
              return { ...msg, apptStatus: action };
            }
            return msg;
          })
        };
      }
      return chat;
    }));
    
    if (action === 'accepted') {
       // Mock redirect or payment flow
       setTimeout(() => {
         alert('Strategic payment secure gateway initialized. Redirecting to consultation room...');
       }, 500);
    }
  };

  const filteredChats = chats.filter(chat => {
    if (activeFilter === 'UNREAD' && chat.unread === 0) return false;
    if (activeFilter === 'ARCHIVE' && !chat.isArchived) return false;
    
    if (searchQuery.trim() !== '') {
      return chat.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
             chat.lastMessage.toLowerCase().includes(searchQuery.toLowerCase());
    }
    return true;
  });

  return (
    <div className="messages-page-wrapper">
      <div className="messages-container-elite animate-reveal">
        
        {/* SIDEBAR */}
        <aside className={`messages-sidebar ${activeChatId ? 'mobile-hide' : ''}`}>
          
          <div className="sidebar-brand-header" style={{ padding: '20px 20px', borderBottom: '1px solid rgba(0,0,0,0.06)', display: 'flex', alignItems: 'center', position: 'relative', background: 'rgba(255,255,255,0.4)', minHeight: '70px' }}>
            <button 
              className="msg-back-btn" 
              onClick={() => navigate(-1)}
              title="Go Back"
              aria-label="Go Back"
              style={{ 
                width: '36px', 
                height: '36px', 
                borderRadius: '50%', 
                border: '1px solid rgba(0,0,0,0.15)', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                background: 'rgba(255,255,255,0.8)', 
                cursor: 'pointer', 
                transition: 'all 0.2s',
                color: 'var(--deep-charcoal)',
                position: 'absolute',
                left: '20px'
              }}
              onMouseOver={(e) => { e.currentTarget.style.background = 'white'; e.currentTarget.style.borderColor = 'var(--strategic-gold)'; e.currentTarget.style.color = 'var(--strategic-gold)'; }}
              onMouseOut={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.8)'; e.currentTarget.style.borderColor = 'rgba(0,0,0,0.15)'; e.currentTarget.style.color = 'var(--deep-charcoal)'; }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
            </button>
            <div 
              className="brand-click-area"
              onClick={() => navigate('/')}
              title="Return to Homepage"
              style={{ display: 'flex', alignItems: 'center', gap: '10px', margin: '0 auto' }}
            >
              <div style={{ display: 'flex', alignItems: 'center' }}>
                 <h2 style={{ color: 'var(--accent-burgundy)', fontFamily: 'Outfit, sans-serif', margin: 0, fontSize: '1.25rem', fontWeight: 800, letterSpacing: '-0.3px' }}>LAWEZY</h2>
              </div>
              <div style={{ width: '1px', height: '16px', background: 'rgba(0,0,0,0.15)' }}></div>
              <span style={{ color: '#555', fontWeight: 600, fontSize: '0.75rem', fontFamily: 'Outfit, sans-serif', letterSpacing: '1px', textTransform: 'uppercase' }}>Message Box</span>
            </div>
          </div>

          <div className="sidebar-search-container" style={{ padding: '12px 20px 4px 20px' }}>
            <div className="sidebar-search-box" style={{ 
              display: 'flex', 
              alignItems: 'center', 
              background: 'white', 
              borderRadius: '24px', 
              padding: '10px 15px',
              border: '1px solid rgba(0,0,0,0.1)',
              boxShadow: 'inset 0 1px 4px rgba(0,0,0,0.02)'
            }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
              <input 
                type="text" 
                placeholder="Search chats..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{ 
                  border: 'none', 
                  background: 'transparent', 
                  outline: 'none', 
                  marginLeft: '8px', 
                  fontSize: '0.85rem',
                  width: '100%',
                  color: 'var(--deep-charcoal)',
                  fontFamily: 'inherit'
                }} 
              />
            </div>
          </div>

          <div className="sidebar-header" style={{ padding: '10px 20px 15px 20px', borderBottom: '1px solid rgba(255, 255, 255, 0.5)', display: 'flex' }}>
            <div className="inbox-filter">
              <span className={`filter-pill ${activeFilter === 'ALL' ? 'active' : ''}`} onClick={() => setActiveFilter('ALL')}>All</span>
              <span className={`filter-pill ${activeFilter === 'UNREAD' ? 'active' : ''}`} onClick={() => setActiveFilter('UNREAD')}>Unread</span>
              <span className={`filter-pill ${activeFilter === 'ARCHIVE' ? 'active' : ''}`} onClick={() => setActiveFilter('ARCHIVE')}>Archive</span>
            </div>
          </div>
          
          <div className="chat-list">
            {filteredChats.length > 0 ? filteredChats.map(chat => (
              <div 
                key={chat.id} 
                className={`chat-list-item ${chat.id === activeChatId ? 'active' : ''}`}
                onClick={() => handleChatClick(chat.id)}
              >
                <div className="chat-avatar-wrapper">
                  <img src={chat.avatar} alt={chat.name} />
                  {chat.online && <div className="online-indicator"></div>}
                </div>
                <div className="chat-preview-text">
                  <div className="chat-preview-header">
                    <h4>{chat.name}</h4>
                    <span className="msg-time">{chat.time}</span>
                  </div>
                  <p className={chat.unread > 0 ? 'unread-txt' : ''}>
                    {chat.typing ? (
                      <span style={{ color: '#10b981', fontWeight: 600 }}>typing...</span>
                    ) : (
                      chat.lastMessage
                    )}
                  </p>
                </div>
                {chat.unread > 0 && <span className="unread-badge">{chat.unread}</span>}
              </div>
            )) : (
              <div style={{ textAlign: 'center', padding: '30px 20px', color: '#888', fontSize: '0.85rem' }}>
                No chats found.
              </div>
            )}
          </div>
          
          <div 
            className="sidebar-user-profile" 
            onClick={() => setActiveChatId(null)}
            style={{ cursor: 'pointer' }}
            title="View Profile Settings"
          >
            <div className="sidebar-user-avatar">
              <img src="https://i.pravatar.cc/150?img=11" alt="Current User" />
              <div className="user-online-status"></div>
            </div>
            <div className="sidebar-user-info">
              <h4>Aryan Sharma</h4>
              <p>Premium Client</p>
            </div>
            <button className="sidebar-user-settings" onClick={(e) => { e.stopPropagation(); setActiveChatId(null); }}>⚙</button>
          </div>
        </aside>

        {/* MAIN CHAT AREA */}
        <main className="messages-main-view" style={{ position: 'relative' }}>
          {activeChat ? (
            <>
              <header className="chat-header" style={{ position: 'relative', zIndex: 100 }}>
                <div className="chat-header-info">
                  <button 
                    className="mobile-back-to-list" 
                    onClick={() => setActiveChatId(null)}
                    style={{ background: 'transparent', border: 'none', padding: '5px', color: '#888', cursor: 'pointer' }}
                  >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
                  </button>
                  <img src={activeChat.avatar} alt={activeChat.name} className="header-avatar" />
                  <div>
                    <h3>{activeChat.name}</h3>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ color: activeChat.online ? '#10b981' : '#888', textTransform: 'none', fontWeight: 500 }}>
                        {activeChat.typing ? 'typing...' : (activeChat.online ? 'online' : 'offline')}
                      </span>
                      <button 
                        onClick={() => setUserRole(userRole === 'client' ? 'expert' : 'client')}
                        style={{ background: 'rgba(0,0,0,0.05)', border: 'none', borderRadius: '4px', padding: '2px 6px', fontSize: '0.6rem', color: '#888', cursor: 'pointer', fontWeight: 700 }}
                      >
                        VIEW AS: {userRole.toUpperCase()}
                      </button>
                    </div>
                  </div>
                </div>
                <div className="chat-header-actions">
                  <div style={{ position: 'relative' }}>
                    <button className="btn-appointment-call" title="Start video consultation appointment" onClick={() => setShowApptDropdown(!showApptDropdown)}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="23 7 16 12 23 17 23 7"></polygon><rect x="1" y="5" width="15" height="14" rx="2" ry="2"></rect></svg>
                      <span className="btn-text">Video Appointment</span>
                    </button>
                    
                    {showApptDropdown && (
                      <div className="wa-context-menu" style={{ position: 'absolute', top: '100%', right: '0', marginTop: '10px', zIndex: 200, width: '240px' }} onClick={(e) => e.stopPropagation()}>
                        <ul className="wa-menu-list">
                          {userRole === 'client' ? (
                            <>
                              <li onClick={() => {
                                setShowApptDropdown(false);
                                setShowApptModal(true);
                              }}>
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                                Request Appointment
                              </li>
                              <li className="menu-divider"></li>
                              <li onClick={() => { setShowApptDropdown(false); setShowActiveRoomModal(true); }}>
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="23 7 16 12 23 17 23 7"></polygon><rect x="1" y="5" width="15" height="14" rx="2" ry="2"></rect></svg>
                                Join Active Room
                              </li>
                            </>
                          ) : (
                            <>
                              <li onClick={() => { setShowApptDropdown(false); setShowProfCreateModal(true); }}>
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="16"></line><line x1="8" y1="12" x2="16" y2="12"></line></svg>
                                Create Appointment
                              </li>
                              <li className="menu-divider"></li>
                              <li onClick={() => { setShowApptDropdown(false); alert('System: Requesting client availability...'); }}>
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
                                Ask for appointment
                              </li>
                            </>
                          )}
                        </ul>
                      </div>
                    )}
                  </div>
                  <button className="btn-icon" aria-label="Search" onClick={() => setShowChatSearch(!showChatSearch)}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                  </button>
                  <div style={{ position: 'relative' }}>
                    <button className="btn-icon" aria-label="More Options" onClick={() => setShowOptionsDropdown(!showOptionsDropdown)}>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="1.5"></circle><circle cx="12" cy="5" r="1.5"></circle><circle cx="12" cy="19" r="1.5"></circle></svg>
                    </button>
                    {showOptionsDropdown && (
                      <div className="header-options-dropdown animate-reveal">
                        <ul>
                          <li onClick={() => {
                            setShowMediaModal(true);
                            setShowOptionsDropdown(false);
                          }}>Media, Links, and Docs</li>
                          <li onClick={() => {
                            if (window.confirm('Clear all messages in this chat?')) {
                              setChats(prev => prev.map(c => c.id === activeChatId ? { ...c, history: [] } : c));
                            }
                            setShowOptionsDropdown(false);
                          }}>Clear Chat</li>
                          <li style={{ color: '#ef4444' }} onClick={() => {
                            if (window.confirm('Delete this entire chat?')) {
                              setChats(prev => prev.filter(c => c.id !== activeChatId));
                              setActiveChatId(null);
                            }
                            setShowOptionsDropdown(false);
                          }}>Delete Chat</li>
                          <li onClick={() => {
                            setShowReportModal(true);
                            setShowOptionsDropdown(false);
                          }}>Report</li>
                          <li onClick={handleExportChat}>Export Chat</li>
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              </header>

              <div className="chat-history-scroll" style={{ paddingBottom: '20px', position: 'relative' }} onClick={() => { setShowOptionsDropdown(false); setActiveMessageMenu(null); }}>
                {showChatSearch && (
                  <div className="in-chat-search-bar animate-reveal" style={{ position: 'sticky', top: 0, zIndex: 10, background: 'rgba(255,255,255,0.9)', backdropFilter: 'blur(5px)', padding: '10px 15px', borderRadius: '8px', border: '1px solid var(--glass-border)', display: 'flex', gap: '10px', marginBottom: '15px', boxShadow: '0 4px 10px rgba(0,0,0,0.05)' }}>
                    <input 
                      type="text" 
                      placeholder="Search within conversation..." 
                      value={chatSearchQuery}
                      onChange={e => setChatSearchQuery(e.target.value)}
                      style={{ flex: 1, padding: '8px 15px', borderRadius: '20px', border: '1px solid rgba(0,0,0,0.1)', outline: 'none', fontSize: '0.9rem' }}
                      autoFocus
                    />
                    <button onClick={() => { setShowChatSearch(false); setChatSearchQuery(''); }} style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: '#888', fontSize: '1.2rem', padding: '0 5px' }}>×</button>
                  </div>
                )}
                
                <div className="secure-notice">
                  🛡️ This connection is end-to-end encrypted. Strategic privilege applies.
                </div>
                
                {(showChatSearch && chatSearchQuery.trim() !== '' 
                  ? activeChat.history.filter(msg => msg.text.toLowerCase().includes(chatSearchQuery.toLowerCase()))
                  : activeChat.history
                ).map((msg, idx) => (
                  <div key={idx} className={`message-bubble-wrapper ${msg.sender === 'me' ? 'sent' : 'received'}`} style={{ position: 'relative' }} onContextMenu={(e) => { e.preventDefault(); setActiveMessageMenu(msg.id); }}>
                    {msg.sender === 'expert' && <img src={activeChat.avatar} className="msg-avatar" alt="Expert" />}
                    <div className="message-content">
                      {msg.type === 'appointment' ? (
                        <div className="appointment-card animate-reveal">
                          <div className="appointment-card-header">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                            Video Appointment
                          </div>
                          <div className="appointment-card-body">
                            <div className="appt-detail-row">
                              <span className="appt-label">Date</span>
                              <span className="appt-value">{msg.date}</span>
                            </div>
                            <div className="appt-detail-row">
                              <span className="appt-label">Time</span>
                              <span className="appt-value">{msg.time}</span>
                            </div>
                            {msg.price ? (
                              <div className="appt-price-row flex-row-center" style={{ justifyContent: 'space-between' }}>
                                <span className="appt-price-label">Consultation Fee</span>
                                <span className="appt-price-value">₹{msg.price}</span>
                              </div>
                            ) : (
                              <div className="appt-price-row" style={{ textAlign: 'center', opacity: 0.7, fontSize: '0.8rem', fontStyle: 'italic' }}>
                                Professional to propose session fee
                              </div>
                            )}

                            {msg.apptStatus === 'accepted' ? (
                               <div className="appt-status-confirmed">
                                 <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                                 Appointment Confirmed
                               </div>
                            ) : msg.apptStatus === 'declined' ? (
                               <div className="appt-status-declined">
                                 <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                                 Appointment Declined
                               </div>
                            ) : ((msg.sender === 'me' && userRole === 'client') || (msg.sender === 'expert' && userRole === 'expert')) ? (
                              <div className="appt-status-waiting">
                                {msg.price ? 'Waiting for confirmation...' : 'Waiting for fee proposal...'}
                              </div>
                            ) : (
                              <div className="appointment-card-actions">
                                {msg.price ? (
                                  <>
                                    <button className="btn-appt-primary" onClick={() => handleApptAction(msg.id, 'accepted')}>
                                      Accept & Confirm
                                    </button>
                                    {userRole === 'client' && (
                                      <div className="negotiation-pill-row">
                                        <div className="neg-pill" onClick={() => handleNegotiate(msg, 5)}>-5%</div>
                                        <div className="neg-pill" onClick={() => handleNegotiate(msg, 10)}>-10%</div>
                                      </div>
                                    )}
                                  </>
                                ) : (
                                  <button className="btn-appt-primary" onClick={() => { setShowProfCreateModal(true); setApptDate(new Date(msg.date).toISOString().split('T')[0]); setApptTime(msg.time); }}>
                                    Propose Fee & Confirm
                                  </button>
                                )}
                                <button className="btn-appt-secondary" onClick={() => handleApptAction(msg.id, 'declined')}>
                                  Decline
                                </button>
                              </div>
                            )}
                          </div>
                        </div>
                      ) : (
                        <div className="message-bubble">{msg.text}</div>
                      )}
                      <div className="message-time">
                        {msg.time || msg.time_sent}
                        {msg.sender === 'me' && (
                          <span className={`msg-status-tick ${msg.status === 'read' ? 'read' : 'delivered'}`}>
                            {msg.status === 'read' ? '✓✓' : '✓'}
                          </span>
                        )}
                      </div>
                    </div>
                    
                    <div className="msg-hover-actions">
                      <button title="Options" onClick={(e) => { e.stopPropagation(); setActiveMessageMenu(msg.id); }}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
                      </button>
                      {activeMessageMenu === msg.id && (
                       <div className={`wa-menu-wrapper animate-reveal ${msg.sender === 'me' ? 'sent' : 'received'}`} onClick={(e) => e.stopPropagation()}>
                          <div className="wa-context-menu">
                             <ul className="wa-menu-list">
                                <li onClick={() => { setReplyingToMsg(msg); setActiveMessageMenu(null); }}>
                                   <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 17 4 12 9 7"/><path d="M20 18v-2a4 4 0 0 0-4-4H4"/></svg> Reply
                                </li>
                                <li onClick={() => { navigator.clipboard.writeText(msg.text); setActiveMessageMenu(null); }}>
                                   <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg> Copy
                                </li>
                                <li onClick={() => setActiveMessageMenu(null)}>
                                   <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="17" x2="12" y2="22"/><path d="M5 17h14v-1.76a2 2 0 0 0-1.11-1.79l-1.78-.9A2 2 0 0 1 15 10.68V6a3 3 0 0 0-3-3 3 3 0 0 0-3 3v4.68a2 2 0 0 1-1.11 1.79l-1.78.9A2 2 0 0 0 5 15.24Z"/></svg> Pin
                                </li>
                                <li onClick={() => setActiveMessageMenu(null)}>
                                   <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg> Star
                                </li>
                                <li className="menu-divider"></li>
                                <li onClick={() => setActiveMessageMenu(null)}>
                                   <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 11 12 14 22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg> Select
                                </li>
                                <li className="menu-divider"></li>
                                <li onClick={() => setActiveMessageMenu(null)}>
                                   <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="12" y1="18" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg> Report
                                </li>
                                <li onClick={() => { setActiveMessageMenu(null); if(window.confirm('Delete this message?')){ setChats(prev => prev.map(c => c.id === activeChatId ? { ...c, history: c.history.filter(m => m.id !== msg.id) } : c)); } }}>
                                   <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg> Delete
                                </li>
                             </ul>
                          </div>
                       </div>
                    )}
                    </div>
                  </div>
                ))}
                <div ref={chatEndRef} />
              </div>

              <div className="chat-input-area" style={{ flexShrink: 0, display: 'flex', flexDirection: 'column' }}>
                {replyingToMsg && (
                  <div style={{ padding: '8px 15px', background: 'rgba(0,0,0,0.03)', borderLeft: '4px solid var(--strategic-gold)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '0 20px 10px 20px', borderRadius: '4px' }}>
                    <div style={{ overflow: 'hidden' }}>
                      <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--strategic-gold)', display: 'block', marginBottom: '4px' }}>
                        Replying to {replyingToMsg.sender === 'me' ? 'Yourself' : activeChat.name}
                      </span>
                      <p style={{ fontSize: '0.9rem', color: '#555', margin: 0, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{replyingToMsg.text}</p>
                    </div>
                    <button onClick={() => setReplyingToMsg(null)} style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: '#888', padding: '5px', marginLeft: '10px' }}>✖</button>
                  </div>
                )}
                <div className="payment-gate-notice" style={{ marginBottom: '10px' }}>
                  <span className="fee-badge">₹50 / Message</span>
                  <span className="fee-text">Professional consultation fee applies to this channel.</span>
                </div>
                <div className="whatsapp-input-row flex-row-center">
                  <input 
                    type="file" 
                    ref={fileInputRef} 
                    style={{display: 'none'}} 
                    onChange={(e) => {
                      const file = e.target.files[0];
                      if (!file) return;
                      const newMsg = {
                        id: Date.now(),
                        sender: 'me',
                        text: `📄 ${file.name}`,
                        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                        status: 'delivered'
                      };
                      setChats(prev => prev.map(chat => chat.id === activeChatId ? { ...chat, lastMessage: newMsg.text, time: newMsg.time, history: [...chat.history, newMsg] } : chat));
                      e.target.value = null;
                    }} 
                  />
                  <button className="btn-action-wa" aria-label="Attach File" onClick={() => fileInputRef.current && fileInputRef.current.click()}>
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"></path></svg>
                  </button>
                  <input 
                    type="text" 
                    placeholder="Draft your strategic inquiry..." 
                    value={messageText}
                    onChange={(e) => setMessageText(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        handleSendMessage();
                      }
                    }}
                    style={{ flex: 1, padding: '12px 15px', border: 'none', background: 'transparent', outline: 'none', fontSize: '1rem' }}
                  />
                  
                  {messageText.trim() === '' ? (
                    <button 
                      className={`btn-send-wa voice-btn ${isRecording ? 'recording' : ''}`} 
                      aria-label="Voice Message"
                      onClick={() => {
                        if (isRecording) {
                          clearInterval(recordingIntervalRef.current);
                          setIsRecording(false);
                          const newMsg = {
                            id: Date.now(),
                            sender: 'me',
                            text: `🎤 Voice Message (${recordingTimer}s)`,
                            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                            status: 'delivered'
                          };
                          setChats(prev => prev.map(chat => chat.id === activeChatId ? { ...chat, lastMessage: '🎤 Voice Message', time: newMsg.time, history: [...chat.history, newMsg] } : chat));
                          setRecordingTimer(0);
                        } else {
                          setIsRecording(true);
                          setRecordingTimer(0);
                          recordingIntervalRef.current = setInterval(() => {
                            setRecordingTimer(prev => prev + 1);
                          }, 1000);
                        }
                      }}
                      style={isRecording ? { width: '80px', borderRadius: '20px', background: '#ef4444' } : {}}
                    >
                      {isRecording ? (
                         <div style={{display: 'flex', alignItems: 'center', fontSize: '0.8rem', fontWeight: 'bold'}}>{recordingTimer}s <div style={{width: 8, height: 8, background: 'white', borderRadius: '50%', marginLeft: 6, animation: 'pulse 1s infinite'}}></div></div>
                      ) : (
                         <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"></path><path d="M19 10v2a7 7 0 0 1-14 0v-2"></path><line x1="12" y1="19" x2="12" y2="23"></line><line x1="8" y1="23" x2="16" y2="23"></line></svg>
                      )}
                    </button>
                  ) : (
                    <button className="btn-send-wa send-btn" aria-label="Send Message" onClick={handleSendMessage}>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginLeft: '-2px' }}><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
                    </button>
                  )}
                </div>
              </div>

              {videoCallActive && (
                <div className="video-call-overlay animate-reveal" style={{
                  position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
                  background: 'rgba(20, 20, 20, 0.95)', backdropFilter: 'blur(10px)', zIndex: 200, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: 'white', borderLeft: '1px solid rgba(255,255,255,0.1)'
                }}>
                  <div className="expert-video-placeholder" style={{
                    width: '160px', height: '160px', borderRadius: '50%', overflow: 'hidden', marginBottom: '25px',
                    border: '4px solid var(--strategic-gold)', boxShadow: '0 0 30px rgba(184, 153, 94, 0.4)'
                  }}>
                    <img src={activeChat.avatar} alt="Expert" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                  <h2 style={{ fontFamily: 'Outfit, sans-serif', fontSize: '1.8rem', margin: '0 0 10px 0' }}>{activeChat.name}</h2>
                  <p style={{ color: '#aaa', margin: '0 0 40px 0', fontSize: '1rem' }}>Connecting to secure video session...</p>
                  <div style={{ display: 'flex', gap: '25px' }}>
                    <button 
                      onClick={() => setIsMuted(!isMuted)}
                      style={{ width: '56px', height: '56px', borderRadius: '50%', background: isMuted ? 'rgba(255,255,255,0.9)' : 'rgba(255,255,255,0.1)', border: isMuted ? 'none' : '1px solid rgba(255,255,255,0.2)', color: isMuted ? '#1a1a1a' : 'white', cursor: 'pointer', display: 'flex', alignItems:'center', justifyContent:'center', transition: 'all 0.2s' }}>
                      {isMuted ? (
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="1" y1="1" x2="23" y2="23"></line><path d="M9 9v3a3 3 0 0 0 5.12 2.12M15 9.34V4a3 3 0 0 0-5.94-.6"></path><path d="M17 16.95A7 7 0 0 1 5 12v-2m14 0v2a7 7 0 0 1-.11 1.23"></path><line x1="12" y1="19" x2="12" y2="23"></line><line x1="8" y1="23" x2="16" y2="23"></line></svg>
                      ) : (
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"></path><path d="M19 10v2a7 7 0 0 1-14 0v-2"></path><line x1="12" y1="19" x2="12" y2="23"></line><line x1="8" y1="23" x2="16" y2="23"></line></svg>
                      )}
                    </button>
                    <button 
                      onClick={() => setIsVideoOff(!isVideoOff)}
                      style={{ width: '56px', height: '56px', borderRadius: '50%', background: isVideoOff ? 'rgba(255,255,255,0.9)' : 'rgba(255,255,255,0.1)', border: isVideoOff ? 'none' : '1px solid rgba(255,255,255,0.2)', color: isVideoOff ? '#1a1a1a' : 'white', cursor: 'pointer', display: 'flex', alignItems:'center', justifyContent:'center', transition: 'all 0.2s' }}>
                      {isVideoOff ? (
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M16 16v1a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h2m5.66 0H14a2 2 0 0 1 2 2v3.34l1 1L23 7v10"></path><line x1="1" y1="1" x2="23" y2="23"></line></svg>
                      ) : (
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="23 7 16 12 23 17 23 7"></polygon><rect x="1" y="5" width="15" height="14" rx="2" ry="2"></rect></svg>
                      )}
                    </button>
                    <button 
                      onClick={() => setVideoCallActive(false)}
                      title="End Call"
                      style={{ width: '56px', height: '56px', borderRadius: '50%', background: '#ef4444', border: 'none', color: 'white', cursor: 'pointer', display: 'flex', alignItems:'center', justifyContent:'center', boxShadow: '0 4px 15px rgba(239, 68, 68, 0.4)', transition: 'all 0.2s' }}
                    >
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M10.68 13.31a16 16 0 0 0 3.41 2.6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7 2 2 0 0 1 1.72 2v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.42 19.42 0 0 1-3.33-2.67m-2.67-3.34a19.79 19.79 0 0 1-3.07-8.63A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91"></path><line x1="23" y1="1" x2="1" y2="23"></line></svg>
                    </button>
                  </div>
                </div>
              )}

              {showMediaModal && (
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', zIndex: 300, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <div style={{ background: 'white', width: '90%', maxWidth: '600px', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 20px 40px rgba(0,0,0,0.2)' }}>
                    <div style={{ padding: '20px', borderBottom: '1px solid var(--glass-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'var(--parchment-cream)' }}>
                      <h3 style={{ margin: 0, color: 'var(--deep-charcoal)', fontFamily: 'Outfit, sans-serif' }}>Media, Links, and Docs</h3>
                      <button onClick={() => setShowMediaModal(false)} style={{ background: 'transparent', border: 'none', fontSize: '1.5rem', cursor: 'pointer', color: '#888' }}>&times;</button>
                    </div>
                    <div className="media-tabs" style={{ display: 'flex', borderBottom: '1px solid rgba(0,0,0,0.05)', background: 'rgba(0,0,0,0.01)' }}>
                      {['MEDIA', 'DOCS', 'LINKS'].map(tab => (
                        <button 
                          key={tab}
                          onClick={() => setActiveMediaTab(tab)}
                          style={{ 
                            flex: 1, 
                            padding: '12px', 
                            border: 'none', 
                            background: 'transparent', 
                            fontSize: '0.75rem', 
                            fontWeight: 800, 
                            letterSpacing: '1px', 
                            cursor: 'pointer',
                            color: activeMediaTab === tab ? 'var(--strategic-gold)' : '#888',
                            borderBottom: activeMediaTab === tab ? '2px solid var(--strategic-gold)' : 'none',
                            transition: 'all 0.2s'
                          }}
                        >
                          {tab}
                        </button>
                      ))}
                    </div>
                    <div style={{ padding: '30px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '300px', color: '#666' }}>
                      <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="var(--strategic-gold)" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" style={{ marginBottom: '15px', opacity: 0.8 }}><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>
                      <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.9rem' }}>No {activeMediaTab.toLowerCase()} shared in this conversation yet.</p>
                      <span style={{ fontSize: '0.75rem', opacity: 0.6, marginTop: '8px' }}>Multimedia sent over this channel will appear here for archival.</span>
                    </div>
                  </div>
                </div>
              )}

              {showReportModal && (
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', zIndex: 300, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <div style={{ background: 'white', width: '90%', maxWidth: '450px', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 20px 40px rgba(0,0,0,0.2)' }}>
                    <div style={{ padding: '20px', borderBottom: '1px solid var(--glass-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'var(--parchment-cream)' }}>
                      <h3 style={{ margin: 0, color: '#ef4444', fontFamily: 'Outfit, sans-serif', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>
                        Report Account
                      </h3>
                      <button onClick={() => setShowReportModal(false)} style={{ background: 'transparent', border: 'none', fontSize: '1.5rem', cursor: 'pointer', color: '#888' }}>&times;</button>
                    </div>
                    <div style={{ padding: '25px' }}>
                      <p style={{ margin: '0 0 15px 0', fontSize: '0.9rem', color: '#555' }}>Please select a reason for reporting <strong>{activeChat.name}</strong>. We take this seriously and will investigate immediately.</p>
                      
                      <div style={{ marginBottom: '15px' }}>
                        <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--deep-charcoal)', marginBottom: '8px' }}>Reason Point</label>
                        <select 
                          value={reportReason} 
                          onChange={(e) => setReportReason(e.target.value)}
                          style={{ width: '100%', padding: '10px 12px', borderRadius: '6px', border: '1px solid var(--glass-border)', outline: 'none', background: 'rgba(0,0,0,0.02)', fontFamily: 'Inter, sans-serif' }}
                        >
                          <option value="">-- Select Reason --</option>
                          <option value="spam">Spam / Unsolicited Promotion</option>
                          <option value="inappropriate">Inappropriate Behavior / Harassment</option>
                          <option value="scam">Scam / Fraudulent Activity</option>
                          <option value="fake">Fake Profile</option>
                          <option value="other">Other</option>
                        </select>
                      </div>

                      <div style={{ marginBottom: '20px' }}>
                        <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--deep-charcoal)', marginBottom: '8px' }}>Additional Reason Details</label>
                        <textarea 
                          value={reportDetails}
                          onChange={(e) => setReportDetails(e.target.value)}
                          placeholder="Please provide specific details to help us investigate..."
                          style={{ width: '100%', padding: '12px', borderRadius: '6px', border: '1px solid var(--glass-border)', outline: 'none', background: 'rgba(0,0,0,0.02)', fontFamily: 'Inter, sans-serif', minHeight: '80px', resize: 'vertical' }}
                        />
                      </div>

                      <button 
                        onClick={() => {
                          if (!reportReason) {
                            alert('Please select a reason point first.');
                            return;
                          }
                          alert(`Report Submitted Successfully!\nReason: ${reportReason}\nOur compliance team will investigate within 24 hours.`);
                          setShowReportModal(false);
                          setReportReason('');
                          setReportDetails('');
                        }}
                        style={{ width: '100%', padding: '12px', background: '#ef4444', color: 'white', border: 'none', borderRadius: '6px', fontWeight: 700, cursor: 'pointer', fontFamily: 'Outfit, sans-serif', fontSize: '1rem' }}
                      >
                        Submit Report
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {showApptModal && (
                <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.6)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(3px)' }} onClick={() => setShowApptModal(false)}>
                  <div style={{ background: '#fff', width: '400px', borderRadius: '12px', boxShadow: '0 20px 40px rgba(0,0,0,0.2)', overflow: 'hidden', animation: 'scaleUp 0.3s ease' }} onClick={(e) => e.stopPropagation()}>
                    <div style={{ background: 'var(--midnight-primary)', padding: '20px 25px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <h3 style={{ margin: 0, color: 'var(--strategic-gold)', fontFamily: 'Outfit, sans-serif', fontSize: '1.2rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                        Request Video Appointment
                      </h3>
                      <button onClick={() => setShowApptModal(false)} style={{ background: 'transparent', border: 'none', fontSize: '1.5rem', cursor: 'pointer', color: '#888' }}>&times;</button>
                    </div>
                    <div style={{ padding: '25px' }}>
                      <p style={{ margin: '0 0 20px 0', fontSize: '0.9rem', color: '#555' }}>Propose a date and time to meet with <strong>{activeChat.name}</strong>. A formal request will be sent to the expert.</p>
                      
                      <div style={{ marginBottom: '15px' }}>
                        <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--deep-charcoal)', marginBottom: '8px' }}>Date</label>
                        <input 
                          type="date"
                          value={apptDate}
                          onChange={(e) => setApptDate(e.target.value)}
                          style={{ width: '100%', padding: '10px 12px', borderRadius: '6px', border: '1px solid var(--glass-border)', outline: 'none', background: 'rgba(0,0,0,0.02)', fontFamily: 'Inter, sans-serif' }}
                        />
                      </div>

                      <div style={{ marginBottom: '25px' }}>
                        <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--deep-charcoal)', marginBottom: '8px' }}>Time (Your Local Time)</label>
                        <input 
                          type="time"
                          value={apptTime}
                          onChange={(e) => setApptTime(e.target.value)}
                          style={{ width: '100%', padding: '10px 12px', borderRadius: '6px', border: '1px solid var(--glass-border)', outline: 'none', background: 'rgba(0,0,0,0.02)', fontFamily: 'Inter, sans-serif' }}
                        />
                      </div>

                      <div style={{ display: 'flex', gap: '10px' }}>
                        <button 
                          onClick={() => setShowApptModal(false)}
                          style={{ flex: 1, padding: '12px', background: '#f5f5f5', color: '#555', border: '1px solid #ddd', borderRadius: '6px', fontWeight: 600, cursor: 'pointer', fontFamily: 'Outfit, sans-serif' }}
                        >
                          Cancel
                        </button>
                        <button 
                          onClick={() => {
                            if (!apptDate || !apptTime) {
                              alert('Please fill in date and time.');
                              return;
                            }
                            const formattedDate = new Date(apptDate).toLocaleDateString([], { month: 'short', day: 'numeric', year: 'numeric' });
                            
                            const newMsg = {
                              id: Date.now(),
                              sender: 'me',
                              type: 'appointment',
                              date: formattedDate,
                              time: apptTime,
                              price: null,
                              text: `🗓️ Requested a video appointment for ${formattedDate} at ${apptTime}. waiting for expert to propose fee.`,
                              time_sent: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                              status: 'sent'
                            };
                            setChats(prev => prev.map(c => c.id === activeChatId ? { ...c, history: [...c.history, newMsg] } : c));
                            
                            setShowApptModal(false);
                            setApptDate('');
                            setApptTime('');
                          }}
                          style={{ flex: 2, padding: '12px', background: 'var(--strategic-gold)', color: 'white', border: 'none', borderRadius: '6px', fontWeight: 700, cursor: 'pointer', fontFamily: 'Outfit, sans-serif' }}
                        >
                          Submit Request
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {showActiveRoomModal && (
                <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.7)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(4px)' }} onClick={() => !isKnocking && setShowActiveRoomModal(false)}>
                  <div style={{ background: '#fff', width: '420px', borderRadius: '12px', boxShadow: '0 20px 40px rgba(0,0,0,0.3)', overflow: 'hidden', animation: 'scaleUp 0.3s ease' }} onClick={(e) => e.stopPropagation()}>
                    <div style={{ background: 'var(--midnight-primary)', padding: '20px 25px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <h3 style={{ margin: 0, color: 'var(--strategic-gold)', fontFamily: 'Outfit, sans-serif', fontSize: '1.2rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="23 7 16 12 23 17 23 7"></polygon><rect x="1" y="5" width="15" height="14" rx="2" ry="2"></rect></svg>
                        Active Consultation Room
                      </h3>
                      {!isKnocking && <button onClick={() => setShowActiveRoomModal(false)} style={{ background: 'transparent', border: 'none', fontSize: '1.5rem', cursor: 'pointer', color: '#888' }}>&times;</button>}
                    </div>
                    
                    <div style={{ padding: '30px 25px', textAlign: 'center' }}>
                      <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'rgba(184, 153, 94, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px auto', border: '2px solid var(--strategic-gold)' }}>
                        <img src={activeChat.avatar} alt="Expert" style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover' }} />
                      </div>
                      <h4 style={{ fontFamily: 'Outfit, sans-serif', fontSize: '1.3rem', margin: '0 0 5px 0', color: 'var(--deep-charcoal)' }}>{activeChat.name}</h4>
                      <p style={{ margin: '0 0 25px 0', color: '#666', fontSize: '0.95rem' }}>{activeChat.role}</p>
                      
                      <div style={{ padding: '15px', background: 'rgba(0,0,0,0.02)', border: '1px solid var(--glass-border)', borderRadius: '8px', marginBottom: '25px', textAlign: 'left' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                          <span style={{ fontSize: '0.85rem', color: '#555', fontWeight: 600 }}>Status:</span>
                          <span style={{ fontSize: '0.85rem', color: '#10b981', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '5px' }}><span style={{width: '8px', height: '8px', background: '#10b981', borderRadius: '50%', display: 'inline-block'}}></span> Room is Live</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                          <span style={{ fontSize: '0.85rem', color: '#555', fontWeight: 600 }}>Scheduled For:</span>
                          <span style={{ fontSize: '0.85rem', color: '#333', fontWeight: 600 }}>Now</span>
                        </div>
                      </div>

                      {isKnocking ? (
                        <div style={{ padding: '15px 0' }}>
                          <div className="pulsing-indicator" style={{ width: '12px', height: '12px', background: 'var(--strategic-gold)', borderRadius: '50%', margin: '0 auto 15px auto', animation: 'recordingPulse 1.5s infinite' }}></div>
                          <p style={{ color: 'var(--strategic-gold)', fontWeight: 600, fontSize: '0.95rem', margin: 0 }}>Waiting for host to let you in...</p>
                          <p style={{ color: '#888', fontSize: '0.8rem', marginTop: '8px', margin: '8px 0 0 0' }}>Usually takes a few seconds.</p>
                        </div>
                      ) : (
                        <div style={{ display: 'flex', gap: '10px' }}>
                          <button 
                            onClick={() => setShowActiveRoomModal(false)}
                            style={{ flex: 1, padding: '14px', background: '#f5f5f5', color: '#555', border: '1px solid #ddd', borderRadius: '6px', fontWeight: 600, cursor: 'pointer', fontFamily: 'Outfit, sans-serif' }}
                          >
                            Cancel
                          </button>
                          <button 
                            onClick={() => {
                              setIsKnocking(true);
                              setTimeout(() => {
                                setIsKnocking(false);
                                setShowActiveRoomModal(false);
                                setVideoCallActive(true);
                              }, 3000);
                            }}
                            style={{ flex: 2, padding: '14px', background: 'var(--strategic-gold)', color: 'white', border: 'none', borderRadius: '6px', fontWeight: 700, cursor: 'pointer', fontFamily: 'Outfit, sans-serif', fontSize: '1.05rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
                          >
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
                            Request to Join
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {showProfCreateModal && (
                <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.6)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(3px)' }} onClick={() => setShowProfCreateModal(false)}>
                  <div style={{ background: '#fff', width: '420px', borderRadius: '12px', boxShadow: '0 20px 40px rgba(0,0,0,0.2)', overflow: 'hidden', animation: 'scaleUp 0.3s ease' }} onClick={(e) => e.stopPropagation()}>
                    <div style={{ background: 'var(--midnight-primary)', padding: '20px 25px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <h3 style={{ margin: 0, color: 'var(--strategic-gold)', fontFamily: 'Outfit, sans-serif', fontSize: '1.2rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="16"></line><line x1="8" y1="12" x2="16" y2="12"></line></svg>
                        Professional Appointment Creation
                      </h3>
                      <button onClick={() => setShowProfCreateModal(false)} style={{ background: 'transparent', border: 'none', fontSize: '1.5rem', cursor: 'pointer', color: '#888' }}>&times;</button>
                    </div>
                    <div style={{ padding: '25px' }}>
                      <p style={{ margin: '0 0 20px 0', fontSize: '0.9rem', color: '#555' }}>Issue a formal appointment proposal to <strong>{activeChat.name}</strong>. This will include session details and your professional fee.</p>
                      
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '15px' }}>
                        <div>
                          <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: 'var(--deep-charcoal)', marginBottom: '5px' }}>Proposed Date</label>
                          <input 
                            type="date"
                            value={apptDate}
                            onChange={(e) => setApptDate(e.target.value)}
                            style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid var(--glass-border)', outline: 'none', background: 'rgba(0,0,0,0.02)', fontSize: '0.85rem' }}
                          />
                        </div>
                        <div>
                          <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: 'var(--deep-charcoal)', marginBottom: '5px' }}>Proposed Time</label>
                          <input 
                            type="time"
                            value={apptTime}
                            onChange={(e) => setApptTime(e.target.value)}
                            style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid var(--glass-border)', outline: 'none', background: 'rgba(0,0,0,0.02)', fontSize: '0.85rem' }}
                          />
                        </div>
                      </div>

                      <div style={{ marginBottom: '20px' }}>
                        <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: 'var(--deep-charcoal)', marginBottom: '5px' }}>Consultation Fee (₹)</label>
                        <div style={{ position: 'relative' }}>
                          <span style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#888', fontWeight: 700 }}>₹</span>
                          <input 
                            type="number"
                            value={apptPrice}
                            onChange={(e) => setApptPrice(e.target.value)}
                            style={{ width: '100%', padding: '10px 10px 10px 25px', borderRadius: '6px', border: '1px solid var(--glass-border)', outline: 'none', background: 'rgba(0,0,0,0.02)', fontWeight: 700, color: 'var(--strategic-gold)' }}
                            placeholder="2500"
                          />
                        </div>
                      </div>

                      <div style={{ display: 'flex', gap: '10px' }}>
                        <button 
                          onClick={() => setShowProfCreateModal(false)}
                          style={{ flex: 1, padding: '12px', background: '#f5f5f5', color: '#555', border: '1px solid #ddd', borderRadius: '6px', fontWeight: 600, cursor: 'pointer', fontFamily: 'Outfit, sans-serif' }}
                        >
                          Cancel
                        </button>
                        <button 
                          onClick={() => {
                            if (!apptDate || !apptTime || !apptPrice) {
                              alert('Please provide date, time, and fee.');
                              return;
                            }
                            const formattedDate = new Date(apptDate).toLocaleDateString([], { month: 'short', day: 'numeric', year: 'numeric' });
                            
                            const newMsg = {
                              id: Date.now(),
                              sender: 'me',
                              type: 'appointment',
                              date: formattedDate,
                              time: apptTime,
                              price: apptPrice,
                              text: `📜 Professional Consultation Proposal sent. Fee: ₹${apptPrice}`,
                              time_sent: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                              status: 'sent'
                            };
                            setChats(prev => prev.map(c => c.id === activeChatId ? { ...c, history: [...c.history, newMsg] } : c));
                            
                            setShowProfCreateModal(false);
                            setApptDate('');
                            setApptTime('');
                          }}
                          style={{ flex: 2, padding: '12px', background: 'var(--midnight-primary)', color: 'var(--strategic-gold)', border: 'none', borderRadius: '6px', fontWeight: 800, cursor: 'pointer', fontFamily: 'Outfit, sans-serif', boxShadow: '0 4px 15px rgba(0,0,0,0.1)' }}
                        >
                          Send Official Proposal
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </>
          ) : (
            <div className="no-chat-selected">
              <div className="empty-state-icon" style={{ opacity: 0.8, marginBottom: '20px' }}>
                <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="var(--strategic-gold)" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
              </div>
              <h3 style={{ fontFamily: 'Outfit, sans-serif', fontSize: '1.4rem' }}>Select who to talk to</h3>
              <p style={{ maxWidth: '300px', textAlign: 'center', lineHeight: '1.5' }}>Choose an ongoing strategic consultation from the left pane to view your messages.</p>
            </div>
          )}
        </main>

      </div>
    </div>
  );
};

export default Messages;
