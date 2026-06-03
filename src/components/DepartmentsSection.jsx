import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { GetCategories } from '../api/Category';
import { Loader2 } from 'lucide-react';
import { getImageUrl } from '../api/productHelpers';

// Gradient backgrounds per category index
const CARD_GRADIENTS = [
  'linear-gradient(160deg, #1a1200 0%, #3d2e00 100%)',
  'linear-gradient(160deg, #1a0f00 0%, #3d2400 100%)',
  'linear-gradient(160deg, #001a1a 0%, #003d3d 100%)',
  'linear-gradient(160deg, #1a001a 0%, #3d003d 100%)',
  'linear-gradient(160deg, #001a0a 0%, #003d18 100%)',
  'linear-gradient(160deg, #1a0a00 0%, #3d1a00 100%)',
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
              const cName = lang === 'ar'
                ? (cat.categoryNameAr || cat.CategoryNameAr || cat.categoryName || cat.CategoryName || cat.name || `Category ${i + 1}`)
                : (cat.categoryName || cat.CategoryName || cat.name || `Category ${i + 1}`);
              const gradient = CARD_GRADIENTS[i % CARD_GRADIENTS.length];


              // Safely extract category image from categoryImages or CategoryImages array
              const rawCatImg = (cat.categoryImages && cat.categoryImages.length > 0) 
                ? cat.categoryImages[0].imageUrl 
                : (cat.CategoryImages && cat.CategoryImages.length > 0)
                  ? cat.CategoryImages[0].imageUrl
                  : null;
              const catImg = getImageUrl(rawCatImg);

              return (
                <Link
                  to={`/perfumes`}
                  state={{ categoryId: cId }}
                  key={cId || i}
                  className={`dept-card animate-view reveal delay-${(i % 3) + 1}`}
                  style={{ background: gradient }}
                >
                  <div className="dept-card-border" />

                  {catImg && (
                    <div className="dept-img-wrapper">
                      <img className="dept-img" src={catImg} alt={cName} />
                      <div className="dept-img-overlay" />
                    </div>
                  )}

                  <div className="dept-content">
                    <span className="dept-tag">
                      {lang === 'ar' ? 'مجموعة فاخرة' : 'PREMIUM COLLECTION'}
                    </span>
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
