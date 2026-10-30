import type { Metadata } from "next";
import Link from "next/link";
import { PlansGrid } from "@/components/plans/plans-grid";
import { BrandValues } from "@/components/home/brand-values";
import { getActivePlans } from "@/lib/plans";
import { DISCLAIMER } from "@/lib/plans-data";

export const metadata: Metadata = {
  title: "Our Plans",
  description:
    "NutriGhar meal packages: Basic PKR 7,500 (1 week), Standard PKR 14,000 (2 weeks), Premium PKR 20,000 (3 weeks) and a Custom Plan made just for you.",
};

export const dynamic = "force-dynamic";

export default async function PlansPage() {
  const plans = await getActivePlans();

  return (
    <>
      <section className="bg-gradient-to-b from-ng-cream to-white">
        <div className="container-ng py-10 text-center sm:py-14 lg:py-16">
          <p className="eyebrow">Our Packages</p>
          <h1 className="heading-display mx-auto mt-3 max-w-3xl text-[1.75rem] leading-tight sm:text-4xl lg:text-5xl">
            Choose Your Meal Plan
          </h1>
          <p className="body-muted mx-auto mt-4 max-w-2xl text-sm sm:text-base lg:text-lg">
            Fresh, calorie-checked, home-style meals delivered to your doorstep. Pick a ready package or ask for a Custom Plan made just for you.
          </p>
          <div className="mt-6 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <Link href="/contact" className="btn-secondary min-h-11 w-full touch-manipulation sm:w-auto">
              Need help choosing?
            </Link>
            <Link href="/how-it-works" className="btn-ghost min-h-11 w-full touch-manipulation sm:w-auto">
              How it works
            </Link>
          </div>
        </div>
      </section>

      <section className="pb-12 sm:pb-16 lg:pb-20">
        <div className="container-ng">
          {plans.length === 0 ? (
            <div className="rounded-2xl border border-ng-line bg-white px-6 py-16 text-center">
              <p className="text-lg font-semibold text-ng-forest">Plans are being prepared</p>
              <p className="mt-2 text-sm text-ng-muted">Please refresh in a moment or contact support.</p>
              <Link href="/contact" className="btn-primary mt-6 inline-flex">
                Contact us
              </Link>
            </div>
          ) : (
            <PlansGrid plans={plans} />
          )}

          <div className="mt-10 rounded-2xl border border-ng-line/70 bg-ng-cream/60 p-5 sm:p-6">
            <h2 className="text-base font-semibold text-ng-forest sm:text-lg">
              Good food, better choices
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-ng-muted">
              Every meal is balanced and calorie-checked. Please order at least 24–48 hours in advance.
            </p>
            <p className="mt-4 text-xs leading-relaxed text-ng-muted/80">{DISCLAIMER}</p>
          </div>
        </div>
      </section>

      <BrandValues />
    </>
  );
}
