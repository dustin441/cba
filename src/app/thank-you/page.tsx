import type { Metadata } from "next";
import Link from "next/link";
import styles from "../legal.module.css";

export const metadata: Metadata = {
  title: "Quote Request Received | CBA Glass",
  description: "Thank you for requesting a quote from CBA Glass.",
  robots: { index: false, follow: false },
};

export default function ThankYouPage() {
  return (
    <main className={styles.page}>
      <div className="container">
        <article className={styles.card}>
          <h1>We received your quote request</h1>
          <p>Thank you for reaching out to CBA Glass. Our team will follow up by phone or text to confirm your vehicle details and help with your quote.</p>
          <section>
            <h2>What happens next?</h2>
            <p>Keep your vehicle identification number (VIN) handy if you have it. It helps our team identify the right glass for your vehicle.</p>
            <p>You do not need to submit the form again. If you need to speak with us, call <a href="tel:6232171310">(623) 217-1310</a>.</p>
          </section>
          <Link className={styles.back} href="/">Back to CBA Glass</Link>
        </article>
      </div>
    </main>
  );
}
