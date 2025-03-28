"use client";
import { useState } from "react";
import { FaShieldAlt } from "react-icons/fa";
import Dashboard from "../components/Dashboard";
import Image from "next/image";

const teamStats = [
  {
    team: "Boston Celtics",
    logo: "/logos/celtics.jpg",
    defenseVsPositions: {
      "Point Guard": { PTS: 110.5, REBS: 44.2, ASTS: 25.1, FG: 45.0 },
      "Shooting Guard": { PTS: 108.3, REBS: 42.1, ASTS: 24.0, FG: 44.5 },
      "Small Forward": { PTS: 112.0, REBS: 45.5, ASTS: 26.3, FG: 46.2 },
      "Power Forward": { PTS: 105.7, REBS: 41.8, ASTS: 22.9, FG: 43.8 },
      "Center": { PTS: 107.2, REBS: 50.3, ASTS: 20.5, FG: 48.1 },
    },
  },
  {
    team: "Brooklyn Nets",
    logo: "/logos/nets.jpg",
    defenseVsPositions: {
      "Point Guard": { PTS: 102.5, REBS: 38.5, ASTS: 20.1, FG: 41.2 },
      "Shooting Guard": { PTS: 106.3, REBS: 40.7, ASTS: 22.5, FG: 43.0 },
      "Small Forward": { PTS: 110.8, REBS: 42.3, ASTS: 25.0, FG: 45.1 },
      "Power Forward": { PTS: 108.2, REBS: 45.0, ASTS: 23.7, FG: 46.5 },
      "Center": { PTS: 104.9, REBS: 48.2, ASTS: 21.9, FG: 47.8 },
    },
  },
];

export default function DefenseVsNBA() {
  const [selectedTeam, setSelectedTeam] = useState(teamStats[0].team);
  const selectedTeamData = teamStats.find((team) => team.team === selectedTeam);

  const getStatColor = (stat, type) => {
    let thresholds = {
      PTS: [100, 110], // Lower PTS allowed is better
      REBS: [40, 50], // Mid-range is balanced
      ASTS: [20, 25], // Mid-range is balanced
      FG: [42, 46], // Lower FG% allowed is better
    };
    
    if (stat <= thresholds[type][0]) return "text-green-400";
    if (stat <= thresholds[type][1]) return "text-yellow-400";
    return "text-red-400";
  };

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

      <div className="w-full max-w-4xl mt-10 bg-white/10 backdrop-blur-lg shadow-lg rounded-xl p-6">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-4">
            <Image src={selectedTeamData.logo} alt={selectedTeam} width={50} height={50} className="rounded-full" />
            <h2 className="text-3xl font-bold text-green-400">{selectedTeam}</h2>
          </div>
          <select
            className="bg-gray-800 text-white px-4 py-2 rounded-lg border border-gray-600"
            value={selectedTeam}
            onChange={(e) => setSelectedTeam(e.target.value)}
          >
            {teamStats.map((team) => (
              <option key={team.team} value={team.team}>
                {team.team}
              </option>
            ))}
          </select>
        </div>

        {/* Defense vs Positions Table */}
        <h3 className="text-2xl font-semibold text-yellow-400 mt-8">Defense vs Positions</h3>
        <table className="w-full border-collapse border border-gray-700 text-lg mt-4">
          <thead className="bg-gray-800 text-yellow-400">
            <tr>
              <th className="border border-gray-700 px-6 py-3">Position</th>
              <th className="border border-gray-700 px-6 py-3">PTS Allowed</th>
              <th className="border border-gray-700 px-6 py-3">ASTS Allowed</th>
              <th className="border border-gray-700 px-6 py-3">REBS Allowed</th>
              <th className="border border-gray-700 px-6 py-3">FG%</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(selectedTeamData.defenseVsPositions).map(([position, stats]) => (
              <tr key={position} className="text-center bg-gray-900">
                <td className="border border-gray-700 px-6 py-3">{position}</td>
                <td className={`border border-gray-700 px-6 py-3 ${getStatColor(stats.PTS, 'PTS')}`}>{stats.PTS}</td>
                <td className={`border border-gray-700 px-6 py-3 ${getStatColor(stats.ASTS, 'ASTS')}`}>{stats.ASTS}</td>
                <td className={`border border-gray-700 px-6 py-3 ${getStatColor(stats.REBS, 'REBS')}`}>{stats.REBS}</td>
                <td className={`border border-gray-700 px-6 py-3 ${getStatColor(stats.FG, 'FG')}`}>{stats.FG}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
