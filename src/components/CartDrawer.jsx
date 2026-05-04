import React from 'react';
import { X, ShoppingBag, Trash2, Plus, Minus } from 'lucide-react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, addToCart, deleteItem } from '../redux/cartSlice';
import { useLanguage } from '../context/LanguageContext';
import { Link } from 'react-router-dom';

export default function CartDrawer({ isOpen, onClose }) {
  const { t } = useLanguage();
  const { items, totalAmount } = useSelector(state => state.cart);
  const dispatch = useDispatch();

  if (!isOpen) return null;

  return (
    <div className={`cart-drawer-overlay ${isOpen ? 'active' : ''}`} onClick={onClose}>
      <div className={`cart-drawer ${isOpen ? 'open' : ''}`} onClick={e => e.stopPropagation()}>
        <div className="cart-drawer-header">
          <div className="cart-title">
            <ShoppingBag size={20} />
            <span>{t.navCollection}</span>
          </div>
          <button className="close-btn" onClick={onClose}>
            <X size={24} />
          </button>
        </div>

        <div className="cart-drawer-content">
          {items.length === 0 ? (
            <div className="empty-cart">
              <ShoppingBag size={48} className="empty-icon" />
              <p>{t.noMatches || "Your cart is empty"}</p>
              <button className="cta-button" onClick={onClose}>{t.navCollection}</button>
            </div>
          ) : (
            <div className="cart-items">
              {items.map(item => (
                <div key={item.id} className="cart-item">
                  <div className="cart-item-img">
                    <img src={item.img} alt={item.name} />
                  </div>
                  <div className="cart-item-info">
                    <h4>{item.name}</h4>
                    <div className="cart-item-price">
                      {item.price} EGP
                    </div>
                    <div className="cart-item-actions">
                      <div className="quantity-control">
                        <button onClick={() => dispatch(removeFromCart(item.id))}>
                          <Minus size={14} />
                        </button>
                        <span>{item.quantity}</span>
                        <button onClick={() => dispatch(addToCart(item))}>
                          <Plus size={14} />
                        </button>
                      </div>
                      <button className="delete-btn" onClick={() => dispatch(deleteItem(item.id))}>
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {items.length > 0 && (
          <div className="cart-drawer-footer">
            <div className="cart-total">
              <span>{t.total || "Total"}:</span>
              <span className="total-amount">{totalAmount} EGP</span>
            </div>
            <Link to="/checkout" className="cta-button checkout-btn" onClick={onClose}>
              {t.bookNow || "Checkout"}
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
