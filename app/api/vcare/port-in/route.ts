import { NextResponse } from "next/server";
import { vcareFetch } from "../_lib/vcareClient";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const payload = {
      enrollment_id: body.enrollment_id || "",
      first_name: body.first_name || "",
      last_name: body.last_name || "",
      account_number: body.account_number || "",
      zip_code: body.zip_code || "",
      state: body.state || "",
      city: body.city || "",
      address_one: body.address_one || "",
      address_two: body.address_two || "",
      password_pin: body.password_pin || "",
      port_number: body.port_number || "",
      imei: body.imei || "",
      sim: body.sim || "",
      current_carrier: body.current_carrier || "",

      // static values (same as PHP)
      action:
        "create_portin_v2_when_create_customer_was_called_without_portin_tag",
      agent_id: "ewebsiteapi",
      source: "WEBSITE",
    };

    const data = await vcareFetch("port", payload);

    // Handle VCare error structure
    if (data?.errors?.length) {
      return NextResponse.json(
        {
          msg: data.msg || "Port-in failed",
          errors: data.errors,
        },
        { status: 400 }
      );
    }

    return NextResponse.json(data);
  } catch (err: any) {
    console.error("Port-in error:", err);

    return NextResponse.json(
      { msg: err.message || "Server error" },
      { status: 500 }
    );
  }
}
