import { useState, useEffect, useMemo } from "react";
import axios from "axios";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:4000";

export function useProducts() {
  const [storeInfo, setStoreInfo] = useState(null);
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

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
        setStoreInfo(storeRes.data[0] || null);
        setProducts(productRes.data);
      } catch (fetchError) {
        if (!active) return;
        setError("Unable to load store data. Please start the backend server.");
      } finally {
        if (active) setLoading(false);
      }
    }

    load();
    return () => {
      active = false;
    };
  }, []);

  const filteredProducts = useMemo(() => {
    if (!search.trim()) return products;
    const term = search.toLowerCase();
    return products.filter((product) => {
      return (
        product.name.toLowerCase().includes(term) ||
        product.description.toLowerCase().includes(term) ||
        product.origin.toLowerCase().includes(term)
      );
    });
  }, [products, search]);

  const fetchAll = async () => {
    setLoading(true);
    setError("");
    try {
      const [storeRes, productRes] = await Promise.all([
        axios.get(`${API_BASE}/store_info`),
        axios.get(`${API_BASE}/coffee`),
      ]);
      setStoreInfo(storeRes.data[0] || null);
      setProducts(productRes.data);
    } catch (fetchError) {
      setError("Unable to reload store data.");
    } finally {
      setLoading(false);
    }
  };

  const addProduct = async (product) => {
    const response = await axios.post(`${API_BASE}/coffee`, product);
    setProducts((current) => [...current, response.data]);
    return response.data;
  };

  const editProduct = async (id, updates) => {
    const response = await axios.patch(`${API_BASE}/coffee/${id}`, updates);
    setProducts((current) =>
      current.map((item) => (item.id === id ? response.data : item)),
    );
    return response.data;
  };

  const deleteProduct = async (id) => {
    await axios.delete(`${API_BASE}/coffee/${id}`);
    setProducts((current) => current.filter((item) => item.id !== id));
  };

  return {
    storeInfo,
    products: filteredProducts,
    allProducts: products,
    loading,
    error,
    search,
    setSearch,
    fetchAll,
    addProduct,
    editProduct,
    deleteProduct,
  };
}
