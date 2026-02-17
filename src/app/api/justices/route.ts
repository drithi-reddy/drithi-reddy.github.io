import { NextResponse } from "next/server";

const OYEZ_BASE = "https://api.oyez.org";

export async function GET() {
  try {
    const res = await fetch(`${OYEZ_BASE}/people?person_type=scotus_justice`);
    if (!res.ok) throw new Error("Oyez API error");
    const data = await res.json();
    return NextResponse.json(data);
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch justices" },
      { status: 502 }
    );
  }
}
