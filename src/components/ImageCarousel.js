import React, { useState } from "react";

export default function ImageCarousel({ images = [], alt }) {
  const [idx, setIdx] = useState(0);
  const next = () => setIdx((i) => (i + 1) % images.length);
  const prev = () => setIdx((i) => (i - 1 + images.length) % images.length);

  return (
    <div className="group relative w-full aspect-[4/3] overflow-hidden rounded-xl bg-gray-100">
      {images.length ? (
        <img src={images[idx]} alt={alt} className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105" loading="lazy" />
      ) : (
        <div className="flex h-full w-full items-center justify-center text-gray-400">No image</div>
      )}

      {images.length > 1 && (
        <>
          <button onClick={prev} className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-white/80 p-2 shadow hover:bg-white">‹</button>
          <button onClick={next} className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-white/80 p-2 shadow hover:bg-white">›</button>
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
            {images.map((_, i) => (
              <span key={i} className={`h-1.5 w-1.5 rounded-full ${i === idx ? "bg-white" : "bg-white/60"}`} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
