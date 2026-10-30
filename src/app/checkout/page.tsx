import Link from "next/link";
import { redirect } from "next/navigation";
import type { Metadata } from "next";
import { CheckoutForm } from "@/components/checkout/checkout-form";
import { getCurrentUser } from "@/lib/auth";
import { getActivePlans, getPlanBySlug } from "@/lib/plans";
import { whatsappLink } from "@/lib/site";

export const metadata: Metadata = {
  title: "Checkout",
  description: "Place your NutriGhar meal plan order.",
};

type Props = { searchParams: Promise<{ plan?: string }> };

export default async function CheckoutPage({ searchParams }: Props) {
  const { plan: planSlug } = await searchParams;
  const plans = await getActivePlans();
  const selected =
    (planSlug ? await getPlanBySlug(planSlug) : null) ||
    plans.find((p) => p.isPopular) ||
    plans[0];

  if (!selected) {
    redirect("/plans");
  }

  // Custom Plan is priced on request, so send the customer to WhatsApp instead.
  if (selected.pricePkr === 0) {
    redirect(whatsappLink("Hi NutriGhar! I'm interested in the Custom Plan."));
  }

  const user = await getCurrentUser();

  return (
    <section className="bg-ng-cream/40 py-8 sm:py-12 lg:py-14">
      <div className="container-ng">
        <div className="mb-6 sm:mb-8">
          <p className="eyebrow">Checkout</p>
          <h1 className="heading-section mt-2">Place your order</h1>
          <p className="body-muted mt-2 max-w-2xl text-sm sm:text-base">
            Review your plan and share your details. We will confirm your order on WhatsApp.
          </p>
          {!planSlug ? (
            <p className="mt-3 text-sm text-ng-muted">
              Want a different plan?{" "}
              <Link href="/plans" className="font-semibold text-ng-deep hover:underline">
                Compare plans
              </Link>
            </p>
          ) : null}
        </div>

        <CheckoutForm
          plan={selected}
          user={
            user
              ? {
                  fullName: user.fullName,
                  email: user.email,
                  phone: user.phone,
                  address: user.address,
                  city: user.city,
                }
              : null
          }
        />
      </div>
    </section>
  );
}