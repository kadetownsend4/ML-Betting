"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Dashboard from "../components/Dashboard";

const leagues = ["NBA", "NFL", "MLB", "NHL"];

// Sample player prop streak data (replace with real API data)
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

  // Function to navigate to the player's prop page
  const handleAnalysisClick = (playerName: string) => {
    const formattedName = playerName.toLowerCase().replace(/\s+/g, "-");
    router.push(`/player-props/${formattedName}`);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-start p-6">
      <h1 className="text-4xl font-bold text-green-400 mb-6 self-center">Player Prop Streaks</h1>

      {/* Dropdown for League Selection */}
      <select
        className="px-4 py-2 mb-6 bg-gray-800 border border-gray-700 rounded-md text-lg"
        value={selectedLeague}
        onChange={(e) => setSelectedLeague(e.target.value)}
      >
        {leagues.map((league) => (
          <option key={league} value={league}>
            {league}
          </option>
        ))}
      </select>

      <Dashboard />

      {/* Table of Player Prop Streaks */}
      <div className="w-full max-w-9xl bg-gray-800 p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-green-400 mb-4">{selectedLeague} Streaks</h2>
        <table className="w-full border-collapse border border-gray-700 text-lg">
          <thead className="bg-gray-700">
            <tr>
              <th className="border border-gray-600 px-4 py-3 text-left">Player</th>
              <th className="border border-gray-600 px-4 py-3 text-left">Matchup</th>
              <th className="border border-gray-600 px-4 py-3">Streak</th>
              <th className="border border-gray-600 px-4 py-3">Success Rate</th>
              <th className="border border-gray-600 px-4 py-3">Odds</th>
              <th className="border border-gray-600 px-4 py-3">Analysis</th>
            </tr>
          </thead>
          <tbody>
            {sampleData[selectedLeague]?.map((player, index) => (
              <tr key={index} className="border border-gray-600">
                <td className="border border-gray-700 px-4 py-3">{player.player}</td>
                <td className="border border-gray-700 px-4 py-3">{player.matchup}</td>
                <td className="border border-gray-700 px-4 py-3 text-center">{player.streak}</td>
                <td className="border border-gray-700 px-4 py-3 text-center">{player.successRate}%</td>
                <td className="border border-gray-700 px-4 py-3 text-center">{player.odds}</td>
                <td className="border border-gray-700 px-4 py-3 text-center">
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
  );
}
