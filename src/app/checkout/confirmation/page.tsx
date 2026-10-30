import Link from "next/link";
import { redirect } from "next/navigation";
import type { Metadata } from "next";
import { CheckCircle2 } from "lucide-react";
import { eq } from "drizzle-orm";
import { db } from "@/db";
import { orders, payments, plans } from "@/db/schema";
import { getCurrentUser } from "@/lib/auth";
import { formatPkr } from "@/lib/utils";
import { whatsappLink } from "@/lib/site";
import { ProgressIndicator } from "@/components/ui/progress-indicator";
import { PaymentDetailsBox } from "@/components/checkout/payment-details-box";

export const metadata: Metadata = {
  title: "Order Confirmation",
  description: "Your NutriGhar plan order confirmation.",
};

type Props = { searchParams: Promise<{ id?: string }> };

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export default async function ConfirmationPage({ searchParams }: Props) {
  // Guests can open this page too. The order id is a long random code that cannot be guessed.
  const user = await getCurrentUser();

  const { id } = await searchParams;
  if (!id || !UUID.test(id)) redirect("/");

  const [row] = await db
    .select({
      order: orders,
      plan: plans,
    })
    .from(orders)
    .innerJoin(plans, eq(orders.planId, plans.id))
    .where(eq(orders.id, id))
    .limit(1);

  if (!row) redirect("/");

  const [payment] = await db.select().from(payments).where(eq(payments.orderId, row.order.id)).limit(1);

  const o = row.order;
  const waText = [
    "Hi NutriGhar! I just placed an order on your website.",
    "",
    `Order: ${o.orderNumber}`,
    `Plan: ${row.plan.name} (${formatPkr(o.totalPkr)})`,
    `Name: ${o.customerName}`,
    `Phone: ${o.customerPhone}`,
    o.customerAddress ? `Address: ${o.customerAddress}` : "",
    o.notes ? `Notes: ${o.notes}` : "",
    "",
    "Please confirm my order. Thank you!",
  ]
    .filter((line, i, arr) => line !== "" || (arr[i - 1] !== "" && i !== arr.length - 1))
    .join("\n");

  return (
    <section className="bg-ng-cream/40 py-12 sm:py-16">
      <div className="container-ng max-w-3xl">
        <div className="mb-8">
          <ProgressIndicator current={3} />
        </div>

        <div className="card-ng overflow-hidden text-center">
          <div className="bg-ng-mist/50 px-6 py-10">
            <CheckCircle2 className="mx-auto h-14 w-14 text-ng-deep" strokeWidth={1.5} />
            <h1 className="mt-4 text-2xl font-bold text-ng-forest sm:text-3xl">Order received!</h1>
            <p className="script mt-2 text-2xl text-ng-leaf">Thank you for choosing NutriGhar</p>
            <p className="mx-auto mt-3 max-w-md text-sm text-ng-muted">
              We will contact you on WhatsApp shortly to confirm your package, payment and delivery.
            </p>
          </div>

          <div className="space-y-4 px-6 py-8 text-left sm:px-10">
            <div className="rounded-xl border border-ng-line/70 bg-ng-cream/50 p-4">
              <dl className="grid gap-3 text-sm sm:grid-cols-2">
                <div>
                  <dt className="text-ng-muted">Order number</dt>
                  <dd className="mt-0.5 font-semibold text-ng-forest">{row.order.orderNumber}</dd>
                </div>
                <div>
                  <dt className="text-ng-muted">Plan</dt>
                  <dd className="mt-0.5 font-semibold text-ng-forest">{row.plan.name}</dd>
                </div>
                <div>
                  <dt className="text-ng-muted">Total</dt>
                  <dd className="mt-0.5 font-semibold text-ng-forest">{formatPkr(row.order.totalPkr)}</dd>
                </div>
                <div>
                  <dt className="text-ng-muted">Status</dt>
                  <dd className="mt-0.5 font-semibold capitalize text-ng-deep">{row.order.status}</dd>
                </div>
              </dl>
            </div>

            {payment && payment.method !== "card" ? (
              <PaymentDetailsBox method={payment.method} amountPkr={row.order.totalPkr} />
            ) : null}

            <div className="rounded-xl border border-ng-leaf/40 bg-ng-mist/40 p-4 text-center">
              <p className="text-sm font-medium text-ng-forest">
                Last step: send your order (and payment screenshot) to us on WhatsApp so we can confirm it quickly.
              </p>
              <a
                href={whatsappLink(waText)}
                target="_blank"
                rel="noreferrer"
                className="btn-primary mt-3 inline-flex w-full sm:w-auto"
              >
                Send Order on WhatsApp
              </a>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
              {user ? (
                <Link href="/dashboard" className="btn-primary">
                  Go to Dashboard
                </Link>
              ) : (
                <Link href="/" className="btn-primary">
                  Back to Home
                </Link>
              )}
              <Link href={`/plans/${row.plan.slug}`} className="btn-secondary">
                View Plan Details
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
