"use client";

import { InventoryProvider } from "../../components/InventoryContext";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AdminLayout({ children }) {
  const router = useRouter();

  useEffect(() => {
    const isAdmin = localStorage.getItem("isAdmin");
    if (!isAdmin) {
      router.push("/login");
    }
  }, [router]);

  return (
    <InventoryProvider>
      <div className="min-h-screen">
        <nav className="bg-white shadow px-8 py-4 flex justify-between items-center">
          <h2 className="font-semibold text-lg">Inventory Admin</h2>

          <div className="flex gap-6 text-sm font-medium">
            <a href="/admin/dashboard">Dashboard</a>
            <a href="/admin/products">Products</a>
            <a href="/admin/transaction">Transactions</a>
          </div>

          <button
            onClick={() => {
              localStorage.removeItem("isAdmin");
              router.push("/login");
            }}
            className="text-sm text-red-500"
          >
            Logout
          </button>
        </nav>

        <main className="p-8">{children}</main>
      </div>
    </InventoryProvider>
  );
}
