"use client";

import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import styles from "./Gallery.module.css";

const GALLERY_IMAGES = [
  // Domestic
  { src: "/assets/photos/PXL_20260309_183756857.jpg", alt: "Domestic vehicle windshield replacement" },
  { src: "/assets/photos/PXL_20260309_190031810.jpg", alt: "Domestic auto glass service" },
  { src: "/assets/photos/PXL_20260406_180917743.jpg", alt: "Windshield replacement on domestic vehicle" },
  { src: "/assets/photos/PXL_20260318_212752861.jpg", alt: "Auto glass install" },
  // Brand / shop
  { src: "/assets/photos/PXL_20260113_005958782.jpg", alt: "CBA Glass shop" },
  { src: "/assets/photos/e7a3ad69-49b9-4b5c-a495-29dc0893d2f9.jpg", alt: "CBA Glass team at work" },
  { src: "/assets/photos/IMG_20260114_001547.jpg", alt: "CBA Glass mobile service" },
  // Classics
  { src: "/assets/photos/PXL_20260331_194816565.jpg", alt: "Classic car glass restoration" },
  { src: "/assets/photos/PXL_20260311_162846316.jpg", alt: "Vintage windshield replacement" },
  { src: "/assets/photos/PXL_20260401_022849437.jpg", alt: "Classic auto glass work" },
  { src: "/assets/photos/classics-v2-1.jpg", alt: "Classic car windshield replacement" },
  { src: "/assets/photos/classics-v2-3.jpg", alt: "Vintage auto glass service" },
  { src: "/assets/photos/classics-v2-5.jpg", alt: "Classic vehicle glass restoration" },
  // Exotic / Luxury
  { src: "/assets/photos/luxury-v2-1.jpg", alt: "Bentley windshield replacement" },
  { src: "/assets/photos/PXL_20260403_182528700.MP.jpg", alt: "Exotic vehicle windshield replacement" },
  { src: "/assets/photos/PXL_20260403_181712830.jpg", alt: "Luxury car glass service" },
  { src: "/assets/photos/PXL_20260403_182550425.jpg", alt: "High-end auto glass install" },
  // Heavy Equipment
  { src: "/assets/photos/20240426_173417.jpg", alt: "CAT loader windshield replacement" },
  { src: "/assets/photos/IMG_4933.jpg", alt: "Heavy equipment glass service" },
  { src: "/assets/photos/PXL_20260210_232732642.jpg", alt: "Construction equipment windshield" },
  { src: "/assets/photos/20211014_171350.jpg", alt: "Heavy machinery glass replacement" },
  // RV
  { src: "/assets/photos/rv-windshield.jpg", alt: "RAM ProMaster windshield replacement" },
  { src: "/assets/photos/PXL_20260410_172801047.jpg", alt: "RV windshield installation" },
  { src: "/assets/photos/PXL_20260127_182154599.jpg", alt: "RV glass repair" },
  { src: "/assets/photos/PXL_20251229_195953195.jpg", alt: "RV windshield completed" },
  { src: "/assets/photos/rv-new-2.jpg", alt: "RV glass repair completed" },
  // Tesla
  { src: "/assets/photos/PXL_20260218_175954265.jpg", alt: "Tesla windshield replacement" },
  { src: "/assets/photos/PXL_20260218_181243489.jpg", alt: "Tesla glass service" },
  { src: "/assets/photos/PXL_20260324_193112268.MP.jpg", alt: "Tesla auto glass install" },
];

export default function Gallery() {
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

        <div className={`${styles.grid} ${visible ? styles.gridVisible : ""}`}>
          {GALLERY_IMAGES.map((img, i) => (
            <button
              key={img.src}
              className={styles.tile}
              style={{ animationDelay: `${i * 60}ms` }}
              onClick={() => setLightboxIndex(i)}
              aria-label={`View ${img.alt}`}
              id={`gallery-image-${i}`}
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
            </button>
          ))}
        </div>
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
