import React, { useEffect, useMemo, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { products as PRODUCT_LIST } from "../lib/products";
import { useCart } from "../context/CartContext";
import Stars from "../components/Stars";
import AlertBox from "../components/AlertBox";

export default function Product() {
  const { id } = useParams();

  // ✅ Lookup product safely
  const product = useMemo(
    () => (Array.isArray(PRODUCT_LIST) ? PRODUCT_LIST : []).find((p) => p.id === id),
    [id]
  );

  // ✅ Cart hook (must always be called)
  const { add } = useCart();

  // ✅ Reviews + form + alert
  const [reviews, setReviews] = useState([]);
  const [form, setForm] = useState({ name: "", rating: "5", text: "" });
  const [alert, setAlert] = useState(null);

  // ✅ Load reviews from localStorage
  useEffect(() => {
    if (!product) return;
    try {
      const saved = JSON.parse(localStorage.getItem(`reviews_${product.id}`) || "[]");
      if (Array.isArray(saved)) setReviews(saved);
    } catch {
      console.warn("Error loading reviews");
    }
  }, [product]);

  // ✅ Save reviews when changed
  useEffect(() => {
    if (!product) return;
    try {
      localStorage.setItem(`reviews_${product.id}`, JSON.stringify(reviews));
    } catch {
      console.warn("Error saving reviews");
    }
  }, [product, reviews]);

  const avg = useMemo(
    () =>
      reviews.length
        ? reviews.reduce((s, r) => s + Number(r.rating || 0), 0) / reviews.length
        : 0,
    [reviews]
  );

  // ✅ Submit new review
  function submitReview(e) {
    e.preventDefault();
    if (!form.name.trim() || !form.text.trim()) return;
    setReviews((prev) => [
      { ...form, rating: Number(form.rating), date: new Date().toISOString() },
      ...prev,
    ]);
    setForm({ name: "", rating: "5", text: "" });
  }

  // ✅ Add to cart
  function addToCart() {
    if (!product) return;
    add({
      id: product.id,
      name: product.name,
      price: Number(product.basePrice),
      qty: 1,
      image: product.images?.[0],
    });
    setAlert({ type: "success", message: `${product.name} added to cart!` });
  }

  // ✅ Handle missing product
  if (!product) {
    return (
      <>
        {alert && (
          <AlertBox
            type={alert.type}
            message={alert.message}
            onClose={() => setAlert(null)}
          />
        )}

        <div className="container py-5">
          <Link to="/" className="text-decoration-none text-secondary">
            ← Back
          </Link>
          <p className="mt-3">Product not found.</p>
        </div>
      </>
    );
  }

  // ✅ Main render
  return (
    <>
      {/* Floating alert */}
      {alert && (
        <AlertBox
          type={alert.type}
          message={alert.message}
          onClose={() => setAlert(null)}
        />
      )}

      <div className="container py-5">
        <Link to="/" className="text-decoration-none text-secondary">
          ← Back to shop
        </Link>

        <div className="row g-5 mt-2">
          {/* Gallery */}
          <div className="col-md-6">
            <div className="ratio ratio-1x1 img-zoom-wrap">
              <img
                src={product.images?.[0]}
                alt={product.name}
                className="w-100 h-100 object-cover rounded shadow-sm"
                style={{ objectFit: "cover", maxHeight: "500px" }}
              />
            </div>
          </div>

          {/* Details */}
          <div className="col-md-6">
            <h2 className="mb-1">{product.name}</h2>
            <div className="d-flex align-items-center gap-2">
              <Stars value={avg} />
              <span className="text-muted small">
                {reviews.length
                  ? `${avg.toFixed(1)} (${reviews.length})`
                  : "No reviews yet"}
              </span>
            </div>

            <p className="text-muted mt-2">
              {product.origin} • {product.texture}
            </p>
            <h4 className="text-secondary mb-3">
              ${product.basePrice?.toFixed?.(2) ?? product.basePrice}
            </h4>
            <p>{product.description}</p>

            <button className="btn btn-primary mt-2" onClick={addToCart}>
              Add to cart
            </button>
          </div>
        </div>

        {/* Reviews */}
        <div className="row g-4 mt-4">
          {/* Write review */}
          <div className="col-md-6">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title mb-3">Leave a review</h5>
                <form onSubmit={submitReview} className="vstack gap-3">
                  <div>
                    <label className="form-label">Name</label>
                    <input
                      className="form-control"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      required
                    />
                  </div>

                  <div>
                    <label className="form-label">Rating</label>
                    <select
                      className="form-select"
                      value={form.rating}
                      onChange={(e) =>
                        setForm({ ...form, rating: e.target.value })
                      }
                    >
                      {[5, 4, 3, 2, 1].map((n) => (
                        <option key={n} value={n}>
                          {n} {n === 1 ? "star" : "stars"}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="form-label">Review</label>
                    <textarea
                      className="form-control"
                      rows={4}
                      value={form.text}
                      onChange={(e) => setForm({ ...form, text: e.target.value })}
                      required
                    />
                  </div>

                  <button className="btn btn-primary" type="submit">
                    Submit review
                  </button>
                </form>
              </div>
            </div>
          </div>

          {/* Review list */}
          <div className="col-md-6">
            <h5 className="mb-3">Customer reviews</h5>
            <div className="vstack gap-3">
              {reviews.length === 0 && (
                <div className="text-muted">
                  Be the first to review this product.
                </div>
              )}

              {reviews.map((r, i) => (
                <div key={i} className="card">
                  <div className="card-body">
                    <div className="d-flex justify-content-between align-items-center">
                      <div className="fw-semibold">{r.name}</div>
                      <Stars value={Number(r.rating)} />
                    </div>
                    <p className="mt-2 mb-1">{r.text}</p>
                    <div className="text-muted small">
                      {new Date(r.date).toLocaleString()}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
