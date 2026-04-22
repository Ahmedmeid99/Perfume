import React, { useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';

export default function Sourcing({ isStandalone = true }) {
  const { t } = useLanguage();

  useEffect(() => {
    if (isStandalone) window.scrollTo(0, 0);
  }, [isStandalone]);

  return (
    <div style={{ paddingTop: isStandalone ? '80px' : '0', minHeight: isStandalone ? '100vh' : 'auto', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
        <div className="container" style={{ textAlign: 'center', padding: isStandalone ? '0' : '5rem 0', width: '100%' }}>
          <h2 className="section-title">{t.sourcingHeroTitle}</h2>
          <p className="hero-desc" style={{ maxWidth: '600px', margin: '0 auto 4rem auto' }}>
            {t.sourcingDesc}
          </p>
          
          <div style={{
            position: 'relative',
            width: '100%',
            maxWidth: '900px',
            height: '450px',
            margin: '0 auto',
            perspective: '1000px'
          }}>
              <img src="/ingredients.png" alt="Ingredients" style={{
                position: 'absolute',
                width: '50%',
                height: 'auto',
                top: '0',
                left: '5%',
                borderRadius: '8px',
                boxShadow: '0 15px 35px rgba(0,0,0,0.4)',
                transform: 'rotate(-4deg)',
                zIndex: 2,
                transition: 'transform 0.4s ease'
              }} onMouseOver={e => { e.currentTarget.style.transform = 'scale(1.05) rotate(-2deg)'; e.currentTarget.style.zIndex = 10; }} onMouseOut={e => { e.currentTarget.style.transform = 'rotate(-4deg)'; e.currentTarget.style.zIndex = 2; }} />
              
              <img src="/creation_card.png" alt="Creation Process" style={{
                position: 'absolute',
                width: '45%',
                height: 'auto',
                top: '15%',
                right: '5%',
                borderRadius: '8px',
                boxShadow: '0 15px 35px rgba(0,0,0,0.4)',
                transform: 'rotate(5deg)',
                zIndex: 1,
                transition: 'transform 0.4s ease'
              }} onMouseOver={e => { e.currentTarget.style.transform = 'scale(1.05) rotate(2deg)'; e.currentTarget.style.zIndex = 10; }} onMouseOut={e => { e.currentTarget.style.transform = 'rotate(5deg)'; e.currentTarget.style.zIndex = 1; }} />

              <img src="/formulation_card.png" alt="Formulation" style={{
                position: 'absolute',
                width: '55%',
                height: 'auto',
                bottom: '0',
                left: '25%',
                borderRadius: '8px',
                boxShadow: '0 25px 50px rgba(0,0,0,0.6)',
                transform: 'rotate(1deg) translateY(20px)',
                zIndex: 3,
                transition: 'transform 0.4s ease'
              }} onMouseOver={e => { e.currentTarget.style.transform = 'scale(1.05) translateY(10px) rotate(0deg)'; e.currentTarget.style.zIndex = 10; }} onMouseOut={e => { e.currentTarget.style.transform = 'rotate(1deg) translateY(20px)'; e.currentTarget.style.zIndex = 3; }} />
          </div>
        </div>
    </div>
  );
}
