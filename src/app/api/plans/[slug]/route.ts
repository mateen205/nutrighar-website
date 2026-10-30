import { NextResponse } from "next/server";
import { getPlanBySlug } from "@/lib/plans";

export async function GET(
  _request: Request,
  context: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await context.params;
    const plan = await getPlanBySlug(slug);
    if (!plan || !plan.isActive) {
      return NextResponse.json({ error: "Plan not found" }, { status: 404 });
    }
    return NextResponse.json({ plan });
  } catch (error) {
    console.error("plan detail error", error);
    return NextResponse.json({ error: "Unable to load plan" }, { status: 500 });
  }
}
