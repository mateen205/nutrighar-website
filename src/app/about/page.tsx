import Link from "next/link";
import type { Metadata } from "next";
import { HeartHandshake, Leaf, Scale, Truck } from "lucide-react";
import { SafeImage } from "@/components/ui/safe-image";
import { DISCLAIMER } from "@/lib/plans-data";

export const metadata: Metadata = {
  title: "About NutriGhar",
  description:
    "NutriGhar is a healthy food provider offering fresh, home-style, nutrition-based meals for your fitness and wellness goals.",
};

const VALUES = [
  {
    icon: Leaf,
    title: "Fresh & home-style",
    text: "Fresh, hygienic ingredients cooked the way home food should taste.",
  },
  {
    icon: Scale,
    title: "Calorie-checked",
    text: "Balanced meals for both weight loss and weight gain, matched to your goals.",
  },
  {
    icon: HeartHandshake,
    title: "Personalized",
    text: "Every plan is customized after a proper consultation for your body and needs.",
  },
  {
    icon: Truck,
    title: "Doorstep delivery",
    text: "Prepared with care and delivered to your door, so healthy eating stays easy.",
  },
];

export default function AboutPage() {
  return (
    <>
      <section className="relative overflow-hidden bg-gradient-to-br from-ng-cream via-white to-ng-mist/30">
        <div className="container-ng grid items-center gap-10 py-16 lg:grid-cols-2 lg:py-24">
          <div>
            <p className="eyebrow">About NutriGhar</p>
            <h1 className="heading-display mt-3">
              Healthy Meals. <span className="script text-ng-leaf">Happier You.</span>
            </h1>
            <p className="body-muted mt-5 text-lg">
              NutriGhar is your go-to healthy food provider, offering fresh, home-style and nutrition-based meals
              designed for your fitness and wellness goals.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/plans" className="btn-primary">
                View Packages
              </Link>
              <Link href="/how-it-works" className="btn-secondary">
                How to Order
              </Link>
            </div>
          </div>
          <div className="relative">
            <div className="overflow-hidden rounded-2xl border border-ng-line/60 shadow-[var(--shadow-card)]">
              <SafeImage
                src="/images/hero-bowl.jpg"
                alt="Fresh balanced NutriGhar meal bowl"
                width={720}
                height={540}
                className="aspect-[4/3] w-full object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      <section className="section-pad">
        <div className="container-ng max-w-3xl">
          <h2 className="heading-section">Who we are</h2>
          <div className="prose-ng mt-5">
            <p>
              We provide balanced and calorie-checked meals for both weight loss and weight gain, prepared with care
              and delivered to your doorstep.
            </p>
            <p>
              Our meals are customized after a proper consultation to match your body needs and goals. Good food,
              better choices, healthier you.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-ng-cream py-16 sm:py-20">
        <div className="container-ng">
          <div className="mx-auto max-w-2xl text-center">
            <p className="eyebrow">What we stand for</p>
            <h2 className="heading-section mt-3">Why people choose NutriGhar</h2>
          </div>
          <div className="mt-10 grid gap-5 sm:grid-cols-2">
            {VALUES.map((v) => (
              <article key={v.title} className="card-ng p-6">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-ng-mist text-ng-deep">
                  <v.icon className="h-5 w-5" />
                </div>
                <h3 className="mt-4 text-lg font-semibold text-ng-forest">{v.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ng-muted">{v.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad">
        <div className="container-ng max-w-3xl text-center">
          <p className="script text-3xl text-ng-leaf">A note on health</p>
          <p className="body-muted mt-4 text-left sm:text-center">{DISCLAIMER}</p>
          <Link href="/contact" className="btn-primary mt-8 inline-flex">
            Contact NutriGhar
          </Link>
        </div>
      </section>
    </>
  );
}
