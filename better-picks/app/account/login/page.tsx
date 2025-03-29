"use client";  // ✅ Ensures React hooks can be used

<<<<<<< HEAD
<<<<<<< HEAD
import React, { useState } from "react";
import Link from "next/link";

/**
 * Login component
 *  
 * This component renders a login form with email and password inputs.
 * It includes basic authentication logic that checks for a test email/password
 * If credentials are incorrect, an error message is displayed.
 * 
 * Features:
 * - Input fields for email and password
 * - Basic validation with error handling
 * - Simple authentication logic 
 * - Styled using Tailwind CSS for a modern UI
 */

export default function Login() {
  // State hooks for managing input values and error messages. 
=======
import { useState } from "react";
=======
import React, { useState } from "react";
>>>>>>> f8f41c148148be63db8269515895cad2be595b51
import Link from "next/link";

/**
 * Login component
 *  
 * This component renders a login form with email and password inputs.
 * It includes basic authentication logic that checks for a test email/password
 * If credentials are incorrect, an error message is displayed.
 * 
 * Features:
 * - Input fields for email and password
 * - Basic validation with error handling
 * - Simple authentication logic 
 * - Styled using Tailwind CSS for a modern UI
 */

export default function Login() {
<<<<<<< HEAD
>>>>>>> bae9ee246ac9055185ff74bd2a5b692fadc0c7e9
=======
  // State hooks for managing input values and error messages. 
>>>>>>> f8f41c148148be63db8269515895cad2be595b51
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> f8f41c148148be63db8269515895cad2be595b51
  /**
   * Handles form submission.
   * Checks if the entered email and password match preset credentials. 
   * Displays an error message if authentication fails. 
   * 
   * @param {React.FormEvent} e - Form event to prevent default submission behavior. 
   */
<<<<<<< HEAD
=======
>>>>>>> bae9ee246ac9055185ff74bd2a5b692fadc0c7e9
=======
>>>>>>> f8f41c148148be63db8269515895cad2be595b51
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (email === "test@example.com" && password === "password") {
      alert("Login successful! Redirecting...");
    } else {
      setError("Invalid email or password.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
<<<<<<< HEAD
<<<<<<< HEAD
      {/* Login Container */}
      <div className="w-full max-w-md bg-black/80 p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-center text-green-400">Login</h2>
        {/* Display error message if authentication fails */}
        {error && <p className="text-red-500 text-center mt-4">{error}</p>}

        {/* Login Form */}
        <form onSubmit={handleLogin} className="mt-6 space-y-4">
          {/* Email Input Field */}
=======
=======
      {/* Login Container */}
>>>>>>> f8f41c148148be63db8269515895cad2be595b51
      <div className="w-full max-w-md bg-black/80 p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-center text-green-400">Login</h2>
        {/* Display error message if authentication fails */}
        {error && <p className="text-red-500 text-center mt-4">{error}</p>}

        {/* Login Form */}
        <form onSubmit={handleLogin} className="mt-6 space-y-4">
<<<<<<< HEAD
>>>>>>> bae9ee246ac9055185ff74bd2a5b692fadc0c7e9
=======
          {/* Email Input Field */}
>>>>>>> f8f41c148148be63db8269515895cad2be595b51
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
<<<<<<< HEAD
<<<<<<< HEAD
          {/* Password Input Field */}
=======

>>>>>>> bae9ee246ac9055185ff74bd2a5b692fadc0c7e9
=======
          {/* Password Input Field */}
>>>>>>> f8f41c148148be63db8269515895cad2be595b51
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
<<<<<<< HEAD
<<<<<<< HEAD
          {/* Login Button */}
=======

>>>>>>> bae9ee246ac9055185ff74bd2a5b692fadc0c7e9
=======
          {/* Login Button */}
>>>>>>> f8f41c148148be63db8269515895cad2be595b51
          <button
            type="submit"
            className="w-full bg-green-500 text-black font-semibold py-2 rounded-md hover:bg-green-600 transition-all duration-200"
          >
            Login
          </button>
        </form>

        {/* Back to Profile Button */}
        <div className="mt-6 text-center">
          <Link href="/account/profile">
            <span className="bg-gray-600 text-white font-semibold py-2 px-6 rounded-md hover:bg-gray-700 transition-all duration-200 cursor-pointer">
              Back to Profile
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}
