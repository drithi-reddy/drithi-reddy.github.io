import { NextRequest, NextResponse } from "next/server";

const OYEZ_BASE = "https://api.oyez.org";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ term: string; docket: string }> }
) {
  const { term, docket } = await params;

  try {
    const res = await fetch(`${OYEZ_BASE}/cases/${term}/${docket}`);
    if (!res.ok) throw new Error("Case not found");
    const data = await res.json();
    return NextResponse.json(data);
  } catch {
    return NextResponse.json({ error: "Case not found" }, { status: 404 });
  }
}
