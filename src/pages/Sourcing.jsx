import React, { useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';

export default function Sourcing({ isStandalone = true }) {
  const { t } = useLanguage();

  useEffect(() => {
    if (isStandalone) window.scrollTo(0, 0);
  }, [isStandalone]);

  return (
    <div style={{ paddingTop: isStandalone ? '80px' : '0', minHeight: isStandalone ? '100vh' : 'auto', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div className="container" style={{ textAlign: 'center', padding: isStandalone ? '0' : '5rem 0' }}>
          <h2 className="section-title">{t.sourcingHeroTitle}</h2>
          <p className="hero-desc" style={{ maxWidth: '600px', margin: '0 auto 2rem auto' }}>
            {t.sourcingDesc}
          </p>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
              <img src="/ingredients.png" alt="Sourcing map" style={{ maxWidth: '100%', height: 'auto', borderRadius: '8px', opacity: 0.8 }} />
          </div>
        </div>
    </div>
  );
}
