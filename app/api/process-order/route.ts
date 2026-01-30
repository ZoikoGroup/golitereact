import Stripe from "stripe";
import { NextResponse } from "next/server";
import { processOrder } from "../../lib/processOrder";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-12-15.clover",
});

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const { paymentIntentId } = data;

    // 🔒 VERIFY PAYMENT WITH STRIPE
    const intent = await stripe.paymentIntents.retrieve(paymentIntentId);

    if (intent.status !== "succeeded") {
      return NextResponse.json(
        { error: "Payment not successful" },
        { status: 400 }
      );
    }

    // 🔥 CENTRALIZED ORDER PROCESSING
    const telecomResult = await processOrder({
      ...data,
      amount: intent.amount / 100,
      currency: intent.currency,
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
