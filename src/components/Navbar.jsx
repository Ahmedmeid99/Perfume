import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";
import {
  ShoppingBag,
  User,
  LogOut,
  ChevronDown,
  ClipboardList,
  Lock,
  Search,
  Heart,
  Bell,
  MapPin,
} from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/userSlice";

export default function Navbar() {
  const { lang, toggleLanguage, t } = useLanguage();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [wishlistCount, setWishlistCount] = useState(0);

  const cartQuantity = useSelector((state) => state.cart.totalQuantity);
  const { currentUser, isAuthenticated } = useSelector((state) => state.user);

  // Sync search input with URL search param
  const searchParams = new URLSearchParams(location.search);
  const [searchVal, setSearchVal] = useState(searchParams.get("search") || "");

  useEffect(() => {
    setSearchVal(searchParams.get("search") || "");
  }, [location.search]);

  // Load theme
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "light") {
      setIsDarkMode(false);
      document.documentElement.setAttribute("data-theme", "light");
    } else {
      setIsDarkMode(true);
      document.documentElement.setAttribute("data-theme", "dark");
      localStorage.setItem("theme", "dark");
    }
  }, []);

  // Update wishlist count in real time
  useEffect(() => {
    const updateWishlistCount = () => {
      try {
        const stored = JSON.parse(localStorage.getItem("wishlist") || "[]");
        setWishlistCount(stored.length);
      } catch (e) {
        setWishlistCount(0);
      }
    };
    updateWishlistCount();

    // Listen to custom wishlist changes
    window.addEventListener("wishlistChanged", updateWishlistCount);
    // Listen to storage events (for multiple tabs)
    window.addEventListener("storage", updateWishlistCount);

    return () => {
      window.removeEventListener("wishlistChanged", updateWishlistCount);
      window.removeEventListener("storage", updateWishlistCount);
    };
  }, []);

  const toggleTheme = () => {
    setIsDarkMode((prev) => {
      const newMode = !prev;
      document.documentElement.setAttribute(
        "data-theme",
        newMode ? "dark" : "light",
      );
      localStorage.setItem("theme", newMode ? "dark" : "light");
      return newMode;
    });
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const dest =
      location.pathname === "/perfumes" || location.pathname === "/"
        ? location.pathname
        : "/";
    navigate(`${dest}?search=${encodeURIComponent(searchVal)}`);
  };

  const handleSearchInput = (e) => {
    const val = e.target.value;
    setSearchVal(val);
    if (location.pathname === "/" || location.pathname === "/perfumes") {
      navigate(`${location.pathname}?search=${encodeURIComponent(val)}`, {
        replace: true,
      });
    } else {
      navigate(`/?search=${encodeURIComponent(val)}`);
    }
  };

  return (
    <div className="header-wrapper animate-view reveal active">
      {/* Top Announcement Bar */}
      <div className="announcement-bar">
        <div className="announcement-container">
          <div className="announcement-left">
            <span className="announcement-tag">{t.topHot}</span>
            <Link to="/gallery" className="announcement-link">
              {t.navGallery}
            </Link>
          </div>
          <div className="announcement-right">
            <button
              className="theme-toggle-btn"
              onClick={toggleTheme}
              aria-label="Toggle theme"
            >
              {isDarkMode ? "☀️ Light" : "🌙 Dark"}
            </button>
            <span className="announcement-divider">|</span>
            <button className="lang-toggle-btn" onClick={toggleLanguage}>
              {lang === "en" ? "AR" : "EN"}
            </button>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <nav className="navbar-redesigned">
        <div className="navbar-container">
          {/* Logo & Location */}
          <div className="nav-left">
            <Link to="/" className="nav-brand-new">
              {t.brand}
            </Link>
            <div className="location-badge">
              <MapPin size={14} className="location-icon" />
              <span>{t.topLocation}</span>
            </div>
          </div>

          {/* Search Box */}
          <div className="nav-center">
            <form onSubmit={handleSearch} className="nav-search-form">
              <input
                type="text"
                placeholder={t.searchPlaceholder}
                value={searchVal}
                onChange={handleSearchInput}
                className="nav-search-input"
              />
              <button
                type="submit"
                className="nav-search-submit-btn"
                aria-label="Search"
              >
                <Search size={18} />
              </button>
            </form>
          </div>

          {/* Icons & Actions */}
          <div className="nav-right">
            <div className="nav-icons-group">
              {/* Wishlist / Favorites */}
              <Link
                to="/favorites"
                className="nav-icon-link"
                title={lang === "en" ? "My Favorites" : "المفضلة"}
                aria-label="Favorites"
              >
                <Heart
                  size={22}
                  fill={wishlistCount > 0 ? "var(--primary-color)" : "none"}
                  color={
                    wishlistCount > 0 ? "var(--primary-color)" : "currentColor"
                  }
                />
                {wishlistCount > 0 && (
                  <span className="nav-badge-count">{wishlistCount}</span>
                )}
              </Link>

              {/* Notification */}
              {/* <button className="nav-icon-btn-item" aria-label="Notifications">
                <Bell size={22} />
              </button> */}

              {/* Shopping Cart */}
              <Link
                to="/cart"
                className="nav-icon-link"
                aria-label="Shopping Cart"
              >
                <ShoppingBag size={22} />
                {cartQuantity > 0 && (
                  <span className="nav-badge-count">{cartQuantity}</span>
                )}
              </Link>
            </div>

            {/* Profile Dropdown */}
            <div className="user-profile-nav">
              {isAuthenticated ? (
                <div className="user-profile-menu-container">
                  <button
                    className="profile-trigger-btn"
                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                    aria-label="User Menu"
                  >
                    <div className="user-avatar-circle">
                      {(currentUser?.user?.userName ||
                        currentUser?.userName ||
                        "U")[0].toUpperCase()}
                    </div>
                    <span className="profile-username">
                      {
                        (
                          currentUser?.user?.userName ||
                          currentUser?.userName ||
                          ""
                        ).split(" ")[0]
                      }
                    </span>
                    <ChevronDown
                      size={14}
                      className={`profile-chevron ${isUserMenuOpen ? "rotated" : ""}`}
                    />
                  </button>

                  {isUserMenuOpen && (
                    <>
                      <div
                        className="profile-overlay-backdrop"
                        onClick={() => setIsUserMenuOpen(false)}
                      ></div>
                      <div className="profile-dropdown-content animate-dropdown-fade">
                        <div className="profile-dropdown-header">
                          <div className="user-info-avatar">
                            {(currentUser?.user?.userName ||
                              currentUser?.userName ||
                              "U")[0].toUpperCase()}
                          </div>
                          <div className="user-info-details">
                            <h5>
                              {currentUser?.user?.userName ||
                                currentUser?.userName}
                            </h5>
                            <p>
                              {currentUser?.user?.email || currentUser?.email}
                            </p>
                          </div>
                        </div>
                        <div className="profile-divider"></div>
                        <div className="profile-menu-links">
                          <Link
                            to="/my-orders"
                            className="profile-menu-link"
                            onClick={() => setIsUserMenuOpen(false)}
                          >
                            <ClipboardList size={16} />
                            <span>
                              {lang === "en" ? "My Orders" : "طلباتي"}
                            </span>
                          </Link>
                          <Link
                            to="/change-password"
                            className="profile-menu-link"
                            onClick={() => setIsUserMenuOpen(false)}
                          >
                            <Lock size={16} />
                            <span>
                              {lang === "en"
                                ? "Change Password"
                                : "تغيير كلمة المرور"}
                            </span>
                          </Link>
                          <button
                            className="profile-menu-link-btn"
                            onClick={() => {
                              setIsUserMenuOpen(false);
                              dispatch(logout());
                            }}
                          >
                            <LogOut size={16} />
                            <span>
                              {lang === "en" ? "Logout" : "تسجيل الخروج"}
                            </span>
                          </button>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              ) : (
                <Link
                  to="/login"
                  className="login-trigger-btn"
                  aria-label="Login"
                >
                  <User size={22} />
                  <span className="login-btn-text">
                    {lang === "en" ? "Login" : "دخول"}
                  </span>
                </Link>
              )}
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}
