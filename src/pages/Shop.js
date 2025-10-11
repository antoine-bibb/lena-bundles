import React from "react";
import { Link } from "react-router-dom";
import { products } from "../lib/products";

export default function Shop() {
  const list = Array.isArray(products) ? products : [];

  return (
    <section className="container py-5">
      <div className="d-flex align-items-end justify-content-between mb-3">
        <h3 className="m-0">All Products</h3>
        <div className="text-muted small">Free shipping $150+ • 14-day returns</div>
      </div>

      {list.length === 0 && (
        <div className="text-muted">No products yet.</div>
      )}

      <div className="row g-4">
        {list.map((p) => (
          <div key={p.id} className="col-12 col-sm-6 col-lg-4">
            <div className="card h-100 shadow-sm">
              <div className="ratio ratio-4x3 img-zoom-wrap">
                <img src={p.images?.[0]} alt={p.name} className="w-100 h-100 object-cover" />
              </div>
              <div className="card-body d-flex flex-column">
                <h5 className="card-title mb-1">{p.name}</h5>
                <p className="text-muted small">{p.origin} • {p.texture}</p>
                <p className="fw-semibold text-secondary mt-auto">
                  ${p.basePrice?.toFixed?.(2) ?? p.basePrice}
                </p>
                <Link to={`/product/${p.id}`} className="btn btn-outline-primary w-100 mt-3">
                  See more
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
