import React, { useEffect, useState } from "react";
import { useLanguage } from "../context/LanguageContext";
import { GetGalleryImages } from "../api/Gallery";
import { getImageUrl } from "../api/productHelpers";
import { Loader2, Image as ImageIcon } from "lucide-react";

const FALLBACK_GALLERY = [
  "/perfume_pink_1776084777940.png",
  "/perfume_obsidian_1776084817495.png",
  "/perfume_crystal_1776084965250.png",
  "/perfume_amber_1776085036492.png",
  "/perfume_gold_1776084751454.png",
];

export default function Gallery() {
  const { t, lang } = useLanguage();
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);

    GetGalleryImages()
      .then((data) => {
        if (data && data.length > 0) {
          const sorted = [...data].sort(
            (a, b) => (a.imageOrder || 0) - (b.imageOrder || 0),
          );
          setImages(sorted.map((img) => getImageUrl(img.imageUrl)));
        } else {
          setImages(FALLBACK_GALLERY);
        }
      })
      .catch((err) => {
        console.error("Failed to load gallery images:", err);
        setImages(FALLBACK_GALLERY);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <div
      className="gallery-page-redesigned-wrapper"
      style={{
        paddingTop: "140px",
        minHeight: "100vh",
        background: "var(--bg-color)",
      }}
    >
      <div className="container">
        {/* Page Title */}
        <div
          className="gallery-header animate-view reveal active"
          style={{ marginBottom: "3rem" }}
        >
          <div style={{ display: "flex", gap: "0.8rem", alignItems: "center" }}>
            <ImageIcon size={28} style={{ color: "var(--primary-color)" }} />
            <div>
              <h1 className="orders-main-title">
                {t.galleryTitle ||
                  (lang === "en" ? "Creations Gallery" : "معرض الإبداعات")}
              </h1>
              <p className="orders-subtitle-txt">
                {t.galleryDesc ||
                  (lang === "en"
                    ? "A luxury visual journey into premium streetwear"
                    : "رحلة بصرية في عالمنا للعطور الفاخرة")}
              </p>
            </div>
          </div>
        </div>

        {/* Content */}
        {loading ? (
          <div className="catalog-loader" style={{ padding: "6rem 0" }}>
            <Loader2 size={40} className="spinner" />
            <p>
              {lang === "en" ? "Loading gallery..." : "جاري تحميل المعرض..."}
            </p>
          </div>
        ) : (
          <div className="streetwear-gallery-grid animate-view reveal active">
            {images.map((src, index) => (
              <div className="gallery-card-item" key={index}>
                <div className="gallery-card-img-wrap">
                  <img
                    src={src}
                    alt={`SAM Creation item ${index + 1}`}
                    loading="lazy"
                  />
                  <div className="gallery-card-overlay-box"></div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
