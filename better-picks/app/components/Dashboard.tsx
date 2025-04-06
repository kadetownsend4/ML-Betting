"use client";
import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

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
    <div className="relative z-50">
      <header className="z-50 flex justify-between items-center w-full py-4 px-8 bg-gray-800 backdrop-blur-md rounded-lg shadow-lg border border-white/15">
        <h1 className="text-4xl font-extrabold text-green shadow-none border-b-4 border-green-400">
          Better Picks
        </h1>
        <nav className="flex space-x-10 relative">
          {menuItems.map((item, index) => (
            <div
              key={index}
              className="relative group flex flex-col items-center"
              onMouseEnter={() => setActiveDropdown(item.title)}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <Link href={item.path || "#"}>
                <button className="text-xl font-bold hover:text-green-400 transition">
                  {item.title}
                </button>
              </Link>

              <AnimatePresence>
                {!item.noDropdown && activeDropdown === item.title && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 10, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="absolute left-0 -translate-x-1/2 mt-8 w-56 bg-black text-green-400 border border-green-500 rounded-xl p-4 shadow-[0_0_10px_rgba(0,255,0,0.3)] hover:shadow-[0_0_20px_rgba(0,255,0,0.5)] transition-all duration-300 z-60"
                  >
                    {item.links?.map((link, idx) => (
                      <Link
                        key={idx}
                        href={link.path}
                        className="block px-4 py-2 text-center rounded-lg hover:bg-green-500 hover:text-black transition-all duration-200"
                      >
                        {link.name}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </nav>
      </header>
    </div>
  );
};

export default Dashboard;
