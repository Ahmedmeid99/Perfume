import React from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";

const policyContent = {
  privacy: {
    en: {
      title: "Privacy Policy",
      intro:
        "We respect your privacy and protect your personal information with care.",
      bullets: [
        "We collect only the information needed to create your account and complete your orders.",
        "Your phone number and email are used only for communication, shipping updates, and order support.",
        "We do not share your personal data with third parties except when required to fulfill your order.",
      ],
    },
    ar: {
      title: "سياسة الخصوصية",
      intro: "نحترم خصوصيتك ونحمي معلوماتك الشخصية بعناية.",
      bullets: [
        "نقوم بجمع المعلومات اللازمة فقط لإنشاء الحساب وإتمام الطلبات.",
        "يتم استخدام رقم هاتفك والبريد الإلكتروني فقط للتواصل وتحديثات الشحن ودعم الطلبات.",
        "لا نشارك بياناتك الشخصية مع أطراف ثالثة إلا عند الضرورة لتسليم طلبك.",
      ],
    },
  },
  terms: {
    en: {
      title: "Terms of Service",
      intro:
        "By using our store, you agree to the following terms and conditions.",
      bullets: [
        "You must provide accurate contact details so we can reach you about your order.",
        "Orders are subject to availability and confirmation.",
        "Product prices, specifications, or availability may be updated at any time without prior notice. The price and information shown at the time the order is completed will be the ones used.",
      ],
    },
    ar: {
      title: "شروط الخدمة",
      intro: "باستخدامك لمتجرنا، فإنك توافق على الشروط والأحكام التالية.",
      bullets: [
        "يجب عليك تقديم بيانات اتصال دقيقة حتى نتمكن من التواصل معك بشأن طلبك.",
        "تخضع الطلبات للتوافر والتأكيد.",
        "قد يتم تحديث أسعار المنتجات أو مواصفاتها أو مدى توفرها في أي وقت دون إشعار مسبق. ويُعتمد السعر والمعلومات الظاهرة عند إتمام الطلب.",
      ],
    },
  },
  shipping: {
    en: {
      title: "Shipping Policy",
      intro: "We aim to deliver your order safely and as quickly as possible.",
      bullets: [
        "Shipping times depend on your location and selected delivery method.",
        "You will receive updates by phone or email once your order is processed and shipped.",
        "Please make sure your address and contact details are correct before checkout.",
      ],
    },
    ar: {
      title: "سياسة الشحن",
      intro: "نهدف إلى توصيل طلبك بأمان وبأسرع وقت ممكن.",
      bullets: [
        "تعتمد أوقات الشحن على موقعك وطريقة التوصيل المختارة.",
        "ستتلقى تحديثات عبر الهاتف أو البريد الإلكتروني بمجرد معالجة الطلب والشحن.",
        "يرجى التأكد من صحة عنوانك وتفاصيل الاتصال قبل إرسال الطلب، لأن الدفع يتم عند الاستلام.",
      ],
    },
  },
};

export default function PolicyPage({ type = "privacy" }) {
  const { lang } = useLanguage();
  const content = policyContent[type]?.[lang] || policyContent[type]?.en;

  if (!content) return null;

  return (
    <div
      style={{
        minHeight: "100vh",
        padding: "140px 1.2rem 3rem",
        background: "var(--bg-color)",
        color: "var(--text-light)",
      }}
    >
      <div className="container" style={{ maxWidth: "860px" }}>
        <Link
          to="/"
          style={{
            display: "inline-block",
            marginBottom: "1.2rem",
            color: "var(--primary-color)",
            fontWeight: 600,
          }}
        >
          {lang === "en" ? "← Back to Home" : "← العودة للرئيسية"}
        </Link>

        <div
          style={{
            background: "var(--card-bg, rgba(255,255,255,0.04))",
            border: "1px solid var(--border-color, rgba(255,255,255,0.12))",
            borderRadius: "20px",
            padding: "2rem",
            boxShadow: "0 12px 40px rgba(0,0,0,0.12)",
          }}
        >
          <h1 style={{ marginBottom: "0.75rem", fontSize: "1.8rem" }}>
            {content.title}
          </h1>
          <p
            style={{
              color: "var(--text-muted)",
              lineHeight: 1.8,
              marginBottom: "1rem",
            }}
          >
            {content.intro}
          </p>
          <ul
            style={{
              paddingLeft: lang === "ar" ? "0" : "1.2rem",
              listStyle: "disc",
              lineHeight: 1.8,
            }}
          >
            {content.bullets.map((item, index) => (
              <li
                key={index}
                style={{ marginBottom: "0.7rem", color: "var(--text-light)" }}
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
