import OrdersTable from "../../../src/pages/orders/components/OrdersTable";
import { render, screen } from "@testing-library/react";
import AllProviders from "../../AllProviders";
import { server } from "../../mocks/server";
import { delay, http, HttpResponse } from "msw";
import { db } from "../../mocks/db";
import { OrderT } from "@/typing/orders";
import { faker } from "@faker-js/faker";

describe("Orders Table", () => {
  let ordersList: OrderT[] = [];

  beforeAll(() => {
    [1, 2].forEach((item) => {
      const items = [1, 2].map(() =>
        db.orderItem.create({
          productId: faker.string.uuid(),
          unitPrice: 50,
          quantity: 2,
          total: 100,
        })
      );
      const order = db.order.create({
        id: faker.string.uuid(),
        customerId: faker.string.uuid(),
        total: 100 * item,
        items: items,
      });
      ordersList.push(order);
    });
  });

  afterAll(() => {
    const orderIds = ordersList.map((o) => o.id);
    db.order.deleteMany({
      where: { id: { in: orderIds } },
    });
  });

  it("should render a table with orders data", async () => {
    server.use(
      http.get("/orders", async () => {
        await delay(); // Simulate network delay
        return HttpResponse.json(ordersList);
      })
    );

    render(<OrdersTable data={ordersList} />, { wrapper: AllProviders });

    const ordersElementHeader = await screen.findByRole("heading", {
      name: /orders/i,
    });

    expect(ordersElementHeader).toBeInTheDocument();
    expect(screen.getAllByRole("row")).toHaveLength(3);
  });

  it("should render no result text if orders are empty", async () => {
    render(<OrdersTable data={[]} />, { wrapper: AllProviders });

    const ordersElementHeader = await screen.findByRole("heading", {
      name: /orders/i,
    });
    const noResultText = screen.getByText(/no results/i);

    expect(ordersElementHeader).toBeInTheDocument();
    expect(noResultText).toBeInTheDocument();
  });
});
