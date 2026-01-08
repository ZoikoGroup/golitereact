import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { model } = await req.json();

    if (!model) {
      return NextResponse.json(
        { success: false, message: "IMEI required" },
        { status: 400 }
      );
    }

    // ---- AUTH ----
    const authRes = await fetch("https://www.vcareapi.com:8080/authenticate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        vendor_id: process.env.VCARE_VENDOR_ID,
        username: process.env.VCARE_USERNAME,
        password: process.env.VCARE_PASSWORD,
        pin: process.env.VCARE_PIN,
      }),
    });

    const authData = await authRes.json();
    if (!authData?.token) {
      return NextResponse.json(
        { success: false, message: "Authentication failed" },
        { status: 401 }
      );
    }

    // ---- INVENTORY ----
    const inventoryRes = await fetch(
      "https://www.vcareapi.com:8080/inventory",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          token: authData.token,
        },
        body: JSON.stringify({
          action: "get_query_device",
          carrier: "BLUECONNECTSATT",
          source: "WEBSITE",
          agent_id: "ewebsiteapi",
          imei: model,
        }),
      }
    );

    const inventoryData = await inventoryRes.json();

    return NextResponse.json({ success: true, data: inventoryData });
  } catch (e: any) {
    return NextResponse.json(
      { success: false, message: e.message },
      { status: 500 }
    );
  }
}
