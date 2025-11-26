import React, { useEffect } from "react";

export default function ProductModal({ product, onClose }) {
  // lock scroll while modal is open
  useEffect(() => {
    if (product) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => { document.body.style.overflow = prev; };
    }
  }, [product]);

  // close on Escape
  useEffect(() => {
    function onKey(e) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  if (!product) return null;

  return (
    <div
      className="modal-backdrop"
      role="dialog"
      aria-modal="true"
      onClick={onClose}
    >
      <div
        className="modal-card"
        onClick={(e) => e.stopPropagation()}
        aria-label={product.title}
      >
        <button
          className="modal-close"
          onClick={onClose}
          aria-label="Close modal"
        >
          ✕
        </button>

        <div className="modal-grid">
          <div className="modal-media">
            <img src={product.thumbnail} alt={product.title} />
          </div>

          <div className="modal-body">
            <h2>{product.title}</h2>

            <div className="modal-meta">
              <div className="modal-price">₹ {product.price}</div>
              <div className="modal-rating">★ {Math.round((product.rating || 0) * 10) / 10}</div>
            </div>

            <p className="modal-desc">{product.description}</p>

            <div className="modal-actions">
              <button
                className="btn-primary"
                onClick={() =>
                  window.open(
                    `https://www.google.com/search?q=${encodeURIComponent(product.title)}`,
                    "_blank",
                    "noopener"
                  )
                }
              >
                Search
              </button>

              <button
                className="btn-outline"
                onClick={() => alert("Pretend purchase successful — assessment demo")}
              >
                Buy (Demo)
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
