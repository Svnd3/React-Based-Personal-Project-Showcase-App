import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, it, expect } from "vitest";
import ProductCard from "../components/ProductCard.jsx";

const mockProduct = {
  id: 1,
  name: "Vanilla Bean",
  description: "Medium roast with warm vanilla and caramel notes.",
  origin: "Colombia",
  price: 10.0,
};

function renderCard(product = mockProduct) {
  return render(
    <MemoryRouter>
      <ProductCard product={product} />
    </MemoryRouter>
  );
}

describe("ProductCard", () => {
  it("renders the product name", () => {
    renderCard();
    expect(screen.getByText("Vanilla Bean")).toBeInTheDocument();
  });

  it("renders the product description", () => {
    renderCard();
    expect(screen.getByText(mockProduct.description)).toBeInTheDocument();
  });

  it("renders the origin", () => {
    renderCard();
    expect(screen.getByText(/colombia/i)).toBeInTheDocument();
  });

  it("renders the formatted price", () => {
    renderCard();
    expect(screen.getByText("$10.00")).toBeInTheDocument();
  });

  it("renders a link to the product detail page", () => {
    renderCard();
    const link = screen.getByRole("link", { name: /view details for vanilla bean/i });
    expect(link).toHaveAttribute("href", "/products/1");
  });
});
