import type { Metadata } from "next";
import { ContactForm } from "@/components/contact/contact-form";

export const metadata: Metadata = { title: "Support" };

export default function SupportPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-ng-forest">Support</h1>
        <p className="mt-1 text-sm text-ng-muted">
          Need a plan change, substitution, or billing help? Send us a note.
        </p>
      </div>
      <ContactForm />
    </div>
  );
}
