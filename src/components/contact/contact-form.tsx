"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

type Issues = Partial<Record<string, string[]>>;

export function ContactForm() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [issues, setIssues] = useState<Issues>({});

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setIssues({});
    setSuccess(false);

    const form = new FormData(e.currentTarget);
    const payload = {
      name: String(form.get("name") || ""),
      email: String(form.get("email") || ""),
      phone: String(form.get("phone") || ""),
      subject: String(form.get("subject") || ""),
      message: String(form.get("message") || ""),
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) {
        setIssues(data.issues || {});
        setError(data.error || "Unable to send message");
        return;
      }
      setSuccess(true);
      e.currentTarget.reset();
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="card-ng space-y-4 p-6 sm:p-8" noValidate>
      {success ? (
        <div className="rounded-xl border border-ng-soft/40 bg-ng-mist/50 px-4 py-3 text-sm text-ng-forest" role="status">
          Thank you — your message is with our team. We&apos;ll get back to you soon.
        </div>
      ) : null}
      {error ? (
        <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-ng-danger" role="alert">
          {error}
        </div>
      ) : null}

      <Input name="name" label="Full name" required autoComplete="name" error={issues.name?.[0]} />
      <Input name="email" type="email" label="Email" required autoComplete="email" error={issues.email?.[0]} />
      <Input name="phone" type="tel" label="Phone" autoComplete="tel" error={issues.phone?.[0]} />
      <Input name="subject" label="Subject" error={issues.subject?.[0]} />
      <Textarea name="message" label="Message" required error={issues.message?.[0]} />

      <Button type="submit" disabled={loading} className="w-full sm:w-auto">
        {loading ? "Sending..." : "Send Message"}
      </Button>
    </form>
  );
}
