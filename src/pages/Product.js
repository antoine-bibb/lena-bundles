// src/pages/Product.js
import React, { useEffect, useMemo, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { products as PRODUCT_LIST } from "../lib/products";
import { useCart } from "../context/CartContext";

const money = (n) => (Number.isFinite(n) ? `$${Number(n).toFixed(2)}` : "$—");

export default function Product() {
  const { id } = useParams();

  // Find the product from your catalog
  const product = useMemo(() => PRODUCT_LIST.find((p) => p.id === id), [id]);

  // Build lengths list from product (or empty array while unknown)
  const lengths = useMemo(
    () =>
      Object.keys(product?.pricesByLength || {})
        .map(Number)
        .sort((a, b) => a - b),
    [product]
  );

  // Keep selected length in state; initialize when lengths become available
  const [length, setLength] = useState(0);
  useEffect(() => {
    if (lengths.length) setLength(lengths[0]);
  }, [lengths]);

  // Cart (must be unconditional)
  const { add } = useCart();

  // Compute price info (guards for missing product/length)
  const priceId = product?.pricesByLength?.[length];
  const uiPrice = product?.uiPricesByLength?.[length] ?? product?.displayFrom ?? 0;
  const canBuy = !!priceId && !String(priceId).startsWith("price_REPLACE_");

  const addToCart = () => {
    if (!product || !canBuy) {
      alert("This length is not available yet. Please try another.");
      return;
    }
    add({
      id: `${product.id}_${length}`,
      name: `${product.name} — ${length}"`,
      price: uiPrice,      // for display; Stripe will charge by priceId
      priceId,             // REQUIRED for checkout
      qty: 1,
      image: product.images?.[0],
      length,
    });
    alert(`${product.name} ${length}" added to cart`);
  };

  // ---- Render ----
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

  return (
    <div className="container py-5">
      <Link to="/shop" className="text-decoration-none text-secondary">
        ← Back to shop
      </Link>

      <div className="row g-5 mt-2">
        {/* LEFT: Image */}
        <div className="col-md-6">
          <div className="ratio ratio-1x1">
            <img
              src={product.images?.[0]}
              alt={product.name}
              className="w-100 h-100 object-cover rounded-4 shadow-soft"
            />
          </div>
        </div>

        {/* RIGHT: Info */}
        <div className="col-md-6">
          <h2 className="mb-1">{product.name}</h2>
          <p className="text-muted mt-2">
            {product.origin} • {product.texture}
          </p>

          <div className="mt-3">
            <label className="form-label fw-semibold">Length</label>
            <select
              className="form-select"
              value={length}
              onChange={(e) => setLength(Number(e.target.value))}
              disabled={!lengths.length}
            >
              {lengths.map((l) => {
                const disabled = String(product.pricesByLength[l]).startsWith(
                  "price_REPLACE_"
                );
                return (
                  <option key={l} value={l} disabled={disabled}>
                    {l}" {disabled ? "(coming soon)" : ""}
                  </option>
                );
              })}
            </select>
          </div>

          <div className="h4 mt-3">{money(uiPrice)}</div>

          <button
            className="btn btn-primary mt-2"
            onClick={addToCart}
            disabled={!canBuy}
            title={!canBuy ? "Length not available yet" : "Add to cart"}
          >
            {canBuy ? "Add to cart" : "Unavailable"}
          </button>

          <p className="mt-4 text-muted">{product.description}</p>
        </div>
      </div>
    </div>
  );
}