"use client";
import { useState } from "react";
import api from "../../../services/api";
import { useRouter } from "next/navigation";

export default function UserLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  async function login() {
    try {
      const res = await api.post("/auth/login", { email, password });
      localStorage.setItem("user", JSON.stringify(res.data));
router.push("/user/dashboard");
    } catch {
      alert("Invalid credentials");
    }
  }

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="bg-white p-6 rounded shadow w-80">
        <h2 className="font-semibold mb-4">User Login</h2>

        <input
          className="border p-2 w-full mb-3"
          placeholder="Email"
          onChange={e => setEmail(e.target.value)}
        />

        <input
          type="password"
          className="border p-2 w-full mb-4"
          placeholder="Password"
          onChange={e => setPassword(e.target.value)}
        />

        <button
          onClick={login}
          className="bg-blue-600 text-white w-full py-2 rounded"
        >
          Login
        </button>
      </div>
    </div>
  );
}
