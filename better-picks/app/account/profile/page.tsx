<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> f8f41c148148be63db8269515895cad2be595b51
/*
  Profile Page Component 
  ----------------------
  This React component represents a profile page with account details, settings, and navigation options. 
  It includes the users profile picture, name, and email, along with links to manage account settings, update the profile, and navigate to other account-related sections.
  Tailwind CSS classes are used for styling. 
*/

<<<<<<< HEAD
=======
>>>>>>> bae9ee246ac9055185ff74bd2a5b692fadc0c7e9
=======
>>>>>>> f8f41c148148be63db8269515895cad2be595b51
"use client"; // Add this line to mark it as a client component

import { useState } from "react";
import Link from 'next/link';
<<<<<<< HEAD
<<<<<<< HEAD
// Profile component for displaying user information and settings 
export default function Profile() {
  const [user, setUser] = useState({
    // State variables to manage user data
=======

export default function Profile() {
  const [user, setUser] = useState({
>>>>>>> bae9ee246ac9055185ff74bd2a5b692fadc0c7e9
=======
// Profile component for displaying user information and settings 
export default function Profile() {
  const [user, setUser] = useState({
    // State variables to manage user data
>>>>>>> f8f41c148148be63db8269515895cad2be595b51
    name: "John Doe",
    email: "john.doe@example.com",
    profilePicture: "/path/to/profile-picture.jpg",
  });

  return (
    <div className="min-h-screen bg-gray-800 text-white p-8 sm:p-20">
<<<<<<< HEAD
<<<<<<< HEAD
      {/* Profile Card */}
      <div className="max-w-4xl mx-auto bg-black/70 p-8 rounded-lg shadow-xl">
      {/* Profile Header */}
=======
      <div className="max-w-4xl mx-auto bg-black/70 p-8 rounded-lg shadow-xl">
>>>>>>> bae9ee246ac9055185ff74bd2a5b692fadc0c7e9
=======
      {/* Profile Card */}
      <div className="max-w-4xl mx-auto bg-black/70 p-8 rounded-lg shadow-xl">
      {/* Profile Header */}
>>>>>>> f8f41c148148be63db8269515895cad2be595b51
        <header className="flex flex-col sm:flex-row items-center sm:gap-8 mb-8 relative">
          {/* Profile picture container */}
          <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full overflow-hidden border-4 border-green-400 relative">
            <img src={user.profilePicture} alt="Profile Picture" className="w-full h-full object-cover" />
            {/* Text centered within the profile picture */}
            <div className="absolute inset-0 flex items-center justify-center text-center text-white font-bold text-lg">
              Profile Picture
            </div>
          </div>
<<<<<<< HEAD
<<<<<<< HEAD
          {/* User Info */}
=======
>>>>>>> bae9ee246ac9055185ff74bd2a5b692fadc0c7e9
=======
          {/* User Info */}
>>>>>>> f8f41c148148be63db8269515895cad2be595b51
          <div className="text-center sm:text-left mt-4 sm:mt-0">
            <h1 className="text-3xl font-semibold text-green-400">{user.name}</h1>
            <p className="text-sm text-gray-400">{user.email}</p>
          </div>
        </header>

<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> f8f41c148148be63db8269515895cad2be595b51
        {/* Account Settings Section */}
        <section>
          <h2 className="text-2xl font-semibold text-green-400 mb-4">Account Settings</h2>
          <div className="space-y-4">
            {/* Account Settings Options */}
<<<<<<< HEAD
=======
        <section>
          <h2 className="text-2xl font-semibold text-green-400 mb-4">Account Settings</h2>
          <div className="space-y-4">
>>>>>>> bae9ee246ac9055185ff74bd2a5b692fadc0c7e9
=======
>>>>>>> f8f41c148148be63db8269515895cad2be595b51
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

        {/* Buttons to navigate between account pages */}
        <section className="mt-8 space-y-4">
          <h2 className="text-2xl font-semibold text-green-400 mb-4">Other Account Pages</h2>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/account/settings">
              <span className="flex items-center justify-center bg-green-500 text-black font-semibold py-2 px-6 rounded-md hover:bg-green-600 transition-all duration-200">
                Settings
              </span>
            </Link>
            <Link href="/account/notifications">
              <span className="flex items-center justify-center bg-blue-500 text-white font-semibold py-2 px-6 rounded-md hover:bg-blue-600 transition-all duration-200">
                Notifications
              </span>
            </Link>
            <Link href="/account/privacy">
              <span className="flex items-center justify-center bg-yellow-500 text-black font-semibold py-2 px-6 rounded-md hover:bg-yellow-600 transition-all duration-200">
                Privacy Settings
              </span>
            </Link>
          </div>
        </section>

<<<<<<< HEAD
<<<<<<< HEAD
        {/* Footer Links */}
=======
>>>>>>> bae9ee246ac9055185ff74bd2a5b692fadc0c7e9
=======
        {/* Footer Links */}
>>>>>>> f8f41c148148be63db8269515895cad2be595b51
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
