"use client";
import { useState } from "react";
import api from "../../../services/api";
import { useRouter } from "next/navigation";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  async function login() {
    try {
      await api.post("/admin/login", { email, password });
      localStorage.setItem("isAdmin", "true");
      router.push("/admin/dashboard");
    } catch {
      alert("Invalid admin credentials");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow rounded-xl p-8 w-full max-w-sm">
        <h2 className="text-xl font-semibold mb-6 text-center">
          Admin Login
        </h2>

        <input
          className="border p-3 w-full mb-4 rounded"
          placeholder="Admin Email"
          onChange={e => setEmail(e.target.value)}
        />

        <input
          type="password"
          className="border p-3 w-full mb-6 rounded"
          placeholder="Password"
          onChange={e => setPassword(e.target.value)}
        />

        <button
          onClick={login}
          className="bg-blue-600 text-white w-full py-3 rounded-lg"
        >
          Login
        </button>
      </div>
    </div>
  );
}
