import { render, screen } from "@testing-library/react";
import ConfirmOrderCard from "../../../src/pages/orders/components/ConfirmOrderCard";
import { OrderByIdResponseT } from "@/typing/orders";

import { describe, it, expect } from "vitest";
import AllProviders from "../../AllProviders";
import "@testing-library/jest-dom";

const order: OrderByIdResponseT = {
  id: "1",
  total: 100,
  customer: {
    id: "customer-1",
    name: "John Doe",
    revenue: "100",
    since: "2021-01-01",
  },
  items: [
    {
      id: "item-1",
      description: "Item 1",
      price: 50,
      quantity: 1,
      total: 50,
      category: "category-1",
    },
    {
      id: "item-2",
      description: "Item 2",
      price: 50,
      quantity: 1,
      total: 50,
      category: "category-2",
    },
  ],
};

describe("ConfirmOrderCard", () => {
  it("renders correctly", () => {
    render(<ConfirmOrderCard order={order} />, { wrapper: AllProviders });

    const button = screen.getByRole("button", { name: /confirm order/i });
    expect(button).toBeInTheDocument();
    expect(button).toBeEnabled();
  });

  it("disables the button when there are no items", () => {
    const emptyOrder = { ...order, items: [] };
    render(<ConfirmOrderCard order={emptyOrder} />, { wrapper: AllProviders });

    const button = screen.getByRole("button", { name: /confirm order/i });
    expect(button).toBeDisabled();
  });
});
