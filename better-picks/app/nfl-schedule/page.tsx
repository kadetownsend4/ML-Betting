"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

interface NFLGame {
  GAME_ID: number;
  WEEK: number;
  HOME_TEAM: string;
  AWAY_TEAM: string;
  HOME_SCORE: number;
  AWAY_SCORE: number;
  HOME_TEAM_NAME: string;
  AWAY_TEAM_NAME: string;
  HOME_TEAM_LOGO: string;
  AWAY_TEAM_LOGO: string;
}

const menuItems = [
  {
    title: "NBA",
    links: [
      { name: "Latest Games", path: "/latest-games" },
      { name: "Predictions", path: "/nba-predictions" },
      { name: "Team Stats", path: "/team-stats" },
      { name: "Player Prop Analysis", path: "/player-analysis" },
    ],
  },
  {
    title: "NFL",
    links: [
      { name: "NFL Teams", path: "/nfl-teams" },
      { name: "NFL Schedule", path: "/nfl-schedule" },
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

export default function NFLPage() {
  const [games, setGames] = useState<NFLGame[]>([]);
  const [week, setWeek] = useState<number>(1);
  const [loading, setLoading] = useState(true);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null); // Fixed here

  const fetchGames = async (selectedWeek: number) => {
    try {
      setLoading(true);
      const res = await fetch(
        `https://betterpicks-demo.onrender.com/nfl_games?week=${selectedWeek}`,
        {
          method: "GET",
          credentials: "include",
        }
      );
      const data = await res.json();
      setGames(data);
    } catch (err) {
      console.error("Failed to fetch games:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGames(week);
  }, [week]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-green-500 text-white p-10 flex flex-col items-center font-sans">

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


      {/* Main Content */}
      <main className="flex-1 p-6 sm:p-12">
      <div className="w-full max-w-6xl mt-20 bg-white/5 shadow-xl rounded-xl px-8 py-10 sm:px-12 sm:py-14 space-y-8 relative z-50 border border-white/20">
          <div className="text-center mb-8">
          <h2 className="text-4xl sm:text-5xl font-extrabold text-white text-center drop-shadow-xl mb-8 tracking-wide font-['Rajdhani']">
  NFL Schedule by Week
</h2>
            <div className="w-110 mx-auto h-1 bg-green-500 rounded-full"></div>
          </div>

                    <div className="flex justify-center mb-8">
            <div className="flex flex-col items-center gap-2">
                <label htmlFor="week" className="text-white font-medium">
                Select Week:
                </label>
                <select
                id="week"
                value={week}
                onChange={(e) => setWeek(parseInt(e.target.value))}
                className="bg-gray-700 text-white px-4 py-2 rounded-md"
                >
                {Array.from({ length: 22 }, (_, i) => i + 1).map((w) => (
                    <option key={w} value={w}>
                    Week {w}
                    </option>
                ))}
                </select>
            </div>
            </div>

          {loading ? (
            <p className="text-center text-gray-400">Loading games...</p>
          ) : games.length === 0 ? (
            <p className="text-center text-gray-400">No games found for Week {week}</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               {games.map((game) => {
    const awayIsWinner = game.AWAY_SCORE > game.HOME_SCORE;
    const homeIsWinner = game.HOME_SCORE > game.AWAY_SCORE;

    return (
        <div
        key={game.GAME_ID}
        className="bg-gray-700 rounded-lg p-4 shadow-md flex items-center justify-between"
      >
        {/* Away Team */}
        <div className="flex flex-col items-center gap-2 w-1/3">
          <img
            src={game.AWAY_TEAM_LOGO}
            alt={game.AWAY_TEAM_NAME}
            className="h-10 w-10"
          />
          <span className="text-center text-white font-semibold text-sm break-words">
            {game.AWAY_TEAM_NAME}
          </span>
          <span
            className={`text-lg font-bold ${
              awayIsWinner ? 'text-green-400' : 'text-white'
            }`}
          >
            {game.AWAY_SCORE ?? '-'}
          </span>
        </div>

        {/* Separator */}
        <span className="text-gray-500 text-sm">vs</span>

        {/* Home Team */}
        <div className="flex flex-col items-center gap-2 w-1/3">
          <img
            src={game.HOME_TEAM_LOGO}
            alt={game.HOME_TEAM_NAME}
            className="h-10 w-10"
          />
          <span className="text-center text-white font-semibold text-sm break-words">
            {game.HOME_TEAM_NAME}
          </span>
          <span
            className={`text-lg font-bold ${
              homeIsWinner ? 'text-green-400' : 'text-white'
            }`}
          >
            {game.HOME_SCORE ?? '-'}
          </span>
        </div>
      </div>
    );
  })}
</div>
          )}
        </div>
      </main>
    </div>
  );
}
