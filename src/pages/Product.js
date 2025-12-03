// src/pages/Product.js
import React, { useMemo, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { products as PRODUCT_LIST } from "../lib/products";
import { useCart } from "../context/CartContext";

// UI prices only – Stripe uses priceId
const DISPLAY_PRICES = {
  straight: {
    12: 79.99,
    14: 89.99,
    16: 99.99,
    18: 109.99,
    20: 119.99,
    22: 129.99,
    24: 139.99,
  },
  wavy: {
    12: 80.0,
    14: 90.0,
    16: 100.0,
    18: 110.0,
    20: 120.0,
    22: 130.0,
    24: 140.0,
  },
  "water-wave": {
    12: 95.0,
    14: 105.0,
    16: 115.0,
    18: 125.0,
    20: 135.0,
    22: 145.0,
    24: 155.0,
  },
};

export default function Product() {
  const { id } = useParams();
  const { add } = useCart();

  const product = useMemo(
    () => PRODUCT_LIST.find((p) => p.id === id),
    [id]
  );

  // ❗ if product is missing, bail out BEFORE any hooks are used
  if (!product) {
    return (
      <div className="container py-5">
        <Link to="/shop" className="text-decoration-none text-secondary">
          ← Back to shop
        </Link>
        <p className="mt-3">Product not found.</p>
      </div>
    );
  }

  const lengths = useMemo(
    () =>
      Object.keys(product.pricesByLength || {})
        .map(Number)
        .sort((a, b) => a - b),
    [product]
  );

  const [length, setLength] = useState(lengths[0]);
  const uiPrice =
    DISPLAY_PRICES[product.id]?.[length] ??
    product.displayFrom ??
    0;

  function addToCart() {
    const priceId = product.pricesByLength?.[length];
    if (!priceId) {
      alert(
        `This length (${length}") is not available yet. Please choose another length.`
      );
      return;
    }

    add({
      id: `${product.id}_${length}`,
      name: `${product.name} — ${length}"`,
      price: uiPrice,
      priceId,
      qty: 1,
      image: product.images?.[0],
      length,
    });

    alert(`${product.name} ${length}" added to cart`);
  }

  return (
    <div className="container py-5">
      <Link to="/shop" className="text-decoration-none text-secondary">
        ← Back to shop
      </Link>

      <div className="row g-5 mt-2">
        <div className="col-md-6">
          <div className="ratio ratio-1x1">
            <img
              src={product.images?.[0]}
              alt={product.name}
              className="w-100 h-100 object-cover"
            />
          </div>
        </div>

        <div className="col-md-6">
          <h2 className="mb-1">{product.name}</h2>
          <p className="text-muted mt-2">
            {product.origin} • {product.texture}
          </p>

          <div className="mt-3">
            <label className="form-label">Length</label>
            <select
              className="form-select"
              value={length}
              onChange={(e) => setLength(Number(e.target.value))}
            >
              {lengths.map((l) => (
                <option key={l} value={l}>
                  {l}"
                </option>
              ))}
            </select>
          </div>

          <div className="h4 mt-3">${uiPrice.toFixed(2)}</div>
          <button className="btn btn-primary mt-2" onClick={addToCart}>
            Add to cart
          </button>

          <p className="mt-3">{product.description}</p>
        </div>
      </div>
    </div>
  );
}