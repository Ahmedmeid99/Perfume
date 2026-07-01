import React, { createContext, useState, useEffect, useContext } from "react";

const content = {
  en: {
    brand: "My Store",
    topHot: "HOT 🔥",
    topCollaboration: "Collaboration",
    topComingSoon: "Coming Soon",
    topDiscount: "Discount",
    topReviews: "Reviews",
    topContact: "Contact",
    topLocation: "Abu Kabir, Egypt",
    navProcess: "Our Story",
    navEssence: "Essence",
    navConsult: "Custom Blend",
    navGallery: "Gallery",
    navHome: "Home",
    navOrders: "My Orders",
    galleryTitle: "Our Gallery",
    galleryDesc: "A visual journey into our world of premium products.",
    bookNow: "Contact Us",
    heroSubtitle: "Premium Products",
    heroTitle: "Quality in Every Choice",
    heroDesc:
      "We offer an exclusive collection of premium products tailored to your lifestyle. Experience the essence of quality and elegance.",
    beginJourney: "Explore Collection",
    section1Title: "The World of ",
    section1Span: "Quality",
    section1Desc:
      "We offer more than just products; we deliver experiences and value. From classic essentials to modern innovations, our quality is unparalleled.",
    step1Title: "Selection",
    step1Desc:
      "Choose from our curated range of premium products, sourced from the finest suppliers worldwide.",
    step2Title: "Quality Check",
    step2Desc:
      "Our team meticulously reviews every item to ensure it meets the highest quality standards before reaching you.",
    step3Title: "Delivery",
    step3Desc:
      "Each order is a testament to our dedication, packaged with care and delivered straight to your doorstep.",
    qualitySubtitle: "Exquisite Quality",
    qualityTitle: "Premium Products",
    qualityP1:
      "Quality begins with sourcing. We partner with the best suppliers to ensure every product is long-lasting, authentic, and unique.",
    qualityP2:
      "Our expertise meets modern standards to bring you a curated selection of premium products for every occasion.",
    exploreSourcing: "Our Products",
    ctaTitle: "Find Your Perfect Product",
    ctaDesc:
      "Discover the collection that has captivated customers worldwide. From classic essentials to modern picks, we have it all.",
    reserveConsult: "Get Your Custom Blend",
    sourcingHeroTitle: "Ethical & Premium",
    sourcingDesc:
      "We pride ourselves on offering products that respect both quality and customer satisfaction.",
    contactHeroTitle: "Get in Touch",
    contactDesc:
      "Reach out to us for bulk orders, special requests, or any inquiries about our premium collections.",
    processIntro:
      "Whether you are looking for everyday essentials or something special, we are your destination for quality.",
    processDetail1:
      "Our range is carefully selected and designed to bring value and satisfaction to your daily life.",
    essenceDetails:
      "We source high-quality items for our catalog, ensuring a rich product profile that meets your every need.",
    consultationDetails:
      "Interested in a custom order? Our experts can help you find or create exactly what you are looking for.",
    formName: "Full Name",
    formEmail: "Email Address",
    formMessage: "How can we help?",
    formSubmit: "Send Message",
    formSuccess: "Thank you. We will contact you shortly.",
    teamTitle: "Our Team",
    teamDesc: "Meet the passionate experts behind our products and services.",
    teamRole1: "Master Perfumer",
    teamName1: "El Sayed Nasser",
    teamRole2: "Bakhoor Specialist",
    teamName2: "Ahmed Nasser",
    teamRole3: "Product Designer",
    teamName3: "Maryam",
    reviewsTitle: "What They Say",
    reviewsDesc: "Real customer experiences with our products.",
    review1:
      '"The Bakhoor is the best I have ever used. It fills the room with such a rich, calming aroma."',
    reviewer1: "M. Abdelsalam",
    review2:
      '"Their Hair Mist stays for hours. I get compliments everywhere I go. Truly premium!"',
    reviewer2: "Omar Hassan",
    review3:
      '"The Makhmariyat is so smooth and the fragrance is divine. A must-have in my daily routine."',
    reviewer3: "Tariq Youssef",
    mapTitle: "Our Location",
    mapDesc:
      "Visit one of our branches to experience the fragrances in person.",
    address: "Abu Kabir, Al Sharqia Governorate",
    quickLinks: "Quick Links",
    privacyPolicy: "Privacy Policy",
    termsOfService: "Terms of Service",
    shippingPolicy: "Shipping Policy",
    navCollection: "The Collection",
    searchPlaceholder: "Search products...",
    filterAll: "All Categories",
    filterComposition: "Composition",
    filterMakhmariyat: "Makhmariyat",
    filterBodySplash: "Body Splash",
    filterHairMist: "Hair Mist",
    filterAirFresheners: "Air Fresheners",
    filterBakhoor: "Bakhoor",
    filterGenderAll: "All",
    filterMen: "Men",
    filterWomen: "Women",
    filterUnisex: "Unisex",
    perfume1Name: "Oud Sam",
    perfume1Desc:
      "Our signature composition with deep woody notes and luxury oud.",
    perfume2Name: "Silk Makhmariya",
    perfume2Desc:
      "A smooth, velvet-like scented cream that leaves a lasting impression.",
    perfume3Name: "Tropical Splash",
    perfume3Desc: "A refreshing body splash with citrus and sea breeze notes.",
    perfume4Name: "Rose Hair Mist",
    perfume4Desc:
      "Delicate fragrance for your hair, infused with vitamins and floral notes.",
    perfume5Name: "Home Oud",
    perfume5Desc:
      "A powerful air freshener that brings the luxury of the orient home.",
    perfume6Name: "Royal Bakhoor",
    perfume6Desc:
      "A traditional incense experience with slow-burning, rich wooden chips.",
    noMatches: "No products found in this category.",
    deptSectionTitle: "Our Departments",
    deptSectionDesc: "Explore our exclusive range of premium products.",
    deptCompositionTitle: "Composition",
    deptCompositionDesc:
      "Custom fragrance blends crafted for your unique identity.",
    deptMakhmariyatTitle: "Makhmariyat",
    deptMakhmariyatDesc:
      "Luxurious scented creams for deep, long-lasting skin fragrance.",
    deptBodySplashTitle: "Body Splash",
    deptBodySplashDesc:
      "Light, refreshing mists to keep you feeling fresh all day.",
    deptHairMistTitle: "Hair Mist",
    deptHairMistDesc:
      "Gentle fragrance sprays designed specifically for hair care.",
    deptAirFreshenersTitle: "Air Fresheners",
    deptAirFreshenersDesc:
      "Premium home fragrances to elevate your living space.",
    deptBakhoorTitle: "Bakhoor",
    deptBakhoorDesc:
      "Traditional incense and oud chips for a truly royal atmosphere.",
    exploreBtn: "Explore",
    footerInfo: "Information",
    giftSubtitle: "The Perfect Gift",
    giftTitle: "Gift with Style",
    giftDesc1:
      "Show your appreciation with the ultimate gesture of luxury. Whether it's for a special occasion or a meaningful surprise, our store offers bespoke gift wrapping that elevates your present into an unforgettable experience.",
    giftDesc2:
      "Select your favorite composition, and let our artisans package it with elegance, ribbon, and a personalized note.",
    giftBtn: "Explore Gifts",
    favoritesTitle: "My Favorites",
    favoritesEmpty: "Your favorites list is empty.",
    favoritesGoToShop: "Explore Products",
    removedFromFavorites: "Removed from favorites",
  },
  ar: {
    brand: "متجري",
    topHot: "عروض حارة 🔥",
    topCollaboration: "تعاون",
    topComingSoon: "قريباً",
    topDiscount: "خصومات",
    topReviews: "الآراء",
    topContact: "اتصل بنا",
    topLocation: "أبو كبير، مصر",
    navProcess: "قصتنا",
    navEssence: "الخلاصة",
    navConsult: "تركيب خاص",
    navGallery: "المعرض",
    navHome: "الرئيسية",
    navOrders: "طلباتي",
    galleryTitle: "معرضنا",
    galleryDesc: "رحلة بصرية في عالم منتجاتنا الفاخرة.",
    bookNow: "تواصل معنا",
    heroSubtitle: "منتجات فاخرة",
    heroTitle: "الجودة في كل اختيار",
    heroDesc:
      "نقدم مجموعة حصرية من المنتجات الفاخرة المصممة لتناسب أسلوب حياتك. جرب جوهر الجودة والأناقة.",
    beginJourney: "استكشف المجموعة",
    section1Title: "عالم ",
    section1Span: "الجودة",
    section1Desc:
      "نقدم أكثر من مجرد منتجات؛ نقدم تجارب وقيمة حقيقية. من الأساسيات الكلاسيكية إلى الابتكارات الحديثة، جودتنا لا تضاهى.",
    step1Title: "الاختيار",
    step1Desc:
      "اختر من بين مجموعتنا المختارة من المنتجات الفاخرة، المُستوردة من أفضل الموردين عالميًا.",
    step2Title: "مراقبة الجودة",
    step2Desc:
      "يراجع فريقنا كل منتج بدقة لضمان مطابقته لأعلى معايير الجودة قبل وصوله إليك.",
    step3Title: "التسليم",
    step3Desc:
      "كل طلب هو دليل على تفانينا، معبأ بعناية ويتم توصيله مباشرةً إلى باب منزلك.",
    qualitySubtitle: "جودة استثنائية",
    qualityTitle: "منتجات مميزة",
    qualityP1:
      "تبدأ الجودة من الاختيار الصحيح. نتعاون مع أفضل الموردين لضمان أن يكون كل منتج أصيلاً ودائماً وفريداً.",
    qualityP2:
      "تلتقي خبرتنا مع المعايير الحديثة لنقدم لك تشكيلة منتخبة من المنتجات الفاخرة لكل مناسبة.",
    exploreSourcing: "منتجاتنا",
    ctaTitle: "ابحث عن منتجك المثالي",
    ctaDesc:
      "اكتشف المجموعة التي أسرت العملاء حول العالم. من الكلاسيكيات إلى المنتجات العصرية، لدينا كل شيء.",
    reserveConsult: "احصل على تركيبتك الخاصة",
    sourcingHeroTitle: "موثوق ومتميز",
    sourcingDesc: "نفخر بتقديم منتجات تحترم معايير الجودة ورضا العميل.",
    contactHeroTitle: "تواصل معنا",
    contactDesc:
      "تواصل معنا لطلبات الجملة، الطلبات الخاصة، أو أي استفسارات حول مجموعاتنا المميزة.",
    processIntro:
      "سواء كنت تبحث عن أساسيات يومية أو شيء مميز، نحن وجهتك للجودة.",
    processDetail1:
      "مجموعتنا مختارة بعناية لتجلب قيمة حقيقية ورضا تاماً في حياتك اليومية.",
    essenceDetails:
      "نختار منتجاتنا بعناية فائقة لضمان تجربة غنية ومميزة تلبي كل احتياجاتك.",
    consultationDetails:
      "هل تريد طلباً خاصاً؟ يمكن لخبرائنا مساعدتك في إيجاد أو تخصيص ما تبحث عنه تماماً.",
    formName: "الاسم الكامل",
    formEmail: "البريد الإلكتروني",
    formMessage: "كيف يمكننا مساعدتك؟",
    formSubmit: "إرسال الرسالة",
    formSuccess: "شكرًا لك. سنتواصل معك قريبًا.",
    teamTitle: "فريقنا",
    teamDesc: "تعرف على الخبراء المتحمسين وراء منتجاتنا وخدماتنا.",
    teamRole1: "خبير عطور",
    teamName1: "السيد ناصر",
    teamRole2: "متخصص بخور",
    teamName2: "أحمد ناصر",
    teamRole3: "مصمم منتجات",
    teamName3: "مريم",
    reviewsTitle: "ماذا يقولون",
    reviewsDesc: "تجارب حقيقية من عملائنا مع منتجاتنا.",
    review1:
      '"البخور هو الأفضل الذي استخدمته على الإطلاق. يملأ الغرفة برائحة غنية ومهدئة."',
    reviewer1: "م. عبد السلام",
    review2:
      '"معطر الشعر الخاص بهم يدوم لساعات. أحصل على إطراءات في كل مكان. فاخر بحق!"',
    reviewer2: "عمر حسن",
    review3:
      '"المخمرية ناعمة للغاية والرائحة إلهية. لا بد منها في روتيني اليومي."',
    reviewer3: "طارق يوسف",
    mapTitle: "موقعنا",
    mapDesc: "قم بزيارة أحد فروعنا لتجربة المنتجات شخصيًا.",
    address: "أبو كبير، محافظة الشرقية",
    quickLinks: "روابط سريعة",
    privacyPolicy: "سياسة الخصوصية",
    termsOfService: "شروط الخدمة",
    shippingPolicy: "سياسة الشحن",
    navCollection: "المجموعة",
    searchPlaceholder: "ابحث عن المنتجات...",
    filterAll: "جميع الأقسام",
    filterComposition: "التركيب",
    filterMakhmariyat: "مخمريات",
    filterBodySplash: "badySplash",
    filterHairMist: "hairmist",
    filterAirFresheners: "معطرات",
    filterBakhoor: "بخور",
    filterGenderAll: "للجميع",
    filterMen: "رجالي",
    filterWomen: "نسائي",
    filterUnisex: "محايد",
    perfume1Name: "عود سام",
    perfume1Desc: "تركيبتنا المميزة مع نوتات خشبية عميقة وعود فاخر.",
    perfume2Name: "مخمرية الحرير",
    perfume2Desc: "كريم معطر ناعم كالحرير يترك انطباعًا يدوم.",
    perfume3Name: "تروبيكال سبلاش",
    perfume3Desc: "معطر جسم منعش مع نوتات الحمضيات ونسيم البحر.",
    perfume4Name: "روز هير ميست",
    perfume4Desc: "عطر رقيق لشعرك، غني بالفيتامينات ونوتات الزهور.",
    perfume5Name: "هوم عود",
    perfume5Desc: "معطر جو قوي يجلب فخامة الشرق إلى منزلك.",
    perfume6Name: "بخور ملكي",
    perfume6Desc: "تجربة بخور تقليدية مع رقائق خشبية غنية وبطيئة الاحتراق.",
    noMatches: "لم يتم العثور على منتجات في هذا القسم.",
    deptSectionTitle: "أقسامنا",
    deptSectionDesc: "استكشف مجموعتنا الحصرية من المنتجات الفاخرة.",
    deptCompositionTitle: "التركيب",
    deptCompositionDesc: "تركيبات عطرية مخصصة مصنوعة لتعكس هويتك الفريدة.",
    deptMakhmariyatTitle: "مخمريات",
    deptMakhmariyatDesc: "مخمريات فاخرة للتعطر العميق والمستمر للبشرة.",
    deptBodySplashTitle: "badySplash",
    deptBodySplashDesc: "رذاذ خفيف ومنعش يمنحك انتعاشًا طوال اليوم.",
    deptHairMistTitle: "hairmist",
    deptHairMistDesc: "بخاخات عطرية لطيفة مصممة خصيصًا للعناية بالشعر.",
    deptAirFreshenersTitle: "معطرات",
    deptAirFreshenersDesc: "معطرات جو فاخرة لرفع مستوى مساحتك المعيشية.",
    deptBakhoorTitle: "بخور",
    deptBakhoorDesc: "بخور تقليدي ورقائق عود لأجواء ملكية حقيقية.",
    exploreBtn: "استكشف",
    footerInfo: "معلومات",
    giftSubtitle: "الهدية المثالية",
    giftTitle: "أهدِ بأسلوب",
    giftDesc1:
      "أظهر تقديرك بأرقى لفتة من الفخامة. سواء كان ذلك لمناسبة خاصة أو مفاجأة ذات مغزى، يقدم متجرنا تغليف هدايا مخصص يرتقي بهديتك إلى تجربة لا تُنسى.",
    giftDesc2:
      "اختر تركيبتك المفضلة، ودع حرفيينا يغلفونها بأناقة مع شريط وملاحظة شخصية.",
    giftBtn: "استكشف الهدايا",
    favoritesTitle: "المفضلة",
    favoritesEmpty: "قائمة المفضلة لديك فارغة.",
    favoritesGoToShop: "استكشف المنتجات",
    removedFromFavorites: "تمت الإزالة من المفضلة",
  },
};

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState("ar");

  const toggleLanguage = () => {
    document.documentElement.classList.add("no-transition");
    setLang((prev) => (prev === "en" ? "ar" : "en"));
    setTimeout(() => {
      document.documentElement.classList.remove("no-transition");
    }, 50);
  };

  useEffect(() => {
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
    document.documentElement.lang = lang;
  }, [lang]);

  return (
    <LanguageContext.Provider
      value={{ lang, setLang, toggleLanguage, t: content[lang] }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
