import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, it, expect } from "vitest";
import NavBar from "../components/NavBar.jsx";

describe("NavBar", () => {
  function renderNavBar(initialPath = "/") {
    return render(
      <MemoryRouter initialEntries={[initialPath]}>
        <NavBar />
      </MemoryRouter>
    );
  }

  it("renders the brand name", () => {
    renderNavBar();
    expect(screen.getByText("Coffee R Us")).toBeInTheDocument();
  });

  it("renders all navigation links", () => {
    renderNavBar();
    expect(screen.getByRole("link", { name: /home/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /shop/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /admin portal/i })).toBeInTheDocument();
  });

  it("Home link points to /", () => {
    renderNavBar();
    expect(screen.getByRole("link", { name: /home/i })).toHaveAttribute("href", "/");
  });

  it("Shop link points to /shop", () => {
    renderNavBar();
    expect(screen.getByRole("link", { name: /shop/i })).toHaveAttribute("href", "/shop");
  });

  it("Admin Portal link points to /admin", () => {
    renderNavBar();
    expect(screen.getByRole("link", { name: /admin portal/i })).toHaveAttribute("href", "/admin");
  });
});
