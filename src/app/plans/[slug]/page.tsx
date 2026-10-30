import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import {
  Check,
  Clock,
  CalendarClock,
  Droplets,
  Salad,
  ShieldAlert,
  Sparkles,
  Users,
} from "lucide-react";
import { FaqItem } from "@/components/ui/faq-item";
import { SafeImage } from "@/components/ui/safe-image";
import { getActivePlans, getPlanBySlug } from "@/lib/plans";
import { formatPkr } from "@/lib/utils";
import { whatsappLink } from "@/lib/site";
import { DISCLAIMER, FAQS } from "@/lib/plans-data";

type Props = { params: Promise<{ slug: string }> };

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const plan = await getPlanBySlug(slug);
  if (!plan) return { title: "Plan" };
  return {
    title: plan.name,
    description: plan.description,
  };
}

export default async function PlanDetailPage({ params }: Props) {
  const { slug } = await params;
  const plan = await getPlanBySlug(slug);
  if (!plan || !plan.isActive) notFound();

  const isCustom = plan.pricePkr === 0;
  const features = (plan.features as string[]) || [];
  const whoIsFor = (plan.whoIsFor as string[]) || [];
  const mealStructure =
    (plan.mealStructure as { name: string; description: string }[]) || [];
  const otherPlans = (await getActivePlans()).filter((p) => p.id !== plan.id).slice(0, 3);

  return (
    <>
      <section className="border-b border-ng-line/60 bg-ng-cream/50">
        <div className="container-ng py-4 text-sm text-ng-muted">
          <Link href="/plans" className="hover:text-ng-forest">
            Plans
          </Link>
          <span className="mx-2">/</span>
          <span className="text-ng-forest">{plan.name}</span>
        </div>
      </section>

      <section className="section-pad pt-10">
        <div className="container-ng grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <div className="relative overflow-hidden rounded-2xl border border-ng-line/70 bg-white shadow-[var(--shadow-soft)]">
              <SafeImage
                src={plan.imageUrl || "/images/plan-standard.jpg"}
                alt={`${plan.name} meal inspiration`}
                width={900}
                height={640}
                className="aspect-[4/3] w-full object-cover"
                priority
              />
              {plan.isPopular ? (
                <span className="absolute left-3 top-3 rounded-full bg-ng-forest px-3 py-1 text-xs font-semibold text-white">
                  Popular
                </span>
              ) : null}
            </div>

            <div className="mt-8">
              <h2 className="heading-section">What&apos;s Included</h2>
              <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                {features.map((f) => (
                  <li key={f} className="flex items-start gap-3 rounded-xl border border-ng-line/70 bg-white p-3.5">
                    <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-ng-mist text-ng-deep">
                      <Check className="h-3.5 w-3.5" strokeWidth={3} />
                    </span>
                    <span className="text-sm text-ng-ink">{f}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <aside className="lg:col-span-5">
            <div className="card-ng sticky top-24 p-6 sm:p-7">
              {plan.isPopular ? (
                <span className="mb-3 inline-flex rounded-full bg-ng-mist px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-ng-deep">
                  Popular choice
                </span>
              ) : null}
              <h1 className="text-3xl font-bold text-ng-forest">{plan.name}</h1>
              {plan.tagline ? <p className="mt-1 text-ng-muted">{plan.tagline}</p> : null}

              <div className="mt-5">
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-bold text-ng-forest">
                    {isCustom ? "Price on Request" : formatPkr(plan.pricePkr)}
                  </span>
                </div>
              </div>

              <div className="mt-5 grid grid-cols-2 gap-3 text-sm">
                <div className="rounded-xl bg-ng-cream px-3 py-3">
                  <div className="flex items-center gap-2 text-ng-muted">
                    <Salad className="h-4 w-4" /> Meals
                  </div>
                  <p className="mt-1 font-semibold text-ng-forest">{plan.mealsPerDay} / day</p>
                </div>
                <div className="rounded-xl bg-ng-cream px-3 py-3">
                  <div className="flex items-center gap-2 text-ng-muted">
                    <Clock className="h-4 w-4" /> Duration
                  </div>
                  <p className="mt-1 font-semibold text-ng-forest">
                    {isCustom ? "Flexible" : `${plan.durationDays} days`}
                  </p>
                </div>
              </div>

              {isCustom ? (
                <a
                  href={whatsappLink("Hi NutriGhar! I'm interested in the Custom Plan.")}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-primary btn-lg mt-6 w-full"
                >
                  DM for details
                </a>
              ) : (
                <Link href={`/checkout?plan=${plan.slug}`} className="btn-primary btn-lg mt-6 w-full">
                  Order This Plan
                </Link>
              )}
              <p className="mt-3 text-center text-xs text-ng-muted">
                Order 24–48 hours in advance · No cancellation or refund once the plan starts
              </p>

              <div className="mt-7 border-t border-ng-line/70 pt-6">
                <h2 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-ng-forest">
                  <Users className="h-4 w-4 text-ng-leaf" /> Who is this for?
                </h2>
                <ul className="mt-3 space-y-2">
                  {whoIsFor.map((item) => (
                    <li key={item} className="flex gap-2 text-sm text-ng-muted">
                      <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-ng-soft" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </aside>
        </div>
      </section>

      {/* Meal structure */}
      <section className="bg-ng-cream/70 py-16">
        <div className="container-ng">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="eyebrow">Meal Structure</p>
              <h2 className="heading-section mt-2">What&apos;s in your plan</h2>
            </div>
            <p className="script text-2xl text-ng-leaf">Eat better, feel better!</p>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {mealStructure.map((meal, idx) => (
              <article key={meal.name} className="rounded-2xl border border-ng-line/60 bg-white p-5">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-ng-forest text-sm font-bold text-white">
                  {idx + 1}
                </span>
                <h3 className="mt-3 font-semibold text-ng-forest">{meal.name}</h3>
                <p className="mt-1.5 text-sm text-ng-muted">{meal.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Rules */}
      <section className="section-pad">
        <div className="container-ng">
          <h2 className="heading-section text-center">Before you order</h2>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {[
              {
                icon: CalendarClock,
                title: "Order in advance",
                text: "Place your order at least 24–48 hours before you want to start.",
              },
              {
                icon: Droplets,
                title: "Stay hydrated",
                text: "Drink at least 8–10 glasses of water a day and follow your meal timing.",
              },
              {
                icon: ShieldAlert,
                title: "No cancellation or refund",
                text: "Once the meal plan starts it cannot be cancelled or refunded. Tell us about any allergies first.",
              },
            ].map((item) => (
              <article key={item.title} className="card-ng p-6">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-ng-mist text-ng-deep">
                  <item.icon className="h-5 w-5" />
                </div>
                <h3 className="mt-4 text-lg font-semibold text-ng-forest">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ng-muted">{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Description */}
      <section className="pb-16">
        <div className="container-ng max-w-3xl">
          <h2 className="heading-section">About this plan</h2>
          <p className="body-muted mt-4 text-[15px] leading-7">{plan.description}</p>
          <p className="mt-6 text-xs leading-relaxed text-ng-muted/80">{DISCLAIMER}</p>
        </div>
      </section>

      {/* FAQ snippet */}
      <section className="border-t border-ng-line/60 bg-ng-cream/40 py-16">
        <div className="container-ng max-w-3xl">
          <h2 className="heading-section text-center">Plan FAQs</h2>
          <div className="card-ng mt-8 px-5">
            {FAQS.slice(0, 4).map((faq) => (
              <FaqItem key={faq.question} question={faq.question} answer={faq.answer} />
            ))}
          </div>
          <div className="mt-6 text-center">
            <Link href="/faq" className="btn-ghost">
              View all FAQs
            </Link>
          </div>
        </div>
      </section>

      {otherPlans.length > 0 ? (
        <section className="section-pad">
          <div className="container-ng">
            <h2 className="heading-section text-center">Compare other plans</h2>
            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              {otherPlans.map((p) => (
                <Link
                  key={p.id}
                  href={`/plans/${p.slug}`}
                  className="card-ng p-5 transition hover:-translate-y-0.5 hover:shadow-[var(--shadow-card)]"
                >
                  <h3 className="font-semibold text-ng-forest">{p.name}</h3>
                  <p className="mt-1 text-sm text-ng-muted">{p.tagline}</p>
                  <p className="mt-3 text-lg font-bold text-ng-deep">
                    {p.pricePkr === 0 ? "Price on Request" : formatPkr(p.pricePkr)}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      ) : null}
    </>
  );
}
