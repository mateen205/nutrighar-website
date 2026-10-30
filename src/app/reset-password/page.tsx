import type { Metadata } from "next";
import { Suspense } from "react";
import { Logo } from "@/components/layout/logo";
import { ResetPasswordForm } from "@/components/auth/reset-password-form";
import { LoadingState } from "@/components/ui/loading-state";

export const metadata: Metadata = { title: "Choose a new password" };

export default function Page() {
  return (
    <section className="min-h-[calc(100vh-8rem)] bg-gradient-to-br from-ng-cream via-white to-ng-mist/40 py-12">
      <div className="container-ng">
        <div className="mx-auto w-full max-w-md">
          <div className="mb-6">
            <Logo />
          </div>
          <div className="card-ng p-6 sm:p-8">
            <h1 className="text-2xl font-bold text-ng-forest">Choose a new password</h1>
            <p className="mt-1 text-sm text-ng-muted">Pick a password you will remember. The link works once and expires in 30 minutes.</p>
            <div className="mt-6">
              <Suspense fallback={<LoadingState label="Loading form..." />}>
                <ResetPasswordForm />
              </Suspense>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
