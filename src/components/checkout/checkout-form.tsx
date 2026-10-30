"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { Building2, Smartphone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ProgressIndicator } from "@/components/ui/progress-indicator";
import { SafeImage } from "@/components/ui/safe-image";
import { PaymentDetailsBox } from "./payment-details-box";
import { formatPkr, cn } from "@/lib/utils";
import type { Plan } from "@/db/schema";

type Issues = Partial<Record<string, string[]>>;

const METHODS = [
  { id: "jazzcash", label: "JazzCash", icon: Smartphone },
  { id: "easypaisa", label: "EasyPaisa", icon: Smartphone },
  { id: "bank_transfer", label: "Bank Transfer", icon: Building2 },
] as const;

export function CheckoutForm({
  plan,
  user,
}: {
  plan: Plan;
  user?: {
    fullName: string;
    email: string;
    phone?: string | null;
    address?: string | null;
    city?: string | null;
  } | null;
}) {
  const router = useRouter();
  const [step, setStep] = useState<1 | 2>(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [issues, setIssues] = useState<Issues>({});
  const [method, setMethod] = useState<(typeof METHODS)[number]["id"]>("jazzcash");
  const [acceptTerms, setAcceptTerms] = useState(false);

  const discount =
    plan.originalPricePkr && plan.originalPricePkr > plan.pricePkr
      ? plan.originalPricePkr - plan.pricePkr
      : 0;

  const summary = useMemo(
    () => ({
      subtotal: plan.originalPricePkr || plan.pricePkr,
      discount,
      total: plan.pricePkr,
    }),
    [plan, discount]
  );

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (step === 1) {
      setStep(2);
      return;
    }

    setLoading(true);
    setError(null);
    setIssues({});

    const form = new FormData(e.currentTarget);
    const payload = {
      fullName: String(form.get("fullName") || ""),
      email: String(form.get("email") || ""),
      phone: String(form.get("phone") || ""),
      address: String(form.get("address") || ""),
      city: String(form.get("city") || ""),
      planId: plan.id,
      paymentMethod: method,
      acceptTerms,
      notes: String(form.get("notes") || ""),
    };

    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) {
        setIssues(data.issues || {});
        setError(data.error || "Unable to complete checkout");
        if (data.issues?.fullName || data.issues?.email || data.issues?.phone) {
          setStep(1);
        }
        return;
      }
      router.push(`/checkout/confirmation?id=${data.order.id}`);
      router.refresh();
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-6 lg:grid-cols-12 lg:gap-8" noValidate>
      {/* Summary first on mobile so selected plan is always visible */}
      <aside className="order-1 lg:order-2 lg:col-span-5">
        <div className="card-ng overflow-hidden lg:sticky lg:top-24">
          <div className="border-b border-ng-line/70 bg-ng-cream/60 px-4 py-3 sm:px-6 sm:py-4">
            <h2 className="font-semibold text-ng-forest">Order Summary</h2>
          </div>
          <div className="p-4 sm:p-6">
            <div className="flex gap-3 sm:gap-4">
              <div className="h-16 w-16 shrink-0 overflow-hidden rounded-xl border border-ng-line/60 sm:h-20 sm:w-20">
                <SafeImage
                  src={plan.imageUrl || "/images/plan-standard.jpg"}
                  alt={plan.name}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="min-w-0">
                <p className="font-semibold text-ng-forest">{plan.name}</p>
                <p className="truncate text-sm text-ng-muted">{plan.tagline}</p>
                <p className="mt-1 text-sm font-medium text-ng-deep">
                  {formatPkr(plan.pricePkr)} · {plan.durationDays} days
                </p>
              </div>
            </div>

            <dl className="mt-4 space-y-2 border-t border-ng-line/70 pt-4 text-sm sm:mt-6 sm:space-y-2.5 sm:pt-5">
              <div className="flex justify-between gap-3">
                <dt className="text-ng-muted">
                  {plan.durationDays}-day plan
                </dt>
                <dd className="font-medium text-ng-ink">{formatPkr(summary.subtotal)}</dd>
              </div>
              {summary.discount > 0 ? (
                <div className="flex justify-between gap-3">
                  <dt className="text-ng-muted">
                    Discount{plan.discountPercent ? ` (${plan.discountPercent}%)` : ""}
                  </dt>
                  <dd className="font-medium text-ng-deep">−{formatPkr(summary.discount)}</dd>
                </div>
              ) : null}
              <div className="flex justify-between gap-3 border-t border-ng-line/70 pt-3 text-base">
                <dt className="font-semibold text-ng-forest">Total</dt>
                <dd className="font-bold text-ng-forest">{formatPkr(summary.total)}</dd>
              </div>
            </dl>

            <div className="mt-4 rounded-xl bg-ng-mist/50 px-3 py-3 text-sm text-ng-deep sm:mt-5 sm:px-4">
              <p className="font-medium">Selected Plan</p>
              <p className="mt-0.5 text-ng-muted">
                {plan.name} · {plan.durationDays} days · 3 meals a day
              </p>
            </div>

            <p className="script mt-4 hidden text-center text-2xl text-ng-leaf sm:mt-6 lg:block">
              Eat better, feel better!
            </p>
          </div>
        </div>
      </aside>

      <div className="order-2 lg:order-1 lg:col-span-7">
        <div className="mb-5 sm:mb-8">
          <ProgressIndicator current={step === 1 ? 1 : 2} />
        </div>

        {error ? (
          <div className="mb-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-ng-danger" role="alert">
            {error}
          </div>
        ) : null}

        <div className={cn("card-ng space-y-4 p-6 sm:p-8", step !== 1 && "hidden")}>
          <h2 className="text-xl font-bold text-ng-forest">Customer Information</h2>
          <Input
            name="fullName"
            label="Full Name"
            required
            defaultValue={user?.fullName || ""}
            autoComplete="name"
            error={issues.fullName?.[0]}
          />
          <Input
            name="email"
            type="email"
            label="Email Address"
            required
            defaultValue={user?.email || ""}
            autoComplete="email"
            error={issues.email?.[0]}
          />
          <Input
            name="phone"
            type="tel"
            label="Phone Number"
            required
            defaultValue={user?.phone || ""}
            autoComplete="tel"
            error={issues.phone?.[0]}
          />
          <Input
            name="address"
            label="Address (optional)"
            defaultValue={user?.address || ""}
            autoComplete="street-address"
            error={issues.address?.[0]}
          />
          <Input
            name="city"
            label="City"
            defaultValue={user?.city || ""}
            autoComplete="address-level2"
            error={issues.city?.[0]}
          />
          <Textarea
            name="notes"
            label="Your goal, allergies or medical conditions (optional)"
            error={issues.notes?.[0]}
          />
          <Button type="submit" className="w-full sm:w-auto">
            Continue
          </Button>
        </div>

        <div className={cn("card-ng space-y-5 p-6 sm:p-8", step !== 2 && "hidden")}>
          <div className="flex items-center justify-between gap-3">
            <h2 className="text-xl font-bold text-ng-forest">Preferred Payment Method</h2>
            <button type="button" className="text-sm font-medium text-ng-leaf hover:underline" onClick={() => setStep(1)}>
              Edit details
            </button>
          </div>

          <fieldset className="space-y-3">
            <legend className="sr-only">Select payment method</legend>
            {METHODS.map((m) => {
              const Icon = m.icon;
              const selected = method === m.id;
              return (
                <label
                  key={m.id}
                  className={cn(
                    "flex cursor-pointer items-center gap-3 rounded-xl border px-4 py-3.5 transition",
                    selected ? "border-ng-leaf bg-ng-mist/40 ring-1 ring-ng-soft" : "border-ng-line hover:border-ng-soft"
                  )}
                >
                  <input
                    type="radio"
                    name="paymentMethod"
                    value={m.id}
                    checked={selected}
                    onChange={() => setMethod(m.id)}
                    className="sr-only"
                  />
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-ng-deep shadow-soft">
                    <Icon className="h-5 w-5" />
                  </span>
                  <span className="text-sm font-medium text-ng-ink">{m.label}</span>
                </label>
              );
            })}
          </fieldset>

          <PaymentDetailsBox method={method} amountPkr={plan.pricePkr} />

          <p className="text-xs text-ng-muted">
            No payment is taken on this website. Place your order, send the payment to the account shown above, then
            share the screenshot with us on WhatsApp so we can confirm your package. Please order at least 24–48 hours in advance.
            There is no cancellation or refund once the meal plan starts.
          </p>

          <label className="flex items-start gap-3 text-sm text-ng-ink">
            <input
              type="checkbox"
              checked={acceptTerms}
              onChange={(e) => setAcceptTerms(e.target.checked)}
              className="mt-1 h-4 w-4 rounded border-ng-line text-ng-forest focus:ring-ng-leaf"
            />
            <span>
              I agree to the{" "}
              <Link href="/terms" className="font-semibold text-ng-deep underline-offset-2 hover:underline">
                Terms & Conditions
              </Link>{" "}
              and{" "}
              <Link href="/privacy" className="font-semibold text-ng-deep underline-offset-2 hover:underline">
                Privacy Policy
              </Link>
              .
            </span>
          </label>
          {issues.acceptTerms?.[0] ? (
            <p className="text-xs text-ng-danger" role="alert">
              {issues.acceptTerms[0]}
            </p>
          ) : null}

          <Button type="submit" disabled={loading || !acceptTerms} className="w-full">
            {loading ? "Placing order..." : "Place Order"}
          </Button>
        </div>
      </div>
    </form>
  );
}
