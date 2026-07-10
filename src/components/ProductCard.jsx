import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingBag, Eye } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/cartSlice';
import { useLanguage } from '../context/LanguageContext';

/**
 * Reusable ProductCard
 * Props:
 *   id       – product id
 *   name     – display name
 *   desc     – short description
 *   price    – numeric price
 *   img      – image URL
 *   isLiked  – boolean (wishlist state)
 *   onToggleWishlist(id) – callback
 */
export default function ProductCard({ id, name, desc, price, img, isLiked, onToggleWishlist }) {
  const dispatch = useDispatch();
  const { lang } = useLanguage();
  const [imgError, setImgError] = useState(false);
  const [addedAnim, setAddedAnim] = useState(false);

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(addToCart({ id, name, price, img }));
    setAddedAnim(true);
    setTimeout(() => setAddedAnim(false), 900);
  };

  const handleToggleWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (onToggleWishlist) onToggleWishlist(id);
  };

  const addLabel = lang === 'en' ? 'Add to Cart' : 'أضف للحقيبة';
  const addedLabel = lang === 'en' ? 'Added!' : 'تمت الإضافة!';

  return (
    <div className="pc-card">
      {/* Image area */}
      <div className="pc-img-wrap">
        <Link to={`/product/${id}`} className="pc-img-link" tabIndex={-1} aria-label={name}>
          {!imgError ? (
            <img
              src={img}
              alt={name}
              className="pc-img"
              loading="lazy"
              onError={() => setImgError(true)}
            />
          ) : (
            <div className="pc-img-fallback">
              <ShoppingBag size={36} />
            </div>
          )}
        </Link>

        {/* Wishlist button – top right */}
        <button
          className={`pc-wish-btn${isLiked ? ' pc-wish-btn--active' : ''}`}
          onClick={handleToggleWishlist}
          aria-label={isLiked ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          <Heart
            size={16}
            fill={isLiked ? 'currentColor' : 'none'}
            strokeWidth={2}
          />
        </button>

        {/* Hover action bar */}
        <div className="pc-hover-bar">
          <Link to={`/product/${id}`} className="pc-action-btn pc-view-btn" aria-label="View product">
            <Eye size={15} />
            <span>{lang === 'en' ? 'View' : 'عرض'}</span>
          </Link>
          <button
            className={`pc-action-btn pc-cart-btn${addedAnim ? ' pc-cart-btn--added' : ''}`}
            onClick={handleAddToCart}
            aria-label={addLabel}
          >
            <ShoppingBag size={15} />
            <span>{addedAnim ? addedLabel : addLabel}</span>
          </button>
        </div>
      </div>

      {/* Info area */}
      <div className="pc-info">
        <Link to={`/product/${id}`} className="pc-name-link">
          <h3 className="pc-name">{name}</h3>
        </Link>
        {desc && <p className="pc-desc">{desc}</p>}
        <div className="pc-footer">
          <span className="pc-price">
            {price} <span className="pc-currency">EGP</span>
          </span>
          <button
            className={`pc-footer-cart-btn${addedAnim ? ' pc-footer-cart-btn--added' : ''}`}
            onClick={handleAddToCart}
            aria-label={addLabel}
          >
            <ShoppingBag size={14} />
          </button>
        </div>
      </div>
    </div>
  );
}
