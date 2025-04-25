"use client";
import { useState, useEffect } from "react";
import Dashboard from "../components/Dashboard";

// Using this link to help generate code for clean looking columns for the statistics. 
//https://chatgpt.com/share/680543c5-7134-8004-9b5a-e73cd2e032d5

// Used this link to help create this page
// https://chatgpt.com/c/67c49e05-f0f0-8004-9d0b-afc1a5311569


/**
 * This page displays NBA team statistics for multple seasons (2020-2024),
 * allowing users to switch between seasons and toggle between core stats and full stats
 */

// Defines the structure for the team stats while matching the backend
type TeamStats = {
  TEAM_ID: string;
  TEAM: string;
  SEASON: string;
  GP: number;
  W: number;
  L: number;
  WIN_PCT: number;
  MIN: number;
  PTS: number;
  FGM: number;
  FGA: number;
  FG_PCT: number;
  THREE_PM: number;
  THREE_PA: number;
  THREE_PCT: number;
  FTM: number;
  FTA: number;
  FT_PCT: number;
  OREB: number;
  DREB: number;
  REB: number;
  AST: number;
  TOV: number;
  STL: number;
  BLK: number;
  BLKA: number;
  PF: number;
  PFD: number;
  PLUS_MINUS: number;
  TEAM_LOGO: string | null;
};

// Function to get the stats based on specific season
async function fetchTeamStats(season: string): Promise<TeamStats[]> {
  const response = await fetch(`https://betterpicks-demo.onrender.com/NBAStats/${season}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch team stats for ${season}`);
  }
  return response.json();
}

