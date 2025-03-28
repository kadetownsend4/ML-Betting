"use client"; // Make sure this file is treated as a client component

import { FaBasketballBall } from "react-icons/fa";
import { useParams } from "next/navigation";

// Placeholder data for players
const playerData: Record<string, { points: number; assists: number; rebounds: number; overUnder: string }> = {
  "LeBron James": { points: 27, assists: 8, rebounds: 7, overUnder: "Over" },
  "Stephen Curry": { points: 30, assists: 6, rebounds: 5, overUnder: "Under" },
  "Giannis Antetokounmpo": { points: 29, assists: 5, rebounds: 11, overUnder: "Over" },
  "Luka Dončić": { points: 32, assists: 9, rebounds: 8, overUnder: "Under" },
  "Kevin Durant": { points: 28, assists: 7, rebounds: 6, overUnder: "Over" },
  "Jayson Tatum": { points: 26, assists: 4, rebounds: 8, overUnder: "Under" },
};

export default function PlayerPage() {
  const { playerName } = useParams(); // Using useParams() to get dynamic parameter

  // Get the player data, default to an empty object if the player doesn't exist
  const playerStats = playerData[playerName] || null;

  if (!playerStats) {
    return (
      <div className="min-h-screen flex justify-center items-center text-white p-10">
        <h2>Player not found!</h2>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white p-10 flex flex-col items-center font-['Orbitron']">
      <header className="flex justify-between items-center w-full max-w-5xl py-5 px-10 bg-white/10 backdrop-blur-lg rounded-xl shadow-lg">
        <h1 className="text-4xl tracking-wide uppercase text-green-400 flex items-center gap-2 font-['Rajdhani']">
          <FaBasketballBall className="text-green-400" /> {playerName}: NBA Player Prop Analysis
        </h1>
      </header>

      <div className="w-full max-w-6xl mt-10 bg-white/10 backdrop-blur-lg shadow-lg rounded-xl p-6">
        <div className="flex flex-col items-center">
          {/* Player Image (optional) */}
          <img
            src="/path-to-image.jpg"
            alt={playerName}
            className="w-48 h-48 rounded-full object-cover mb-6"
          />
          {/* Player Stats */}
          <h2 className="text-4xl font-bold text-green-400 text-center sm:text-left mb-6">{playerName}</h2>
          <p className="text-lg text-gray-300">Team: {playerName === "LeBron James" ? "Los Angeles Lakers" : "Other Team"}</p>

          {/* Player Prop Analysis */}
          <div className="bg-gray-800 p-6 rounded-lg shadow-md text-center mt-6">
            <h3 className="text-xl font-bold text-green-400">Performance Props</h3>
            <p className="text-gray-300">Points Prop: {playerStats.points}</p>
            <p className="text-gray-300">Assists Prop: {playerStats.assists}</p>
            <p className="text-gray-300">Rebounds Prop: {playerStats.rebounds}</p>

            {/* Over/Under Prediction */}
            <p className="text-gray-300 mt-4">Over/Under Prediction: {playerStats.overUnder}</p>
          </div>
        </div>
      </div>

      <footer className="mt-auto py-6 text-gray-400">
        <p>&copy; 2025 NBA Stats. All rights reserved.</p>
      </footer>
    </div>
  );
}
