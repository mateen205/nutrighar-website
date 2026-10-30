import { Check } from "lucide-react";
import { WHY_CHOOSE } from "@/lib/plans-data";

export function WhyChooseSection() {
  return (
    <section className="relative overflow-hidden bg-ng-forest py-16 sm:py-20">
      <div className="pointer-events-none absolute -left-20 top-10 h-64 w-64 rounded-full bg-ng-leaf/20 blur-3xl" />
      <div className="pointer-events-none absolute -right-16 bottom-0 h-72 w-72 rounded-full bg-ng-soft/15 blur-3xl" />

      <div className="container-ng relative">
        <div className="mx-auto max-w-3xl text-center">
          <p className="script text-3xl text-ng-soft sm:text-4xl">Eat better, feel better!</p>
          <h2 className="mt-4 text-2xl font-bold leading-snug text-white sm:text-3xl">Why Choose NutriGhar?</h2>
        </div>

        <ul className="mx-auto mt-10 grid max-w-4xl grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {WHY_CHOOSE.map((point) => (
            <li
              key={point}
              className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-4 backdrop-blur-sm"
            >
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-ng-soft text-ng-forest">
                <Check className="h-4 w-4" strokeWidth={3} />
              </span>
              <p className="text-sm font-medium text-white/90">{point}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
