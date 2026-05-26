import React, { useState, useEffect, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { GetUserOrders } from '../api/Order';
import { CreateReview, GetProductReviews } from '../api/Review';
import {
  ShoppingBag, Star, X, CheckCircle, Loader2,
  Package, Clock, ChevronDown, ChevronUp, MessageSquare
} from 'lucide-react';

/* ─── helpers ─────────────────────────────────────────────── */
const STATUS_MAP = {
  1: { en: 'Pending',    ar: 'قيد الانتظار', color: '#f59e0b' },
  2: { en: 'Confirmed',  ar: 'مؤكد',          color: '#3b82f6' },
  3: { en: 'Processing', ar: 'قيد المعالجة', color: '#8b5cf6' },
  4: { en: 'Shipped',    ar: 'تم الشحن',      color: '#06b6d4' },
  5: { en: 'Delivered',  ar: 'تم التوصيل',    color: '#10b981' },
  6: { en: 'Cancelled',  ar: 'ملغى',          color: '#ef4444' },
  7: { en: 'Returned',   ar: 'مسترجع',        color: '#f97316' },
};

function StatusBadge({ status, lang }) {
  const info = STATUS_MAP[status] || { en: 'Unknown', ar: 'غير معروف', color: '#888' };
  return (
    <span className="order-status-badge" style={{ background: info.color + '22', color: info.color, border: `1px solid ${info.color}55` }}>
      {lang === 'en' ? info.en : info.ar}
    </span>
  );
}

/* ─── Star Rating Component ───────────────────────────────── */
function StarRating({ value, onChange, readonly = false, size = 24 }) {
  const [hovered, setHovered] = useState(0);
  return (
    <div className="star-rating" style={{ display: 'flex', gap: '4px' }}>
      {[1, 2, 3, 4, 5].map(star => (
        <button
          key={star}
          type="button"
          disabled={readonly}
          className="star-btn"
          onClick={() => !readonly && onChange && onChange(star)}
          onMouseEnter={() => !readonly && setHovered(star)}
          onMouseLeave={() => !readonly && setHovered(0)}
          style={{ background: 'none', border: 'none', cursor: readonly ? 'default' : 'pointer', padding: '2px' }}
        >
          <Star
            size={size}
            fill={(hovered || value) >= star ? '#f59e0b' : 'none'}
            color={(hovered || value) >= star ? '#f59e0b' : '#555'}
            style={{ transition: 'all 0.15s ease' }}
          />
        </button>
      ))}
    </div>
  );
}

/* ─── Rating Modal ────────────────────────────────────────── */
function RatingModal({ product, userId, lang, onClose, onSuccess }) {
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    if (rating === 0) {
      setError(lang === 'en' ? 'Please select a star rating.' : 'يرجى اختيار تقييم بالنجوم.');
      return;
    }
    setSubmitting(true);
    setError('');
    try {
      await CreateReview({ userId, productId: product.productId, reviewText, rating });
      setDone(true);
      setTimeout(() => { onSuccess(product.productId); onClose(); }, 1200);
    } catch {
      setError(lang === 'en' ? 'Failed to submit review. Please try again.' : 'فشل إرسال التقييم. حاول مرة أخرى.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="rating-modal-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="rating-modal-card animate-fade-in">
        <button className="rating-modal-close" onClick={onClose} aria-label="Close">
          <X size={20} />
        </button>

        {done ? (
          <div className="rating-modal-success">
            <CheckCircle size={56} color="#10b981" />
            <h3>{lang === 'en' ? 'Review Submitted!' : 'تم إرسال التقييم!'}</h3>
            <p>{lang === 'en' ? 'Thank you for your feedback.' : 'شكراً على ملاحظاتك.'}</p>
          </div>
        ) : (
          <>
            <div className="rating-modal-header">
              <Star size={28} fill="#f59e0b" color="#f59e0b" />
              <h2>{lang === 'en' ? 'Rate Product' : 'قيّم المنتج'}</h2>
            </div>

            <p className="rating-product-name">{product.productName}</p>

            <div className="rating-stars-wrapper">
              <StarRating value={rating} onChange={setRating} size={36} />
              {rating > 0 && (
                <span className="rating-label">
                  {['', lang === 'en' ? 'Poor' : 'سيء', lang === 'en' ? 'Fair' : 'مقبول',
                     lang === 'en' ? 'Good' : 'جيد', lang === 'en' ? 'Very Good' : 'جيد جداً',
                     lang === 'en' ? 'Excellent' : 'ممتاز'][rating]}
                </span>
              )}
            </div>

            <div className="rating-textarea-wrapper">
              <MessageSquare size={16} style={{ opacity: 0.5, marginBottom: '0.5rem' }} />
              <textarea
                className="rating-textarea"
                placeholder={lang === 'en' ? 'Share your experience (optional)...' : 'شارك تجربتك (اختياري)...'}
                value={reviewText}
                onChange={e => setReviewText(e.target.value)}
                maxLength={500}
                rows={3}
              />
              <span className="char-count">{reviewText.length}/500</span>
            </div>

            {error && <p className="rating-error">{error}</p>}

            <button className="rating-submit-btn" onClick={handleSubmit} disabled={submitting}>
              {submitting ? <Loader2 size={18} className="spinner" /> : <Star size={18} />}
              {lang === 'en' ? 'Submit Review' : 'إرسال التقييم'}
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
  const [ratingTarget, setRatingTarget] = useState(null); // product to rate

  const date = new Date(order.orderDate).toLocaleDateString(
    lang === 'ar' ? 'ar-EG' : 'en-GB',
    { year: 'numeric', month: 'long', day: 'numeric' }
  );

  const canRate = order.status === 5; // Delivered

  return (
    <div className="order-card animate-view reveal active">
      {/* Header */}
      <div className="order-card-header" onClick={() => setExpanded(p => !p)}>
        <div className="order-card-left">
          <div className="order-icon-wrap">
            <Package size={20} />
          </div>
          <div>
            <p className="order-id">#{lang === 'en' ? 'Order' : 'طلب'} {order.orderId}</p>
            <p className="order-date">
              <Clock size={13} style={{ verticalAlign: 'middle', marginInlineEnd: '4px' }} />
              {date}
            </p>
          </div>
        </div>
        <div className="order-card-right">
          <StatusBadge status={order.status} lang={lang} />
          <span className="order-total">
            {order.totalAmount?.toFixed(2)} <span style={{ opacity: 0.6 }}>EGP</span>
          </span>
          {expanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </div>
      </div>

      {/* Items */}
      {expanded && (
        <div className="order-items-list">
          {order.orderItems?.map(item => {
            const alreadyRated = reviewedProducts.includes(item.productId);
            return (
              <div key={item.orderItemId} className="order-item-row">
                <div className="order-item-info">
                  <span className="order-item-name">{item.productName}</span>
                  <span className="order-item-meta">
                    x{item.quantity} · {item.price?.toFixed(2)} EGP
                  </span>
                </div>
                <div className="order-item-actions">
                  <span className="order-item-total">{item.totalPrice?.toFixed(2)} EGP</span>
                  {canRate && (
                    alreadyRated ? (
                      <span className="already-rated-badge">
                        <Star size={13} fill="#f59e0b" color="#f59e0b" />
                        {lang === 'en' ? 'Rated' : 'تم التقييم'}
                      </span>
                    ) : (
                      <button
                        className="rate-product-btn"
                        onClick={() => setRatingTarget(item)}
                      >
                        <Star size={14} />
                        {lang === 'en' ? 'Rate' : 'قيّم'}
                      </button>
                    )
                  )}
                </div>
              </div>
            );
          })}
          {!canRate && order.status !== 6 && order.status !== 7 && (
            <p className="rate-note">
              {lang === 'en'
                ? '⭐ You can rate products once the order is delivered.'
                : '⭐ يمكنك تقييم المنتجات بعد تسليم الطلب.'}
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
  const { currentUser, isAuthenticated } = useSelector(state => state.user);

  const userId = currentUser?.user?.userId || currentUser?.userId;

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [reviewedProducts, setReviewedProducts] = useState([]);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (!isAuthenticated) { navigate('/login'); return; }
    fetchOrders();
  }, [isAuthenticated]);

  const fetchOrders = async () => {
    setLoading(true);
    setError('');
    try {
      const data = await GetUserOrders(userId);
      const sorted = (Array.isArray(data) ? data : []).sort(
        (a, b) => new Date(b.orderDate) - new Date(a.orderDate)
      );
      setOrders(sorted);
    } catch {
      setError(lang === 'en' ? 'Failed to load orders.' : 'فشل تحميل الطلبات.');
    } finally {
      setLoading(false);
    }
  };

  const handleReviewed = useCallback((productId) => {
    setReviewedProducts(prev => [...prev, productId]);
  }, []);

  /* ── Render ── */
  return (
    <div className="my-orders-page" style={{ paddingTop: '120px', minHeight: '100vh', background: 'var(--bg-color)' }}>
      <div className="container">

        {/* Page Title */}
        <div className="my-orders-header animate-view reveal active">
          <div className="my-orders-title-wrap">
            <ShoppingBag size={32} style={{ color: 'var(--primary-color)' }} />
            <div>
              <h1 className="section-title" style={{ marginBottom: '0.2rem' }}>
                {lang === 'en' ? 'My Orders' : 'طلباتي'}
              </h1>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                {lang === 'en' ? 'Track & rate your purchases' : 'تتبع وقيّم مشترياتك'}
              </p>
            </div>
          </div>
        </div>

        {/* Content */}
        {loading ? (
          <div className="orders-loading">
            <Loader2 size={40} className="spinner" style={{ color: 'var(--primary-color)' }} />
            <p>{lang === 'en' ? 'Loading your orders...' : 'جارٍ تحميل طلباتك...'}</p>
          </div>
        ) : error ? (
          <div className="orders-error">
            <p>{error}</p>
            <button className="cta-button solid" onClick={fetchOrders}>
              {lang === 'en' ? 'Retry' : 'إعادة المحاولة'}
            </button>
          </div>
        ) : orders.length === 0 ? (
          <div className="orders-empty animate-view reveal active">
            <ShoppingBag size={80} style={{ color: 'var(--text-muted)', marginBottom: '1.5rem' }} />
            <h2>{lang === 'en' ? 'No orders yet' : 'لا توجد طلبات بعد'}</h2>
            <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>
              {lang === 'en' ? 'Your order history will appear here.' : 'سيظهر سجل طلباتك هنا.'}
            </p>
            <button className="cta-button solid" onClick={() => navigate('/perfumes')}>
              {lang === 'en' ? 'Start Shopping' : 'ابدأ التسوق'}
            </button>
          </div>
        ) : (
          <div className="orders-list">
            {orders.map(order => (
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
