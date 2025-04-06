"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { FaChartLine } from "react-icons/fa";
import Dashboard from "../components/Dashboard";

const leagues = ["NBA", "NFL", "MLB", "NHL"];

const sampleData: Record<string, { player: string; matchup: string; streak: number; successRate: number; odds: number }[]> = {
  NBA: [
    { player: "LeBron James", matchup: "vs. GSW", streak: 5, successRate: 72, odds: -950 },
    { player: "Stephen Curry", matchup: "vs. LAL", streak: 7, successRate: 85, odds: -900 },
    { player: "Giannis Antetokounmpo", matchup: "vs. ATL", streak: 6, successRate: 79, odds: -870 },
  ],
  NFL: [
    { player: "Patrick Mahomes", matchup: "Chiefs", streak: 4, successRate: 68, odds: -850 },
    { player: "Justin Jefferson", matchup: "Vikings", streak: 6, successRate: 81, odds: -820 },
  ],
  MLB: [
    { player: "Aaron Judge", matchup: "Yankees", streak: 8, successRate: 89, odds: -950 },
    { player: "Shohei Ohtani", matchup: "Angels", streak: 5, successRate: 74, odds: -900 },
  ],
  NHL: [
    { player: "Connor McDavid", matchup: "Oilers", streak: 7, successRate: 83, odds: -800 },
    { player: "Nathan MacKinnon", matchup: "Avalanche", streak: 5, successRate: 77, odds: -750 },
  ],
};

export default function PropStreaksPage() {
  const [selectedLeague, setSelectedLeague] = useState<string>("NBA");
  const router = useRouter();

  const handleAnalysisClick = (playerName: string) => {
    const formattedName = playerName.toLowerCase().replace(/\s+/g, "-");
    router.push(`/player-props/${formattedName}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white p-10 flex flex-col items-center font-['Orbitron']">
      {/* Header */}
      <header className="flex justify-between items-center w-full max-w-5xl py-5 px-10 bg-white/10 backdrop-blur-lg rounded-xl shadow-lg">
        <nav className="flex gap-8 text-lg">
          <Dashboard />
        </nav>
      </header>

      {/* Title */}
      <h1 className="text-4xl text-green-400 font-bold mt-10 font-['Rajdhani'] tracking-wider uppercase flex items-center gap-2">
        <FaChartLine className="text-green-400" />
        Player Prop Streaks
      </h1>

      {/* League Dropdown */}
      <div className="mt-6 w-full max-w-5xl flex justify-end">
        <select
          className="bg-gray-800 text-white border border-gray-600 rounded-lg px-4 py-2 text-lg"
          value={selectedLeague}
          onChange={(e) => setSelectedLeague(e.target.value)}
        >
          {leagues.map((league) => (
            <option key={league} value={league}>
              {league}
            </option>
          ))}
        </select>
      </div>

      {/* Streak Table Card */}
      <div className="w-full max-w-5xl mt-6 bg-white/10 backdrop-blur-lg shadow-lg rounded-xl p-6">
        <h2 className="text-3xl font-semibold text-green-400 mb-4 font-['Rajdhani'] uppercase">{selectedLeague} Streaks</h2>
        <div className="overflow-x-auto rounded-lg">
          <table className="w-full border-collapse border border-gray-700 text-lg">
            <thead className="bg-gray-800 text-green-400">
              <tr>
                <th className="border border-gray-700 px-4 py-3 text-left">Player</th>
                <th className="border border-gray-700 px-4 py-3 text-left">Matchup</th>
                <th className="border border-gray-700 px-4 py-3">Streak</th>
                <th className="border border-gray-700 px-4 py-3">Success Rate</th>
                <th className="border border-gray-700 px-4 py-3">Odds</th>
                <th className="border border-gray-700 px-4 py-3">Analysis</th>
              </tr>
            </thead>
            <tbody>
              {sampleData[selectedLeague]?.map((player, index) => (
                <tr key={index} className="border border-gray-700">
                  <td className="px-4 py-3">{player.player}</td>
                  <td className="px-4 py-3">{player.matchup}</td>
                  <td className="px-4 py-3 text-center">{player.streak}</td>
                  <td className="px-4 py-3 text-center">{player.successRate}%</td>
                  <td className="px-4 py-3 text-center">{player.odds}</td>
                  <td className="px-4 py-3 text-center">
                    <button
                      onClick={() => handleAnalysisClick(player.player)}
                      className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white font-bold rounded-lg transition"
                    >
                      View Prop Analysis
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-auto py-6 text-gray-400">
        <p>&copy; 2025 Prop Analyzer. All rights reserved.</p>
      </footer>
    </div>
  );
}
