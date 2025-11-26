import React from "react";

export default function ProductCard({ product, onOpen, index }) {
  // allow CSS stagger using inline style
  const style = { animationDelay: `${index * 60}ms` };

  return (
    <article className="card glass-card" style={style} aria-label={product.title}>
      <div className="card-media">
        <img className="card-img" src={product.thumbnail} alt={product.title} loading="lazy" />
        <div className="chip chip-cat">{product.category}</div>
        <div className="chip chip-rate">★ {Math.round((product.rating || 0) * 10) / 10}</div>
      </div>

      <div className="card-body">
        <h3 className="card-title">{product.title}</h3>

        <div className="meta-row">
          <div className="price-pill">₹ {product.price}</div>
          <button className="btn-buy" onClick={() => onOpen(product)}>Buy</button>
        </div>

        <p className="card-desc">{product.description?.length > 110 ? product.description.slice(0,110) + "..." : product.description}</p>

        <div className="card-footer">
          <button className="link-small">Compare</button>
          <button className="link-small">Wishlist</button>
        </div>
      </div>
    </article>
  );
}
