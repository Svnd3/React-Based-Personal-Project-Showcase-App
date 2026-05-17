import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useProductContext } from "../context/ProductContext.jsx";
import hero1 from "../assets/hero1.jpg";
import hero2 from "../assets/hero2.jpg";

const SLIDES = [hero1, hero2];

export default function Home() {
  const { storeInfo, allProducts, loading, error } = useProductContext();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % SLIDES.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="home-page" data-testid="home-page">
      {/* ── Hero Slideshow ── */}
      <div className="hero-slideshow">
        {SLIDES.map((src, i) => (
          <img
            key={i}
            src={src}
            alt={`Coffee slide ${i + 1}`}
            className={`slide-img ${i === current ? "slide-active" : ""}`}
          />
        ))}
        <div className="slide-overlay" />

        <div className="slide-content">
          <span className="eyebrow eyebrow-light">☕ Admin Landing Page</span>
          <h1 className="slide-title">{storeInfo?.name ?? "Coffee R Us"}</h1>
          <p className="slide-desc">
            {storeInfo?.description ??
              "The go-to store for craft coffee and elegant gifts."}
          </p>
          <div className="hero-actions">
            <Link to="/shop" className="primary-button">
              Explore Collection
            </Link>
            <Link to="/admin" className="ghost-button ghost-button-light">
              Open Admin
            </Link>
          </div>
        </div>

        <div className="slide-dots">
          {SLIDES.map((_, i) => (
            <button
              key={i}
              className={`dot ${i === current ? "dot-active" : ""}`}
              onClick={() => setCurrent(i)}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      </div>

      {/* ── Stats + Workflow ── */}
      <section className="hero-section" style={{ marginTop: "2rem" }}>
        <div className="hero-copy">
          <div className="hero-stats">
            <div className="stat-card">
              <small>Products</small>
              <strong>{allProducts.length}</strong>
            </div>
            <div className="stat-card">
              <small>Phone</small>
              <span className="stat-phone">
                {storeInfo?.phone_number ?? "555-555-5555"}
              </span>
            </div>
          </div>
        </div>

        <div className="hero-box">
          <h3>Featured workflow</h3>
          {[
            "Preview products with live search",
            "Add new items from the admin portal",
            "Edit pricing and inventory details",
            "Delete discontinued products",
          ].map((item) => (
            <div key={item} className="workflow-item">
              <span className="workflow-dot" />
              {item}
            </div>
          ))}
        </div>
      </section>

      {/* ── How it works ── */}
      <section className="how-section">
        <h2>How this portal works</h2>
        {loading ? (
          <p style={{ color: "var(--muted)", marginTop: "1rem" }}>Loading…</p>
        ) : error ? (
          <p className="error-text">{error}</p>
        ) : (
          <div className="how-grid">
            {[
              {
                icon: "🔀",
                title: "Client-side routing",
                desc: "Navigate between home, shop, and the admin portal without page refreshes.",
              },
              {
                icon: "🔄",
                title: "State management",
                desc: "A shared React context keeps search, products, and edits in sync.",
              },
              {
                icon: "💾",
                title: "Backend persistence",
                desc: "Mocked JSON backend stores products and responds to CRUD actions.",
              },
            ].map(({ icon, title, desc }) => (
              <div key={title} className="how-card">
                <div className="how-icon">{icon}</div>
                <h4>{title}</h4>
                <p>{desc}</p>
              </div>
            ))}
          </div>
        )}
      </section>
    </section>
  );
}
