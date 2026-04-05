import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Signup.css';

const COUNTRY_CODES = [
  { name: 'Afghanistan', iso: 'AF', code: '+93' },
  { name: 'Albania', iso: 'AL', code: '+355' },
  { name: 'Algeria', iso: 'DZ', code: '+213' },
  { name: 'American Samoa', iso: 'AS', code: '+1-684' },
  { name: 'Andorra', iso: 'AD', code: '+376' },
  { name: 'Angola', iso: 'AO', code: '+244' },
  { name: 'Anguilla', iso: 'AI', code: '+1-264' },
  { name: 'Antarctica', iso: 'AQ', code: '+672' },
  { name: 'Antigua and Barbuda', iso: 'AG', code: '+1-268' },
  { name: 'Argentina', iso: 'AR', code: '+54' },
  { name: 'Armenia', iso: 'AM', code: '+374' },
  { name: 'Aruba', iso: 'AW', code: '+297' },
  { name: 'Australia', iso: 'AU', code: '+61' },
  { name: 'Austria', iso: 'AT', code: '+43' },
  { name: 'Azerbaijan', iso: 'AZ', code: '+994' },
  { name: 'Bahamas', iso: 'BS', code: '+1-242' },
  { name: 'Bahrain', iso: 'BH', code: '+973' },
  { name: 'Bangladesh', iso: 'BD', code: '+880' },
  { name: 'Barbados', iso: 'BB', code: '+1-246' },
  { name: 'Belarus', iso: 'BY', code: '+375' },
  { name: 'Belgium', iso: 'BE', code: '+32' },
  { name: 'Belize', iso: 'BZ', code: '+501' },
  { name: 'Benin', iso: 'BJ', code: '+229' },
  { name: 'Bermuda', iso: 'BM', code: '+1-441' },
  { name: 'Bhutan', iso: 'BT', code: '+975' },
  { name: 'Bolivia', iso: 'BO', code: '+591' },
  { name: 'Bosnia and Herzegovina', iso: 'BA', code: '+387' },
  { name: 'Botswana', iso: 'BW', code: '+267' },
  { name: 'Brazil', iso: 'BR', code: '+55' },
  { name: 'Brunei', iso: 'BN', code: '+673' },
  { name: 'Bulgaria', iso: 'BG', code: '+359' },
  { name: 'Burkina Faso', iso: 'BF', code: '+226' },
  { name: 'Burundi', iso: 'BI', code: '+257' },
  { name: 'Cambodia', iso: 'KH', code: '+855' },
  { name: 'Cameroon', iso: 'CM', code: '+237' },
  { name: 'Canada', iso: 'CA', code: '+1' },
  { name: 'Cape Verde', iso: 'CV', code: '+238' },
  { name: 'Cayman Islands', iso: 'KY', code: '+1-345' },
  { name: 'Central African Republic', iso: 'CF', code: '+236' },
  { name: 'Chad', iso: 'TD', code: '+235' },
  { name: 'Chile', iso: 'CL', code: '+56' },
  { name: 'China', iso: 'CN', code: '+86' },
  { name: 'Colombia', iso: 'CO', code: '+57' },
  { name: 'Comoros', iso: 'KM', code: '+269' },
  { name: 'Congo', iso: 'CG', code: '+242' },
  { name: 'Costa Rica', iso: 'CR', code: '+506' },
  { name: 'Croatia', iso: 'HR', code: '+385' },
  { name: 'Cuba', iso: 'CU', code: '+53' },
  { name: 'Cyprus', iso: 'CY', code: '+357' },
  { name: 'Czech Republic', iso: 'CZ', code: '+420' },
  { name: 'Denmark', iso: 'DK', code: '+45' },
  { name: 'Djibouti', iso: 'DJ', code: '+253' },
  { name: 'Dominica', iso: 'DM', code: '+1-767' },
  { name: 'Dominican Republic', iso: 'DO', code: '+1-809' },
  { name: 'Ecuador', iso: 'EC', code: '+593' },
  { name: 'Egypt', iso: 'EG', code: '+20' },
  { name: 'El Salvador', iso: 'SV', code: '+503' },
  { name: 'Equatorial Guinea', iso: 'GQ', code: '+240' },
  { name: 'Eritrea', iso: 'ER', code: '+291' },
  { name: 'Estonia', iso: 'EE', code: '+372' },
  { name: 'Eswatini', iso: 'SZ', code: '+268' },
  { name: 'Ethiopia', iso: 'ET', code: '+251' },
  { name: 'Fiji', iso: 'FJ', code: '+679' },
  { name: 'Finland', iso: 'FI', code: '+358' },
  { name: 'France', iso: 'FR', code: '+33' },
  { name: 'Gabon', iso: 'GA', code: '+241' },
  { name: 'Gambia', iso: 'GM', code: '+220' },
  { name: 'Georgia', iso: 'GE', code: '+995' },
  { name: 'Germany', iso: 'DE', code: '+49' },
  { name: 'Ghana', iso: 'GH', code: '+233' },
  { name: 'Gibraltar', iso: 'GI', code: '+350' },
  { name: 'Greece', iso: 'GR', code: '+30' },
  { name: 'Greenland', iso: 'GL', code: '+299' },
  { name: 'Grenada', iso: 'GD', code: '+1-473' },
  { name: 'Guam', iso: 'GU', code: '+1-671' },
  { name: 'Guatemala', iso: 'GT', code: '+502' },
  { name: 'Guinea', iso: 'GN', code: '+224' },
  { name: 'Guinea-Bissau', iso: 'GW', code: '+245' },
  { name: 'Guyana', iso: 'GY', code: '+592' },
  { name: 'Haiti', iso: 'HT', code: '+509' },
  { name: 'Honduras', iso: 'HN', code: '+504' },
  { name: 'Hong Kong', iso: 'HK', code: '+852' },
  { name: 'Hungary', iso: 'HU', code: '+36' },
  { name: 'Iceland', iso: 'IS', code: '+354' },
  { name: 'India', iso: 'IN', code: '+91' },
  { name: 'Indonesia', iso: 'ID', code: '+62' },
  { name: 'Iran', iso: 'IR', code: '+98' },
  { name: 'Iraq', iso: 'IQ', code: '+964' },
  { name: 'Ireland', iso: 'IE', code: '+353' },
  { name: 'Israel', iso: 'IL', code: '+972' },
  { name: 'Italy', iso: 'IT', code: '+39' },
  { name: 'Jamaica', iso: 'JM', code: '+1-876' },
  { name: 'Japan', iso: 'JP', code: '+81' },
  { name: 'Jordan', iso: 'JO', code: '+962' },
  { name: 'Kazakhstan', iso: 'KZ', code: '+7' },
  { name: 'Kenya', iso: 'KE', code: '+254' },
  { name: 'Kiribati', iso: 'KI', code: '+686' },
  { name: 'Kuwait', iso: 'KW', code: '+965' },
  { name: 'Kyrgyzstan', iso: 'KG', code: '+996' },
  { name: 'Laos', iso: 'LA', code: '+856' },
  { name: 'Latvia', iso: 'LV', code: '+371' },
  { name: 'Lebanon', iso: 'LB', code: '+961' },
  { name: 'Lesotho', iso: 'LS', code: '+266' },
  { name: 'Liberia', iso: 'LR', code: '+231' },
  { name: 'Libya', iso: 'LY', code: '+218' },
  { name: 'Liechtenstein', iso: 'LI', code: '+423' },
  { name: 'Lithuania', iso: 'LT', code: '+370' },
  { name: 'Luxembourg', iso: 'LU', code: '+352' },
  { name: 'Madagascar', iso: 'MG', code: '+261' },
  { name: 'Malawi', iso: 'MW', code: '+265' },
  { name: 'Malaysia', iso: 'MY', code: '+60' },
  { name: 'Maldives', iso: 'MV', code: '+960' },
  { name: 'Mali', iso: 'ML', code: '+223' },
  { name: 'Malta', iso: 'MT', code: '+356' },
  { name: 'Marshall Islands', iso: 'MH', code: '+692' },
  { name: 'Mauritania', iso: 'MR', code: '+222' },
  { name: 'Mauritius', iso: 'MU', code: '+230' },
  { name: 'Mexico', iso: 'MX', code: '+52' },
  { name: 'Micronesia', iso: 'FM', code: '+691' },
  { name: 'Moldova', iso: 'MD', code: '+373' },
  { name: 'Monaco', iso: 'MC', code: '+377' },
  { name: 'Mongolia', iso: 'MN', code: '+976' },
  { name: 'Montenegro', iso: 'ME', code: '+382' },
  { name: 'Morocco', iso: 'MA', code: '+212' },
  { name: 'Mozambique', iso: 'MZ', code: '+258' },
  { name: 'Myanmar', iso: 'MM', code: '+95' },
  { name: 'Namibia', iso: 'NA', code: '+264' },
  { name: 'Nauru', iso: 'NR', code: '+674' },
  { name: 'Nepal', iso: 'NP', code: '+977' },
  { name: 'Netherlands', iso: 'NL', code: '+31' },
  { name: 'New Zealand', iso: 'NZ', code: '+64' },
  { name: 'Nicaragua', iso: 'NI', code: '+505' },
  { name: 'Niger', iso: 'NE', code: '+227' },
  { name: 'Nigeria', iso: 'NG', code: '+234' },
  { name: 'North Korea', iso: 'KP', code: '+850' },
  { name: 'North Macedonia', iso: 'MK', code: '+389' },
  { name: 'Norway', iso: 'NO', code: '+47' },
  { name: 'Oman', iso: 'OM', code: '+968' },
  { name: 'Pakistan', iso: 'PK', code: '+92' },
  { name: 'Palau', iso: 'PW', code: '+680' },
  { name: 'Panama', iso: 'PA', code: '+507' },
  { name: 'Papua New Guinea', iso: 'PG', code: '+675' },
  { name: 'Paraguay', iso: 'PY', code: '+595' },
  { name: 'Peru', iso: 'PE', code: '+51' },
  { name: 'Philippines', iso: 'PH', code: '+63' },
  { name: 'Poland', iso: 'PL', code: '+48' },
  { name: 'Portugal', iso: 'PT', code: '+351' },
  { name: 'Qatar', iso: 'QA', code: '+974' },
  { name: 'Romania', iso: 'RO', code: '+40' },
  { name: 'Russia', iso: 'RU', code: '+7' },
  { name: 'Rwanda', iso: 'RW', code: '+250' },
  { name: 'Saint Kitts and Nevis', iso: 'KN', code: '+1-869' },
  { name: 'Saint Lucia', iso: 'LC', code: '+1-758' },
  { name: 'Saint Vincent and the Grenadines', iso: 'VC', code: '+1-784' },
  { name: 'Samoa', iso: 'WS', code: '+685' },
  { name: 'San Marino', iso: 'SM', code: '+378' },
  { name: 'Sao Tome and Principe', iso: 'ST', code: '+239' },
  { name: 'Saudi Arabia', iso: 'SA', code: '+966' },
  { name: 'Senegal', iso: 'SN', code: '+221' },
  { name: 'Serbia', iso: 'RS', code: '+381' },
  { name: 'Seychelles', iso: 'SC', code: '+248' },
  { name: 'Sierra Leone', iso: 'SL', code: '+232' },
  { name: 'Singapore', iso: 'SG', code: '+65' },
  { name: 'Slovakia', iso: 'SK', code: '+421' },
  { name: 'Slovenia', iso: 'SI', code: '+386' },
  { name: 'Solomon Islands', iso: 'SB', code: '+677' },
  { name: 'Somalia', iso: 'SO', code: '+252' },
  { name: 'South Africa', iso: 'ZA', code: '+27' },
  { name: 'South Korea', iso: 'KR', code: '+82' },
  { name: 'South Sudan', iso: 'SS', code: '+211' },
  { name: 'Spain', iso: 'ES', code: '+34' },
  { name: 'Sri Lanka', iso: 'LK', code: '+94' },
  { name: 'Sudan', iso: 'SD', code: '+249' },
  { name: 'Suriname', iso: 'SR', code: '+597' },
  { name: 'Sweden', iso: 'SE', code: '+46' },
  { name: 'Switzerland', iso: 'CH', code: '+41' },
  { name: 'Syria', iso: 'SY', code: '+963' },
  { name: 'Taiwan', iso: 'TW', code: '+886' },
  { name: 'Tajikistan', iso: 'TJ', code: '+992' },
  { name: 'Tanzania', iso: 'TZ', code: '+255' },
  { name: 'Thailand', iso: 'TH', code: '+66' },
  { name: 'Timor-Leste', iso: 'TL', code: '+670' },
  { name: 'Togo', iso: 'TG', code: '+228' },
  { name: 'Tonga', iso: 'TO', code: '+676' },
  { name: 'Trinidad and Tobago', iso: 'TT', code: '+1-868' },
  { name: 'Tunisia', iso: 'TN', code: '+216' },
  { name: 'Turkey', iso: 'TR', code: '+90' },
  { name: 'Turkmenistan', iso: 'TM', code: '+993' },
  { name: 'Tuvalu', iso: 'TV', code: '+688' },
  { name: 'Uganda', iso: 'UG', code: '+256' },
  { name: 'Ukraine', iso: 'UA', code: '+380' },
  { name: 'United Arab Emirates', iso: 'AE', code: '+971' },
  { name: 'United Kingdom', iso: 'GB', code: '+44' },
  { name: 'United States', iso: 'US', code: '+1' },
  { name: 'Uruguay', iso: 'UY', code: '+598' },
  { name: 'Uzbekistan', iso: 'UZ', code: '+998' },
  { name: 'Vanuatu', iso: 'VU', code: '+678' },
  { name: 'Vatican City', iso: 'VA', code: '+379' },
  { name: 'Venezuela', iso: 'VE', code: '+58' },
  { name: 'Vietnam', iso: 'VN', code: '+84' },
  { name: 'Yemen', iso: 'YE', code: '+967' },
  { name: 'Zambia', iso: 'ZM', code: '+260' },
  { name: 'Zimbabwe', iso: 'ZW', code: '+263' }
];

