// api/create-checkout-session.js
import Stripe from "stripe";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  try {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
    const { items } = req.body; // [{ priceId, quantity }]

    if (!Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ error: "No line items" });
    }

    // /api/create-checkout-session
const session = await stripe.checkout.sessions.create({
    mode: "payment",
    success_url: `${origin}/success`,
    cancel_url: `${origin}/cart`,
    line_items: cart.map((item) => ({
      // Build line item from your UI price map:
      price_data: {
        currency: "usd",
        unit_amount: Math.round(item.uiPrice * 100), // dollars -> cents
        product_data: {
          name: `${item.name} — ${item.length}"`,    // shows inches in Checkout
          images: item.image ? [new URL(item.image, origin).href] : [],
          metadata: { length: String(item.length), productId: item.id },
        },
      },
      quantity: item.qty,
    })),
  });

    return res.status(200).json({ url: session.url });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Stripe error" });
  }
}
