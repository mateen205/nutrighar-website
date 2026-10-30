import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { db } from "@/db";
import { users } from "@/db/schema";
import { getCurrentUser } from "@/lib/auth";
import { profileSchema } from "@/lib/validators";

export async function PATCH(request: Request) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const parsed = profileSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Validation failed", issues: parsed.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const data = parsed.data;
    const [updated] = await db
      .update(users)
      .set({
        fullName: data.fullName.trim(),
        phone: data.phone || null,
        address: data.address || null,
        city: data.city || null,
        updatedAt: new Date(),
      })
      .where(eq(users.id, user.id))
      .returning();

    return NextResponse.json({
      user: {
        id: updated.id,
        email: updated.email,
        fullName: updated.fullName,
        phone: updated.phone,
        address: updated.address,
        city: updated.city,
      },
    });
  } catch (error) {
    console.error("profile update error", error);
    return NextResponse.json({ error: "Unable to update profile" }, { status: 500 });
  }
}
