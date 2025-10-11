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

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: items.map(i => ({
        price: i.priceId,
        quantity: Number(i.quantity || 1),
      })),
      success_url: `${process.env.SITE_URL}/success`,
      cancel_url: `${process.env.SITE_URL}/cart`,
      shipping_address_collection: { allowed_countries: ["US", "CA"] },
      automatic_tax: { enabled: true }, // optional
    });

    return res.status(200).json({ url: session.url });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Stripe error" });
  }
}
