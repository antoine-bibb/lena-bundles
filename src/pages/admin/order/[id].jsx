import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function OrderPage() {
  const { id } = useParams();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    async function load() {
      const session = await fetch("/api/admin-session").then((r) => r.json());
      if (!session.loggedIn) {
        window.location.href = "/admin/login";
        return;
      }

      const res = await fetch("/api/get-orders").then((r) => r.json());
      const found = res.orders.find((o) => o.id == id);
      setOrder(found || null);
    }
    load();
  }, [id]);

  if (!order) return <div className="container py-5">Order not found</div>;

  return (
    <div className="container py-5">
      <h2>Order #{order.id}</h2>

      <p className="mt-2">
        <strong>Name:</strong> {order.customerName}
        <br />
        <strong>Email:</strong> {order.customerEmail}
        <br />
        <strong>Phone:</strong> {order.customerPhone || "N/A"}
        <br />
        <strong>Status:</strong> {order.status}
      </p>

      <h4 className="mt-4">Items</h4>
      <ul>
        {order.items.map((i) => (
          <li key={i.id}>
            {i.name} — {i.length}" — ${i.price} × {i.qty}
          </li>
        ))}
      </ul>

      <h4 className="mt-3">Total: ${order.total.toFixed(2)}</h4>
    </div>
  );
}