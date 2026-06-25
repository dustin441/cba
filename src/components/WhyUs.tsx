"use client";

import { useRef, useEffect, useState } from "react";
import {
  ShieldCheck,
  Shield,
  Truck,
  Award,
  Clock,
  Sparkles,
  BadgeCheck,
} from "lucide-react";
import Image from "next/image";
import styles from "./WhyUs.module.css";

const FEATURES = [
  {
    icon: Clock,
    title: "Same-Day Service",
    description:
      "Cracked windshield? In most cases, we're at your location the same day you call. No waiting, no hassle.",
  },
  {
    icon: Truck,
    title: "Mobile Convenience",
    description:
      "We come to your home, office, or job site. Valley-wide mobile service 6 days a week, wherever you are.",
  },
  {
    icon: ShieldCheck,
    title: "Lifetime Warranty",
    description:
      "Every installation backed by a lifetime warranty on workmanship. We stand behind every piece of glass.",
  },
  {
    icon: Award,
    title: "30+ Years Experience",
    description:
      "Three decades of hands-on expertise. From daily drivers to exotic supercars, we've done it all.",
  },
  {
    icon: BadgeCheck,
    title: "Insurance Approved",
    description:
      "Network-affiliated, insurance-approved shop. We handle the entire claim process — quick and simple.",
  },
  {
    icon: Sparkles,
    title: "OEM Quality Only",
    description:
      "We exclusively use new, OEM-grade glass and Sika/DOW certified adhesive products. No shortcuts.",
  },
];

function FeatureCard({
  feature,
  index,
}: {
  feature: (typeof FEATURES)[number];
  index: number;
}) {
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
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const Icon = feature.icon;

  return (
    <div
      ref={ref}
      className={`${styles.feature} ${visible ? styles.featureVisible : ""}`}
      style={{ transitionDelay: `${index * 80}ms` }}
    >
      <div className={styles.featureIcon}>
        <Icon size={24} />
      </div>
      <h3 className={styles.featureTitle}>{feature.title}</h3>
      <p className={styles.featureDesc}>{feature.description}</p>
    </div>
  );
}

export default function WhyUs() {
  return (
    <section className={styles.section} id="about">
      {/* Background ambient orbs */}
      <div
        className="ambient-orb ambient-orb--cyan"
        style={{
          width: "500px",
          height: "500px",
          top: "-100px",
          right: "-200px",
        }}
      />
      <div
        className="ambient-orb ambient-orb--blue"
        style={{
          width: "400px",
          height: "400px",
          bottom: "-100px",
          left: "-150px",
        }}
      />

      <div className="container" style={{ position: "relative", zIndex: 1 }}>
        <div className={styles.header}>
          <div className="section-label">Why Choose CBA</div>
          <h2 className="section-title">
            Trust Built Over{" "}
            <span className="text-gradient">Two Decades</span>
          </h2>
          <p className="section-description">
            Family-owned and locally operated. We treat every vehicle like it&apos;s
            our own — because your safety is our reputation.
          </p>
        </div>

        <div className={styles.grid}>
          {FEATURES.map((f, i) => (
            <FeatureCard key={f.title} feature={f} index={i} />
          ))}
        </div>

        <div className={styles.insuranceCard}>
          <div className={styles.insuranceContent}>
            <h3 className={styles.insuranceTitle}>
              <Shield size={32} color="#6366f1" />
              White-Glove Insurance Walkthrough
            </h3>
            <p className={styles.insuranceDesc}>
              Filing an auto glass claim can be confusing. We don&apos;t just &ldquo;approve&rdquo; insurance — we walk you through the entire process. Our team will get on a three-way call with your provider, guide you through the claims questions step-by-step, and handle all the coordination directly with them. We make your glass replacement completely hands-off and stress-free, taking less than 10 minutes.
            </p>
          </div>
          <div className={styles.insuranceImageWrap}>
            <Image
              src="/assets/photos/work-action-6.jpg"
              alt="Insurance Claims"
              fill
              sizes="(max-width: 768px) 100vw, 400px"
              style={{ objectFit: "cover" }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
