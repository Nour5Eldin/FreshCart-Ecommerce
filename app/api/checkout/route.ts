// app/api/checkout/route.ts
import Stripe from "stripe";
import { NextRequest, NextResponse } from "next/server";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-08-27.basil",
});

type CartItem = {
  name: string;
  description: string;
  price: number;
  quantity: number;
};

export async function POST(req: NextRequest) {
  try {
    const { cartItems, address }: { cartItems: CartItem[]; address: string } = await req.json();

    if (!cartItems || cartItems.length === 0) {
      return NextResponse.json({ error: "Cart is empty" }, { status: 400 });
    }

    const lineItems = cartItems.map((item: CartItem) => ({
      price_data: {
        currency: "usd",
        product_data: {
          name: item.name,
          description: item.description,
        },
        unit_amount: item.price * 100,
      },
      quantity: item.quantity,
    }));

    const session = await stripe.checkout.sessions.create({
  payment_method_types: ["card"],
  line_items: lineItems,
  mode: "payment",
  success_url: `${req.headers.get("origin")}/order-success`, // هنا
  cancel_url: `${req.headers.get("origin")}/cart`,
  metadata: {
    address: JSON.stringify(address),
  },
});

    return NextResponse.json({ id: session.id });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Stripe checkout failed" }, { status: 500 });
  }
}
