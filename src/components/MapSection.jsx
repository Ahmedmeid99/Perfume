import React from 'react';
import { useLanguage } from '../context/LanguageContext';

export default function MapSection() {
  const { t } = useLanguage();

  return (
    <section className="section" id="location" style={{ paddingBottom: 0 }}>
      {/* Content moved 'up of map' */}
      <div className="container animate-view reveal" style={{ textAlign: 'center', marginBottom: '4rem' }}>
        <h2 className="section-title" style={{ marginBottom: '1rem' }}>{t.mapTitle}</h2>
        <p>{t.mapDesc}</p>
        <p style={{ marginTop: '0.5rem', fontStyle: 'italic', fontWeight: '500', color: 'var(--primary-color)' }}>{t.address}</p>
      </div>

      <div style={{ position: 'relative', height: '500px', width: '100%', overflow: 'hidden' }}>
        <iframe
          className="map-iframe"
          src="https://www.google.com/maps?q=30.733699,31.6664668&z=16&output=embed"
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="SAM Perfumes Location"
        ></iframe>
      </div>
    </section>
  );
}
