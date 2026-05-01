import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';

export default function Perfumes() {
  const { t, lang } = useLanguage();
  const [filterGender, setFilterGender] = useState('all');
  const [filterType, setFilterType] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

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
  }, [lang, filterGender, filterType, searchQuery]);

  const allPerfumes = [
    { id: 1, name: t.perfume1Name, desc: t.perfume1Desc, gender: 'unisex', type: 'Composition',    img: '/perfume_gold_1776084751454.png' },
    { id: 2, name: t.perfume2Name, desc: t.perfume2Desc, gender: 'women', type: 'Makhmariyat',    img: '/perfume_amber_1776085036492.png' },
    { id: 3, name: t.perfume3Name, desc: t.perfume3Desc, gender: 'unisex', type: 'BodySplash',    img: '/perfume_crystal_1776084965250.png' },
    { id: 4, name: t.perfume4Name, desc: t.perfume4Desc, gender: 'women', type: 'HairMist',       img: '/perfume_pink_1776084777940.png' },
    { id: 5, name: t.perfume5Name, desc: t.perfume5Desc, gender: 'unisex', type: 'AirFresheners', img: '/hero_perfume.png' },
    { id: 6, name: t.perfume6Name, desc: t.perfume6Desc, gender: 'unisex', type: 'Bakhoor',       img: '/perfume_obsidian_1776084817495.png' },
  ];

  const filtered = allPerfumes.filter(p => {
    const matchGender = filterGender === 'all' || p.gender === filterGender;
    const matchType = filterType === 'all' || p.type === filterType;
    
    const query = searchQuery ? searchQuery.trim().toLowerCase() : '';
    const matchSearch = !query || 
                        (p.name && p.name.toLowerCase().includes(query)) || 
                        (p.desc && p.desc.toLowerCase().includes(query));
                        
    return matchGender && matchType && matchSearch;
  });

  return (
    <div style={{ paddingTop: '80px', minHeight: '100vh', background: 'var(--bg-color)' }}>
      <section className="section perfumes-page">
        <div className="container">
          <div className="section-header animate-view reveal">
            <h2 className="section-title">{t.navCollection}</h2>
          </div>
          
          <div className="perfumes-layout">
            <aside className="perfumes-sidebar animate-view reveal delay-1">
              <div className="filter-group">
                <input 
                  type="text" 
                  className="form-input" 
                  placeholder={t.searchPlaceholder} 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  style={{ width: '100%', marginBottom: '1.5rem' }}
                />
              </div>
              <div className="filter-group">
                <h3>{t.filterGenderAll.split(' ')[1] || 'Gender'}</h3>
                <ul className="filter-list">
                  <li className={filterGender === 'all' ? 'active' : ''} onClick={() => setFilterGender('all')}>{t.filterGenderAll}</li>
                  <li className={filterGender === 'men' ? 'active' : ''} onClick={() => setFilterGender('men')}>{t.filterMen}</li>
                  <li className={filterGender === 'women' ? 'active' : ''} onClick={() => setFilterGender('women')}>{t.filterWomen}</li>
                  <li className={filterGender === 'unisex' ? 'active' : ''} onClick={() => setFilterGender('unisex')}>{t.filterUnisex}</li>
                </ul>
              </div>

              <div className="filter-group">
                <h3>{t.filterAll.split(' ')[1] || 'Category'}</h3>
                <ul className="filter-list">
                  <li className={filterType === 'all' ? 'active' : ''} onClick={() => setFilterType('all')}>{t.filterAll}</li>
                  <li className={filterType === 'Composition' ? 'active' : ''} onClick={() => setFilterType('Composition')}>{t.filterComposition}</li>
                  <li className={filterType === 'Makhmariyat' ? 'active' : ''} onClick={() => setFilterType('Makhmariyat')}>{t.filterMakhmariyat}</li>
                  <li className={filterType === 'BodySplash' ? 'active' : ''} onClick={() => setFilterType('BodySplash')}>{t.filterBodySplash}</li>
                  <li className={filterType === 'HairMist' ? 'active' : ''} onClick={() => setFilterType('HairMist')}>{t.filterHairMist}</li>
                  <li className={filterType === 'AirFresheners' ? 'active' : ''} onClick={() => setFilterType('AirFresheners')}>{t.filterAirFresheners}</li>
                  <li className={filterType === 'Bakhoor' ? 'active' : ''} onClick={() => setFilterType('Bakhoor')}>{t.filterBakhoor}</li>
                </ul>
              </div>
            </aside>

            <div className="perfume-grid-container">
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
          </div>
        </div>
      </section>
    </div>
  );
}
