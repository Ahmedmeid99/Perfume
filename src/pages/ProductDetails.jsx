import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { GetProduct, GetRelatedCategoryProducts } from '../api/Product';
import { addToCart } from '../redux/cartSlice';
import { useDispatch } from 'react-redux';
import { ShoppingCart, ArrowLeft, Loader2, Star, ShieldCheck, Truck } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { getProductId, getProductName, getProductDesc, getProductPrice, getProductImage, getAllProductImages, getCategoryId } from '../api/productHelpers';

export default function ProductDetails() {
  const { id } = useParams();
  const { t, lang } = useLanguage();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

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
          const relatedData = await GetRelatedCategoryProducts(catId, parseInt(id), 4);
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

  const pId = getProductId(product, id);
  const pName = getProductName(product, lang);
  const pDesc = getProductDesc(product, lang);
  const pPrice = getProductPrice(product);
  const allImages = getAllProductImages(product);
  const pImg = allImages[selectedImageIndex] || allImages[0];
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
            {allImages.length > 1 && (
              <div className="product-thumbnails" style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem', justifyContent: 'center' }}>
                {allImages.map((imgUrl, i) => (
                  <div 
                    key={i}
                    onClick={() => setSelectedImageIndex(i)}
                    style={{ 
                      width: '60px', height: '60px', borderRadius: '8px', overflow: 'hidden', cursor: 'pointer',
                      border: selectedImageIndex === i ? '2px solid var(--primary-color)' : '2px solid transparent',
                      opacity: selectedImageIndex === i ? 1 : 0.6,
                      transition: 'all 0.3s ease'
                    }}
                  >
                    <img src={imgUrl} alt={`${pName} ${i + 1}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="product-info-detailed">
            <span className="category-tag">{cName}</span>
            <h1>{pName}</h1>
            <div className="product-rating">
              <div className="stars">
                {[...Array(5)].map((_, i) => <Star key={i} size={16} fill={i < 4 ? "var(--primary-color)" : "none"} stroke="var(--primary-color)" />)}
              </div>
              {product.likesCount > 0 && <span>({product.likesCount || 0} Likes)</span>}
            </div>
            
            <p className="product-price-large">{pPrice} EGP</p>
            <p className="product-description-detailed">{pDesc}</p>

            {product.quantityInStock !== undefined && (
              <p style={{ color: product.quantityInStock > 0 ? '#4BB543' : '#ff4444', fontSize: '0.9rem', marginTop: '0.5rem' }}>
                {product.quantityInStock > 0 ? `✓ In Stock (${product.quantityInStock} available)` : '✗ Out of Stock'}
              </p>
            )}

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
              {related.map((item, i) => {
                const rId = getProductId(item);
                const rName = getProductName(item, lang);
                const rPrice = getProductPrice(item);
                const rImg = getProductImage(item, i);
                
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

