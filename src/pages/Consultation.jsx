import React, { useEffect, useState } from 'react';
import { useLanguage } from '../context/LanguageContext';

export default function Consultation({ isStandalone = true }) {
  const { t, lang } = useLanguage();
  const [submitted, setSubmitted] = useState(false);

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
    <div style={{ paddingTop: isStandalone ? '80px' : '0', minHeight: isStandalone ? '100vh' : 'auto', display: 'flex', flexDirection: 'column' }}>
      <section className="cta-section" style={{ flexGrow: 1, display: 'flex', alignItems: 'center', padding: isStandalone ? '0' : '6rem 0' }} id="consultation">
        <div className="container animate-view reveal">
          <h2>{t.ctaTitle}</h2>
          <p>{t.ctaDesc}</p>
          <div style={{ marginTop: '2rem' }}>
            <h3 style={{ color: 'var(--primary-color)', marginBottom: '1rem' }}>{t.contactHeroTitle}</h3>
            <p>{t.contactDesc}</p>
            <p style={{ marginTop: '1rem' }}>{t.consultationDetails}</p>
            {submitted ? (
              <p className="form-success">{t.formSuccess}</p>
            ) : (
              <form className="contact-form" onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }}>
                <div className="form-group">
                  <input type="text" className="form-input" placeholder={t.formName} required />
                </div>
                <div className="form-group">
                  <input type="email" className="form-input" placeholder={t.formEmail} required />
                </div>
                <div className="form-group">
                  <textarea className="form-input" placeholder={t.formMessage} rows="5" required></textarea>
                </div>
                <button type="submit" className="cta-button solid" style={{ padding: '1rem 3rem', fontSize: '1rem', marginTop: '1rem' }}>
                  {t.formSubmit}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
