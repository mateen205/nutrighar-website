"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  CreditCard,
  LayoutDashboard,
  LifeBuoy,
  Salad,
  UserRound,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { LogoutButton } from "./logout-button";

const LINKS = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/dashboard/plan", label: "My Plan", icon: Salad },
  { href: "/dashboard/orders", label: "Order History", icon: CreditCard },
  { href: "/dashboard/profile", label: "Profile", icon: UserRound },
  { href: "/dashboard/support", label: "Support", icon: LifeBuoy },
];

export function DashboardSidebar({
  user,
}: {
  user: { fullName: string; email: string };
}) {
  const pathname = usePathname();
  const initials = user.fullName
    .split(" ")
    .map((p) => p[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <aside className="card-ng flex h-full flex-col p-4 sm:p-5">
      <div className="flex items-center gap-3 border-b border-ng-line/70 pb-4">
        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-ng-forest text-sm font-bold text-white">
          {initials}
        </div>
        <div className="min-w-0">
          <p className="truncate font-semibold text-ng-forest">{user.fullName}</p>
          <p className="truncate text-xs text-ng-muted">{user.email}</p>
        </div>
      </div>

      <nav className="mt-4 flex flex-1 flex-col gap-1" aria-label="Dashboard">
        {LINKS.map((link) => {
          const active = pathname === link.href;
          const Icon = link.icon;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition",
                active
                  ? "bg-ng-mist text-ng-forest"
                  : "text-ng-muted hover:bg-ng-cream hover:text-ng-forest"
              )}
            >
              <Icon className="h-4 w-4" />
              {link.label}
            </Link>
          );
        })}
      </nav>

      <div className="mt-4 border-t border-ng-line/70 pt-3">
        <LogoutButton />
      </div>
    </aside>
  );
}
