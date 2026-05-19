"use client";

import { useRef, useEffect, useState } from "react";
import styles from "./TrustBadges.module.css";

const BADGES = [
  "LOCALLY OWNED & OPERATED",
  "OVER 20 YEARS EXPERIENCE",
  "YELP 5-STAR RATED",
  "BBB A+ RATED",
  "DOW CERTIFIED",
  "SIKA CERTIFIED",
  "INSURANCE NETWORK AFFILIATED",
  "VALLEYWIDE FREE MOBILE SERVICE",
  "OEM QUALITY GLASS",
  "LIFETIME WARRANTY",
];

export default function TrustBadges() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
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

  return (
    <div
      ref={ref}
      className={`${styles.strip} ${visible ? styles.visible : ""}`}
    >
      <div className={styles.track}>
        {/* Duplicate for seamless loop */}
        {[...BADGES, ...BADGES].map((badge, i) => (
          <div key={`${badge}-${i}`} className={styles.badge}>
            <span className={styles.dot} />
            {badge}
          </div>
        ))}
      </div>
    </div>
  );
}
