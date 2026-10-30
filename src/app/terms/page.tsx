import type { Metadata } from "next";
import { DISCLAIMER } from "@/lib/plans-data";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description: "Terms governing use of NutriGhar website, plans, and related services.",
};

export default function TermsPage() {
  return (
    <section className="section-pad">
      <div className="container-ng max-w-3xl">
        <p className="eyebrow">Legal</p>
        <h1 className="heading-display mt-3">Terms & Conditions</h1>
        <p className="body-muted mt-3">Last updated: March 2026</p>

        <div className="prose-ng mt-10">
          <h2>1. Agreement</h2>
          <p>
            By accessing NutriGhar or purchasing a plan, you agree to these Terms & Conditions. If you do not agree,
            please do not use the service.
          </p>

          <h2>2. Services</h2>
          <p>
            NutriGhar provides fresh, home-style, calorie-checked meal plans delivered to your doorstep. Our meals and
            nutrition support are not a substitute for medical advice, diagnosis, or treatment.
          </p>

          <h2>3. Accounts</h2>
          <p>
            You are responsible for maintaining the confidentiality of your login credentials and for activity under
            your account. Provide accurate information when registering or checking out.
          </p>

          <h2>4. Plans, pricing & payments</h2>
          <p>
            Plan features and pricing are shown on our plans page and may change for future orders. Orders must be placed
            at least 24–48 hours in advance. Your order is confirmed, and payment arranged, with you directly on WhatsApp
            or by phone.
          </p>

          <h2>5. Subscriptions</h2>
          <p>
            Each plan runs for its stated duration (Basic 7 days, Standard 14 days, Premium 21 days; Custom plans
            vary). There is no cancellation or refund once the meal plan starts. Please tell us about any allergies or
            medical conditions before you start.
          </p>

          <h2>6. Acceptable use</h2>
          <p>
            You agree not to misuse the platform, attempt unauthorized access, reverse engineer protected systems, or
            use NutriGhar content in unlawful ways.
          </p>

          <h2>7. Health disclaimer</h2>
          <p>{DISCLAIMER}</p>

          <h2>8. Limitation of liability</h2>
          <p>
            To the fullest extent permitted by law, NutriGhar is not liable for indirect, incidental, or consequential
            damages arising from use of the service. Our total liability for any claim related to a purchase is limited
            to the amount you paid for the relevant plan period.
          </p>

          <h2>9. Changes</h2>
          <p>
            We may update these terms from time to time. Continued use after changes constitutes acceptance of the
            revised terms.
          </p>

          <h2>10. Contact</h2>
          <p>For questions about these terms, contact nutrighar7@gmail.com.</p>
        </div>
      </div>
    </section>
  );
}
