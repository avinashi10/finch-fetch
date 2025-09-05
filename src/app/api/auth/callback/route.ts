import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const clientId = process.env.FINCH_CLIENT_ID;
  const clientSecret = process.env.FINCH_CLIENT_SECRET;

  if (!clientId || !clientSecret) {
    return NextResponse.json(
      { error: "Missing FINCH_CLIENT_ID/FINCH_CLIENT_SECRET" },
      { status: 500 }
    );
  }

  const code = req.nextUrl.searchParams.get("code");
  if (!code) {
    return NextResponse.json({ error: "Missing authorization code" }, { status: 400 });
  }

  // Exchange code -> access token
  const tokenResp = await fetch("https://api.tryfinch.com/auth/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Finch-API-Version": "2020-09-17",
      Authorization:
        "Basic " + Buffer.from(`${clientId}:${clientSecret}`).toString("base64"),
    },
    body: JSON.stringify({
      code,
    }),
  });

  if (!tokenResp.ok) {
    const details = await tokenResp.text().catch(() => "");
    return NextResponse.json(
      { error: "Token exchange failed", details },
      { status: tokenResp.status }
    );
  }

  const tokenData = (await tokenResp.json()) as {
    access_token: string;
  };

  // Store token server-side via HttpOnly cookie
  const res = NextResponse.redirect(new URL("/", req.nextUrl.origin));
  res.cookies.set("finch_token", tokenData.access_token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
  });

  return res;
}
