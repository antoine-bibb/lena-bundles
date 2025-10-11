// node scripts/create-prices.js --product=prod_ABC123 --currency=usd --base=79.99
import Stripe from "stripe";

const args = Object.fromEntries(process.argv.slice(2).map(p => {
  const [k,v] = p.replace(/^--/, "").split("=");
  return [k, v];
}));

const PRODUCT_ID = args.product;             // e.g. prod_ABC123 (Stripe Product ID)
const CURRENCY   = args.currency || "usd";
const BASE       = parseFloat(args.base || "79.99"); // base for 12"
const INCREMENTS = 10; // $ increase per +2"

const LENGTHS = [12,14,16,18,20,22,24];

function priceForLength(len) {
  const steps = (len - 12) / 2;
  return BASE + Math.max(0, steps) * INCREMENTS;
}

async function main() {
  if (!process.env.STRIPE_SECRET_KEY) throw new Error("Missing STRIPE_SECRET_KEY");
  if (!PRODUCT_ID) throw new Error("Pass --product=prod_...");

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
  const result = {};

  for (const len of LENGTHS) {
    const amount = Math.round(priceForLength(len) * 100);
    const price = await stripe.prices.create({
      product: PRODUCT_ID,
      unit_amount: amount,
      currency: CURRENCY,
      metadata: { length: String(len) },
      nickname: `${len} inch`,
    });
    result[len] = price.id;
    console.log(`${len}" -> ${price.id}  ($${(amount/100).toFixed(2)})`);
  }

  console.log("\nPaste into products.js:\n", JSON.stringify(result, null, 2));
}

main().catch(e => { console.error(e); process.exit(1); });