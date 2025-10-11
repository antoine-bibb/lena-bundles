// src/pages/Product.js (only the key parts)
import React, { useMemo, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { products as PRODUCT_LIST } from "../lib/products";
import { useCart } from "../context/CartContext";

// (Optional) display prices for UI; checkout will trust Stripe priceId
const DISPLAY_PRICES = {
  straight: { 12: 79.99, 14: 89.99, 16: 99.99, 18: 109.99, 20: 119.99, 22: 129.99, 24: 139.99 },
  wavy:    { 12: 80.00, 14: 90.00, 16: 100.00, 18: 110.00, 20: 120.00, 22: 130.00, 24: 140.00 },
  "water-wave": { 12: 85.00, 14: 95.00, 16: 105.00, 18: 115.00, 20: 125.00, 22: 135.00, 24: 145.00 },
};

export default function Product() {
  const { id } = useParams();
  const product = useMemo(() => PRODUCT_LIST.find(p => p.id === id), [id]);
  const { add } = useCart();

  const lengths = useMemo(() => Object.keys(product?.pricesByLength || {}).map(Number).sort((a,b)=>a-b), [product]);
  const [length, setLength] = useState(lengths[0]);
  const uiPrice = DISPLAY_PRICES[product?.id]?.[length] ?? product?.displayFrom ?? 0;

  function addToCart() {
    const priceId = product?.pricesByLength?.[length];
    if (!product || !priceId) {
      alert("This length is not available yet. Please try another length.");
      return;
    }
    add({
      id: `${product.id}_${length}`,
      name: `${product.name} — ${length}"`,
      price: uiPrice,               // display only
      priceId,                      // REQUIRED for Stripe
      qty: 1,
      image: product.images?.[0],
      length,
    });
    alert(`${product.name} ${length}" added to cart`);
  }

  if (!product) {
    return (
      <div className="container py-5">
        <Link to="/shop" className="text-decoration-none text-secondary">← Back to shop</Link>
        <p className="mt-3">Product not found.</p>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <Link to="/shop" className="text-decoration-none text-secondary">← Back to shop</Link>

      <div className="row g-5 mt-2">
        <div className="col-md-6">
          <div className="ratio ratio-1x1">
            <img src={product.images?.[0]} alt={product.name} className="w-100 h-100 object-cover" />
          </div>
        </div>

        <div className="col-md-6">
          <h2 className="mb-1">{product.name}</h2>
          <p className="text-muted mt-2">{product.origin} • {product.texture}</p>

          <div className="mt-3">
            <label className="form-label">Length</label>
            <select className="form-select" value={length} onChange={(e)=>setLength(Number(e.target.value))}>
              {lengths.map(l => <option key={l} value={l}>{l}"</option>)}
            </select>
          </div>

          <div className="h4 mt-3">${uiPrice.toFixed(2)}</div>
          <button className="btn btn-primary mt-2" onClick={addToCart}>Add to cart</button>

          <p className="mt-3">{product.description}</p>
        </div>
      </div>
    </div>
  );
}