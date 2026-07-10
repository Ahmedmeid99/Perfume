import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { GetProduct, GetRelatedCategoryProducts } from "../api/Product";
import { addToCart } from "../redux/cartSlice";
import { useDispatch } from "react-redux";
import {
  ShoppingCart,
  ArrowLeft,
  Loader2,
  Star,
  ShieldCheck,
  Truck,
} from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import ProductCard from "../components/ProductCard";
import {
  getProductId,
  getProductName,
  getProductDesc,
  getProductPrice,
  getProductImage,
  getAllProductImages,
  getCategoryId,
} from "../api/productHelpers";

export default function ProductDetails() {
  const { id } = useParams();
  const { lang } = useLanguage();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [addedAnim, setAddedAnim] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchProductData = async () => {
      setLoading(true);
      try {
        const data = await GetProduct(id);
        if (data) {
          setProduct(data);
          setSelectedImageIndex(0);
          const catId = getCategoryId(data);
          const relatedData = await GetRelatedCategoryProducts(
            catId,
            parseInt(id),
            4,
          );
          if (relatedData) setRelated(relatedData);
        }
      } catch (error) {
        console.error("Error fetching product details:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProductData();
  }, [id]);

  if (loading) {
    return (
      <div
        className="catalog-loader"
        style={{
          minHeight: "80vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Loader2 className="spinner" size={60} />
        <p style={{ marginTop: "1rem" }}>
          {lang === "en" ? "Loading details..." : "جاري التحميل..."}
        </p>
      </div>
    );
  }

  if (!product) {
    return (
      <div
        className="error-state"
        style={{ minHeight: "80vh", paddingTop: "150px", textAlign: "center" }}
      >
        <h2>{lang === "en" ? "Product not found" : "المنتج غير موجود"}</h2>
        <button
          className="cta-button-redesigned"
          style={{ marginTop: "2rem" }}
          onClick={() => navigate("/")}
        >
          {lang === "en" ? "Back to Home" : "العودة للرئيسية"}
        </button>
      </div>
    );
  }

  const pId = getProductId(product, id);
  const pName = getProductName(product, lang);
  const pDesc = getProductDesc(product, lang);
  const pPrice = getProductPrice(product);
  const allImages = getAllProductImages(product);
  const pImg = allImages[selectedImageIndex] || allImages[0];
  const cName =
    lang === "en"
      ? product?.category?.categoryName
      : product?.category?.categoryNameAr;

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(addToCart({ id: pId, name: pName, price: pPrice, img: pImg }));
    setAddedAnim(true);
    setTimeout(() => setAddedAnim(false), 900);
  };

  const addLabel = lang === "en" ? "Add to Shopping Bag" : "أضف لحقيبة التسوق";
  const addedLabel = lang === "en" ? "Added!" : "تمت الإضافة!";

  return (
    <div
      className="product-details-page-wrapper animate-view reveal active"
      style={{
        paddingTop: "140px",
        minHeight: "100vh",
        background: "var(--bg-color)",
        marginBottom: "3rem",
      }}
    >
      <div className="container">
        {/* Back Button */}
        <button className="details-back-btn" onClick={() => navigate(-1)}>
          <ArrowLeft size={16} />
          <span>{lang === "en" ? "Back" : "العودة"}</span>
        </button>

        {/* Main Grid */}
        <div className="product-details-main-grid">
          {/* Left Column: Gallery */}
          <div className="details-gallery-box">
            <div className="details-main-img-wrap">
              <img src={pImg} alt={pName} className="details-main-img" />
            </div>
            {allImages.length > 1 && (
              <div className="details-thumbnails-row">
                {allImages.map((imgUrl, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImageIndex(i)}
                    className={`details-thumbnail-btn ${selectedImageIndex === i ? "active" : ""}`}
                  >
                    <img src={imgUrl} alt={`${pName} view ${i + 1}`} />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right Column: Info */}
          <div className="details-info-box">
            <span className="details-category-tag">{cName}</span>
            <h1 className="details-product-title">{pName}</h1>

            <div className="details-rating-block">
              <div className="stars-row">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={15}
                    fill={i < 4 ? "var(--primary-color)" : "none"}
                    stroke="var(--primary-color)"
                  />
                ))}
              </div>
              {product.likesCount > 0 && (
                <span className="details-likes-count">
                  ({product.likesCount} {lang === "en" ? "Likes" : "إعجابات"})
                </span>
              )}
            </div>

            <div className="details-price-badge">{pPrice} EGP</div>
            <p className="details-description">{pDesc}</p>

            {product.quantityInStock !== undefined && (
              <div className="details-stock-status">
                {product.quantityInStock > 0 ? (
                  <span className="stock-in">
                    ✓{" "}
                    {lang === "en"
                      ? `In Stock (${product.quantityInStock} left)`
                      : `متوفر في المخزن (متبقي ${product.quantityInStock})`}
                  </span>
                ) : (
                  <span className="stock-out">
                    ✗ {lang === "en" ? "Out of Stock" : "غير متوفر حالياً"}
                  </span>
                )}
              </div>
            )}

            <div className="details-features-row">
              <div className="details-feature-item">
                <ShieldCheck size={18} />
                <span>{lang === "en" ? "100% Authentic" : "أصلي 100%"}</span>
              </div>
              <div className="details-feature-item">
                <Truck size={18} />
                <span>{lang === "en" ? "Fast Delivery" : "توصيل سريع"}</span>
              </div>
            </div>

            <button
              className={`cta-button-redesigned details-cart-submit-btn${addedAnim ? " details-cart-submit-btn--added" : ""}`}
              disabled={product.quantityInStock === 0}
              onClick={handleAddToCart}
            >
              <ShoppingCart size={18} />
              <span>{addedAnim ? addedLabel : addLabel}</span>
            </button>
          </div>
        </div>

        {/* Related Products */}
        {related.length > 0 && (
          <section className="details-related-section">
            <h2 className="related-section-title">
              {lang === "en" ? "You May Also Like" : "قد يعجبك أيضاً"}
            </h2>
            <div className="streetwear-products-grid">
              {related.map((item) => {
                const rId = getProductId(item);
                const rName = getProductName(item, lang);
                const rPrice = getProductPrice(item);
                const rImg = getProductImage(item);
                const rDesc = item.description || item.shortDescription || "";

                return (
                  <ProductCard
                    key={rId}
                    id={rId}
                    name={rName}
                    desc={rDesc}
                    price={rPrice}
                    img={rImg}
                  />
                );
              })}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
