import { useState } from "react";
import { useProductContext } from "../context/ProductContext.jsx";
import ProductForm from "../components/ProductForm.jsx";

export default function Admin() {
  const { allProducts, addProduct, deleteProduct, loading, error } =
    useProductContext();
  const [status, setStatus]   = useState("");
  const [addError, setAddError] = useState("");

  async function handleAdd(product) {
    try {
      setAddError("");
      await addProduct(product);
      setStatus(`"${product.name}" added successfully.`);
    } catch {
      setAddError("Failed to add product. Is the server running?");
      setStatus("");
    }
  }

  async function handleDelete(product) {
    if (!window.confirm(`Remove "${product.name}" from the catalog?`)) return;
    try {
      await deleteProduct(product.id);
      setStatus(`"${product.name}" removed.`);
    } catch {
      setStatus("Failed to remove product.");
    }
  }

  return (
    <section className="page-section" data-testid="admin-page">
      <header style={{ marginBottom: "1.75rem" }}>
        <span className="eyebrow">Admin Portal</span>
        <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.6rem", fontWeight: 700 }}>
          Manage inventory
        </h2>
        <p style={{ color: "var(--muted)", marginTop: "0.3rem", fontSize: "0.88rem" }}>
          Add new products, delete old items, or update pricing and origin details.
        </p>
      </header>

      <div className="admin-grid">
        {/* ── Left: add form ── */}
        <div className="admin-panel">
          <h3>Add a new product</h3>
          {addError && <p className="error-text" style={{ marginBottom: "1rem" }}>⚠ {addError}</p>}
          <ProductForm onSave={handleAdd} statusMessage={status} />
        </div>

        {/* ── Right: current catalog ── */}
        <div className="admin-panel">
          <h3>Current product catalog</h3>

          {loading ? (
            <p style={{ color: "var(--muted)" }}>Loading products…</p>
          ) : error ? (
            <p className="error-text">{error}</p>
          ) : allProducts.length === 0 ? (
            <div className="empty-state">
              <p>No products yet.</p>
              <p>Use the form to add your first item.</p>
            </div>
          ) : (
            <ul className="admin-list">
              {allProducts.map((product) => (
                <li key={product.id} className="admin-item">
                  <div>
                    <strong>{product.name}</strong>
                    <span>
                      ${product.price.toFixed(2)} — {product.origin}
                    </span>
                  </div>
                  <button
                    className="danger-button"
                    onClick={() => handleDelete(product)}
                    aria-label={`Remove ${product.name}`}
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </section>
  );
}
