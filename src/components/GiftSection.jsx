import React, { useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Link } from 'react-router-dom';

export default function GiftSection() {
  const { t, lang } = useLanguage();

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        }
      });
    }, { threshold: 0.15 });

    const animatedElements = document.querySelectorAll('.gift-section .animate-view');
    animatedElements.forEach((el) => { observer.observe(el); });
    return () => observer.disconnect();
  }, [lang]);

  return (
    <section className="gift-banner-section" id="gift">
      <div className="gift-banner-content animate-view reveal">
        <span className="hero-subtitle">{t.giftSubtitle}</span>
        <h2>{t.giftTitle}</h2>
        <p>{t.giftDesc1}</p>
        <p style={{ marginBottom: '2.5rem' }}>{t.giftDesc2}</p>
        <Link to="/perfumes" className="cta-button solid">{t.giftBtn}</Link>
      </div>
    </section>
  );
}
