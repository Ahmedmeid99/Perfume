import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { GetProduct, GetRelatedCategoryProducts } from '../api/Product';
import { addToCart } from '../redux/cartSlice';
import { useDispatch } from 'react-redux';
import { ShoppingCart, ArrowLeft, Loader2, Star, ShieldCheck, Truck } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function ProductDetails() {
  const { id } = useParams();
  const { t } = useLanguage();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchProductData = async () => {
      setLoading(true);
      try {
        const data = await GetProduct(id);
        if (data) {
          setProduct(data);
          const catId = data.CategoryId || data.categoryId || data.productCategoryID;
          const relatedData = await GetRelatedCategoryProducts(catId, id, 4);
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
      <div className="loading-state" style={{ minHeight: '100vh' }}>
        <Loader2 className="spinner" size={60} />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="error-state" style={{ minHeight: '100vh', paddingTop: '150px', textAlign: 'center' }}>
        <h2>Product not found</h2>
        <button className="cta-button" onClick={() => navigate('/perfumes')}>Back to Collection</button>
      </div>
    );
  }

  const pId = product.ProductId || product.productId || product.productID || id;
  const pName = product.name || product.Name || product.productName || product.ProductName;
  const pDesc = product.description || product.Description;
  const pPrice = product.price || product.Price;
  const pImgRaw = product.ImageUrl || product.imageUrl || product.imagePath || product.ImagePath || product.imageURL || product.ImageURL;
  const pImg = pImgRaw || '/perfume_gold_1776084751454.png';
  const cName = product.categoryName || product.CategoryName || 'Fragrance';

  return (
    <div className="product-details-page" style={{ paddingTop: '120px' }}>
      <div className="container">
        <button className="back-btn" onClick={() => navigate(-1)}>
          <ArrowLeft size={20} /> Back
        </button>

        <div className="product-main animate-view reveal active">
          <div className="product-gallery">
            <div className="main-img-wrapper">
              <img src={pImg} alt={pName} />
            </div>
          </div>

          <div className="product-info-detailed">
            <span className="category-tag">{cName}</span>
            <h1>{pName}</h1>
            <div className="product-rating">
              <div className="stars">
                {[...Array(5)].map((_, i) => <Star key={i} size={16} fill={i < 4 ? "var(--primary-color)" : "none"} stroke="var(--primary-color)" />)}
              </div>
              <span>(12 Reviews)</span>
            </div>
            
            <p className="product-price-large">{pPrice} EGP</p>
            <p className="product-description-detailed">{pDesc}</p>

            <div className="product-features">
              <div className="feature">
                <ShieldCheck size={20} />
                <span>100% Authentic</span>
              </div>
              <div className="feature">
                <Truck size={20} />
                <span>Fast Delivery</span>
              </div>
            </div>

            <button 
              className="cta-button add-to-cart-large"
              onClick={() => dispatch(addToCart({ id: pId, name: pName, price: pPrice, img: pImg }))}
            >
              <ShoppingCart size={24} />
              Add to Shopping Bag
            </button>
          </div>
        </div>

        {related.length > 0 && (
          <section className="related-products" style={{ marginTop: '5rem' }}>
            <h2 className="section-title">You May Also Like</h2>
            <div className="perfume-grid">
              {related.map((item) => {
                const rId = item.ProductId || item.productId || item.productID;
                const rName = item.name || item.Name || item.productName || item.ProductName;
                const rPrice = item.price || item.Price;
                const rImgRaw = item.ImageUrl || item.imageUrl || item.imagePath || item.ImagePath || item.imageURL || item.ImageURL;
                const rImg = rImgRaw || '/perfume_gold_1776084751454.png';
                
                return (
                  <div 
                    key={rId} 
                    className="perfume-card"
                    onClick={() => navigate(`/product/${rId}`)}
                    style={{ cursor: 'pointer' }}
                  >
                    <div className="perfume-img-wrapper">
                      <img src={rImg} alt={rName} />
                    </div>
                    <div className="perfume-info">
                      <h3>{rName}</h3>
                      <p>{rPrice} EGP</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
