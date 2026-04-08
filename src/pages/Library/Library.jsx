import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import NotionWorkspace from './NotionWorkspace';
import ReaderSpace from './ReaderSpace';
import './Library.css';

const MOCK_CATEGORIES = [
  { id: 'all', name: 'All Resources', icon: '📚' },
  { id: 'const', name: 'Constitutional Law', icon: '🏛️' },
  { id: 'corp', name: 'Corporate & M&A', icon: '🏢' },
  { id: 'crim', name: 'Criminal Justice', icon: '⚖️' },
  { id: 'tax', name: 'Taxation & Finance', icon: '📊' },
  { id: 'ip', name: 'Intellectual Property', icon: '💡' },
];

const MOCK_RESOURCES = [
  {
    id: 1,
    title: 'The Indian Constitution: A Strategic Commentary',
    author: 'Dr. Vikram Sethi',
    category: 'const',
    cover: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?q=80&w=2070&auto=format&fit=crop',
    pages: 1240,
    abstract: 'A deep-dive analysis into the transformative amendments of 2024 and their impact on corporate governance.'
  },
  {
    id: 2,
    title: 'M&A Playbook 2026: Negotiating Liquidities',
    author: 'Adv. Sameer Khanna',
    category: 'corp',
    cover: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?q=80&w=2070&auto=format&fit=crop',
    pages: 450,
    abstract: 'Tactical frameworks for executing cross-border acquisitions in high-volatility markets.'
  },
  {
    id: 3,
    title: 'Criminal Procedure: Evidence & Witnessing',
    author: 'Prof. Ananya Rao',
    category: 'crim',
    cover: 'https://images.unsplash.com/photo-1505664194779-8beaceb93744?q=80&w=2070&auto=format&fit=crop',
    pages: 820,
    abstract: 'An exhaustive study on the shift towards biometric evidence in the trial courts of Bombay and Delhi.'
  },
  {
    id: 4,
    title: 'Global Tax Treaties & Sovereign Immunity',
    author: 'Dr. Elena Rossi',
    category: 'tax',
    cover: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=2072&auto=format&fit=crop',
    pages: 670,
    abstract: 'Comparative analysis of tax-haven legislations and their eventual dissolution under the G20 frameworks.'
  },
];

