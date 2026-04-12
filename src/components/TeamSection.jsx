import React from 'react';
import { useLanguage } from '../context/LanguageContext';

export default function TeamSection() {
  const { t } = useLanguage();
  return (
    <section className="section team-section" id="team">
      <div className="container">
        <div className="section-header animate-view reveal">
          <h2 className="section-title">{t.teamTitle}</h2>
          <p className="hero-desc" style={{ maxWidth: '600px', margin: '0 auto' }}>{t.teamDesc}</p>
        </div>
        <div className="team-grid">
          <div className="team-card animate-view reveal delay-1">
            <img src="https://randomuser.me/api/portraits/men/44.jpg" className="team-img" alt="Team 1" />
            <h3>{t.teamName1}</h3>
            <p className="team-role">{t.teamRole1}</p>
          </div>
          <div className="team-card animate-view reveal delay-2">
            <img src="https://randomuser.me/api/portraits/men/69.jpg" className="team-img" alt="Team 2" />
            <h3>{t.teamName2}</h3>
            <p className="team-role">{t.teamRole2}</p>
          </div>
          <div className="team-card animate-view reveal delay-3">
            <img src="https://randomuser.me/api/portraits/men/33.jpg" className="team-img" alt="Team 3" />
            <h3>{t.teamName3}</h3>
            <p className="team-role">{t.teamRole3}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
