import { NUTRIGHAR_RULES } from "@/lib/plans-data";

export function RulesSection() {
  return (
    <section className="section-pad">
      <div className="container-ng">
        <div className="grid items-start gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4 lg:sticky lg:top-28">
            <p className="eyebrow">Rules &amp; Guidelines</p>
            <h2 className="heading-section mt-3">
              Simple rules. <span className="script text-3xl text-ng-leaf">Better results.</span>
            </h2>
            <p className="body-muted mt-4">
              Please read these before you order. They help us serve you well and help you get the best results from your plan.
            </p>
          </div>

          <ol className="grid grid-cols-1 gap-2.5 sm:grid-cols-2 sm:gap-3 lg:col-span-8">
            {NUTRIGHAR_RULES.map((rule, index) => (
              <li
                key={rule}
                className="flex gap-3 rounded-xl border border-ng-line/70 bg-white p-3.5 shadow-[var(--shadow-soft)] sm:gap-4 sm:rounded-2xl sm:p-4"
              >
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-ng-forest text-[11px] font-bold text-white sm:h-9 sm:w-9 sm:text-xs">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <p className="pt-1 text-sm leading-relaxed text-ng-ink">{rule}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
