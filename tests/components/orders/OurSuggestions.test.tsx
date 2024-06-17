import OurSuggestions from "../../../src/pages/orders/components/OurSuggestions";
import { render, screen } from "@testing-library/react";
import AllProviders from "../../AllProviders";
import { server } from "../../mocks/server";
import { delay, http, HttpResponse } from "msw";
import { db } from "../../mocks/db";

import { faker } from "@faker-js/faker";
import { ProductT } from "@/typing/products";

describe("Our suggestions", () => {
  let productsList: ProductT[] = [];

  beforeAll(() => {
    [1, 2].forEach((item) => {
      const product = db.product.create({
        id: item.toString(),
        description: faker.commerce.productDescription(),
        category: "1",
        price: 20,
      });
      productsList.push(product);
    });
  });

  afterAll(() => {
    const orderIds = productsList.map((o) => o.id);
    db.product.deleteMany({
      where: { id: { in: orderIds } },
    });
  });

  it("should render a table with products data", async () => {
    server.use(
      http.get("/products", async () => {
        await delay(); // Simulate network delay
        return HttpResponse.json(productsList);
      })
    );

    render(<OurSuggestions products={productsList} />, {
      wrapper: AllProviders,
    });

    const elementHeader = await screen.findByRole("heading", {
      name: /our Suggestions/i,
    });

    expect(elementHeader).toBeInTheDocument();
    expect(screen.getAllByRole("button")).toHaveLength(productsList.length);
  });

  it("should render no result text if products are empty", async () => {
    render(<OurSuggestions products={[]} />, { wrapper: AllProviders });

    const noResultText = screen.getByText(/no results/i);

    expect(noResultText).toBeInTheDocument();
  });
});
