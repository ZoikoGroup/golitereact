import Stripe from "stripe";
import { NextResponse } from "next/server";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-12-15.clover", // ✅ USE STABLE VERSION
});

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const {
      cart = [],
      billingAddress = {},
      shippingAddress = {},
      subtotal = 0,
      shippingFee = 0,
      discountAmount = 0,
      total,
    } = body;

    // 🔥 HARD GUARD (prevents 500)
    if (!total || isNaN(Number(total))) {
      console.error("❌ Invalid total:", body);
      return NextResponse.json(
        { error: "Invalid total amount" },
        { status: 400 }
      );
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(Number(total) * 100),
      currency: "usd",

      metadata: {
        cart: JSON.stringify(cart),
        billing: JSON.stringify(billingAddress),
        shipping: JSON.stringify(shippingAddress),
        subtotal: String(subtotal),
        shippingFee: String(shippingFee),
        discount: String(discountAmount),
      },
    });

    return NextResponse.json({
      clientSecret: paymentIntent.client_secret,
      paymentIntentResponse: paymentIntent,
    });
  } catch (err: any) {
    console.error("❌ Stripe PI Error:", err.message);
    return NextResponse.json(
      { error: err.message },
      { status: 500 }
    );
  }
}
