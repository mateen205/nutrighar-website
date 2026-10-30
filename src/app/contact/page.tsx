import type { Metadata } from "next";
import { Mail, MapPin, Phone } from "lucide-react";
import { ContactForm } from "@/components/contact/contact-form";
import { SITE, whatsappLink } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with the NutriGhar team for plan questions, support, or partnership inquiries.",
};

export default function ContactPage() {
  return (
    <>
      <section className="bg-gradient-to-b from-ng-cream to-white">
        <div className="container-ng py-16 lg:py-20">
          <p className="eyebrow">Contact</p>
          <h1 className="heading-display mt-3">We&apos;d love to hear from you</h1>
          <p className="body-muted mt-4 max-w-2xl text-lg">
            Questions about our meal plans or how to order? Message us on WhatsApp or send a note below.
          </p>
        </div>
      </section>

      <section className="pb-16 sm:pb-20">
        <div className="container-ng grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <div className="space-y-5">
              <div className="card-ng flex gap-4 p-5">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-ng-mist text-ng-deep">
                  <Phone className="h-5 w-5" />
                </span>
                <div>
                  <h2 className="font-semibold text-ng-forest">Phone</h2>
                  <a href={`tel:${SITE.phoneTel}`} className="mt-1 block text-sm text-ng-muted hover:text-ng-forest">
                    {SITE.phoneDisplay}
                  </a>
                  <a
                    href={whatsappLink("Hi NutriGhar!")}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-1 block text-sm font-medium text-ng-leaf hover:underline"
                  >
                    Chat on WhatsApp
                  </a>
                </div>
              </div>
              <div className="card-ng flex gap-4 p-5">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-ng-mist text-ng-deep">
                  <Mail className="h-5 w-5" />
                </span>
                <div>
                  <h2 className="font-semibold text-ng-forest">Email</h2>
                  <a href={`mailto:${SITE.email}`} className="mt-1 block text-sm text-ng-muted hover:text-ng-forest">
                    {SITE.email}
                  </a>
                </div>
              </div>
              <div className="card-ng flex gap-4 p-5">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-ng-mist text-ng-deep">
                  <MapPin className="h-5 w-5" />
                </span>
                <div>
                  <h2 className="font-semibold text-ng-forest">Location</h2>
                  <p className="mt-1 text-sm text-ng-muted">{SITE.location}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7">
            <ContactForm />
          </div>
        </div>
      </section>
    </>
  );
}
