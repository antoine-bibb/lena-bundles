import React from "react";

export default function About() {
  return (
    <div className="container py-5">
      {/* Hero */}
      <div
        className="text-white rounded-4 p-4 p-md-5 mb-4"
        style={{ background: "linear-gradient(90deg,#7C3AED 0%,#EC4899 100%)" }}
      >
        <h1 className="fw-bold m-0">About Lena’s Bundles</h1>
        <p className="mt-2 mb-0">
          Premium bundles & wigs—curated for effortless beauty, long wear, and confidence.
        </p>
      </div>

      {/* Owner block */}
      <div className="row g-4 align-items-center">
        <div className="col-12 col-md-4 d-flex justify-content-center">
          <img
            src="/images/owner.jpg"           /* put your owner photo here */
            alt="Owner of Lena’s Bundles"
            className="about-avatar shadow-sm"
          />
        </div>

        <div className="col-12 col-md-8">
          <h3 className="fw-semibold">Meet Lena</h3>
          <p className="text-muted">
            I started Lena’s Bundles to make luxury hair more accessible—real textures,
            real longevity, and real results. Every bundle is hand-selected for softness,
            fullness, and styling versatility.
          </p>
          <ul className="list-unstyled text-muted">
            <li>✓ 100% human hair, cuticle-aligned</li>
            <li>✓ Minimal shedding, tangle-resistant</li>
            <li>✓ Heat-safe & dye-friendly</li>
          </ul>
          <p className="mb-0">
            Whether it’s your everyday look or a special moment, I want you to feel
            absolutely beautiful—effortlessly.
          </p>
        </div>
      </div>

      {/* Contact strip */}
      <div className="mt-5 p-4 bg-light rounded-4 border">
        <h5 className="mb-3">Contact</h5>
        <div className="row g-3">
          <div className="col-12 col-md-4">
            <div className="small text-muted">Email</div>
            <div>support@lenasbundles.com</div>
          </div>
          <div className="col-12 col-md-4">
            <div className="small text-muted">Instagram</div>
            <div>@lenasbundles</div>
          </div>
          <div className="col-12 col-md-4">
            <div className="small text-muted">Phone</div>
            <div>(555) 123-4567</div>
          </div>
        </div>
      </div>
    </div>
  );
}
