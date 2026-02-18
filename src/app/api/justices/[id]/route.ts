import { NextRequest, NextResponse } from "next/server";

const OYEZ_BASE = "https://api.oyez.org";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  try {
    const res = await fetch(`${OYEZ_BASE}/people/${id}`, {
      headers: { "User-Agent": "SCOTUS-Encyclopedia/1.0" },
    });
    if (!res.ok) throw new Error("Justice not found");
    const data = await res.json();
    return NextResponse.json(data);
  } catch {
    return NextResponse.json({ error: "Justice not found" }, { status: 404 });
  }
}
