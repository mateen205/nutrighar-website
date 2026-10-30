import Link from "next/link";
import type { Metadata } from "next";
import { desc, eq } from "drizzle-orm";
import { Check } from "lucide-react";
import { db } from "@/db";
import { plans, subscriptions } from "@/db/schema";
import { getCurrentUser } from "@/lib/auth";
import { formatDate, formatPkr } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { EmptyState } from "@/components/ui/empty-state";

export const metadata: Metadata = { title: "My Plan" };

export default async function DashboardPlanPage() {
  const user = await getCurrentUser();
  if (!user) return null;

  const [row] = await db
    .select({ subscription: subscriptions, plan: plans })
    .from(subscriptions)
    .innerJoin(plans, eq(subscriptions.planId, plans.id))
    .where(eq(subscriptions.userId, user.id))
    .orderBy(desc(subscriptions.createdAt))
    .limit(1);

  if (!row) {
    return (
      <EmptyState
        title="No plan selected"
        description="Browse NutriGhar plans and choose the one that fits your lifestyle."
        action={
          <Link href="/plans" className="btn-primary">
            Explore Plans
          </Link>
        }
      />
    );
  }

  const features = (row.plan.features as string[]) || [];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-ng-forest">My Plan</h1>
        <p className="mt-1 text-sm text-ng-muted">Your current NutriGhar subscription details</p>
      </div>

      <div className="card-ng p-6 sm:p-8">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="text-xl font-bold text-ng-forest">{row.plan.name}</h2>
              <Badge tone="soft">{row.subscription.status}</Badge>
            </div>
            {row.plan.tagline ? <p className="mt-1 text-sm text-ng-muted">{row.plan.tagline}</p> : null}
          </div>
          <p className="text-2xl font-bold text-ng-deep">
            {row.plan.pricePkr === 0 ? "Price on Request" : formatPkr(row.plan.pricePkr)}
          </p>
        </div>

        <dl className="mt-6 grid gap-4 sm:grid-cols-2">
          <div className="rounded-xl bg-ng-cream px-4 py-3">
            <dt className="text-xs uppercase tracking-wide text-ng-muted">Starts</dt>
            <dd className="mt-1 font-semibold text-ng-forest">{formatDate(row.subscription.startsAt)}</dd>
          </div>
          <div className="rounded-xl bg-ng-cream px-4 py-3">
            <dt className="text-xs uppercase tracking-wide text-ng-muted">Ends</dt>
            <dd className="mt-1 font-semibold text-ng-forest">{formatDate(row.subscription.endsAt)}</dd>
          </div>
        </dl>

        <h3 className="mt-8 text-sm font-semibold uppercase tracking-wide text-ng-forest">What&apos;s included</h3>
        <ul className="mt-3 grid gap-2 sm:grid-cols-2">
          {features.map((f) => (
            <li key={f} className="flex items-start gap-2 text-sm text-ng-ink">
              <Check className="mt-0.5 h-4 w-4 shrink-0 text-ng-leaf" />
              {f}
            </li>
          ))}
        </ul>

        <div className="mt-8 flex flex-wrap gap-3">
          <Link href={`/plans/${row.plan.slug}`} className="btn-secondary">
            Full plan details
          </Link>
          <Link href="/contact" className="btn-ghost">
            Request a change
          </Link>
        </div>
      </div>
    </div>
  );
}
