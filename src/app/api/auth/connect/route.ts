import { NextResponse } from "next/server";

export async function POST() {
  try {
    const clientId = process.env.FINCH_CLIENT_ID;
    const clientSecret = process.env.FINCH_CLIENT_SECRET;
    const redirectUri = "http://localhost:3000/api/auth/callback";

    if (!clientId || !clientSecret || !redirectUri) {
      return NextResponse.json(
        { error: "Missing Finch environment variables" },
        { status: 500 }
      );
    }

    const response = await fetch("https://api.tryfinch.com/connect/sessions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Finch-API-Version": "2020-09-17",
        Authorization:
          "Basic " +
          Buffer.from(`${clientId}:${clientSecret}`).toString("base64"),
      },
      body: JSON.stringify({
        sandbox: "finch",
        customer_id: process.env.CUSTOMER_ID,
        customer_name: process.env.CUSTOMER_NAME,
        products: ["company", "directory", "individual", "employment"],
        redirect_uri: redirectUri,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text(); // 👈 grab body as text
      console.error("Finch connect error:", response.status, errorText);
    
      return NextResponse.json(
        { error: "Failed to create Finch Connect session", details: errorText },
        { status: response.status }
      );
    }    

    const data = await response.json();
    return NextResponse.json({ url: data.connect_url });
  } catch (err: any) {
    return NextResponse.json(
      { error: "Unexpected error creating Finch Connect session", details: err.message },
      { status: 500 }
    );
  }
}
