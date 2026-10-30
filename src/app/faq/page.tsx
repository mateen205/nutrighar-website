import Link from "next/link";
import type { Metadata } from "next";
import { FaqItem } from "@/components/ui/faq-item";
import { FAQS, DISCLAIMER } from "@/lib/plans-data";

export const metadata: Metadata = {
  title: "FAQ",
  description: "Answers to common questions about NutriGhar plans, payments, personalization, and support.",
};

export default function FaqPage() {
  return (
    <>
      <section className="bg-gradient-to-b from-ng-cream to-white">
        <div className="container-ng py-16 text-center lg:py-20">
          <p className="eyebrow">FAQ</p>
          <h1 className="heading-display mt-3">Questions, answered clearly</h1>
          <p className="body-muted mx-auto mt-4 max-w-2xl text-lg">
            Everything you need to know before starting — and while you&apos;re on the journey.
          </p>
        </div>
      </section>

      <section className="pb-16 sm:pb-20">
        <div className="container-ng max-w-3xl">
          <div className="card-ng px-5 sm:px-7">
            {FAQS.map((faq) => (
              <FaqItem key={faq.question} question={faq.question} answer={faq.answer} />
            ))}
          </div>

          <div className="mt-10 rounded-2xl bg-ng-cream p-6 text-center sm:p-8">
            <h2 className="text-xl font-semibold text-ng-forest">Still have a question?</h2>
            <p className="body-muted mt-2">We&apos;re happy to help you choose the right plan.</p>
            <Link href="/contact" className="btn-primary mt-5 inline-flex">
              Contact Support
            </Link>
          </div>

          <p className="mt-8 text-xs leading-relaxed text-ng-muted/80">{DISCLAIMER}</p>
        </div>
      </section>
    </>
  );
}
