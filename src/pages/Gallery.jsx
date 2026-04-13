import React, { useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';

export default function Gallery() {
  const { t } = useLanguage();

  useEffect(() => {
    window.scrollTo(0, 0);
    const reveals = document.querySelectorAll('.reveal');
    reveals.forEach((el, index) => {
      setTimeout(() => {
        el.classList.add('active');
      }, 100 + index * 100);
    });
  }, []);

  const galleryImages = [
    "/perfume_pink_1776084777940.png",
    "/perfume_obsidian_1776084817495.png",
    "/perfume_crystal_1776084965250.png",
    "/perfume_amber_1776085036492.png",
    "/perfume_gold_1776084751454.png"
  ];

  return (
    <div className="gallery-page">
      <section className="hero" style={{ minHeight: '60vh' }}>
        <img src="/perfume_amber_1776085036492.png" alt="Gallery Hero" className="hero-bg" style={{ opacity: 0.3 }} />
        <div className="hero-overlay"></div>
        <div className="container">
          <div className="hero-content reveal">
            <h1 className="hero-title">{t.galleryTitle}</h1>
            <p className="hero-desc">{t.galleryDesc}</p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="gallery-grid">
            {galleryImages.map((src, index) => (
              <div className="gallery-item-wrapper reveal" key={index}>
                <div className="gallery-item">
                  <img src={src} alt={`${t.galleryTitle} ${index + 1}`} className="gallery-img" loading="lazy" />
                  <div className="gallery-overlay-box">
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
