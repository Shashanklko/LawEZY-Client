import React, { useState, useEffect, useCallback } from 'react';
import './Community.css';

const MOCK_DISCUSSIONS = [
  {
    id: 1,
    title: "Navigating the New Digital Personal Data Protection Act (DPDP) 2023",
    category: "Privacy Law",
    author: { name: "Adv. Priyanka Joshi", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop" },
    summary: "A deep dive into the practical implications for startups and international data transfers under the new Indian data regime.",
    stats: { views: 1240, comments: 45, likes: 128 },
    isTrending: true,
    timestamp: "2h ago"
  },
  {
    id: 2,
    title: "GST Scrutiny Notices: Strategic Response Framework",
    category: "Taxation",
    author: { name: "CA Arvind Mehta", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop" },
    summary: "Best practices for responding to ASMT-10 notices and navigating departmental audits with zero-exposure strategy.",
    stats: { views: 890, comments: 22, likes: 64 },
    timestamp: "5h ago"
  },
  {
    id: 3,
    title: "M&A Due Diligence in the Age of ESG Compliance",
    category: "Corporate",
    author: { name: "Adv. Sameer Khanna", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop" },
    summary: "How Environmental, Social, and Governance markers are fundamentally shifting the valuation landscape in Indian acquisitions.",
    stats: { views: 2100, comments: 78, likes: 245 },
    isTrending: true,
    timestamp: "1d ago"
  }
];

const TRENDING_TOPICS = [
  { name: "#DPDP2023", count: 156 },
  { name: "#ArbitrationReform", count: 89 },
  { name: "#StartupFunding", count: 234 },
  { name: "#GSTCompliance", count: 112 },
  { name: "#IPOStrategy", count: 67 }
];

const TOP_CONTRIBUTORS = [
  { name: "Sameer Khanna", role: "Senior Advocate", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop" },
  { name: "Priyanka Joshi", role: "Legal Tech Strategist", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop" },
  { name: "Arvind Mehta", role: "GST Consultant", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop" }
];

const fallbackNews = [
  { id: 'f1', source: "BAR & BENCH", date: "Just now", title: "Trimurti Films sues Aditya Dhar’s B62 Studios over 'Rang De Lal' song in Dhurandhar 2", summary: "Strategic insights into the high-profile cinematic litigation over copyright infringement.", link: "https://www.barandbench.com/news/litigation/trimurti-films-sues-aditya-dhars-b62-studios-over-use-of-hum-pyar-karne-wale-song-in-dhurandhar-2", category: 'National' },
  { id: 'f2', source: "ET LEGAL", date: "Apr 05, 2026", title: "SC to hear plea against Allahabad HC's verdict on UP Madarsa Act", summary: "The Supreme Court will examine the constitutional validity following the High Court's recent ruling.", link: "https://legal.economictimes.indiatimes.com/news/industry/sc-to-hear-plea-against-allahabad-hcs-verdict-on-up-madarsa-act/108960875", category: 'National' },
  { id: 'f3', source: "LIVELAW", date: "Apr 05, 2026", title: "Delhi Excise Policy Case: Court Extends Judicial Custody of Manish Sisodia", summary: "The specialized court has granted additional time for the enforcement directorate's investigative phase.", link: "https://www.livelaw.in/top-stories/delhi-excise-policy-case-court-extends-judicial-custody-of-manish-sisodia-254131", category: 'National' },
  { id: 'f4', source: "ABA JOURNAL", date: "Apr 04, 2026", title: "Supreme Court to decide if state laws can regulate social media platforms", summary: "A landmark constitutional case determining the limits of state power over digital moderation.", link: "https://www.abajournal.com/news/article/supreme-court-to-decide-if-state-laws-can-regulate-social-media-platforms", category: 'Global' },
  { id: 'f5', source: "GLOBAL LEGAL", date: "Apr 04, 2026", title: "Global M&A Activity Shows Resilience Amidst Regulatory Headwinds", summary: "Cross-border transaction volumes remain strong as strategic players adapt to new compliance norms.", link: "https://www.globallegalpost.com/news/global-ma-activity-shows-resilience-amidst-regulatory-headwinds-662211", category: 'Global' },
  { id: 'f6', source: "ET LEGAL", date: "Apr 03, 2026", title: "Google Wins Major Antitrust Victory in India as NCLAT Stays CCI Fine", summary: "In a move with global implications, the appellate tribunal provides temporary relief.", link: "https://legal.economictimes.indiatimes.com/news/industry/google-wins-major-antitrust-victory-in-india-nclat-stays-cci-fine-108871122", category: 'National' },
  { id: 'f7', source: "LIVELAW", date: "Apr 03, 2026", title: "LiveLaw Exclusive: Standard Operating Procedures for Virtual Hearings in India", summary: "The Supreme Court's latest guidance on institutionalizing digital access to the judiciary.", link: "https://www.livelaw.in/top-stories/virtual-hearings-sop-supreme-court-guidance-254001", category: 'National' },
  { id: 'f8', source: "GLOBAL LEGAL", date: "Apr 02, 2026", title: "The Rise of Singapore as the Global Arbitration Hub of Choice", summary: "New data shows a shift in international dispute resolution preferences toward Asian centers.", link: "https://www.globallegalpost.com/news/singapore-rises-as-global-arbitration-hub-661100", category: 'Global' }
];

const Community = () => {
  const [activeTab, setActiveTab] = useState('All Discussions');
  const [search, setSearch] = useState('');
  const [discussions, setDiscussions] = useState(MOCK_DISCUSSIONS);
  const [contributors, setContributors] = useState(TOP_CONTRIBUTORS);
  const [selectedPost, setSelectedPost] = useState(null);
  const [isNewDiscussionModalOpen, setIsNewDiscussionModalOpen] = useState(false);
  const [newPost, setNewPost] = useState({ title: '', category: '', summary: '' });
  
  // LIVE NEWSROOM LOGIC (Replicated from Home Newsroom)
  const [liveNews, setLiveNews] = useState([]);
  const [newsLoading, setNewsLoading] = useState(true);

  const fetchLiveNews = useCallback(async () => {
    setNewsLoading(true);
    try {
      const feeds = [
        { url: 'https://news.google.com/rss/search?q=site:barandbench.com+OR+site:livelaw.in+OR+site:legal.economictimes.indiatimes.com+legal+news&hl=en-IN&gl=IN&ceid=IN:en', type: 'National' },
        { url: 'https://news.google.com/rss/search?q=global+legal+intelligence+analysis+latest&hl=en-US&gl=US&ceid=US:en', type: 'Global' }
      ];

      const results = await Promise.all(
        feeds.map(async (f) => {
          try {
            const res = await fetch(`https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(f.url)}`);
            const data = await res.json();
            return data.status === 'ok' ? { ...data, type: f.type } : { status: 'error' };
          } catch { return { status: 'error' }; }
        })
      );

      const parseItem = (item, type) => {
        const parts = item.title.split(' - ');
        const source = parts.pop() || "LEGAL SOURCE";
        return {
          id: `gn-${Math.random().toString(36).substr(2, 9)}`,
          source: source.toUpperCase(),
          date: new Date(item.pubDate).toLocaleDateString('en-US', { month: 'short', day: '2-digit' }),
          title: parts.join(' - '),
          summary: item.description.replace(/<[^>]*>?/gm, '').slice(0, 100) + '...',
          link: item.link,
          category: type,
          timestamp: new Date(item.pubDate).getTime()
        };
      };

      const indiaPool = (results[0].items || []).map(i => parseItem(i, 'National'));
      const globalPool = (results[1].items || []).map(i => parseItem(i, 'Global'));

      // Include Trimurti case as a sticky priority if it's the specific target
      const list = [...indiaPool, ...globalPool].sort((a,b) => b.timestamp - a.timestamp).slice(0, 7);
      setLiveNews([fallbackNews[0], ...list]);
    } catch {
      setLiveNews(fallbackNews);
    } finally {
      setNewsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchLiveNews();
    const interval = setInterval(fetchLiveNews, 3600000); // Hourly refresh
    return () => clearInterval(interval);
  }, [fetchLiveNews]);

  // Filter Logic
  const filteredDiscussions = discussions.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(search.toLowerCase()) ||
      post.summary.toLowerCase().includes(search.toLowerCase()) ||
      post.category.toLowerCase().includes(search.toLowerCase());

    if (activeTab === 'Trending') return matchesSearch && post.isTrending;
    if (activeTab === 'My Activity') return matchesSearch && post.author.name === "You"; // Simple mock filter
    return matchesSearch;
  });

  const handleLike = (id, e) => {
    e.stopPropagation();
    setDiscussions(prev => prev.map(p =>
      p.id === id ? { ...p, stats: { ...p.stats, likes: p.stats.likes + 1 } } : p
    ));
  };

  return (
    <div className="community-page">
      <div className="community-hero">
        <div className="hero-content">
          <h1>LAWEZY Community Hub</h1>

          <div className="feed-controls">
            <div className="tabs">
              {['All Discussions', 'News', 'My Activity'].map(tab => (
                <button
                  key={tab}
                  className={`tab-btn ${activeTab === tab ? 'active' : ''}`}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab}
                </button>
              ))}
            </div>
            <button
              className="btn-new-discussion"
              onClick={() => setIsNewDiscussionModalOpen(true)}
            >
              START DISCUSSION +
            </button>
          </div>

          <div className="community-search-bar">
            <input
              type="text"
              placeholder="Search discussions, topics, or contributors..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button className="btn-search-community">SEARCH HUB</button>
          </div>
        </div>
      </div>

      <div className={`community-layout ${activeTab !== 'All Discussions' ? 'full-width-feed' : ''}`}>
        {/* LEFT SIDEBAR: TOPICS & CONTRIBUTORS */}
        {activeTab === 'All Discussions' && (
          <aside className="community-sidebar">
            <div className="sidebar-section">
              <div className="section-header">
                <h3>TRENDING TOPICS</h3>
              </div>
              <div className="topics-list">
                {TRENDING_TOPICS.map(topic => (
                  <button
                    key={topic.name}
                    className="topic-item"
                    onClick={() => setSearch(topic.name.replace('#', ''))}
                  >
                    <span className="topic-name">{topic.name}</span>
                    <span className="topic-count">{topic.count} posts</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="sidebar-section">
              <div className="section-header">
                <h3>TOP CONTRIBUTORS</h3>
              </div>
              <div className="contributors-list">
                {contributors.map(user => (
                  <div key={user.name} className="contributor-card">
                    <img src={user.avatar} alt={user.name} />
                    <div className="contributor-info">
                      <strong>{user.name}</strong>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </aside>
        )}

        {/* MAIN FEED */}
        <main className="community-feed">
          {activeTab === 'News' ? (
            <div className="news-feed-container">
              <div className="section-header">
                <div className="live-status">
                  <span className="live-dot"></span>
                  LIVE NEWSROOM
                </div>
                <h3>DAILY LEGAL INTELLIGENCE FEED</h3>
              </div>
              <div className="news-grid-layout">
                {newsLoading ? (
                  <div className="loading-state">Syncing with global legal feeds...</div>
                ) : (
                  <>
                    <div className="news-list main-news-column">
                      {liveNews.slice(0, 4).map(item => (
                        <div 
                          key={item.id} 
                          className="news-item main-news-card"
                          onClick={() => window.open(item.link, '_blank')}
                        >
                          <div className="card-top">
                            <span className="news-source">{item.source}</span>
                            <span className="news-time">{item.date}</span>
                          </div>
                          <h2 className="news-headline">{item.title}</h2>
                          <p className="news-preview">{item.summary}</p>
                          <div className="card-bottom">
                            <span className="read-article">READ FULL ARTICLE →</span>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="news-list secondary-news-column">
                      {liveNews.slice(4, 10).map(item => (
                        <div 
                          key={item.id} 
                          className="news-item main-news-card"
                          onClick={() => window.open(item.link, '_blank')}
                        >
                          <div className="card-top">
                            <span className="news-source">{item.source}</span>
                            <span className="news-time">{item.date}</span>
                          </div>
                          <h2 className="news-headline">{item.title}</h2>
                          <p className="news-preview">{item.summary}</p>
                          <div className="card-bottom">
                            <span className="read-article">READ FULL ARTICLE →</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </div>
            </div>
          ) : (
            <div className="discussions-list">
              {filteredDiscussions.map(post => (
                <div
                  key={post.id}
                  className="discussion-card"
                  onClick={() => setSelectedPost(post)}
                >
                  <div className="card-top">
                    <span className="post-category">{post.category}</span>
                    <span className="post-time">{post.timestamp}</span>
                  </div>

                  <h2 className="post-title">{post.title}</h2>
                  <p className="post-summary">{post.summary}</p>

                  <div className="card-bottom">
                    <div className="author-mini">
                      <img src={post.author.avatar} alt={post.author.name} />
                      <span>{post.author.name}</span>
                    </div>
                  </div>
                </div>
              ))}
              {filteredDiscussions.length === 0 && (
                <div className="empty-state">
                  <p>No discussions found matching your search criteria.</p>
                  <button onClick={() => { setSearch(''); setActiveTab('All Discussions'); }}>Clear Filters</button>
                </div>
              )}
            </div>
          )}
        </main>
      </div>

      {/* VIEW DISCUSSION MODAL */}
      {selectedPost && (
        <div className="community-modal-overlay" onClick={() => setSelectedPost(null)}>
          <div className="community-modal detail-modal" onClick={e => e.stopPropagation()}>
            <button className="close-modal" onClick={() => setSelectedPost(null)}>×</button>
            <div className="modal-header">
              <span className="post-category">{selectedPost.category}</span>
              <h2>{selectedPost.title}</h2>
              <div className="author-full">
                <img src={selectedPost.author.avatar} alt={selectedPost.author.name} />
                <div className="author-meta">
                  <strong>{selectedPost.author.name}</strong>
                  <span>{selectedPost.timestamp}</span>
                </div>
              </div>
            </div>
            <div className="modal-body">
              <p className="modal-summary">{selectedPost.summary}</p>
              <div className="full-content-placeholder">
                <p>This is a high-authority legal discussion environment. The full contribution from the expert would be rendered here, featuring strategic insights, regulatory references, and practical compliance frameworks.</p>
              </div>
              <div className="comments-section">
                <div className="comment-input">
                  <input type="text" placeholder="Share your legal perspective..." />
                  <button className="btn-post-comment">POST</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* NEW DISCUSSION MODAL */}
      {isNewDiscussionModalOpen && (
        <div className="community-modal-overlay" onClick={() => setIsNewDiscussionModalOpen(false)}>
          <div className="community-modal create-modal" onClick={e => e.stopPropagation()}>
            <button className="close-modal" onClick={() => setIsNewDiscussionModalOpen(false)}>×</button>
            <h2>Strategic Legal Discussion</h2>
            <p className="modal-desc">Share insights, ask for perspectives, or lead a new legal narrative.</p>
            <div className="create-form">
              <input
                type="text"
                placeholder="Title (e.g., Strategic Impact of Section 80G Amendments)"
                value={newPost.title}
                onChange={e => setNewPost({ ...newPost, title: e.target.value })}
              />
              <input
                type="text"
                placeholder="Category (e.g., Taxation, Corporate Law)"
                value={newPost.category}
                onChange={e => setNewPost({ ...newPost, category: e.target.value })}
              />
              <textarea
                placeholder="Synthesize your core legal premise..."
                value={newPost.summary}
                onChange={e => setNewPost({ ...newPost, summary: e.target.value })}
              />
              <button
                className="btn-submit-discussion"
                onClick={() => {
                  if (!newPost.title || !newPost.summary) return;
                  const authorName = "You";
                  const authorAvatar = "https://i.pravatar.cc/100?u=you";

                  setDiscussions([{
                    ...newPost,
                    id: Date.now(),
                    author: { name: authorName, avatar: authorAvatar },
                    stats: { views: 0, comments: 0, likes: 0 },
                    timestamp: "Just now",
                    isTrending: false
                  }, ...discussions]);

                  setContributors(prev => {
                    const alreadyExists = prev.some(c => c.name === authorName);
                    if (alreadyExists) return prev;
                    return [{ name: authorName, avatar: authorAvatar }, ...prev];
                  });

                  setIsNewDiscussionModalOpen(false);
                  setNewPost({ title: '', category: '', summary: '' });
                }}
              >
                PUBLISH TO HUB
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default Community;
