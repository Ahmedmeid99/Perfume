import React, { useState, useEffect, useCallback } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";
import { GetCategories } from "../api/Category";
import { GetAllCategoryProducts } from "../api/Product";
import { addToCart } from "../redux/cartSlice";
import { useDispatch } from "react-redux";
import { Loader2, ChevronRight } from "lucide-react";
import ProductCard from "../components/ProductCard";
import {
  getProductId,
  getProductName,
  getProductDesc,
  getProductPrice,
  getProductImage,
  getImageUrl,
} from "../api/productHelpers";

export default function Home() {
  const { t, lang } = useLanguage();
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  // Slideshow
  const [currentSlide, setCurrentSlide] = useState(0);
  const heroImages = [
    "/hero-1.jpg",
    "/hero-2.jpg",
    "/hero-3.jpg",
    "/hero-4.jpg",
  ];

  // Category + Products state
  const [categories, setCategories] = useState([]);
  const [categoryProducts, setCategoryProducts] = useState({}); // { [categoryId]: product[] }
  const [loadingCats, setLoadingCats] = useState(true);
  const [loadingProds, setLoadingProds] = useState(false);
  const [wishlist, setWishlist] = useState([]);

  // Sync Search Query from Navbar Search Input (URL param)
  const searchParams = new URLSearchParams(location.search);
  const searchQuery = searchParams.get("search") || "";

  // Auto-scroll slideshow
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  // Load wishlist from localStorage
  useEffect(() => {
    try {
      const stored = JSON.parse(localStorage.getItem("wishlist") || "[]");
      setWishlist(stored);
    } catch (e) {
      setWishlist([]);
    }
    const updateWishlist = () => {
      try {
        const stored = JSON.parse(localStorage.getItem("wishlist") || "[]");
        setWishlist(stored);
      } catch (e) {
        setWishlist([]);
      }
    };
    window.addEventListener("wishlistChanged", updateWishlist);
    return () => window.removeEventListener("wishlistChanged", updateWishlist);
  }, []);

  // Fetch categories then fetch all products per category in parallel
  useEffect(() => {
    const load = async () => {
      setLoadingCats(true);
      try {
        const cats = await GetCategories();
        if (!cats || cats.length === 0) {
          setLoadingCats(false);
          return;
        }
        setCategories(cats);
        setLoadingCats(false);

        setLoadingProds(true);
        const results = await Promise.all(
          cats.map(async (cat) => {
            const cId =
              cat.categoryId || cat.CategoryId || cat.productCategoryID;
            const prods = await GetAllCategoryProducts(cId);
            return { cId, prods: prods || [] };
          }),
        );
        const map = {};
        results.forEach(({ cId, prods }) => {
          map[cId] = prods;
        });
        setCategoryProducts(map);
      } catch (err) {
        console.error("Error loading categories/products:", err);
      } finally {
        setLoadingCats(false);
        setLoadingProds(false);
      }
    };
    load();
  }, [lang]);

  const toggleWishlist = (productId) => {
    let updated;
    if (wishlist.includes(productId)) {
      updated = wishlist.filter((id) => id !== productId);
    } else {
      updated = [...wishlist, productId];
    }
    setWishlist(updated);
    localStorage.setItem("wishlist", JSON.stringify(updated));
    window.dispatchEvent(new Event("wishlistChanged"));
  };

  const getCategoryImage = (cat) => {
    const rawImg =
      cat.categoryImages && cat.categoryImages.length > 0
        ? cat.categoryImages[0].imageUrl
        : cat.CategoryImages && cat.CategoryImages.length > 0
          ? cat.CategoryImages[0].imageUrl
          : null;
    return rawImg ? getImageUrl(rawImg) : null;
  };

  const getCategoryName = (cat) => {
    if (lang === "ar") {
      return (
        cat.categoryNameAr ||
        cat.CategoryNameAr ||
        cat.categoryName ||
        cat.CategoryName ||
        cat.name ||
        ""
      );
    }
    return cat.categoryName || cat.CategoryName || cat.name || "";
  };

  const isLoading = loadingCats || loadingProds;

  // Filter products by search query
  const filteredCategoryProducts = {};
  categories.forEach((cat) => {
    const cId = cat.categoryId || cat.CategoryId || cat.productCategoryID;
    const prods = categoryProducts[cId] || [];
    if (searchQuery.trim()) {
      const query = searchQuery.trim().toLowerCase();
      filteredCategoryProducts[cId] = prods.filter((p) => {
        const name = getProductName(p, lang).toLowerCase();
        const desc = getProductDesc(p, lang).toLowerCase();
        return name.includes(query) || desc.includes(query);
      });
    } else {
      filteredCategoryProducts[cId] = prods;
    }
  });

  const totalProducts = Object.values(filteredCategoryProducts).reduce(
    (acc, prods) => acc + prods.length,
    0,
  );

  return (
    <div className="home-redesigned-page">
      {/* Hero Section */}
      <section className="hero-compact">
        {heroImages.map((src, index) => (
          <img
            key={index}
            src={src}
            alt={`SAM Perfumes product banner ${index + 1}`}
            className="hero-bg"
            style={{
              opacity: index === currentSlide ? 0.45 : 0,
              transform: index === currentSlide ? "scale(1)" : "scale(1.05)",
              transition:
                "opacity 1.2s ease-in-out, transform 1.2s ease-in-out",
              zIndex: index === currentSlide ? 2 : 1,
            }}
          />
        ))}
        <div className="hero-overlay"></div>
        <div className="container hero-content">
          <span className="hero-subtitle">{t.heroSubtitle}</span>
          <h1 className="hero-title">{t.heroTitle}</h1>
          <p className="hero-desc">{t.heroDesc}</p>
          <a href="/perfumes" className="cta-button-redesigned">
            {t.beginJourney}
          </a>
        </div>
      </section>

      {/* All Categories + Products Section */}
      <section id="catalog-section" className="catalog-section-wrapper">
        <div className="container">
          {/* Section Header */}
          <div className="catalog-controls-bar">
            <div className="catalog-title-area">
              <h2>
                {lang === "en" ? "Exclusive Collection" : "المجموعة الحصرية"}
              </h2>
              {!isLoading && (
                <p>
                  {lang === "en"
                    ? `${categories.length} categories · ${totalProducts} products`
                    : `${categories.length} تصنيف · ${totalProducts} منتج`}
                </p>
              )}
            </div>
          </div>

          {/* Category Quick-Nav Pills */}
          {!isLoading && categories.length > 0 && (
            <div className="cat-quicknav-bar">
              <div className="cat-quicknav-list">
                {categories.map((cat) => {
                  const cId =
                    cat.categoryId || cat.CategoryId || cat.productCategoryID;
                  const cName = getCategoryName(cat);
                  const catImg = getCategoryImage(cat);
                  return (
                    <button
                      key={cId}
                      className="cat-quicknav-pill"
                      onClick={() => {
                        const el = document.getElementById(
                          `cat-section-${cId}`,
                        );
                        if (el)
                          el.scrollIntoView({
                            behavior: "smooth",
                            block: "start",
                          });
                      }}
                    >
                      {catImg && (
                        <span
                          className="cat-quicknav-img"
                          style={{ backgroundImage: `url(${catImg})` }}
                        />
                      )}
                      <span className="cat-quicknav-label">{cName}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Search Query Active Badge */}
          {searchQuery && (
            <div
              className="search-query-badge"
              style={{
                marginBottom: "1.5rem",
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                background: "var(--surface-color)",
                border: "1px solid var(--border-color)",
                padding: "0.4rem 1rem",
                borderRadius: "30px",
              }}
            >
              <span
                style={{ fontSize: 0.85 + "rem", color: "var(--text-light)" }}
              >
                {lang === "en" ? "Search:" : "البحث عن:"} "{searchQuery}"
              </span>
              <button
                onClick={() => navigate("/")}
                style={{
                  background: "transparent",
                  border: "none",
                  color: "var(--text-muted)",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justify: "center",
                  fontSize: "1rem",
                  padding: "0 2px",
                }}
              >
                ✕
              </button>
            </div>
          )}

          {/* Loading State */}
          {isLoading ? (
            <div className="catalog-loader">
              <Loader2 className="spinner" size={40} />
              <p>
                {lang === "en"
                  ? "Loading collection..."
                  : "جاري تحميل المجموعة..."}
              </p>
            </div>
          ) : totalProducts === 0 ? (
            <div className="catalog-empty-state">
              <p>{t.noMatches}</p>
            </div>
          ) : (
            /* Per-Category Sections */
            <div className="categories-sections-wrapper">
              {categories.map((cat, catIdx) => {
                const cId =
                  cat.categoryId || cat.CategoryId || cat.productCategoryID;
                const cName = getCategoryName(cat);
                const catImg = getCategoryImage(cat);
                const prods = filteredCategoryProducts[cId] || [];

                // If searching and this category has no matches, hide the category section
                if (searchQuery.trim() && prods.length === 0) {
                  return null;
                }

                const fallbackGradients = [
                  "linear-gradient(135deg, #1a1200, #3d2e00)",
                  "linear-gradient(135deg, #1a0f00, #3d2400)",
                  "linear-gradient(135deg, #001a1a, #003d3d)",
                  "linear-gradient(135deg, #1a001a, #3d003d)",
                  "linear-gradient(135deg, #001a0a, #003d18)",
                  "linear-gradient(135deg, #1a0a00, #3d1a00)",
                ];
                const gradientBg =
                  fallbackGradients[catIdx % fallbackGradients.length];

                return (
                  <div
                    key={cId}
                    id={`cat-section-${cId}`}
                    className="cat-products-section"
                  >
                    {/* Category Banner Header */}
                    <div
                      className="cat-section-banner"
                      style={{ background: catImg ? undefined : gradientBg }}
                    >
                      {catImg && (
                        <img
                          src={catImg}
                          alt={cName}
                          className="cat-banner-bg-img"
                        />
                      )}
                      <div className="cat-banner-overlay" />
                      <div className="cat-banner-content">
                        <span className="cat-banner-tag">
                          {lang === "en" ? "COLLECTION" : "مجموعة"}
                        </span>
                        <h2 className="cat-banner-title">{cName}</h2>
                        <span className="cat-banner-count">
                          {prods.length} {lang === "en" ? "products" : "منتج"}
                        </span>
                        <Link
                          to="/perfumes"
                          state={{ categoryId: cId }}
                          className="cat-banner-link"
                        >
                          {lang === "en" ? "View All" : "عرض الكل"}
                          <ChevronRight size={16} />
                        </Link>
                      </div>
                    </div>

                    {/* Products Grid — 4 per row */}
                    {prods.length === 0 ? (
                      <div className="cat-no-products">
                        <p>
                          {lang === "en"
                            ? "No products in this category yet."
                            : "لا توجد منتجات في هذا التصنيف."}
                        </p>
                      </div>
                    ) : (
                      <div className="pc-grid">
                        {prods.map((product, i) => {
                          const id = getProductId(product, i);
                          const name = getProductName(product, lang);
                          const desc = getProductDesc(product, lang);
                          const price = getProductPrice(product);
                          const img = getProductImage(product, i);
                          return (
                            <ProductCard
                              key={id}
                              id={id}
                              name={name}
                              desc={desc}
                              price={price}
                              img={img}
                              isLiked={wishlist.includes(id)}
                              onToggleWishlist={toggleWishlist}
                            />
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