const Signup = () => {
  const [role, setRole] = React.useState('client');
  const [selectedCC, setSelectedCC] = React.useState('+91');
  const [phoneNumber, setPhoneNumber] = React.useState('');

  const handlePhoneChange = (e) => {
    const value = e.target.value.replace(/\D/g, ''); // Numeric only
    setPhoneNumber(value);
  };

  return (
    <div className="signup-page">
      <div className="signup-overlay"></div>
      <div className="mesh-bg-container">
        <div className="mesh-ball ball-1"></div>
        <div className="mesh-ball ball-2" style={{ background: role === 'pro' ? '#8B5A2B' : '#7F1D1D' }}></div>
        <div className="mesh-ball ball-3"></div>
      </div>

      {/* FLOAT EXIT BUTTON */}
      <Link to="/" className="portal-exit-btn stagger-reveal">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
      </Link>

      <div className="signup-content-wrapper">
        <div className="signup-hero-section">
          <h1 className="hero-signup-title" style={{ fontSize: '5rem' }}>Join the<br />Elite.</h1>
          <p className="hero-signup-desc">
            <Link to="/" className="hero-brand-link">
              <span style={{ color: role === 'pro' ? '#8B5A2B' : '#7F1D1D', fontWeight: '800' }}>LAWEZY</span>
            </Link> – High-precision platform for legal 
            and professional expertise.
          </p>
        </div>

        <div className="signup-form-section">
          <div className="glass-signup-card">
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

            <form className="signup-form" onSubmit={(e) => e.preventDefault()}>
              <div className="form-row stagger-reveal delay-2">
                <div className="form-group">
                  <label className="signup-label">First Name</label>
                  <div className="input-with-icon">
                    <input type="text" className="signup-input" placeholder="e.g. Shashank" required />
                    <div className="input-icon">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                    </div>
                  </div>
                </div>
                <div className="form-group">
                  <label className="signup-label">Last Name</label>
                  <div className="input-with-icon">
                    <input type="text" className="signup-input" placeholder="e.g. Srivastava" required />
                    <div className="input-icon">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                    </div>
                  </div>
                </div>
              </div>

              <div className="form-row stagger-reveal delay-2">
                <div className="form-group">
                  <label className="signup-label">Email Address</label>
                  <div className="input-with-icon">
                    <input type="email" className="signup-input" placeholder="shashank@example.com" required />
                    <div className="input-icon">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                    </div>
                  </div>
                </div>
                <div className="form-group">
                  <label className="signup-label">Phone Number</label>
                  <div className="input-with-icon">
                    <div className="cc-selector-wrapper">
                      <div className="cc-visual-display">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '6px', opacity: 0.8 }}><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.81 12.81 0 0 0 .62 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.62A2 2 0 0 1 22 16.92z"></path></svg>
                        <span className="cc-code-text">{selectedCC}</span>
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" style={{ marginLeft: '4px', opacity: 0.6 }}><polyline points="6 9 12 15 18 9"></polyline></svg>
                      </div>
                      <select 
                        className="cc-native-select" 
                        value={selectedCC} 
                        onChange={(e) => setSelectedCC(e.target.value)}
                      >
                        {COUNTRY_CODES.map((item, idx) => (
                          <option key={idx} value={item.code}>
                            {item.name} ({item.iso}) {item.code}
                          </option>
                        ))}
                      </select>
                    </div>
                    <input 
                      type="tel" 
                      className="signup-input phone-input" 
                      placeholder="9876543210" 
                      value={phoneNumber}
                      onChange={handlePhoneChange}
                      inputMode="numeric"
                      required 
                    />
                  </div>
                </div>
              </div>

              <div className="signup-row stagger-reveal delay-3">
                {role === 'pro' && (
                  <div className="form-group" style={{ flex: 1.2 }}>
                    <label className="signup-label">I am a...</label>
                    <div className="input-with-icon">
                      <select className="signup-input" required style={{ appearance: 'none' }}>
                        <option value="">Select your category</option>
                        <option value="legal">Legal Professional (Lawyer)</option>
                        <option value="ca">CA (Chartered Accountant)</option>
                        <option value="cfa">CFA (Chartered Financial Analyst)</option>
                      </select>
                      <div className="input-icon">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path></svg>
                      </div>
                    </div>
                  </div>
                )}

                <div className="form-group" style={{ flex: role === 'client' ? 2 : 1 }}>
                  <label className="signup-label">Password</label>
                  <div className="input-with-icon">
                    <input 
                      type="password" 
                      placeholder="Password" 
                      className="signup-input" 
                      minLength="8"
                      pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$"
                      title="Must include: 1 Uppercase, 1 Lowercase, 1 Number, and 1 Symbol (@$!%*#?&)"
                      required 
                    />
                    <div className="input-icon">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
                    </div>
                  </div>
                </div>
              </div>

              <button type="submit" className="btn-signup-primary stagger-reveal delay-4">
                <div className="btn-content">
                  <span>Sign Up</span>
                  <svg className="btn-arrow" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                </div>
              </button>

              <div className="signup-footer stagger-reveal" style={{ animationDelay: '0.5s' }}>
                Existing Member? <Link to="/login" className="signup-link-bold">Secure Login</Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
