import React from "react";
import { Link } from "react-router-dom";

function Hero() {
  return (
    <section className="py-5 hero-wrap">
      <div className="container">
        <div className="row align-items-center g-4">
          <div className="col-md-7">
            <span className="badge rounded-pill hero-badge">Luxury • Quality • Confidence</span>
            <h1 className="display-6 fw-semibold mt-3 text-brand">Lena’s Bundles — premium hair you’ll love</h1>
            <p className="lead text-muted mt-2">
              100% human hair. Cuticle-aligned. Hand-selected textures for effortless styling and long-lasting wear.
            </p>
            <ul className="list-unstyled text-muted small mb-4">
              <li className="mb-1">✓ Tangle-resistant & minimal shedding</li>
              <li className="mb-1">✓ Heat-safe, dye-friendly, true-to-length</li>
              <li className="mb-1">✓ 3+ bundles save 10% • 4+ save 15%</li>
            </ul>
            <div className="d-flex flex-wrap gap-2">
              <Link to="/shop" className="btn btn-primary btn-lg rounded-pill">Shop bundles</Link>
              <Link to="/about" className="btn btn-outline-primary btn-lg rounded-pill">Why Lena?</Link>
            </div>
          </div>
          <div className="col-md-5">
            <div className="p-3 p-md-4 bg-light rounded-4 shadow-sm">
              <h5 className="mb-2">Premium, long-lasting hair</h5>
              <p className="text-muted small mb-0">
                We source only top-grade hair for softness, density, and styling versatility. Loved by stylists & customers alike.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function FreeShippingBanner() {
  return (
    <section className="container my-4">
      <div className="free-ship rounded-4 p-4 p-md-5 position-relative overflow-hidden">
        <div className="row align-items-center g-3">
          <div className="col-md-8">
            <div className="d-flex align-items-center gap-3">
              <i className="bi bi-truck display-5 text-light"></i>
              <div>
                <h2 className="m-0 text-white fw-bold">Free Shipping</h2>
                <p className="m-0 text-white-50 fs-5">
                  on orders over <span className="text-white fw-semibold">$150</span> (US only)
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-4 text-md-end">
            <Link to="/shop" className="btn btn-light btn-lg fw-semibold rounded-pill">Shop Now</Link>
          </div>
        </div>
        <span className="sheen" aria-hidden="true" />
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <>
      {/* 1) IMAGE CAROUSEL directly under navbar */}
      <section className="container pt-4">
        <div id="heroCarousel" className="carousel slide shadow-soft rounded-4 overflow-hidden"
             data-bs-ride="carousel" data-bs-interval="4000">
          <div className="carousel-inner">
            <div className="carousel-item active">
              <div className="ratio ratio-21x9">
                <img src="/images/model-1.jpg" alt="Body Wave install" className="w-100 h-100 object-cover" />
              </div>
            </div>
            <div className="carousel-item">
              <div className="ratio ratio-21x9">
                <img src="/images/model-2.jpg" alt="Straight bundles" className="w-100 h-100 object-cover" />
              </div>
            </div>
            <div className="carousel-item">
              <div className="ratio ratio-21x9">
                <img src="/images/model-3.jpg" alt="Curly wig" className="w-100 h-100 object-cover" />
              </div>
            </div>
          </div>
          <button className="carousel-control-prev" type="button" data-bs-target="#heroCarousel" data-bs-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button className="carousel-control-next" type="button" data-bs-target="#heroCarousel" data-bs-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </section>

      {/* 2) HERO (ad copy) */}
      <Hero />

      {/* 3) BIG FREE SHIPPING BANNER */}
      <FreeShippingBanner />
    </>
  );
}
