import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Link } from 'react-router-dom';

export default function Footer() {
  const { t } = useLanguage();
  return (
    <footer className="fat-footer">
      <div className="container">
        <div className="footer-top-grid">
          <div className="footer-col brand-col">
            <div className="footer-logo">
              <span style={{ fontSize: '1.6rem', fontWeight: '700', color: 'var(--primary-color)', letterSpacing: '2px', textTransform: 'uppercase', display: 'block', margin: 'auto', width: 'fit-content' }}>
                {t.brand}
              </span>
            </div>
            <p className="footer-desc" style={{ marginTop: '1rem', opacity: 0.7, maxWidth: '280px', fontSize: '0.9rem', lineHeight: '1.7', display: 'block', margin: 'auto', width: 'fit-content' }}>
              {t.heroDesc}
            </p>
            <div className="social-icons" style={{ display: 'flex', justifyContent: 'center', gap: '1.2rem', marginTop: '1.5rem' }}>
              <a href="https://www.instagram.com/samperfumes25?igsh=ZW5zcTdhbm5xYWN6&utm_source=qr" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="Instagram">
                <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
              </a>
              <a href="https://wa.me/201034346064" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="WhatsApp">
                <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>
              </a>
              <a href="https://facebook.com/samperfumes25?mibextid=wwXIfr" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="Facebook">
                <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
              </a>
              <a href="https://tiktok.com/@samperfumes25" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="TikTok">
                <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"></path></svg>
              </a>
            </div>
          </div>
          <div className="footer-col links-col">
            <h3 style={{ color: 'var(--text-light)', marginBottom: '1rem', fontSize: '1.1rem' }}>{t.quickLinks}</h3>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              <li style={{ marginBottom: '0.8rem' }}><Link to="/process" style={{ color: 'var(--text-muted)' }}>{t.navProcess}</Link></li>
              <li style={{ marginBottom: '0.8rem' }}><Link to="/essence" style={{ color: 'var(--text-muted)' }}>{t.navEssence}</Link></li>
              <li style={{ marginBottom: '0.8rem' }}><Link to="/perfumes" style={{ color: 'var(--text-muted)' }}>{t.navCollection}</Link></li>
              <li style={{ marginBottom: '0.8rem' }}><Link to="/consultation" style={{ color: 'var(--text-muted)' }}>{t.navConsult}</Link></li>
              <li style={{ marginBottom: '0.8rem' }}><Link to="/sourcing" style={{ color: 'var(--text-muted)' }}>{t.exploreSourcing}</Link></li>
            </ul>
          </div>
          <div className="footer-col links-col">
            <h3 style={{ color: 'var(--text-light)', marginBottom: '1rem', fontSize: '1.1rem' }}>{t.footerInfo}</h3>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              <li style={{ marginBottom: '0.8rem' }}><a href="#" style={{ color: 'var(--text-muted)' }}>{t.privacyPolicy}</a></li>
              <li style={{ marginBottom: '0.8rem' }}><a href="#" style={{ color: 'var(--text-muted)' }}>{t.termsOfService}</a></li>
              <li style={{ marginBottom: '0.8rem' }}><a href="#" style={{ color: 'var(--text-muted)' }}>{t.shippingPolicy}</a></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <p style={{ opacity: 0.5, fontSize: '0.9rem' }}>&copy; {new Date().getFullYear()} {t.brand}. All rights reserved.</p>
          <div className="payment-methods">
            {/* Mastercard */}
            <div className="pay-icon" aria-label="Mastercard" title="Mastercard">
              <svg viewBox="0 0 152 95" height="28" xmlns="http://www.w3.org/2000/svg">
                <rect width="152" height="95" rx="8" fill="#fff" />
                <circle cx="58" cy="47.5" r="30" fill="#EB001B" />
                <circle cx="94" cy="47.5" r="30" fill="#F79E1B" />
                <path d="M76 22.8a30 30 0 0 1 0 49.4A30 30 0 0 1 76 22.8z" fill="#FF5F00" />
              </svg>
            </div>
            {/* Visa */}
            <div className="pay-icon" aria-label="Visa" title="Visa">
              <svg viewBox="0 0 152 95" height="28" xmlns="http://www.w3.org/2000/svg">
                <rect width="152" height="95" rx="8" fill="#1A1F71" />
                <text x="76" y="63" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="42" fontWeight="bold" fill="white" letterSpacing="2">VISA</text>
              </svg>
            </div>
            {/* Apple Pay */}
            <div className="pay-icon" aria-label="Apple Pay" title="Apple Pay">
              <svg viewBox="0 0 152 95" height="28" xmlns="http://www.w3.org/2000/svg">
                <rect width="152" height="95" rx="8" fill="#000" />
                <path d="M43 34c1.5-1.8 2.5-4.3 2.2-6.9-2.1.1-4.7 1.5-6.2 3.3-1.3 1.6-2.5 4.1-2.2 6.5 2.3.2 4.7-1.2 6.2-2.9z" fill="white" />
                <path d="M45.1 37.5c-3.4-.2-6.4 2-8 2s-4.2-1.9-6.9-1.8c-3.5.1-6.8 2.1-8.5 5.3-3.7 6.4-1 15.9 2.6 21.1 1.7 2.6 3.8 5.4 6.5 5.3 2.6-.1 3.6-1.7 6.7-1.7s4 1.7 6.7 1.6c2.8-.1 4.6-2.6 6.3-5.1 2-2.9 2.8-5.8 2.8-5.9-.1 0-5.4-2.1-5.5-8.4-.1-5.2 4.2-7.7 4.4-7.9-2.4-3.6-6.1-4-7.1-4.5z" fill="white" />
                <text x="88" y="58" textAnchor="middle" fontFamily="-apple-system, BlinkMacSystemFont, sans-serif" fontSize="22" fontWeight="500" fill="white"> Pay</text>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
