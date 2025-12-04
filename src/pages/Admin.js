import React, { useEffect, useState } from "react";

export default function Admin() {
  const [orders, setOrders] = useState([]);

  async function loadOrders() {
    const res = await fetch("/api/get-orders");
    const data = await res.json();
    setOrders(data.orders || []);
  }

  async function deleteOrder(id) {
    await fetch("/api/delete-order", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    loadOrders();
  }

  useEffect(() => {
    loadOrders();
  }, []);

  return (
    <div className="container py-5">
      <h2>Admin — Orders</h2>

      {orders.length === 0 && <p>No orders yet.</p>}

      {orders.map(order => (
        <div key={order.id} className="card p-3 my-3 shadow-sm">
          <h5>Order #{order.id}</h5>
          <div><strong>Name:</strong> {order.customerName}</div>
          <div><strong>Email:</strong> {order.customerEmail}</div>
          <div><strong>Phone:</strong> {order.customerPhone}</div>
          <div><strong>Date:</strong> {new Date(order.date).toLocaleString()}</div>

          <h6 className="mt-3">Items</h6>
          {order.items.map((i, idx) => (
            <div key={idx}>
              {i.name} — {i.length}" × {i.qty}  
              <span className="text-muted"> (${i.price})</span>
            </div>
          ))}

          <h5 className="mt-3">Total: ${order.total.toFixed(2)}</h5>

          <button
            className="btn btn-danger btn-sm mt-3"
            onClick={() => deleteOrder(order.id)}
          >
            Delete Order
          </button>
        </div>
      ))}
    </div>
  );
}