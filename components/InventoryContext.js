"use client";
import { createContext, useContext, useEffect, useState } from "react";
import api from "../services/api";

const InventoryContext = createContext();

export function InventoryProvider({ children }) {
  const [products, setProducts] = useState([]);
  const [stockMap, setStockMap] = useState({});
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    loadInventory();
  }, []);

  async function loadInventory() {
    const res = await api.get("/products");
    setProducts(res.data);

    const map = {};
    for (const p of res.data) {
      const s = await api.get(`/inventory/${p.id}`);
      map[p.id] = s.data.stock;
    }

    setStockMap(map);
  }

  async function addStock(productId, quantity) {
    await api.post("/inventory/in", {
      productId,
      quantity
    });

    const product = products.find(p => p.id === productId);

    setActivities(prev => [
      {
        text: `Stock IN: ${product?.name} +${quantity}`,
        time: new Date()
      },
      ...prev
    ]);

    await loadInventory(); // 🔥 keeps Admin + Dashboard + User in sync
  }

  return (
    <InventoryContext.Provider
      value={{
        products,
        stockMap,
        activities,
        addStock
      }}
    >
      {children}
    </InventoryContext.Provider>
  );
}

export function useInventory() {
  return useContext(InventoryContext);
}
