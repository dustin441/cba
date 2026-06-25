import { HelpCircle } from "lucide-react";
import styles from "./FAQ.module.css";

const FAQS = [
  {
    question: "Do you work with insurance?",
    answer:
      "Yes. CBA Glass helps you through the insurance claim process and can join a 3-way call with your provider so the claim is set up correctly.",
  },
  {
    question: "Can my insurance company force me to use Safelite or another shop?",
    answer:
      "No. In Arizona, you have the right to choose the auto glass shop you trust. If a carrier or third-party administrator points you somewhere else, call CBA Glass and we can help walk through the claim.",
  },
  {
    question: "Will I have to pay my deductible?",
    answer:
      "Deductibles depend on your specific policy and coverage. Many Arizona drivers have glass coverage that can reduce or eliminate out-of-pocket cost, and we can help confirm that during the claim call.",
  },
  {
    question: "Do you provide mobile service?",
    answer:
      "Yes. CBA Glass provides mobile service across the Phoenix Valley, including Maricopa and Pinal County communities. We come to your home, work, yard, or job site whenever possible.",
  },
  {
    question: "How quickly can you replace my windshield?",
    answer:
      "In many cases, same-day or next-day service is available. Specialty glass, RV windshields, classic vehicles, and luxury/exotic glass may require additional sourcing time.",
  },
  {
    question: "Do you handle RVs, classics, and heavy equipment?",
    answer:
      "Yes. CBA Glass handles everyday passenger vehicles plus RVs, classic cars, luxury/exotic vehicles, Tesla glass, and heavy equipment or machinery glass.",
  },
  {
    question: "Do you handle calibration after windshield replacement?",
    answer:
      "Yes. For vehicles with ADAS safety cameras and sensors, CBA Glass can support mobile calibration requirements after windshield replacement.",
  },
];

export default function FAQ() {
  return (
    <section className="section-padding" id="faq">
      <div className="container">
        <div className={styles.header}>
          <div className="section-label">FAQ</div>
          <h2 className="section-title">
            Auto Glass Questions, <span className="text-gradient">Answered.</span>
          </h2>
          <p className="section-description">
            Quick answers about mobile service, insurance claims, deductibles, and specialty glass work.
          </p>
        </div>

        <div className={styles.grid}>
          {FAQS.map((item) => (
            <article key={item.question} className={`glass ${styles.card}`}>
              <div className={styles.iconWrap}>
                <HelpCircle size={20} />
              </div>
              <div>
                <h3 className={styles.question}>{item.question}</h3>
                <p className={styles.answer}>{item.answer}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
