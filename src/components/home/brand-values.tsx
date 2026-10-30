import { Flame, Heart, Scale, Smile, Utensils, Zap } from "lucide-react";
import { KEY_BENEFITS } from "@/lib/plans-data";

const ICONS = {
  scale: Scale,
  zap: Zap,
  flame: Flame,
  utensils: Utensils,
  heart: Heart,
  smile: Smile,
} as const;

export function BrandValues() {
  return (
    <section className="section-pad bg-ng-cream">
      <div className="container-ng">
        <div className="mx-auto max-w-2xl text-center">
          <p className="eyebrow">Good Food · Better Choices</p>
          <h2 className="heading-section mt-3">
            Key <span className="script text-ng-leaf">Benefits</span>
          </h2>
          <p className="body-muted mt-3 text-sm sm:mt-4 sm:text-base">
            Healthy meals that taste great and keep you on track with your fitness goals.
          </p>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-3 sm:mt-10 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
          {KEY_BENEFITS.map((item) => {
            const Icon = ICONS[item.icon as keyof typeof ICONS] || Heart;
            return (
              <article
                key={item.title}
                className="card-ng group relative flex items-center gap-4 overflow-hidden p-5 transition hover:-translate-y-0.5 hover:shadow-[var(--shadow-card)]"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-ng-forest text-white">
                  <Icon className="h-5 w-5" strokeWidth={1.75} />
                </div>
                <h3 className="text-base font-semibold text-ng-forest">{item.title}</h3>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
