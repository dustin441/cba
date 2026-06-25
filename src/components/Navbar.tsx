"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Phone, Menu, X, ChevronDown } from "lucide-react";
import styles from "./Navbar.module.css";

const NAV_LINKS = [
  { 
    label: "Vehicles & Services", 
    href: "/#services",
    dropdown: [
      { label: "RV Glass", href: "/vehicles/rv" },
      { label: "Mobile ADAS Calibration", href: "/vehicles/adas" },
      { label: "Passenger Vehicles", href: "/vehicles/domestic" },
      { label: "Foreign Vehicles", href: "/vehicles/foreign" },
      { label: "Classic Cars", href: "/vehicles/classics" },
      { label: "Tesla", href: "/vehicles/tesla" },
      { label: "Luxury & Exotic", href: "/vehicles/luxury" },
      { label: "Heavy Machinery", href: "/vehicles/heavy-machinery" },
    ]
  },
  { label: "Our Work", href: "/#gallery" },
  { label: "FAQ", href: "/#faq" },
  { label: "About", href: "/#about" },
  { label: "Contact", href: "/#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <header
      className={`${styles.navbar} ${scrolled ? styles.scrolled : ""}`}
      id="navbar"
    >
      <nav className={styles.inner}>
        <Link href="/" className={styles.logo} aria-label="CBA Glass Home">
          <Image
            src="/assets/logos/CBALogo.png"
            alt="CBA Glass"
            width={120}
            height={50}
            priority
            className={styles.logoImg}
          />
        </Link>

        {/* Desktop Links */}
        <ul className={styles.links}>
          {NAV_LINKS.map((link) => (
            <li key={link.href} className={link.dropdown ? styles.hasDropdown : ""}>
              <Link href={link.href} className={styles.link}>
                {link.label}
                {link.dropdown && <ChevronDown size={14} style={{ marginLeft: 4 }} />}
              </Link>
              {link.dropdown && (
                <div className={styles.dropdown}>
                  {link.dropdown.map((subItem) => (
                    <Link key={subItem.href} href={subItem.href} className={styles.dropdownLink}>
                      {subItem.label}
                    </Link>
                  ))}
                </div>
              )}
            </li>
          ))}
        </ul>

        <div className={styles.actions}>
          <a href="tel:6232171310" className={`btn-primary ${styles.cta}`}>
            <Phone size={16} />
            <span>(623) 217-1310</span>
          </a>
          <button
            className={styles.burger}
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
            id="mobile-menu-toggle"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`${styles.mobileMenu} ${mobileOpen ? styles.mobileOpen : ""}`}
      >
        <ul className={styles.mobileLinks}>
          {NAV_LINKS.map((link) => (
            <li key={link.href} className={styles.mobileNavItem}>
              <Link
                href={link.href}
                className={styles.mobileLink}
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
              {link.dropdown && (
                <ul className={styles.mobileDropdown}>
                  {link.dropdown.map((subItem) => (
                    <li key={subItem.href}>
                      <Link 
                        href={subItem.href} 
                        className={styles.mobileDropdownLink}
                        onClick={() => setMobileOpen(false)}
                      >
                        {subItem.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
        <div className={styles.mobileActions}>
          <Link
            href="/#contact"
            className={`btn-primary ${styles.mobileActionBtn}`}
            onClick={() => setMobileOpen(false)}
          >
            Get a Free Quote
          </Link>
          <a
            href="tel:6232171310"
            className={`btn-secondary ${styles.mobileActionBtn}`}
            onClick={() => setMobileOpen(false)}
          >
            <Phone size={18} />
            Call Now
          </a>
        </div>
      </div>
    </header>
  );
}
