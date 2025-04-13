"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import axios from "axios";


type Game = {
  GAME_ID: number;
  DATE: string;
  HOME_TEAM: string;
  AWAY_TEAM: string;
  CITY: string;
};

export default function TeamHistoryPage() {
  const { team } = useParams();
  const [games, setGames] = useState<Game[]>([]);

  useEffect(() => {
    if (team) {
      axios
      
        .get(`https://betterpicks-demo.onrender.com/NBAMatchups/Celtics`)
        .then((response) => setGames(response.data))
        .catch((error) => console.error("Error fetching team matchup history:", error));
    }
  }, [team]);
  

  return (
<div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-purple-900 text-white p-8 font-sans">
<h1 className="text-4xl font-extrabold tracking-wide mb-6">
  {team?.toString().replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase())} Match History
</h1>      <ul className="space-y-4">
        {games.map((game) => (
          <li
  key={game.GAME_ID}
  className="bg-gray-800 p-4 rounded-xl shadow-md border border-white/10 hover:shadow-purple-500/20 transition-all duration-300"
>
            <p className="text-lg font-bold">{game.AWAY_TEAM} @ {game.HOME_TEAM}</p>
            <p className="text-sm text-gray-400">Date: {game.DATE} | Location: {game.CITY}</p>
          </li>
        ))}
      </ul>
      <div className="mt-6">
        <Link href="/" className="text-green-400 underline">← Back to Home</Link>
      </div>
    </div>
  );
}
