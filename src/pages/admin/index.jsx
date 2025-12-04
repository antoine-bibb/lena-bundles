import React, { useEffect, useState } from "react";

export default function AdminDashboard() {
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    async function verify() {
      const session = await fetch("/api/admin-session").then((r) => r.json());
      if (!session.loggedIn) {
        window.location.href = "/admin/login";
      }

      // Load orders
      const data = await fetch("/api/get-orders").then((r) => r.json());
      setOrders(data.orders || []);
      setLoading(false);
    }
    verify();
  }, []);

  if (loading) return <div className="container py-5">Loading dashboard...</div>;

  return (
    <div className="container py-5">
      <h2 className="mb-4">Admin Dashboard</h2>

      {orders.length === 0 && <p>No orders yet.</p>}

      {orders.map((order) => (
        <a
          key={order.id}
          href={`/admin/order/${order.id}`}
          className="d-block p-3 mb-3 border rounded text-dark text-decoration-none"
        >
          <div className="fw-bold">
            {order.customerName} — ${order.total.toFixed(2)}
          </div>
          <div className="text-muted small">
            {order.status} • {new Date(order.createdAt).toLocaleString()}
          </div>
        </a>
      ))}
    </div>
  );
}