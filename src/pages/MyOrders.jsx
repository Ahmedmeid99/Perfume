import React, { useState, useEffect, useCallback } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";
import { GetUserOrders } from "../api/Order";
import { CreateReview } from "../api/Review";
import {
  ShoppingBag,
  Star,
  X,
  CheckCircle,
  Loader2,
  Package,
  Clock,
  ChevronDown,
  ChevronUp,
  MessageSquare,
} from "lucide-react";

/* ─── helpers ─────────────────────────────────────────────── */
const STATUS_MAP = {
  1: { en: "Pending", ar: "قيد الانتظار", color: "#f59e0b" },
  2: { en: "Confirmed", ar: "مؤكد", color: "#3b82f6" },
  3: { en: "Processing", ar: "قيد المعالجة", color: "#8b5cf6" },
  4: { en: "Shipped", ar: "تم الشحن", color: "#06b6d4" },
  5: { en: "Delivered", ar: "تم التوصيل", color: "#10b981" },
  6: { en: "Cancelled", ar: "ملغى", color: "#ef4444" },
  7: { en: "Returned", ar: "مسترجع", color: "#f97316" },
};

function StatusBadge({ status, lang }) {
  const info = STATUS_MAP[status] || {
    en: "Unknown",
    ar: "غير معروف",
    color: "#888",
  };
  return (
    <span
      className="order-status-badge"
      style={{
        background: info.color + "15",
        color: info.color,
        border: `1px solid ${info.color}35`,
      }}
    >
      {lang === "en" ? info.en : info.ar}
    </span>
  );
}

/* ─── Star Rating Component ───────────────────────────────── */
function StarRating({ value, onChange, readonly = false, size = 24 }) {
  const [hovered, setHovered] = useState(0);
  return (
    <div
      className="star-rating"
      style={{ display: "flex", gap: "6px", justifyContent: "center" }}
    >
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          disabled={readonly}
          className="star-btn"
          onClick={() => !readonly && onChange && onChange(star)}
          onMouseEnter={() => !readonly && setHovered(star)}
          onMouseLeave={() => !readonly && setHovered(0)}
          style={{
            background: "none",
            border: "none",
            cursor: readonly ? "default" : "pointer",
            padding: "2px",
          }}
        >
          <Star
            size={size}
            fill={(hovered || value) >= star ? "var(--primary-color)" : "none"}
            color={(hovered || value) >= star ? "var(--primary-color)" : "#555"}
            style={{ transition: "all 0.15s ease" }}
          />
        </button>
      ))}
    </div>
  );
}

