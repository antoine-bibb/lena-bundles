// src/lib/products.js
export const products = [
  {
    id: "straight",
    name: "Premium Straight Bundle",
    origin: "Brazilian",
    texture: "Straight",
    images: ["/images/straight1.jpg"],
    description:
      "Silky, bone-straight finish with natural luster. 100% virgin human hair—soft, tangle-resistant, and easy to style.",
    // length -> Stripe price ID (price_...)
    pricesByLength: {
      12: "price_REPLACE_STRAIGHT_12",
      14: "price_REPLACE_STRAIGHT_14",
      16: "price_REPLACE_STRAIGHT_16",
      18: "price_REPLACE_STRAIGHT_18",
      20: "price_REPLACE_STRAIGHT_20",
      22: "price_REPLACE_STRAIGHT_22",
      24: "price_REPLACE_STRAIGHT_24",
    },
    // (optional) for showing a "From $" on cards:
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
    displayFrom: 80.0,
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
    displayFrom: 95.0,
  },
];