import type { Metadata } from "next";
import { Suspense } from "react";
import { Logo } from "@/components/layout/logo";
import { LoginForm } from "@/components/auth/login-form";
import { LoadingState } from "@/components/ui/loading-state";

export const metadata: Metadata = {
  title: "Login",
  description: "Sign in to your NutriGhar account.",
};

export default function LoginPage() {
  return (
    <section className="relative min-h-[calc(100vh-8rem)] overflow-hidden bg-gradient-to-br from-ng-cream via-white to-ng-mist/40 py-12">
      <div className="pointer-events-none absolute -left-20 top-20 h-64 w-64 blob bg-ng-mist/50" />
      <div className="pointer-events-none absolute -right-16 bottom-10 h-56 w-56 organic-ring bg-ng-soft/20" />

      <div className="container-ng relative grid items-center gap-10 lg:grid-cols-2">
        <div className="hidden lg:block">
          <Logo withTagline />
          <h1 className="mt-8 text-4xl font-bold text-ng-forest">Welcome Back</h1>
          <p className="mt-3 max-w-md text-ng-muted">
            Sign in to your NutriGhar account to view your plan, track activity, and keep your journey moving.
          </p>
          <p className="script mt-8 text-3xl text-ng-leaf">Good Food · Happy You</p>
        </div>

        <div className="mx-auto w-full max-w-md">
          <div className="mb-6 lg:hidden">
            <Logo />
          </div>
          <div className="card-ng p-6 sm:p-8">
            <h2 className="text-2xl font-bold text-ng-forest">Login</h2>
            <p className="mt-1 text-sm text-ng-muted">Access your NutriGhar dashboard</p>
            <div className="mt-6">
              <Suspense fallback={<LoadingState label="Loading form..." />}>
                <LoginForm />
              </Suspense>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
