import Image from "next/image";
import Link from "next/link";
import { Phone, Mail, MapPin } from "lucide-react";
import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer} id="footer">
      <div className="container">
        <div className={styles.grid}>
          <div className={styles.brand}>
            <Image
              src="/assets/logos/CBALogo.png"
              alt="CBA Glass"
              width={100}
              height={42}
              className={styles.logo}
            />
            <p className={styles.tagline}>
              Premium mobile auto glass replacement across the Phoenix Valley.
              OEM quality, lifetime warranty, 30+ years of expertise.
            </p>
          </div>

          <div className={styles.col}>
            <h4 className={styles.colTitle}>Vehicles</h4>
            <ul className={styles.colLinks}>
              <li><Link href="/vehicles/rv">RV Glass</Link></li>
              <li><Link href="/vehicles/domestic">Passenger Vehicles</Link></li>
              <li><Link href="/vehicles/foreign">Foreign Vehicles</Link></li>
              <li><Link href="/vehicles/classics">Classic Cars</Link></li>
              <li><Link href="/vehicles/tesla">Tesla</Link></li>
              <li><Link href="/vehicles/luxury">Luxury & Exotic</Link></li>
            </ul>
          </div>

          <div className={styles.col}>
            <h4 className={styles.colTitle}>Contact</h4>
            <ul className={styles.colContact}>
              <li>
                <Phone size={14} />
                <a href="tel:6232171310">(623) 217-1310</a>
              </li>
              <li>
                <Mail size={14} />
                <a href="mailto:cbaglass@gmail.com">cbaglass@gmail.com</a>
              </li>
              <li>
                <MapPin size={14} />
                <span>Phoenix, AZ 85034</span>
              </li>
            </ul>
          </div>
        </div>

        <div className={styles.bottom}>
          <p className={styles.copy}>
            © {new Date().getFullYear()} CBA Glass. All rights reserved.
          </p>
          <p className={styles.safety}>
            Windshields account for ~40% of your vehicle&apos;s crash absorption.
            Don&apos;t compromise safety.
          </p>
        </div>
      </div>
    </footer>
  );
}
