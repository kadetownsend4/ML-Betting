"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import axios from "axios";
import PostList from "../components/PostList";
import Dashboard from "../components/Dashboard";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

const menuItems = [
  {
    title: "NBA",
    links: [
      { name: "Latest Games", path: "/latest-games" },
      { name: "Team Stats", path: "/team-stats" },
      { name: "Player Prop Analysis", path: "/player-analysis" },
    ],
  },
  {
    title: "NFL",
    links: [
      { name: "Game Predictions", path: "/nfl-teams" },
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

const divisions = ["Atlantic", "Central", "Southeast", "Northwest", "Pacific", "Southwest"];
const conferences = ["Eastern", "Western"];

type Team = {
  TEAM_ID: number;
  TEAM_NAME: string;
  TEAM_ABR: string;
  TEAM_NICKNAME: string;
  TEAM_CITY: string;
  TEAM_STATE: string;
  TEAM_YEAR_FOUNDED: number;
};


function NBATeams() {
  const [teams, setTeams] = useState<Team[]>([]);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  useEffect(() => {
    axios
      .get("https://betterpicks-demo.onrender.com/NBATeams")
      .then((response) => setTeams(response.data))
      .catch((error) => console.error("Error fetching NBA teams:", error));
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-purple-800 text-white p-10 flex flex-col items-center font-sans">
      <header className="flex justify-between items-center w-full py-4 px-8 bg-white/10 backdrop-blur-md rounded-lg shadow-lg border border-white/15">
        <h1 className="text-4xl font-extrabold text-white drop-shadow-2xl border-b-4 border-purple-400">
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

      <div className="w-full max-w-6xl mt-20 bg-white/5 shadow-xl rounded-xl px-8 py-10 sm:px-12 sm:py-14 space-y-8 relative z-50 border border-white/20">
        <h2 className="text-4xl sm:text-5xl font-extrabold text-white text-center drop-shadow-xl mb-8 tracking-wide font-['Rajdhani']">
          NBA Teams by Division
        </h2>

        <div className="w-full max-w-6xl mt-20 bg-white/5 shadow-xl rounded-xl px-8 py-10 sm:px-12 sm:py-14 space-y-8 relative z-50 border border-white/20">
  <h2 className="text-4xl sm:text-5xl font-extrabold text-white text-center drop-shadow-xl mb-8 tracking-wide font-['Rajdhani']">
    NBA Teams
  </h2>

  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
  {teams.map((team) => (
  <Link
    key={team.TEAM_ID} // use a unique and stable ID
    href={`/team-history/${team.TEAM_NICKNAME.toLowerCase().replace(/\s+/g, "-")}`}
  >
    <div className="bg-gray-900 p-5 rounded-2xl shadow-xl border border-white/10 flex flex-col items-center justify-center transition-all duration-300 hover:shadow-2xl hover:scale-105 hover:bg-gray-800 cursor-pointer">
      <h2 className="text-xl font-bold text-white text-center tracking-wide mb-2">
        {team.TEAM_NAME}
      </h2>
      <p className="text-sm text-gray-300">{team.TEAM_CITY}, {team.TEAM_STATE}</p>
      <p className="text-sm text-gray-400 italic">Nickname: {team.TEAM_NICKNAME}</p>
      <p className="text-sm text-gray-500">Founded: {team.TEAM_YEAR_FOUNDED}</p>
    </div>
  </Link>
))}
  </div>
</div>

      </div>

      <div className="mt-20 sm:mt-28">
        <h2 className="text-4xl font-bold text-green-400 text-center sm:text-left mb-6">
          Latest NBA Posts
        </h2>
        <PostList />
      </div>

      <footer className="mt-10 py-6 text-gray-400 text-sm">
        <div className="flex justify-center gap-6 mb-4">
          <a href="/privacy-policy" className="hover:text-green-400 transition-colors">
            Privacy Policy
          </a>
          <a href="/terms" className="hover:text-green-400 transition-colors">
            Terms of Service
          </a>
        </div>
        <p>
          <span className="text-red-400 uppercase">Disclaimer:</span> Please gamble responsibly. If you have a gambling problem, seek help from a professional organization such as {" "}
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
}

export default NBATeams;
