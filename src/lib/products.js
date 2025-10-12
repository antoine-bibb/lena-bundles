// src/lib/products.js
export const money = (centsOrDollars) =>
  (centsOrDollars >= 100 ? `$${(centsOrDollars / 100).toFixed(2)}` : `$${Number(centsOrDollars).toFixed(2)}`);

export const products = [
  {
    id: "Straight",
    name: "Premium Straight Bundle",
    origin: "Brazilian",
    texture: "Straight",
    images: ["/images/straight1.jpg"],
    description:
      "Silky, bone-straight finish with natural luster. 100% virgin human hair—soft, tangle-resistant, and easy to style.",
    // length -> Stripe price ID
    pricesByLength: {
      12: "price_1SHGyWFt8RfBt8VucTcFUZG0",
      14: "price_1SHH0QFt8RfBt8VupLUQIxeP",
      16: "price_REPLACE_STRAIGHT_16",
      18: "price_REPLACE_STRAIGHT_18",
      20: "price_REPLACE_STRAIGHT_20",
      22: "price_REPLACE_STRAIGHT_22",
      24: "price_REPLACE_STRAIGHT_24",
    },
    // UI amounts in DOLLARS for display
    uiPricesByLength: {
      12: 79.99,
      14: 89.99,
      16: 99.99,
      18: 109.99,
      20: 119.99,
      22: 129.99,
      24: 139.99,
    },
    displayFrom: 79.99,
  },

  {
    id: "wavy",
    name: "Luxe Wavy Bundle",
    origin: "Peruvian",
    texture: "Wavy",
    images: ["/images/wavy1.jpg"],
    description:
      "Soft, natural waves with effortless movement and volume. Heat-safe and blends beautifully for everyday glam.",
    pricesByLength: {
      12: "price_REPLACE_WAVY_12",
      14: "price_REPLACE_WAVY_14",
      16: "price_REPLACE_WAVY_16",
      18: "price_REPLACE_WAVY_18",
      20: "price_REPLACE_WAVY_20",
      22: "price_REPLACE_WAVY_22",
      24: "price_REPLACE_WAVY_24",
    },
    uiPricesByLength: {
      12: 74.99,
      14: 84.99,
      16: 94.99,
      18: 104.99,
      20: 114.99,
      22: 124.99,
      24: 134.99,
    },
    displayFrom: 74.99,
  },

  {
    id: "water-wave",
    name: "Water Wave Bundle",
    origin: "Malaysian",
    texture: "Water Wave",
    images: ["/images/waterwave.jpg"],
    description:
      "Bouncy, beachy curls that hold shape after washing. 100% virgin human hair with shine, body, and longevity.",
    pricesByLength: {
      12: "price_REPLACE_WATER_12",
      14: "price_REPLACE_WATER_14",
      16: "price_REPLACE_WATER_16",
      18: "price_REPLACE_WATER_18",
      20: "price_REPLACE_WATER_20",
      22: "price_REPLACE_WATER_22",
      24: "price_REPLACE_WATER_24",
    },
    uiPricesByLength: {
      12: 85.99,
      14: 95.99,
      16: 105.99,
      18: 115.99,
      20: 125.99,
      22: 135.99,
      24: 145.99,
    },
    displayFrom: 85.99,
  },
];