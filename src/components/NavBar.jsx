import { NavLink } from "react-router-dom";

export default function NavBar() {
  return (
    <header className="nav-bar" data-testid="navbar">
      <div className="brand">
        <span className="brand-mark">CR</span>
        <div>
          <p className="brand-name">Coffee R Us</p>
          <p className="brand-subtitle">Admin showcase portal</p>
        </div>
      </div>

      <nav className="nav-links" aria-label="Main navigation">
        <NavLink to="/" end>Home</NavLink>
        <NavLink to="/shop">Shop</NavLink>
        <NavLink to="/admin">Admin Portal</NavLink>
      </nav>
    </header>
  );
}
