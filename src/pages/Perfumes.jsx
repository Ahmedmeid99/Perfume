import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { GetCategories } from '../api/Category';
import { 
  GetAllCategoryProducts, 
  GetAllProducts, 
  GetPaginatedProducts, 
  GetpaginatedCategoryProducts,
  GetTotalProductCount,
  GetCategoryProductCount
} from '../api/Product';
import { addToCart } from '../redux/cartSlice';
import { useDispatch } from 'react-redux';
import { ShoppingCart, Search, Loader2, Filter, ChevronLeft, ChevronRight } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const FALLBACK_IMAGES = [
  '/perfume_gold_1776084751454.png',
  '/perfume_amber_1776085036492.png',
  '/perfume_obsidian_1776084817495.png',
  '/perfume_pink_1776084777940.png'
];

export default function Perfumes() {
  const { t, lang } = useLanguage();
  const dispatch = useDispatch();
  const location = useLocation();
  const [filterCategory, setFilterCategory] = useState(
    location.state?.categoryId || 'all'
  );
  const [searchQuery, setSearchQuery] = useState('');
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Pagination State
  const [page, setPage] = useState(1);
  const [pageSize] = useState(6);
  const [totalItems, setTotalItems] = useState(0);

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const cats = await GetCategories();
        if (cats) setCategories(cats);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchInitialData();
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchProducts();
  }, [filterCategory, page, lang]);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      let prods;
      let count;
      
      if (filterCategory === 'all') {
        // Try paginated first
        prods = await GetPaginatedProducts(page, pageSize);
        
        // If paginated fails (e.g. 404 on remote API), fallback to GetAll and slice
        if (!prods) {
          const allProds = await GetAllProducts();
          if (allProds) {
            count = allProds.length;
            prods = allProds.slice((page - 1) * pageSize, page * pageSize);
          }
        } else {
          count = await GetTotalProductCount();
        }
      } else {
        prods = await GetpaginatedCategoryProducts(filterCategory, page, pageSize);
        
        // Fallback for categories if paginated fails
        if (!prods) {
          const allCatProds = await GetAllCategoryProducts(filterCategory);
          if (allCatProds) {
            count = allCatProds.length;
            prods = allCatProds.slice((page - 1) * pageSize, page * pageSize);
          }
        } else {
          count = await GetCategoryProductCount(filterCategory);
        }
      }
      
      if (prods) setProducts(prods);
      else setProducts([]);
      
      if (count !== undefined) setTotalItems(count);
      else setTotalItems(0);
    } catch (error) {
      console.error("Error fetching perfumes:", error);
      setProducts([]);
      setTotalItems(0);
    } finally {
      setLoading(false);
    }
  };

  const handleCategoryChange = (catId) => {
    setFilterCategory(catId);
    setPage(1); // Reset to first page
  };

  const totalPages = Math.ceil(totalItems / pageSize);

  const filtered = products.filter(p => {
    const name = p.name || p.Name || p.productName || p.ProductName || '';
    const desc = p.description || p.Description || '';
    
    const query = searchQuery ? searchQuery.trim().toLowerCase() : '';
    const matchSearch = !query || 
                        name.toLowerCase().includes(query) || 
                        desc.toLowerCase().includes(query);
                        
    return matchSearch;
  });

  return (
    <div style={{ paddingTop: '80px', minHeight: '100vh', background: 'var(--bg-color)' }}>
      <section className="section perfumes-page">
        <div className="container">
          <div className="section-header animate-view reveal active">
            <h2 className="section-title">{t.navCollection}</h2>
          </div>
          
          <div className="perfumes-layout">
            <aside className="perfumes-sidebar animate-view reveal active">
              <div className="filter-group">
                <div className="search-box">
                  <Search size={18} className="search-icon" />
                  <input 
                    type="text" 
                    className="form-input" 
                    placeholder={t.searchPlaceholder} 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>

              <div className="filter-group">
                <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Filter size={18} /> {t.filterAll.split(' ')[1] || 'Category'}
                </h3>
                <ul className="filter-list">
                  <li 
                    className={filterCategory === 'all' ? 'active' : ''} 
                    onClick={() => handleCategoryChange('all')}
                  >
                    {t.filterAll}
                  </li>
                  {categories.map(cat => {
                    const cId = cat.categoryId || cat.CategoryId || cat.productCategoryID;
                    const cName = cat.categoryName || cat.CategoryName || cat.name;
                    return (
                      <li 
                        key={cId} 
                        className={filterCategory === cId ? 'active' : ''} 
                        onClick={() => handleCategoryChange(cId)}
                      >
                        {cName}
                      </li>
                    );
                  })}
                </ul>
              </div>
            </aside>

            <div className="perfume-grid-container">
              {loading ? (
                <div className="loading-state">
                  <Loader2 className="spinner" size={48} />
                  <p>Loading your collection...</p>
                </div>
              ) : (
                <>
                  <div className="perfume-grid">
                    {filtered.length > 0 ? filtered.map((perfume, i) => {
                      const id = perfume.productID || perfume.ProductID || perfume.productId || perfume.ProductId || i;
                      const name = perfume.name || perfume.Name || perfume.productName || perfume.ProductName;
                      const desc = perfume.description || perfume.Description;
                      const price = perfume.price || perfume.Price || 0;
                      const rawImg = perfume.ImageUrl || perfume.imageUrl || perfume.imagePath || perfume.ImagePath || perfume.imageURL || perfume.ImageURL;
                      const img = rawImg || FALLBACK_IMAGES[i % FALLBACK_IMAGES.length];

                      return (
                        <div className="perfume-card animate-view reveal active" key={id}>
                          <div className="perfume-img-wrapper">
                            <Link to={`/product/${id}`}>
                              <img src={img} alt={name} />
                            </Link>
                            <div className="perfume-overlay">
                              <button 
                                className="add-to-cart-btn"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  dispatch(addToCart({ id, name, price, img }));
                                }}
                              >
                                <ShoppingCart size={20} />
                                <span>Add to Cart</span>
                              </button>
                            </div>
                          </div>
                          <div className="perfume-info">
                            <div className="perfume-header">
                              <Link to={`/product/${id}`}>
                                <h3>{name}</h3>
                              </Link>
                              <span className="perfume-price">{price} EGP</span>
                            </div>
                            <p className="perfume-card-desc">{desc}</p>
                          </div>
                        </div>
                      );
                    }) : (
                      <p style={{ textAlign: 'center', width: '100%', gridColumn: '1 / -1', padding: '3rem', color: 'var(--text-muted)' }}>{t.noMatches}</p>
                    )}
                  </div>

                  {/* Pagination Controls */}
                  {totalPages > 1 && (
                    <div className="pagination" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '1rem', marginTop: '4rem' }}>
                      <button 
                        className="pagination-btn" 
                        disabled={page === 1}
                        onClick={() => setPage(prev => Math.max(1, prev - 1))}
                        style={{ padding: '0.8rem', borderRadius: '50%', background: 'var(--bg-alt)', border: 'none', color: 'var(--text-color)', cursor: page === 1 ? 'not-allowed' : 'pointer', opacity: page === 1 ? 0.5 : 1 }}
                      >
                        <ChevronLeft size={20} />
                      </button>
                      
                      <div style={{ display: 'flex', gap: '0.5rem' }}>
                        {[...Array(totalPages)].map((_, i) => (
                          <button 
                            key={i + 1}
                            onClick={() => setPage(i + 1)}
                            style={{ 
                              width: '40px', 
                              height: '40px', 
                              borderRadius: '50%', 
                              border: 'none', 
                              background: page === i + 1 ? 'var(--primary-color)' : 'var(--bg-alt)',
                              color: page === i + 1 ? 'white' : 'var(--text-color)',
                              fontWeight: 'bold',
                              cursor: 'pointer'
                            }}
                          >
                            {i + 1}
                          </button>
                        ))}
                      </div>

                      <button 
                        className="pagination-btn" 
                        disabled={page === totalPages}
                        onClick={() => setPage(prev => Math.min(totalPages, prev + 1))}
                        style={{ padding: '0.8rem', borderRadius: '50%', background: 'var(--bg-alt)', border: 'none', color: 'var(--text-color)', cursor: page === totalPages ? 'not-allowed' : 'pointer', opacity: page === totalPages ? 0.5 : 1 }}
                      >
                        <ChevronRight size={20} />
                      </button>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
