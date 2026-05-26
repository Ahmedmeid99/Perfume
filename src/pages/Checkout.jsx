import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { clearCart } from '../redux/cartSlice';
import { PlaceOrder } from '../api/Order';
import { useLanguage } from '../context/LanguageContext';
import { useNavigate } from 'react-router-dom';
import { CreditCard, Truck, ShoppingBag, CheckCircle, Loader2 } from 'lucide-react';

export default function Checkout() {
  const { t, lang } = useLanguage();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { items, totalAmount } = useSelector(state => state.cart);
  const { currentUser, isAuthenticated } = useSelector(state => state.user);
  
  const [loading, setLoading] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [formData, setFormData] = useState({
    address: currentUser?.user?.address || currentUser?.address || '',
    phone: currentUser?.user?.phone || currentUser?.phone || '',
    paymentMethod: 'cod'
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isAuthenticated) {
      alert("Please login to place an order");
      return;
    }
    
    setLoading(true);
    try {
      const orderData = {
        customerID: currentUser?.user?.userId || currentUser?.user?.UserId || currentUser?.customerID || 1,
        orderDate: new Date().toISOString(),
        totalAmount: totalAmount,
        address: formData.address,
        phone: formData.phone,
        items: items.map(item => ({
          productID: item.id,
          quantity: item.quantity,
          unitPrice: item.price
        }))
      };
      
      const result = await PlaceOrder(orderData);
      if (result) {
        setOrderPlaced(true);
        dispatch(clearCart());
      }
    } catch (error) {
      console.error("Order failed:", error);
      alert("Something went wrong with your order.");
    } finally {
      setLoading(false);
    }
  };

  if (orderPlaced) {
    return (
      <div className="checkout-success animate-view reveal active">
        <CheckCircle size={80} className="success-icon" />
        <h1>{lang === 'en' ? 'Order Sent!' : 'تم إرسال الطلب!'}</h1>
        <p style={{ fontSize: '1.4rem', marginTop: '1rem' }}>
          {lang === 'en' 
            ? 'Your order has been sent and we will contact you shortly.' 
            : 'لقد تم إرسال طلبك وسوف نتواصل معك قريباً.'}
        </p>
        <button className="cta-button solid" style={{ marginTop: '3rem' }} onClick={() => navigate('/')}>
          {lang === 'en' ? 'Back to Home' : 'العودة للرئيسية'}
        </button>
      </div>
    );
  }

  return (
    <div className="checkout-page" style={{ paddingTop: '100px' }}>
      <div className="container">
        <div className="checkout-grid">
          <div className="checkout-info">
            <section className="checkout-section">
              <h2><Truck size={24} /> Delivery Information</h2>
              <form id="checkout-form" onSubmit={handleSubmit}>
                <div className="form-group">
                  <label>Shipping Address</label>
                  <textarea 
                    className="form-input" 
                    value={formData.address} 
                    required
                    onChange={(e) => setFormData({...formData, address: e.target.value})}
                  />
                </div>
                <div className="form-group">
                  <label>Phone Number</label>
                  <input 
                    type="text" 
                    className="form-input" 
                    value={formData.phone} 
                    required
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  />
                </div>
              </form>
            </section>

            <section className="checkout-section">
              <h2><CreditCard size={24} /> Payment Method</h2>
              <div className="payment-options">
                <label className={`payment-option ${formData.paymentMethod === 'cod' ? 'active' : ''}`}>
                  <input 
                    type="radio" 
                    name="payment" 
                    value="cod" 
                    checked={formData.paymentMethod === 'cod'}
                    onChange={() => setFormData({...formData, paymentMethod: 'cod'})}
                  />
                  <span>Cash on Delivery</span>
                </label>
                <label className="payment-option disabled">
                  <input type="radio" name="payment" disabled />
                  <span>Credit Card (Soon)</span>
                </label>
              </div>
            </section>
          </div>

          <div className="checkout-summary">
            <div className="summary-card">
              <h3><ShoppingBag size={20} /> Order Summary</h3>
              <div className="summary-items">
                {items.map(item => (
                  <div key={item.id} className="summary-item">
                    <span>{item.name} x {item.quantity}</span>
                    <span>{item.totalPrice} EGP</span>
                  </div>
                ))}
              </div>
              <div className="summary-divider"></div>
              <div className="summary-total">
                <span>Total</span>
                <span className="total-amount">{totalAmount} EGP</span>
              </div>
              <button 
                form="checkout-form" 
                className="cta-button checkout-submit" 
                disabled={loading || items.length === 0}
              >
                {loading ? <Loader2 className="spinner" size={24} /> : 'Complete Order'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
