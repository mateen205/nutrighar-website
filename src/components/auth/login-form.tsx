"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type Issues = Partial<Record<string, string[]>>;

export function LoginForm() {
  const router = useRouter();
  const search = useSearchParams();
  const next = search.get("next") || "/dashboard";
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [issues, setIssues] = useState<Issues>({});

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setIssues({});

    const form = new FormData(e.currentTarget);
    const payload = {
      email: String(form.get("email") || ""),
      password: String(form.get("password") || ""),
    };

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) {
        setIssues(data.issues || {});
        setError(data.error || "Unable to sign in");
        return;
      }
      router.push(next);
      router.refresh();
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4" noValidate>
      {error ? (
        <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-ng-danger" role="alert">
          {error}
        </div>
      ) : null}
      <Input
        name="email"
        type="email"
        label="Email address"
        required
        autoComplete="email"
        error={issues.email?.[0]}
      />
      <Input
        name="password"
        type="password"
        label="Password"
        required
        autoComplete="current-password"
        error={issues.password?.[0]}
      />
      <div className="text-right">
        <Link href="/forgot-password" className="text-sm font-medium text-ng-deep hover:underline">
          Forgot password?
        </Link>
      </div>
      <Button type="submit" disabled={loading} className="w-full">
        {loading ? "Signing in..." : "Login"}
      </Button>
      <p className="text-center text-sm text-ng-muted">
        Don&apos;t have an account?{" "}
        <Link href={`/signup${next !== "/dashboard" ? `?next=${encodeURIComponent(next)}` : ""}`} className="font-semibold text-ng-deep hover:underline">
          Sign Up
        </Link>
      </p>
    </form>
  );
}
