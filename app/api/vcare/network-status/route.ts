import { NextResponse } from "next/server";
import { vcareFetch } from "../_lib/vcareClient";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // Validate required fields
    const { zip_code, city } = body;

    if (!zip_code || !city) {
      return NextResponse.json(
        { message: "zip_code and city are required" },
        { status: 400 }
      );
    }

    const data = await vcareFetch("network_status", {
      action: "get_network_status",    
      agent_id: process.env.VCR_AGENT_ID as string,
      source: "WEBSITE",
      zip_code,
      city,
    });

    return NextResponse.json(data);
  } catch (err: any) {
    return NextResponse.json(
      { message: err.message || "Server error" },
      { status: 500 }
    );
  }
}