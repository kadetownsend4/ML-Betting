"use client";
import { useState } from "react";
import { FaShieldAlt } from "react-icons/fa";
import Dashboard from "../components/Dashboard";
import nbaTeams from "./data/nbaTeams"; // Assuming a separate file stores team data

const teamStatsByPosition = [
  {
    position: "Point Guard",
    teams: [
      {
        team: "Boston Celtics",
        logo: "/logos/celtics.jpg",
        stats: { PTS: 110.5, REBS: 44.2, ASTS: 25.1, "3PM": 12.3, STL: 7.5, BLK: 5.6, TO: 14.0 },
      },
    ],
  },
  {
    position: "Shooting Guard",
    teams: [
      {
        team: "Brooklyn Nets",
        logo: "/logos/nets.jpg",
        stats: { PTS: 108.3, REBS: 42.5, ASTS: 24.7, "3PM": 11.9, STL: 7.0, BLK: 5.2, TO: 13.5 },
      },
    ],
  },
  {
    position: "Small Forward",
    teams: [
      {
        team: "LA Lakers",
        logo: "/logos/lakers.jpg",
        stats: { PTS: 112.1, REBS: 45.5, ASTS: 26.3, "3PM": 13.1, STL: 8.0, BLK: 6.1, TO: 13.8 },
      },
    ],
  },
  {
    position: "Power Forward",
    teams: [
      {
        team: "Miami Heat",
        logo: "/logos/heat.jpg",
        stats: { PTS: 109.9, REBS: 43.8, ASTS: 25.6, "3PM": 12.7, STL: 7.2, BLK: 5.4, TO: 14.2 },
      },
    ],
  },
  {
    position: "Center",
    teams: [
      {
        team: "Denver Nuggets",
        logo: "/logos/nuggets.jpg",
        stats: { PTS: 111.4, REBS: 46.1, ASTS: 27.0, "3PM": 10.9, STL: 6.8, BLK: 5.9, TO: 12.5 },
      },
    ],
  },
];

export default function DefenseVsNBA() {
  const [sortKey, setSortKey] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");
  const [selectedTeam, setSelectedTeam] = useState("");

  const handleSort = (key) => {
    setSortOrder(sortKey === key && sortOrder === "asc" ? "desc" : "asc");
    setSortKey(key);
  };

  const filteredStats = selectedTeam
    ? teamStatsByPosition.map((group) => ({
        ...group,
        teams: group.teams.filter((team) => team.team === selectedTeam),
      }))
    : teamStatsByPosition;

  const sortedStats = filteredStats.map((group) => ({
    ...group,
    teams: [...group.teams].sort((a, b) => {
      if (!sortKey) return 0;
      let valA = sortKey === "team" ? a.team : a.stats[sortKey];
      let valB = sortKey === "team" ? b.team : b.stats[sortKey];
      if (typeof valA === "string") valA = valA.toLowerCase();
      if (typeof valB === "string") valB = valB.toLowerCase();
      return sortOrder === "asc" ? (valA > valB ? 1 : -1) : (valA < valB ? 1 : -1);
    }),
  }));

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white p-10 flex flex-col items-center font-['Orbitron']">
      <header className="flex justify-between items-center w-full max-w-5xl py-5 px-10 bg-white/10 backdrop-blur-lg rounded-xl shadow-lg">
        <h1 className="text-4xl tracking-wide uppercase text-green-400 flex items-center gap-2 font-['Rajdhani']">
          <FaShieldAlt className="text-green-400" /> NBA Defense Stats
        </h1>
        <nav className="flex gap-8 text-lg">
          <Dashboard />
        </nav>
      </header>

      <div className="w-full max-w-5xl mt-10 bg-white/10 backdrop-blur-lg shadow-lg rounded-xl p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-4xl font-bold text-green-400">Defensive Team Stats by Position</h2>
          <select
            className="bg-gray-800 text-white px-4 py-2 rounded-lg border border-gray-600"
            value={selectedTeam}
            onChange={(e) => setSelectedTeam(e.target.value)}
          >
            <option value="">All Teams</option>
            {[...new Set(teamStatsByPosition.flatMap((group) => group.teams.map((team) => team.team)))].map((team) => (
              <option key={team} value={team}>{team}</option>
            ))}
          </select>
        </div>
        <div className="overflow-y-auto max-h-[500px] rounded-lg p-2">
          {sortedStats.map((group, index) => (
            <div key={index} className="mb-6">
              <h3 className="text-2xl font-semibold text-blue-400 mb-3">{group.position}</h3>
              <table className="w-full border-collapse border border-gray-700 text-lg">
                <thead className="sticky top-0 bg-gray-800 text-green-400">
                  <tr>
                    <th className="border border-gray-700 px-6 py-3 text-left cursor-pointer" onClick={() => handleSort("team")}>Team</th>
                    <th className="border border-gray-700 px-6 py-3 cursor-pointer" onClick={() => handleSort("PTS")}>PTS</th>
                    <th className="border border-gray-700 px-6 py-3 cursor-pointer" onClick={() => handleSort("REBS")}>REBS</th>
                    <th className="border border-gray-700 px-6 py-3 cursor-pointer" onClick={() => handleSort("ASTS")}>ASTS</th>
                    <th className="border border-gray-700 px-6 py-3 cursor-pointer" onClick={() => handleSort("3PM")}>3PM</th>
                    <th className="border border-gray-700 px-6 py-3 cursor-pointer" onClick={() => handleSort("STL")}>STL</th>
                    <th className="border border-gray-700 px-6 py-3 cursor-pointer" onClick={() => handleSort("BLK")}>BLK</th>
                    <th className="border border-gray-700 px-6 py-3 cursor-pointer" onClick={() => handleSort("TO")}>TO</th>
                  </tr>
                </thead>
              </table>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

