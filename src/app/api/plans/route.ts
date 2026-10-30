import { NextResponse } from "next/server";
import { getActivePlans } from "@/lib/plans";

export async function GET() {
  try {
    const plans = await getActivePlans();
    return NextResponse.json({ plans });
  } catch (error) {
    console.error("plans error", error);
    return NextResponse.json({ error: "Unable to load plans" }, { status: 500 });
  }
}
