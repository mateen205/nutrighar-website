import type { Metadata } from "next";
import { Suspense } from "react";
import { Logo } from "@/components/layout/logo";
import { SignupForm } from "@/components/auth/signup-form";
import { LoadingState } from "@/components/ui/loading-state";

export const metadata: Metadata = {
  title: "Sign Up",
  description: "Create your NutriGhar account and start your healthy lifestyle journey.",
};

export default function SignupPage() {
  return (
    <section className="relative min-h-[calc(100vh-8rem)] overflow-hidden bg-gradient-to-br from-ng-cream via-white to-ng-mist/40 py-12">
      <div className="pointer-events-none absolute -right-20 top-16 h-64 w-64 blob bg-ng-mist/50" />

      <div className="container-ng relative grid items-center gap-10 lg:grid-cols-2">
        <div className="hidden lg:block">
          <Logo withTagline />
          <h1 className="mt-8 text-4xl font-bold text-ng-forest">Create Your Account</h1>
          <p className="mt-3 max-w-md text-ng-muted">
            Join NutriGhar and start your journey with personalized guidance, clear structure, and kind support.
          </p>
          <p className="script mt-8 text-3xl text-ng-leaf">One meal · One step · One day</p>
        </div>

        <div className="mx-auto w-full max-w-md">
          <div className="mb-6 lg:hidden">
            <Logo />
          </div>
          <div className="card-ng p-6 sm:p-8">
            <h2 className="text-2xl font-bold text-ng-forest">Sign Up</h2>
            <p className="mt-1 text-sm text-ng-muted">It only takes a minute</p>
            <div className="mt-6">
              <Suspense fallback={<LoadingState label="Loading form..." />}>
                <SignupForm />
              </Suspense>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
