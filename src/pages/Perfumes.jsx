import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';

export default function Perfumes() {
  const { t, lang } = useLanguage();
  const [filterGender, setFilterGender] = useState('all');
  const [filterType, setFilterType] = useState('all');

  useEffect(() => {
    window.scrollTo(0, 0);
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        }
      });
    }, { threshold: 0.1 });

    const animatedElements = document.querySelectorAll('.animate-view');
    animatedElements.forEach((el) => { observer.observe(el); });

    return () => observer.disconnect();
  }, [lang, filterGender, filterType]);

  const allPerfumes = [
    { id: 1, name: t.perfume1Name, desc: t.perfume1Desc, gender: 'men', type: 'woody', img: '/hero_perfume.png' },
    { id: 2, name: t.perfume2Name, desc: t.perfume2Desc, gender: 'women', type: 'floral', img: '/hero_perfume.png' },
    { id: 3, name: t.perfume3Name, desc: t.perfume3Desc, gender: 'unisex', type: 'citrus', img: '/hero_perfume.png' },
    { id: 4, name: t.perfume4Name, desc: t.perfume4Desc, gender: 'unisex', type: 'oriental', img: '/hero_perfume.png' },
    { id: 5, name: t.perfume5Name, desc: t.perfume5Desc, gender: 'men', type: 'woody', img: '/hero_perfume.png' },
    { id: 6, name: t.perfume6Name, desc: t.perfume6Desc, gender: 'women', type: 'floral', img: '/hero_perfume.png' },
  ];

  const filtered = allPerfumes.filter(p => {
    const matchGender = filterGender === 'all' || p.gender === filterGender;
    const matchType = filterType === 'all' || p.type === filterType;
    return matchGender && matchType;
  });

  return (
    <div style={{ paddingTop: '80px', minHeight: '100vh', background: 'var(--bg-color)' }}>
      <section className="section perfumes-page">
        <div className="container">
          <div className="section-header animate-view reveal">
            <h2 className="section-title">{t.navCollection}</h2>
          </div>
          
          <div className="filter-bar animate-view reveal delay-1">
            <select className="filter-select" value={filterGender} onChange={(e) => setFilterGender(e.target.value)}>
              <option value="all">{t.filterGenderAll}</option>
              <option value="men">{t.filterMen}</option>
              <option value="women">{t.filterWomen}</option>
              <option value="unisex">{t.filterUnisex}</option>
            </select>

            <select className="filter-select" value={filterType} onChange={(e) => setFilterType(e.target.value)}>
              <option value="all">{t.filterAll}</option>
              <option value="woody">{t.filterWoody}</option>
              <option value="floral">{t.filterFloral}</option>
              <option value="citrus">{t.filterCitrus}</option>
              <option value="oriental">{t.filterOriental}</option>
            </select>
          </div>

          <div className="perfume-grid">
            {filtered.length > 0 ? filtered.map((perfume, i) => (
              <div className={`perfume-card animate-view reveal delay-${(i % 3) + 1}`} key={perfume.id}>
                <div className="perfume-img-wrapper">
                  <img src={perfume.img} alt={perfume.name} />
                  <div className="perfume-tags">
                     <span className="perfume-tag">{t['filter' + perfume.gender.charAt(0).toUpperCase() + perfume.gender.slice(1)] || t.filterUnisex}</span>
                     <span className="perfume-tag">{t['filter' + perfume.type.charAt(0).toUpperCase() + perfume.type.slice(1)]}</span>
                  </div>
                </div>
                <div className="perfume-info">
                  <h3>{perfume.name}</h3>
                  <p>{perfume.desc}</p>
                </div>
              </div>
            )) : (
              <p style={{ textAlign: 'center', width: '100%', gridColumn: '1 / -1', padding: '3rem', color: 'var(--text-muted)' }}>{t.noMatches}</p>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
