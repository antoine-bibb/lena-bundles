import React from "react";
import { Link } from "react-router-dom";

export default function ThankYou() {
  return (
    <section className="container py-5 text-center">
      <h1 className="fw-bold mb-3">Thank you for your order! 🎉</h1>

      <p className="text-muted fs-5 mb-4">
        We’ve received your order request.  
        A confirmation email has been sent to you and to Lena’s Bundles.  
        We will contact you shortly with payment instructions and delivery details.
      </p>

      <Link to="/shop" className="btn btn-primary btn-lg rounded-pill mt-3">
        Continue Shopping
      </Link>
    </section>
  );
}