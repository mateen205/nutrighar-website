import Link from "next/link";
import { HOW_IT_WORKS } from "@/lib/plans-data";

export function HowItWorksPreview() {
  return (
    <section className="section-pad">
      <div className="container-ng">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <div className="max-w-xl">
            <p className="eyebrow">How to Order</p>
            <h2 className="heading-section mt-3">Four easy steps to begin</h2>
            <p className="body-muted mt-3">
              Message us, tell us your goal, confirm your package and start your healthy journey.
            </p>
          </div>
          <Link href="/how-it-works" className="btn-secondary">
            Full process
          </Link>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {HOW_IT_WORKS.map((item) => (
            <article key={item.step} className="relative rounded-2xl border border-ng-line/70 bg-ng-cream/60 p-6">
              <span className="script text-4xl text-ng-soft">{item.step}</span>
              <h3 className="mt-3 text-lg font-semibold text-ng-forest">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ng-muted">{item.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
