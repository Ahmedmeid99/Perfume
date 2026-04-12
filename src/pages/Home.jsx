import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import Process from './Process';
import Essence from './Essence';
import Sourcing from './Sourcing';
import Consultation from './Consultation';
import TeamSection from '../components/TeamSection';
import ReviewsSection from '../components/ReviewsSection';
import MapSection from '../components/MapSection';

export default function Home() {
  const { t, lang } = useLanguage();

  useEffect(() => {
    window.scrollTo(0, 0);
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        }
      });
    }, { threshold: 0.15 });

    const animatedElements = document.querySelectorAll('.animate-view');
    animatedElements.forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, [lang]);

  return (
    <>
      <section className="hero">
        <img src="/hero_perfume.png" alt="Bespoke luxury perfume bottle" className="hero-bg animate-view reveal-zoom" />
        <div className="hero-overlay"></div>
        <div className="container hero-content">
          <span className="hero-subtitle animate-view reveal">{t.heroSubtitle}</span>
          <h1 className="hero-title animate-view reveal delay-1">{t.heroTitle}</h1>
          <p className="hero-desc animate-view reveal delay-2">
            {t.heroDesc}
          </p>
          <Link to="/process" className="cta-button solid animate-view reveal delay-3">{t.beginJourney}</Link>
        </div>
      </section>

      <Process isStandalone={false} />
      <Essence isStandalone={false} />
      <Sourcing isStandalone={false} />
      <TeamSection />
      <ReviewsSection />
      <Consultation isStandalone={false} />
      <MapSection />
    </>
  );
}
