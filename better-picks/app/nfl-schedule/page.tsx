// I used chat gpt to help generate the page based on the backend route and changed it according to certain specfications:
// https://chatgpt.com/share/68030ca6-ca1c-800f-bed1-19bf6cd02b0a 
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import Dashboard from "../components/Dashboard";

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


export default function NFLPage() {
  const [games, setGames] = useState<NFLGame[]>([]);
  const [week, setWeek] = useState<number>(1);
  const [loading, setLoading] = useState(true);

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
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-purple-800 text-white p-10 space-y-8 font-sans">

      <Dashboard>
      </Dashboard>


      <div className="text-center">
          <h2 className="text-4xl sm:text-5xl font-extrabold text-white text-center drop-shadow-xl tracking-wide font-['Rajdhani']">
  NFL Schedule
</h2>
            <div className="w-110 mx-auto h-1 bg-purple-500 mt-8 rounded-full"></div>
          </div>

      {/* Main Content */}
      <main className="flex-1 items-center w-full max-w-8xl">
      <div className="w-full max-w-8xl mt-8 bg-white/5 shadow-xl rounded-xl px-8 py-10 sm:px-12 sm:py-14 space-y-8 relative border border-white/20">
         

                    <div className="flex justify-center mb-8">
            <div className="flex flex-col items-center gap-2">
                <label htmlFor="week" className="text-white font-medium">
                Select Week:
                </label>
                <select
                id="week"
                value={week}
                onChange={(e) => setWeek(parseInt(e.target.value))}
                className="bg-gray-700 text-white px-8 py-4 rounded-md"
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
        <Link href={`/nfl-game/${game.GAME_ID}`} key={game.GAME_ID}>
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
        <span className="text-white-500 text-xl">vs</span>

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
      </Link>
    );
  })}
</div>
          )}
        </div>
      </main>
    </div>
  );
}
