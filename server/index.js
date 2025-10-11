import express from "express";
import cors from "cors";
import Stripe from "stripe";
import "dotenv/config";

const app = express();
app.use(cors({ origin: process.env.FRONTEND_URL || "http://localhost:5173" }));
app.use(express.json());

const stripeSecret = process.env.STRIPE_SECRET_KEY;
const stripe = stripeSecret ? new Stripe(stripeSecret, { apiVersion: "2024-06-20" }) : null;

app.post("/api/create-checkout-session", async (req, res) => {
  try {
    if (!stripe) return res.status(500).json({ error: "Missing STRIPE_SECRET_KEY" });

    const items = req.body?.items;
    const discountRate = Number(req.body?.discountRate) || 0;

    if (!Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ error: "No items" });
    }
    for (const i of items) {
      if (!i?.name || !Number.isFinite(i?.amount) || !Number.isFinite(i?.quantity)) {
        return res.status(400).json({ error: "Invalid line item" });
      }
      if (i.amount < 50) return res.status(400).json({ error: "Amount must be >= $0.50" });
    }

    let discounts;
    if (discountRate > 0) {
      const percentOff = Math.round(discountRate * 100);
      const coupon = await stripe.coupons.create({ percent_off: percentOff, duration: "once" });
      discounts = [{ coupon: coupon.id }];
    }

    const base = process.env.FRONTEND_URL || "http://localhost:5173";

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      billing_address_collection: "auto",
      shipping_address_collection: { allowed_countries: ["US", "CA"] },
      line_items: items.map((i) => ({
        price_data: {
          currency: "usd",
          product_data: { name: i.name },
          unit_amount: Math.round(i.amount),
        },
        quantity: Math.round(i.quantity),
      })),
      discounts,
      success_url: `${base}/success`,
      cancel_url: `${base}/cancel`,
    });

    res.json({ url: session.url });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message || "Stripe error" });
  }
});

const PORT = process.env.PORT || 4242;
app.listen(PORT, () => console.log(`Server listening on ${PORT}`));
