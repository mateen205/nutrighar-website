"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type Issues = Partial<Record<string, string[]>>;

export function ProfileForm({
  user,
}: {
  user: {
    fullName: string;
    email: string;
    phone?: string | null;
    address?: string | null;
    city?: string | null;
  };
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [issues, setIssues] = useState<Issues>({});

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);
    setIssues({});

    const form = new FormData(e.currentTarget);
    const payload = {
      fullName: String(form.get("fullName") || ""),
      phone: String(form.get("phone") || ""),
      address: String(form.get("address") || ""),
      city: String(form.get("city") || ""),
    };

    try {
      const res = await fetch("/api/profile", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) {
        setIssues(data.issues || {});
        setError(data.error || "Unable to update profile");
        return;
      }
      setSuccess(true);
      router.refresh();
    } catch {
      setError("Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="card-ng max-w-xl space-y-4 p-6" noValidate>
      {success ? (
        <div className="rounded-xl bg-ng-mist/60 px-4 py-3 text-sm text-ng-forest" role="status">
          Profile updated successfully.
        </div>
      ) : null}
      {error ? (
        <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-ng-danger" role="alert">
          {error}
        </div>
      ) : null}

      <Input name="fullName" label="Full name" required defaultValue={user.fullName} error={issues.fullName?.[0]} />
      <Input name="email" label="Email" defaultValue={user.email} disabled hint="Email cannot be changed here" />
      <Input name="phone" label="Phone" defaultValue={user.phone || ""} error={issues.phone?.[0]} />
      <Input name="address" label="Address" defaultValue={user.address || ""} error={issues.address?.[0]} />
      <Input name="city" label="City" defaultValue={user.city || ""} error={issues.city?.[0]} />

      <Button type="submit" disabled={loading}>
        {loading ? "Saving..." : "Save changes"}
      </Button>
    </form>
  );
}
