import { NextResponse } from "next/server";
import { vcareFetch } from "../_lib/vcareClient";

export async function POST(req: Request) {
  try {
    const { imei } = await req.json();

    if (!imei) {
      return NextResponse.json(
        { message: "IMEI required" },
        { status: 400 }
      );
    }

    const data = await vcareFetch("inventory", { imei });

    return NextResponse.json(data);
  } catch (err: any) {
    return NextResponse.json(
      { message: err.message || "Server error" },
      { status: 500 }
    );
  }
}
