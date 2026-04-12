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
            <div className="footer-logo">{t.brand}</div>
            <p className="footer-desc" style={{ marginTop: '1.5rem', opacity: 0.7, maxWidth: '300px' }}>
              Aura Bespoke formulates exclusive fragrances tailored precisely to your unique essence and desires.
            </p>
            <div className="social-icons" style={{ display: 'flex', justifyContent: 'center', gap: '1.2rem', marginTop: '2rem' }}>
              <a href="#" className="social-icon" aria-label="Instagram">
                <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
              </a>
              <a href="#" className="social-icon" aria-label="WhatsApp">
                <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>
              </a>
              <a href="#" className="social-icon" aria-label="Facebook">
                <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
              </a>
              <a href="#" className="social-icon" aria-label="Twitter">
                <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path></svg>
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
            <h3 style={{ color: 'var(--text-light)', marginBottom: '1rem', fontSize: '1.1rem' }}>Info</h3>
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
            <div className="pay-icon" aria-label="Visa">
              <svg viewBox="0 0 50 16" height="15" fill="currentColor">
                <path d="M21.5,0.5l-2.6,15h4.2l2.6,-15H21.5z M15,0.5l-3.9,10L10.4,3.2C10,1,8,-0.1,6.5,0.1L0,0.5l0.5,1.7 c1.6,0.3,3,1,3.5,1.5c0.5,0.5,0.8,1.3,1,2l3.4,9.9h4.3l6.5,-15H15z M36.3,4.7c-2.3,-0.6-2.6,-1.3-2.6,-2.1c0,-1,1.2,-1.8,2.4,-1.8 c1.4,0,2.2,0.3,3.1,0.6l0.5,-2.9c-1,-0.4-2.3,-0.6-4,-0.6c-3.5,0-6.1,1.8-6.1,4.4c0,2,1.6,3.1,3,3.7c1.4,0.7,1.8,1.1,1.8,1.7 c0,0.9-1.1,1.3-2,1.3c-1.6,0-2.6,-0.3-3.9,-0.8l-0.5,2.9c1,0.5,2.6,0.8,4.2,0.8c3.8,0,6.2,-1.9,6.2,-4.7C38.4,5.9,36.3,4.7,36.3,4.7z M50,0.5h-3c-1,0-1.7,0.3-2.1,1.2l-6,13.8h4.4l0.9,-2.4h5.4l0.5,2.4H50L50,0.5z M41.9,10.6l2.3,-6.2l1.3,6.2H41.9z" />
              </svg>
            </div>
            <div className="pay-icon" aria-label="Mastercard">
              <svg viewBox="0 0 32 20" height="20">
                <circle cx="10" cy="10" r="10" fill="#EB001B" />
                <circle cx="22" cy="10" r="10" fill="#F79E1B" />
                <path d="M16 18a9.97 9.97 0 0 0 4-8 9.97 9.97 0 0 0-4-8 9.97 9.97 0 0 0-4 8 9.97 9.97 0 0 0 4 8z" fill="#FF5F00" />
              </svg>
            </div>
            <div className="pay-icon" aria-label="Apple Pay">
              <svg viewBox="0 0 54 22" height="15" fill="currentColor">
                <path d="M11,10.1C11,6.5,13.8,4.6,13.8,4.6C12.5,2.7,10,2.3,9,2.3C6.7,2.1,4.4,3.7,3.1,3.7C1.8,3.7,-0.2,2.3,-2,2.3C-4.3,2.4,-6.5,3.6,-7.7,5.7c-2.4,4.2,-0.6,10.4,1.8,13.8c1.1,1.6,2.5,3.5,4.3,3.4c1.7,-0.1,2.4,-1.1,4.5,-1.1c2.1,0,2.7,1.1,4.5,1.1c1.9,0,3.1,-1.7,4.2,-3.3C11.1,17.4,11.7,15.6,11.7,15.5C11.6,15.4,8,14,8,10.1z M8,-0.2C8.9,-1.4,9.6,-3.1,9.4,-4.8c-1.4,0.1,-3.2,1,-4.2,2.2c-0.9,1.1,-1.7,2.9,-1.5,4.5C5.1,2.1,6.8,1.2,8,-0.2z" transform="translate(8, 5)" />
                <text x="24" y="18" fontFamily="-apple-system, system-ui, BlinkMacSystemFont, sans-serif" fontSize="18" fontWeight="600" letterSpacing="-0.5">Pay</text>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
