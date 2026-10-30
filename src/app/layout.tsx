import type { Metadata } from "next";
import type { ReactNode } from "react";
import { DM_Sans, Caveat } from "next/font/google";
import { SiteShell } from "@/components/layout/site-shell";
import "./globals.css";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const caveat = Caveat({
  subsets: ["latin"],
  variable: "--font-script",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "NutriGhar — Healthy Meals. Happier You.",
    template: "%s · NutriGhar",
  },
  description:
    "Fresh, home-style, calorie-checked healthy meals for weight loss and weight gain, delivered to your doorstep.",
  keywords: ["healthy meals", "meal plans", "weight loss meals", "weight gain meals", "NutriGhar", "Faisalabad"],
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${dmSans.variable} ${caveat.variable}`}>
      <body className="min-h-screen bg-ng-white font-sans text-ng-ink antialiased">
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  );
}
