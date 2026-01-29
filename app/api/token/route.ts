import { NextResponse } from "next/server";

export async function POST() {
  try {
    const response = await fetch(process.env.VCARE_AUTH_URL!, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        vendor_id: process.env.VCARE_VENDOR_ID,
        username: process.env.VCARE_USERNAME,
        password: process.env.VCARE_PASSWORD,
        pin: process.env.VCARE_PIN,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      return NextResponse.json(
        { error: "Authentication failed", details: errorText },
        { status: response.status }
      );
    }

    const data = await response.json();

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error("Token API Error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
