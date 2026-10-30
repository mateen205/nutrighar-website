import { NextResponse } from "next/server";
import { db } from "@/db";
import { contactMessages } from "@/db/schema";
import { contactSchema } from "@/lib/validators";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = contactSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Validation failed", issues: parsed.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const data = parsed.data;
    const [message] = await db
      .insert(contactMessages)
      .values({
        name: data.name.trim(),
        email: data.email.toLowerCase().trim(),
        phone: data.phone || null,
        subject: data.subject || null,
        message: data.message.trim(),
      })
      .returning();

    return NextResponse.json({ ok: true, id: message.id });
  } catch (error) {
    console.error("contact error", error);
    return NextResponse.json({ error: "Unable to send message" }, { status: 500 });
  }
}
