// Used the following link to help me generate a starting page for the "Dashboard" component.
// https://chatgpt.com/share/680bbc72-c5a8-8012-ad81-103dff7f2367
// Used the following link to help me with styling Dashboard.
// https://chatgpt.com/share/680be84c-d5dc-8012-a330-c5908441595d
"use client";
import { useState, ReactNode } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

type DashboardLayoutProps = {
  children: ReactNode;
};

const menuItems = [
  {
    title: "NBA",
    links: [
      { name: "NBA Teams", path: "/latest-games" },
      { name: "Game Predictions", path: "/nba-predictions" },
      { name: "Team Stats", path: "/team-stats" },
      { name: "Player Prop Analysis", path: "/nba-player-analysis" },
    ],
  },
  {
    title: "NFL",
    links: [
      { name: "NFL Teams", path: "/nfl-teams" },
      { name: "NFL Schedule", path: "/nfl-schedule" },
      { name: "NFL Season Stats", path: "/nfl-team-stats" },
      { name: "Team Based Player Props", path: "/team-player-props" },
      { name: "Player Prop Analysis", path: "/nfl-player-analysis" },
    ],
  },
  {
    title: "Performance Analysis",
    links: [
      { name: "Trending Player Props", path: "/trends" },
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

const Dashboard = () => {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  return (
    <>
      {/* Header */}
      <header className="relative z-20 flex justify-between items-center w-full py-4 px-8 bg-white/10 backdrop-blur-md rounded-lg shadow-lg border border-white/15">
        <Link href="/" passHref>
          <span className="cursor-pointer text-4xl font-extrabold text-white drop-shadow-2xl border-b-4 border-purple-400 hover:text-purple-300 transition-colors duration-300">
            Better Picks
          </span>
        </Link>
        <nav className="flex space-x-10 relative">
          {menuItems.map((item, index) => (
            <div
              key={index}
              className="relative group flex flex-col items-center"
              onMouseEnter={() => setActiveDropdown(item.title)}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button className="text-xl font-bold hover:text-purple-400 transition">
                {item.title}
              </button>
              <AnimatePresence>
                {activeDropdown === item.title && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 0.80 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="absolute left-1/8 mt-2 w-40 z-50 bg-black/100 backdrop-blur-md border border-white/10 rounded-3xl shadow-xl p-3 z-50"
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
        </nav>
      </header> 
      </>
  );
};

export default Dashboard;
