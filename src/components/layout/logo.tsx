import Link from "next/link";
import { cn } from "@/lib/utils";

export function Logo({
  className,
  variant = "dark",
  withTagline = true,
}: {
  className?: string;
  variant?: "dark" | "light";
  withTagline?: boolean;
}) {
  const isLight = variant === "light";

  return (
    <Link
      href="/"
      className={cn("group flex items-center gap-2.5", className)}
      aria-label="NutriGhar home"
    >
      <span
        className={cn(
          "relative flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full",
          isLight ? "bg-white ring-1 ring-white/30" : "bg-ng-forest"
        )}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/logo.svg"
          alt=""
          width={40}
          height={40}
          className="h-full w-full object-cover"
        />
      </span>
      <span className="flex min-w-0 flex-col leading-none">
        <span
          className={cn(
            "text-base font-bold tracking-tight sm:text-lg",
            isLight ? "text-white" : "text-ng-forest"
          )}
        >
          NutriGhar
        </span>
        {withTagline ? (
          <span
            className={cn(
              "mt-0.5 text-[9px] font-medium uppercase tracking-[0.12em] sm:text-[10px]",
              isLight ? "text-white/75" : "text-ng-leaf"
            )}
          >
            Healthy Meals. Happier You.
          </span>
        ) : null}
      </span>
    </Link>
  );
}
