import { DataTable } from "@/components/tables/DataTable";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { OrderByIdResponseT } from "@/typing/orders";

import { Button } from "@/components/ui/button";

// ** types
import { OrderItemsT } from "@/typing/orders";

// ** table
import { ColumnDef } from "@tanstack/react-table";
import { Trash2Icon } from "lucide-react";

// **Redux
import { useAppDispatch } from "@/redux/hooks";
import { ordersActions } from "@/redux/orders/slice";
import React from "react";
import { toast } from "react-toastify";

type OrderItemsTablePropsT = {
  products: OrderByIdResponseT["items"];
};

const OrderItemsTable = ({ products }: OrderItemsTablePropsT) => {
  const dispatch = useAppDispatch();

  const handleClickDeleteButton = (itemId: string) => {
    dispatch(
      ordersActions.deleteOrderItem({
        itemId,
      })
    );
    toast.success("Item deleted successfully");
  };

  const OrderItemsTableColumns: ColumnDef<OrderItemsT>[] = [
    {
      accessorKey: "id",
      header: "ID",
      cell: ({ row }) => <div>{row.getValue("id")}</div>,
    },
    {
      accessorKey: "price",
      header: "Price",
      cell: ({ row }) => {
        const { price } = row.original;
        return <div>{price.toFixed(2)}</div>;
      },
    },
    {
      accessorKey: "description",
      header: "Description",
      cell: ({ row }) => <div>{row.getValue("description")}</div>,
    },
    {
      accessorKey: "quantity",
      header: "Quantity",
      cell: ({ row }) => <div>{row.getValue("quantity")}</div>,
    },
    {
      accessorKey: "total",
      header: "Total",
      cell: ({ row }) => {
        const { total } = row.original;
        return <div>{total.toFixed(2)}</div>;
      },
    },
    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => {
        const { id } = row.original;

        return (
          <Button
            size="default"
            variant="destructive"
            onClick={() => {
              handleClickDeleteButton(id);
            }}
          >
            <span>Remove</span>
            <Trash2Icon className="w-4 h-4 ml-2" />
          </Button>
        );
      },
    },
  ];
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Items</CardTitle>
        <CardDescription>list of items </CardDescription>
      </CardHeader>
      <CardContent>
        <DataTable data={products} columns={OrderItemsTableColumns} />
      </CardContent>
    </Card>
  );
};

export default React.memo(OrderItemsTable);
