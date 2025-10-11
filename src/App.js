import React from "react";
import { Routes, Route } from "react-router-dom";
import { CartProvider } from "./context/CartContext";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Product from "./pages/Product";
import Cart from "./pages/Cart";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Shop from "./pages/Shop"; 
import { initTheme } from "./utils/theme";
import Success from "./pages/Success";
import Cancel from "./pages/Cancel";
initTheme();

function Footer() {
  return (
    <footer className="text-center py-4 border-top">
      <small>© {new Date().getFullYear()} Lena’s Bundles. All rights reserved.</small>
    </footer>
  );
}

export default function App() {
  return (
    <CartProvider>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop />} />  
        <Route path="/product/:id" element={<Product />} />
        <Route path="/cart" element={<Cart />} />
         <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} /> 
        <Route path="/success" element={<Success />} />
<Route path="/cancel" element={<Cancel />} />
      </Routes>
      <Footer />
    </CartProvider>
  );
}
