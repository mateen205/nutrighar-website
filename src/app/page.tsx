import Link from "next/link";
import { Check, Leaf, MessageCircle, Play, Truck } from "lucide-react";
import { BrandValues } from "@/components/home/brand-values";
import { HowItWorksPreview } from "@/components/home/how-it-works-preview";
import { ReviewsSection } from "@/components/home/reviews-section";
import { VoiceNotePlayer } from "@/components/home/voice-note-player";
import { RulesSection } from "@/components/home/rules-section";
import { WhyChooseSection } from "@/components/home/why-choose-section";
import { PlansGrid } from "@/components/plans/plans-grid";
import { SafeImage } from "@/components/ui/safe-image";
import { getActivePlans } from "@/lib/plans";
import { DISCLAIMER, WHAT_WE_OFFER } from "@/lib/plans-data";
import { REVIEWS } from "@/lib/reviews";
import { SITE, whatsappLink } from "@/lib/site";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const plans = await getActivePlans();
  const featured = REVIEWS.find((r) => r.audio);

  return (
    <>
      {/* PHONE HERO: one full-screen picture with the two buttons on it. The navbar sits
          see-through on top. The key styling is inline so it cannot go missing. Hidden on large screens. */}
      <section className="ng-hero-m lg:hidden" style={{ position: "relative", overflow: "hidden", background: "#1b4332" }}>
        <style>{`.ng-hero-m { min-height: 100vh; min-height: 100svh; }`}</style>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/hero-bowl.jpg"
          alt="Fresh balanced NutriGhar meal bowl"
          style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", objectFit: "cover" }}
        />
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background:
              "linear-gradient(to bottom, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0) 22%), linear-gradient(to top, rgba(20,50,38,0.92) 0%, rgba(20,50,38,0.55) 24%, rgba(20,50,38,0) 52%)",
          }}
        />
        <h1
          style={{
            position: "absolute",
            width: 1,
            height: 1,
            margin: -1,
            padding: 0,
            overflow: "hidden",
            clip: "rect(0,0,0,0)",
            whiteSpace: "nowrap",
            border: 0,
          }}
        >
          NutriGhar: Healthy Meals. Happier You.
        </h1>
        <div
          className="container-ng"
          style={{ position: "absolute", left: 0, right: 0, bottom: 0, paddingBottom: "calc(1.75rem + env(safe-area-inset-bottom))" }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", maxWidth: "26rem", margin: "0 auto" }}>
            <Link
              href="/plans"
              style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "3.25rem", borderRadius: "9999px", background: "#ffffff", color: "#1b4332", fontSize: "1rem", fontWeight: 700, textDecoration: "none" }}
            >
              View Packages
            </Link>
            <a
              href={whatsappLink("Hi NutriGhar! I'd like to know more about your meal plans.")}
              target="_blank"
              rel="noreferrer"
              style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "3.25rem", borderRadius: "9999px", border: "1px solid rgba(255,255,255,0.8)", background: "rgba(0,0,0,0.25)", color: "#ffffff", fontSize: "1rem", fontWeight: 700, textDecoration: "none" }}
            >
              Order on WhatsApp
            </a>
          </div>
        </div>
      </section>

      <section className="relative hidden overflow-hidden bg-gradient-to-br from-ng-cream via-white to-ng-mist/30 lg:block">
        <div className="container-ng relative grid items-center gap-8 py-10 sm:gap-10 sm:py-14 lg:grid-cols-2 lg:gap-12 lg:py-20">
          <div className="max-w-xl">
            <p className="eyebrow">Good Food · Better Choices · Healthier You</p>
            <h1 className="mt-3 text-[1.85rem] font-bold leading-[1.15] tracking-tight text-ng-forest sm:text-4xl lg:text-[3.1rem]">
              Healthy Meals. Happier You.
            </h1>
            <p className="mt-4 text-sm leading-relaxed text-ng-muted sm:text-base lg:text-lg">
              NutriGhar is your go-to healthy food provider. Fresh, home-style, calorie-checked meals for weight
              loss and weight gain, prepared with care and delivered to your doorstep.
            </p>

            <div className="mt-6 flex flex-col gap-3 sm:mt-8 sm:flex-row sm:flex-wrap">
              <Link href="/plans" className="btn-primary btn-lg min-h-12 w-full touch-manipulation sm:w-auto">
                View Packages
              </Link>
              <a
                href={whatsappLink("Hi NutriGhar! I'd like to know more about your meal plans.")}
                target="_blank"
                rel="noreferrer"
                className="btn-secondary btn-lg min-h-12 w-full touch-manipulation sm:w-auto"
              >
                Order on WhatsApp
              </a>
            </div>

            <div className="mt-8 grid grid-cols-1 gap-3 text-sm text-ng-muted xs:grid-cols-3 sm:flex sm:flex-wrap sm:gap-5">
              <div className="flex items-center gap-2">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-ng-mist text-ng-deep">
                  <Leaf className="h-4 w-4" />
                </span>
                Fresh &amp; Home-style
              </div>
              <div className="flex items-center gap-2">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-ng-mist text-ng-deep">
                  <Check className="h-4 w-4" />
                </span>
                Calorie-checked
              </div>
              <div className="flex items-center gap-2">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-ng-mist text-ng-deep">
                  <Truck className="h-4 w-4" />
                </span>
                Doorstep delivery
              </div>
            </div>

            {featured ? (
              <a
                href="#reviews"
                className="mt-6 inline-flex min-h-12 items-center gap-3 rounded-full border border-ng-line bg-white py-2 pl-2 pr-5 shadow-[var(--shadow-soft)]"
              >
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-ng-forest text-white">
                  <Play className="h-4 w-4 fill-current" />
                </span>
                <span className="text-left">
                  <span className="block text-sm font-semibold text-ng-forest">Hear from our customers</span>
                  <span className="block text-xs text-ng-muted">Real voice notes</span>
                </span>
              </a>
            ) : null}
          </div>

          <div className="relative mx-auto w-full max-w-md lg:max-w-none">
            <div className="overflow-hidden rounded-2xl border border-ng-line/50 bg-white shadow-[var(--shadow-card)] sm:rounded-[1.5rem]">
              <SafeImage
                src="/images/hero-bowl.jpg"
                alt="Fresh balanced NutriGhar meal bowl"
                width={720}
                height={720}
                priority
                className="aspect-square w-full object-cover sm:aspect-[4/3] lg:aspect-square"
              />
              <div className="border-t border-ng-line/50 bg-white px-4 py-3">
                <p className="script text-xl text-ng-deep sm:text-2xl">Good Food · Good Mood</p>
                <p className="text-xs text-ng-muted">Balanced, calorie-checked meals for your goals</p>
              </div>
            </div>
            {featured?.audio ? (
              <div className="mt-3 rounded-2xl border border-ng-line bg-white p-3 shadow-[var(--shadow-soft)]">
                <VoiceNotePlayer src={featured.audio} label={`Voice note from ${featured.name}`} />
                <p className="mt-2 px-1 text-xs font-semibold text-ng-forest">
                  {featured.name}
                  {featured.city ? `, ${featured.city}` : ""}
                </p>
              </div>
            ) : null}
          </div>
        </div>
      </section>

      {/* Phone only: the voice note sits right under the banner */}
      {featured?.audio ? (
        <section className="border-b border-ng-line/60 bg-white py-4 lg:hidden">
          <div className="container-ng">
            <VoiceNotePlayer src={featured.audio} label={`Voice note from ${featured.name}`} />
            <p className="mt-2 px-1 text-xs font-semibold text-ng-forest">
              {featured.name}
              {featured.city ? `, ${featured.city}` : ""} · tap to listen
            </p>
          </div>
        </section>
      ) : null}

      <section className="bg-ng-cream/50 section-pad" id="plans">
        <div className="container-ng">
          <div className="mx-auto max-w-2xl text-center">
            <p className="eyebrow">Our Packages</p>
            <h2 className="heading-section mt-3">Choose your meal plan</h2>
            <p className="body-muted mt-3 text-sm sm:text-base">
              From a one-week healthy start to a plan made just for you.
            </p>
          </div>
          <div className="mt-8 sm:mt-10">
            <PlansGrid plans={plans} />
          </div>
        </div>
      </section>

      <ReviewsSection />

      <HowItWorksPreview />

      <section className="section-pad">
        <div className="container-ng grid items-start gap-10 lg:grid-cols-2">
          <div>
            <p className="eyebrow">About NutriGhar</p>
            <h2 className="heading-section mt-3">Healthy food, made with care</h2>
            <p className="body-muted mt-4">
              We provide balanced and calorie-checked meals for both weight loss and weight gain, prepared with care
              and delivered to your doorstep. Every meal plan is customized after a proper consultation to match your
              body needs and goals.
            </p>
          </div>
          <div className="card-ng p-6">
            <h3 className="text-lg font-semibold text-ng-forest">What We Offer</h3>
            <ul className="mt-4 space-y-3">
              {WHAT_WE_OFFER.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm text-ng-ink">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-ng-mist text-ng-deep">
                    <Check className="h-3 w-3" strokeWidth={3} />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <BrandValues />
      <WhyChooseSection />
      <RulesSection />

      <section className="section-pad bg-ng-cream">
        <div className="container-ng">
          <div className="rounded-2xl bg-white px-5 py-10 text-center shadow-[var(--shadow-soft)] sm:px-10 sm:py-12">
            <p className="script text-2xl text-ng-leaf sm:text-3xl">Healthy food for a better you</p>
            <h2 className="heading-section mt-3">Ready to start?</h2>
            <p className="body-muted mx-auto mt-3 max-w-xl text-sm sm:text-base">
              Message us on WhatsApp or call {SITE.phoneDisplay}. Please order at least 24–48 hours in advance.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:mt-8 sm:flex-row sm:justify-center">
              <a
                href={whatsappLink("Hi NutriGhar! I'd like to order a meal plan.")}
                target="_blank"
                rel="noreferrer"
                className="btn-primary btn-lg min-h-12 w-full touch-manipulation sm:w-auto"
              >
                <MessageCircle className="mr-2 h-5 w-5" />
                WhatsApp Us
              </a>
              <Link href="/plans" className="btn-secondary btn-lg min-h-12 w-full touch-manipulation sm:w-auto">
                View Packages
              </Link>
            </div>
          </div>
          <p className="mx-auto mt-6 max-w-3xl text-center text-xs leading-relaxed text-ng-muted/80">
            {DISCLAIMER}
          </p>
        </div>
      </section>
    </>
  );
}
