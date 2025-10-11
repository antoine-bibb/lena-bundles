import React, { useEffect, useState } from "react";

export default function AlertBox({ type = "success", message, onClose }) {
  const [visible, setVisible] = useState(false);

  // Animate in/out
  useEffect(() => {
    setVisible(true);
    const timer = setTimeout(() => {
      setVisible(false);
      setTimeout(() => onClose && onClose(), 300); // allow fade out to finish
    }, 2500);
    return () => clearTimeout(timer);
  }, [onClose]);

  // Bootstrap color classes
  const bg =
    type === "success"
      ? "alert-success"
      : type === "error"
      ? "alert-danger"
      : type === "warning"
      ? "alert-warning"
      : "alert-info";

  return (
    <div
      className={`alert ${bg} position-fixed top-0 start-50 translate-middle-x mt-3 shadow-lg border-0 ${
        visible ? "alert-show" : "alert-hide"
      }`}
      style={{
        zIndex: 1055,
        minWidth: "300px",
        borderRadius: "0.75rem",
        transition: "transform 0.4s ease, opacity 0.4s ease",
      }}
      role="alert"
    >
      <div className="d-flex align-items-center justify-content-between">
        <span className="fw-semibold">{message}</span>
        <button
          type="button"
          className="btn-close ms-2"
          aria-label="Close"
          onClick={() => setVisible(false) || setTimeout(() => onClose?.(), 300)}
        ></button>
      </div>
    </div>
  );
}
