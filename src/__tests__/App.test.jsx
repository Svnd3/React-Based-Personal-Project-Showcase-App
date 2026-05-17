import { describe, it, expect, beforeEach, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "../App.jsx";
import axios from "axios";

vi.mock("axios");

describe("App routing and UI", () => {
  beforeEach(() => {
    axios.get.mockImplementation((url) => {
      if (url.endsWith("/store_info")) {
        return Promise.resolve({
          data: [
            {
              id: 1,
              name: "Coffee R Us",
              description:
                "The go-to store for craft coffee and elegant gifts.",
              phone_number: "555-555-5555",
            },
          ],
        });
      }
      if (url.endsWith("/coffee")) {
        return Promise.resolve({
          data: [
            {
              id: 1,
              name: "Vanilla Bean",
              description: "Medium roast",
              origin: "Colombia",
              price: 10.0,
            },
          ],
        });
      }
      return Promise.reject(new Error("Not found"));
    });
  });

  it("renders the home page and navigation links", async () => {
    render(<App />);
    expect(
      await screen.findByRole("heading", { name: /coffee r us/i }),
    ).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /shop/i })).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /admin portal/i }),
    ).toBeInTheDocument();
  });

  it("can navigate to the admin page", async () => {
    render(<App />);
    await userEvent.click(screen.getByRole("link", { name: /admin portal/i }));
    expect(
      await screen.findByRole("heading", { name: /manage inventory/i }),
    ).toBeInTheDocument();
  });
});
