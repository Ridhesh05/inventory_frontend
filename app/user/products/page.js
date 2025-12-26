"use client";
import { useEffect, useState } from "react";
import api from "../../../services/api";

export default function UserDashboard() {
  const [products, setProducts] = useState([]);
  const [stockMap, setStockMap] = useState({});
  const [loading, setLoading] = useState(true);

  const [selectedProduct, setSelectedProduct] = useState(null);
  const [qty, setQty] = useState(1);
  const [successMsg, setSuccessMsg] = useState("");

  useEffect(() => {
    loadProducts();
  }, []);

  async function loadProducts() {
    setLoading(true);
    const res = await api.get("/products");
    setProducts(res.data);

    const map = {};
    for (const p of res.data) {
      const s = await api.get(`/inventory/${p.id}`);
      map[p.id] = s.data.stock;
    }
    setStockMap(map);
    setLoading(false);
  }

  function openOrderModal(product) {
    setSelectedProduct(product);
    setQty(1);
  }

  function confirmOrder() {
    setSelectedProduct(null);
    setSuccessMsg(
      `Order placed successfully. Receipt has been sent to your email.`
    );

    setTimeout(() => setSuccessMsg(""), 3000);
  }

  if (loading) {
    return <p className="text-gray-500">Loading inventory...</p>;
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      <h1 className="text-3xl font-semibold mb-8">
        Available Materials
      </h1>

      {/* PRODUCT GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map(p => {
          const stock = stockMap[p.id] ?? 0;

          return (
            <div
              key={p.id}
              className="bg-white rounded-xl shadow hover:shadow-lg transition p-6 border"
            >
              <h2 className="text-lg font-semibold">{p.name}</h2>
              <p className="text-sm text-gray-500">{p.category}</p>

              <div className="mt-4 flex justify-between items-center">
                <span
                  className={`text-sm font-medium ${
                    stock === 0 ? "text-red-600" : "text-green-600"
                  }`}
                >
                  Available: {stock}
                </span>

                <button
                  disabled={stock === 0}
                  onClick={() => openOrderModal(p)}
                  className="bg-blue-600 text-white px-4 py-2 rounded text-sm disabled:opacity-40"
                >
                  Request Material
                </button>
              </div>

              {stock === 0 && (
                <p className="text-xs text-red-500 mt-2">
                  Currently unavailable
                </p>
              )}
            </div>
          );
        })}
      </div>

      {/* ORDER MODAL */}
      {selectedProduct && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-sm shadow-lg">
            <h3 className="text-lg font-semibold mb-4">
              Request Material
            </h3>

            <p className="text-sm mb-1 font-medium">
              {selectedProduct.name}
            </p>
            <p className="text-xs text-gray-500 mb-4">
              Available: {stockMap[selectedProduct.id]}
            </p>

            <input
              type="number"
              min={1}
              max={stockMap[selectedProduct.id]}
              value={qty}
              onChange={e => setQty(Number(e.target.value))}
              className="border w-full px-3 py-2 rounded mb-4"
            />

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setSelectedProduct(null)}
                className="text-sm px-4 py-2 rounded border"
              >
                Cancel
              </button>

              <button
                onClick={confirmOrder}
                className="bg-green-600 text-white text-sm px-4 py-2 rounded"
              >
                Confirm Order
              </button>
            </div>
          </div>
        </div>
      )}

      {successMsg && (
        <div className="fixed bottom-6 right-6 bg-green-600 text-white px-6 py-3 rounded shadow-lg text-sm">
          ✅ {successMsg}
        </div>
      )}
    </div>
  );
}
