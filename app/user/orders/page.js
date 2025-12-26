"use client";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import api from "../../../services/api";

export default function OrderPage() {
  const params = useSearchParams();
  const productId = params.get("productId");
  const [qty, setQty] = useState(1);

  async function placeOrder() {
    const user = JSON.parse(localStorage.getItem("user"));

    await api.post("/orders", {
      userId: user.id,
      items: [{ productId, qty }]
    });

    alert("Order placed");
  }

  return (
    <div className="p-6">
      <h1 className="text-xl font-semibold mb-4">Place Order</h1>

      <input
        type="number"
        className="border p-2 mb-4"
        value={qty}
        min={1}
        onChange={e => setQty(Number(e.target.value))}
      />

      <button
        onClick={placeOrder}
        className="bg-green-600 text-white px-4 py-2 rounded"
      >
        Confirm Order
      </button>
    </div>
  );
}
