"use client";
import { useState, useEffect } from "react";
import Dashboard from "../components/Dashboard";

// Define the type for team stats
type TeamStats = {
  team: string;
  points: number;
  assists: number;
  blocks: number;
  steals: number;
  freeThrows: number;
  attempts: number;
  made: number;
  defEff: number;
  offEff: number;
  rebounds: number;
  record: string;
};

// Dummy data - replace with API
async function fetchTeamStats(): Promise<TeamStats[]> {
  return [
    { team: "Boston Celtics", points: 115.2, assists: 25.8, blocks: 5.4, steals: 7.2, freeThrows: 78.2, attempts: 88.5, made: 45.9, defEff: 108.5, offEff: 112.4, rebounds: 45.3, record: "45-20" },
    { team: "Miami Heat", points: 110.5, assists: 24.2, blocks: 4.8, steals: 6.9, freeThrows: 80.1, attempts: 85.4, made: 42.7, defEff: 106.2, offEff: 110.1, rebounds: 42.1, record: "40-25" },
    { team: "Los Angeles Lakers", points: 113.7, assists: 26.5, blocks: 5.1, steals: 7.0, freeThrows: 79.3, attempts: 90.2, made: 46.2, defEff: 109.8, offEff: 111.5, rebounds: 44.5, record: "38-27" },
    { team: "Golden State Warriors", points: 117.1, assists: 28.3, blocks: 4.9, steals: 7.8, freeThrows: 81.0, attempts: 92.1, made: 47.3, defEff: 107.5, offEff: 113.2, rebounds: 46.1, record: "42-23" },
    { team: "Milwaukee Bucks", points: 118.5, assists: 25.0, blocks: 5.6, steals: 6.5, freeThrows: 76.4, attempts: 89.8, made: 46.8, defEff: 110.0, offEff: 114.0, rebounds: 47.2, record: "48-17" },
  ];
}

export default function TeamStats() {
  const [stats, setStats] = useState<TeamStats[]>([]);

  useEffect(() => {
    async function loadStats() {
      const data = await fetchTeamStats();
      setStats(data);
    }
    loadStats();
  }, []);

  return (
 
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-purple-800 text-white p-10 flex flex-col items-center font-sans">
       <Dashboard></Dashboard>

       <div className="space-y-8 mt-10">
        <div className="w-full max-w-7xl bg-white/10 shadow-xl rounded-2xl p-6 border border-white/20"> 
       
          <h2 className="text-2xl sm:text-3xl font-bold text-purple-400 mb-6 text-center">Team Statistics</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-700 text-sm sm:text-base">
              <thead className="bg-gray-900 text-purple-300 sticky top-0 z-10">
                <tr>
                  {[
                    "Team", "PTS", "AST", "BLK", "STL", "FT%", "FGA", "FGM", "Def Eff", "Off Eff", "REB", "Record",
                  ].map((heading, idx) => (
                    <th key={idx} className="px-4 py-3 border border-gray-700 text-left whitespace-nowrap">{heading}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {stats.map((team, index) => (
                  <tr
                    key={index}
                    className={`border border-gray-700 ${index % 2 === 0 ? "bg-gray-800/50" : "bg-gray-800/30"} hover:bg-gray-700/60 transition`}
                  >
                    <td className="px-4 py-3">{team.team}</td>
                    <td className="px-4 py-3 text-center">{team.points}</td>
                    <td className="px-4 py-3 text-center">{team.assists}</td>
                    <td className="px-4 py-3 text-center">{team.blocks}</td>
                    <td className="px-4 py-3 text-center">{team.steals}</td>
                    <td className="px-4 py-3 text-center">{team.freeThrows}%</td>
                    <td className="px-4 py-3 text-center">{team.attempts}</td>
                    <td className="px-4 py-3 text-center">{team.made}</td>
                    <td className="px-4 py-3 text-center">{team.defEff}</td>
                    <td className="px-4 py-3 text-center">{team.offEff}</td>
                    <td className="px-4 py-3 text-center">{team.rebounds}</td>
                    <td className="px-4 py-3 text-center">{team.record}</td>
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
