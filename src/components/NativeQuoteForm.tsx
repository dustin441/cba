"use client";

import Script from "next/script";

export type QuoteType = "standard" | "rv";

const FORM_IDS: Record<QuoteType, string> = {
  standard: "g6ZbBzkJ8UoG66SlyX7P",
  rv: "BrRXsepTbATAcuEXreoT",
};

type NativeQuoteFormProps = {
  quoteType?: QuoteType;
  placement: "contact" | "popup";
};

export default function NativeQuoteForm({ quoteType = "standard", placement }: NativeQuoteFormProps) {
  const formId = FORM_IDS[quoteType];
  const title = quoteType === "rv" ? "CBA Glass RV quote request" : "CBA Glass quote request";
  const src = `https://link.eic.agency/widget/form/${formId}`;

  return (
    <div style={{ width: "100%", minWidth: 0 }}>
      {/* Unique IDs keep the contact and popup instances independently resizable.
          HighLevel owns validation, consent, submission and confirmation. */}
      <iframe
        key={formId}
        id={`inline-${formId}-${placement}`}
        title={title}
        src={src}
        style={{ width: "100%", height: "1100px", border: "none", borderRadius: "4px", display: "block" }}
        data-layout='{"id":"INLINE"}'
        data-trigger-type="alwaysShow"
        data-trigger-value=""
        data-activation-type="alwaysActivated"
        data-activation-value=""
        data-deactivation-type="neverDeactivate"
        data-deactivation-value=""
        data-form-name={title}
        data-form-id={formId}
        data-layout-iframe-id={`inline-${formId}-${placement}`}
      />
      <Script src="https://link.msgsndr.com/js/form_embed.js" strategy="afterInteractive" />
      <p style={{ fontSize: "0.875rem", color: "var(--text-muted)", marginTop: "1rem" }}>
        Trouble loading the form? <a href={src} target="_blank" rel="noopener noreferrer">Open the quote form</a> or <a href="tel:6232171310">call (623) 217-1310</a>.
      </p>
    </div>
  );
}
