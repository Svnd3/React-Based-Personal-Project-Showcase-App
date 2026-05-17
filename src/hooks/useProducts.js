import { useState, useEffect, useMemo, useCallback } from "react";
import axios from "axios";

// Determine API base URL from env variables. Support either:
// - VITE_API_URL (explicit REST base), or
// - VITE_SUPABASE_URL (Supabase project URL) which needs "/rest/v1" appended.
const API_BASE =
  import.meta.env.VITE_API_URL ||
  (import.meta.env.VITE_SUPABASE_URL
    ? `${import.meta.env.VITE_SUPABASE_URL}/rest/v1`
    : "http://localhost:4000");
const API_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

const api = axios.create({
  baseURL: API_BASE,
  headers: {
    apikey: API_KEY,
    Authorization: `Bearer ${API_KEY}`,
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

/**
 * useProducts — custom hook that manages all product state and CRUD operations.
 * Fetches store info and coffee products from the backend.
 * Exposes filtered products based on a live search term.
 */
export function useProducts() {
  const [storeInfo, setStoreInfo] = useState(null);
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ── Initial data fetch ──────────────────────────────
  useEffect(() => {
    let active = true;

    async function load() {
      setLoading(true);
      setError("");
      try {
        const [storeRes, productRes] = await Promise.all([
          api.get("/store_info"),
          api.get("/coffee"),
        ]);
        if (!active) return;
        setStoreInfo(storeRes.data[0] ?? null);
        setProducts(productRes.data);
      } catch {
        if (!active) return;
        setError(
          "Unable to load store data. Make sure the backend is running.",
        );
      } finally {
        if (active) setLoading(false);
      }
    }

    load();
    return () => {
      active = false;
    };
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
    // Ask Supabase REST to return the created row
    const res = await api.post("/coffee", product, {
      headers: { Prefer: "return=representation" },
    });
    const data = Array.isArray(res.data) ? res.data[0] : res.data;
    setProducts((prev) => [...prev, data]);
    return data;
  }, []);

  /** PATCH — edit price / origin of an existing product */
  const editProduct = useCallback(async (id, updates) => {
    // Use Supabase REST filter and request the updated row
    const res = await api.patch(`/coffee?id=eq.${id}`, updates, {
      headers: { Prefer: "return=representation" },
    });
    const updated = Array.isArray(res.data) ? res.data[0] : res.data;
    setProducts((prev) =>
      prev.map((item) => (item.id === id ? updated : item)),
    );
    return updated;
  }, []);

  /** DELETE — remove a product */
  const deleteProduct = useCallback(async (id) => {
    await api.delete(`/coffee?id=eq.${id}`);
    setProducts((prev) => prev.filter((item) => item.id !== id));
  }, []);

  return {
    storeInfo,
    products: filteredProducts, // filtered list (used in shop)
    allProducts: products, // unfiltered list (used in admin & home)
    loading,
    error,
    search,
    setSearch,
    addProduct,
    editProduct,
    deleteProduct,
  };
}
