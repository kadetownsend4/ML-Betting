"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";


// https://chatgpt.com/share/680bdac0-d934-800f-9df0-5c9aa2011ecc
export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    setError(""); // reset error

    try {
      const response = await fetch("https://betterpicks-demo.onrender.com/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // if your Flask server sets cookies
        body: JSON.stringify({
          username: email,
          password: password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // success - redirect to login or dashboard
        router.push("/account/login"); // or "/dashboard"
      } else {
        setError(data?.error || "Registration failed");
      }
    } catch (err) {
      console.error("Registration error:", err);
      setError("Server error. Please try again.");
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center text-white"
      style={{ backgroundImage: `url('/lebron_login.jpg')` }}
    >
      <div className="w-full max-w-md bg-black/80 p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-center text-green-400">Register</h2>

        {error && <p className="text-red-500 text-center mt-4">{error}</p>}

        <form onSubmit={handleRegister} className="mt-6 space-y-4">
          <div>
            <label className="block text-sm mb-2">Email</label>
            <input
              type="email"
              className="w-full px-4 py-2 bg-gray-700 text-white rounded-md focus:ring-2 focus:ring-green-400"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm mb-2">Password</label>
            <input
              type="password"
              className="w-full px-4 py-2 bg-gray-700 text-white rounded-md focus:ring-2 focus:ring-green-400"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-green-500 text-black font-semibold py-2 rounded-md hover:bg-green-600 transition-all duration-200"
          >
            Register
          </button>
        </form>

        <div className="mt-6 text-center">
          <p>Already have an account?</p>
          <br></br>
          <Link href="/account/login">
            <span className="bg-gray-600 text-white font-semibold py-2 px-6 rounded-md hover:bg-gray-700 transition-all duration-200 cursor-pointer">
              Login
            </span>
          </Link>
        </div>

        {/* Back to Home */}
        <div className="mt-6 text-center">
          <Link href="/">
            <span className="bg-gray-600 text-white font-semibold py-2 px-6 rounded-md hover:bg-gray-700 transition-all duration-200 cursor-pointer">
              Back to Home
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}
