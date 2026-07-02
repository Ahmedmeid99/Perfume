import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";
import { GetAllProducts } from "../api/Product";
import { addToCart } from "../redux/cartSlice";
import { useDispatch } from "react-redux";
import { Loader2, ArrowLeft, Heart, ShoppingBag } from "lucide-react";
import {
  getProductId,
  getProductName,
  getProductDesc,
  getProductPrice,
  getProductImage,
} from "../api/productHelpers";
import ProductCard from "../components/ProductCard";

export default function Favorites() {
  const { t, lang } = useLanguage();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);

  // Load wishlist from localStorage
  useEffect(() => {
    try {
      const stored = JSON.parse(localStorage.getItem("wishlist") || "[]");
      setWishlist(stored);
    } catch (e) {
      setWishlist([]);
    }
  }, []);

  // Fetch all products and filter the favorited ones
  useEffect(() => {
    const fetchFavs = async () => {
      setLoading(true);
      try {
        const allProds = await GetAllProducts();
        if (allProds) {
          setProducts(allProds);
        }
      } catch (err) {
        console.error("Error loading products in Favorites:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchFavs();
  }, []);

  const toggleWishlist = (productId) => {
    let updated;
    if (wishlist?.includes(productId)) {
      updated = wishlist?.filter((id) => id !== productId);
    } else {
      updated = [...wishlist, productId];
    }
    setWishlist(updated);
    localStorage.setItem("wishlist", JSON.stringify(updated));
    window.dispatchEvent(new Event("wishlistChanged"));
  };

  const getFavoriteProducts = () => {
    return products.filter((p) => wishlist?.includes(getProductId(p)));
  };

  const favoritesList = getFavoriteProducts();

  return (
    <div className="favorites-page-wrapper">
      <div className="container">
        <div
          className="cart-header animate-view reveal active"
          style={{ marginBottom: "1.5rem" }}
        >
          <button
            className="back-btn"
            onClick={() => navigate(-1)}
            style={{
              marginBottom: "1.5rem",
              background: "none",
              border: "none",
              color: "var(--text-muted)",
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              cursor: "pointer",
            }}
          >
            <ArrowLeft size={20} />
            {lang === "en" ? "Continue Shopping" : "متابعة التسوق"}
          </button>
          <div
            style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}
          >
            <ShoppingBag size={28} style={{ color: "var(--primary-color)" }} />
            <div>
              <h1 className="section-title" style={{ margin: 0 }}>
                {t.favoritesTitle}
              </h1>
              {!loading && favoritesList?.length > 0 && (
                <p
                  style={{ margin: "0.25rem 0 0", color: "var(--text-muted)" }}
                >
                  {lang === "en"
                    ? `You have ${favoritesList?.length} items bookmarked`
                    : `لديك ${favoritesList?.length} منتجات في المفضلة`}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="fav-loader">
            <Loader2 className="spinner" size={44} />
            <p>
              {lang === "en" ? "Loading favorites..." : "جاري تحميل المفضلة..."}
            </p>
          </div>
        ) : favoritesList?.length === 0 ? (
          /* Empty Wishlist State */
          <div className="fav-empty-state animate-view reveal active">
            <div className="empty-heart-icon">
              <Heart size={64} strokeWidth={1} />
            </div>
            <h3>{t.favoritesEmpty}</h3>
            <Link to="/" className="fav-shop-btn">
              {t.favoritesGoToShop}
            </Link>
          </div>
        ) : (
          /* Premium Products Grid */
          <div className="pc-fav-grid animate-view reveal active">
            {favoritesList?.map((product, i) => {
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
                  isLiked={wishlist?.includes(id)}
                  onToggleWishlist={toggleWishlist}
                />
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
