"use client";
import { useState } from "react";
import { useInventory } from "../../../components/InventoryContext";

export default function AdminProducts() {
  const { products, stockMap, addStock } = useInventory();
  const [qty, setQty] = useState("");
  const [activeId, setActiveId] = useState(null);

  return (
    <div>
      <h1 className="text-xl font-semibold mb-6">Products</h1>

      <div className="grid grid-cols-3 gap-6">
        {products.map(p => {
          const stock = stockMap[p.id] ?? 0;

          return (
            <div key={p.id} className="bg-white p-5 shadow rounded">
              <h2 className="font-medium">{p.name}</h2>
              <p className="text-sm text-gray-500">{p.category}</p>

              <p className="mt-2">
                Stock:{" "}
                <span
                  className={
                    stock === 0 ? "text-red-500" : "text-green-600"
                  }
                >
                  {stock}
                </span>
              </p>

              <button
                onClick={() => setActiveId(p.id)}
                className="mt-3 bg-blue-600 text-white px-4 py-2 rounded text-sm"
              >
                + Add Stock
              </button>

              {activeId === p.id && (
                <div className="mt-3 flex gap-2">
                  <input
                    type="number"
                    placeholder="Qty"
                    value={qty}
                    min={1}
                    onChange={e => setQty(Number(e.target.value))}
                    className="border px-2 py-1 w-24 rounded"
                  />
                  <button
                    onClick={() => {
                      addStock(p.id, qty);
                      setActiveId(null);
                      setQty("");
                    }}
                    className="bg-green-600 text-white px-3 py-1 rounded"
                  >
                    Save
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
