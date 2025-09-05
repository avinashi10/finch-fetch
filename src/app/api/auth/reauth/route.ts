import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const clientId = process.env.FINCH_CLIENT_ID!;
    const clientSecret = process.env.FINCH_CLIENT_SECRET!;
    const redirectUri = "http://localhost:3000/api/auth/callback";

    const { connection_id } = (await req.json().catch(() => ({}))) as {
      connection_id?: string;
    };

    if (!clientId || !clientSecret || !redirectUri || !connection_id) {
      return NextResponse.json(
        { error: "Missing required config (client id/secret, redirect uri, or connection_id)." },
        { status: 500 }
      );
    }

    const resp = await fetch(
      "https://api.tryfinch.com/connect/sessions/reauthenticate",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Finch-API-Version": "2020-09-17",
          Authorization:
            "Basic " + Buffer.from(`${clientId}:${clientSecret}`).toString("base64"),
        },
        body: JSON.stringify({
          connection_id: connection_id,
          redirect_uri: redirectUri,
        }),
      }
    );

    if (!resp.ok) {
      const details = await resp.text();
      console.error("Finch reauth error:", resp.status, details);
      return NextResponse.json(
        { error: "Failed to create Finch reauth session", details },
        { status: resp.status }
      );
    }

    const data = await resp.json();
    return NextResponse.json({ url: data.connect_url });
  } catch (err: any) {
    return NextResponse.json(
      { error: "Unexpected error creating reauth session", details: err?.message },
      { status: 500 }
    );
  }
}
