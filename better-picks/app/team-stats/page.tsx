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
          seasonData[season] = []; // fallback
        }
      }
      setStatsBySeason(seasonData);
    }

    loadAllSeasons();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-purple-800 text-white p-10 flex flex-col items-center font-sans">
      <Dashboard />
      <div className="space-y-8 mt-10 w-full max-w-7xl">
        <div className="flex justify-center space-x-4 mb-6">
          {seasons.map((season) => (
            <button
              key={season}
              onClick={() => setSelectedSeason(season)}
              className={`px-4 py-2 rounded-lg font-semibold border transition ${
                selectedSeason === season
                  ? "bg-purple-500 text-white border-purple-400"
                  : "bg-gray-700 text-gray-300 border-gray-600 hover:bg-gray-600"
              }`}
            >
              {season}
            </button>
          ))}
        </div>

        <div className="bg-white/10 shadow-xl rounded-2xl p-6 border border-white/20">
          <h2 className="text-2xl sm:text-3xl font-bold text-purple-400 mb-6 text-center">
            Team Statistics for {selectedSeason}
          </h2>

          <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-700 text-sm sm:text-base">
              <thead className="bg-gray-900 text-purple-300 sticky top-0 z-10">
                <tr>
                  {[
                    "Team", "PTS", "AST", "BLK", "STL", "FT%", "FGA", "FGM",
                    "Def Eff", "Off Eff", "REB", "Record", "Logo"
                  ].map((heading, idx) => (
                    <th key={idx} className="px-4 py-3 border border-gray-700 text-left whitespace-nowrap">
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
                    <td className="px-4 py-3">{team.TEAM}</td>
                    <td className="px-4 py-3 text-center">{team.PTS}</td>
                    <td className="px-4 py-3 text-center">{team.AST}</td>
                    <td className="px-4 py-3 text-center">{team.BLK}</td>
                    <td className="px-4 py-3 text-center">{team.STL}</td>
                    <td className="px-4 py-3 text-center">{(team.FT_PCT * 100).toFixed(1)}%</td>
                    <td className="px-4 py-3 text-center">{team.FGA}</td>
                    <td className="px-4 py-3 text-center">{team.FGM}</td>
                    <td className="px-4 py-3 text-center">{team.DEF_EFF}</td>
                    <td className="px-4 py-3 text-center">{team.OFF_EFF}</td>
                    <td className="px-4 py-3 text-center">{team.REB}</td>
                    <td className="px-4 py-3 text-center">{team.W}-{team.L}</td>
                    <td className="px-4 py-3 text-center">
                      {team.TEAM_LOGO && (
                        <img
                          src={team.TEAM_LOGO}
                          alt={`${team.TEAM} logo`}
                          className="w-12 h-12 mx-auto"
                        />
                      )}
                    </td>
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
