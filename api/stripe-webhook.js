// api/stripe-webhook.js
import Stripe from "stripe";

export const config = {
  api: {
    bodyParser: false, // raw body for Stripe signature verification
  },
};

function buffer(req) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    req.on("data", (c) => chunks.push(c));
    req.on("end", () => resolve(Buffer.concat(chunks)));
    req.on("error", reject);
  });
}

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  const buf = await buffer(req);
  const sig = req.headers["stripe-signature"];
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

  let event;
  try {
    event = stripe.webhooks.constructEvent(
      buf,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.error("Webhook signature verification failed.", err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  try {
    if (event.type === "checkout.session.completed") {
      const session = event.data.object;

      // TODO: save to your DB (order, customer_email, amount_total, etc.)
      // Example log:
      console.log("✅ Order paid:", {
        id: session.id,
        amount_total: session.amount_total,
        currency: session.currency,
        email: session.customer_details?.email,
      });
    }

    res.json({ received: true });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Webhook handling failed" });
  }
}
