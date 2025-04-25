// Used the following link to generate a starting page for the "Settings" feature on our application.
// https://chatgpt.com/share/680bb56e-3f84-8012-b33c-929ea63b8a94
"use client";
import { useState } from "react";

export default function SettingsPage() {
  // Declares a useState to track if the user wants email notifications enabled.
  const [emailNotifications, setEmailNotifications] = useState(true);
  // Declares a useState to track if the user wants dark mode enabled.
  const [darkMode, setDarkMode] = useState(false);
  // Declares a useState to store the users favorite sport.
  const [favoriteSport, setFavoriteSport] = useState("NBA");

  return (
    <div
      className="min-h-screen bg-cover bg-center text-white p-8 sm:p-20 relative overflow-y-auto"
      style={{ backgroundImage: "url('/settings/download1.jpg')" }} // ✅ Corrected path
    >
      {/* Overlay for readability */}
      <div className="absolute inset-0 bg-black/40 z-0" />

      <div className="relative z-10 max-w-3xl mx-auto flex flex-col gap-10 mt-24 sm:mt-32">
        {/* Header */}
        <h1 className="text-4xl font-extrabold drop-shadow-xl text-center">
          Account Settings
        </h1>

        {/* Section: Preferences */}
        <section className="bg-white/10 border border-white/15 rounded-xl p-6 shadow-xl backdrop-blur-md">
          <h2 className="text-2xl font-bold mb-4">Preferences</h2>

          <div className="flex items-center justify-between mb-4">
            <label className="text-lg font-medium">Email Notifications</label>
            <input
              type="checkbox"
              checked={emailNotifications}
              onChange={() => setEmailNotifications(!emailNotifications)}
              className="w-5 h-5 text-purple-600 bg-gray-800 border-gray-600 rounded focus:ring-purple-500"
            />
          </div>

          <div className="flex items-center justify-between mb-4">
            <label className="text-lg font-medium">Dark Mode</label>
            <input
              type="checkbox"
              checked={darkMode}
              onChange={() => setDarkMode(!darkMode)}
              className="w-5 h-5 text-purple-600 bg-gray-800 border-gray-600 rounded focus:ring-purple-500"
            />
          </div>

          <div className="mb-4">
            <label className="block text-lg font-medium mb-1">Favorite Sport</label>
            <select
              value={favoriteSport}
              onChange={(e) => setFavoriteSport(e.target.value)}
              className="w-full bg-black border border-white/25 rounded-lg p-2 text-white"
            >
              <option value="NBA">NBA</option>
              <option value="NFL">NFL</option>
              <option value="Both">Both</option>
            </select>
          </div>
        </section>

        {/* Section: Account Actions */}
        <section className="bg-white/10 border border-white/15 rounded-xl p-6 shadow-xl backdrop-blur-md">
          <h2 className="text-2xl font-bold mb-4">Account Actions</h2>

          <div className="flex flex-col gap-4">
            <button className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-6 rounded-lg transition">
              Update Account Info
            </button>

            <button className="bg-green-500 hover:bg-green-600 text-black font-bold py-2 px-6 rounded-lg transition">
              Change Password
            </button>

            <button className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-6 rounded-lg transition">
              Delete Account
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}
