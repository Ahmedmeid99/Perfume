import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

export default function Navbar() {
  const { lang, toggleLanguage, t } = useLanguage();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="nav-brand">
        <Link to="/">{t.brand}</Link>
      </div>

      <div className={`nav-controls ${isMobileMenuOpen ? 'mobile-open' : ''}`}>
        <div className="nav-links">
          <Link to="/process" className="nav-link" onClick={() => setIsMobileMenuOpen(false)}>{t.navProcess}</Link>
          <Link to="/essence" className="nav-link" onClick={() => setIsMobileMenuOpen(false)}>{t.navEssence}</Link>
          <Link to="/perfumes" className="nav-link" onClick={() => setIsMobileMenuOpen(false)}>{t.navCollection}</Link>
          <Link to="/consultation" className="nav-link" onClick={() => setIsMobileMenuOpen(false)}>{t.navConsult}</Link>
        </div>
      </div>

      <div className="nav-actions">
        <button className="lang-toggle" onClick={() => { toggleLanguage(); setIsMobileMenuOpen(false); }}>
          {lang === 'en' ? 'AR' : 'EN'}
        </button>
        <Link to="/consultation" className="cta-button nav-cta" onClick={() => setIsMobileMenuOpen(false)}>{t.bookNow}</Link>
        <div className="hamburger" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          <svg viewBox="0 0 24 24" width="28" height="28" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
            {isMobileMenuOpen ? (
              <>
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </>
            ) : (
              <>
                <line x1="3" y1="12" x2="21" y2="12"></line>
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <line x1="3" y1="18" x2="21" y2="18"></line>
              </>
            )}
          </svg>
        </div>
      </div>
    </nav>
  );
}
