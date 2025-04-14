"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import Link from "next/link";

type GameDetail = {
  GAME_ID: number;
  DATE: string;
  HOME_TEAM: string;
  AWAY_TEAM: string;
  CITY: string;
  SCORE_HOME?: number;
  SCORE_AWAY?: number;
  STATS?: any;
};

export default function MatchupDetailPage() {
  const { team, gameId } = useParams();
  const [game, setGame] = useState<GameDetail | null>(null);

  useEffect(() => {
    if (team && gameId) {
      const formattedNickname = team
        .toString()
        .replace(/-/g, " ")
        .replace(/\b\w/g, (l) => l.toUpperCase());

      // Step 1: Get the list of matchups for this team
      axios
        .get(`https://betterpicks-demo.onrender.com/NBAMatchups/${formattedNickname}`)
        .then((res) => {
          const match = res.data.find(
            (g: any) => g.GAME_ID.toString() === gameId.toString()
          );

          if (!match) throw new Error("Game not found");

          // Step 2: Fetch detailed game data
          return axios.get(
            `https://betterpicks-demo.onrender.com/NBAMatchups/${match.AWAY_TEAM}/${match.HOME_TEAM}/${match.GAME_ID}`
          );
        })
        .then((res) => setGame(res.data))
        .catch((err) => console.error("Error loading matchup details:", err));
    }
  }, [team, gameId]);

  const formattedTeam = team
    ?.toString()
    .replace(/-/g, " ")
    .replace(/\b\w/g, (l) => l.toUpperCase());

  if (!game) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        <p className="text-lg text-gray-300">Loading matchup details...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-purple-900 text-white p-8">
      <div className="mb-6">
        <Link
          href={`/team-history/${team}`}
          className="text-green-400 underline hover:text-green-300 transition"
        >
          ← Back to {formattedTeam}'s Match History
        </Link>
      </div>

      <div className="mb-10">
        <h1 className="text-4xl font-bold text-purple-300 mb-2">
          {game.AWAY_TEAM} @ {game.HOME_TEAM}
        </h1>
        <p className="text-md text-gray-300 mb-1">📅 {game.DATE}</p>
        <p className="text-sm text-gray-400">📍 {game.CITY}</p>
      </div>

      {game.SCORE_HOME !== undefined && game.SCORE_AWAY !== undefined && (
        <div className="text-xl font-semibold text-white mb-8">
          Final Score:{" "}
          <span className="text-green-400">{game.AWAY_TEAM} {game.SCORE_AWAY}</span> —{" "}
          <span className="text-green-300">{game.HOME_TEAM} {game.SCORE_HOME}</span>
        </div>
      )}

{Array.isArray(game.STATS) ? (
  <div className="bg-gray-800 p-6 rounded-xl shadow-lg">
    <h2 className="text-2xl font-bold text-white mb-6">Team Stats</h2>

    <div className="grid gap-6">
      {game.STATS.map((teamStat, index) => (
        <div key={index} className="bg-gray-900 p-4 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold text-purple-300 mb-3">
            {teamStat.NAME || `Team ${index + 1}`}
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-gray-300">
            {Object.entries(teamStat).map(([key, value]) => {
              if (key === "NAME") return null;
              if (typeof value === "object" && value !== null) return null; // skip nested objects

              return (
                <div
                  key={key}
                  className="flex justify-between border-b border-gray-700 py-1"
                >
                  <span className="font-medium text-white">
                    {key.replace(/_/g, " ")}:
                  </span>
                  <span className="text-right text-purple-300">
                    {String(value)}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  </div>
) : (
  <p className="text-gray-400">No stats available for this game.</p>
)}



    </div>
  );
}