// Main component to display the NBA teams season stats 
export default function TeamStatsPage() {
  const seasons = ['2020', '2021', '2022', '2023', '2024']; 
  const [selectedSeason, setSelectedSeason] = useState('2023');
  const [statsBySeason, setStatsBySeason] = useState<{ [season: string]: TeamStats[] }>({}); // Data for each season
  const [viewMode, setViewMode] = useState<"core" | "full">("core"); // Toggle between core and full stats 

  // Loads the team stats for all seasons 
  useEffect(() => {
    async function loadAllSeasons() {
      const data: { [season: string]: TeamStats[] } = {};
      for (const season of seasons) {
        try {
          data[season] = await fetchTeamStats(season);
        } catch {
          data[season] = [];
        }
      }
      setStatsBySeason(data);
    }
    loadAllSeasons();
  }, []);

  const currentStats = statsBySeason[selectedSeason] || [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black space-y-8 to-purple-800 text-white p-10 font-sans">
      <Dashboard />
      <h1 className="text-5xl sm:text-5xl font-extrabold text-white text-center drop-shadow-xl mb-8 tracking-wide font-['Rajdhani']">NBA Teams Season Statistics</h1>
      <div className="w-110 mx-auto h-1 bg-purple-500 rounded-full"></div>

      
      <div className="max-w-7xl mx-auto mt-10 space-y-10">

        {/* Season Select */}
        <div className="flex justify-center space-x-4">
          {seasons.map((season) => (
            <button
              key={season}
              onClick={() => setSelectedSeason(season)}
              className={`px-4 py-2 rounded-lg font-semibold border transition ${
                selectedSeason === season ? "bg-purple-600 border-purple-500 text-white" : "bg-gray-800 text-gray-300 border-gray-600 hover:bg-gray-700"
              }`}
            >
              {season}
            </button>
          ))}
        </div>

        {/* Toggle */}
        <div className="flex justify-center">
          <div className="inline-flex border border-purple-500 rounded-lg overflow-hidden">
            <button
              onClick={() => setViewMode("core")}
              className={`px-4 py-2 font-medium transition-all ${viewMode === "core" ? "bg-purple-600 text-white" : "bg-gray-800 text-white-300 hover:bg-gray-700"}`}
            >
              Core Stats
            </button>
            <button
              onClick={() => setViewMode("full")}
              className={`px-4 py-2 font-medium transition-all ${viewMode === "full" ? "bg-purple-600 text-white" : "bg-gray-800 text-white-300 hover:bg-gray-700"}`}
            >
              Full Stats
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto bg-white/10 shadow-xl rounded-2xl p-6 border border-white/20">
          <h2 className="text-2xl sm:text-3xl font-bold text-white-400 mb-6 text-center">
            Team Statistics ({viewMode === "core" ? "Core View" : "Full View"}) for {selectedSeason}
          </h2>
          <table className="min-w-full border border-gray-700 text-sm sm:text-base">
            <thead className="bg-gray-900 text-white-300 sticky top-0 z-10">
              <tr>
                <th className="px-4 py-3 border border-gray-700">Logo</th>
                <th className="px-4 py-3 text-white whitespace-nowrap font-semibold min-w-[8rem] max-w-[12rem] truncate">Team</th>
                {viewMode === "core" ? (
                  <>
                    <th className="px-4 py-3 border border-gray-700">W-L</th>
                    <th className="px-4 py-3 border border-gray-700">Win%</th>
                    <th className="px-4 py-3 border border-gray-700">+/-</th>
                    <th className="px-4 py-3 border border-gray-700">PTS</th>
                    <th className="px-4 py-3 border border-gray-700">FG%</th>
                    <th className="px-4 py-3 border border-gray-700">3P%</th>
                    <th className="px-4 py-3 border border-gray-700">FT%</th>
                    <th className="px-4 py-3 border border-gray-700">REB</th>
                    <th className="px-4 py-3 border border-gray-700">AST</th>
                    <th className="px-4 py-3 border border-gray-700">TOV</th>
                    <th className="px-4 py-3 border border-gray-700">STL</th>
                    <th className="px-4 py-3 border border-gray-700">BLK</th>
                  </>
                ) : (
                  Object.keys(currentStats[0] || {}).filter(key => key !== "TEAM_LOGO" && key !== "TEAM_ID" && key !== "TEAM").map((col) => (
                    <th key={col} className="px-4 py-3 border border-gray-700">{col}</th>
                  ))
                )}
              </tr>
            </thead>

            {/* Table Body */}
            <tbody>
              {currentStats.map((team, idx) => (
                <tr key={idx} className={`border border-gray-700 ${idx % 2 === 0 ? "bg-gray-800/50" : "bg-gray-800/30"} hover:bg-gray-700/60`}>
                  <td className="px-4 py-3 text-center">
                    {team.TEAM_LOGO && (
                      <img src={team.TEAM_LOGO} alt={team.TEAM} className="w-10 h-10 mx-auto" />
                    )}
                  </td>
                  <td className="px-4 py-3">{team.TEAM}</td>

                  {/* Stats Columns */}
                  {viewMode === "core" ? (
                    <>
                      <td className="px-4 py-3 text-center">{team.W}-{team.L}</td>
                      <td className="px-4 py-3 text-center">{(team.WIN_PCT * 100).toFixed(1)}%</td>
                      <td className="px-4 py-3 text-center">{team.PLUS_MINUS.toFixed(1)}</td>
                      <td className="px-4 py-3 text-center font-bold text-green-300">{team.PTS}</td>
                      <td className="px-4 py-3 text-center">{(team.FG_PCT).toFixed(1)}%</td>
                      <td className="px-4 py-3 text-center">{(team.THREE_PCT).toFixed(1)}%</td>
                      <td className="px-4 py-3 text-center">{(team.FT_PCT).toFixed(1)}%</td>
                      <td className="px-4 py-3 text-center">{team.REB}</td>
                      <td className="px-4 py-3 text-center">{team.AST}</td>
                      <td className="px-4 py-3 text-center">{team.TOV}</td>
                      <td className="px-4 py-3 text-center">{team.STL}</td>
                      <td className="px-4 py-3 text-center">{team.BLK}</td>
                    </>
                  ) : (
                    Object.keys(team).filter(key => key !== "TEAM_LOGO" && key !== "TEAM_ID" && key !== "TEAM").map((col) => (
                      <td key={col} className="px-4 py-3 text-white break-words whitespace-normal text-left max-w-[10rem]">
                        {typeof team[col as keyof TeamStats] === "number"
                          ? Number(team[col as keyof TeamStats]).toFixed(1)
                          : team[col as keyof TeamStats]}
                      </td>
                    ))
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
