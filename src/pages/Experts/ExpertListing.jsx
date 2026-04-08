import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import ExpertCard from './components/ExpertCard';
import ExpertProfile from './ExpertProfile';
import Modal from '../../components/common/Modal';
import { MOCK_EXPERTS } from './mockExperts';
import './ExpertListing.css';

const ExpertListing = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  
  const initialCategory = queryParams.get('category') || 'all';
  const initialSearch = queryParams.get('query') || '';

  const [category, setCategory] = useState(initialCategory);
  const [search, setSearch] = useState(initialSearch);
  const [filteredExperts, setFilteredExperts] = useState(MOCK_EXPERTS);
  const [selectedDomains, setSelectedDomains] = useState([]);
  const [priceRange, setPriceRange] = useState('Any Price');
  const [experienceRange, setExperienceRange] = useState('All Experience');
  
  // Modal State
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [selectedExpertId, setSelectedExpertId] = useState(null);

  const handleOpenProfile = (id) => {
    setSelectedExpertId(id);
    setIsProfileOpen(true);
  };

  const handleCloseProfile = () => {
    setIsProfileOpen(false);
    setSelectedExpertId(null);
  };

  const categories = [
    { id: 'all', label: 'All Professionals' },
    { id: 'legal', label: 'Lawyers' },
    { id: 'financial', label: 'CAs & CFAs' }
  ];

  const allLegalDomains = [
    'Corporate Law', 'Family Law', 'IP & Patents', 'Criminal Defense', 'Real Estate', 'Arbitration', 'Civil Litigation'
  ];

  const allFinancialDomains = [
    'GST Compliance', 'Taxation', 'Audit & Assurance', 'Startup Finance', 'M&A', 'Wealth Management'
  ];

  const currentDomains = category === 'legal' ? allLegalDomains : category === 'financial' ? allFinancialDomains : [...allLegalDomains, ...allFinancialDomains];

  useEffect(() => {
    let result = MOCK_EXPERTS;

    // 1. Category Filter
    if (category !== 'all') {
      result = result.filter(ex => ex.category === category);
    }

    // 2. Search Text Filter
    if (search) {
      const lowSearch = search.toLowerCase();
      result = result.filter(ex => 
        ex.name.toLowerCase().includes(lowSearch) || 
        ex.title.toLowerCase().includes(lowSearch) ||
        ex.domains.some(d => d.toLowerCase().includes(lowSearch))
      );
    }

    // 3. Specialized Domains Filter (Multi-select)
    if (selectedDomains.length > 0) {
      result = result.filter(ex => 
        ex.domains.some(d => selectedDomains.includes(d))
      );
    }

    // 4. Price Range Filter
    if (priceRange !== 'Any Price') {
      result = result.filter(ex => {
        if (priceRange === 'Under ₹1,000') return ex.price < 1000;
        if (priceRange === '₹1,000 - ₹3,000') return ex.price >= 1000 && ex.price <= 3000;
        if (priceRange === '₹3,000 - ₹5,000') return ex.price > 3000 && ex.price <= 5000;
        if (priceRange === 'Over ₹5,000') return ex.price > 5000;
        return true;
      });
    }

    // 5. Experience Filter
    if (experienceRange !== 'All Experience') {
      result = result.filter(ex => {
        // Parse "12+ Years" or "8 Years" into an integer
        const years = parseInt(ex.experience);
        if (experienceRange === '0-5 Years') return years >= 0 && years <= 5;
        if (experienceRange === '5-10 Years') return years > 5 && years <= 10;
        if (experienceRange === '10+ Years') return years > 10;
        return true;
      });
    }

    setFilteredExperts(result);
  }, [category, search, selectedDomains, priceRange, experienceRange]);

  const toggleDomain = (domain) => {
    if (selectedDomains.includes(domain)) {
      setSelectedDomains(selectedDomains.filter(d => d !== domain));
    } else {
      setSelectedDomains([...selectedDomains, domain]);
    }
  };

  return (
    <div className="expert-listing-page">
      <div className="listing-container">
        {/* SIDEBAR FILTERS */}
        <aside className="filters-sidebar">
          <div className="filter-group">
            <h4 className="filter-title">Category</h4>
            <div className="filter-options">
              {categories.map(cat => (
                <button 
                  key={cat.id}
                  className={`filter-btn ${category === cat.id ? 'active' : ''}`}
                  onClick={() => { setCategory(cat.id); setSelectedDomains([]); }}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          <div className="filter-group">
            <h4 className="filter-title">Price Range</h4>
            <select 
              className="filter-select" 
              value={priceRange} 
              onChange={(e) => setPriceRange(e.target.value)}
            >
              <option>Any Price</option>
              <option>Under ₹1,000</option>
              <option>₹1,000 - ₹3,000</option>
              <option>₹3,000 - ₹5,000</option>
              <option>Over ₹5,000</option>
            </select>
          </div>

          <div className="filter-group">
            <h4 className="filter-title">Experience</h4>
            <select 
              className="filter-select"
              value={experienceRange}
              onChange={(e) => setExperienceRange(e.target.value)}
            >
              <option>All Experience</option>
              <option>0-5 Years</option>
              <option>5-10 Years</option>
              <option>10+ Years</option>
            </select>
          </div>

          <div className="filter-group">
            <h4 className="filter-title">Specialized Domains</h4>
            <div className="domain-chips-filter">
              {currentDomains.map(domain => (
                <button 
                  key={domain}
                  className={`domain-chip-btn ${selectedDomains.includes(domain) ? 'selected' : ''}`}
                  onClick={() => toggleDomain(domain)}
                >
                  {domain}
                </button>
              ))}
            </div>
          </div>
        </aside>

        {/* MAIN CONTENT */}
        <main className="listing-main">
          <div className="listing-header">
            <div className="header-info">
              <h1>{category === 'all' ? 'Professional Network' : category === 'legal' ? 'Legal Experts' : 'Financial Experts'}</h1>
              <p>{filteredExperts.length} elite professionals found</p>
            </div>
            <div className="search-bar-inline">
              <input 
                type="text" 
                placeholder="Search name, specialty..." 
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>

          <div className="experts-grid">
            {filteredExperts.length > 0 ? (
              filteredExperts.map(expert => (
                <ExpertCard key={expert.id} expert={expert} onViewProfile={handleOpenProfile} />
              ))
            ) : (
              <div className="no-results">
                <h3>No experts found matching your criteria.</h3>
                <button className="btn-clear-filters" onClick={() => { 
                  setCategory('all'); 
                  setSearch(''); 
                  setSelectedDomains([]); 
                  setPriceRange('Any Price');
                  setExperienceRange('All Experience');
                }}>Clear All Filters</button>
              </div>
            )}
          </div>
        </main>
      </div>

      <Modal isOpen={isProfileOpen} onClose={handleCloseProfile}>
        <ExpertProfile expertId={selectedExpertId} isModal={true} />
      </Modal>
    </div>
  );
};

export default ExpertListing;
