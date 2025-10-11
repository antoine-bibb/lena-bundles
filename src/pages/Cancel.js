import React from "react";
import { Link } from "react-router-dom";

export default function Cancel() {
  return (
    <div className="container py-5 text-center">
      <h1 className="fw-bold text-warning">Checkout canceled</h1>
      <p className="lead mt-2">No worries. Your cart is saved if you want to try again.</p>
      <Link to="/cart" className="btn btn-outline-primary mt-3">Back to cart</Link>
    </div>
  );
}
