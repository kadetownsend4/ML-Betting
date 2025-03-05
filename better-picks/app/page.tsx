"use client";
import { useState } from "react";
import Link from "next/link";

const menuItems = [
  {
    title: "NBA",
    links: [
      { name: "Latest Games", path: "/latest-games" },
      { name: "Team Stats", path: "/team-stats" },
      { name: "Player Analysis", path: "/player-analysis" },
    ],
  },
  {
    title: "NFL",
    links: [
      { name: "Game Predictions", path: "/nfl/predictions" },
      { name: "Team Performance", path: "/nfl/performance" },
      { name: "Betting Insights", path: "/nfl/betting-insights" },
    ],
  },
  {
    title: "Performance Analysis",
    links: [
      { name: "Trends", path: "/performance/trends" },
      { name: "Success Rate", path: "/performance/success-rate" },
      { name: "AI Insights", path: "/performance/ai-insights" },
    ],
  },
  {
    title: "Account",
    links: [
      { name: "Profile", path: "/account/profile" },
      { name: "Settings", path: "/account/settings" },
      { name: "Login", path: "/account/login" },
    ],
  },
];

export default function Home() {
  const [activeDropdown, setActiveDropdown] = useState(null);

  return (
    <div className="min-h-screen bg-black text-white p-8 sm:p-20 flex flex-col justify-between"
      style={{ backgroundImage: "url('/background.jpg')", backgroundSize: "cover", backgroundPosition: "center", backgroundBlendMode: "darken", backgroundColor: "rgba(0, 0, 0, 0.6)" }}>

      <header className="flex justify-between items-center w-full py-4 px-8 bg-white/10 backdrop-blur-md rounded-lg shadow-lg relative">
        <h1 className="text-2xl font-bold text-green-400 font-mono">Better Picks</h1>
        <nav className="flex space-x-10 relative">
          {menuItems.slice(0, -1).map((item, index) => (
            <div
              key={index}
              className="relative group"
              onMouseEnter={() => setActiveDropdown(item.title)}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button className="text-lg font-semibold hover:text-green-400 transition">
                {item.title}
              </button>
              {activeDropdown === item.title && (
                <div
                  className="absolute left-1/2 transform -translate-x-1/2 mt-2 w-80 bg-gray-800 border border-gray-700 rounded-lg shadow-lg p-4 flex flex-wrap justify-center gap-4 transition-all"
                  style={{ transitionDelay: "0.3s" }} // Adds a 300ms delay to the hover effect
                  onMouseEnter={() => setActiveDropdown(item.title)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  {item.links.map((link, idx) => (
                    <Link
                      key={idx}
                      href={link.path}
                      className="block px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-md transition text-center w-full"
                    >
                      {link.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
          <div
            className="relative group ml-auto"
            onMouseEnter={() => setActiveDropdown("Account")}
            onMouseLeave={() => setActiveDropdown(null)}
          >
            <button className="text-lg font-semibold hover:text-green-400 transition">
              Account
            </button>
            {activeDropdown === "Account" && (
              <div
                className="absolute right-0 mt-2 w-80 bg-gray-800 border border-gray-700 rounded-lg shadow-lg p-4 flex flex-wrap justify-center gap-4 transition-all"
                style={{ transitionDelay: "0.5s" }} // Adds a 300ms delay to the hover effect
                onMouseEnter={() => setActiveDropdown("Account")}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                {menuItems.find(item => item.title === "Account").links.map((link, idx) => (
                  <Link
                    key={idx}
                    href={link.path}
                    className="block px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-md transition text-center w-full"
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </nav>
      </header>

      <main className="flex flex-col gap-8 items-center sm:items-start mt-16 flex-grow">
        <h2 className="text-3xl font-extrabold text-center sm:text-left text-green-400 mb-4">
          Your Ultimate Sports Betting Analyzer
        </h2>
        <p className="text-lg sm:text-xl text-center sm:text-left opacity-80 mb-8">
          Gain the edge with AI-driven betting insights, real-time analytics, and expert picks.
        </p>

        <div className="flex gap-6 items-center flex-col sm:flex-row">
          <a
            className="rounded-full border border-transparent transition-all transform hover:scale-105 flex items-center justify-center bg-green-500 text-black font-semibold gap-2 hover:bg-green-600 text-lg sm:text-xl h-12 sm:h-14 px-8 sm:px-10 shadow-md"
            href="/dashboard"
          >
            Get Started
          </a>
          <a
            className="rounded-full border border-gray-500 dark:border-gray-300 transition-all transform hover:scale-105 flex items-center justify-center hover:bg-gray-600 dark:hover:bg-gray-400 hover:border-transparent text-lg sm:text-xl h-12 sm:h-14 px-8 sm:px-10 shadow-md"
            href="/about"
          >
            Learn More
          </a>
        </div>
      </main>

      <footer className="flex gap-8 flex-wrap items-center justify-center text-gray-300 text-base mt-auto py-6">
        <a className="hover:text-green-400 transition-colors" href="/features">Features</a>
        <a className="hover:text-green-400 transition-colors" href="/pricing">Pricing</a>
        <a className="hover:text-green-400 transition-colors" href="/contact">Contact Us</a>
      </footer>
    </div>
  );
}
