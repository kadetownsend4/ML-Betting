"use client";
import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

const menuItems = [
  {
    title: "Home",
    path: "/",
    noDropdown: true,
  },
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

const Dashboard: React.FC = () => {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  return (
    <div className="relative min-h-screen bg-cover bg-center" style={{ backgroundImage: "url('/LEBRONN.png')" }}>
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/30 z-0" />

      {/* Content Wrapper */}
      <div className="relative z-10 px-4 sm:px-8 py-6">
        {/* Header */}
        <header className="flex justify-between items-center w-full py-4 px-6 bg-white/10 backdrop-blur-md rounded-lg shadow-lg border border-white/15">
          <h1 className="text-4xl font-extrabold text-white drop-shadow-2xl border-b-4 border-green-400">
            Better Picks
          </h1>

          <nav className="flex space-x-8 relative">
            {menuItems.map((item, index) => (
              <div
                key={index}
                className="relative group flex flex-col items-center"
                onMouseEnter={() => setActiveDropdown(item.title)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                {item.noDropdown ? (
                  <Link
                    href={item.path}
                    className="text-xl font-bold hover:text-green-400 transition"
                  >
                    {item.title}
                  </Link>
                ) : (
                  <>
                    <button className="text-xl font-bold hover:text-green-400 transition">
                      {item.title}
                    </button>

                    {/* Dropdown */}
                    <AnimatePresence>
                      {activeDropdown === item.title && (
                        <motion.div
                          initial={{ opacity: 0, y: 10, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 0.80 }}
                          exit={{ opacity: 0, y: 10, scale: 0.95 }}
                          transition={{ duration: 0.3, ease: "easeInOut" }}
                          className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-48 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl shadow-xl p-3"
                          onMouseEnter={() => setActiveDropdown(item.title)}
                          onMouseLeave={() => setActiveDropdown(null)}
                        >
                          {item.links.map((link, idx) => (
                            <Link
                              key={idx}
                              href={link.path}
                              className="block px-4 py-2 hover:bg-white/20 rounded-lg transition-all duration-200 ease-in-out text-white text-center"
                            >
                              {link.name}
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </>
                )}
              </div>
            ))}
          </nav>
        </header>
      </div>
    </div>
  );
};

export default Dashboard;
