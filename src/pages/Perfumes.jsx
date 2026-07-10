import React, { useState, useEffect } from "react";
import { useLanguage } from "../context/LanguageContext";
import { GetCategories } from "../api/Category";
import {
  GetAllCategoryProducts,
  GetAllProducts,
  GetPaginatedProducts,
  GetpaginatedCategoryProducts,
  GetTotalProductCount,
  GetCategoryProductCount,
} from "../api/Product";
import { addToCart } from "../redux/cartSlice";
import { useDispatch } from "react-redux";
import {
  Search,
  Loader2,
  Filter,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import {
  getProductId,
  getProductName,
  getProductDesc,
  getProductPrice,
  getProductImage,
} from "../api/productHelpers";
import ProductCard from "../components/ProductCard";

export default function Perfumes() {
  const { t, lang } = useLanguage();
  const dispatch = useDispatch();
  const location = useLocation();
  const [filterCategory, setFilterCategory] = useState(
    location.state?.categoryId || "all",
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  // Pagination State
  const [page, setPage] = useState(1);
  const [pageSize] = useState(9);
  const [totalItems, setTotalItems] = useState(0);
  const [wishlist, setWishlist] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("wishlist") || "[]");
    } catch {
      return [];
    }
  });

  useEffect(() => {
    const update = () => {
      try {
        setWishlist(JSON.parse(localStorage.getItem("wishlist") || "[]"));
      } catch {
        setWishlist([]);
      }
    };
    window.addEventListener("wishlistChanged", update);
    return () => window.removeEventListener("wishlistChanged", update);
  }, []);

  const toggleWishlist = (id) => {
    const updated = wishlist.includes(id)
      ? wishlist.filter((w) => w !== id)
      : [...wishlist, id];
    setWishlist(updated);
    localStorage.setItem("wishlist", JSON.stringify(updated));
    window.dispatchEvent(new Event("wishlistChanged"));
  };

  // Sync category state from router state (e.g. from Home banner View All click)
  useEffect(() => {
    if (location.state?.categoryId) {
      setFilterCategory(location.state.categoryId);
      setPage(1);
    } else if (location.state === null) {
      setFilterCategory("all");
      setPage(1);
    }
  }, [location.state]);

  // Sync search input from top navbar search query (URL params)
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const q = params.get("search") || "";
    setSearchQuery(q);
    setPage(1);
  }, [location.search]);

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
    fetchProducts();
  }, [filterCategory, page, lang, searchQuery]);

  // Scroll to top on page or category change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [filterCategory, page]);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      let allProds = [];
      if (filterCategory === "all") {
        allProds = await GetAllProducts();
      } else {
        allProds = await GetAllCategoryProducts(filterCategory);
      }

      if (!allProds) allProds = [];

      // Filter by search query
      const query = searchQuery ? searchQuery.trim().toLowerCase() : "";
      const filtered = allProds.filter((p) => {
        const name = getProductName(p, lang).toLowerCase();
        const desc = getProductDesc(p, lang).toLowerCase();
        return !query || name.includes(query) || desc.includes(query);
      });

      // Slice for pagination
      const paginated = filtered.slice((page - 1) * pageSize, page * pageSize);

      setProducts(paginated);
      setTotalItems(filtered.length);
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

  const filtered = products; // Already filtered and paginated inside fetchProducts

  return (
    <div
      style={{
        paddingTop: "80px",
        minHeight: "100vh",
        background: "var(--bg-color)",
      }}
    >
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
                <h3
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                  }}
                >
                  <Filter size={18} /> {t.filterAll.split(" ")[1] || "Category"}
                </h3>
                <ul className="filter-list">
                  <li
                    className={filterCategory === "all" ? "active" : ""}
                    onClick={() => handleCategoryChange("all")}
                  >
                    {t.filterAll}
                  </li>
                  {categories.map((cat) => {
                    const cId =
                      cat.categoryId || cat.CategoryId || cat.productCategoryID;
                    const cName =
                      cat.categoryName || cat.CategoryName || cat.name;
                    return (
                      <li
                        key={cId}
                        className={filterCategory === cId ? "active" : ""}
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
                  <div className="pc-catalog-grid">
                    {filtered.length > 0 ? (
                      filtered.map((perfume, i) => {
                        const id = getProductId(perfume, i);
                        const name = getProductName(perfume, lang);
                        const desc = getProductDesc(perfume, lang);
                        const price = getProductPrice(perfume);
                        const img = getProductImage(perfume, i);
                        return (
                          <ProductCard
                            key={id}
                            id={id}
                            name={name}
                            desc={desc}
                            price={price}
                            img={img}
                            isLiked={wishlist.includes(id)}
                            onToggleWishlist={toggleWishlist}
                          />
                        );
                      })
                    ) : (
                      <p
                        style={{
                          textAlign: "center",
                          width: "100%",
                          gridColumn: "1 / -1",
                          padding: "3rem",
                          color: "var(--text-muted)",
                        }}
                      >
                        {t.noMatches}
                      </p>
                    )}
                  </div>

                  {/* Pagination Controls */}
                  {totalPages > 1 && (
                    <div
                      className="pagination"
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        gap: "1rem",
                        marginTop: "4rem",
                      }}
                    >
                      <button
                        className="pagination-btn"
                        disabled={page === 1}
                        onClick={() => setPage((prev) => Math.max(1, prev - 1))}
                        style={{
                          padding: "0.8rem",
                          borderRadius: "50%",
                          background: "var(--bg-alt)",
                          border: "none",
                          color: "var(--text-color)",
                          cursor: page === 1 ? "not-allowed" : "pointer",
                          opacity: page === 1 ? 0.5 : 1,
                        }}
                      >
                        <ChevronLeft size={20} />
                      </button>

                      <div style={{ display: "flex", gap: "0.5rem" }}>
                        {[...Array(totalPages)].map((_, i) => (
                          <button
                            key={i + 1}
                            onClick={() => setPage(i + 1)}
                            style={{
                              width: "40px",
                              height: "40px",
                              borderRadius: "50%",
                              border: "none",
                              background:
                                page === i + 1
                                  ? "var(--primary-color)"
                                  : "var(--bg-alt)",
                              color:
                                page === i + 1 ? "white" : "var(--text-color)",
                              fontWeight: "bold",
                              cursor: "pointer",
                            }}
                          >
                            {i + 1}
                          </button>
                        ))}
                      </div>

                      <button
                        className="pagination-btn"
                        disabled={page === totalPages}
                        onClick={() =>
                          setPage((prev) => Math.min(totalPages, prev + 1))
                        }
                        style={{
                          padding: "0.8rem",
                          borderRadius: "50%",
                          background: "var(--bg-alt)",
                          border: "none",
                          color: "var(--text-color)",
                          cursor:
                            page === totalPages ? "not-allowed" : "pointer",
                          opacity: page === totalPages ? 0.5 : 1,
                        }}
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
