import { PlayCircle, ShieldCheck, Truck, Wrench } from "lucide-react";
import styles from "./VideoShowcase.module.css";

const HIGHLIGHTS = [
  {
    icon: Truck,
    label: "Mobile service across the Valley",
  },
  {
    icon: ShieldCheck,
    label: "Insurance-friendly glass replacement",
  },
  {
    icon: Wrench,
    label: "Calibration-ready workmanship",
  },
];

export default function VideoShowcase() {
  return (
    <section className={styles.section} aria-labelledby="cba-in-action-title">
      <div className="container">
        <div className={styles.layout}>
          <div className={styles.copy}>
            <div className="section-label">CBA in Action</div>
            <h2 id="cba-in-action-title" className="section-title">
              Mobile glass service that comes <span className="text-gradient">to you.</span>
            </h2>
            <p className="section-description">
              From RV windshields to everyday vehicles, CBA Glass brings precise, clean auto glass replacement directly to homes, job sites, and storage facilities across the Valley.
            </p>

            <div className={styles.highlights}>
              {HIGHLIGHTS.map((item) => {
                const Icon = item.icon;
                return (
                  <div className={styles.highlight} key={item.label}>
                    <span className={styles.highlightIcon}>
                      <Icon size={18} aria-hidden="true" />
                    </span>
                    <span>{item.label}</span>
                  </div>
                );
              })}
            </div>

            <a className="btn-primary" href="#contact">
              Get a Free Quote
            </a>
          </div>

          <div className={styles.videoCard}>
            <div className={styles.videoFrame}>
              <video
                className={styles.video}
                src="/assets/videos/cba-mobile-glass-service.mp4"
                poster="/assets/videos/cba-mobile-glass-service-poster.jpg"
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                controls
                aria-label="CBA Glass mobile auto glass service video"
              />
              <div className={styles.playBadge} aria-hidden="true">
                <PlayCircle size={22} />
                <span>Watch mobile service</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
