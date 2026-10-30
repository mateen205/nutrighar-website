import Link from "next/link";
import { Logo } from "./logo";
import { DISCLAIMER } from "@/lib/plans-data";
import { SITE } from "@/lib/site";
import { Mail, MapPin, Phone } from "lucide-react";

function SocialIcon({ type }: { type: "facebook" | "instagram" | "youtube" }) {
  if (type === "facebook") {
    return (
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden>
        <path d="M14 8h3V5h-3c-2.2 0-4 1.8-4 4v2H8v3h2v7h3v-7h2.5l.5-3H13V9c0-.6.4-1 1-1z" />
      </svg>
    );
  }
  if (type === "instagram") {
    return (
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden>
        <path d="M7 3h10a4 4 0 0 1 4 4v10a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V7a4 4 0 0 1 4-4zm5 4.5A4.5 4.5 0 1 0 16.5 12 4.5 4.5 0 0 0 12 7.5zm0 7.2A2.7 2.7 0 1 1 14.7 12 2.7 2.7 0 0 1 12 14.7zM17.8 6.2a1.05 1.05 0 1 0 1.05 1.05A1.05 1.05 0 0 0 17.8 6.2z" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden>
      <path d="M22 8.2a7.2 7.2 0 0 0-.5-2.5 3.7 3.7 0 0 0-2.2-2.1C17.7 3.2 12 3.2 12 3.2s-5.7 0-7.3.4A3.7 3.7 0 0 0 2.5 5.7 7.2 7.2 0 0 0 2 8.2v3.6a7.2 7.2 0 0 0 .5 2.5 3.7 3.7 0 0 0 2.2 2.1c1.6.4 7.3.4 7.3.4s5.7 0 7.3-.4a3.7 3.7 0 0 0 2.2-2.1 7.2 7.2 0 0 0 .5-2.5V8.2zM10 14.1V7.9l5.2 3.1L10 14.1z" />
    </svg>
  );
}

const NAV = [
  { href: "/plans", label: "Plans" },
  { href: "/about", label: "About" },
  { href: "/how-it-works", label: "How It Works" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Contact" },
];

const CUSTOMER = [
  { href: "/login", label: "Login" },
  { href: "/dashboard", label: "My Account" },
  { href: "/dashboard/orders", label: "Order History" },
];

const LEGAL = [
  { href: "/privacy", label: "Privacy Policy" },
  { href: "/terms", label: "Terms & Conditions" },
];

export function Footer() {
  return (
    <footer className="mt-auto bg-ng-forest text-white">
      <div className="container-ng py-14">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Logo variant="light" />
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/75">
              Fresh, home-style, calorie-checked meals for weight loss and weight gain, delivered to your doorstep.
            </p>
            <p className="script mt-5 text-2xl text-ng-soft">Good Food · Good Mood</p>
          </div>

          <div className="lg:col-span-2">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white/90">Navigation</h3>
            <ul className="mt-4 space-y-2.5">
              {NAV.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-sm text-white/70 transition hover:text-white">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white/90">Customer</h3>
            <ul className="mt-4 space-y-2.5">
              {CUSTOMER.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-sm text-white/70 transition hover:text-white">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white/90">Legal</h3>
            <ul className="mt-4 space-y-2.5">
              {LEGAL.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-sm text-white/70 transition hover:text-white">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white/90">Contact Us</h3>
            <ul className="mt-4 space-y-3 text-sm text-white/75">
              <li className="flex items-start gap-2">
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-ng-soft" />
                <a href={`tel:${SITE.phoneTel}`} className="hover:text-white">
                  {SITE.phoneDisplay}
                </a>
              </li>
              <li className="flex items-start gap-2">
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-ng-soft" />
                <a href={`mailto:${SITE.email}`} className="hover:text-white">
                  {SITE.email}
                </a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-ng-soft" />
                <span>{SITE.location}</span>
              </li>
            </ul>
            <div className="mt-5 flex gap-3">
              <a
                href={SITE.instagram}
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 transition hover:bg-white/20"
              >
                <SocialIcon type="instagram" />
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-ng py-5">
          <p className="text-xs leading-relaxed text-white/55">{DISCLAIMER}</p>
          <p className="mt-4 text-xs text-white/45">© {new Date().getFullYear()} NutriGhar. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
