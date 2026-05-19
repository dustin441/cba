"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  ArrowRight,
  Send,
} from "lucide-react";
import styles from "./Contact.module.css";

export default function Contact() {
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
    <section
      className={styles.section}
      id="contact"
      ref={sectionRef}
    >
      {/* Background ambient orbs */}
      <div
        className="ambient-orb ambient-orb--cyan"
        style={{
          width: "600px",
          height: "600px",
          bottom: "-200px",
          right: "-200px",
        }}
      />

      <div className="container" style={{ position: "relative", zIndex: 1 }}>
        <div className={styles.header}>
          <div className="section-label">Get in Touch</div>
          <h2 className="section-title">
            Ready for a <span className="text-gradient">Free Quote?</span>
          </h2>
          <p className="section-description">
            Call us or fill out the form below. We&apos;ll get back to you within
            minutes — and in most cases, we can be at your location the same day.
          </p>
        </div>

        <div className={`${styles.grid} ${visible ? styles.gridVisible : ""}`}>
          {/* Info Column */}
          <div className={styles.info}>
            <a href="tel:6234714064" className={styles.phoneCard}>
              <div className={styles.phoneIcon}>
                <Phone size={28} />
              </div>
              <div>
                <p className={styles.phoneLabel}>Call or Text</p>
                <p className={styles.phoneNumber}>(623) 471-4064</p>
              </div>
              <ArrowRight size={20} className={styles.phoneArrow} />
            </a>

            <div className={styles.infoCards}>
              <div className={styles.infoCard}>
                <Mail size={18} />
                <div>
                  <p className={styles.infoLabel}>Email</p>
                  <a
                    href="mailto:cbaautoglass@gmail.com"
                    className={styles.infoValue}
                  >
                    cbaautoglass@gmail.com
                  </a>
                </div>
              </div>

              <div className={styles.infoCard}>
                <MapPin size={18} />
                <div>
                  <p className={styles.infoLabel}>Service Area</p>
                  <p className={styles.infoValue}>
                    Valley-Wide — Maricopa & Pinal Counties
                  </p>
                </div>
              </div>

              <div className={styles.infoCard}>
                <Clock size={18} />
                <div>
                  <p className={styles.infoLabel}>Office Hours</p>
                  <p className={styles.infoValue}>
                    Mon–Fri 8am–5pm · Sat 9am–12pm
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Form Column */}
          <form
            className={styles.form}
            onSubmit={(e) => e.preventDefault()}
          >
            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label htmlFor="contact-name" className={styles.formLabel}>
                  Name
                </label>
                <input
                  id="contact-name"
                  type="text"
                  placeholder="Your name"
                  className={styles.formInput}
                />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="contact-phone" className={styles.formLabel}>
                  Phone
                </label>
                <input
                  id="contact-phone"
                  type="tel"
                  placeholder="(XXX) XXX-XXXX"
                  className={styles.formInput}
                />
              </div>
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="contact-email" className={styles.formLabel}>
                Email
              </label>
              <input
                id="contact-email"
                type="email"
                placeholder="your@email.com"
                className={styles.formInput}
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="contact-vehicle" className={styles.formLabel}>
                Vehicle / Service Type
              </label>
              <input
                id="contact-vehicle"
                type="text"
                placeholder="e.g. 2024 Toyota Camry — Windshield Replacement"
                className={styles.formInput}
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="contact-message" className={styles.formLabel}>
                Message
              </label>
              <textarea
                id="contact-message"
                rows={4}
                placeholder="Tell us about your glass needs..."
                className={styles.formTextarea}
              />
            </div>

            <button type="submit" className={`btn-primary ${styles.submitBtn}`}>
              <Send size={16} />
              Get My Free Quote
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
