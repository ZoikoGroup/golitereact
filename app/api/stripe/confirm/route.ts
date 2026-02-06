import Stripe from "stripe";
import { NextResponse } from "next/server";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: Request) {
  try {
    const { paymentIntentId } = await req.json();

    if (!paymentIntentId) {
      return NextResponse.json(
        { error: "paymentIntentId is required" },
        { status: 400 }
      );
    }

    const paymentIntent = await stripe.paymentIntents.retrieve(
      paymentIntentId
    );

    const transaction_id =
      typeof paymentIntent.payment_method === "string"
        ? paymentIntent.payment_method
        : paymentIntent.payment_method?.id ?? null;

    const charge_id = typeof paymentIntent.latest_charge === "string" ? paymentIntent.latest_charge : paymentIntent.latest_charge?.id ?? null;    
    
    console.log("✅ Stripe Confirmed:", {
      paymentIntentId: paymentIntent.id,
      status: paymentIntent.status,
      transaction_id,
      charge_id,
    });
    return NextResponse.json({
      success: true,
      status: paymentIntent.status,
      transaction_id, // pm_***
      charge_id,       // ch_***
    });
  } catch (err: any) {
    console.error("❌ Stripe Confirm Error:", err.message);

    return NextResponse.json(
      { success: false, error: err.message },
      { status: 500 }
    );
  }
}
