import { Button } from "@/components/ui/button";
import { OrderT } from "@/typing/orders";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowRightIcon } from "lucide-react";
import { Link } from "react-router-dom";

export const ordersTableColumns: ColumnDef<OrderT>[] = [
  {
    accessorKey: "id",
    header: "ID",
    cell: ({ row }) => <div>{row.getValue("id")}</div>,
  },
  {
    accessorKey: "customerId",
    header: "Customer ID",
    cell: ({ row }) => <div>{row.getValue("customerId")}</div>,
  },
  {
    accessorKey: "total",
    header: "Total",
    cell: ({ row }) => {
      return <div>{row.original.total.toFixed(2)}</div>;
    },
  },
  {
    accessorFn: (row) => row.items.length,
    header: "Product Count",
    cell: ({ row }) => <div>{row.original.items.length}</div>,
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const { id } = row.original;

      return (
        <Link
          to={`/orders/${id}`}
          className="flex space-x-2 justify-end items-center"
        >
          <Button size="default" variant="default">
            <span>View Details</span>
            <ArrowRightIcon className="w-4 h-4 ml-2" />
          </Button>
        </Link>
      );
    },
  },
];
