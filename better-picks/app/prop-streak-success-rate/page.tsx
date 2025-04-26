// Used the following link to generate help for the dropdowns on NBA and NFL.
// https://chatgpt.com/share/680be2d7-3e8c-8012-856d-9b8308d9c7bd
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

// Extract unique prop types
const uniquePropTypes = [...new Set(trendingProps.map((prop) => prop.betType.split(" ")[0]))];

export default function PropStreaks() {
  // UseState tracks the selected sport starting as an empty string.
  const [selectedSport, setSelectedSport] = useState("");
  // UseState tracks the selected prop type starting as an empty string.
  const [selectedPropType, setSelectedPropType] = useState("");

  const filteredProps = trendingProps.filter(
    (prop) =>
      (selectedSport ? prop.sport === selectedSport : true) &&
      (selectedPropType ? prop.betType.startsWith(selectedPropType) : true)
  );

  return (

    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-purple-800 text-white p-10 flex flex-col items-center font-sans">
        <Dashboard></Dashboard>
        {/* Filter Controls */}
        <div className="mt-10 w-full max-w-5xl flex flex-col md:flex-row justify-end gap-4">
          <select
            value={selectedSport}
            onChange={(e) => setSelectedSport(e.target.value)}
            className="bg-gray-800 text-white border border-gray-600 rounded-lg px-4 py-2 text-lg"
          >
            <option value="">Choose League</option>
            <option value="NBA">NBA</option>
            <option value="NFL">NFL</option>
          </select>

          <select
            value={selectedPropType}
            onChange={(e) => setSelectedPropType(e.target.value)}
            className="bg-gray-800 text-white border border-gray-600 rounded-lg px-4 py-2 text-lg"
          >
            <option value="">Choose Prop Type</option>
            {uniquePropTypes.map((type, idx) => (
              <option key={idx} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>

        {/* Streaks Section */}
        {(selectedSport || selectedPropType) && (
          <div className="w-full max-w-5xl mt-6 bg-white/10 backdrop-blur-lg shadow-lg rounded-xl p-6">
            <h2 className="text-4xl tracking-wide uppercase text-purple-400 flex items-center gap-2 font-['Rajdhani']">
              <FaChartLine className="text-purple-400" /> Player Prop Streaks
            </h2>
            <div className="overflow-y-auto max-h-[500px] rounded-lg p-2">
              <table className="w-full border-collapse text-lg">
                <thead className="sticky top-0 bg-transparent text-purple-400">
                  <tr>
                    <th className="border border-gray-700 px-6 py-3 text-left">Player</th>
                    <th className="border border-gray-700 px-6 py-3 text-left">Team</th>
                    <th className="border border-gray-700 px-6 py-3 text-center">Bet Type</th>
                    <th className="border border-gray-700 px-6 py-3 text-center">Odds</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredProps.length > 0 ? (
                    filteredProps.map((prop, index) => (
                      <tr key={index} className="border border-gray-700 hover:bg-white/5 transition">
                        <td className="border border-gray-700 px-6 py-3">{prop.player}</td>
                        <td className="border border-gray-700 px-6 py-3">{prop.team}</td>
                        <td className="border border-gray-700 px-6 py-3 text-center">{prop.betType}</td>
                        <td className="border border-gray-700 px-6 py-3 text-center">{prop.odds}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={4} className="text-center py-4 text-gray-400">
                        No streaks found for this filter.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        <footer className="mt-auto py-6 text-gray-400">
          <p>&copy; 2025 Player Prop Streaks. All rights reserved.</p>
        </footer>
      </div>

  );
}
