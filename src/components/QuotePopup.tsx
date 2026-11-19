"use client";

import { useEffect, useRef, useState } from "react";
import { Phone, X } from "lucide-react";
import NativeQuoteForm, { type QuoteType } from "./NativeQuoteForm";
import styles from "./QuotePopup.module.css";

const POPUP_DELAY_MS = 30_000;
const STORAGE_KEY = "cba_quote_popup_dismissed";

export default function QuotePopup({ quoteType = "standard" }: { quoteType?: QuoteType }) {
  const [open, setOpen] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (window.sessionStorage.getItem(STORAGE_KEY) === "true") return;
    const timer = window.setTimeout(() => setOpen(true), POPUP_DELAY_MS);
    return () => window.clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setOpen(false);
    window.sessionStorage.setItem(STORAGE_KEY, "true");
  };

  useEffect(() => {
    if (!open) return;
    const previousFocus = document.activeElement;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    // Native modal dialog keeps background content inert, contains keyboard focus,
    // and handles Escape even when focus is inside the cross-origin form.
    const dialog = dialogRef.current;
    dialog?.showModal();
    return () => {
      dialog?.close();
      document.body.style.overflow = previousOverflow;
      if (previousFocus instanceof HTMLElement) previousFocus.focus();
    };
  }, [open]);

  if (!open) return null;

  return (
    <dialog ref={dialogRef} className={styles.overlay} aria-labelledby="quote-popup-title" onCancel={(event) => { event.preventDefault(); handleClose(); }}>
      <button className={styles.backdrop} onClick={handleClose} aria-label="Close quote popup" tabIndex={-1} />
      <div className={styles.modal}>
        <button className={styles.close} onClick={handleClose} aria-label="Close quote popup" autoFocus>
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
              <Phone size={18} /> Call Now: (623) 217-1310
            </a>
          </div>
          <div className={styles.formCard}>
            <NativeQuoteForm quoteType={quoteType} placement="popup" />
          </div>
        </div>
      </div>
    </dialog>
  );
}
