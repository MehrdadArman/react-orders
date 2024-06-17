import { render, screen } from "@testing-library/react";

import OrderItemsTable from "../../../src/pages/orders/components/OrderItemsTable";
import { OrderItemsT } from "@/typing/orders";
import AllProviders from "../../AllProviders";

describe("OrderItems Table", () => {
  let orderItems: OrderItemsT[] = [];

  beforeAll(() => {
    [1, 2].forEach((item) => {
      const orderItem: OrderItemsT = {
        id: item.toString(),
        category: "Product 1",
        description: "Product 1 description",
        price: 10.0,
        quantity: 1,
        total: 10.0,
      };
      orderItems.push(orderItem);
    });
  });

  afterAll(() => {
    orderItems = [];
  });

  const renderComponent = () => {
    render(<OrderItemsTable products={orderItems} />, {
      wrapper: AllProviders,
    });
  };

  it("should render title and sub title", () => {
    renderComponent();

    expect(screen.getByRole("heading", { name: /items/i })).toBeInTheDocument();
    expect(screen.getByText(/list of items/i)).toBeInTheDocument();
  });

  it("should render a table with order items data", () => {
    renderComponent();

    const tableRows = screen.getAllByRole("row");

    expect(tableRows).toHaveLength(orderItems.length + 1);
  });
});