/* ─── Rating Modal ────────────────────────────────────────── */
function RatingModal({ product, userId, lang, onClose, onSuccess }) {
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    if (rating === 0) {
      setError(
        lang === "en"
          ? "Please select a star rating."
          : "يرجى اختيار تقييم بالنجوم.",
      );
      return;
    }
    setSubmitting(true);
    setError("");
    try {
      await CreateReview({
        userId,
        productId: product.productId,
        reviewText,
        rating,
      });
      setDone(true);
      setTimeout(() => {
        onSuccess(product.productId);
        onClose();
      }, 1200);
    } catch {
      setError(
        lang === "en"
          ? "Failed to submit review. Please try again."
          : "فشل إرسال التقييم. حاول مرة أخرى.",
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div
      className="rating-modal-overlay"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="rating-modal-card animate-dropdown-fade">
        <button
          className="rating-modal-close"
          onClick={onClose}
          aria-label="Close"
        >
          <X size={18} />
        </button>

        {done ? (
          <div
            className="rating-modal-success"
            style={{ textAlign: "center", padding: "2rem 1rem" }}
          >
            <CheckCircle
              size={56}
              style={{
                color: "var(--primary-color)",
                margin: "0 auto 1.5rem",
                display: "block",
              }}
            />
            <h3>{lang === "en" ? "Review Submitted!" : "تم إرسال التقييم!"}</h3>
            <p style={{ color: "var(--text-muted)", marginTop: "0.5rem" }}>
              {lang === "en"
                ? "Thank you for your feedback."
                : "شكراً على ملاحظاتك."}
            </p>
          </div>
        ) : (
          <>
            <div
              className="rating-modal-header"
              style={{
                display: "flex",
                gap: "0.8rem",
                alignItems: "center",
                marginBottom: "1.5rem",
              }}
            >
              <Star
                size={24}
                fill="var(--primary-color)"
                color="var(--primary-color)"
              />
              <h2>{lang === "en" ? "Rate Product" : "قيّم المنتج"}</h2>
            </div>

            <p
              className="rating-product-name"
              style={{
                fontWeight: "600",
                fontSize: "1.1rem",
                marginBottom: "1.5rem",
              }}
            >
              {lang === "ar"
                ? product.productNameAr || product.productName
                : product.productName || product.productNameAr}
            </p>

            <div
              className="rating-stars-wrapper"
              style={{ margin: "1.5rem 0", textAlign: "center" }}
            >
              <StarRating value={rating} onChange={setRating} size={32} />
              {rating > 0 && (
                <span
                  className="rating-label"
                  style={{
                    display: "block",
                    marginTop: "0.8rem",
                    fontWeight: "500",
                    color: "var(--primary-color)",
                  }}
                >
                  {
                    [
                      "",
                      lang === "en" ? "Poor" : "سيء",
                      lang === "en" ? "Fair" : "مقبول",
                      lang === "en" ? "Good" : "جيد",
                      lang === "en" ? "Very Good" : "جيد جداً",
                      lang === "en" ? "Excellent" : "ممتاز",
                    ][rating]
                  }
                </span>
              )}
            </div>

            <div
              className="rating-textarea-wrapper"
              style={{ position: "relative", marginBottom: "1.5rem" }}
            >
              <textarea
                className="rating-textarea"
                placeholder={
                  lang === "en"
                    ? "Share your experience (optional)..."
                    : "شارك تجربتك (اختياري)..."
                }
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
                maxLength={500}
                rows={4}
                style={{
                  width: "100%",
                  background: "var(--input-bg)",
                  border: "1px solid var(--border-color)",
                  color: "var(--text-light)",
                  borderRadius: "12px",
                  padding: "1rem",
                  fontSize: "0.95rem",
                  resize: "none",
                  outline: "none",
                }}
              />
              <span
                className="char-count"
                style={{
                  position: "absolute",
                  bottom: "10px",
                  right: "10px",
                  fontSize: "0.75rem",
                  opacity: 0.5,
                }}
              >
                {reviewText.length}/500
              </span>
            </div>

            {error && (
              <p
                className="rating-error"
                style={{
                  color: "#ef4444",
                  marginBottom: "1rem",
                  fontSize: "0.9rem",
                }}
              >
                {error}
              </p>
            )}

            <button
              className="cta-button-redesigned rating-submit-btn"
              onClick={handleSubmit}
              disabled={submitting}
              style={{
                width: "100%",
                padding: "1rem",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: "0.5rem",
              }}
            >
              {submitting ? (
                <Loader2 size={18} className="spinner" />
              ) : (
                <Star size={18} />
              )}
              <span>{lang === "en" ? "Submit Review" : "إرسال التقييم"}</span>
            </button>
          </>
        )}
      </div>
    </div>
  );
}

/* ─── Single Order Card ───────────────────────────────────── */
function OrderCard({ order, userId, lang, reviewedProducts, onReviewed }) {
  const [expanded, setExpanded] = useState(false);
  const [ratingTarget, setRatingTarget] = useState(null);

  const date = new Date(order.orderDate).toLocaleDateString(
    lang === "ar" ? "ar-EG" : "en-GB",
    { year: "numeric", month: "long", day: "numeric" },
  );

  const canRate = order.status === 5; // Delivered

  return (
    <div className="order-card-new animate-view reveal active">
      {/* Header */}
      <div
        className="order-card-header-new"
        onClick={() => setExpanded((p) => !p)}
      >
        <div className="order-header-left">
          <div className="order-icon-box">
            <Package size={18} />
          </div>
          <div>
            <p className="order-id-txt">
              {lang === "en"
                ? `Order #${order.orderCode}`
                : `طلب رقم ${order.orderCode}`}
            </p>
            <p className="order-date-txt">
              <Clock size={12} />
              <span>{date}</span>
            </p>
          </div>
        </div>

        <div className="order-header-right">
          <StatusBadge status={order.status} lang={lang} />
          <span className="order-price-txt">
            {order.totalAmount?.toFixed(2)}{" "}
            <span style={{ fontSize: "0.8rem", opacity: 0.6 }}>EGP</span>
          </span>
          {expanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </div>
      </div>

      {/* Items */}
      {expanded && (
        <div className="order-expanded-details">
          <div className="order-items-list-new">
            {order.orderItems?.map((item) => {
              const alreadyRated = reviewedProducts.includes(item.productId);
              return (
                <div key={item.orderItemId} className="order-item-row-new">
                  <div className="item-info-meta">
                    <span className="item-name-txt">
                      {lang === "ar"
                        ? item.productNameAr || item.productName
                        : item.productName || item.productNameAr}
                    </span>
                    <span className="item-qty-price">
                      x{item.quantity} · {item.price?.toFixed(2)} EGP
                    </span>
                  </div>
                  <div className="item-row-right">
                    <span className="item-subtotal-txt">
                      {item.totalPrice?.toFixed(2)} EGP
                    </span>
                    {canRate &&
                      (alreadyRated ? (
                        <span className="already-rated-pill">
                          <Star
                            size={12}
                            fill="var(--primary-color)"
                            color="var(--primary-color)"
                          />
                          <span>{lang === "en" ? "Rated" : "تم التقييم"}</span>
                        </span>
                      ) : (
                        <button
                          className="item-rate-trigger-btn"
                          onClick={() => setRatingTarget(item)}
                        >
                          <Star size={13} />
                          <span>{lang === "en" ? "Rate" : "قيّم"}</span>
                        </button>
                      ))}
                  </div>
                </div>
              );
            })}
          </div>

          {!canRate && order.status !== 6 && order.status !== 7 && (
            <p className="rate-hint-note">
              ⭐{" "}
              {lang === "en"
                ? "You can rate products once the order is delivered."
                : "يمكنك تقييم المنتجات بعد تسليم الطلب."}
            </p>
          )}
        </div>
      )}

      {/* Rating Modal */}
      {ratingTarget && (
        <RatingModal
          product={ratingTarget}
          userId={userId}
          lang={lang}
          onClose={() => setRatingTarget(null)}
          onSuccess={onReviewed}
        />
      )}
    </div>
  );
}

/* ─── Main Page ───────────────────────────────────────────── */
export default function MyOrders() {
  const { lang } = useLanguage();
  const navigate = useNavigate();
  const { currentUser, isAuthenticated } = useSelector((state) => state.user);

  const userId = currentUser?.user?.userId || currentUser?.userId;

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [reviewedProducts, setReviewedProducts] = useState([]);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }
    fetchOrders();
  }, [isAuthenticated]);

  const fetchOrders = async () => {
    setLoading(true);
    setError("");
    try {
      const data = await GetUserOrders(userId);
      const sorted = (Array.isArray(data) ? data : []).sort(
        (a, b) => new Date(b.orderDate) - new Date(a.orderDate),
      );
      setOrders(sorted);
    } catch {
      setError(lang === "en" ? "Failed to load orders." : "فشل تحميل الطلبات.");
    } finally {
      setLoading(false);
    }
  };

  const handleReviewed = useCallback((productId) => {
    setReviewedProducts((prev) => [...prev, productId]);
  }, []);

  return (
    <div
      className="my-orders-page-wrapper"
      style={{
        paddingTop: "140px",
        minHeight: "100vh",
        background: "var(--bg-color)",
        marginBottom: "3rem",
      }}
    >
      <div className="container">
        {/* Page Title */}
        <div className="orders-page-header animate-view reveal active">
          <div className="orders-header-title-flex">
            <ShoppingBag size={28} className="orders-title-icon" />
            <div>
              <h1 className="orders-main-title">
                {lang === "en" ? "My Orders" : "طلباتي"}
              </h1>
              <p className="orders-subtitle-txt">
                {lang === "en"
                  ? "Track and review your purchases"
                  : "تتبع وقيّم مشترياتك"}
              </p>
            </div>
          </div>
        </div>

        {/* Content */}
        {loading ? (
          <div className="catalog-loader" style={{ padding: "6rem 0" }}>
            <Loader2 size={40} className="spinner" />
            <p>
              {lang === "en" ? "Loading orders..." : "جارٍ تحميل طلباتك..."}
            </p>
          </div>
        ) : error ? (
          <div className="catalog-empty-state" style={{ padding: "4rem 1rem" }}>
            <p>{error}</p>
            <button
              className="cta-button-redesigned"
              onClick={fetchOrders}
              style={{ marginTop: "1.5rem" }}
            >
              {lang === "en" ? "Retry" : "إعادة المحاولة"}
            </button>
          </div>
        ) : orders.length === 0 ? (
          <div className="catalog-empty-state" style={{ padding: "6rem 1rem" }}>
            <ShoppingBag
              size={64}
              style={{ color: "var(--text-muted)", marginBottom: "1.5rem" }}
            />
            <h2>{lang === "en" ? "No orders yet" : "لا توجد طلبات بعد"}</h2>
            <p style={{ color: "var(--text-muted)", marginBottom: "2rem" }}>
              {lang === "en"
                ? "Your order history will appear here."
                : "سيظهر سجل طلباتك هنا."}
            </p>
            <button
              className="cta-button-redesigned"
              onClick={() => navigate("/")}
            >
              {lang === "en" ? "Start Shopping" : "ابدأ التسوق"}
            </button>
          </div>
        ) : (
          <div className="orders-cards-list-wrapper">
            {orders.map((order) => (
              <OrderCard
                key={order.orderId}
                order={order}
                userId={userId}
                lang={lang}
                reviewedProducts={reviewedProducts}
                onReviewed={handleReviewed}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
