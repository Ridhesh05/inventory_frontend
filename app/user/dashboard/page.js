"use client";
import { useEffect, useState } from "react";
import api from "../../../services/api";

export default function UserDashboard() {
  const [products, setProducts] = useState([]);
  const [stockMap, setStockMap] = useState({});
  const [qtyMap, setQtyMap] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProducts();
  }, []);

  async function loadProducts() {
    setLoading(true);

    const res = await api.get("/products");
    setProducts(res.data);

    const map = {};
    const qmap = {};

    for (const p of res.data) {
      const s = await api.get(`/inventory/${p.id}`);
      map[p.id] = s.data.stock;
      qmap[p.id] = 1;
    }

    setStockMap(map);
    setQtyMap(qmap);
    setLoading(false);
  }

  function placeOrder(product) {
    alert(
      `Order placed:\n\nProduct: ${product.name}\nQuantity: ${qtyMap[product.id]}`
    );
  }

  if (loading) {
    return <p className="text-gray-500">Loading inventory...</p>;
  }

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-6">
        Available Materials
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map(p => {
          const stock = stockMap[p.id] ?? 0;

          return (
            <div
  key={p.id}
  className="bg-white rounded-xl shadow p-5 border flex flex-col justify-between"
>
  <div>
    <h2 className="text-lg font-semibold">{p.name}</h2>
    <p className="text-sm text-gray-500">{p.category}</p>

    <p className="mt-3 text-sm">
      Available Stock:
      <span
        className={`ml-1 font-semibold ${
          stock === 0 ? "text-red-600" : "text-green-600"
        }`}
      >
        {stock}
      </span>
    </p>

    {stock === 0 && (
      <p className="text-xs text-red-500 mt-1">
        Currently unavailable. Check later.
      </p>
    )}
  </div>

  <div className="mt-4 space-y-3">
    <input
      type="number"
      min={1}
      max={stock}
      value={qtyMap[p.id]}
      disabled={stock === 0}
      className="border rounded px-3 py-2 w-full text-sm"
      onChange={e =>
        setQtyMap({ ...qtyMap, [p.id]: Number(e.target.value) })
      }
    />

    <button
      disabled={stock === 0}
      onClick={() => placeOrder(p)}
      className="bg-blue-600 text-white py-2 rounded w-full text-sm disabled:opacity-50"
    >
      Request Material
    </button>
  </div>
</div>

          );
        })}
      </div>
    </div>
  );
}
