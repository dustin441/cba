"use client";

import { useRef, useState, useEffect } from "react";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  ArrowRight,
  Send,
  Shield,
  Coins,
  Info,
  CheckCircle2,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./Contact.module.css";

const INSURANCE_PROVIDERS = [
  "State Farm",
  "GEICO",
  "Progressive",
  "Liberty Mutual",
  "Allstate",
  "USAA",
  "Farmers",
  "American Family",
  "Hartford",
  "Other / I'll specify",
];

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  
  // Wizard States
  const [step, setStep] = useState(1);
  const [year, setYear] = useState("");
  const [make, setMake] = useState("");
  const [model, setModel] = useState("");
  const [billingType, setBillingType] = useState<"insurance" | "cash" | null>(null);
  const [insuranceProvider, setInsuranceProvider] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

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

  const handleNext = () => {
    if (step < 3) setStep(step + 1);
  };

  const handlePrev = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate API call
    console.log("Form Submitted:", {
      vehicle: `${year} ${make} ${model}`,
      billingType,
      insuranceProvider: billingType === "insurance" ? insuranceProvider : "N/A",
      name,
      phone,
      email,
      message,
    });
    setIsSubmitted(true);
  };

  // Helper validation functions
  const isStep1Valid = year.trim() !== "" && make.trim() !== "" && model.trim() !== "";
  const isStep2Valid = billingType !== null && (billingType !== "insurance" || insuranceProvider !== "");
  const isStep3Valid = name.trim() !== "" && phone.trim() !== "" && email.trim() !== "";

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
            Call us or fill out our interactive quote wizard below. We&apos;ll get back to you within
            minutes — and in most cases, we can be at your location the same day.
          </p>
        </div>

        <div className={`${styles.grid} ${visible ? styles.gridVisible : ""}`}>
          {/* Info Column */}
          <div className={styles.info}>
            <a href="tel:6232171310" className={styles.phoneCard}>
              <div className={styles.phoneIcon}>
                <Phone size={28} />
              </div>
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
                  <a
                    href="mailto:cbaglass@gmail.com"
                    className={styles.infoValue}
                  >
                    cbaglass@gmail.com
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

          {/* Form Wizard Column */}
          <div className={styles.form}>
            {isSubmitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className={styles.stepContent}
                style={{ textAlign: "center", padding: "2rem 0" }}
              >
                <div style={{ display: "flex", justifyContent: "center", marginBottom: "1rem" }}>
                  <CheckCircle2 size={64} color="var(--accent-primary)" />
                </div>
                <h3 className="section-title" style={{ fontSize: "1.75rem", marginBottom: "0.5rem" }}>
                  Thank You!
                </h3>
                <p className="section-description" style={{ maxWidth: "450px", margin: "0 auto 1.5rem" }}>
                  Your quote request has been received. Our mobile dispatch team is reviewing your vehicle specs and will contact you via phone/text in a few minutes.
                </p>
                <button
                  onClick={() => {
                    setStep(1);
                    setYear("");
                    setMake("");
                    setModel("");
                    setBillingType(null);
                    setInsuranceProvider("");
                    setName("");
                    setPhone("");
                    setEmail("");
                    setMessage("");
                    setIsSubmitted(false);
                  }}
                  className="btn-primary"
                  style={{ margin: "0 auto" }}
                >
                  Start New Request
                </button>
              </motion.div>
            ) : (
              <>
                {/* Progress Indicators */}
                <div className={styles.wizardHeader}>
                  <span className={styles.wizardStepTitle}>
                    {step === 1 && "Vehicle Information"}
                    {step === 2 && "Insurance & Billing"}
                    {step === 3 && "Contact Details"}
                  </span>
                  <span className={styles.wizardStepIndicator}>Step {step} of 3</span>
                </div>
                <div className={styles.wizardProgress}>
                  <div
                    className={styles.wizardProgressBar}
                    style={{ width: `${(step / 3) * 100}%` }}
                  />
                </div>

                <form onSubmit={handleSubmit}>
                  <AnimatePresence mode="wait">
                    {step === 1 && (
                      <motion.div
                        key="step1"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.2 }}
                        className={styles.stepContent}
                      >
                        <div className={styles.formGroup}>
                          <label htmlFor="wizard-year" className={styles.formLabel}>
                            Year
                          </label>
                          <input
                            id="wizard-year"
                            type="number"
                            placeholder="e.g. 2024"
                            value={year}
                            onChange={(e) => setYear(e.target.value)}
                            className={styles.formInput}
                            required
                          />
                        </div>
                        <div className={styles.formRow}>
                          <div className={styles.formGroup}>
                            <label htmlFor="wizard-make" className={styles.formLabel}>
                              Make
                            </label>
                            <input
                              id="wizard-make"
                              type="text"
                              placeholder="e.g. Toyota"
                              value={make}
                              onChange={(e) => setMake(e.target.value)}
                              className={styles.formInput}
                              required
                            />
                          </div>
                          <div className={styles.formGroup}>
                            <label htmlFor="wizard-model" className={styles.formLabel}>
                              Model
                            </label>
                            <input
                              id="wizard-model"
                              type="text"
                              placeholder="e.g. Camry"
                              value={model}
                              onChange={(e) => setModel(e.target.value)}
                              className={styles.formInput}
                              required
                            />
                          </div>
                        </div>

                        <div className={styles.navButtons}>
                          <div /> {/* Spacer */}
                          <button
                            type="button"
                            onClick={handleNext}
                            disabled={!isStep1Valid}
                            className="btn-primary"
                          >
                            Next Step
                          </button>
                        </div>
                      </motion.div>
                    )}

                    {step === 2 && (
                      <motion.div
                        key="step2"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.2 }}
                        className={styles.stepContent}
                      >
                        <div className={styles.formGroup}>
                          <label className={styles.formLabel}>How will this service be billed?</label>
                          <div className={styles.optionGrid}>
                            <div
                              onClick={() => setBillingType("insurance")}
                              className={`${styles.optionCard} ${
                                billingType === "insurance" ? styles.optionCardActive : ""
                              }`}
                            >
                              <Shield size={28} className={styles.optionIcon} />
                              <span className={styles.optionTitle}>Filing Through Insurance</span>
                              <span className={styles.optionDesc}>
                                We guide you step-by-step & coordinate with your provider.
                              </span>
                            </div>
                            <div
                              onClick={() => {
                                setBillingType("cash");
                                setInsuranceProvider("");
                              }}
                              className={`${styles.optionCard} ${
                                billingType === "cash" ? styles.optionCardActive : ""
                              }`}
                            >
                              <Coins size={28} className={styles.optionIcon} />
                              <span className={styles.optionTitle}>Cash / Self-Pay</span>
                              <span className={styles.optionDesc}>
                                Direct out-of-pocket pricing. No insurance claims.
                              </span>
                            </div>
                          </div>
                        </div>

                        {billingType === "insurance" && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            className={styles.stepContent}
                          >
                            <div className={styles.formGroup}>
                              <label htmlFor="wizard-insurance" className={styles.formLabel}>
                                Insurance Provider
                              </label>
                              <select
                                id="wizard-insurance"
                                value={insuranceProvider}
                                onChange={(e) => setInsuranceProvider(e.target.value)}
                                className={styles.formInput}
                                required
                              >
                                <option value="" disabled>Select your provider...</option>
                                {INSURANCE_PROVIDERS.map((provider) => (
                                  <option key={provider} value={provider}>
                                    {provider}
                                  </option>
                                ))}
                              </select>
                            </div>

                            <div className={styles.conciergeNotice}>
                              <Info size={16} className={styles.conciergeIcon} />
                              <p className={styles.conciergeText}>
                                <strong>Concierge Service:</strong> We will jump on a 3-way call with your provider and handle all of the claim setup questions with you. Usually takes under 10 minutes!
                              </p>
                            </div>
                          </motion.div>
                        )}

                        <div className={styles.navButtons}>
                          <button
                            type="button"
                            onClick={handlePrev}
                            className="btn-secondary"
                          >
                            Back
                          </button>
                          <button
                            type="button"
                            onClick={handleNext}
                            disabled={!isStep2Valid}
                            className="btn-primary"
                          >
                            Next Step
                          </button>
                        </div>
                      </motion.div>
                    )}

                    {step === 3 && (
                      <motion.div
                        key="step3"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.2 }}
                        className={styles.stepContent}
                      >
                        <div className={styles.formRow}>
                          <div className={styles.formGroup}>
                            <label htmlFor="wizard-name" className={styles.formLabel}>
                              Your Name
                            </label>
                            <input
                              id="wizard-name"
                              type="text"
                              placeholder="Name"
                              value={name}
                              onChange={(e) => setName(e.target.value)}
                              className={styles.formInput}
                              required
                            />
                          </div>
                          <div className={styles.formGroup}>
                            <label htmlFor="wizard-phone" className={styles.formLabel}>
                              Phone Number
                            </label>
                            <input
                              id="wizard-phone"
                              type="tel"
                              placeholder="(623) 555-0199"
                              value={phone}
                              onChange={(e) => setPhone(e.target.value)}
                              className={styles.formInput}
                              required
                            />
                          </div>
                        </div>

                        <div className={styles.formGroup}>
                          <label htmlFor="wizard-email" className={styles.formLabel}>
                            Email Address
                          </label>
                          <input
                            id="wizard-email"
                            type="email"
                            placeholder="your@email.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className={styles.formInput}
                            required
                          />
                        </div>

                        <div className={styles.formGroup}>
                          <label htmlFor="wizard-message" className={styles.formLabel}>
                            Additional Details (Optional)
                          </label>
                          <textarea
                            id="wizard-message"
                            rows={3}
                            placeholder="e.g. Needs rain sensors recalibrated, scheduling preferences..."
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            className={styles.formTextarea}
                          />
                        </div>

                        <div className={styles.navButtons}>
                          <button
                            type="button"
                            onClick={handlePrev}
                            className="btn-secondary"
                          >
                            Back
                          </button>
                          <button
                            type="submit"
                            disabled={!isStep3Valid}
                            className={`btn-primary ${styles.submitBtn}`}
                          >
                            <Send size={16} />
                            Get My Quote
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
