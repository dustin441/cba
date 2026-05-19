"use client";

import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import {
  Truck,
  Shield,
  Wrench,
  Car,
  Cpu,
  Landmark,
} from "lucide-react";
import styles from "./Services.module.css";

const SERVICES = [
  {
    icon: Car,
    title: "Auto Glass",
    description:
      "Full windshield and window replacement for all domestic & foreign vehicles. Mobile service across the entire Valley.",
    image: "/assets/photos/work-action-4.jpg",
    accent: "var(--accent-primary)",
  },
  {
    icon: Truck,
    title: "RV & Fleet Glass",
    description:
      "Specialized RV windshield replacement — from Class A motorhomes to cargo vans. We come to you.",
    image: "/assets/photos/rv-windshield.jpg",
    accent: "#818cf8",
  },
  {
    icon: Wrench,
    title: "Heavy Machinery",
    description:
      "CAT, John Deere, Komatsu — we handle glass replacement for excavators, loaders, and more on the job site.",
    image: "/assets/photos/20230620_071550.jpg",
    accent: "#f59e0b",
  },
  {
    icon: Landmark,
    title: "Luxury & Exotic",
    description:
      "Ferrari, Porsche, Tesla, and more. Precision glass work for high-end vehicles that demand perfection.",
    image: "/assets/photos/ferrari-windshield.jpg",
    accent: "#f43f5e",
  },
  {
    icon: Cpu,
    title: "ADAS Calibration",
    description:
      "Advanced Driver Assistance System calibration after windshield replacement. On-site mobile service available.",
    image: "/assets/photos/work-action-5.jpg",
    accent: "#10b981",
  },
  {
    icon: Shield,
    title: "Insurance Claims",
    description:
      "We handle your insurance claim from start to finish. Network-affiliated, insurance-approved shop.",
    image: "/assets/photos/work-action-6.jpg",
    accent: "#6366f1",
  },
];

function ServiceCard({
  service,
  index,
}: {
  service: (typeof SERVICES)[number];
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

  const Icon = service.icon;

  return (
    <div
      ref={ref}
      className={`${styles.card} ${visible ? styles.cardVisible : ""}`}
      style={{
        transitionDelay: `${index * 100}ms`,
        ["--card-accent" as string]: service.accent,
      }}
    >
      <div className={styles.cardImageWrap}>
        <Image
          src={service.image}
          alt={service.title}
          fill
          sizes="(max-width: 768px) 100vw, 400px"
          style={{ objectFit: "cover" }}
          className={styles.cardImage}
        />
        <div className={styles.cardImageOverlay} />
      </div>
      <div className={styles.cardContent}>
        <div className={styles.cardIcon}>
          <Icon size={24} />
        </div>
        <h3 className={styles.cardTitle}>{service.title}</h3>
        <p className={styles.cardDescription}>{service.description}</p>
      </div>
    </div>
  );
}

export default function Services() {
  return (
    <section className="section-padding" id="services">
      <div className="container">
        <div className={styles.header}>
          <div className="section-label">Specialized Services</div>
          <h2 className="section-title">
            The <span className="text-gradient">Specialized Edge</span>
          </h2>
          <p className="section-description">
            From everyday auto glass to the jobs no one else will touch — luxury
            exotics, heavy construction equipment, and RV motorhomes.
          </p>
        </div>

        <div className={styles.grid}>
          {SERVICES.map((service, i) => (
            <ServiceCard key={service.title} service={service} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
