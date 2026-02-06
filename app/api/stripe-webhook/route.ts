import Stripe from "stripe";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2026-01-28.clover",
});


export async function POST(req: Request) {
  const body = await req.text();
 const headersList = await headers();
  const sig = headersList.get("stripe-signature");

  if (!sig) {
    return new NextResponse("Missing Stripe signature", { status: 400 });
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err: any) {
    return new NextResponse(`Webhook Error: ${err.message}`, { status: 400 });
  }

  if (event.type === "payment_intent.succeeded") {
    const intent = event.data.object as Stripe.PaymentIntent;

    const orderData = {
        paymentIntentId: intent.id,
        amount: intent.amount / 100,
        currency: intent.currency,
        cart: JSON.parse(intent.metadata.cart || "[]"),
        billing: JSON.parse(intent.metadata.billing || "{}"),
        shipping: JSON.parse(intent.metadata.shipping || "{}"),
        subtotal: Number(intent.metadata.subtotal),
        shippingFee: Number(intent.metadata.shippingFee),
        discount: Number(intent.metadata.discount),
        status: "PAID",
        createdAt: new Date(),
    };

    // 🔥 SAVE ORDER HERE
    // DB example:
    // await db.orders.create({ data: orderData });

    console.log("✅ Order saved:", orderData);
  }

  return NextResponse.json({ received: true });
}
