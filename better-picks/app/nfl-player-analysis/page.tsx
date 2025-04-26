/**
 * React componenet that displays a dashboard with buttons leading to player prop analysis.
 * The user can filter which props they want to see based on teams and stats such as rushing yards,
 * passing yards, etc. The player cards act as links for users to get a deeper analysis of there favorite
 * player props.
 */

"use client";

import { useState } from "react";
import { FaFootballBall } from "react-icons/fa";
import Dashboard from "../components/Dashboard";
import Link from "next/link";

const playerData = [
  { name: "Patrick Mahomes", team: "Chiefs", passingYards: 320, touchdowns: 3, interceptions: 1 },
  { name: "Josh Allen", team: "Bills", passingYards: 280, touchdowns: 2, interceptions: 0 },
  { name: "Lamar Jackson", team: "Ravens", passingYards: 250, rushingYards: 75, touchdowns: 2 },
  { name: "Derrick Henry", team: "Ravens", rushingYards: 105, touchdowns: 1 },
  { name: "Ceedee Lamb", team: "Cowboys", receivingYards: 120, touchdowns: 2, receptions: 8 },
  { name: "Saquon Barkley", team: "Eagles", rushingYards: 150, touchdowns: 1 },
];

const statOptions = [
  "All Stats",
  "Passing Yards",
  "Rushing Yards",
  "Receiving Yards",
  "Touchdowns",
  "Interceptions",
  "Receptions",
];

export default function PlayerAnalysis() {
  // useState keeps track of which team was selected on the dropdown with the array 'selectedTeam' initalized as empty.
  const [selectedTeam, setSelectedTeam] = useState("");
  // useState keeps track of which stat was selected on the dropdown with the array 'selectedStat' initalized as 'All Stats'.
  const [selectedStat, setSelectedStat] = useState("All Stats");

  const filteredPlayers = playerData.filter((player) => {
    const teamMatch = selectedTeam === "" || player.team === selectedTeam;

    const statKey = selectedStat.toLowerCase().replace(/\s/g, "");
    const hasStat = selectedStat === "All Stats" || player[statKey as keyof typeof player] !== undefined;

    return teamMatch && hasStat;
  });

  const uniqueTeams = [...new Set(playerData.map((p) => p.team))];

  return (


    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-purple-800 text-white p-10 flex flex-col items-center font-sans">
              <Dashboard></Dashboard>
        
              <div className="space-y-8 mt-10">
        <h2 className="text-4xl sm:text-5xl font-extrabold text-white text-center drop-shadow-xl mb-6 tracking-wide font-['Rajdhani']">
          NFL Player Prop Analysis
        </h2>
        </div>

        {/* Used the following link to help style the dropdown - https://chatgpt.com/share/680bed4e-4d2c-8012-83da-09cc5133bc9e */}
        {/* Dropdowns */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
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
              <Link
                href={`/player/${encodeURIComponent(player.name.toLowerCase().replace(/\s+/g, "-"))}`}
              >
                <button className="mt-auto px-4 py-2 bg-purple-500 text-white font-bold rounded-lg hover:bg-purple-600 transition-all duration-300 ease-in-out">
                  View Props
                </button>
              </Link>
            </div>
          ))}
        </div>

        <footer className="mt-auto py-6 text-gray-400 text-center text-sm">
          {/* Footer content if needed */}
        </footer>
      </div>
  );
}
