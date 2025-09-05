import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const token = req.cookies.get("finch_token")?.value;
  if (!token) {
    return NextResponse.json({ error: "Not connected" }, { status: 401 });
  }

  const resp = await fetch("https://api.tryfinch.com/employer/directory", {
    headers: {
      Authorization: `Bearer ${token}`,
      "Finch-API-Version": "2020-09-17",
    },
  });

  if (!resp.ok) {
    const details = await resp.text();
    return NextResponse.json(
      { error: "Failed to fetch directory", details },
      { status: resp.status }
    );
  }

  const data = await resp.json();
  return NextResponse.json(data);
}
