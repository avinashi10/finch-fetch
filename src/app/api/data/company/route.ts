import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const token = req.cookies.get("finch_token")?.value;
  if (!token) {
    return NextResponse.json({ error: "Not connected" }, { status: 401 });
  }

  const resp = await fetch("https://api.tryfinch.com/employer/company", {
    headers: {
      Authorization: `Bearer ${token}`,
      "Finch-API-Version": "2020-09-17",
    },
  });

  if (!resp.ok) {
    const details = await resp.json().catch(() => ({}));
    if (resp.status === 404 || resp.status === 501) {
      return NextResponse.json(
        { error: "not_implemented" },
        { status: resp.status }
      );
    }
    return NextResponse.json(
      { error: "Failed to fetch company", details },
      { status: resp.status }
    );
  }  

  const data = await resp.json();
  return NextResponse.json(data);
}
