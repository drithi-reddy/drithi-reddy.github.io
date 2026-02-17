import { NextRequest, NextResponse } from "next/server";

const OYEZ_BASE = "https://api.oyez.org";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const term = searchParams.get("term");
  const perPage = searchParams.get("per_page") || "24";
  const page = searchParams.get("page") || "1";

  const params = new URLSearchParams();
  if (term) params.set("filter", `term:${term}`);
  params.set("per_page", perPage);
  params.set("page", page);

  try {
    const res = await fetch(`${OYEZ_BASE}/cases?${params}`);
    if (!res.ok) throw new Error("Oyez API error");
    const data = await res.json();
    return NextResponse.json(data);
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to fetch cases" },
      { status: 502 }
    );
  }
}
