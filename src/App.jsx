import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ProductProvider } from "./context/ProductContext.jsx";
import NavBar from "./components/NavBar.jsx";
import Home from "./routes/Home.jsx";
import Products from "./routes/Products.jsx";
import ProductDetail from "./routes/ProductDetail.jsx";
import Admin from "./routes/Admin.jsx";

function App() {
  return (
    <ProductProvider>
      <BrowserRouter>
        <div className="app-shell">
          <NavBar />
          <main className="page-content">
            <Routes>
              <Route path="/"               element={<Home />} />
              <Route path="/shop"           element={<Products />} />
              <Route path="/products/:id"   element={<ProductDetail />} />
              <Route path="/admin"          element={<Admin />} />
              {/* Fallback — redirect unknown paths to home */}
              <Route path="*"               element={<Navigate to="/" replace />} />
            </Routes>
          </main>
        </div>
      </BrowserRouter>
    </ProductProvider>
  );
}

export default App;
