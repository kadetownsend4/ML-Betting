"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

// Sample team stats data (replace with actual API data)
async function fetchTeamStats() {
  return [
    { team: "Boston Celtics", points: 115.2, assists: 25.8, blocks: 5.4, steals: 7.2, freeThrows: 78.2, attempts: 88.5, made: 45.9, defEff: 108.5, offEff: 112.4, rebounds: 45.3, record: "45-20" },
    { team: "Miami Heat", points: 110.5, assists: 24.2, blocks: 4.8, steals: 6.9, freeThrows: 80.1, attempts: 85.4, made: 42.7, defEff: 106.2, offEff: 110.1, rebounds: 42.1, record: "40-25" },
    { team: "Los Angeles Lakers", points: 113.7, assists: 26.5, blocks: 5.1, steals: 7.0, freeThrows: 79.3, attempts: 90.2, made: 46.2, defEff: 109.8, offEff: 111.5, rebounds: 44.5, record: "38-27" },
    { team: "Golden State Warriors", points: 117.1, assists: 28.3, blocks: 4.9, steals: 7.8, freeThrows: 81.0, attempts: 92.1, made: 47.3, defEff: 107.5, offEff: 113.2, rebounds: 46.1, record: "42-23" },
    { team: "Milwaukee Bucks", points: 118.5, assists: 25.0, blocks: 5.6, steals: 6.5, freeThrows: 76.4, attempts: 89.8, made: 46.8, defEff: 110.0, offEff: 114.0, rebounds: 47.2, record: "48-17" },
    // Add more teams...
  ];
}

export default function TeamStats() {
  const [stats, setStats] = useState([]);

  useEffect(() => {
    async function loadStats() {
      const data = await fetchTeamStats();
      setStats(data);
    }
    loadStats();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white p-10 flex flex-col items-center font-['Orbitron']">
      {/* Header with Navigation */}
      <header className="flex justify-between items-center w-full max-w-6xl py-5 px-10 bg-white/10 backdrop-blur-lg rounded-xl shadow-lg">
        <h1 className="text-4xl tracking-wide uppercase text-green-400 font-['Rajdhani']">
          NBA Team Stats
        </h1>
        <nav className="flex gap-8 text-lg">
          <Link href="/" className="hover:text-green-400 transition-colors">Home</Link>
          <Link href="/nba/games" className="hover:text-green-400 transition-colors">Latest Games</Link>
          <Link href="/nba/stats" className="hover:text-green-400 transition-colors">Team Stats</Link>
          <Link href="/nba/player-analysis" className="hover:text-green-400 transition-colors">Player Analysis</Link>
        </nav>
      </header>

      {/* Scrollable Table Section */}
      <div className="w-full max-w-6xl mt-10 bg-white/10 backdrop-blur-lg shadow-lg rounded-xl p-6">
        <h2 className="text-4xl font-bold text-green-400 text-center sm:text-left mb-4">Team Statistics</h2>
        <div className="overflow-y-auto max-h-[500px] rounded-lg p-2">
          <table className="w-full border-collapse border border-gray-700 text-lg">
            <thead className="sticky top-0 bg-gray-800 text-green-400">
              <tr>
                <th className="border border-gray-700 px-4 py-3 text-left">Team</th>
                <th className="border border-gray-700 px-4 py-3">PTS</th>
                <th className="border border-gray-700 px-4 py-3">AST</th>
                <th className="border border-gray-700 px-4 py-3">BLK</th>
                <th className="border border-gray-700 px-4 py-3">STL</th>
                <th className="border border-gray-700 px-4 py-3">FT%</th>
                <th className="border border-gray-700 px-4 py-3">FGA</th>
                <th className="border border-gray-700 px-4 py-3">FGM</th>
                <th className="border border-gray-700 px-4 py-3">Def Eff</th>
                <th className="border border-gray-700 px-4 py-3">Off Eff</th>
                <th className="border border-gray-700 px-4 py-3">REB</th>
                <th className="border border-gray-700 px-4 py-3">Record</th>
              </tr>
            </thead>
            <tbody>
              {stats.map((team, index) => (
                <tr key={index} className="border border-gray-700">
                  <td className="border border-gray-700 px-4 py-3">{team.team}</td>
                  <td className="border border-gray-700 px-4 py-3 text-center">{team.points}</td>
                  <td className="border border-gray-700 px-4 py-3 text-center">{team.assists}</td>
                  <td className="border border-gray-700 px-4 py-3 text-center">{team.blocks}</td>
                  <td className="border border-gray-700 px-4 py-3 text-center">{team.steals}</td>
                  <td className="border border-gray-700 px-4 py-3 text-center">{team.freeThrows}%</td>
                  <td className="border border-gray-700 px-4 py-3 text-center">{team.attempts}</td>
                  <td className="border border-gray-700 px-4 py-3 text-center">{team.made}</td>
                  <td className="border border-gray-700 px-4 py-3 text-center">{team.defEff}</td>
                  <td className="border border-gray-700 px-4 py-3 text-center">{team.offEff}</td>
                  <td className="border border-gray-700 px-4 py-3 text-center">{team.rebounds}</td>
                  <td className="border border-gray-700 px-4 py-3 text-center">{team.record}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Home Button */}
      <div className="mt-6">
        <Link href="/">
          <button className="bg-green-500 text-white px-6 py-3 rounded-xl text-lg font-semibold hover:bg-green-600 transition">
            Back to Home
          </button>
        </Link>
      </div>
    </div>
  );
}
