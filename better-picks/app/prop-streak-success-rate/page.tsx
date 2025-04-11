"use client";
import { FaBasketballBall } from "react-icons/fa";
import Dashboard from "../components/Dashboard";
import Link from "next/link";

const playerData = [
  { name: "LeBron James", team: "Lakers", points: 27, assists: 8, rebounds: 7 },
  { name: "Stephen Curry", team: "Warriors", points: 30, assists: 6, rebounds: 5 },
  { name: "Giannis Antetokounmpo", team: "Bucks", points: 29, assists: 5, rebounds: 11 },
  { name: "Luka Dončić", team: "Lakers", points: 32, assists: 9, rebounds: 8 },
  { name: "Kevin Durant", team: "Suns", points: 28, assists: 7, rebounds: 6 },
  { name: "Jayson Tatum", team: "Celtics", points: 26, assists: 4, rebounds: 8 },
];

export default function PlayerAnalysis() {
  return (
    <Dashboard>
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white p-10 flex flex-col items-center font-['Orbitron']">
        <h1 className="text-4xl font-bold text-green-400 mt-10 mb-6 tracking-wide uppercase font-['Rajdhani']">
          NBA Player Prop Analysis
        </h1>

        <div className="w-full max-w-6xl mt-6 bg-white/10 shadow-lg rounded-xl p-6">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {playerData.map((player, index) => (
              <div key={index} className="bg-gray-800 p-4 rounded-lg text-center shadow-md flex flex-col items-center min-h-[150px] w-full">
                <h3 className="text-xl font-bold text-green-400 break-words leading-tight text-center">{player.name}</h3>
                <p className="text-gray-300">{player.team}</p>
                <Link href={`/player/${encodeURIComponent(player.name.toLowerCase().replace(/\s+/g, "-"))}`}>
                  <button className="mt-auto px-4 py-2 bg-green-500 text-white font-bold rounded-lg hover:bg-green-600">
                    View Props
                  </button>
                </Link>
              </div>
            ))}
          </div>
        </div>

        <footer className="mt-auto py-6 text-gray-400">
          <p>&copy; 2025 NBA Stats. All rights reserved.</p>
        </footer>
      </div>
    </Dashboard>
  );
}
