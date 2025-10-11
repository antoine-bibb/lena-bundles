// src/components/Navbar.jsx
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import logo from "../assets/logo.png";
import { toggleTheme, getSavedTheme } from "../utils/theme";

export default function Navbar() {
  const { count } = useCart();
  const [mode, setMode] = useState(getSavedTheme()); // "light" | "dark" | "auto"

  useEffect(() => {
    // keep icon/state in sync with saved setting
    setMode(getSavedTheme());
  }, []);

  function handleToggle() {
    const next = toggleTheme();
    setMode(next);
  }

  return (
    <nav
      className="navbar navbar-expand-lg sticky-top shadow-sm"
      style={{ background: "linear-gradient(90deg,#7C3AED 0%,#EC4899 100%)" }}
    >
      <div className="container d-flex align-items-center justify-content-between">
        {/* Brand + Logo */}
        <Link
          className="navbar-brand d-flex align-items-center gap-2 text-white fw-semibold text-decoration-none"
          to="/"
        >
          <img
            src={logo}
            alt="Lena’s Bundles Logo"
            style={{
              height: 45,
              width: 45,
              borderRadius: "50%",
              objectFit: "cover",
              background: "#fff",
              padding: 3,
            }}
          />
          <span style={{ fontSize: "1.3rem", letterSpacing: 0.5, fontWeight: 600 }}>
            Lena’s Bundles
          </span>
        </Link>

        {/* Mobile toggler */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navMain"
          aria-controls="navMain"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>

        {/* Links + Actions */}
        <div className="collapse navbar-collapse justify-content-end" id="navMain">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item"><Link className="nav-link text-white-50" to="/">Home</Link></li>
            <li className="nav-item"><Link className="nav-link text-white-50" to="/about">About</Link></li>
            <li className="nav-item"><Link className="nav-link text-white-50" to="/contact">Contact</Link></li>
            <li className="nav-item"><Link className="nav-link text-white-50" to="/shop">Shop</Link></li>
          </ul>

          <div className="d-flex align-items-center gap-2">
            {/* Theme toggle */}
            <button
              type="button"
              className="btn btn-outline-light"
              onClick={handleToggle}
              title={`Switch theme (current: ${mode})`}
            >
              <i className={mode === "dark" ? "bi bi-sun" : "bi bi-moon"} />
            </button>

            {/* Cart */}
            <Link to="/cart" className="btn btn-light fw-semibold">
              Cart <span className="badge bg-secondary ms-1">{count}</span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
