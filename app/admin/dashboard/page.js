"use client";

import { useInventory } from "../../../components/InventoryContext";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from "recharts";

export default function AdminDashboard() {
  const { products, activities } = useInventory();

  /* ---------------- METRICS ---------------- */

  const totalProducts = products.length;
  const lowStockItems = products.filter(p => p.stock < 20);
  const pendingOrders = 5; // UI placeholder
  const slowMovingItems = lowStockItems.length;

  /* ---------------- FORECAST DATA ---------------- */

  const forecastData = [
    { day: "Mon", value: 30 },
    { day: "Tue", value: 35 },
    { day: "Wed", value: 60 },
    { day: "Thu", value: 40 },
    { day: "Fri", value: 70 },
    { day: "Sat", value: 90 },
    { day: "Sun", value: 65 }
  ];

  return (
    <div className="space-y-6">

      {/* ===== METRIC CARDS ===== */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <MetricCard title="Total Products" value={totalProducts} />
        <MetricCard title="Low Stock Alerts" value={lowStockItems.length} alert />
        <MetricCard title="Pending Orders" value={pendingOrders} />
        <MetricCard title="Slow-Moving Items" value={slowMovingItems} alert />
      </div>

      {/* ===== MAIN GRID ===== */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* STOCK TABLE */}
        <div className="bg-white rounded-xl shadow p-5">
          <h3 className="font-semibold mb-4">Current Stock Overview</h3>

          <table className="w-full text-sm">
            <thead className="border-b">
              <tr className="text-left text-gray-500">
                <th className="pb-2">Product</th>
                <th>In Stock</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {products.map(p => (
                <tr key={p.id} className="border-b last:border-0">
                  <td className="py-2 font-medium">{p.name}</td>
                  <td>{p.stock}</td>
                  <td>
                    {p.stock < 20 ? (
                      <span className="text-red-600 text-xs font-semibold">
                        Low Stock
                      </span>
                    ) : (
                      <span className="text-green-600 text-xs font-semibold">
                        OK
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <a
            href="/admin/products"
            className="inline-block mt-4 bg-blue-600 text-white px-4 py-2 rounded text-sm"
          >
            Manage Products
          </a>
        </div>

        {/* FORECAST CHART */}
        <div className="bg-white rounded-xl shadow p-5">
          <h3 className="font-semibold mb-4">Sales Forecast (Next 7 Days)</h3>

          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={forecastData}>
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#2563eb" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="mt-4 text-sm text-gray-600">
            <p>• Festival Season: Higher demand expected</p>
            <p>• Historical trend based estimation</p>
          </div>
        </div>
      </div>

      {/* ===== ACTIVITY + ORDERS ===== */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        <div className="bg-white rounded-xl shadow p-5">
          <h3 className="font-semibold mb-4">Recent Activities</h3>
          <ul className="space-y-2 text-sm">
            {activities.length === 0 && (
              <li className="text-gray-400">No activity today</li>
            )}
            {activities.map((a, i) => (
              <li key={i}>• {a.text}</li>
            ))}
          </ul>
        </div>

        <div className="bg-white rounded-xl shadow p-5">
          <h3 className="font-semibold mb-4">Pending Orders</h3>
          <ul className="space-y-3 text-sm">
            <li>📦 Order #1025 – Awaiting Payment</li>
            <li>📦 Order #1026 – Pending Confirmation</li>
            <li>📦 Order #1027 – Payment Pending</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

/* ===== METRIC CARD ===== */

function MetricCard({ title, value, alert }) {
  return (
    <div className="bg-white rounded-xl shadow p-4">
      <p className="text-sm text-gray-500">{title}</p>
      <div className="flex items-center gap-2">
        <h2 className="text-2xl font-bold">{value}</h2>
        {alert && (
          <span className="text-xs bg-red-100 text-red-600 px-2 py-0.5 rounded">
            !
          </span>
        )}
      </div>
    </div>
  );
}
