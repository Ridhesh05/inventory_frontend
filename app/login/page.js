"use client";
import { useRouter } from "next/navigation";

export default function LoginHome() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-xl rounded-2xl p-10 w-full max-w-md text-center">
        
        <h1 className="text-2xl font-bold mb-2">
          Inventory Management System
        </h1>

        <p className="text-gray-600 mb-8">
          Construction Material Business
        </p>

        {/* ADMIN */}
        <button
          onClick={() => router.push("/login/admin")}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-medium mb-4"
        >
          Login as Admin
        </button>

        {/* USER */}
        <button
          onClick={() => router.push("/user/login")}
          className="w-full border border-gray-300 hover:bg-gray-50 py-3 rounded-lg font-medium"
        >
          Login as User
        </button>
        <p className="text-sm text-center mt-4">
  Don’t have an account?{" "}
  <a href="/user/register" className="text-blue-600 underline">
    Register
  </a>
</p>

        <p className="text-xs text-gray-400 mt-6">
          Manage stock • Place orders • Track inventory
        </p>
      </div>
    </div>
  );
}
