import React, { useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Link } from 'react-router-dom';

export default function Essence({ isStandalone = true }) {
  const { t, lang } = useLanguage();

  useEffect(() => {
    if (isStandalone) window.scrollTo(0, 0);
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        }
      });
    }, { threshold: 0.15 });

    const animatedElements = document.querySelectorAll('.animate-view');
    animatedElements.forEach((el) => { observer.observe(el); });
    return () => observer.disconnect();
  }, [lang, isStandalone]);

  return (
    <div style={{ paddingTop: isStandalone ? '80px' : '0' }}>
      <section className="quality-section" style={{ minHeight: isStandalone ? 'calc(100vh - 80px)' : 'auto' }} id="essence">
        <div className="quality-grid">
          <div className="quality-image-wrapper">
            <img src="/ingredients.png" alt="Premium raw ingredients" className="quality-image" />
          </div>
          <div className="quality-content">
            <div className="animate-view reveal-left">
              <span className="hero-subtitle">{t.qualitySubtitle}</span>
              <h2 className="section-title">{t.qualityTitle}</h2>
              <p>{t.qualityP1}</p>
              <p>{t.qualityP2}</p>
              <p>{t.essenceDetails}</p>
              {isStandalone && (
                <Link to="/sourcing" className="cta-button" style={{ marginTop: '1.5rem', display: 'inline-block' }}>{t.exploreSourcing}</Link>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
