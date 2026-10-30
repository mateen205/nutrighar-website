import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How NutriGhar collects, uses, and protects your personal information.",
};

export default function PrivacyPage() {
  return (
    <section className="section-pad">
      <div className="container-ng max-w-3xl">
        <p className="eyebrow">Legal</p>
        <h1 className="heading-display mt-3">Privacy Policy</h1>
        <p className="body-muted mt-3">Last updated: March 2026</p>

        <div className="prose-ng mt-10">
          <h2>1. Who we are</h2>
          <p>
            NutriGhar (&quot;we&quot;, &quot;us&quot;) provides healthy, calorie-checked meal plans and nutrition support
            through our website and related services. This policy explains how we handle personal information.
          </p>

          <h2>2. Information we collect</h2>
          <p>We may collect:</p>
          <ul className="list-disc space-y-1 pl-5">
            <li>Account details such as name, email, phone, and password (stored as a secure hash)</li>
            <li>Order and subscription information</li>
            <li>Payment status metadata from payment providers (we do not store full card numbers)</li>
            <li>Messages you send through contact forms</li>
            <li>Basic technical logs needed to operate and secure the service</li>
          </ul>

          <h2>3. How we use information</h2>
          <p>We use your information to:</p>
          <ul className="list-disc space-y-1 pl-5">
            <li>Create and manage your account</li>
            <li>Process orders and subscriptions</li>
            <li>Prepare and deliver your meal plan and provide customer support</li>
            <li>Improve our services and keep the platform secure</li>
            <li>Send important service communications</li>
          </ul>

          <h2>4. Sharing</h2>
          <p>
            We do not sell personal data. We may share limited information with trusted processors (for example payment
            providers or hosting services) solely to operate NutriGhar, subject to appropriate safeguards.
          </p>

          <h2>5. Security</h2>
          <p>
            We use industry-standard practices such as hashed passwords, HTTP-only session cookies, server-side
            validation, and least-privilege database access. No method of transmission is perfectly secure, but we work
            continuously to protect your information.
          </p>

          <h2>6. Your choices</h2>
          <p>
            You may request access, correction, or deletion of your account information by contacting us at
            nutrighar7@gmail.com. Some records may be retained where required for legal, accounting, or security reasons.
          </p>

          <h2>7. Contact</h2>
          <p>
            Questions about this policy? Email nutrighar7@gmail.com or write to NutriGhar, Faisalabad, Pakistan.
          </p>
        </div>
      </div>
    </section>
  );
}
