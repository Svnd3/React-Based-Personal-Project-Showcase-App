import { useState, useId, useRef, useEffect } from "react";

const EMPTY_FORM = { name: "", description: "", origin: "", price: "" };

/**
 * ProductForm — controlled form for adding a new coffee product.
 * Uses useId for accessible label/input associations.
 * Uses useRef to auto-focus the first field on mount.
 */
export default function ProductForm({ onSave, statusMessage }) {
  const [form, setForm] = useState(EMPTY_FORM);
  const [error, setError] = useState("");
  const uid = useId();
  const nameRef = useRef(null);

  // Auto-focus the name field when the form mounts
  useEffect(() => {
    nameRef.current?.focus();
  }, []);

  function handleChange(e) {
    const { name, value } = e.target;
    setError("");
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const product = {
      name: form.name.trim(),
      description: form.description.trim(),
      origin: form.origin.trim(),
      price: Number(form.price),
    };

    // Validation
    if (!product.name || !product.description || !product.origin) {
      setError("Please fill in all fields.");
      return;
    }
    if (isNaN(product.price) || product.price <= 0) {
      setError("Please enter a valid price greater than 0.");
      return;
    }

    try {
      await onSave(product);
      setForm(EMPTY_FORM); // reset after successful save
    } catch {
      setError("Failed to save. Please try again.");
    }
  }

  return (
    <form
      className="product-form"
      onSubmit={handleSubmit}
      data-testid="product-form"
    >
      {/* Product Name */}
      <div className="form-row">
        <label htmlFor={`${uid}-name`}>Product Name</label>
        <input
          id={`${uid}-name`}
          ref={nameRef}
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="e.g. Vanilla Bean"
        />
      </div>

      {/* Description */}
      <div className="form-row">
        <label htmlFor={`${uid}-desc`}>Description</label>
        <textarea
          id={`${uid}-desc`}
          name="description"
          value={form.description}
          rows={3}
          onChange={handleChange}
          placeholder="Describe the roast, flavor notes, and aroma..."
        />
      </div>

      {/* Origin + Price side by side */}
      <div className="split-row">
        <div className="form-row">
          <label htmlFor={`${uid}-origin`}>Origin</label>
          <input
            id={`${uid}-origin`}
            name="origin"
            value={form.origin}
            onChange={handleChange}
            placeholder="e.g. Colombia"
          />
        </div>
        <div className="form-row">
          <label htmlFor={`${uid}-price`}>Price ($)</label>
          <input
            id={`${uid}-price`}
            name="price"
            type="number"
            step="0.01"
            value={form.price}
            onChange={handleChange}
            placeholder="0.00"
          />
        </div>
      </div>

      {error && (
        <p className="error-text" role="alert">
          ⚠ {error}
        </p>
      )}

      <button className="primary-button" type="submit">
        + Add Product
      </button>

      {statusMessage && (
        <p className="status-message" role="status">
          ✓ {statusMessage}
        </p>
      )}
    </form>
  );
}
