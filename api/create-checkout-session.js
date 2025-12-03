// api/create-checkout-session.js
const Stripe = require("stripe");
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

module.exports = async (req, res) => {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { items } = req.body;

    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ error: "No items sent to checkout." });
    }

    const line_items = items.map((item) => {
      if (!item.priceId) {
        throw new Error(`Missing priceId for cart item: ${item.name}`);
      }
      return {
        price: item.priceId,
        quantity: item.qty || 1,
      };
    });

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items,
      success_url: `${process.env.CLIENT_URL}/success`,
      cancel_url: `${process.env.CLIENT_URL}/cancel`,
    });

    return res.status(200).json({ url: session.url });
  } catch (err) {
    console.error("Stripe checkout error:", err);
    return res.status(500).json({
      error: err.message || "Stripe checkout failed.",
    });
  }
};