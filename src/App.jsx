import React, { useEffect, useState } from 'react';
import './App.css';

const content = {
  en: {
    brand: "Aura Bespoke",
    navProcess: "The Process",
    navEssence: "Essence",
    navConsult: "Consultation",
    bookNow: "Book Now",
    heroSubtitle: "Haute Parfumerie",
    heroTitle: "Craft Your Signature Scent",
    heroDesc: "Aura Bespoke formulates exclusive fragrances tailored precisely to your unique essence and desires. Experience the pinnacle of custom perfumery.",
    beginJourney: "Begin Your Journey",
    section1Title: "The Art of ",
    section1Span: "Bespoke",
    section1Desc: "Our perfumers guide you through an intricate and intimate journey to distill your personality into a tangible aroma.",
    step1Title: "Discovery",
    step1Desc: "An intimate consultation to explore your memories, preferences, and the specific notes that resonate with your spirit.",
    step2Title: "Formulation",
    step2Desc: "Our master noses blend rare, exquisite ingredients in our atelier, sending you variations to test and refine.",
    step3Title: "Creation",
    step3Desc: "Your final formulation is bottled in artisanal crystal glass, engraved with your insignia, and archived securely.",
    qualitySubtitle: "Pure Ingredients",
    qualityTitle: "Nature's Rarest Essences",
    qualityP1: "A bespoke fragrance is only as remarkable as its ingredients. We source sustainably and ethically from the world's finest producers.",
    qualityP2: "From hand-pollinated Madagascan vanilla to the deepest, aged oud from Assam, your scent is woven from materials often inaccessible to commercial perfumery.",
    exploreSourcing: "Explore Our Sourcing",
    ctaTitle: "Ready for your signature?",
    ctaDesc: "Commission your custom fragrance today and step into a world of unseen luxury. Consultations available globally via private appointments.",
    reserveConsult: "Reserve Private Consultation"
  },
  ar: {
    brand: "أورا للعطور",
    navProcess: "مراحل التصنيع",
    navEssence: "الخلاصة",
    navConsult: "حجز استشارة",
    bookNow: "احجز الآن",
    heroSubtitle: "عطور راقية",
    heroTitle: "اصنع عطرك المميز",
    heroDesc: "نقوم بتركيب عطور حصرية مصممة خصيصًا لتناسب جوهرك ورغباتك الفريدة. جرب قمة العطور المخصصة.",
    beginJourney: "ابدأ رحلتك",
    section1Title: "فن ",
    section1Span: "التخصيص",
    section1Desc: "يرشدك خبراؤنا في رحلة دقيقة وحميمة لتقطير شخصيتك في رائحة ملموسة.",
    step1Title: "الاستكشاف",
    step1Desc: "استشارة حميمة لاستكشاف ذكرياتك وتفضيلاتك والمكونات المحددة التي يتردد صداها مع روحك.",
    step2Title: "التركيب",
    step2Desc: "يقوم خبراؤنا بمزج مكونات نادرة ورائعة في مشغلنا، وإرسال اختلافات لك لاختبارها وتحسينها.",
    step3Title: "الإنتاج",
    step3Desc: "تُعبأ تركيبتك النهائية في زجاج كريستالي حرفي، منقوشة بشعارك، وتُحفظ بأمان.",
    qualitySubtitle: "مكونات نقية",
    qualityTitle: "أندر خلاصات الطبيعة",
    qualityP1: "لا يكون العطر المخصص رائعًا إلا بقدر مكوناته. نحن نستورد بشكل مستدام وأخلاقي من أفضل المنتجين في العالم.",
    qualityP2: "من فانيليا مدغشقر الملقحة يدويًا إلى العود العميق المعتق من آسام، يتم نسج عطرك من مواد لا يمكن الوصول إليها غالبًا في صناعة العطور التجارية.",
    exploreSourcing: "اكتشف مصادرنا",
    ctaTitle: "هل أنت مستعد لبصمتك؟",
    ctaDesc: "اطلب عطرك المخصص اليوم وادخل إلى عالم من الفخامة غير المرئية. الاستشارات متاحة عالميًا عبر المواعيد الخاصة.",
    reserveConsult: "احجز استشارة خاصة"
  }
};

