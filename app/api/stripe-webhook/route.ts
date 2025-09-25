// app/api/stripe-webhook/route.ts
import { NextResponse } from "next/server";
import Stripe from "stripe";
import { client } from "@/sanity/lib/client";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2025-08-27.basil", // Use the latest API version
});

// Define types for the data
type CartItem = {
  id: string;
  name: string;
  description: string;
  price: number;
  quantity: number;
};

type Address = {
  _id?: string;
  name?: string;
  email?: string;
  address?: string;
  city?: string;
  state?: string;
  zip?: string;
};

export async function POST(req: Request) {
  const body = await req.text();
  const sig = req.headers.get("stripe-signature") as string;

  try {
    const event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET as string
    );

    if (event.type === "checkout.session.completed") {
      const session = event.data.object as Stripe.Checkout.Session;

      // Parse metadata from the session
      const cart: CartItem[] = session.metadata?.cart
        ? JSON.parse(session.metadata.cart)
        : [];
      const address: Address = session.metadata?.address
        ? JSON.parse(session.metadata.address)
        : {};
      const orderNumber = session.metadata?.orderNumber || "";

      console.log("✅ Payment Success. Cart:", cart, "Address:", address);

      // Find the pending order in Sanity by the checkout session ID
      const existingOrders = await client.fetch(
        `*[_type == "order" && stripeCheckoutSessionId == $sessionId][0]`,
        { sessionId: session.id }
      );

      if (existingOrders) {
        // Update the order status to paid
        await client
          .patch(existingOrders._id)
          .set({
            status: "paid",
            stripePaymentIntentId: session.payment_intent as string,
            stripeCustomerId: session.customer as string,
          })
          .commit();

        console.log(`✅ Order ${orderNumber} updated to paid status in Sanity`);
      } else {
        // If the order doesn't exist (unlikely but possible), create it
        await client.create({
          _type: "order",
          orderNumber: orderNumber || `ORD-${Math.random().toString(36).substring(2, 10).toUpperCase()}`,
          stripeCheckoutSessionId: session.id,
          stripePaymentIntentId: session.payment_intent as string,
          stripeCustomerId: session.customer as string,
          customerName: address.name || "",
          email: address.email || "",
          products: cart.map((item) => ({
            product: {
              _type: "reference",
              _ref: item.id,
            },
            quantity: item.quantity,
          })),
          totalPrice: cart.reduce((total, item) => total + item.price * item.quantity, 0),
          currency: "USD",
          amountDiscount: 0,
          address: {
            state: address.state || "",
            zip: address.zip || "",
            city: address.city || "",
            address: address.address || "",
            name: address.name || "",
          },
          status: "paid",
          orderDate: new Date().toISOString(),
        });

        console.log(`✅ New order created in Sanity for session ${session.id}`);
      }
    }

    return NextResponse.json({ received: true });
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.error("Webhook Error:", err.message);
      return NextResponse.json({ error: err.message }, { status: 400 });
    }
    console.error("Webhook Unknown Error");
    return NextResponse.json({ error: "Unknown webhook error" }, { status: 400 });
  }
}