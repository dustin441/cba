"use client";

import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./Gallery.module.css";

const CATEGORIES = [
  { id: "all", label: "All Work" },
  { id: "rv", label: "RVs" },
  { id: "tesla", label: "Teslas" },
  { id: "luxury", label: "Luxury & Exotic" },
  { id: "classics", label: "Classics" },
  { id: "heavy-machinery", label: "Heavy Machinery" },
  { id: "standard", label: "Cars & Trucks" },
];

const GALLERY_IMAGES = [
  // Domestic / Standard
  { src: "/assets/photos/PXL_20260309_183756857.jpg", alt: "Domestic vehicle windshield replacement", category: "standard" },
  { src: "/assets/photos/PXL_20260309_190031810.jpg", alt: "Domestic auto glass service", category: "standard" },
  { src: "/assets/photos/PXL_20260406_180917743.jpg", alt: "Windshield replacement on domestic vehicle", category: "standard" },
  { src: "/assets/photos/PXL_20260318_212752861.jpg", alt: "Auto glass install", category: "standard" },
  { src: "/assets/photos/PXL_20260113_005958782.jpg", alt: "CBA Glass shop", category: "standard" },
  { src: "/assets/photos/e7a3ad69-49b9-4b5c-a495-29dc0893d2f9.jpg", alt: "CBA Glass team at work", category: "standard" },
  { src: "/assets/photos/IMG_20260114_001547.jpg", alt: "CBA Glass mobile service", category: "standard" },
  { src: "/assets/photos/new-PXL_20251104_184525178.jpg", alt: "Classic vehicle auto glass project", category: "classics" },
  { src: "/assets/photos/new-PXL_20260422_194221717.jpg", alt: "Classic vehicle auto glass project", category: "classics" },
  { src: "/assets/photos/new-PXL_20251104_195057232-mp.jpg", alt: "Classic vehicle auto glass project", category: "classics" },
  { src: "/assets/photos/new-IMG_9088.jpg", alt: "Classic vehicle auto glass project", category: "classics" },
  { src: "/assets/photos/new-IMG_9095.jpg", alt: "Classic vehicle auto glass project", category: "classics" },
  { src: "/assets/photos/new-PXL_20260422_220036157.jpg", alt: "CBA Glass recent windshield and auto glass project", category: "standard" },
  { src: "/assets/photos/new-PXL_20251104_201442371.jpg", alt: "Classic vehicle auto glass project", category: "classics" },
  { src: "/assets/photos/new-IMG_9098.jpg", alt: "Classic vehicle auto glass project", category: "classics" },
  { src: "/assets/photos/new-IMG_8999.jpg", alt: "Classic vehicle auto glass project", category: "classics" },
  { src: "/assets/photos/email-gallery-IMG_9087.jpg", alt: "Classic vehicle auto glass project", category: "classics" },
  { src: "/assets/photos/email-gallery-IMG_9020.jpg", alt: "Classic vehicle auto glass project", category: "classics" },
  { src: "/assets/photos/email-gallery-IMG_9019.jpg", alt: "Classic vehicle auto glass project", category: "classics" },
  { src: "/assets/photos/email-gallery-IMG_9017.jpg", alt: "Classic vehicle auto glass project", category: "classics" },
  { src: "/assets/photos/email-gallery-IMG_8998.jpg", alt: "Classic vehicle auto glass project", category: "classics" },
  { src: "/assets/photos/email-gallery-IMG_8996.jpg", alt: "Classic vehicle auto glass project", category: "classics" },
  { src: "/assets/photos/email-gallery-IMG_8994.jpg", alt: "Classic vehicle auto glass project", category: "classics" },
  { src: "/assets/photos/email-gallery-20250415_160455.jpg", alt: "Classic vehicle auto glass project", category: "classics" },
  { src: "/assets/photos/email-gallery-20250415_160450.jpg", alt: "Classic vehicle auto glass project", category: "classics" },
  { src: "/assets/photos/email-gallery-20250415_160428.jpg", alt: "CBA Glass recent windshield and auto glass project", category: "standard" },
  { src: "/assets/photos/email-gallery-20250415_154655.jpg", alt: "Classic vehicle auto glass project", category: "classics" },
  { src: "/assets/photos/email-gallery-20250415_154541.jpg", alt: "Classic vehicle auto glass project", category: "classics" },
  { src: "/assets/photos/email-gallery-20250415_154514.jpg", alt: "Classic vehicle auto glass project", category: "classics" },
  { src: "/assets/photos/email-gallery-20250415_110713.jpg", alt: "Classic vehicle auto glass project", category: "classics" },
  { src: "/assets/photos/email-gallery-20250415_110104.jpg", alt: "Classic vehicle auto glass project", category: "classics" },
  { src: "/assets/photos/email-gallery-20250415_110050.jpg", alt: "Classic vehicle auto glass project", category: "classics" },
  { src: "/assets/photos/email-gallery-20250415_110047.jpg", alt: "Classic vehicle auto glass project", category: "classics" },
  { src: "/assets/photos/email-gallery-20250415_110042.jpg", alt: "Classic vehicle auto glass project", category: "classics" },
  { src: "/assets/photos/gmail-recent-pxl_20250923_185802835.jpg", alt: "Classic vehicle auto glass project", category: "classics" },
  { src: "/assets/photos/gmail-recent-pxl_20251031_141815895.jpg", alt: "Heavy equipment glass project", category: "heavy-machinery" },
  { src: "/assets/photos/gmail-recent-fb_img_1747355460039.jpg", alt: "RV windshield replacement project", category: "rv" },
  { src: "/assets/photos/gmail-recent-pxl_20251031_142321187.jpg", alt: "Heavy equipment glass project", category: "heavy-machinery" },
  { src: "/assets/photos/gmail-recent-pxl_20251031_144922497.jpg", alt: "Heavy equipment glass project", category: "heavy-machinery" },
  { src: "/assets/photos/gmail-recent-img_20250920_084021.jpg", alt: "Heavy equipment glass project", category: "heavy-machinery" },
  { src: "/assets/photos/gmail-recent-pxl_20251031_141818252.jpg", alt: "Heavy equipment glass project", category: "heavy-machinery" },
  { src: "/assets/photos/gmail-recent-pxl_20251020_185711682-mp.jpg", alt: "CBA Glass recent windshield and auto glass project", category: "standard" },
  
  // Classics
  { src: "/assets/photos/PXL_20260331_194816565.jpg", alt: "Classic car glass restoration", category: "classics" },
  { src: "/assets/photos/PXL_20260311_162846316.jpg", alt: "Vintage windshield replacement", category: "classics" },
  { src: "/assets/photos/PXL_20260401_022849437.jpg", alt: "Classic auto glass work", category: "classics" },
  { src: "/assets/photos/classics-v2-1.jpg", alt: "Classic car windshield replacement", category: "classics" },
  { src: "/assets/photos/classics-v2-3.jpg", alt: "Vintage auto glass service", category: "classics" },
  { src: "/assets/photos/classics-v2-5.jpg", alt: "Classic vehicle glass restoration", category: "classics" },
  
  // Exotic / Luxury
  { src: "/assets/photos/luxury-v2-3.jpg", alt: "Bentley windshield replacement", category: "luxury" },
  { src: "/assets/photos/PXL_20260403_181717698.jpg", alt: "Ferrari windshield replacement", category: "luxury" },
  { src: "/assets/photos/PXL_20260403_181712830.jpg", alt: "Ferrari glass service", category: "luxury" },
  { src: "/assets/photos/PXL_20260403_182550425.jpg", alt: "High-end auto glass install", category: "luxury" },
  
  // Heavy Equipment
  { src: "/assets/photos/20240426_173417.jpg", alt: "CAT loader windshield replacement", category: "heavy-machinery" },
  { src: "/assets/photos/IMG_4933.jpg", alt: "Heavy equipment glass service", category: "heavy-machinery" },
  { src: "/assets/photos/PXL_20260210_232732642.jpg", alt: "Construction equipment windshield", category: "heavy-machinery" },
  { src: "/assets/photos/20211014_171350.jpg", alt: "Heavy machinery glass replacement", category: "heavy-machinery" },
  { src: "/assets/photos/gmail-heavy-1000042061.jpg", alt: "CBA Glass heavy equipment glass project", category: "heavy-machinery" },
  { src: "/assets/photos/gmail-heavy-1000042057.jpg", alt: "CBA Glass heavy equipment glass project", category: "heavy-machinery" },
  { src: "/assets/photos/gmail-heavy-1000042058.jpg", alt: "CBA Glass heavy equipment glass project", category: "heavy-machinery" },
  { src: "/assets/photos/gmail-heavy-1000042060.jpg", alt: "CBA Glass heavy equipment glass project", category: "heavy-machinery" },
  
  // RV
  { src: "/assets/photos/rv-windshield.jpg", alt: "RAM ProMaster windshield replacement", category: "rv" },
  { src: "/assets/photos/PXL_20260410_172801047.jpg", alt: "RV windshield installation", category: "rv" },
  { src: "/assets/photos/PXL_20260127_182154599.jpg", alt: "RV glass repair", category: "rv" },
  { src: "/assets/photos/PXL_20251229_195953195.jpg", alt: "RV windshield completed", category: "rv" },
  { src: "/assets/photos/rv-new-2.jpg", alt: "RV glass repair completed", category: "rv" },
  
  // Tesla
  { src: "/assets/photos/PXL_20260218_175954265.jpg", alt: "Tesla windshield replacement", category: "tesla" },
  { src: "/assets/photos/PXL_20260218_181243489.jpg", alt: "Tesla glass service", category: "tesla" },
  { src: "/assets/photos/PXL_20260324_193112268.MP.jpg", alt: "Tesla auto glass install", category: "tesla" },
];

