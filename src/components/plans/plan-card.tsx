import Link from "next/link";
import { Check } from "lucide-react";
import type { Plan } from "@/db/schema";
import { formatPkr, cn } from "@/lib/utils";
import { whatsappLink } from "@/lib/site";
import { SafeImage } from "@/components/ui/safe-image";

export function PlanCard({ plan, featured }: { plan: Plan; featured?: boolean }) {
  const features = (plan.features as string[]) || [];
  const isPopular = plan.isPopular || featured;
  const isCustom = plan.pricePkr === 0;
  const weeks = Math.round(plan.durationDays / 7);
  const duration = isCustom
    ? "Flexible duration (as per your needs)"
    : `${weeks} ${weeks === 1 ? "Week" : "Weeks"} / ${plan.durationDays} Days`;

  return (
    <article
      className={cn(
        "relative flex h-full flex-col overflow-hidden rounded-2xl border bg-white shadow-[var(--shadow-soft)] transition hover:shadow-[var(--shadow-card)]",
        isPopular ? "border-ng-leaf ring-2 ring-ng-soft/40" : "border-ng-line/80"
      )}
    >
      {isPopular ? (
        <span className="absolute left-3 top-3 z-10 rounded-full bg-ng-forest px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-white">
          Popular
        </span>
      ) : null}

      <div className="relative aspect-[16/10] w-full overflow-hidden bg-ng-cream">
        <SafeImage
          src={plan.imageUrl || "/images/fresh-salad.jpg"}
          alt={`${plan.name} meal inspiration`}
          className="h-full w-full object-cover"
        />
      </div>

      <div className="flex flex-1 flex-col p-4 sm:p-5">
        <div className="mb-3">
          <h3 className="text-lg font-bold text-ng-forest sm:text-xl">{plan.name}</h3>
          {plan.tagline ? <p className="mt-1 text-sm text-ng-muted">{plan.tagline}</p> : null}
        </div>

        <div className="mb-4">
          <div className="flex flex-wrap items-baseline gap-1.5">
            <span className="text-2xl font-bold tracking-tight text-ng-forest sm:text-3xl">
              {isCustom ? "Price on Request" : formatPkr(plan.pricePkr)}
            </span>
          </div>
          <p className="mt-1 text-xs text-ng-muted">{duration}</p>
        </div>

        <ul className="mb-5 flex-1 space-y-2">
          {features.slice(0, 5).map((feature) => (
            <li key={feature} className="flex items-start gap-2 text-sm text-ng-ink">
              <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-ng-mist text-ng-deep">
                <Check className="h-3 w-3" strokeWidth={3} />
              </span>
              <span>{feature}</span>
            </li>
          ))}
        </ul>

        <div className="mt-auto grid gap-2">
          {isCustom ? (
            <a
              href={whatsappLink("Hi NutriGhar! I'm interested in the Custom Plan.")}
              target="_blank"
              rel="noreferrer"
              className="btn-primary w-full min-h-11 touch-manipulation"
            >
              DM for details
            </a>
          ) : (
            <Link
              href={`/checkout?plan=${plan.slug}`}
              className="btn-primary w-full min-h-11 touch-manipulation"
            >
              Order This Plan
            </Link>
          )}
          <Link
            href={`/plans/${plan.slug}`}
            className="btn-ghost w-full min-h-10 text-sm touch-manipulation"
          >
            View details
          </Link>
        </div>
      </div>
    </article>
  );
}
