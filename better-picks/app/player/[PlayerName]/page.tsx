"use client";

import { useParams } from "next/navigation";
import { FaBasketballBall } from "react-icons/fa";

// Player data object
const playerData: Record<string, { team: string; points: number; assists: number; rebounds: number; overUnder: string; imageUrl: string }> = {
  "lebron-james": { 
    team: "Los Angeles Lakers", 
    points: 27, 
    assists: 8, 
    rebounds: 7, 
    overUnder: "Over", 
    imageUrl: "/path-to-lebron-image.jpg" 
  },
  "stephen-curry": { 
    team: "Golden State Warriors", 
    points: 30, 
    assists: 6, 
    rebounds: 5, 
    overUnder: "Under", 
    imageUrl: "/path-to-curry-image.jpg" 
  },
  "giannis-antetokounmpo": { 
    team: "Milwaukee Bucks", 
    points: 29, 
    assists: 5, 
    rebounds: 11, 
    overUnder: "Over", 
    imageUrl: "/path-to-giannis-image.jpg" 
  }
  // Add more players here...
};

export default function PlayerPage() {
  const { playerName } = useParams(); // Get the player name from the URL

  // Normalize playerName to match keys in `playerData` (convert spaces to hyphens and lowercase)
  // Normalize playerName to match keys in `playerData` (convert spaces to hyphens and lowercase)
const normalizedPlayerName = Array.isArray(playerName) ? playerName[0] : playerName;
const formattedPlayerName = normalizedPlayerName?.toLowerCase().replace(/\s+/g, "-") || "";
const playerStats = playerData[formattedPlayerName];


  // Show "Player not found" if the player isn't in our data
  if (!playerStats) {
    return (
      <div className="min-h-screen flex justify-center items-center text-white p-10">
        <h2>Player not found!</h2>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white p-10 flex flex-col items-center">
      <header className="flex justify-between items-center w-full max-w-5xl py-5 px-10 bg-white/10 backdrop-blur-lg rounded-xl shadow-lg">
      <h1 className="text-4xl tracking-wide uppercase text-green-400 flex items-center gap-2">
  <FaBasketballBall className="text-green-400" /> {playerStats.team} - {formattedPlayerName.replace("-", " ")}
</h1>

      </header>

      <div className="w-full max-w-6xl mt-10 bg-white/10 backdrop-blur-lg shadow-lg rounded-xl p-6">
        <div className="flex flex-col items-center">
        <img src={playerStats.imageUrl} alt={typeof playerName === 'string' ? playerName : ''} className="w-48 h-48 rounded-full object-cover mb-6" />
        <h2 className="text-4xl font-bold text-green-400 text-center">{formattedPlayerName.replace("-", " ")}</h2>
          <p className="text-lg text-gray-300">Team: {playerStats.team}</p>

          <div className="bg-gray-800 p-6 rounded-lg shadow-md text-center mt-6">
            <h3 className="text-xl font-bold text-green-400">Performance Props</h3>
            <p className="text-gray-300">Points: {playerStats.points}</p>
            <p className="text-gray-300">Assists: {playerStats.assists}</p>
            <p className="text-gray-300">Rebounds: {playerStats.rebounds}</p>
            <p className="text-gray-300 mt-4">Over/Under Prediction: {playerStats.overUnder}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
