import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

export function Badge({
  children,
  className,
  tone = "green",
}: {
  children: ReactNode;
  className?: string;
  tone?: "green" | "cream" | "soft";
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold",
        tone === "green" && "bg-ng-forest text-white",
        tone === "cream" && "bg-ng-sand text-ng-forest",
        tone === "soft" && "bg-ng-mist text-ng-deep",
        className
      )}
    >
      {children}
    </span>
  );
}
