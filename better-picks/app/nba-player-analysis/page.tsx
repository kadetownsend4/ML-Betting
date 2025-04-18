"use client";

import { useState } from "react";
import Dashboard from "../components/Dashboard";
import Link from "next/link";

// Example NBA player data
const nbaPlayerData = [
  { name: "LeBron James", team: "Lakers", points: 28, assists: 8, rebounds: 7 },
  { name: "Stephen Curry", team: "Warriors", points: 32, assists: 6, rebounds: 5 },
  { name: "Jayson Tatum", team: "Celtics", points: 30, assists: 4, rebounds: 9 },
  { name: "Kevin Durant", team: "Suns", points: 27, assists: 5, rebounds: 6 },
  { name: "Joel Embiid", team: "76ers", points: 31, assists: 4, rebounds: 11 },
  { name: "Luka Doncic", team: "Mavericks", points: 33, assists: 9, rebounds: 8 },
];

// Stats dropdown options
const statOptions = ["All Stats", "Points", "Assists", "Rebounds", "Points+Assists+Rebounds", "Steals", "Blocks"];

export default function NBAPlayerAnalysis() {
  const [selectedTeam, setSelectedTeam] = useState("");
  const [selectedStat, setSelectedStat] = useState("All Stats");

  const uniqueTeams = [...new Set(nbaPlayerData.map((player) => player.team))];

  // Filter players based on team and selected stat
  const filteredPlayers = nbaPlayerData.filter((player) => {
    const teamMatch = selectedTeam === "" || player.team === selectedTeam;

    const statKey = selectedStat.toLowerCase().replace(/\s/g, "");
    const hasStat =
      selectedStat === "All Stats" || player[statKey as keyof typeof player] !== undefined;

    return teamMatch && hasStat;
  });

  return (
    <Dashboard>
      <div className="w-full max-w-6xl mt-20 bg-white/5 shadow-xl rounded-xl px-8 py-10 sm:px-12 sm:py-14 space-y-8 relative z-50 border border-white/20">
        <h2 className="text-4xl sm:text-5xl font-extrabold text-white text-center drop-shadow-xl mb-6 tracking-wide font-['Rajdhani']">
          NBA Player Prop Analysis
        </h2>

        {/* Dropdowns for Team and Stats */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
          {/* Team Dropdown */}
          <select
            value={selectedTeam}
            onChange={(e) => setSelectedTeam(e.target.value)}
            className="p-3 rounded-md bg-gray-800 text-white border border-white/10 w-full sm:w-1/2 focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            <option value="">All Teams</option>
            {uniqueTeams.map((team) => (
              <option key={team} value={team}>
                {team}
              </option>
            ))}
          </select>

          {/* Stats Dropdown */}
          <select
            value={selectedStat}
            onChange={(e) => setSelectedStat(e.target.value)}
            className="p-3 rounded-md bg-gray-800 text-white border border-white/10 w-full sm:w-1/2 focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            {statOptions.map((stat) => (
              <option key={stat} value={stat}>
                {stat}
              </option>
            ))}
          </select>
        </div>

        {/* Player Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
          {filteredPlayers.map((player, index) => (
            <div
              key={index}
              className="bg-gray-900 p-5 rounded-2xl shadow-xl border border-white/10 flex flex-col items-center justify-center transition-all duration-300 hover:shadow-2xl hover:scale-105 hover:bg-gray-800"
            >
              <h3 className="text-xl font-bold text-white text-center tracking-wide mb-2">
                {player.name}
              </h3>
              <p className="text-sm text-gray-300">{player.team}</p>

              {/* Remove points, assists, rebounds display */}
              <Link
                href={`/nba-player/${encodeURIComponent(player.name.toLowerCase().replace(/\s+/g, "-"))}`}
              >
                <button className="mt-auto px-4 py-2 bg-purple-500 text-white font-bold rounded-lg hover:bg-purple-600 transition-all duration-300 ease-in-out">
                  View Props
                </button>
              </Link>
            </div>
          ))}
        </div>

        <footer className="mt-auto py-6 text-gray-400 text-center text-sm">
          {/* Optional footer */}
        </footer>
      </div>
    </Dashboard>
  );
}
