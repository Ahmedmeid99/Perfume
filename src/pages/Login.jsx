import React, { useState } from "react";
import { Mail, Lock, User, Phone, MapPin, Loader2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { loginStart, loginSuccess, loginFailure } from "../redux/userSlice";
import { LoginCustomer, SignUpCustomer } from "../api/Customer";
import { useLanguage } from "../context/LanguageContext";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const { lang } = useLanguage();
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector((state) => state.user);

  // If already authenticated, redirect home
  React.useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  const [formData, setFormData] = useState({
    identifier: "",
    email: "",
    password: "",
    userName: "",
    phone: "",
    address: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      if (isLogin) {
        dispatch(loginStart());
        const data = await LoginCustomer({
          UserName: formData.identifier,
          Password: formData.password,
        });
        if (data) {
          dispatch(loginSuccess(data));
          navigate(-1); // Go back
        } else {
          setError(
            lang === "en" ? "Invalid credentials" : "بيانات الدخول غير صحيحة",
          );
          dispatch(loginFailure("Invalid credentials"));
        }
      } else {
        const data = await SignUpCustomer({
          Email: formData.email,
          Password: formData.password,
          UserName: formData.userName,
          Phone: formData.phone,
          Address: formData.address,
          Gendor: "unisex",
          DateOfBirth: new Date().toISOString(),
          CountryID: 1,
        });
        if (data) {
          setIsLogin(true);
          setError(
            lang === "en"
              ? "Account created! Please login."
              : "تم إنشاء الحساب بنجاح! يرجى تسجيل الدخول.",
          );
        }
      }
    } catch (err) {
      setError(
        err.response?.data?.message ||
          (lang === "en" ? "Something went wrong" : "حدث خطأ ما"),
      );
      if (isLogin) dispatch(loginFailure(err.message));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="auth-page-container"
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "var(--bg-color)",
        padding: "2rem",
        paddingTop: "120px",
      }}
    >
      <div className="streetwear-auth-card animate-view reveal active">
        <div className="auth-card-header">
          <h2>
            {isLogin
              ? lang === "en"
                ? "Welcome Back"
                : "مرحباً بك"
              : lang === "en"
                ? "Create Account"
                : "إنشاء حساب"}
          </h2>
          <p>
            {isLogin
              ? lang === "en"
                ? "Login to access your exclusive profile"
                : "سجل الدخول للوصول إلى حسابك الحصري"
              : lang === "en"
                ? "Join the SAM luxury circle"
                : "انضم إلى مجتمع عطور سام الفاخر"}
          </p>
        </div>
        <p
          style={{
            fontSize: "0.75rem",
            color: "var(--text-muted)",
            margin: "-0.25rem 0 1rem",
            lineHeight: 1.4,
          }}
        >
          {lang === "en"
            ? "Use your own phone and email for contact and delivery."
            : "استخدم رقم هاتفك والبريد الإلكتروني الخاصين للتواصل والتوصيل."}
        </p>

        {error && <div className="auth-error-banner">{error}</div>}

        <form className="streetwear-auth-form" onSubmit={handleSubmit}>
          {isLogin ? (
            <div className="streetwear-form-group">
              <label>
                <Mail size={16} />
                <span>{lang === "en" ? "Email" : "البريد الإلكتروني"}</span>
              </label>
              <input
                type="text"
                name="identifier"
                className="streetwear-form-input"
                placeholder={
                  lang === "en" ? "email@example.com" : "البريد الإلكتروني"
                }
                required
                onChange={handleChange}
                value={formData.identifier}
              />
            </div>
          ) : (
            <>
              <div className="streetwear-form-group">
                <label>
                  <User size={16} />
                  <span>{lang === "en" ? "Username" : "اسم المستخدم"}</span>
                </label>
                <input
                  type="text"
                  name="userName"
                  className="streetwear-form-input"
                  placeholder={
                    lang === "en" ? "Choose a username" : "اختر اسم مستخدم"
                  }
                  required
                  onChange={handleChange}
                  value={formData.userName}
                />
              </div>
              <div className="streetwear-form-group">
                <label>
                  <Mail size={16} />
                  <span>
                    {lang === "en" ? "Email Address" : "البريد الإلكتروني"}
                  </span>
                </label>
                <input
                  type="email"
                  name="email"
                  className="streetwear-form-input"
                  placeholder="email@example.com"
                  required
                  onChange={handleChange}
                  value={formData.email}
                />
              </div>
            </>
          )}

          <div className="streetwear-form-group">
            <label>
              <Lock size={16} />
              <span>{lang === "en" ? "Password" : "كلمة المرور"}</span>
            </label>
            <input
              type="password"
              name="password"
              className="streetwear-form-input"
              placeholder="••••••••"
              required
              onChange={handleChange}
              value={formData.password}
            />
          </div>

          {!isLogin && (
            <>
              <div className="streetwear-form-group">
                <label>
                  <Phone size={16} />
                  <span>{lang === "en" ? "Phone Number" : "رقم الهاتف"}</span>
                </label>
                <input
                  type="text"
                  name="phone"
                  className="streetwear-form-input"
                  placeholder="+20..."
                  required
                  onChange={handleChange}
                  value={formData.phone}
                />
              </div>
              <div className="streetwear-form-group">
                <label>
                  <MapPin size={16} />
                  <span>
                    {lang === "en" ? "Shipping Address" : "عنوان الشحن"}
                  </span>
                </label>
                <input
                  type="text"
                  name="address"
                  className="streetwear-form-input"
                  placeholder={
                    lang === "en" ? "Street, City" : "الشارع، المدينة"
                  }
                  onChange={handleChange}
                  value={formData.address}
                />
              </div>
            </>
          )}

          <button
            className="cta-button-redesigned auth-submit-btn"
            disabled={loading}
          >
            {loading ? (
              <Loader2 className="spinner" size={20} />
            ) : isLogin ? (
              lang === "en" ? (
                "Login"
              ) : (
                "دخول"
              )
            ) : lang === "en" ? (
              "Sign Up"
            ) : (
              "تسجيل"
            )}
          </button>
        </form>

        <div className="auth-card-footer">
          <p>
            {isLogin
              ? lang === "en"
                ? "Don't have an account?"
                : "ليس لديك حساب؟"
              : lang === "en"
                ? "Already have an account?"
                : "لديك حساب بالفعل؟"}{" "}
            <button
              className="auth-toggle-link-btn"
              onClick={() => setIsLogin(!isLogin)}
            >
              {isLogin
                ? lang === "en"
                  ? "Create one"
                  : "أنشئ حساباً"
                : lang === "en"
                  ? "Login instead"
                  : "سجل الدخول"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
