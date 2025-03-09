"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { FaBasketballBall } from "react-icons/fa";
import Dashboard from "../components/Dashboard";

const playerData = [
  { name: "LeBron James", team: "Lakers", points: 27, assists: 8, rebounds: 7 },
  { name: "Stephen Curry", team: "Warriors", points: 30, assists: 6, rebounds: 5 },
  { name: "Giannis Antetokounmpo", team: "Bucks", points: 29, assists: 5, rebounds: 11 },
  { name: "Luka Dončić", team: "Lakers", points: 32, assists: 9, rebounds: 8 }, // Updated team
  { name: "Kevin Durant", team: "Suns", points: 28, assists: 7, rebounds: 6 },
];

export default function PlayerAnalysis() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white p-10 flex flex-col items-center font-['Orbitron']">
      {/* Header with Navigation */}
      <header className="flex justify-between items-center w-full max-w-5xl py-5 px-10 bg-white/10 backdrop-blur-lg rounded-xl shadow-lg">
        <h1 className="text-4xl tracking-wide uppercase text-green-400 flex items-center gap-2 font-['Rajdhani']">
          <FaBasketballBall className="text-green-400" /> NBA Player Analysis
        </h1>
        <nav className="flex gap-8 text-lg">
        <Dashboard /> {/* Inserted the Dashboard component here */}
        </nav>
      </header>

      {/* Player Props Section */}
      <div className="w-full max-w-5xl mt-10 bg-white/10 backdrop-blur-lg shadow-lg rounded-xl p-6">
        <h2 className="text-4xl font-bold text-green-400 text-center sm:text-left mb-4">Player Performance</h2>
        <div className="overflow-y-auto max-h-[500px] rounded-lg p-2">
          <table className="w-full border-collapse border border-gray-700 text-lg">
            <thead className="sticky top-0 bg-gray-800 text-green-400">
              <tr>
                <th className="border border-gray-700 px-6 py-3 text-left">Player</th>
                <th className="border border-gray-700 px-6 py-3 text-left">Team</th>
                <th className="border border-gray-700 px-6 py-3">Points</th>
                <th className="border border-gray-700 px-6 py-3">Assists</th>
                <th className="border border-gray-700 px-6 py-3">Rebounds</th>
              </tr>
            </thead>
            <tbody>
              {playerData.map((player, index) => (
                <tr key={index} className="border border-gray-700">
                  <td className="border border-gray-700 px-6 py-3">{player.name}</td>
                  <td className="border border-gray-700 px-6 py-3">{player.team}</td>
                  <td className="border border-gray-700 px-6 py-3 text-center">{player.points}</td>
                  <td className="border border-gray-700 px-6 py-3 text-center">{player.assists}</td>
                  <td className="border border-gray-700 px-6 py-3 text-center">{player.rebounds}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <footer className="mt-auto py-6 text-gray-400">
        <p>&copy; 2025 NBA Stats. All rights reserved.</p>
      </footer>
    </div>
  );
}

