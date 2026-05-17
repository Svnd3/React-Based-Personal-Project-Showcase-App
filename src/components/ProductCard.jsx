import { Link } from "react-router-dom";

export default function ProductCard({ product }) {
  return (
    <article className="product-card" data-testid="product-card">
      <div className="product-meta">
        <span className="product-origin">📍 {product.origin}</span>
        <span className="product-price">${product.price.toFixed(2)}</span>
      </div>

      <h3>{product.name}</h3>
      <p>{product.description}</p>

      <Link
        className="detail-link"
        to={`/products/${product.id}`}
        aria-label={`View details for ${product.name}`}
      >
        View product →
      </Link>
    </article>
  );
}
