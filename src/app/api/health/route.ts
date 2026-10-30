import { NextResponse } from "next/server";
import { pool } from "@/db";

export async function GET() {
  try {
    await pool.query("SELECT 1");
    return NextResponse.json({ status: "ok", service: "nutrigar" });
  } catch (error) {
    return NextResponse.json(
      { status: "error", message: error instanceof Error ? error.message : "db unavailable" },
      { status: 500 }
    );
  }
}
