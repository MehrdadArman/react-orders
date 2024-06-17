import { render, screen, waitFor } from "@testing-library/react";
import ProductCard from "../../../src/pages/orders/components/ProductCard";
import { db } from "../../mocks/db";
import { ProductT } from "@/typing/products";
import userEvent from "@testing-library/user-event";
import AllProviders from "../../AllProviders";
import { ToastContainer } from "react-toastify";

describe("ProductCard", () => {
  const renderComponent = () => {
    render(
      <>
        <ProductCard product={product} />
        <ToastContainer />
      </>,
      { wrapper: AllProviders }
    );
  };

  let product: ProductT;

  beforeAll(() => {
    product = db.product.create();
  });

  afterAll(() => {
    db.product.delete({ where: { id: { equals: product.id } } });
  });

  it("should render a card with product data", async () => {
    renderComponent();

    const elementTitle = await screen.findByText(product.description);
    const elementPrice = screen.getByText(`${product.price}$`);

    expect(elementTitle).toBeInTheDocument();
    expect(elementPrice).toBeInTheDocument();
  });

  it("should add an item to the cart", async () => {
    renderComponent();

    const button = screen.getByRole("button");

    const user = userEvent.setup();
    await user.click(button);

    await waitFor(() => {
      expect(screen.getByText(/item added successfully/i)).toBeInTheDocument();
    });
  });
});
