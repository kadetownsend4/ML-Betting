"use client";
import { useState, useEffect } from "react";
import Dashboard from "../components/Dashboard";

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
  DEF_EFF: number;
  OFF_EFF: number;
  TEAM_LOGO: string | null;
};

async function fetchTeamStats(season: string): Promise<TeamStats[]> {
  const response = await fetch(`https://betterpicks-demo.onrender.com/NBAStats/${season}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch team stats for ${season}`);
  }
  const data = await response.json();
  return data;
}

export default function TeamStatsPage() {
  const seasons = ['2020', '2021', '2022', '2023', '2024'];
  const [statsBySeason, setStatsBySeason] = useState<{ [season: string]: TeamStats[] }>({});
  const [selectedSeason, setSelectedSeason] = useState<string>('2023');

  useEffect(() => {
    async function loadAllSeasons() {
      const seasonData: { [season: string]: TeamStats[] } = {};
      for (const season of seasons) {
        try {
          const data = await fetchTeamStats(season);
          seasonData[season] = data;
        } catch (error) {
          console.error(`Error fetching stats for ${season}:`, error);
          seasonData[season] = [];
        }
      }
      setStatsBySeason(seasonData);
    }

    loadAllSeasons();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-purple-900 text-white px-4 sm:px-10 py-10 font-sans">
      <Dashboard />
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="w-full flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-10 px-4 py-6 border-b border-purple-600">
          <div className="flex-1">
            <h1 className="text-4xl sm:text-5xl font-extrabold text-purple-300 tracking-wide uppercase">
              NBA Team Stats
            </h1>
            <p className="text-sm text-purple-200 mt-2 sm:mt-1 leading-relaxed">
              Select a season to view advanced team stats including efficiency, shooting, and more.
            </p>
          </div>
        </div>

        {/* Season Toggle */}
        <div className="inline-flex mb-10 border border-purple-600 rounded-lg overflow-hidden">
          {seasons.map((season) => (
            <button
              key={season}
              onClick={() => setSelectedSeason(season)}
              className={`px-5 py-2 font-medium transition-all ${
                selectedSeason === season
                  ? "bg-purple-600 text-white"
                  : "bg-gray-800 text-gray-300 hover:bg-gray-700"
              }`}
            >
              {season}
            </button>
          ))}
        </div>

        {/* Table Card */}
        <div className="bg-gray-800/60 backdrop-blur-md p-6 rounded-xl shadow-inner border border-white/10">
          <h2 className="text-2xl sm:text-3xl font-bold text-purple-400 mb-6 text-center">
            Team Statistics for {selectedSeason}
          </h2>

          <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-700 text-xs sm:text-sm">
  <thead className="bg-gray-900 text-purple-300 sticky top-0 z-10">
    <tr>
      <th className="px-3 py-2 border border-gray-700 text-left">Logo</th>
      {Object.keys(statsBySeason[selectedSeason]?.[0] || {})
        .filter((key) => key !== "TEAM_LOGO") // We'll show this separately
        .map((heading, idx) => (
          <th
            key={idx}
            className="px-3 py-2 border border-gray-700 text-left whitespace-nowrap"
          >
            {heading}
          </th>
        ))}
    </tr>
  </thead>
  <tbody>
    {(statsBySeason[selectedSeason] || []).map((team, index) => (
      <tr
        key={index}
        className={`border border-gray-700 ${
          index % 2 === 0 ? "bg-gray-800/50" : "bg-gray-800/30"
        } hover:bg-gray-700/60 transition`}
      >
        <td className="px-3 py-2">
          {team.TEAM_LOGO ? (
            <img
              src={team.TEAM_LOGO}
              alt={`${team.TEAM} logo`}
              className="w-10 h-10 rounded-full"
            />
          ) : (
            <span className="text-gray-500">N/A</span>
          )}
        </td>
        {Object.entries(team)
          .filter(([key]) => key !== "TEAM_LOGO")
          .map(([key, value], idx) => (
            <td key={idx} className="px-3 py-2 text-center">
              {typeof value === "number" ? value.toFixed(2) : value}
            </td>
          ))}
      </tr>
    ))}
  </tbody>
</table>

          </div>
        </div>

      </div>
    </div>
  );
}
