"use client";

import { useEffect, useState } from "react";
import { ArrowRight, CheckCircle2, Phone, X } from "lucide-react";
import styles from "./QuotePopup.module.css";

const POPUP_DELAY_MS = 30_000;
const STORAGE_KEY = "cba_quote_popup_dismissed";

export default function QuotePopup() {
  const [open, setOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    vehicle: "",
    message: "",
  });

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.sessionStorage.getItem(STORAGE_KEY) === "true") return;

    const timer = window.setTimeout(() => setOpen(true), POPUP_DELAY_MS);
    return () => window.clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setOpen(false);
    if (typeof window !== "undefined") {
      window.sessionStorage.setItem(STORAGE_KEY, "true");
    }
  };

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") handleClose();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  const handleChange = (field: keyof typeof formData) => (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((current) => ({ ...current, [field]: event.target.value }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setSubmitError("");
    setIsSubmitting(true);

    try {
      const [year = "", make = "", ...modelParts] = formData.vehicle.trim().split(/\s+/);
      const response = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          year,
          make,
          model: modelParts.join(" ") || formData.vehicle,
          billingType: null,
          insuranceProvider: "",
          name: formData.name,
          phone: formData.phone,
          email: formData.email,
          message: formData.message || "Popup quote request",
          source: "30-second CTA popup",
        }),
      });

      if (!response.ok) {
        throw new Error("Popup quote request failed");
      }

      setIsSubmitted(true);
      if (typeof window !== "undefined") {
        window.sessionStorage.setItem(STORAGE_KEY, "true");
      }
    } catch (error) {
      console.error("Popup quote request failed", error);
      setSubmitError(
        "We couldn't submit this online. Please call or text (623) 217-1310 and we'll help right away."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!open) return null;

  return (
    <div className={styles.overlay} role="dialog" aria-modal="true" aria-labelledby="quote-popup-title">
      <button className={styles.backdrop} onClick={handleClose} aria-label="Close quote popup" />
      <div className={styles.modal}>
        <button className={styles.close} onClick={handleClose} aria-label="Close quote popup">
          <X size={20} />
        </button>

        <div className={styles.content}>
          <div className={styles.copy}>
            <div className="section-label">Ready to Get Started?</div>
            <h2 id="quote-popup-title" className={styles.title}>
              Need mobile glass service? <span className="text-gradient">Start your quote now.</span>
            </h2>
            <p className={styles.description}>
              Send your vehicle details and CBA Glass will follow up quickly with next steps for mobile replacement, insurance help, or calibration questions.
            </p>
            <a href="tel:6232171310" className={`btn-secondary ${styles.callButton}`} onClick={handleClose}>
              <Phone size={18} />
              Call Now — (623) 217-1310
            </a>
          </div>

          <div className={styles.formCard}>
            {isSubmitted ? (
              <div className={styles.success}>
                <CheckCircle2 size={54} />
                <h3>Request received</h3>
                <p>We’ll review your info and reach out by phone/text shortly.</p>
                <button className="btn-primary" onClick={handleClose}>Close</button>
              </div>
            ) : (
              <form className={styles.form} onSubmit={handleSubmit}>
                <div className={styles.formRow}>
                  <label className={styles.field}>
                    <span>Name *</span>
                    <input
                      required
                      value={formData.name}
                      onChange={handleChange("name")}
                      autoComplete="name"
                      placeholder="Your name"
                    />
                  </label>
                  <label className={styles.field}>
                    <span>Phone *</span>
                    <input
                      required
                      value={formData.phone}
                      onChange={handleChange("phone")}
                      autoComplete="tel"
                      inputMode="tel"
                      placeholder="Best number"
                    />
                  </label>
                </div>

                <label className={styles.field}>
                  <span>Email *</span>
                  <input
                    required
                    type="email"
                    value={formData.email}
                    onChange={handleChange("email")}
                    autoComplete="email"
                    placeholder="you@example.com"
                  />
                </label>

                <label className={styles.field}>
                  <span>Vehicle</span>
                  <input
                    value={formData.vehicle}
                    onChange={handleChange("vehicle")}
                    placeholder="Year Make Model"
                  />
                </label>

                <label className={styles.field}>
                  <span>What do you need?</span>
                  <textarea
                    value={formData.message}
                    onChange={handleChange("message")}
                    placeholder="Windshield, side glass, RV, calibration, insurance question..."
                    rows={3}
                  />
                </label>

                {submitError && <p className={styles.error}>{submitError}</p>}

                <button className={`btn-primary ${styles.submitButton}`} type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "Sending..." : "Get Started"}
                  {!isSubmitting && <ArrowRight size={18} />}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
