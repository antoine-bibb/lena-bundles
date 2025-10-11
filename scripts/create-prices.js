// scripts/create-prices.js  (CommonJS version)
const Stripe = require("stripe");
require("dotenv").config({ path: ".env.local" });  // 👈 load .env.local

if (!process.env.STRIPE_SECRET_KEY) {
  console.error("❌ STRIPE_SECRET_KEY missing. Put it in .env.local or pass inline.");
  process.exit(1);
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// TODO: set a real product id from dashboard
const PRODUCT_ID = "prod_XXXX";

const LENGTHS = [12, 14, 16, 18, 20, 22, 24];
const uiPrices = { 12:79.99, 14:89.99, 16:99.99, 18:109.99, 20:119.99, 22:129.99, 24:139.99 };

async function main() {
  console.log("Using key:", process.env.STRIPE_SECRET_KEY.slice(0, 8) + "…");
  for (const len of LENGTHS) {
    const price = await stripe.prices.create({
      product: PRODUCT_ID,
      unit_amount: Math.round(uiPrices[len] * 100),
      currency: "usd",
      nickname: `${len} inch`,
      metadata: { length: String(len) },
    });
    console.log(`${len}" → ${price.id}`);
  }
}

main().catch((err) => {
  console.error("Error creating prices:", err);
  process.exit(1);
});