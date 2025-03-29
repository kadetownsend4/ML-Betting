"use client"; // Mark as a client component

import { useState } from "react";
import Link from 'next/link';

export default function UpdatePassword() {
<<<<<<< HEAD
<<<<<<< HEAD
  // State variables to handle user input and messages. 
=======
>>>>>>> bae9ee246ac9055185ff74bd2a5b692fadc0c7e9
=======
  // State variables to handle user input and messages. 
>>>>>>> f8f41c148148be63db8269515895cad2be595b51
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> f8f41c148148be63db8269515895cad2be595b51
  /**
   * Handles form submission to update the users password.
   * Validates if the new password and confirmation match before proceeding. 
   */
<<<<<<< HEAD
=======
>>>>>>> bae9ee246ac9055185ff74bd2a5b692fadc0c7e9
=======
>>>>>>> f8f41c148148be63db8269515895cad2be595b51
  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setError("New passwords do not match.");
      return;
    }

    // Simulate a successful password update
    setSuccess("Password updated successfully!");
    setError("");
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };

  return (
    <div className="min-h-screen bg-gray-800 text-white p-8 sm:p-20">
      <div className="max-w-4xl mx-auto bg-black/70 p-8 rounded-lg shadow-xl">
        <header className="text-center mb-8">
          <h1 className="text-3xl font-semibold text-green-400">Update Password</h1>
        </header>

        {/* Error or Success Messages */}
        {error && <div className="text-red-500 mb-4">{error}</div>}
        {success && <div className="text-green-500 mb-4">{success}</div>}

<<<<<<< HEAD
<<<<<<< HEAD
        {/* Password Update Form */}
=======
>>>>>>> bae9ee246ac9055185ff74bd2a5b692fadc0c7e9
=======
        {/* Password Update Form */}
>>>>>>> f8f41c148148be63db8269515895cad2be595b51
        <form onSubmit={handlePasswordChange} className="space-y-6">
          <div>
            <label className="block text-sm text-gray-300 mb-2" htmlFor="current-password">
              Current Password
            </label>
            <input
              type="password"
              id="current-password"
              name="current-password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              required
              className="w-full px-4 py-2 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-300 mb-2" htmlFor="new-password">
              New Password
            </label>
            <input
              type="password"
              id="new-password"
              name="new-password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
              className="w-full px-4 py-2 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-300 mb-2" htmlFor="confirm-password">
              Confirm New Password
            </label>
            <input
              type="password"
              id="confirm-password"
              name="confirm-password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="w-full px-4 py-2 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
            />
          </div>
<<<<<<< HEAD
<<<<<<< HEAD
          {/* Submit button to trigger password update*/}
=======

>>>>>>> bae9ee246ac9055185ff74bd2a5b692fadc0c7e9
=======
          {/* Submit button to trigger password update*/}
>>>>>>> f8f41c148148be63db8269515895cad2be595b51
          <button
            type="submit"
            className="w-full py-2 bg-green-500 text-black font-semibold rounded-md hover:bg-green-600 transition-all duration-200"
          >
            Update Password
          </button>
        </form>

        {/* Back to Profile Button */}
        <footer className="mt-8 text-center">
          <Link href="/account/profile">
            <span className="text-green-400 hover:underline">Back to Profile</span>
          </Link>
        </footer>
      </div>
    </div>
  );
}
