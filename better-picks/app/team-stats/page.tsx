"use client";
import { useState, useEffect } from "react";
import image from "next/image";
import { FaBasketballBall } from "react-icons/fa";

const teamLogos: Record<string, string> = {
  "Boston Celtics": "/logos/celtics.jpg",
  "Miami Heat": "/logos/heat.jpg",
  "Los Angeles Lakers": "/logos/lakers.jpg",
  "Golden State Warriors": "/logos/warriors.jpg",
  "Milwaukee Bucks": "/logos/bucks.jpg",
  "Brooklyn Nets": "/logos/nets.jpg",
  "Philadelphia 76ers": "/logos/76ers.jpg",
  "New York Knicks": "/logos/knicks.jpg",
  "Chicago Bulls": "/logos/bulls.jpg",
  "Phoenix Suns": "/logos/suns.jpg",
  "Dallas Mavericks": "/logos/mavs.jpg",
  "Denver Nuggets": "/logos/nuggets.jpg",
  "Houston Rockets": "/logos/rockets.jpg",
  "Memphis Grizzlies": "/logos/grizzlies.jpg",
  "Atlanta Hawks": "/logos/hawks.jpg",
  "New Orleans Pelicans": "/logos/pelicans.jpg",
  "Indiana Pacers": "/logos/pacers.jpg",
  "Toronto Raptors": "/logos/raptors.jpg",
  "Washington Wizards": "/logos/wizards.jpg",
  "Sacramento Kings": "/logos/kings.jpg",
  "Orlando Magic": "/logos/magic.jpg",
  "Utah Jazz": "/logos/jazz.jpg",
  "Charlotte Hornets": "/logos/hornets.jpg",
  "Detroit Pistons": "/logos/pistons.jpg",
  "Minnesota Timberwolves": "/logos/wolves.jpg",
  "Oklahoma City Thunder": "/logos/thunder.jpg",
  "San Antonio Spurs": "/logos/spurs.jpg",
  "Cleveland Cavaliers": "/logos/cavs.jpg",
  "Portland Trail Blazers": "/logos/blazers.jpg",
};



export default function TeamStats() {
  // Replace with API data
  const [easternTeams] = useState([
    { name: "Boston Celtics", wins: 42, losses: 15, ppg: 117.2 },
    { name: "Milwaukee Bucks", wins: 40, losses: 18, ppg: 118.3 },
  ]);

  const [westernTeams] = useState([
    { name: "Los Angeles Lakers", wins: 35, losses: 22, ppg: 113.5 },
    { name: "Golden State Warriors", wins: 30, losses: 27, ppg: 114.8 },
  ]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white p-10 flex flex-col items-center font-['Orbitron']">
      {/* Header with Navigation */}
      <header className="flex justify-between items-center w-full max-w-5xl py-5 px-10 bg-white/10 backdrop-blur-lg rounded-xl shadow-lg">
        <h1 className="text-4xl tracking-wide uppercase text-green-400 flex items-center gap-2 font-['Rajdhani']">
          <FaBasketballBall className="text-green-400" /> NBA Team Stats
        </h1>
        <nav className="flex gap-8 text-lg">
          <a href="/nba/games" className="hover:text-green-400 transition-colors">Latest Games</a>
          <a href="/nba/stats" className="hover:text-green-400 transition-colors">Team Stats</a>
          <a href="/nba/player-analysis" className="hover:text-green-400 transition-colors">Player Analysis</a>
        </nav>
      </header>

      {/* Team Stats Section */}
      <div className="w-full max-w-5xl mt-10 bg-white/10 backdrop-blur-lg shadow-lg rounded-xl p-6">
        <h2 className="text-4xl font-bold text-green-400 text-center sm:text-left mb-6">NBA Team Stats</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
          {/* Eastern Conference */}
          <div>
            <h3 className="text-3xl font-bold text-blue-400 text-center mb-4">Eastern Conference</h3>
            <table className="w-full border-collapse border border-gray-700 text-lg">
              <thead className="bg-gray-800 text-green-400">
                <tr>
                  <th className="border border-gray-700 px-4 py-2 text-left">Team</th>
                  <th className="border border-gray-700 px-4 py-2">Wins</th>
                  <th className="border border-gray-700 px-4 py-2">Losses</th>
                  <th className="border border-gray-700 px-4 py-2">PPG</th>
                </tr>
              </thead>
              <tbody>
                {easternTeams.map((team, index) => (
                  <tr key={index} className="border border-gray-700">
                    <td className="border border-gray-700 px-4 py-2">{team.name}</td>
                    <td className="border border-gray-700 px-4 py-2 text-center">{team.wins}</td>
                    <td className="border border-gray-700 px-4 py-2 text-center">{team.losses}</td>
                    <td className="border border-gray-700 px-4 py-2 text-center">{team.ppg}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Western Conference */}
          <div>
            <h3 className="text-3xl font-bold text-yellow-400 text-center mb-4">Western Conference</h3>
            <table className="w-full border-collapse border border-gray-700 text-lg">
              <thead className="bg-gray-800 text-green-400">
                <tr>
                  <th className="border border-gray-700 px-4 py-2 text-left">Team</th>
                  <th className="border border-gray-700 px-4 py-2">Wins</th>
                  <th className="border border-gray-700 px-4 py-2">Losses</th>
                  <th className="border border-gray-700 px-4 py-2">PPG</th>
                </tr>
              </thead>
              <tbody>
                {westernTeams.map((team, index) => (
                  <tr key={index} className="border border-gray-700">
                    <td className="border border-gray-700 px-4 py-2">{team.name}</td>
                    <td className="border border-gray-700 px-4 py-2 text-center">{team.wins}</td>
                    <td className="border border-gray-700 px-4 py-2 text-center">{team.losses}</td>
                    <td className="border border-gray-700 px-4 py-2 text-center">{team.ppg}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <footer className="mt-auto py-6 text-gray-400">
        <p>&copy; 2025 NBA Stats. All rights reserved.</p>
      </footer>
    </div>
  );
}

