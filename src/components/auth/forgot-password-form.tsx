"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function ForgotPasswordForm() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const form = new FormData(e.currentTarget);
    try {
      const res = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: String(form.get("email") || "") }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Something went wrong");
        return;
      }
      setDone(data.message);
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  if (done) {
    return (
      <div className="space-y-4">
        <div className="rounded-xl border border-ng-line bg-ng-mist/40 px-4 py-3 text-sm text-ng-forest">{done}</div>
        <Link href="/login" className="btn-secondary w-full">
          Back to Login
        </Link>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4" noValidate>
      {error ? (
        <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-ng-danger" role="alert">
          {error}
        </div>
      ) : null}
      <Input name="email" type="email" label="Email address" required autoComplete="email" />
      <Button type="submit" disabled={loading} className="w-full">
        {loading ? "Sending..." : "Send me a link"}
      </Button>
      <p className="text-center text-sm text-ng-muted">
        <Link href="/login" className="font-semibold text-ng-deep hover:underline">
          Back to Login
        </Link>
      </p>
    </form>
  );
}
