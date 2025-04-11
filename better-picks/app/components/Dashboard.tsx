"use client";
import { useState, ReactNode } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

type DashboardProps = {
  children: ReactNode;
};

const menuItems = [
  {
    title: "NBA",
    links: [
      { name: "Latest Games", path: "/latest-games" },
      { name: "Team Stats", path: "/team-stats" },
      { name: "Player Prop Analysis", path: "/nba-player-analysis" },
    ],
  },
  {
    title: "NFL",
    links: [
      { name: "Game Predictions", path: "/nfl/predictions" },
      { name: "Team Based Player Props", path: "/team-player-props" },
      { name: "Player Prop Analysis", path: "/nfl-player-analysis" },
    ],
  },
  {
    title: "Performance Analysis",
    links: [
      { name: "Trending Player Props", path: "/trends" },
      { name: "NBA Defense vs Position", path: "/defense-vs-position" },
      { name: "Prop Streak & Success Rate", path: "/prop-streak-success-rate" },
      { name: "AI Insights", path: "/ai-insights" },
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

const Dashboard: React.FC<DashboardProps> = ({ children }) => {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  return (
    <div className="relative z-50">
      <header className="z-50 flex justify-center w-full py-2 px-4">
        <div className="flex items-center w-full max-w-8xl px-8 bg-gray-800 backdrop-blur-md rounded-lg shadow-lg border border-white/15 gap-x-16 justify-between">
          <Link
            href="/"
            className="text-4xl font-extrabold text-green shadow-none border-b-4 border-green-400 hover:text-green-300 transition"
          >
            Better Picks
          </Link>
          <nav className="flex space-x-10 relative">
            {menuItems.map((item, index) => {
              const isActive = activeDropdown === item.title;
              return (
                <div
                  key={index}
                  className="relative flex flex-col items-center"
                  onMouseEnter={() => setActiveDropdown(item.title)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <button className="text-xl font-bold hover:text-green-400 transition">
                    {item.title}
                  </button>
                  {!item.noDropdown && (
                    <AnimatePresence>
                      {isActive && (
                        <motion.div
                          key="dropdown"
                          initial={{ opacity: 0, y: 10, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 10, scale: 0.95 }}
                          transition={{ duration: 0.3, ease: "easeInOut" }}
                          className="absolute top-full mt-2 w-56 bg-gray-800/95 backdrop-blur-md border border-white/20 rounded-3xl shadow-xl p-3 z-50"
                        >
                          {item.links?.map((link, idx) => (
                            <Link
                              key={idx}
                              href={link.path}
                              className="block px-4 py-2 hover:bg-white/20 rounded-lg transition duration-200 text-white text-sm text-center"
                            >
                              {link.name}
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  )}
                </div>
              );
            })}
          </nav>
        </div>
      </header>

      <main className="mt-8 px-8">{children}</main>
    </div>
  );
};

export default Dashboard;