function App() {
  const [lang, setLang] = useState('en');
  const t = content[lang];

  const toggleLanguage = () => {
    setLang(lang === 'en' ? 'ar' : 'en');
  };

  useEffect(() => {
    // Modify html document direction based on language
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
  }, [lang]);

  useEffect(() => {
    // Section animations triggered when they scroll into view
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          // Optional: observer.unobserve(entry.target) to animate only once
        }
      });
    }, { threshold: 0.15 });

    const animatedElements = document.querySelectorAll('.animate-view');
    animatedElements.forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, [lang]); // Re-run effect if layout alters significantly due to language swap

  return (
    <div className="app">
      {/* Navbar */}
      <nav className="navbar">
        <div className="nav-brand">{t.brand}</div>
        <div className="nav-controls">
          <div className="nav-links">
            <a href="#process" className="nav-link">{t.navProcess}</a>
            <a href="#ingredients" className="nav-link">{t.navEssence}</a>
            <a href="#book" className="nav-link">{t.navConsult}</a>
          </div>
          <button className="lang-toggle" onClick={toggleLanguage}>
            {lang === 'en' ? 'العربية' : 'English'}
          </button>
          <button className="cta-button">{t.bookNow}</button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero">
        <img src="/hero_perfume.png" alt="Bespoke luxury perfume bottle" className="hero-bg animate-view reveal-zoom" />
        <div className="hero-overlay"></div>
        <div className="container hero-content">
          <span className="hero-subtitle animate-view reveal">{t.heroSubtitle}</span>
          <h1 className="hero-title animate-view reveal delay-1">{t.heroTitle}</h1>
          <p className="hero-desc animate-view reveal delay-2">
            {t.heroDesc}
          </p>
          <button className="cta-button solid animate-view reveal delay-3">{t.beginJourney}</button>
        </div>
      </section>

      {/* Process Section */}
      <section id="process" className="section process-section">
        <div className="container">
          <div className="section-header animate-view reveal">
            <h2 className="section-title">{t.section1Title}<span>{t.section1Span}</span></h2>
            <p className="hero-desc" style={{ maxWidth: '600px', margin: '0 auto' }}>
              {t.section1Desc}
            </p>
          </div>
          <div className="process-grid">
            <div className="process-card animate-view reveal delay-1">
              <div className="process-icon">01</div>
              <h3 className="process-title">{t.step1Title}</h3>
              <p className="process-desc">{t.step1Desc}</p>
            </div>
            <div className="process-card animate-view reveal delay-2">
              <div className="process-icon">02</div>
              <h3 className="process-title">{t.step2Title}</h3>
              <p className="process-desc">{t.step2Desc}</p>
            </div>
            <div className="process-card animate-view reveal delay-3">
              <div className="process-icon">03</div>
              <h3 className="process-title">{t.step3Title}</h3>
              <p className="process-desc">{t.step3Desc}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Quality Section */}
      <section id="ingredients" className="quality-section">
        <div className="quality-grid">
          <div className="quality-image-wrapper">
            <img src="/ingredients.png" alt="Premium raw ingredients" className="quality-image" />
          </div>
          <div className="quality-content">
            <div className="animate-view reveal-left">
              <span className="hero-subtitle">{t.qualitySubtitle}</span>
              <h2 className="section-title">{t.qualityTitle}</h2>
              <p>{t.qualityP1}</p>
              <p>{t.qualityP2}</p>
              <button className="cta-button" style={{ marginTop: '1.5rem' }}>{t.exploreSourcing}</button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="book" className="cta-section">
        <div className="container animate-view reveal">
          <h2>{t.ctaTitle}</h2>
          <p>{t.ctaDesc}</p>
          <button className="cta-button solid" style={{ padding: '1rem 3rem', fontSize: '1rem' }}>{t.reserveConsult}</button>
        </div>
      </section>

      {/* Footer */}
      <footer>
        <div className="footer-logo">{t.brand}</div>
        <p>&copy; {new Date().getFullYear()} {t.brand}. All rights reserved.</p>
        <p style={{ marginTop: '0.5rem', fontSize: '0.8rem', opacity: 0.5 }}>Paris &bull; London &bull; New York &bull; Tokyo &bull; Dubai</p>
      </footer>
    </div>
  );
}

export default App;
