"use client";
import { useState } from "react";
import { FaChartLine } from "react-icons/fa";
import Dashboard from "../components/Dashboard";

const trendingProps = [
  { player: "LeBron James", team: "Lakers", betType: "Points Over 28.5", odds: "-110", sport: "NBA" },
  { player: "Stephen Curry", team: "Warriors", betType: "3PT Made Over 4.5", odds: "+120", sport: "NBA" },
  { player: "Giannis Antetokounmpo", team: "Bucks", betType: "Rebounds Over 11.5", odds: "-115", sport: "NBA" },
  { player: "Patrick Mahomes", team: "Chiefs", betType: "Passing Yards Over 290.5", odds: "-105", sport: "NFL" },
  { player: "Josh Allen", team: "Bills", betType: "Rushing Yards Over 40.5", odds: "-102", sport: "NFL" },
];

export default function Trends() {
  const [selectedSport, setSelectedSport] = useState("");

  const filteredProps = trendingProps.filter((prop) => prop.sport === selectedSport);

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white p-10 flex flex-col items-center font-['Orbitron']">
      {/* Header with Navigation */}
      <header className="flex justify-between items-center w-full max-w-5xl py-5 px-10 bg-white/10 backdrop-blur-lg rounded-xl shadow-lg">
        <nav className="flex gap-8 text-lg">
          <Dashboard />
        </nav>
      </header>

      {/* League Selection Dropdown */}
      <div className="mt-10 w-full max-w-5xl flex justify-end">
        <select
          value={selectedSport}
          onChange={(e) => setSelectedSport(e.target.value)}
          className="bg-gray-800 text-white border border-gray-600 rounded-lg px-4 py-2 text-lg"
        >
          <option value="">Choose a league</option>
          <option value="NBA">NBA</option>
          <option value="NFL">NFL</option>
        </select>
      </div>

      {/* Trending Player Props Section */}
      {selectedSport && (
        <div className="w-full max-w-5xl mt-6 bg-white/10 backdrop-blur-lg shadow-lg rounded-xl p-6">
          <h2 className="text-4xl tracking-wide uppercase text-green-400 flex items-center gap-2 font-['Rajdhani']">
            <FaChartLine className="text-green-400" /> Trending Player Props
          </h2>
          <div className="overflow-y-auto max-h-[500px] rounded-lg p-2">
            <table className="w-full border-collapse border border-gray-700 text-lg">
              <thead className="sticky top-0 bg-gray-800 text-green-400">
                <tr>
                  <th className="border border-gray-700 px-6 py-3 text-left">Player</th>
                  <th className="border border-gray-700 px-6 py-3 text-left">Team</th>
                  <th className="border border-gray-700 px-6 py-3">Bet Type</th>
                  <th className="border border-gray-700 px-6 py-3">Odds</th>
                </tr>
              </thead>
              <tbody>
                {filteredProps.length > 0 ? (
                  filteredProps.map((prop, index) => (
                    <tr key={index} className="border border-gray-700">
                      <td className="border border-gray-700 px-6 py-3">{prop.player}</td>
                      <td className="border border-gray-700 px-6 py-3">{prop.team}</td>
                      <td className="border border-gray-700 px-6 py-3 text-center">{prop.betType}</td>
                      <td className="border border-gray-700 px-6 py-3 text-center">{prop.odds}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={4} className="text-center py-4 text-gray-400">
                      No props found for this league.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      <footer className="mt-auto py-6 text-gray-400">
        <p>&copy; 2025 Betting Trends. All rights reserved.</p>
      </footer>
    </div>
  );
}
