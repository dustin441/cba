import type { Metadata } from "next";
import Link from "next/link";
import styles from "../legal.module.css";

export const metadata: Metadata = {
  title: "Privacy Policy | CBA Glass",
  description: "How CBA Glass collects and uses information submitted through its website.",
};

export default function PrivacyPage() {
  return (
    <main className={styles.page}>
      <div className="container">
        <article className={styles.card}>
          <Link className={styles.back} href="/">Back to CBA Glass</Link>
          <h1>Privacy Policy</h1>
          <p className={styles.updated}>Last updated August 10, 2026</p>

          <section>
            <h2>Information we collect</h2>
            <p>
              When you request a quote or contact CBA Glass, we may collect your name, email address, phone number, vehicle information, insurance information, service details, and communication preferences.
            </p>
          </section>

          <section>
            <h2>How we use information</h2>
            <p>
              We use submitted information to respond to requests, prepare estimates, coordinate service, assist with insurance claims, provide customer support, and improve our services. Information may be stored and processed through service providers that support our website, customer relationship management, communications, and analytics.
            </p>
          </section>

          <section>
            <h2>Calls and text messages</h2>
            <p>
              If you provide consent, CBA Glass may call or text you about your request. Consent is not a condition of purchase. Message frequency varies. Message and data rates may apply. Reply STOP to opt out of text messages or HELP for help.
            </p>
          </section>

          <section>
            <h2>Sharing and retention</h2>
            <p>
              CBA Glass does not sell your phone number or messaging consent. We may share information with service providers as needed to operate the business, fulfill your request, comply with law, or protect legal rights. We retain information only as long as reasonably necessary for these purposes.
            </p>
          </section>

          <section>
            <h2>Your choices</h2>
            <p>
              You may request access, correction, or deletion of your information by contacting CBA Glass. Some records may be retained where required for business, legal, warranty, or compliance purposes.
            </p>
          </section>

          <section>
            <h2>Contact</h2>
            <p>
              Email <a href="mailto:cbaglass@gmail.com">cbaglass@gmail.com</a> or call <a href="tel:6232171310">(623) 217-1310</a> with privacy questions.
            </p>
          </section>
        </article>
      </div>
    </main>
  );
}
