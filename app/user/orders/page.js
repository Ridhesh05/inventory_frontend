export const dynamic = "force-dynamic";

import { Suspense } from "react";
import OrdersClient from "./OrdersClient";

export default function OrdersPage() {
  return (
    <Suspense fallback={<div>Loading orders...</div>}>
      <OrdersClient />
    </Suspense>
  );
}
