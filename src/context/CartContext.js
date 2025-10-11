import React, { createContext, useContext, useEffect, useMemo, useState } from "react";

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [items, setItems] = useState([]);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem("cart") || "[]");
      if (Array.isArray(saved)) setItems(saved);
    } catch {}
  }, []);

  // Persist whenever items change
  useEffect(() => {
    try { localStorage.setItem("cart", JSON.stringify(items)); } catch {}
  }, [items]);

  // API
  const add = (line) => setItems((prev) => [...prev, line]);
  const inc = (idx) => setItems((prev) => prev.map((it, i) => i === idx ? { ...it, qty: it.qty + 1 } : it));
  const dec = (idx) => setItems((prev) => prev.map((it, i) => i === idx ? { ...it, qty: Math.max(1, it.qty - 1) } : it));
  const remove = (idx) => setItems((prev) => prev.filter((_, i) => i !== idx));

  // Derived
  const count = useMemo(() => items.reduce((n, i) => n + i.qty, 0), [items]);
  const subtotal = useMemo(() => items.reduce((s, i) => s + i.price * i.qty, 0), [items]);

  const value = { items, add, inc, dec, remove, count, subtotal };
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside <CartProvider>");
  return ctx;
}
