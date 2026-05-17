import { useState, useEffect, useMemo, useCallback } from "react";
import axios from "axios";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:4000";

/**
 * useProducts — custom hook that manages all product state and CRUD operations.
 * Fetches store info and coffee products from the JSON Server backend.
 * Exposes filtered products based on a live search term.
 */
export function useProducts() {
  const [storeInfo, setStoreInfo]   = useState(null);
  const [products, setProducts]     = useState([]);
  const [search, setSearch]         = useState("");
  const [loading, setLoading]       = useState(true);
  const [error, setError]           = useState("");

  // ── Initial data fetch ──────────────────────────────
  useEffect(() => {
    let active = true;

    async function load() {
      setLoading(true);
      setError("");
      try {
        const [storeRes, productRes] = await Promise.all([
          axios.get(`${API_BASE}/store_info`),
          axios.get(`${API_BASE}/coffee`),
        ]);
        if (!active) return;
        setStoreInfo(storeRes.data[0] ?? null);
        setProducts(productRes.data);
      } catch {
        if (!active) return;
        setError("Unable to load store data. Make sure the backend is running.");
      } finally {
        if (active) setLoading(false);
      }
    }

    load();
    return () => { active = false; };
  }, []);

  // ── Derived: filtered products ──────────────────────
  const filteredProducts = useMemo(() => {
    if (!search.trim()) return products;
    const term = search.toLowerCase();
    return products.filter(
      (p) =>
        p.name.toLowerCase().includes(term) ||
        p.description.toLowerCase().includes(term) ||
        p.origin.toLowerCase().includes(term),
    );
  }, [products, search]);

  // ── CRUD helpers ────────────────────────────────────

  /** POST — add a new coffee product */
  const addProduct = useCallback(async (product) => {
    const res = await axios.post(`${API_BASE}/coffee`, product);
    setProducts((prev) => [...prev, res.data]);
    return res.data;
  }, []);

  /** PATCH — edit price / origin of an existing product */
  const editProduct = useCallback(async (id, updates) => {
    const res = await axios.patch(`${API_BASE}/coffee/${id}`, updates);
    setProducts((prev) =>
      prev.map((item) => (item.id === id ? res.data : item)),
    );
    return res.data;
  }, []);

  /** DELETE — remove a product */
  const deleteProduct = useCallback(async (id) => {
    await axios.delete(`${API_BASE}/coffee/${id}`);
    setProducts((prev) => prev.filter((item) => item.id !== id));
  }, []);

  return {
    storeInfo,
    products: filteredProducts,   // filtered list (used in shop)
    allProducts: products,        // unfiltered list (used in admin & home)
    loading,
    error,
    search,
    setSearch,
    addProduct,
    editProduct,
    deleteProduct,
  };
}
