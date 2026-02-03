import { NextResponse } from "next/server";
import { customerInfo } from "@/app/lib/customerInfo";

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json(
        { status: false, error: "Email required" },
        { status: 400 }
      );
    }

    const result = await customerInfo(email);

    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(
      { status: false, error: "Server error" },
      { status: 500 }
    );
  }
}
