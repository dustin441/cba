"use client";

import { useRef, useState, useEffect } from "react";
import { Phone, Mail, MapPin, Clock, ArrowRight } from "lucide-react";
import NativeQuoteForm, { type QuoteType } from "./NativeQuoteForm";
import styles from "./Contact.module.css";

type ContactProps = { quoteType?: QuoteType };

export default function Contact({ quoteType = "standard" }: ContactProps) {
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

  return (
    <section className={styles.section} id="contact" ref={sectionRef}>
      <div className="ambient-orb ambient-orb--cyan" style={{ width: "600px", height: "600px", bottom: "-200px", right: "-200px" }} />
      <div className="container" style={{ position: "relative", zIndex: 1 }}>
        <div className={styles.header}>
          <div className="section-label">Get in Touch</div>
          <h2 className="section-title">Ready for a <span className="text-gradient">Free Quote?</span></h2>
          <p className="section-description">
            Call us or fill out our quote form below. We&apos;ll get back to you within
            minutes, and in most cases, we can be at your location the same day.
          </p>
        </div>
        <div className={`${styles.grid} ${visible ? styles.gridVisible : ""}`}>
          <div className={styles.info}>
            <a href="tel:6232171310" className={styles.phoneCard}>
              <div className={styles.phoneIcon}><Phone size={28} /></div>
              <div>
                <p className={styles.phoneLabel}>Call or Text</p>
                <p className={styles.phoneNumber}>(623) 217-1310</p>
              </div>
              <ArrowRight size={20} className={styles.phoneArrow} />
            </a>
            <div className={styles.infoCards}>
              <div className={styles.infoCard}>
                <Mail size={18} />
                <div>
                  <p className={styles.infoLabel}>Email</p>
                  <a href="mailto:cbaglass@gmail.com" className={styles.infoValue}>cbaglass@gmail.com</a>
                </div>
              </div>
              <div className={styles.infoCard}>
                <MapPin size={18} />
                <div>
                  <p className={styles.infoLabel}>Service Area</p>
                  <p className={styles.infoValue}>Valley-Wide: Maricopa &amp; Pinal Counties</p>
                </div>
              </div>
              <div className={styles.infoCard}>
                <Clock size={18} />
                <div>
                  <p className={styles.infoLabel}>Office Hours</p>
                  <p className={styles.infoValue}>Mon–Fri 8am–5pm · Sat 9am–12pm</p>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.form}>
            <NativeQuoteForm quoteType={quoteType} placement="contact" />
          </div>
        </div>
      </div>
    </section>
  );
}
