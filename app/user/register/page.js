"use client";
import { useState } from "react";
import api from "../../../services/api";
import { useRouter } from "next/navigation";

export default function UserRegister() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  async function register() {
    await api.post("/auth/register", { name, email, password });
    router.push("/user/login");
  }

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="bg-white p-6 rounded shadow w-80">
        <h2 className="font-semibold mb-4">Create Account</h2>

        <input
          className="border p-2 w-full mb-3"
          placeholder="Name"
          onChange={e => setName(e.target.value)}
        />

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
          onClick={register}
          className="bg-green-600 text-white w-full py-2 rounded"
        >
          Register
        </button>
      </div>
    </div>
  );
}
