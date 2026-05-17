import { useEffect, useState, useId, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import { useProductContext } from "../context/ProductContext.jsx";

export default function ProductDetail() {
  const { id }                                   = useParams();
  const { allProducts, editProduct, loading, error } = useProductContext();
  const product = allProducts.find((p) => p.id === Number(id));

  const [form, setForm]       = useState({ price: "", origin: "" });
  const [status, setStatus]   = useState("");
  const [saving, setSaving]   = useState(false);
  const [formError, setFormError] = useState("");

  const priceId  = useId();
  const originId = useId();
  const priceRef = useRef(null);

  // Sync form when product loads / changes
  useEffect(() => {
    if (product) {
      setForm({ price: product.price.toString(), origin: product.origin });
    }
  }, [product]);

  // Auto-focus price field
  useEffect(() => { priceRef.current?.focus(); }, []);

  function handleChange(e) {
    const { name, value } = e.target;
    setFormError("");
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!product) return;

    const price = Number(form.price);
    if (isNaN(price) || price <= 0) {
      setFormError("Please enter a valid price.");
      return;
    }

    setSaving(true);
    setStatus("");
    try {
      await editProduct(product.id, { price, origin: form.origin.trim() });
      setStatus("Product updated successfully.");
    } catch {
      setFormError("Unable to update product. Try again.");
    } finally {
      setSaving(false);
    }
  }

  if (loading) return <p style={{ padding: "2rem", color: "var(--muted)" }}>Loading product details…</p>;

  if (error) {
    return (
      <section className="page-section">
        <p className="error-text">{error}</p>
        <Link to="/shop" className="ghost-button" style={{ marginTop: "1rem" }}>← Back to Shop</Link>
      </section>
    );
  }

  if (!product) {
    return (
      <section className="page-section">
        <h2>Product not found</h2>
        <p style={{ color: "var(--muted)", margin: "0.75rem 0 1.25rem" }}>
          We could not find that product. Try browsing the shop instead.
        </p>
        <Link to="/shop" className="ghost-button">← Back to Shop</Link>
      </section>
    );
  }

  return (
    <section className="page-section detail-page" data-testid="product-detail">
      <div className="detail-header">
        <div>
          <Link to="/shop" className="back-link">← Back to Shop</Link>
          <span className="eyebrow">Product detail</span>
          <h2>{product.name}</h2>
          <p>{product.description}</p>
        </div>

        <div className="price-badge">
          <small>Current price</small>
          <strong>${product.price.toFixed(2)}</strong>
        </div>
      </div>

      {/* Edit form — PATCH request */}
      <form className="detail-form" onSubmit={handleSubmit} data-testid="detail-form">
        <div className="form-row">
          <label htmlFor={priceId}>Update Price ($)</label>
          <input
            id={priceId}
            ref={priceRef}
            type="number"
            name="price"
            value={form.price}
            onChange={handleChange}
            min="0.01"
            step="0.01"
            required
          />
        </div>

        <div className="form-row">
          <label htmlFor={originId}>Update Origin</label>
          <input
            id={originId}
            name="origin"
            value={form.origin}
            onChange={handleChange}
            required
          />
        </div>

        {formError && <p className="error-text" role="alert">⚠ {formError}</p>}

        <button className="primary-button" type="submit" disabled={saving}>
          {saving ? "Saving…" : "Save changes"}
        </button>

        {status && <p className="status-message" role="status">✓ {status}</p>}
      </form>
    </section>
  );
}
