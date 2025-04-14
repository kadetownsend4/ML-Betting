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
      { name: "Latest Games", path: "/latest-games" },
      { name: "Team Stats", path: "/team-stats" },
      { name: "Player Prop Analysis", path: "/nba-player-analysis" },
    ],
  },
  {
    title: "NFL",
    links: [
      { name: "NFL Teams", path: "/nfl-teams" },
      { name: "Team Based Player Props", path: "/team-player-props" },
      { name: "Player Prop Analysis", path: "/nfl-player-analysis" },
      { name: "Betting Insights", path: "/nfl/betting-insights" },
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

const Dashboard = ({ children }: DashboardLayoutProps) => {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-purple-800 text-white p-10 flex flex-col items-center font-sans">
      {/* Header */}
      <header className="flex justify-between items-center w-full py-4 px-8 bg-white/10 backdrop-blur-md rounded-lg shadow-lg border border-white/15">
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
                    className="absolute left-1/8 mt-2 w-40 bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl shadow-xl p-3 z-50"
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

      {/* Main Content */}
      <main className="w-full max-w-6xl mt-20 relative z-50">{children}</main>

      {/* Footer */}
      <footer className="mt-20 py-6 text-gray-400 text-sm text-center">
        <div className="flex justify-center gap-6 mb-4">
          <a href="/privacy-policy" className="hover:text-green-400 transition-colors">
            Privacy Policy
          </a>
          <a href="/terms" className="hover:text-green-400 transition-colors">
            Terms of Service
          </a>
        </div>
        <p>
          <span className="text-red-400 uppercase">Disclaimer:</span> Please gamble responsibly. If you have a gambling problem, seek help from a professional organization such as{" "}
          <a
            href="https://www.ncpgambling.org/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-green-400 font-bold underline hover:text-green-300 transition-colors duration-200"
          >
            National Council on Problem Gambling
          </a>.
        </p>
      </footer>
    </div>
  );
};

export default Dashboard;
