"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const LINKS = [
  { href: "/", label: "Home" },
  { href: "/plans", label: "Plans" },
  { href: "/how-it-works", label: "How It Works" },
  { href: "/about", label: "About" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Contact" },
];

export function Navbar({
  user,
}: {
  user?: { fullName: string; email: string } | null;
}) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // On the home page (phone and tablet) the navbar sits see-through on top of the
  // hero picture, and turns white once you scroll past the picture.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > window.innerHeight - 90);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isHome = pathname === "/";
  const overHero = isHome && !scrolled && !open;

  return (
    <header
      className="ng-nav sticky top-0 z-50 border-b border-ng-line/60 bg-white/95 backdrop-blur-md"
      data-home={isHome ? "true" : "false"}
      data-over={overHero ? "true" : "false"}
    >
      <style>{`
        .ng-nav { transition: background-color .25s ease, border-color .25s ease; }
        @media (max-width: 1023px) {
          .ng-nav[data-home="true"] { margin-bottom: -4rem; }
          .ng-nav[data-home="true"] .ng-nav-row { height: 4rem; }
          .ng-nav[data-over="true"] {
            background-color: transparent;
            border-bottom-color: transparent;
            -webkit-backdrop-filter: none;
            backdrop-filter: none;
          }
          .ng-nav[data-over="true"] .ng-burger {
            color: #ffffff;
            border-color: rgba(255, 255, 255, 0.65);
            background-color: rgba(0, 0, 0, 0.28);
          }
        }
      `}</style>
      <div className="ng-nav-row container-ng flex h-16 items-center justify-between gap-3 lg:h-[4.5rem]">
        <Link href="/" aria-label="NutriGhar home" style={{ display: "block", flexShrink: 0 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/logo-full.jpg"
            alt="NutriGhar: Good Food, Happy You"
            width={569}
            height={408}
            style={{ display: "block", height: "3rem", width: "auto", borderRadius: "0.5rem" }}
          />
        </Link>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
          {LINKS.map((link) => {
            const active = pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href));
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "rounded-full px-3.5 py-2 text-sm font-medium transition",
                  active
                    ? "bg-ng-mist text-ng-forest"
                    : "text-ng-muted hover:bg-ng-cream hover:text-ng-forest"
                )}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-2 lg:flex">
          {user ? (
            <>
              <Link href="/dashboard" className="btn-ghost text-sm">
                My Account
              </Link>
              <Link href="/plans" className="btn-primary text-sm">
                Explore Plans
              </Link>
            </>
          ) : (
            <>
              <Link href="/login" className="btn-ghost text-sm">
                Login
              </Link>
              <Link href="/signup" className="btn-primary text-sm">
                Get Started
              </Link>
            </>
          )}
        </div>

        <button
          type="button"
          className="ng-burger inline-flex h-10 w-10 items-center justify-center rounded-full border border-ng-line text-ng-forest lg:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open ? (
        <div className="border-t border-ng-line/60 bg-white lg:hidden">
          <nav className="container-ng flex flex-col gap-1 py-4" aria-label="Mobile">
            {LINKS.map((link) => {
              const active = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "rounded-xl px-4 py-3 text-sm font-medium",
                    active ? "bg-ng-mist text-ng-forest" : "text-ng-ink hover:bg-ng-cream"
                  )}
                >
                  {link.label}
                </Link>
              );
            })}
            <div className="mt-3 flex flex-col gap-2 border-t border-ng-line/60 pt-4">
              {user ? (
                <Link href="/dashboard" onClick={() => setOpen(false)} className="btn-primary w-full">
                  My Account
                </Link>
              ) : (
                <>
                  <Link href="/login" onClick={() => setOpen(false)} className="btn-secondary w-full">
                    Login
                  </Link>
                  <Link href="/signup" onClick={() => setOpen(false)} className="btn-primary w-full">
                    Get Started
                  </Link>
                </>
              )}
            </div>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