export default function Gallery() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (lightboxIndex !== null) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [lightboxIndex]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return;
      if (e.key === "Escape") setLightboxIndex(null);
      if (e.key === "ArrowRight")
        setLightboxIndex((prev) =>
          prev !== null ? (prev + 1) % GALLERY_IMAGES.length : null
        );
      if (e.key === "ArrowLeft")
        setLightboxIndex((prev) =>
          prev !== null
            ? (prev - 1 + GALLERY_IMAGES.length) % GALLERY_IMAGES.length
            : null
        );
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [lightboxIndex]);

  const filteredImages = activeCategory === "all"
    ? GALLERY_IMAGES
    : GALLERY_IMAGES.filter((img) => img.category === activeCategory);

  return (
    <section
      className="section-padding"
      id="gallery"
      ref={sectionRef}
    >
      <div className="container">
        <div className={styles.header}>
          <div className="section-label">Our Work</div>
          <h2 className="section-title">
            <span className="text-gradient">Precision</span> in Every Install
          </h2>
          <p className="section-description">
            From luxury exotics to heavy construction equipment — see the quality
            and craftsmanship that sets CBA Glass apart.
          </p>
        </div>

        {/* Filter Navigation */}
        <div className={styles.filterBar}>
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              className={`${styles.filterBtn} ${
                activeCategory === cat.id ? styles.filterBtnActive : ""
              }`}
              onClick={() => setActiveCategory(cat.id)}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Grid Wrapper */}
        <motion.div 
          layout 
          className={`${styles.grid} ${visible ? styles.gridVisible : ""}`}
        >
          <AnimatePresence mode="popLayout">
            {filteredImages.map((img) => {
              const originalIndex = GALLERY_IMAGES.findIndex((item) => item.src === img.src);
              return (
                <motion.button
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  key={img.src}
                  className={styles.tile}
                  onClick={() => setLightboxIndex(originalIndex)}
                  aria-label={`View ${img.alt}`}
                  id={`gallery-image-${originalIndex}`}
                >
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    style={{ objectFit: "cover" }}
                    className={styles.tileImage}
                  />
                  <div className={styles.tileOverlay}>
                    <span className={styles.tileZoom}>View</span>
                  </div>
                </motion.button>
              );
            })}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <div
          className={styles.lightbox}
          onClick={() => setLightboxIndex(null)}
        >
          <button
            className={styles.lightboxClose}
            onClick={() => setLightboxIndex(null)}
            aria-label="Close lightbox"
          >
            <X size={28} />
          </button>

          <button
            className={`${styles.lightboxNav} ${styles.lightboxPrev}`}
            onClick={(e) => {
              e.stopPropagation();
              setLightboxIndex(
                (lightboxIndex - 1 + GALLERY_IMAGES.length) %
                  GALLERY_IMAGES.length
              );
            }}
            aria-label="Previous image"
          >
            <ChevronLeft size={32} />
          </button>

          <div
            className={styles.lightboxImageWrap}
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={GALLERY_IMAGES[lightboxIndex].src}
              alt={GALLERY_IMAGES[lightboxIndex].alt}
              fill
              sizes="90vw"
              style={{ objectFit: "contain" }}
              quality={95}
            />
          </div>

          <button
            className={`${styles.lightboxNav} ${styles.lightboxNext}`}
            onClick={(e) => {
              e.stopPropagation();
              setLightboxIndex(
                (lightboxIndex + 1) % GALLERY_IMAGES.length
              );
            }}
            aria-label="Next image"
          >
            <ChevronRight size={32} />
          </button>

          <div className={styles.lightboxCounter}>
            {lightboxIndex + 1} / {GALLERY_IMAGES.length}
          </div>
        </div>
      )}
    </section>
  );
}
