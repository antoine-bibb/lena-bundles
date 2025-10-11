import React from "react";

/** Simple 0–5 star renderer (supports halves like 4.5) */
export default function Stars({ value = 0, size = 16 }) {
  const full = Math.floor(value);
  const half = value - full >= 0.5;

  const Star = ({ filled }) => (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      className={filled ? "text-warning" : "text-secondary"}
      style={{ fill: filled ? "currentColor" : "none", stroke: "currentColor" }}
    >
      <path d="M12 .587l3.668 7.431 8.2 1.192-5.934 5.786 1.401 8.164L12 18.896l-7.335 3.864 1.401-8.164L.132 9.21l8.2-1.192z"/>
    </svg>
  );

  return (
    <div className="d-inline-flex align-items-center gap-1">
      {Array.from({ length: full }).map((_, i) => <Star key={`f${i}`} filled />)}
      {half && (
        <span style={{ position: "relative", display: "inline-block", width: size, height: size }}>
          <svg viewBox="0 0 24 24" width={size} height={size} className="text-warning" style={{ position: "absolute", left: 0, top: 0 }}>
            <defs>
              <linearGradient id="halfGrad">
                <stop offset="50%" stopColor="currentColor"/><stop offset="50%" stopColor="transparent"/>
              </linearGradient>
            </defs>
            <path d="M12 .587l3.668 7.431 8.2 1.192-5.934 5.786 1.401 8.164L12 18.896l-7.335 3.864 1.401-8.164L.132 9.21l8.2-1.192z" fill="url(#halfGrad)" stroke="currentColor"/>
          </svg>
        </span>
      )}
      {Array.from({ length: 5 - full - (half ? 1 : 0) }).map((_, i) => <Star key={`e${i}`} filled={false} />)}
    </div>
  );
}
