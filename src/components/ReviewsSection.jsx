import React from 'react';
import { useLanguage } from '../context/LanguageContext';

export default function ReviewsSection() {
  const { t } = useLanguage();
  return (
    <section className="section reviews-section" id="reviews">
      <div className="container">
        <div className="section-header animate-view reveal">
          <h2 className="section-title">{t.reviewsTitle}</h2>
          <p className="hero-desc" style={{ maxWidth: '600px', margin: '0 auto' }}>{t.reviewsDesc}</p>
        </div>
        <div className="reviews-grid">
          <div className="review-card animate-view reveal delay-1">
            <div className="review-header">
              <img src="https://randomuser.me/api/portraits/men/55.jpg" className="review-img" alt="Client 1" />
              <p className="reviewer">{t.reviewer1}</p>
            </div>
            <p className="review-text">{t.review1}</p>
          </div>
          <div className="review-card animate-view reveal delay-2">
            <div className="review-header">
              <img src="https://randomuser.me/api/portraits/men/60.jpg" className="review-img" alt="Client 2" />
              <p className="reviewer">{t.reviewer2}</p>
            </div>
            <p className="review-text">{t.review2}</p>
          </div>
          <div className="review-card animate-view reveal delay-3">
            <div className="review-header">
              <img src="https://randomuser.me/api/portraits/men/77.jpg" className="review-img" alt="Client 3" />
              <p className="reviewer">{t.reviewer3}</p>
            </div>
            <p className="review-text">{t.review3}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
