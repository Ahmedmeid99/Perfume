import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import Process from './Process';
import Sourcing from './Sourcing';
import TeamSection from '../components/TeamSection';
import ReviewsSection from '../components/ReviewsSection';
import MapSection from '../components/MapSection';
import DepartmentsSection from '../components/DepartmentsSection';

export default function Home() {
  const { t, lang } = useLanguage();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loadedImages, setLoadedImages] = useState(new Set([0]));

  const heroImages = [
    "/hero_perfume.png",
    "/perfume_gold_1776084751454.png",
    "/perfume_amber_1776085036492.png",
    "/perfume_obsidian_1776084817495.png",
    "/perfume_pink_1776084777940.png",
    "/perfume_crystal_1776084965250.png",
  ];

  useEffect(() => {
    heroImages.forEach((src, i) => {
      const img = new Image();
      img.src = src;
      img.onload = () => setLoadedImages((prev) => new Set([...prev, i]));
    });
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

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
    animatedElements.forEach((el) => { observer.observe(el); });

    return () => observer.disconnect();
  }, [lang]);

  return (
    <>
      <section className="hero">
        {heroImages.map((src, index) => (
          <img
            key={index}
            src={src}
            alt={`SAM Perfumes — product ${index + 1}`}
            className="hero-bg"
            loading={index === 0 ? 'eager' : 'lazy'}
            fetchpriority={index === 0 ? 'high' : 'auto'}
            style={{
              opacity: index === currentSlide ? 0.65 : 0,
              transform: index === currentSlide ? 'scale(1)' : 'scale(1.04)',
              transitionProperty: 'opacity, transform',
              transitionDuration: index === currentSlide ? '1.2s' : '0.8s',
              transitionTimingFunction: 'ease-in-out',
              zIndex: index === currentSlide ? 2 : 1,
            }}
          />
        ))}
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

      <Process />
      <DepartmentsSection />
      <Sourcing isStandalone={false} />
      <TeamSection />
      <ReviewsSection />
      <MapSection />
    </>
  );
}
