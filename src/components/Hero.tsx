"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { ArrowRight, Phone } from "lucide-react";
import styles from "./Hero.module.css";

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;

    const handleScroll = () => {
      const scrollY = window.scrollY;
      const bg = hero.querySelector(`.${styles.bgImage}`) as HTMLElement | null;
      if (bg) {
        bg.style.transform = `scale(1.1) translateY(${scrollY * 0.3}px)`;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className={styles.hero} ref={heroRef} id="hero">
      <div className={styles.bgWrap}>
        <Image
          src="/assets/photos/20240426_173417.jpg"
          alt="CBA Glass technician working on heavy machinery windshield"
          fill
          priority
          quality={90}
          sizes="100vw"
          className={styles.bgImage}
          style={{ objectFit: "cover", objectPosition: "center 40%" }}
        />
        <div className={styles.overlay} />
      </div>

      <div className={styles.content}>
        <div className={styles.badge}>
          <span className={styles.badgeDot} />
          Valley-Wide Mobile Service — 6 Days a Week
        </div>

        <h1 className={styles.headline}>
          OEM Quality Glass.
          <br />
          <span className="text-gradient">20+ Years of Precision.</span>
        </h1>

        <p className={styles.subheadline}>
          Premium mobile windshield replacement & repair across Phoenix, Buckeye,
          and the entire Valley. Insurance-approved, lifetime warranty, same-day
          service.
        </p>

        <div className={styles.ctas}>
          <a href="#contact" className="btn-primary">
            Get a Free Quote
            <ArrowRight size={18} />
          </a>
          <a href="tel:6234714064" className="btn-secondary">
            <Phone size={18} />
            Call Now
          </a>
        </div>

        <div className={styles.stats}>
          <div className={styles.stat}>
            <span className={styles.statValue}>20+</span>
            <span className={styles.statLabel}>Years Experience</span>
          </div>
          <div className={styles.statDivider} />
          <div className={styles.stat}>
            <span className={styles.statValue}>5★</span>
            <span className={styles.statLabel}>Yelp Rating</span>
          </div>
          <div className={styles.statDivider} />
          <div className={styles.stat}>
            <span className={styles.statValue}>A+</span>
            <span className={styles.statLabel}>BBB Rated</span>
          </div>
          <div className={styles.statDivider} />
          <div className={styles.stat}>
            <span className={styles.statValue}>100%</span>
            <span className={styles.statLabel}>OEM Glass</span>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className={styles.scrollIndicator}>
        <div className={styles.scrollLine} />
      </div>
    </section>
  );
}
