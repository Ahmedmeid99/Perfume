import React, { useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';

export default function Process({ isStandalone = true }) {
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
      <section className="section process-section" style={{minHeight: isStandalone ? '80vh' : 'auto'}} id="process">
        <div className="container">
          <div className="section-header animate-view reveal">
            <h2 className="section-title">{t.section1Title}<span>{t.section1Span}</span></h2>
            <p className="hero-desc" style={{ maxWidth: '600px', margin: '0 auto' }}>
              {t.section1Desc}
            </p>
            <p className="hero-desc" style={{ maxWidth: '800px', margin: '1rem auto' }}>
              {t.processIntro} {t.processDetail1}
            </p>
          </div>
          <div className="process-grid">
            <div className="process-card animate-view reveal delay-1">
              <div className="process-card-inner">
                <div className="card-front">
                  <div className="process-icon">01</div>
                  <h3 className="process-title">{t.step1Title}</h3>
                  <p className="process-desc">{t.step1Desc}</p>
                </div>
                <div className="card-back">
                  <img src="/ingredients.png" alt="Discovery Setup" />
                </div>
              </div>
            </div>
            <div className="process-card animate-view reveal delay-2">
              <div className="process-card-inner">
                <div className="card-front">
                  <div className="process-icon">02</div>
                  <h3 className="process-title">{t.step2Title}</h3>
                  <p className="process-desc">{t.step2Desc}</p>
                </div>
                <div className="card-back">
                  <img src="/formulation_card.png" alt="Formulation Lab" />
                </div>
              </div>
            </div>
            <div className="process-card animate-view reveal delay-3">
              <div className="process-card-inner">
                <div className="card-front">
                  <div className="process-icon">03</div>
                  <h3 className="process-title">{t.step3Title}</h3>
                  <p className="process-desc">{t.step3Desc}</p>
                </div>
                <div className="card-back">
                  <img src="/creation_card.png" alt="Final Creation" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
