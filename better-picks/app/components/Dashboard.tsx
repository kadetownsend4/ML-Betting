"use client";
import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

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

export default function Dashboard() {
  const [activeDropdown, setActiveDropdown] = useState(null);

  return (
    <header className="flex justify-between items-center w-full py-4 px-8 bg-white/10 backdrop-blur-md rounded-lg shadow-lg border border-white/15">
      <nav className="flex space-x-10 relative">
        {menuItems.slice(0, -1).map((item, index) => (
          <div
            key={index}
            className="relative group flex flex-col items-center"
            onMouseEnter={() => setActiveDropdown(item.title)}
            onMouseLeave={() => setActiveDropdown(null)}
          >
            <button className="text-lg font-semibold hover:text-green-400 transition">
              {item.title}
            </button>

            <AnimatePresence>
              {activeDropdown === item.title && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="absolute left-1/8 mt-2 w-40 rounded-2xl shadow-xl p-5"
                >
                  {item.links.map((link, idx) => (
                    <Link
                      key={idx}
                      href={link.path}
                      className="block px-4 py-2 bg-transparent hover:bg-white/20 rounded-lg transition-all duration-200 ease-in-out text-center w-full"
                    >
                      {link.name}
                    </Link>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}

        {/* Account Dropdown */}
        <div
          className="relative group ml-auto flex flex-col items-center"
          onMouseEnter={() => setActiveDropdown("Account")}
          onMouseLeave={() => setActiveDropdown(null)}
        >
          <button className="text-lg font-semibold hover:text-green-400 transition">
            Account
          </button>

          <AnimatePresence>
            {activeDropdown === "Account" && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="absolute left-1/8 mt-2 w-40 rounded-2xl shadow-xl p-5"
              >
                {menuItems.find(item => item.title === "Account").links.map((link, idx) => (
                  <Link
                    key={idx}
                    href={link.path}
                    className="block px-4 py-2 bg-transparent hover:bg-white/20 rounded-lg transition-all duration-200 ease-in-out text-center w-full"
                  >
                    {link.name}
                  </Link>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </nav>
    </header>
  );
}
