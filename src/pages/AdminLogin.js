import React, { useState } from "react";

export default function AdminLogin() {
  const [pin, setPin] = useState("");
  const [error, setError] = useState("");

  const correctPin = import.meta.env.VITE_ADMIN_PIN;

  function handleLogin(e) {
    e.preventDefault();

    if (pin === correctPin) {
      localStorage.setItem("adminLoggedIn", "yes");
      window.location.href = "/admin";
    } else {
      setError("Incorrect PIN");
    }
  }

  return (
    <div className="container py-5" style={{ maxWidth: 420 }}>
      <h2 className="mb-3">Admin Login</h2>

      <form onSubmit={handleLogin} className="vstack gap-3">
        <input
          type="password"
          className="form-control"
          placeholder="Enter Admin PIN"
          value={pin}
          onChange={(e) => setPin(e.target.value)}
        />

        {error && <div className="alert alert-danger">{error}</div>}

        <button className="btn btn-primary w-100">Login</button>
      </form>
    </div>
  );
}