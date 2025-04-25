// Used the following link to help me style the player cards.
// https://chatgpt.com/share/680bba06-5cc0-8012-a00a-92429b5bd4a0
"use client";

import { useState } from "react";
import { FaChartLine } from "react-icons/fa";
import Dashboard from "../components/Dashboard";

// Sample prop data
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
  const [selectedSport, setSelectedSport] = useState("");
  const [selectedPropType, setSelectedPropType] = useState("");

  const filteredProps = trendingProps.filter(
    (prop) =>
      (selectedSport ? prop.sport === selectedSport : true) &&
      (selectedPropType ? prop.betType.startsWith(selectedPropType) : true)
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-purple-800 text-white p-10 flex flex-col items-center font-sans">
           <Dashboard></Dashboard>
      <div className="w-full max-w-6xl mt-20 bg-white/5 shadow-xl rounded-xl px-8 py-10 sm:px-12 sm:py-14 space-y-8 relative border border-white/20">
   
        <h2 className="text-4xl sm:text-5xl font-extrabold text-white text-center drop-shadow-xl mb-6 tracking-wide font-['Rajdhani'] flex items-center justify-center gap-3">
          <FaChartLine className="text-purple-400 text-3xl" />
          Player Prop Streaks
        </h2>

        {/* Dropdowns for League and Prop Type */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
          {/* League Dropdown */}
          <select
            value={selectedSport}
            onChange={(e) => setSelectedSport(e.target.value)}
            className="p-3 rounded-md bg-gray-800 text-white border border-white/10 w-full sm:w-1/2 focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            <option value="">All Leagues</option>
            <option value="NBA">NBA</option>
            <option value="NFL">NFL</option>
          </select>

          {/* Prop Type Dropdown */}
          <select
            value={selectedPropType}
            onChange={(e) => setSelectedPropType(e.target.value)}
            className="p-3 rounded-md bg-gray-800 text-white border border-white/10 w-full sm:w-1/2 focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            <option value="">All Prop Types</option>
            {uniquePropTypes.map((type, idx) => (
              <option key={idx} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>

        {/* Prop Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProps.length > 0 ? (
            filteredProps.map((prop, index) => (
              <div
                key={index}
                className="bg-gray-900 p-5 rounded-2xl shadow-xl border border-white/10 flex flex-col items-center justify-between transition-all duration-300 hover:shadow-2xl hover:scale-105 hover:bg-gray-800"
              >
                <h3 className="text-xl font-bold text-white text-center tracking-wide mb-2">{prop.player}</h3>
                <p className="text-sm text-gray-400">{prop.team} • {prop.sport}</p>
                <p className="mt-2 text-white font-medium text-center">{prop.betType}</p>
                <p className="text-purple-400 mt-1 text-sm">Odds: {prop.odds}</p>
              </div>
            ))
          ) : (
            <p className="text-center col-span-full text-gray-400">No props match the selected filters.</p>
          )}
        </div>

        <footer className="mt-auto py-6 text-gray-400 text-center text-sm">
          &copy; 2025 Player Prop Streaks. All rights reserved.
        </footer>
      </div>
      </div>
  );
}
