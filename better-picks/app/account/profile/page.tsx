"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface User {
  username: string;
  email: string;
}

export default function Profile() {
  const [user, setUser] = useState<User | null | false>(null); // null = loading, false = error

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch("https://betterpicks-demo.onrender.com/user", {
          method: "GET",
          credentials: "include",
        });

        if (!response.ok) throw new Error("Unauthorized");

        const data: User = await response.json();
        setUser(data); // expects { username, email }
      } catch (error) {
        console.error("Failed to fetch user:", error);
        setUser(false);
      }
    };

    fetchUser();
  }, []);

  if (user === null) {
    return <div className="min-h-screen bg-gray-800 text-white p-8">Loading...</div>;
  }

  if (user === false) {
    return (
      <div className="min-h-screen bg-gray-800 text-white p-8 text-center">
        <h1 className="text-3xl mb-4">You're not logged in.</h1>
        <Link href="/login">
          <span className="text-green-400 underline hover:text-green-300">Go to Login</span>
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-800 text-white p-8 sm:p-20">
      <div className="max-w-4xl mx-auto bg-black/70 p-8 rounded-lg shadow-xl">
        <header className="mb-8 text-center sm:text-left">
          <h1 className="text-3xl font-semibold text-green-400">Welcome, {user.username}</h1>
          <p className="text-sm text-gray-400">{user.email}</p>
        </header>

        {/* Account Settings */}
        <section>
          <h2 className="text-2xl font-semibold text-green-400 mb-4">Account Settings</h2>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <p className="text-sm text-gray-300">Change Password</p>
              <Link href="/account/update-password">
                <span className="text-green-400 hover:underline">Update</span>
              </Link>
            </div>
            <div className="flex justify-between items-center">
              <p className="text-sm text-gray-300">Notifications</p>
              <Link href="/account/settings">
                <span className="text-green-400 hover:underline">Edit</span>
              </Link>
            </div>
            <div className="flex justify-between items-center">
              <p className="text-sm text-gray-300">Privacy Settings</p>
              <Link href="/account/settings">
                <span className="text-green-400 hover:underline">Edit</span>
              </Link>
            </div>
          </div>
        </section>

        {/* Footer Links */}
        <footer className="mt-8 text-center">
          <Link href="/account/settings">
            <span className="text-green-400 hover:underline">Manage Account Settings</span>
          </Link>
        </footer>

        {/* Back to Home Button */}
        <div className="mt-8 text-center">
          <Link href="/">
            <span className="flex items-center justify-center bg-gray-600 text-white font-semibold py-2 px-6 rounded-md hover:bg-gray-700 transition-all duration-200">
              Back to Home
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}