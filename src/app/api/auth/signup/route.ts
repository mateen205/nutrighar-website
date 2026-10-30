import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { db } from "@/db";
import { users } from "@/db/schema";
import { createSession, hashPassword } from "@/lib/auth";
import { signupSchema } from "@/lib/validators";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = signupSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Validation failed", issues: parsed.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const { fullName, email, password, phone } = parsed.data;
    const normalizedEmail = email.toLowerCase().trim();

    const [existing] = await db.select().from(users).where(eq(users.email, normalizedEmail)).limit(1);
    if (existing) {
      return NextResponse.json({ error: "An account with this email already exists. If you ordered before, use \"Forgot password\" to set your password." }, { status: 409 });
    }

    const passwordHash = await hashPassword(password);
    const [user] = await db
      .insert(users)
      .values({
        fullName: fullName.trim(),
        email: normalizedEmail,
        passwordHash,
        phone: phone || null,
      })
      .returning();

    await createSession(user);

    return NextResponse.json({
      user: {
        id: user.id,
        email: user.email,
        fullName: user.fullName,
      },
    });
  } catch (error) {
    console.error("signup error", error);
    return NextResponse.json({ error: "Unable to create account" }, { status: 500 });
  }
}
