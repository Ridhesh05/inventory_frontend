"use client";
import { useState } from "react";
import api from "../../../../services/api";
import { useRouter } from "next/navigation";

export default function AddProduct() {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [unit, setUnit] = useState("");
  const router = useRouter();

  async function save() {
    await api.post("/admin/products", { name, category, unit });
    router.push("/admin/products");
  }

  return (
    <div className="max-w-md bg-white p-6 shadow rounded">
      <h2 className="text-lg font-semibold mb-4">Add Product</h2>

      <input
        className="border p-2 w-full mb-3"
        placeholder="Product Name"
        onChange={e => setName(e.target.value)}
      />
      <input
        className="border p-2 w-full mb-3"
        placeholder="Category"
        onChange={e => setCategory(e.target.value)}
      />
      <input
        className="border p-2 w-full mb-4"
        placeholder="Unit (Bag, Kg, etc)"
        onChange={e => setUnit(e.target.value)}
      />

      <button
        onClick={save}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Save
      </button>
    </div>
  );
}
