import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { z } from "zod";
import { db } from "@/db";
import { users } from "@/db/schema";
import { createSession, hashPassword } from "@/lib/auth";
import { passwordFingerprint, readResetToken } from "@/lib/reset-token";

const schema = z.object({
  token: z.string().min(10),
  password: z.string().min(8, "Password must be at least 8 characters").max(100),
});

const INVALID = "This link has expired or was already used. Please request a new one.";

export async function POST(request: Request) {
  try {
    const parsed = schema.safeParse(await request.json());
    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0]?.message || "Invalid request" },
        { status: 400 }
      );
    }

    const claims = await readResetToken(parsed.data.token);
    if (!claims) return NextResponse.json({ error: INVALID }, { status: 400 });

    const [user] = await db.select().from(users).where(eq(users.id, claims.userId)).limit(1);
    if (!user || passwordFingerprint(user.passwordHash) !== claims.fp) {
      return NextResponse.json({ error: INVALID }, { status: 400 });
    }

    const passwordHash = await hashPassword(parsed.data.password);
    const [updated] = await db
      .update(users)
      .set({ passwordHash, updatedAt: new Date() })
      .where(eq(users.id, user.id))
      .returning();

    await createSession(updated);
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("reset-password error", error);
    return NextResponse.json({ error: "Unable to set the password" }, { status: 500 });
  }
}
