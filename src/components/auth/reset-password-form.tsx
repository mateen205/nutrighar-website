"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function ResetPasswordForm() {
  const router = useRouter();
  const token = useSearchParams().get("token") || "";
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    const form = new FormData(e.currentTarget);
    const password = String(form.get("password") || "");
    if (password !== String(form.get("confirm") || "")) {
      setError("The two passwords do not match");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Unable to set the password");
        return;
      }
      router.push("/dashboard");
      router.refresh();
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  if (!token) {
    return (
      <div className="space-y-4">
        <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-ng-danger">
          This link is not valid. Please request a new one.
        </div>
        <Link href="/forgot-password" className="btn-primary w-full">
          Request a new link
        </Link>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4" noValidate>
      {error ? (
        <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-ng-danger" role="alert">
          {error}{" "}
          {error.includes("expired") ? (
            <Link href="/forgot-password" className="font-semibold underline">
              Request a new link
            </Link>
          ) : null}
        </div>
      ) : null}
      <Input
        name="password"
        type="password"
        label="New password"
        required
        autoComplete="new-password"
        hint="At least 8 characters"
      />
      <Input name="confirm" type="password" label="Confirm new password" required autoComplete="new-password" />
      <Button type="submit" disabled={loading} className="w-full">
        {loading ? "Saving..." : "Save password & sign in"}
      </Button>
    </form>
  );
}
