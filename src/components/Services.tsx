"use client";

import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Truck,
  Wrench,
  Car,
  Cpu,
  Landmark,
} from "lucide-react";
import styles from "./Services.module.css";

const SERVICES = [
  {
    icon: Truck,
    title: "RV Glass",
    description:
      "Specialized RV windshield replacement — from Class A motorhomes to coaches. We come to you.",
    image: "/assets/photos/10166.jpg",
    accent: "#818cf8",
    slug: "rv",
  },
  {
    icon: Car,
    title: "Passenger Vehicles",
    description:
      "Full windshield and window replacement for cars, trucks, SUVs, and daily drivers. Mobile service across the entire Valley.",
    image: "/assets/photos/standard-5.jpg",
    accent: "var(--accent-primary)",
    slug: "domestic",
  },
  {
    icon: Car,
    title: "Foreign Vehicles",
    description:
      "Expert glass replacement for European, Asian, and other imported makes.",
    image: "/assets/photos/standard-1.jpg",
    accent: "#0ea5e9",
    slug: "foreign",
  },
  {
    icon: Landmark,
    title: "Classic Cars",
    description:
      "Specialized glass restoration and replacement services for classic and vintage vehicles.",
    image: "/assets/photos/shop-classic.jpg",
    accent: "#d946ef",
    slug: "classics",
  },
  {
    icon: Landmark,
    title: "Luxury & Exotic",
    description:
      "Ferrari, Porsche, Tesla, and more. Precision glass work for high-end vehicles that demand perfection.",
    image: "/assets/photos/luxury-v2-3.jpg",
    accent: "#f43f5e",
    slug: "luxury",
  },
  {
    icon: Wrench,
    title: "Heavy Machinery",
    description:
      "CAT, John Deere, Komatsu — we handle glass replacement for excavators, loaders, and more on the job site.",
    image: "/assets/photos/20230620_071550.jpg",
    accent: "#f59e0b",
    slug: "heavy-machinery",
  },
  {
    icon: Cpu,
    title: "Tesla",
    description:
      "Certified auto glass professionals specializing in precise glass replacement for all Tesla models.",
    image: "/assets/photos/PXL_20260218_175954265.jpg",
    accent: "#10b981",
    slug: "tesla",
  },
  {
    icon: Cpu,
    title: "Mobile ADAS Calibration",
    description:
      "Windshield camera calibration done in your driveway. Static and dynamic OEM procedures supported.",
    image: "/assets/photos/adas-mobile-calibration-1.jpg",
    accent: "#6366f1",
    slug: "adas",
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

  const sharedClassName = `${styles.card} ${visible ? styles.cardVisible : ""}`;
  const sharedStyle = {
    transitionDelay: `${index * 100}ms`,
    ["--card-accent" as string]: service.accent,
  } as React.CSSProperties;

  const inner = (
    <>
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
    </>
  );

  if (service.slug) {
    return (
      <Link
        href={`/vehicles/${service.slug}`}
        ref={ref as unknown as React.RefObject<HTMLAnchorElement>}
        className={sharedClassName}
        style={sharedStyle}
      >
        {inner}
      </Link>
    );
  }

  return (
    <div ref={ref} className={sharedClassName} style={sharedStyle}>
      {inner}
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
