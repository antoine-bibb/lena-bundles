// src/pages/Cart.js
import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function Cart() {
  const { items, remove, updateQty } = useCart(); // if updateQty not implemented, we won't call it
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState(null);

  const subtotal = useMemo(
    () =>
      (items || []).reduce(
        (sum, it) => sum + (Number(it.price) || 0) * (Number(it.qty) || 1),
        0
      ),
    [items]
  );

  async function handleCheckout() {
    setErr(null);

    if (!items?.length) {
      setErr("Your cart is empty.");
      return;
    }
    const missingPriceId = items.find((i) => !i.priceId);
    if (missingPriceId) {
      setErr(`"${missingPriceId.name}" is missing a Stripe priceId.`);
      return;
    }

    try {
      setLoading(true);
      const res = await fetch("/api/create-checkout-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          // Only send Price IDs + quantities (never client prices) 👇
          items: items.map((i) => ({
            priceId: i.priceId,
            quantity: Number(i.qty || 1),
          })),
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Checkout failed");

      if (data?.url) {
        window.location.href = data.url;
      } else {
        throw new Error("No checkout URL returned from server.");
      }
    } catch (e) {
      setErr(e.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="container py-5">
      <h2 className="mb-4">Your Cart</h2>

      {err && (
        <div className="alert alert-danger" role="alert">
          {err}
        </div>
      )}

      {!items?.length ? (
        <div className="text-muted">
          Your cart is empty. <Link to="/shop">Browse products</Link>
        </div>
      ) : (
        <>
          <div className="table-responsive">
            <table className="table align-middle">
              <thead>
                <tr>
                  <th>Item</th>
                  <th style={{ width: 110 }}>Qty</th>
                  <th className="text-end">Price</th>
                  <th className="text-end">Total</th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {items.map((it, idx) => (
                  <tr key={idx}>
                    <td>
                      <div className="d-flex align-items-center gap-3">
                        {it.image && (
                          <img
                            src={it.image}
                            alt={it.name}
                            style={{
                              width: 64,
                              height: 64,
                              objectFit: "cover",
                              borderRadius: 8,
                            }}
                          />
                        )}
                        <div>
                          <div className="fw-semibold">{it.name}</div>
                          {it.length && (
                            <div className="text-muted small">
                              Length: {it.length}"
                            </div>
                          )}
                          {it.color && (
                            <div className="text-muted small">
                              Color: {it.color}
                            </div>
                          )}
                        </div>
                      </div>
                    </td>

                    <td>
                      {/* If you implemented updateQty in CartContext, show +/-; else just show qty */}
                      {typeof updateQty === "function" ? (
                        <div className="input-group input-group-sm" style={{ width: 110 }}>
                          <button
                            className="btn btn-outline-secondary"
                            type="button"
                            onClick={() =>
                              updateQty(idx, Math.max(1, Number(it.qty || 1) - 1))
                            }
                          >
                            −
                          </button>
                          <input
                            type="number"
                            className="form-control text-center"
                            value={it.qty || 1}
                            min={1}
                            onChange={(e) =>
                              updateQty(idx, Math.max(1, Number(e.target.value || 1)))
                            }
                          />
                          <button
                            className="btn btn-outline-secondary"
                            type="button"
                            onClick={() => updateQty(idx, Number(it.qty || 1) + 1)}
                          >
                            +
                          </button>
                        </div>
                      ) : (
                        <span>{it.qty || 1}</span>
                      )}
                    </td>

                    <td className="text-end">
                      ${Number(it.price || 0).toFixed(2)}
                    </td>
                    <td className="text-end">
                      ${(Number(it.price || 0) * Number(it.qty || 1)).toFixed(2)}
                    </td>
                    <td className="text-end">
                      <button
                        className="btn btn-sm btn-outline-danger"
                        onClick={() => remove(idx)}
                        title="Remove"
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>

              <tfoot>
                <tr>
                  <td colSpan={3} className="text-end fw-semibold">
                    Subtotal
                  </td>
                  <td className="text-end fw-semibold">
                    ${subtotal.toFixed(2)}
                  </td>
                  <td />
                </tr>
              </tfoot>
            </table>
          </div>

          <div className="d-flex justify-content-end gap-2 mt-3">
            <Link to="/shop" className="btn btn-outline-primary">
              Continue Shopping
            </Link>
            <button
              className="btn btn-primary"
              onClick={handleCheckout}
              disabled={loading}
            >
              {loading ? "Redirecting…" : "Proceed to Checkout"}
            </button>
          </div>
        </>
      )}
    </div>
  );
}
