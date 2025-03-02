"use client";
import { useState } from "react";

export default function TeamStats() {
  const [teams] = useState([
    { name: "Boston Celtics", wins: 42, losses: 15, ppg: 117.2 },
    { name: "Los Angeles Lakers", wins: 35, losses: 22, ppg: 113.5 },
    { name: "Golden State Warriors", wins: 30, losses: 27, ppg: 114.8 },
    { name: "Milwaukee Bucks", wins: 40, losses: 18, ppg: 118.3 },
  ]);

  return (
    <div className="min-h-screen bg-black text-white p-8 sm:p-20 flex flex-col justify-between">
      {/* Header */}
      <header className="flex justify-between items-center w-full py-4 px-8 bg-white/10 backdrop-blur-md rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold text-green-400 font-mono">NBA Team Stats</h1>
        <nav className="flex gap-6">
          <a href="/nba/games" className="hover:text-green-400 transition-colors">Latest Games</a>
          <a href="/nba/stats" className="hover:text-green-400 transition-colors">Team Stats</a>
          <a href="/nba/player-analysis" className="hover:text-green-400 transition-colors">Player Analysis</a>
        </nav>
      </header>

      {/* Main Content */}
      <main className="mt-10">
        <h2 className="text-3xl font-extrabold text-green-400 text-center sm:text-left">Team Stats</h2>
        <table className="w-full mt-6 border-collapse border border-gray-600">
          <thead>
            <tr className="bg-gray-800 text-green-400">
              <th className="border border-gray-600 px-4 py-2 text-left">Team</th>
              <th className="border border-gray-600 px-4 py-2">Wins</th>
              <th className="border border-gray-600 px-4 py-2">Losses</th>
              <th className="border border-gray-600 px-4 py-2">PPG</th>
            </tr>
          </thead>
          <tbody>
            {teams.map((team, index) => (
              <tr key={index} className="border border-gray-600">
                <td className="border border-gray-600 px-4 py-2">{team.name}</td>
                <td className="border border-gray-600 px-4 py-2 text-center">{team.wins}</td>
                <td className="border border-gray-600 px-4 py-2 text-center">{team.losses}</td>
                <td className="border border-gray-600 px-4 py-2 text-center">{team.ppg}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>

      {/* Footer */}
      <footer className="flex gap-6 flex-wrap items-center justify-center text-gray-300 text-sm mt-auto py-4">
        <a className="hover:text-green-400 transition-colors" href="/features">Features</a>
        <a className="hover:text-green-400 transition-colors" href="/pricing">Pricing</a>
        <a className="hover:text-green-400 transition-colors" href="/contact">Contact Us</a>
      </footer>
    </div>
  );
}
