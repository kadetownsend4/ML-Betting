'use client'; 

import { useEffect, useState } from 'react';
import Dashboard from "../components/Dashboard"; // Adjust the import based on your project structure
import Link from "next/link";

type Player = {
  PLAYER_ID: string;
  PLAYER_NAME: string;
  FIRST_NAME: string;
  LAST_NAME: string;
  POSITION: string;
  STATUS: string;
  GAME_TYPE: string;
  SEASON: string;
};

type TeamData = {
  team_id: string;
  team_name: string;
  team_logo: string;
  team_wordmark: string;
  players: Player[];
};

export default function NFLPropPositionsPage() {
  const [selectedTeam, setSelectedTeam] = useState<string>("");
  const [teamData, setTeamData] = useState<TeamData | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!selectedTeam) return;

    const fetchTeamData = async () => {
      setLoading(true);
      try {
        const teamAbr = selectedTeam.toUpperCase();
        const res = await fetch(`https://betterpicks-demo.onrender.com/nfl_teams/${teamAbr}/players`);
        if (!res.ok) throw new Error("Failed to fetch players");
        const data: TeamData = await res.json();
        setTeamData(data);
      } catch (err) {
        console.error(err);
        setTeamData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchTeamData();
  }, [selectedTeam]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-purple-800 text-white p-10 flex flex-col items-center font-sans">
      <Dashboard>

      </Dashboard>
      <div className="w-full max-w-6xl mt-20 bg-white/5 shadow-xl rounded-xl px-8 py-10 sm:px-12 sm:py-14 space-y-8 border border-white/20 text-white font-['Orbitron']">
        
        {/* Header with Dropdown */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <h2 className="text-4xl sm:text-5xl font-extrabold text-white-400 tracking-wide">
            NFL Player Props By Team
          </h2>

          <select
            value={selectedTeam}
            onChange={(e) => {
              console.log("Selected team:", e.target.value);
              setSelectedTeam(e.target.value);
            }}
            className="w-full sm:w-72 p-3 rounded-md bg-gray-800 text-white text-xl border border-white/10 focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            <option value="" disabled>Select a Team</option>
            <option value="ARI">Cardinals</option>
            <option value="ATL">Falcons</option>
            <option value="BAL">Ravens</option>
            <option value="BUF">Bills</option>
            <option value="CAR">Panthers</option>
            <option value="CHI">Bears</option>
            <option value="CIN">Bengals</option>
            <option value="CLE">Browns</option>
            <option value="DAL">Cowboys</option>
            <option value="DEN">Broncos</option>
            <option value="DET">Lions</option>
            <option value="GB">Packers</option>
            <option value="HOU">Texans</option>
            <option value="IND">Colts</option>
            <option value="JAX">Jaguars</option>
            <option value="KC">Chiefs</option>
            <option value="LAC">Chargers</option>
            <option value="LAR">Rams</option>
            <option value="LV">Raiders</option>
            <option value="MIA">Dolphins</option>
            <option value="MIN">Vikings</option>
            <option value="NE">Patriots</option>
            <option value="NO">Saints</option>
            <option value="NYG">Giants</option>
            <option value="NYJ">Jets</option>
            <option value="PHI">Eagles</option>
            <option value="PIT">Steelers</option>
            <option value="SEA">Seahawks</option>
            <option value="SF">49ers</option>
            <option value="TB">Buccaneers</option>
            <option value="TEN">Titans</option>
            <option value="WAS">Commanders</option>
          </select>
        </div>

        {/* Team info */}
        {selectedTeam && teamData && (
          <>
            <div className="flex items-center gap-3 mt-6">
              <img
                src={teamData.team_logo}
                alt={teamData.team_name}
                className="w-10 h-10"
              />
              <h3 className="text-2xl font-semibold">
                Player Props: {teamData.team_name}
              </h3>
            </div>

            <ul className="space-y-12 mt-8">
              {teamData.players.map((player) => (
                <li
                  key={player.PLAYER_ID}
                  className="p-4 border border-gray-700 rounded-lg bg-gray-900"
                >
                  <Link
                    href={`/nfl-players/${player.POSITION.toLowerCase()}/${player.PLAYER_ID}`}
                    className="block hover:bg-gray-800 rounded transition"
                  >
                    <h4 className="text-lg font-semibold">{player.PLAYER_NAME}</h4>
                    <div className="text-purple-300">
                      <p>Position: {player.POSITION}</p>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>

            {loading && (
              <p className="text-sm text-gray-400 mt-4">Loading player data...</p>
            )}
          </>
        )}
      </div>
      </div>
  );
}
