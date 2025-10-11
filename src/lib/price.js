export const formatPrice = (n) => `$${n.toFixed(2)}`;

// +$8 per 2" beyond 12"
export function priceForLength(basePrice, length) {
  const over = Math.max(0, length - 12);
  const steps = Math.ceil(over / 2);
  return basePrice + steps * 8;
}
