import Stripe from "stripe";
import { NextResponse } from "next/server";
import { processOrder } from "../../lib/processOrder";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const { paymentIntentId } = data;

    if (!paymentIntentId) {
      return NextResponse.json(
        { error: "paymentIntentId is required" },
        { status: 400 }
      );
    }

    // 🔒 VERIFY PAYMENT
    const intent = await stripe.paymentIntents.retrieve(paymentIntentId);

    if (intent.status !== "succeeded") {
      return NextResponse.json(
        { error: "Payment not successful" },
        { status: 400 }
      );
    }

    // ✅ STRIPE IDS
    const transaction_id =
      typeof intent.payment_method === "string"
        ? intent.payment_method
        : intent.payment_method?.id ?? null;

    const charge_id =
      typeof intent.latest_charge === "string"
        ? intent.latest_charge
        : intent.latest_charge?.id ?? null;

     // 🔥 AFTER PAYMENT → ENROLLMENT API
    const telecomResult = await processOrder({
      ...data,
      amount: intent.amount / 100,
      currency: intent.currency,
      transaction_id, // pm_***
      charge_id,       // ch_***
    });

    return NextResponse.json({
      success: true,
      telecomResult,
    });
  } catch (err: any) {
    console.error("❌ process-order error:", err.message);
    return NextResponse.json(
      { error: err.message },
      { status: 500 }
    );
  }
}
