import React from "react";
import { Link } from "react-router-dom";

export default function Success() {
  return (
    <div className="container py-5 text-center">
      <h1 className="fw-bold text-success">Thank you! 🎉</h1>
      <p className="lead mt-2">Your payment was successful. A receipt is on its way to your email.</p>
      <Link to="/shop" className="btn btn-primary mt-3">Continue shopping</Link>
    </div>
  );
}
