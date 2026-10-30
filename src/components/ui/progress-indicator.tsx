import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

const STEPS = [
  { id: 1, label: "Your Details" },
  { id: 2, label: "Payment" },
  { id: 3, label: "Confirmation" },
];

export function ProgressIndicator({ current }: { current: 1 | 2 | 3 }) {
  return (
    <nav aria-label="Checkout progress" className="w-full">
      <ol className="flex items-center justify-between gap-2">
        {STEPS.map((step, index) => {
          const done = current > step.id;
          const active = current === step.id;
          return (
            <li key={step.id} className="flex flex-1 items-center gap-2">
              <div className="flex min-w-0 flex-1 flex-col items-center gap-2 sm:flex-row sm:gap-3">
                <span
                  className={cn(
                    "flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-bold",
                    done && "bg-ng-forest text-white",
                    active && "bg-ng-leaf text-white ring-4 ring-ng-mist",
                    !done && !active && "bg-ng-sand text-ng-muted"
                  )}
                  aria-current={active ? "step" : undefined}
                >
                  {done ? <Check className="h-4 w-4" /> : step.id}
                </span>
                <span
                  className={cn(
                    "truncate text-xs font-medium sm:text-sm",
                    active || done ? "text-ng-forest" : "text-ng-muted"
                  )}
                >
                  {step.label}
                </span>
              </div>
              {index < STEPS.length - 1 ? (
                <div
                  className={cn(
                    "mx-1 hidden h-px flex-1 sm:block",
                    current > step.id ? "bg-ng-leaf" : "bg-ng-line"
                  )}
                  aria-hidden
                />
              ) : null}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
