import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useAppDispatch } from "@/redux/hooks";
import { ordersActions } from "@/redux/orders/slice";
import { ProductT } from "@/typing/products";
import { faker } from "@faker-js/faker";
import { PlusIcon } from "lucide-react";
import React from "react";
import { toast } from "react-toastify";

type ProductCardProps = {
  product: ProductT;
};

const ProductCard = ({ product }: ProductCardProps) => {
  const dispatch = useAppDispatch();
  const { description, price } = product;

  // ** i did it just for better ui :)))
  const fakeImage = faker.image.urlLoremFlickr({
    category: "product",
  });

  const handleClickAddItem = (product: ProductT) => {
    dispatch(
      ordersActions.addOrderItem({
        item: { ...product, quantity: 1, total: product.price },
      })
    );
    toast.success("Item added successfully");
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>{description}</CardTitle>
        <CardDescription>10% off</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="overflow-hidden rounded-md mb-5">
          <img
            className="h-auto w-auto object-cover transition-all hover:scale-105"
            src={fakeImage}
            alt="Placeholder"
          />
        </div>

        <div>
          <span className=" text-xl text-primary font-bold">{price}$</span>
        </div>
      </CardContent>
      <CardFooter>
        <Button
          variant={"outline"}
          className=" w-full"
          onClick={() => handleClickAddItem(product)}
        >
          Add to order
          <PlusIcon className="ml-2 h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default React.memo(ProductCard);
