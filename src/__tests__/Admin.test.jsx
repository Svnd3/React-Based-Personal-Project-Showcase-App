import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, it, expect, vi } from "vitest";
import Admin from "../routes/Admin.jsx";

const mockProducts = [
  { id: 1, name: "Vanilla Bean", description: "Smooth", origin: "Colombia", price: 10 },
  { id: 2, name: "House Blend",  description: "Dark",   origin: "Vietnam",  price: 12 },
];

vi.mock("../context/ProductContext.jsx", () => ({
  useProductContext: () => ({
    allProducts:   mockProducts,
    addProduct:    vi.fn().mockResolvedValue({}),
    deleteProduct: vi.fn().mockResolvedValue({}),
    loading: false,
    error: "",
  }),
}));

describe("Admin page", () => {
  it("renders the admin heading", () => {
    render(<MemoryRouter><Admin /></MemoryRouter>);
    expect(screen.getByText(/manage inventory/i)).toBeInTheDocument();
  });

  it("renders existing products in the catalog list", () => {
    render(<MemoryRouter><Admin /></MemoryRouter>);
    expect(screen.getByText("Vanilla Bean")).toBeInTheDocument();
    expect(screen.getByText("House Blend")).toBeInTheDocument();
  });

  it("renders a Remove button for each product", () => {
    render(<MemoryRouter><Admin /></MemoryRouter>);
    expect(screen.getAllByText(/remove/i)).toHaveLength(2);
  });

  it("renders the add product form", () => {
    render(<MemoryRouter><Admin /></MemoryRouter>);
    expect(screen.getByTestId("product-form")).toBeInTheDocument();
  });
});
