import React, { useEffect, useState, useRef } from "react";
import Header from "../components/Header";
import ProductCard from "../components/ProductCard";
import ProductModal from "../components/ProductModal";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState(null);
  const mountedRef = useRef(true);

  useEffect(() => {
    const controller = new AbortController();
    mountedRef.current = true;

    async function fetchProducts() {
      setLoading(true);
      setError("");
      try {
        const res = await fetch("https://dummyjson.com/products", { signal: controller.signal });
        if (!res.ok) throw new Error("Failed to fetch products");
        const data = await res.json();
        if (!mountedRef.current) return;
        setProducts(data.products || []);
        setFiltered(data.products || []);
      } catch (err) {
        if (err.name !== "AbortError") setError(err.message || "Error");
      } finally {
        if (mountedRef.current) setLoading(false);
      }
    }

    fetchProducts();
    return () => {
      mountedRef.current = false;
      controller.abort();
    };
  }, []);

  useEffect(() => {
    const id = setTimeout(() => {
      const s = (search || "").trim().toLowerCase();
      if (!s) {
        setFiltered(products);
        return;
      }
      setFiltered(products.filter(p => (p.title || "").toLowerCase().includes(s)));
    }, 240);
    return () => clearTimeout(id);
  }, [search, products]);

  return (
    <>
      <Header />

      <main id="products" className="page-container">
        <div className="controls">
          <input
            className="search"
            placeholder="Search by product title..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <div className="counter">{filtered.length} / {products.length}</div>
        </div>

        {loading ? (
          <div className="center">
            <div className="spinner" />
            <div style={{marginTop:12}}>Loading products…</div>
          </div>
        ) : error ? (
          <div className="center error">Error: {error}</div>
        ) : filtered.length === 0 ? (
          <div className="center">No products found for “{search}”</div>
        ) : (
          <div className="grid">
            {filtered.map((p, idx) => (
              <ProductCard key={p.id} product={p} onOpen={(prod) => setSelected(prod)} index={idx} />
            ))}
          </div>
        )}
      </main>

      <ProductModal product={selected} onClose={() => setSelected(null)} />
    </>
  );
}
