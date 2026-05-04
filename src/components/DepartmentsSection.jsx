import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { GetCategories } from '../api/Category';
import { Loader2 } from 'lucide-react';

// Gradient backgrounds per category index
const CARD_GRADIENTS = [
  'linear-gradient(160deg, #1a1200 0%, #3d2e00 100%)',
  'linear-gradient(160deg, #1a0f00 0%, #3d2400 100%)',
  'linear-gradient(160deg, #001a1a 0%, #003d3d 100%)',
  'linear-gradient(160deg, #1a001a 0%, #3d003d 100%)',
  'linear-gradient(160deg, #001a0a 0%, #003d18 100%)',
  'linear-gradient(160deg, #1a0a00 0%, #3d1a00 100%)',
];

const CATEGORY_ICONS = [
  <svg viewBox="0 0 64 64" width="36" height="36" fill="none" stroke="currentColor" strokeWidth="1.5" key="0">
    <path d="M32 8c0 0-14 8-14 22s14 26 14 26 14-12 14-26S32 8 32 8z"/><path d="M18 30h28M26 18l-8 12M38 18l8 12"/>
  </svg>,
  <svg viewBox="0 0 64 64" width="36" height="36" fill="none" stroke="currentColor" strokeWidth="1.5" key="1">
    <ellipse cx="32" cy="36" rx="18" ry="12"/><path d="M14 36 Q32 16 50 36"/><circle cx="32" cy="20" r="5"/>
  </svg>,
  <svg viewBox="0 0 64 64" width="36" height="36" fill="none" stroke="currentColor" strokeWidth="1.5" key="2">
    <path d="M32 10 Q20 26 20 38a12 12 0 0 0 24 0Q44 26 32 10z"/><circle cx="44" cy="16" r="2" fill="currentColor"/><circle cx="20" cy="22" r="1.5" fill="currentColor"/>
  </svg>,
  <svg viewBox="0 0 64 64" width="36" height="36" fill="none" stroke="currentColor" strokeWidth="1.5" key="3">
    <path d="M20 52 Q20 30 32 12 Q44 30 44 52"/><path d="M24 30 Q32 22 40 30"/><path d="M20 52 Q32 48 44 52"/>
  </svg>,
  <svg viewBox="0 0 64 64" width="36" height="36" fill="none" stroke="currentColor" strokeWidth="1.5" key="4">
    <rect x="18" y="28" width="28" height="26" rx="4"/><path d="M24 28 V20 Q24 10 32 10 Q40 10 40 20 V28"/><circle cx="32" cy="41" r="4"/>
  </svg>,
  <svg viewBox="0 0 64 64" width="36" height="36" fill="none" stroke="currentColor" strokeWidth="1.5" key="5">
    <path d="M20 54 h24"/><path d="M28 54 V44 Q28 38 32 32 Q36 38 36 44 V54"/><path d="M32 32 Q28 24 32 16 Q36 24 32 32z"/>
  </svg>,
];

export default function DepartmentsSection() {
  const { t, lang } = useLanguage();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    GetCategories()
      .then(data => {
        if (data) setCategories(data);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add('active')),
      { threshold: 0.1 }
    );
    document.querySelectorAll('.dept-card').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [lang, categories]);

  return (
    <section className="section departments-section">
      <div className="container">
        <div className="section-header animate-view reveal">
          <span style={{ color: 'var(--primary-color)', fontSize: '0.9rem', letterSpacing: '3px', textTransform: 'uppercase', display: 'block', marginBottom: '1rem' }}>
            {t.brand}
          </span>
          <h2 className="section-title">{t.deptSectionTitle}</h2>
          <p style={{ color: 'var(--text-muted)', maxWidth: '500px', margin: '0 auto' }}>{t.deptSectionDesc}</p>
        </div>

        {loading ? (
          <div style={{ display: 'flex', justifyContent: 'center', padding: '4rem 0' }}>
            <Loader2 size={48} className="spinner" />
          </div>
        ) : (
          <div className="dept-grid">
            {categories.map((cat, i) => {
              const cId = cat.categoryId || cat.CategoryId || cat.productCategoryID || cat.id;
              const cName = cat.categoryName || cat.CategoryName || cat.name || `Category ${i + 1}`;
              const gradient = CARD_GRADIENTS[i % CARD_GRADIENTS.length];
              const icon = CATEGORY_ICONS[i % CATEGORY_ICONS.length];

              return (
                <Link
                  to={`/perfumes`}
                  state={{ categoryId: cId }}
                  key={cId || i}
                  className={`dept-card animate-view reveal delay-${(i % 3) + 1}`}
                  style={{ background: gradient }}
                >
                  <div className="dept-card-border" />

                  <div className="dept-content">
                    <div className="dept-icon" style={{ color: 'var(--primary-color)' }}>
                      {icon}
                    </div>
                    <h3 className="dept-title">{cName}</h3>
                    <span className="dept-btn">{t.exploreBtn} →</span>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
