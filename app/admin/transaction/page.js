export const dynamic = "force-dynamic";

import { Suspense } from "react";
import TransactionClient from "./TransactionClient";

export default function TransactionPage() {
  return (
    <Suspense fallback={<div>Loading transaction...</div>}>
      <TransactionClient />
    </Suspense>
  );
}
