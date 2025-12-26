"use client";

import { useEffect, useState } from "react";
import api from "../../../services/api";

export default function OrdersClient() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    api.get("/orders").then(res => setOrders(res.data));
  }, []);

  return (
    <div>
      <h1 className="text-xl font-semibold mb-4">My Orders</h1>

      {orders.map(order => (
        <div key={order.id} className="border p-2 mb-2">
          Order #{order.id}
        </div>
      ))}
    </div>
  );
}
