import Link from "next/link";
import type { Metadata } from "next";
import { desc, eq } from "drizzle-orm";
import { db } from "@/db";
import { orders, plans } from "@/db/schema";
import { getCurrentUser } from "@/lib/auth";
import { formatDate, formatPkr } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { EmptyState } from "@/components/ui/empty-state";

export const metadata: Metadata = { title: "Order History" };

export default async function OrdersPage() {
  const user = await getCurrentUser();
  if (!user) return null;

  const rows = await db
    .select({ order: orders, planName: plans.name, planSlug: plans.slug })
    .from(orders)
    .innerJoin(plans, eq(orders.planId, plans.id))
    .where(eq(orders.userId, user.id))
    .orderBy(desc(orders.createdAt));

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-ng-forest">Order History</h1>
        <p className="mt-1 text-sm text-ng-muted">Payments and subscriptions linked to your account</p>
      </div>

      {rows.length === 0 ? (
        <EmptyState
          title="No orders yet"
          description="When you purchase a plan, your receipts will show up here."
          action={
            <Link href="/plans" className="btn-primary">
              Browse plans
            </Link>
          }
        />
      ) : (
        <div className="card-ng overflow-hidden">
          <div className="hidden grid-cols-12 gap-3 border-b border-ng-line/70 bg-ng-cream/50 px-5 py-3 text-xs font-semibold uppercase tracking-wide text-ng-muted sm:grid">
            <span className="col-span-3">Order</span>
            <span className="col-span-3">Plan</span>
            <span className="col-span-2">Amount</span>
            <span className="col-span-2">Status</span>
            <span className="col-span-2">Date</span>
          </div>
          <ul className="divide-y divide-ng-line/70">
            {rows.map(({ order, planName, planSlug }) => (
              <li key={order.id} className="grid gap-2 px-5 py-4 sm:grid-cols-12 sm:items-center sm:gap-3">
                <div className="sm:col-span-3">
                  <p className="font-semibold text-ng-forest">{order.orderNumber}</p>
                </div>
                <div className="sm:col-span-3">
                  <Link href={`/plans/${planSlug}`} className="text-sm text-ng-deep hover:underline">
                    {planName}
                  </Link>
                </div>
                <div className="sm:col-span-2">
                  <p className="text-sm font-medium text-ng-ink">{formatPkr(order.totalPkr)}</p>
                </div>
                <div className="sm:col-span-2">
                  <Badge tone={order.status === "paid" ? "soft" : "cream"}>{order.status}</Badge>
                </div>
                <div className="sm:col-span-2">
                  <p className="text-sm text-ng-muted">{formatDate(order.createdAt)}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
