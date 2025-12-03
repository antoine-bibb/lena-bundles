// src/pages/Cart.js
import React, { useState } from "react";
import { useCart } from "../context/CartContext";

export default function Cart() {
  const { items, remove, clear } = useCart();

  const [customerName, setCustomerName] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [status, setStatus] = useState(null);

  const total = items.reduce((sum, i) => sum + i.price * i.qty, 0);

  async function handleOrder(e) {
    e.preventDefault();

    if (!customerName || !customerEmail) {
      setStatus({ type: "error", message: "Name and email required" });
      return;
    }

    // IMPORTANT → Correct API route
    const res = await fetch("/api/send-order-email", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        customerName,
        customerEmail,
        customerPhone,
        items,
        total,
      }),
    });

    let data;
    try {
      data = await res.json();
    } catch (err) {
      data = { error: "Invalid server response" };
    }

    if (!res.ok) {
      setStatus({ type: "error", message: data.error });
      return;
    }

    // Success
    setStatus({ type: "success", message: "Order sent successfully!" });
    clear();

    // Redirect to Thank You Page
    setTimeout(() => {
      window.location.href = "/thank-you";
    }, 800);
  }

  return (
    <div className="container py-5">
      <h2>Your Cart</h2>

      {items.length === 0 && <p>Your cart is empty.</p>}

      {items.map((item) => (
        <div key={item.id} className="d-flex align-items-center border-bottom py-3">
          <img src={item.image} alt="" style={{ width: 80, height: 80, objectFit: "cover" }} />
          <div className="ms-3 flex-grow-1">
            <h6 className="mb-1">{item.name}</h6>
            <div>${item.price.toFixed(2)} × {item.qty}</div>
          </div>
          <button className="btn btn-sm btn-outline-danger" onClick={() => remove(item.id)}>
            Remove
          </button>
        </div>
      ))}

      {items.length > 0 && (
        <>
          <h4 className="mt-4">Total: ${total.toFixed(2)}</h4>

          <form className="mt-4 vstack gap-3" onSubmit={handleOrder}>
            <div>
              <label className="form-label">Your Name</label>
              <input
                className="form-control"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
              />
            </div>

            <div>
              <label className="form-label">Your Email</label>
              <input
                type="email"
                className="form-control"
                value={customerEmail}
                onChange={(e) => setCustomerEmail(e.target.value)}
              />
            </div>

            <div>
              <label className="form-label">Your Phone (optional)</label>
              <input
                className="form-control"
                value={customerPhone}
                onChange={(e) => setCustomerPhone(e.target.value)}
                placeholder="864-555-1234"
              />
            </div>

            <button className="btn btn-primary btn-lg w-100" type="submit">
              Send Order
            </button>

            {status && (
              <div className={`alert mt-3 alert-${status.type === "error" ? "danger" : "success"}`}>
                {status.message}
              </div>
            )}
          </form>
        </>
      )}
    </div>
  );
}