const Library = () => {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [showReader, setShowReader] = useState(false);
  const [showNotion, setShowNotion] = useState(false);
  const [activeBook, setActiveBook] = useState(null);
  const [viewMode, setViewMode] = useState('grid');
  const [sortBy, setSortBy] = useState('title');
  const [showSortDropdown, setShowSortDropdown] = useState(false);
  const [bookmarkedIds, setBookmarkedIds] = useState([]);
  const [hubFilter, setHubFilter] = useState(null); 
  const [editDraft, setEditDraft] = useState(null);
  const [resources, setResources] = useState(MOCK_RESOURCES);
  const [recentReadings, setRecentReadings] = useState([
    { id: 1, timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000) },
    { id: 3, timestamp: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000) } 
  ]);

  const handlePublishNew = (title, blocks) => {
    const newArticle = {
      id: Date.now(),
      title: title || 'Untitled Intelligence',
      author: 'You (Strategist)',
      category: 'ip',
      cover: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&auto=format&fit=crop',
      pages: Math.ceil(blocks.length * 1.5),
      abstract: blocks.find(b => b.type === 'text')?.content?.substring(0, 150) || 'Drafed in personal workspace...',
      blocks: blocks
    };
    setResources([newArticle, ...resources.filter(r => r.id !== newArticle.id)]);
    setShowNotion(false);
    setEditDraft(null);
  };

  const handleEdit = (title, blocks) => {
    setEditDraft({ title, blocks });
    setShowReader(false);
    setShowNotion(true);
  };

  const sortRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sortRef.current && !sortRef.current.contains(event.target)) {
        setShowSortDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const filteredResources = resources
    .filter(res => {
      const matchesCategory = activeCategory === 'all' || res.category === activeCategory;
      const matchesSearch = res.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            res.author.toLowerCase().includes(searchQuery.toLowerCase());
      
      let matchesHub = true;
      if (hubFilter === 'saved') matchesHub = bookmarkedIds.includes(res.id);
      if (hubFilter === 'recent') {
        const entry = recentReadings.find(r => r.id === res.id);
        if (!entry) return false;
        const oneWeekAgo = Date.now() - 7 * 24 * 60 * 60 * 1000;
        matchesHub = new Date(entry.timestamp).getTime() > oneWeekAgo;
      }
      return matchesCategory && matchesSearch && matchesHub;
    })
    .sort((a, b) => {
      if (sortBy === 'title') return a.title.localeCompare(b.title);
      if (sortBy === 'author') return a.author.localeCompare(b.author);
      if (sortBy === 'pages') return b.pages - a.pages;
      return 0;
    });

  const toggleBookmark = (e, id) => {
    e.stopPropagation();
    setBookmarkedIds(prev => 
      prev.includes(id) ? prev.filter(bid => bid !== id) : [...prev, id]
    );
  };

  const handleRead = (book) => {
    setActiveBook(book);
    setShowReader(true);
    setRecentReadings(prev => {
      const filtered = prev.filter(r => r.id !== book.id);
      return [{ id: book.id, timestamp: new Date() }, ...filtered];
    });
  };

  if (showNotion) {
    return (
      <NotionWorkspace 
        onExit={() => { setShowNotion(false); setEditDraft(null); }} 
        onPublish={handlePublishNew}
        initialTitle={editDraft?.title || ''}
        initialBlocks={editDraft?.blocks || []}
      />
    );
  }

  if (showReader && activeBook) {
    // If the resource has custom blocks, use them, otherwise use the legacy converter
    const initialBlocks = activeBook.blocks || [
      { id: 'b4', type: 'h2', content: 'Executive Summary' },
      { id: 'b5', type: 'text', content: activeBook.abstract },
      { id: 'b6', type: 'image', content: activeBook.cover },
      { id: 'b7', type: 'h2', content: 'Strategic Analysis' },
      { id: 'b8', type: 'text', content: 'This strategic volume provides essential legal intelligence regarding current precedents and legislative shifts. The commentary explores high-fidelity frameworks for professional execution in complex jurisdictions.' },
      { id: 'b9', type: 'bullet', content: 'In-depth analysis of 2024 amendments' },
      { id: 'b10', type: 'bullet', content: 'Practical negotiation frameworks' },
      { id: 'b11', type: 'bullet', content: 'Cross-border compliance metrics' },
    ];

    return (
      <ReaderSpace 
        initialTitle={activeBook.title}
        initialBlocks={initialBlocks}
        author={activeBook.author}
        onExit={() => setShowReader(false)}
        onEdit={handleEdit}
      />
    );
  }

  return (
    <div className="library-page-wrapper">
      <div className="library-container-elite animate-reveal">
        <aside className={`library-sidebar ${!isSidebarOpen ? 'collapsed' : ''}`}>
          <div className="sidebar-brand-header">
            <button className="sidebar-toggle-trigger" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
              {isSidebarOpen ? '◀' : '▶'}
            </button>
          </div>

          <div className="sidebar-search-area">
            <div className="search-box-glass">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="2.5"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
              <input
                type="text"
                placeholder="Find legal intelligence..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          <nav className="library-nav-links">
            <div className="nav-section-label">Categories</div>
            {MOCK_CATEGORIES.map(cat => (
              <button 
                key={cat.id} 
                className={`nav-item ${activeCategory === cat.id && !hubFilter ? 'active' : ''}`}
                onClick={() => { setActiveCategory(cat.id); setHubFilter(null); }}
              >
                <span className="nav-icon">{cat.icon}</span>
                <span className="nav-text">{cat.name}</span>
                {activeCategory === cat.id && !hubFilter && <div className="active-dot"></div>}
              </button>
            ))}

            <div className="nav-section-label" style={{ marginTop: '25px' }}>My Strategic Hub</div>
            <button 
              className={`nav-item ${showNotion ? 'active' : ''}`}
              onClick={() => { setShowNotion(true); setHubFilter(null); }}
            >
              <span className="nav-icon">✨</span>
              <span className="nav-text">Creative Workspace</span>
              {showNotion && <div className="active-dot"></div>}
            </button>
            <button 
              className={`nav-item ${hubFilter === 'saved' ? 'active' : ''}`}
              onClick={() => { setHubFilter('saved'); setActiveCategory('all'); }}
            >
              <span className="nav-icon">⭐</span>
              <span className="nav-text">Saved Precedents</span>
              {hubFilter === 'saved' && <div className="active-dot"></div>}
            </button>
            <button 
              className={`nav-item ${hubFilter === 'recent' ? 'active' : ''}`}
              onClick={() => { setHubFilter('recent'); setActiveCategory('all'); }}
            >
              <span className="nav-icon">🕒</span>
              <span className="nav-text">Recent Readings</span>
              {hubFilter === 'recent' && <div className="active-dot"></div>}
            </button>
          </nav>

          <div className="sidebar-user-footer">
            <div className="user-mini-card">
              <img src="https://i.pravatar.cc/150?img=11" alt="User" />
              <div className="user-text">
                <h4>Aryan Sharma</h4>
                <p>Strategic Member</p>
              </div>
              <button className="settings-btn">⚙</button>
            </div>
          </div>
        </aside>

        <main className="library-main-content">
          <header className="library-view-header">
            <div className="header-left">
              <h1>{MOCK_CATEGORIES.find(c => c.id === activeCategory)?.name || 'Library'}</h1>
              <p>{filteredResources.length} curated volumes available in this compartment.</p>
            </div>
            <div className="header-actions">
              <div className="view-toggle">
                <button className={viewMode === 'grid' ? 'active' : ''} onClick={() => setViewMode('grid')}>🔲</button>
                <button className={viewMode === 'list' ? 'active' : ''} onClick={() => setViewMode('list')}>☰</button>
              </div>

              <div className="sort-wrapper" ref={sortRef}>
                <button className="filter-button" onClick={() => setShowSortDropdown(!showSortDropdown)}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon></svg>
                  {sortBy === 'title' ? 'Sort by Title' : sortBy === 'pages' ? 'Sort by Pages' : 'Sort by Author'}
                </button>
                {showSortDropdown && (
                  <div className="sort-dropdown glass">
                    <button onClick={() => { setSortBy('title'); setShowSortDropdown(false); }}>Title (A-Z)</button>
                    <button onClick={() => { setSortBy('author'); setShowSortDropdown(false); }}>Author (A-Z)</button>
                    <button onClick={() => { setSortBy('pages'); setShowSortDropdown(false); }}>Page Count (Max)</button>
                  </div>
                )}
              </div>
            </div>
          </header>

          <div className={`library-display-container ${viewMode}-view`}>
            {filteredResources.map(resource => (
              <div
                key={resource.id}
                className={`resource-card-premium ${viewMode === 'list' ? 'list-card' : ''}`}
              >
                <div className="card-cover-wrapper">
                  <img src={resource.cover} alt={resource.title} />
                  <button 
                    className={`bookmark-trigger ${bookmarkedIds.includes(resource.id) ? 'bookmarked' : ''}`}
                    onClick={(e) => toggleBookmark(e, resource.id)}
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill={bookmarkedIds.includes(resource.id) ? "var(--strategic-gold)" : "none"} stroke="currentColor" strokeWidth="2"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path></svg>
                  </button>
                </div>
                <div className="card-info">
                  <h3 title={resource.title}>{resource.title}</h3>
                  {resource.author && <p className="author-name">by {resource.author}</p>}
                  <div className="card-meta">
                    <span className="pages">{resource.pages} pages</span>
                  </div>
                  <div className="card-primary-actions">
                    <button className="btn-read-sm" onClick={() => handleRead(resource)}>Read</button>
                    <button className="btn-download-sm">Download</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Library;
