import { NextResponse } from "next/server";
import { activateSim } from "@/app/lib/activateSim";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const result = await activateSim(body);

    return NextResponse.json(result);

  } catch (error) {
    console.error("Activate SIM route error:", error);

    return NextResponse.json(
      { status: false, error: "Activation failed" },
      { status: 500 }
    );
  }
}
