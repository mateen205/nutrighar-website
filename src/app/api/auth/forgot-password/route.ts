import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { z } from "zod";
import { db } from "@/db";
import { users } from "@/db/schema";
import { sendPasswordResetEmail } from "@/lib/email";
import { createResetToken } from "@/lib/reset-token";

const schema = z.object({ email: z.string().email() });

// Simple protection: one email per address per minute (resets when the server restarts).
const lastSent = new Map<string, number>();

export async function POST(request: Request) {
  // Always the same answer, so nobody can use this form to find out who has an account.
  const ok = NextResponse.json({
    ok: true,
    message: "If that email has an account, we have sent a link to set a new password. Please check your inbox and spam.",
  });

  try {
    const parsed = schema.safeParse(await request.json());
    if (!parsed.success) {
      return NextResponse.json({ error: "Please enter a valid email address" }, { status: 400 });
    }

    const email = parsed.data.email.toLowerCase().trim();
    const now = Date.now();
    if (now - (lastSent.get(email) ?? 0) < 60_000) return ok;
    lastSent.set(email, now);

    const [user] = await db.select().from(users).where(eq(users.email, email)).limit(1);
    if (!user) return ok;

    const token = await createResetToken(user);
    const base = process.env.SITE_URL || new URL(request.url).origin;
    const link = `${base}/reset-password?token=${encodeURIComponent(token)}`;
    await sendPasswordResetEmail(user.email, user.fullName, link);

    return ok;
  } catch (error) {
    console.error("forgot-password error", error);
    return ok;
  }
}
