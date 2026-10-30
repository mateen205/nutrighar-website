"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { LogOut } from "lucide-react";

export function LogoutButton() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function logout() {
    setLoading(true);
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      router.push("/");
      router.refresh();
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      type="button"
      onClick={logout}
      disabled={loading}
      className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-ng-muted transition hover:bg-red-50 hover:text-ng-danger"
    >
      <LogOut className="h-4 w-4" />
      {loading ? "Signing out..." : "Logout"}
    </button>
  );
}
