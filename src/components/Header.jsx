import React from "react";

export default function Header() {
  return (
    <header className="hero-dark">
      <div className="hero-inner">
        <div className="brand-left">
          <div className="brand-mark" />
          <div className="brand-text">
            <h1>Redroom — Curated Finds</h1>
            <p>Handpicked products with bold style — preview fast, buy faster.</p>
          </div>
        </div>

        <div className="brand-cta">
          <a className="btn-hero" href="#products">Browse Products</a>
        </div>
      </div>
    </header>
  );
}
