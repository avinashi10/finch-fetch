import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const token = req.cookies.get("finch_token")?.value;
  if (!token) return NextResponse.json({ error: "Not connected" }, { status: 401 });

  const employeeId = req.nextUrl.searchParams.get("employee_id");
  if (!employeeId) return NextResponse.json({ error: "Missing employee_id" }, { status: 400 });

  const resp = await fetch(
    `https://api.tryfinch.com/employer/individual?employee_id=${encodeURIComponent(employeeId)}`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Finch-API-Version": "2020-09-17",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        requests: [{
          individual_id: employeeId,
        }],
      }),
    }
  );

  if (!resp.ok) {
    const details = await resp.json().catch(() => ({}));
    if (resp.status === 404 || resp.status === 501) {
      return NextResponse.json(
        { error: "not_implemented" },
        { status: resp.status }
      );
    }
    return NextResponse.json(
      { error: "Failed to fetch individual", details },
      { status: resp.status }
    );
  }  

  const data = await resp.json();
  return NextResponse.json(data);
}
