// src/components/Footer.js
import React from "react";

export default function Footer() {
  return (
    <footer>
      <p>© {new Date().getFullYear()} Lena’s Bundles. All rights reserved.</p>
      <p className="small">Luxury Bundles & Wigs • Designed with 💜 & 💗</p>
    </footer>
  );
}
