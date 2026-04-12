import React from 'react';
import { useLanguage } from '../context/LanguageContext';

export default function MapSection() {
  const { t } = useLanguage();
  return (
    <section className="map-section" id="location">
      <iframe
        title="Google Map"
        className="map-iframe"
        src="https://maps.google.com/maps?q=30.733699,31.6664668&t=&z=14&ie=UTF8&iwloc=&output=embed"
        allowFullScreen=""
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>
      <div className="map-container" style={{ pointerEvents: 'none' }}>
        <div className="map-overlay animate-view reveal" style={{ pointerEvents: 'auto' }}>
          <h2 className="section-title">{t.mapTitle}</h2>
          <p>{t.mapDesc}</p>
          <p style={{ marginTop: '1.5rem', fontStyle: 'italic', fontWeight: '500', color: 'var(--primary-color)' }}>{t.address}</p>
        </div>
      </div>
    </section>
  );
}
