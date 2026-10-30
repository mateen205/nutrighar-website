import Link from "next/link";
import type { Metadata } from "next";
import { desc, eq } from "drizzle-orm";
import { CreditCard, LifeBuoy, Salad, UserRound } from "lucide-react";
import { SafeImage } from "@/components/ui/safe-image";
import { db } from "@/db";
import { activityLogs, plans, subscriptions } from "@/db/schema";
import { getCurrentUser } from "@/lib/auth";
import { formatDate, formatPkr } from "@/lib/utils";
import { EmptyState } from "@/components/ui/empty-state";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = {
  title: "Dashboard",
};

export default async function DashboardPage() {
  const user = await getCurrentUser();
  if (!user) return null;

  const [activeSub] = await db
    .select({
      subscription: subscriptions,
      plan: plans,
    })
    .from(subscriptions)
    .innerJoin(plans, eq(subscriptions.planId, plans.id))
    .where(eq(subscriptions.userId, user.id))
    .orderBy(desc(subscriptions.createdAt))
    .limit(1);

  const activities = await db
    .select()
    .from(activityLogs)
    .where(eq(activityLogs.userId, user.id))
    .orderBy(desc(activityLogs.createdAt))
    .limit(8);

  const firstName = user.fullName.split(" ")[0];

  return (
    <div className="space-y-6">
      <div className="card-ng overflow-hidden">
        <div className="grid gap-6 p-6 sm:grid-cols-[1fr_auto] sm:p-8">
          <div>
            <p className="eyebrow">Your NutriGhar Journey</p>
            <h1 className="mt-2 text-2xl font-bold text-ng-forest sm:text-3xl">
              Welcome back, {firstName}
            </h1>
            <p className="mt-2 text-sm text-ng-muted">
              Eat better, feel better!
            </p>
          </div>
          <div className="hidden h-28 w-28 overflow-hidden rounded-2xl sm:block">
            <SafeImage
              src="/images/fresh-salad.jpg"
              alt="Fresh salad"
              className="h-full w-full object-cover"
            />
          </div>
        </div>

        {activeSub ? (
          <div className="grid gap-4 border-t border-ng-line/70 bg-ng-cream/40 p-6 sm:grid-cols-3 sm:p-8">
            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-ng-muted">Current Plan</p>
              <p className="mt-1 font-semibold text-ng-forest">{activeSub.plan.name}</p>
            </div>
            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-ng-muted">Status</p>
              <div className="mt-1">
                <Badge tone="soft">{activeSub.subscription.status}</Badge>
              </div>
            </div>
            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-ng-muted">Plan Ends</p>
              <p className="mt-1 font-semibold text-ng-forest">
                {formatDate(activeSub.subscription.endsAt)}
              </p>
            </div>
          </div>
        ) : (
          <div className="border-t border-ng-line/70 p-6">
            <EmptyState
              title="No active plan yet"
              description="Choose a NutriGhar meal plan and start your healthy journey."
              action={
                <Link href="/plans" className="btn-primary">
                  Explore Plans
                </Link>
              }
            />
          </div>
        )}
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[
          { href: "/dashboard/plan", label: "View Plan", desc: "See your plan details", icon: Salad },
          { href: "/dashboard/orders", label: "Payment History", desc: "View past payments", icon: CreditCard },
          { href: "/dashboard/profile", label: "Update Profile", desc: "Keep info current", icon: UserRound },
          { href: "/dashboard/support", label: "Contact Support", desc: "We're here to help", icon: LifeBuoy },
        ].map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="card-ng flex items-start gap-3 p-5 transition hover:-translate-y-0.5 hover:shadow-[var(--shadow-card)]"
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-ng-mist text-ng-deep">
              <item.icon className="h-5 w-5" />
            </span>
            <span>
              <span className="block font-semibold text-ng-forest">{item.label}</span>
              <span className="mt-0.5 block text-xs text-ng-muted">{item.desc}</span>
            </span>
          </Link>
        ))}
      </div>

      <div className="card-ng p-6">
        <div className="flex items-center justify-between gap-3">
          <h2 className="text-lg font-semibold text-ng-forest">Recent Activity</h2>
          {activeSub ? (
            <Link href="/dashboard/plan" className="text-sm font-medium text-ng-leaf hover:underline">
              View Plan
            </Link>
          ) : null}
        </div>

        {activities.length === 0 ? (
          <p className="mt-4 text-sm text-ng-muted">No activity yet. Your journey updates will appear here.</p>
        ) : (
          <ul className="mt-4 divide-y divide-ng-line/70">
            {activities.map((a) => (
              <li key={a.id} className="flex items-start justify-between gap-4 py-3">
                <div>
                  <p className="text-sm font-medium text-ng-forest">{a.title}</p>
                  {a.description ? <p className="mt-0.5 text-xs text-ng-muted">{a.description}</p> : null}
                </div>
                <time className="shrink-0 text-xs text-ng-muted">{formatDate(a.createdAt)}</time>
              </li>
            ))}
          </ul>
        )}
      </div>

      {activeSub ? (
        <div className="card-ng flex flex-wrap items-center justify-between gap-4 p-6">
          <div>
            <p className="text-sm text-ng-muted">Plan value</p>
            <p className="text-xl font-bold text-ng-forest">
              {formatPkr(activeSub.plan.pricePkr)} · {activeSub.plan.durationDays} days
            </p>
          </div>
          <Link href={`/plans/${activeSub.plan.slug}`} className="btn-secondary">
            Plan details
          </Link>
        </div>
      ) : null}
    </div>
  );
}
