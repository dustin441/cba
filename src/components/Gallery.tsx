"use client";

import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import styles from "./Gallery.module.css";

const GALLERY_IMAGES = [
  { src: "/assets/photos/ferrari-windshield.jpg", alt: "Ferrari windshield replacement in shop" },
  { src: "/assets/site_images/IMG_6763.jpg", alt: "Recent windshield repair" },
  { src: "/assets/photos/rv-windshield.jpg", alt: "RAM ProMaster windshield replacement" },
  { src: "/assets/photos/10155.jpg", alt: "RV windshield installation in progress" },
  { src: "/assets/photos/rv-new-2.jpg", alt: "RV glass repair completed" },
  { src: "/assets/site_images/cqB0gezku3E-Lb-JpTXrX.png", alt: "Mobile glass installation" },
  { src: "/assets/photos/20240426_173417.jpg", alt: "CAT loader windshield replacement" },
  { src: "/assets/site_images/wjJc-AdzCfpKG74cZyD40.png", alt: "Windshield calibration" },
  { src: "/assets/site_images/o2KLKxwu8TQF-ESTADUhA.png", alt: "Auto glass service" },
  { src: "/assets/site_images/KnI73l22V4QsW968LmH9P.png", alt: "Precision glass install" },
  { src: "/assets/site_images/lWT2LJst7iOaDReL-8MNQ.png", alt: "Mobile glass service" },
  { src: "/assets/site_images/85y0Sp9WAEvsKXD_vFaUR.png", alt: "Completed installation" },
  { src: "/assets/site_images/JlaZxOLtmWY4FRmACnoC8.png", alt: "Windshield replacement finish" },
  { src: "/assets/site_images/SdXAO3MYrGy_YYILd01M4.png", alt: "Professional glass work" },
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
