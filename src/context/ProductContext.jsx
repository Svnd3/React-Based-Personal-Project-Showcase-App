import { createContext, useContext } from "react";
import { useProducts } from "../hooks/useProducts.js";

/**
 * ProductContext — shares product state across the entire app
 * so every route can read/write products without prop drilling.
 */
const ProductContext = createContext(null);

export function ProductProvider({ children }) {
  // All state lives in the custom hook; context just distributes it.
  const productState = useProducts();

  return (
    <ProductContext.Provider value={productState}>
      {children}
    </ProductContext.Provider>
  );
}

/**
 * useProductContext — convenience hook with a safety guard.
 * Throws a clear error if used outside <ProductProvider>.
 */
export function useProductContext() {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error("useProductContext must be used inside <ProductProvider>");
  }
  return context;
}
