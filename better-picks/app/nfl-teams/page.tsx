"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { FaFootballBall } from "react-icons/fa";
import axios from "axios";
import PostList from "../components/PostList";
import Dashboard from "../components/Dashboard";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";



type Team = {
  TEAM_NAME: string;
  TEAM_CONF: string;
  TEAM_DIVISION: string;
  TEAM_LOGO: string;
  TEAM_WORDMARK: string;
};

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


const divisions = ["East", "North", "South", "West"];
const conferences = ["AFC", "NFC"];

function NFLTeams() {
  const [teams, setTeams] = useState<Team[]>([]);
  const [activeDropdown, setActiveDropdown] =useState<string | null>(null);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);


  useEffect(() => {
    axios
      .get("https://betterpicks-demo.onrender.com/fetch_teams")
      .then((response) => {
        console.log("Fetched Teams Data:", response.data); // Debugging log
        setTeams(response.data);
      })
      .catch((error) => console.error("Error fetching teams:", error));
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-green-500 text-white p-10 flex flex-col items-center font-sans">
      

      <div className="flex gap-4 justify-center mt-6">
  <button
    onClick={() => setSelectedOption('AFC')}
    className="bg-red-600 text-white py-2 px-4 rounded-lg shadow-lg transition duration-300 hover:bg-red-700"
  >
    AFC
  </button>
  <button
    onClick={() => setSelectedOption('NFC')}
    className="bg-blue-600 text-white py-2 px-4 rounded-lg shadow-lg transition duration-300 hover:bg-blue-700"
  >
    NFC
  </button>
</div>

{/* For AFC and NFC Divisions */}
{selectedOption === "AFC" || selectedOption === "NFC" ? (
  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-6 text-center">
    {divisions.map((div) => (
      <button
        key={div}
        onClick={() => setSelectedOption(`${selectedOption} ${div}`)}
        className="bg-gray-700 text-white py-2 px-4 rounded-lg shadow-lg transition duration-300 hover:bg-gray-800"
      >
        {selectedOption} {div}
      </button>
    ))}
  </div>
) : null}

<div className="mt-8">
  {selectedOption && selectedOption !== 'AFC' && selectedOption !== 'NFC' && (
    <div>
      <h3 className="text-3xl text-center text-green-400">
        Teams in {selectedOption}
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-6">
        {teams
          .filter(
            (team) =>
              team.TEAM_CONF === selectedOption.split(' ')[0] &&
              team.TEAM_DIVISION === selectedOption.split(' ')[1]
          )
          .map((team, index) => (
            <div
              key={index}
              className="bg-gray-800 p-6 rounded-lg shadow-lg flex flex-col items-center"
            >
              <h4 className="text-xl font-semibold text-green-400 text-center">{team.TEAM_NAME}</h4>
              <div className="relative w-[140px] h-[120px] mb-2 mt-4">
                <Image
                  src={team.TEAM_LOGO}
                  alt={`${team.TEAM_NAME} Logo`}
                  layout="fill"
                  objectFit="contain"
                  className="rounded-lg"
                  unoptimized
                />
              </div>
            </div>
          ))}
      </div>
    </div>
  )}
</div>


      {/* Header Section */}
  <header className="flex justify-between items-center w-full py-4 px-8 bg-white/10 backdrop-blur-md rounded-lg shadow-lg border border-white/15">
  <h1 className="text-4xl font-extrabold text-white drop-shadow-2xl border-b-4 border-green-400">
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
        <button className="text-xl font-bold hover:text-green-400 transition">
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
              onMouseEnter={() => setActiveDropdown(item.title)}
              onMouseLeave={() => setActiveDropdown(null)}
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


      {/* Teams Section */}
      <div className="w-full max-w-6xl mt-20 bg-white/5 backdrop-blur-lg shadow-xl rounded-xl px-8 py-10 sm:px-12 sm:py-14 space-y-8 relative z-50 border border-white/20">
      <h2 className="text-4xl sm:text-5xl font-extrabold text-white text-center drop-shadow-xl mb-8 tracking-wide font-['Rajdhani']">
  NFL Teams by Division
</h2>

        {conferences.map((conf) => (
          <div key={conf} className="mb-8">
            <motion.h3
  className={`text-3xl font-bold text-center my-4 ${conf === "AFC" ? "text-red-500" : "text-blue-400"}`}
  initial={{ opacity: 0, y: -20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5, ease: "easeOut" }}
>
  {conf} Conference
</motion.h3>



            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {divisions.map((div) => {
                const filteredTeams = teams.filter(
                  (team) =>
                    team.TEAM_CONF?.toLowerCase().includes(conf.toLowerCase()) &&
                    team.TEAM_DIVISION?.toLowerCase().includes(div.toLowerCase())
                );

                return (
                  <div key={div} className="bg-white/10 backdrop-blur-lg p-6 rounded-2xl shadow-2xl border border-white/10">
                    <h4 className="text-2xl font-semibold text-white text-center tracking-wide">
                      {conf} {div}
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-6 mt-4 justify-center">
                      {filteredTeams.map((team, index) => (
                       <div
                       key={index}
                       className="bg-gray-900 p-5 rounded-2xl shadow-xl border border-white/10 flex flex-col items-center justify-center transition-all duration-300 hover:shadow-2xl hover:scale-105 hover:bg-gray-800"
                     >
 <h2 className="text-xl font-bold text-white text-center tracking-wide mb-2">
    {team.TEAM_NAME}
  </h2>
                          <div className="mt-2 flex flex-col items-center gap-3">
                            {/* Team Logo */}
                            <div className="relative w-[140px] h-[120px]">
                              <Image
                                src={team.TEAM_LOGO}
                                alt={`${team.TEAM_NAME} Logo`}
                                layout="fill"
                                objectFit="contain"
                                className="rounded-md"
                                unoptimized
                              />
                            </div>

                            {/* Team Wordmark */}
                            <div className="relative w-[150px] h-[35px]">
                              <Image
                                src={team.TEAM_WORDMARK}
                                alt={`${team.TEAM_NAME} Wordmark`}
                                layout="fill"
                                objectFit="contain"
                                className="rounded-md"
                                unoptimized
                              />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Posts Section */}
      <div className="mt-20 sm:mt-28">
      <h2 className="text-4xl font-bold text-green-400 text-center sm:text-left mb-6">
          Latest NFL Posts
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
}

export default NFLTeams;
