import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  addToCart,
  removeFromCart,
  deleteItem,
  clearCart,
} from "../redux/cartSlice";
import {
  ShoppingBag,
  Trash2,
  Plus,
  Minus,
  ArrowLeft,
  CreditCard,
  CheckCircle,
  Loader2,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";
import { PlaceOrder } from "../api/Order";

export default function Cart() {
  const { t, lang } = useLanguage();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { items, totalAmount } = useSelector((state) => state.cart);
  const { currentUser, isAuthenticated } = useSelector((state) => state.user);

  const SHIPPING = 0;
  const [loading, setLoading] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleSubmitOrder = async () => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }

    setLoading(true);
    try {
      const orderData = {
        CustomerId:
          currentUser?.user?.userId ||
          currentUser?.user?.UserId ||
          currentUser?.CustomerId ||
          currentUser?.customerID ||
          1,
        OrderDate: new Date().toISOString(),
        TotalAmount: totalAmount + SHIPPING,
        StatusID: 1, // Pending
        Items: items.map((item) => ({
          ProductId: item.id,
          Quantity: item.quantity,
          UnitPrice: item.price,
        })),
      };

      const result = await PlaceOrder(orderData);
      if (result) {
        setOrderPlaced(true);
        dispatch(clearCart());
      }
    } catch (error) {
      console.error("Order failed:", error);
      alert(
        lang === "en"
          ? "Something went wrong. Please try again."
          : "حدث خطأ ما. يرجى المحاولة مرة أخرى.",
      );
    } finally {
      setLoading(false);
    }
  };

  if (orderPlaced) {
    return (
      <div
        style={{
          paddingTop: "150px",
          minHeight: "100vh",
          background: "var(--bg-color)",
          textAlign: "center",
        }}
      >
        <div className="container">
          <div className="checkout-success animate-view reveal active">
            <CheckCircle
              size={80}
              className="success-icon"
              style={{ color: "#4BB543", marginBottom: "2rem" }}
            />
            <h1 className="section-title" style={{ fontSize: "3rem" }}>
              {lang === "en" ? "Order Sent!" : "تم إرسال الطلب!"}
            </h1>
            <p
              style={{
                fontSize: "1.4rem",
                marginTop: "1rem",
                color: "var(--text-muted)",
              }}
            >
              {lang === "en"
                ? "Your order has been sent and we will contact you shortly."
                : "لقد تم إرسال طلبك وسوف نتواصل معك قريباً."}
            </p>
            <button
              className="cta-button solid"
              style={{ marginTop: "3rem" }}
              onClick={() => navigate("/")}
            >
              {lang === "en" ? "Back to Home" : "العودة للرئيسية"}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      style={{
        paddingTop: "120px",
        minHeight: "100vh",
        background: "var(--bg-color)",
        marginBottom: "3rem",
      }}
    >
      <div className="container">
        <div className="cart-header animate-view reveal active">
          <button
            className="back-btn"
            onClick={() => navigate(-1)}
            style={{
              marginBottom: "1.5rem",
              background: "none",
              border: "none",
              color: "var(--text-muted)",
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              cursor: "pointer",
              marginTop: "1rem",
            }}
          >
            <ArrowLeft size={20} />{" "}
            {lang === "en" ? "Continue Shopping" : "متابعة التسوق"}
          </button>
          <h1 className="section-title">
            {lang === "en" ? "Your Shopping Bag" : "حقيبة التسوق"}
          </h1>
        </div>

        {items.length === 0 ? (
          <div
            className="empty-cart animate-view reveal active"
            style={{ textAlign: "center", padding: "5rem 0" }}
          >
            <ShoppingBag
              size={80}
              style={{ color: "var(--text-muted)", marginBottom: "1.5rem" }}
            />
            <h2>{lang === "en" ? "Your bag is empty" : "حقيبتك فارغة"}</h2>
            <p style={{ color: "var(--text-muted)", marginBottom: "2rem" }}>
              {lang === "en"
                ? "Looks like you haven't added any fragrances yet."
                : "يبدو أنك لم تضف أي عطور بعد."}
            </p>
            <Link to="/perfumes" className="cta-button solid">
              {lang === "en" ? "Explore Collection" : "استكشف المجموعة"}
            </Link>
          </div>
        ) : (
          <div
            className="cart-content"
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 350px",
              gap: "3rem",
              marginTop: "2rem",
            }}
          >
            <div className="cart-items-list">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="cart-item-card animate-view reveal active"
                  style={{
                    display: "flex",
                    gap: "1.5rem",
                    padding: "1.5rem",
                    background: "var(--bg-alt)",
                    borderRadius: "15px",
                    marginBottom: "1rem",
                    alignItems: "center",
                  }}
                >
                  <img
                    src={item.img}
                    alt={item.name}
                    style={{
                      width: "100px",
                      height: "100px",
                      objectFit: "cover",
                      borderRadius: "10px",
                    }}
                  />
                  <div style={{ flexGrow: 1 }}>
                    <h3 style={{ marginBottom: "0.5rem" }}>{item.name}</h3>
                    <p
                      style={{
                        color: "var(--primary-color)",
                        fontWeight: "bold",
                      }}
                    >
                      {item.price} EGP
                    </p>
                  </div>

                  <div
                    className="quantity-controls"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "1rem",
                      background: "var(--bg-color)",
                      padding: "0.5rem 1rem",
                      borderRadius: "30px",
                    }}
                  >
                    <button
                      onClick={() => dispatch(removeFromCart(item.id))}
                      style={{
                        background: "none",
                        border: "none",
                        color: "var(--text-color)",
                        cursor: "pointer",
                      }}
                    >
                      <Minus size={18} />
                    </button>
                    <span
                      style={{
                        fontWeight: "bold",
                        minWidth: "20px",
                        textAlign: "center",
                      }}
                    >
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => dispatch(addToCart(item))}
                      style={{
                        background: "none",
                        border: "none",
                        color: "var(--text-color)",
                        cursor: "pointer",
                      }}
                    >
                      <Plus size={18} />
                    </button>
                  </div>

                  <div style={{ textAlign: "right", minWidth: "100px" }}>
                    <p style={{ fontWeight: "bold", fontSize: "1.1rem" }}>
                      {item.totalPrice} EGP
                    </p>
                    <button
                      onClick={() => dispatch(deleteItem(item.id))}
                      style={{
                        background: "none",
                        border: "none",
                        color: "#ff4444",
                        cursor: "pointer",
                        marginTop: "0.5rem",
                      }}
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              ))}

              <button
                onClick={() => dispatch(clearCart())}
                style={{
                  background: "none",
                  border: "none",
                  color: "var(--text-muted)",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  marginTop: "1rem",
                }}
              >
                <Trash2 size={16} />{" "}
                {lang === "en" ? "Clear Bag" : "مسح الحقيبة"}
              </button>
            </div>

            <aside
              className="cart-summary animate-view reveal active"
              style={{
                background: "var(--bg-alt)",
                padding: "2rem",
                borderRadius: "20px",
                height: "fit-content",
                position: "sticky",
                top: "120px",
              }}
            >
              <h2
                style={{
                  marginBottom: "1.5rem",
                  borderBottom: "1px solid var(--border-color)",
                  paddingBottom: "1rem",
                }}
              >
                {lang === "en" ? "Summary" : "الملخص"}
              </h2>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  fontWeight: "bold",
                  fontSize: "1.2rem",
                  marginBottom: "1.5rem",
                }}
              >
                <span>{lang === "en" ? "Total" : "الإجمالي"}</span>
                <span style={{ color: "var(--primary-color)" }}>
                  {totalAmount} EGP
                </span>
              </div>

              <div
                style={{
                  background: "rgba(212, 175, 55, 0.05)",
                  border: "1px dashed rgba(212, 175, 55, 0.3)",
                  borderRadius: "10px",
                  padding: "1rem",
                  margin: "1.5rem 0",
                  fontSize: "0.85rem",
                  lineHeight: "1.5",
                  color: "var(--text-color)",
                  textAlign: lang === "ar" ? "right" : "left",
                }}
              >
                <p style={{ margin: 0 }}>
                  💡{" "}
                  {lang === "en"
                    ? "We use cash on delivery, and to confirm the seriousness of the order, you will need to pay 10% of the order value in advance."
                    : "نحن نستخدم الدفع عند الاستلام، ولتأكيد جدية الطلب، ستحتاج إلى دفع 10٪ من قيمة الطلب مقدماً."}
                </p>
              </div>

              <button
                className="cta-button solid"
                onClick={handleSubmitOrder}
                disabled={loading}
                style={{
                  width: "100%",
                  padding: "1.2rem",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: "0.8rem",
                }}
              >
                {loading ? (
                  <Loader2 className="spinner" size={20} />
                ) : (
                  <CreditCard size={20} />
                )}
                {lang === "en" ? "Submit Order" : "إرسال الطلب"}
              </button>

              {!isAuthenticated && (
                <p
                  style={{
                    fontSize: "0.8rem",
                    color: "var(--primary-color)",
                    marginTop: "1rem",
                    textAlign: "center",
                  }}
                >
                  {lang === "en"
                    ? "* Please login to submit your order"
                    : "* يرجى تسجيل الدخول لإرسال طلبك"}
                </p>
              )}
            </aside>
          </div>
        )}
      </div>
    </div>
  );
}
