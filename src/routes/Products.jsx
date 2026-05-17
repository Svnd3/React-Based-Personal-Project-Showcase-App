import { useId } from "react";
import { useProductContext } from "../context/ProductContext.jsx";
import ProductCard from "../components/ProductCard.jsx";

export default function Products() {
  const { products, loading, error, search, setSearch } = useProductContext();
  const searchId = useId();

  return (
    <section className="page-section" data-testid="products-page">
      <header className="section-header">
        <div>
          <span className="eyebrow">Shop</span>
          <h2>Browse products</h2>
          <p>Search live by name, origin, or description and open item details.</p>
        </div>

        {/* Live search */}
        <div className="search-wrap">
          <label htmlFor={searchId}>Search product</label>
          <div className="search-input-wrap">
            {/* Inline SVG search icon */}
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
            </svg>
            <input
              id={searchId}
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search coffee, origin, or flavor"
              aria-label="Search products"
            />
          </div>
        </div>
      </header>

      {loading ? (
        <p style={{ color: "var(--muted)" }}>Loading shop items…</p>
      ) : error ? (
        <p className="error-text">{error}</p>
      ) : (
        <div className="product-grid">
          {products.length > 0 ? (
            products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))
          ) : (
            <div className="empty-state">
              <p>☕ No products matched your search.</p>
              <p>Try a different term or clear the search field.</p>
            </div>
          )}
        </div>
      )}
    </section>
  );
}
