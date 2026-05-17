import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, it, expect, vi, beforeEach } from "vitest";
import Products from "../routes/Products.jsx";

// Create a shared mock for setSearch to track calls
let mockSetSearch = vi.fn();

// Mock the context so tests don't need a real server
vi.mock("../context/ProductContext.jsx", () => ({
  useProductContext: () => ({
    products: [
      {
        id: 1,
        name: "Vanilla Bean",
        description: "Smooth vanilla",
        origin: "Colombia",
        price: 10,
      },
      {
        id: 2,
        name: "House Blend",
        description: "Dark roast",
        origin: "Vietnam",
        price: 12,
      },
    ],
    loading: false,
    error: "",
    search: "",
    setSearch: mockSetSearch,
  }),
}));

describe("Products (Shop page)", () => {
  it("renders the shop heading", () => {
    render(
      <MemoryRouter>
        <Products />
      </MemoryRouter>,
    );
    expect(screen.getByText(/browse products/i)).toBeInTheDocument();
  });

  it("renders all product cards", () => {
    render(
      <MemoryRouter>
        <Products />
      </MemoryRouter>,
    );
    expect(screen.getAllByTestId("product-card")).toHaveLength(2);
  });

  it("renders a search input", () => {
    render(
      <MemoryRouter>
        <Products />
      </MemoryRouter>,
    );
    expect(screen.getByRole("searchbox")).toBeInTheDocument();
  });

  it("calls setSearch when user types in the search box", () => {
    mockSetSearch.mockClear();
    render(
      <MemoryRouter>
        <Products />
      </MemoryRouter>,
    );
    const input = screen.getByRole("searchbox");
    fireEvent.change(input, { target: { value: "vanilla" } });
    expect(mockSetSearch).toHaveBeenCalledWith("vanilla");
  });
});
