import { NextResponse } from "next/server";
import { ensurePlansSeeded } from "@/lib/plans";

export async function POST() {
  try {
    await ensurePlansSeeded();
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("seed error", error);
    return NextResponse.json({ error: "Seed failed" }, { status: 500 });
  }
}
