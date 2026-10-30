import type { Plan } from "@/db/schema";
import { PlanCard } from "./plan-card";

export function PlansGrid({ plans }: { plans: Plan[] }) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 xl:grid-cols-4">
      {plans.map((plan) => (
        <PlanCard key={plan.id} plan={plan} />
      ))}
    </div>
  );
}
