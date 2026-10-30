import type { Metadata } from "next";
import { Suspense } from "react";
import { Logo } from "@/components/layout/logo";
import { ForgotPasswordForm } from "@/components/auth/forgot-password-form";
import { LoadingState } from "@/components/ui/loading-state";

export const metadata: Metadata = { title: "Set or reset your password" };

export default function Page() {
  return (
    <section className="min-h-[calc(100vh-8rem)] bg-gradient-to-br from-ng-cream via-white to-ng-mist/40 py-12">
      <div className="container-ng">
        <div className="mx-auto w-full max-w-md">
          <div className="mb-6">
            <Logo />
          </div>
          <div className="card-ng p-6 sm:p-8">
            <h1 className="text-2xl font-bold text-ng-forest">Set or reset your password</h1>
            <p className="mt-1 text-sm text-ng-muted">Enter your email and we will send you a link. If you ordered before as a guest, this is how you set your password for the first time.</p>
            <div className="mt-6">
              <Suspense fallback={<LoadingState label="Loading form..." />}>
                <ForgotPasswordForm />
              </Suspense>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
