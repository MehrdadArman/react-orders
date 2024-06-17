import { DataTable } from "@/components/tables/DataTable";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { OrderT } from "@/typing/orders";

import { ReactNode } from "react";
import { ordersTableColumns } from "./OrdersTableColumns";

type OrdersTablePropsT = {
  data: OrderT[];
};

const OrdersTable = ({ data }: OrdersTablePropsT): ReactNode => {
  return (
    <Card className="w-100">
      <CardHeader>
        <CardTitle>Orders</CardTitle>
        <CardDescription>list of orders</CardDescription>
      </CardHeader>
      <CardContent>
        <DataTable data={data} columns={ordersTableColumns} />
      </CardContent>
    </Card>
  );
};

export default OrdersTable;
