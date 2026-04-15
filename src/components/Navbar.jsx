import React, { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import SamLogo from './SamLogo';

export default function Navbar() {
  const { lang, toggleLanguage, t } = useLanguage();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
      setIsDarkMode(false);
      document.documentElement.setAttribute('data-theme', 'light');
    } else {
      setIsDarkMode(true);
      document.documentElement.setAttribute('data-theme', 'dark');
      localStorage.setItem('theme', 'dark');
    }
  }, []);

  const toggleTheme = () => {
    setIsDarkMode(prev => {
      const newMode = !prev;
      document.documentElement.setAttribute('data-theme', newMode ? 'dark' : 'light');
      localStorage.setItem('theme', newMode ? 'dark' : 'light');
      return newMode;
    });
  };

  const ThemeToggleBtn = ({ className }) => (
    <button className={`theme-toggle ${className || ''}`} onClick={toggleTheme} aria-label="Toggle theme">
      {isDarkMode ? (
        <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
          <path d="M12 3a9 9 0 1 0 9 9c0-.46-.04-.92-.1-1.36a5.389 5.389 0 0 1-4.4 2.26 5.403 5.403 0 0 1-3.14-9.8c-.44-.06-.9-.1-1.36-.1z" />
        </svg>
      ) : (
        <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="5"></circle>
          <line x1="12" y1="1" x2="12" y2="3"></line>
          <line x1="12" y1="21" x2="12" y2="23"></line>
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
          <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
          <line x1="1" y1="12" x2="3" y2="12"></line>
          <line x1="21" y1="12" x2="23" y2="12"></line>
          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
          <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
        </svg>
      )}
    </button>
  );

  return (
    <nav className="navbar">
      <div className="nav-brand">
        <Link to="/">{t.brand}</Link>
      </div>

      <div className={`nav-overlay ${isMobileMenuOpen ? 'active' : ''}`} onClick={() => setIsMobileMenuOpen(false)}></div>
      <div className={`nav-controls ${isMobileMenuOpen ? 'mobile-open' : ''}`}>
        <button className="mobile-close-btn" onClick={() => setIsMobileMenuOpen(false)} aria-label="Close menu">
          <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
        <div className="nav-links">
          <NavLink to="/process" className="nav-link" onClick={() => setIsMobileMenuOpen(false)}>{t.navProcess}</NavLink>
          <NavLink to="/essence" className="nav-link" onClick={() => setIsMobileMenuOpen(false)}>{t.navEssence}</NavLink>
          <NavLink to="/perfumes" className="nav-link" onClick={() => setIsMobileMenuOpen(false)}>{t.navCollection}</NavLink>
          <NavLink to="/gallery" className="nav-link" onClick={() => setIsMobileMenuOpen(false)}>{t.navGallery}</NavLink>
          <NavLink to="/consultation" className="nav-link" onClick={() => setIsMobileMenuOpen(false)}>{t.navConsult}</NavLink>
          <ThemeToggleBtn className="mobile-only-theme" />
        </div>
      </div>

      <div className="nav-actions">
        <ThemeToggleBtn className="desktop-only-theme" />
        <button className="lang-toggle" onClick={() => { toggleLanguage(); setIsMobileMenuOpen(false); }}>
          {lang === 'en' ? 'AR' : 'EN'}
        </button>
        <Link to="/consultation" className="cta-button nav-cta" onClick={() => setIsMobileMenuOpen(false)}>{t.bookNow}</Link>
        <div className="hamburger" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
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
