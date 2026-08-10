import type { Metadata } from "next";
import Link from "next/link";
import styles from "../legal.module.css";

export const metadata: Metadata = {
  title: "Terms of Use | CBA Glass",
  description: "Terms governing use of the CBA Glass website and quote request services.",
};

export default function TermsPage() {
  return (
    <main className={styles.page}>
      <div className="container">
        <article className={styles.card}>
          <Link className={styles.back} href="/">Back to CBA Glass</Link>
          <h1>Terms of Use</h1>
          <p className={styles.updated}>Last updated August 10, 2026</p>

          <section>
            <h2>Website use</h2>
            <p>
              This website provides general information about CBA Glass and allows visitors to request information or a quote. You agree to provide accurate information and not misuse the website, interfere with its operation, or submit information without authorization.
            </p>
          </section>

          <section>
            <h2>Quotes and service</h2>
            <p>
              Online submissions are requests for follow-up and are not binding estimates or service appointments. Pricing, availability, glass selection, calibration requirements, insurance coverage, and scheduling are confirmed directly by CBA Glass before service.
            </p>
          </section>

          <section>
            <h2>Communications</h2>
            <p>
              If you provide consent, CBA Glass may contact you by phone or text about your request. Consent is not a condition of purchase. Message frequency varies. Message and data rates may apply. Reply STOP to opt out of text messages or HELP for help.
            </p>
          </section>

          <section>
            <h2>Website content</h2>
            <p>
              Website content is provided for general informational purposes. Vehicle safety, installation, calibration, warranty, and insurance decisions should be confirmed with a qualified CBA Glass representative and, where appropriate, the vehicle manufacturer or insurance provider.
            </p>
          </section>

          <section>
            <h2>Contact</h2>
            <p>
              Email <a href="mailto:cbaglass@gmail.com">cbaglass@gmail.com</a> or call <a href="tel:6232171310">(623) 217-1310</a> with questions about these terms.
            </p>
          </section>
        </article>
      </div>
    </main>
  );
}
