import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import ProductForm from "../components/ProductForm.jsx";

describe("ProductForm", () => {
  it("renders all form fields", () => {
    render(<ProductForm onSave={vi.fn()} />);
    expect(screen.getByLabelText(/product name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/description/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/origin/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/price/i)).toBeInTheDocument();
  });

  it("shows validation error when fields are empty", async () => {
    render(<ProductForm onSave={vi.fn()} />);
    fireEvent.click(screen.getByRole("button", { name: /add product/i }));
    await waitFor(() => {
      expect(screen.getByRole("alert")).toBeInTheDocument();
    });
  });

  it("calls onSave with correct data when form is valid", async () => {
    const onSave = vi.fn().mockResolvedValue({});
    render(<ProductForm onSave={onSave} />);

    await userEvent.type(screen.getByLabelText(/product name/i), "Test Coffee");
    await userEvent.type(screen.getByLabelText(/description/i), "A test description");
    await userEvent.type(screen.getByLabelText(/origin/i), "Kenya");
    await userEvent.type(screen.getByLabelText(/price/i), "9.99");

    fireEvent.click(screen.getByRole("button", { name: /add product/i }));

    await waitFor(() => {
      expect(onSave).toHaveBeenCalledWith({
        name: "Test Coffee",
        description: "A test description",
        origin: "Kenya",
        price: 9.99,
      });
    });
  });

  it("resets the form after successful save", async () => {
    const onSave = vi.fn().mockResolvedValue({});
    render(<ProductForm onSave={onSave} />);

    const nameInput = screen.getByLabelText(/product name/i);
    await userEvent.type(nameInput, "Test Coffee");
    await userEvent.type(screen.getByLabelText(/description/i), "A test");
    await userEvent.type(screen.getByLabelText(/origin/i), "Kenya");
    await userEvent.type(screen.getByLabelText(/price/i), "5");

    fireEvent.click(screen.getByRole("button", { name: /add product/i }));

    await waitFor(() => expect(nameInput.value).toBe(""));
  });

  it("shows status message when passed as prop", () => {
    render(<ProductForm onSave={vi.fn()} statusMessage="Added successfully." />);
    expect(screen.getByRole("status")).toHaveTextContent("Added successfully.");
  });

  it("shows error for invalid price (zero)", async () => {
    render(<ProductForm onSave={vi.fn()} />);
    await userEvent.type(screen.getByLabelText(/product name/i), "X");
    await userEvent.type(screen.getByLabelText(/description/i), "X");
    await userEvent.type(screen.getByLabelText(/origin/i), "X");
    await userEvent.type(screen.getByLabelText(/price/i), "0");
    fireEvent.click(screen.getByRole("button", { name: /add product/i }));
    await waitFor(() => {
      expect(screen.getByRole("alert")).toHaveTextContent(/valid price/i);
    });
  });
});
