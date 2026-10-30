import Link from "next/link";
import type { Metadata } from "next";
import { HOW_IT_WORKS } from "@/lib/plans-data";
import { BrandValues } from "@/components/home/brand-values";

export const metadata: Metadata = {
  title: "How It Works",
  description: "How to order NutriGhar healthy meals: message us, fill a short consultation, confirm your package and start.",
};

export default function HowItWorksPage() {
  return (
    <>
      <section className="bg-gradient-to-b from-ng-cream to-white">
        <div className="container-ng py-16 text-center lg:py-20">
          <p className="eyebrow">How to Order</p>
          <h1 className="heading-display mx-auto mt-3 max-w-3xl">
            Order in four easy steps
          </h1>
          <p className="body-muted mx-auto mt-4 max-w-2xl text-lg">
            Message us, share your goals, confirm your package and your meals arrive at your doorstep.
          </p>
        </div>
      </section>

      <section className="pb-16 sm:pb-20">
        <div className="container-ng">
          <ol className="mx-auto max-w-3xl space-y-6">
            {HOW_IT_WORKS.map((step, index) => (
              <li key={step.step} className="relative flex gap-5 rounded-2xl border border-ng-line/70 bg-white p-6 shadow-[var(--shadow-soft)]">
                {index < HOW_IT_WORKS.length - 1 ? (
                  <span
                    className="absolute left-[2.15rem] top-20 hidden h-[calc(100%-1rem)] w-px bg-ng-mist sm:block"
                    aria-hidden
                  />
                ) : null}
                <span className="relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-ng-forest text-lg font-bold text-white">
                  {step.step}
                </span>
                <div>
                  <h2 className="text-xl font-semibold text-ng-forest">{step.title}</h2>
                  <p className="mt-2 text-sm leading-relaxed text-ng-muted sm:text-base">{step.description}</p>
                </div>
              </li>
            ))}
          </ol>

          <div className="mt-12 text-center">
            <Link href="/plans" className="btn-primary btn-lg">
              View Packages
            </Link>
          </div>
        </div>
      </section>

      <BrandValues />
    </>
  );
}
