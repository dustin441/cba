"use client";

import { useRef, useEffect, useState } from "react";
import { Star, Quote } from "lucide-react";
import styles from "./Testimonials.module.css";

const REVIEWS = [
  {
    name: "Aubry S.",
    text: "I called CBA Glass, they handled the insurance — and then scheduled to come out. They were on time and professional. It only took around 30 minutes, and then I got a $50 cash rebate. Definitely keeping their business card to refer family and friends!",
    rating: 5,
  },
  {
    name: "Randy McMillan",
    text: "Highly recommend CBA auto glass. We have used CBA over the years with all of our windshield glass replacements. We used them on all of our vehicles and refer them out to anyone who needs glass replacement.",
    rating: 5,
  },
  {
    name: "Emily J.",
    text: "Jeff expertly replaced our cracked windshield this afternoon. He was professional and very kind to my boys who were interested in watching the process. They were a great company to work with — I would definitely recommend using them!",
    rating: 5,
  },
];

function ReviewCard({
  review,
  index,
}: {
  review: (typeof REVIEWS)[number];
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
      { threshold: 0.2 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`${styles.card} ${visible ? styles.cardVisible : ""}`}
      style={{ transitionDelay: `${index * 120}ms` }}
    >
      <div className={styles.quoteIcon}>
        <Quote size={24} />
      </div>
      <div className={styles.stars}>
        {Array.from({ length: review.rating }).map((_, i) => (
          <Star key={i} size={16} fill="var(--accent-primary)" color="var(--accent-primary)" />
        ))}
      </div>
      <p className={styles.text}>&ldquo;{review.text}&rdquo;</p>
      <div className={styles.author}>
        <div className={styles.avatar}>{review.name[0]}</div>
        <span className={styles.name}>{review.name}</span>
      </div>
    </div>
  );
}

export default function Testimonials() {
  return (
    <section className={styles.section}>
      <div className="container">
        <div className={styles.header}>
          <div className="section-label">Testimonials</div>
          <h2 className="section-title">
            What Our <span className="text-gradient">Customers Say</span>
          </h2>
          <p className="section-description">
            Getting your car back on the road safely — and restoring it back to
            the original OEM specifications — are our only goals.
          </p>
        </div>

        <div className={styles.grid}>
          {REVIEWS.map((review, i) => (
            <ReviewCard key={review.name} review={review} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
