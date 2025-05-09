"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import Link from "next/link";


// Used this link to help me create this page after struggling for awhile to display the individual matchups.
// https://chatgpt.com/c/67fb021a-8610-8004-9ea2-7caf90762f32


/**
 * NBA Matchup Statistics Page
 * 
 * This page displays a box score for a specific NBA matchup between two teams
 * It dynamically reads the team nickname and game ID from the URL and then gets 
 * the teams full list of games to find the correct game ID. 
 * 
 */

// Displays the types associated with the box score 
type GameDetail = {
  GAME_ID: number;
  GAME_DATE: string;
  HOME_NAME: string;
  AWAY_NAME: string;
  HOME_W: string;
  HOME_FG_PCT: number;
  HOME_FG3_PCT: number;
  HOME_FT_PCT: number;
  HOME_TOT_REB: number;
  HOME_AST: number;
  HOME_PF: number;
  HOME_STL: number;
  HOME_TOTAL_TURNOVERS: number;
  HOME_BLK: number;
  HOME_PTS: number;
  AWAY_W: string;
  AWAY_FG_PCT: number;
  AWAY_FG3_PCT: number;
  AWAY_FT_PCT: number;
  AWAY_TOT_REB: number;
  AWAY_AST: number;
  AWAY_PF: number;
  AWAY_STL: number;
  AWAY_TOTAL_TURNOVERS: number;
  AWAY_BLK: number;
  AWAY_PTS: number;
};


// Main component to display the matchup details 
export default function MatchupDetailPage() {
  const { team, gameId } = useParams(); // Gets the team nickname and game ID
  const [game, setGame] = useState<GameDetail | null>(null); // Gets all of the game details 
  
  // Gets the matchup details for specific teams selected game
  useEffect(() => {
    if (team && gameId) {
      const formattedNickname = team
        .toString()
        .replace(/-/g, " ")
        .replace(/\b\w/g, (l) => l.toUpperCase());
      // Gets the correct matchup 
      axios
        .get(`https://betterpicks-demo.onrender.com/NBAMatchups/${formattedNickname}`)
        .then((res) => {
          const match = res.data.find(
            (g: any) => g.GAME_ID.toString() === gameId.toString()
          );

          if (!match) throw new Error("Game not found");
          // Get the detailed matchup stats based on the away team, home team, and game ID.
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

  //Shows the loading screen while fetching the data
  if (!game) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        <p className="text-lg text-gray-300">Loading matchup details...</p>
      </div>
    );
  }

  console.log("🏀 game data", game);

  // Formatted Home and Away stats to make it easily accessible to call on all the combined elements
  const homeStats = {
    NAME: game.HOME_NAME,
    W: game.HOME_W,
    FG_PCT: game.HOME_FG_PCT,
    FG3_PCT: game.HOME_FG3_PCT,
    FT_PCT: game.HOME_FT_PCT,
    TOT_REB: game.HOME_TOT_REB,
    AST: game.HOME_AST,
    PF: game.HOME_PF,
    STL: game.HOME_STL,
    TOTAL_TURNOVERS: game.HOME_TOTAL_TURNOVERS,
    BLK: game.HOME_BLK,
    PTS: game.HOME_PTS,
  };

  const awayStats = {
    NAME: game.AWAY_NAME,
    W: game.AWAY_W,
    FG_PCT: game.AWAY_FG_PCT,
    FG3_PCT: game.AWAY_FG3_PCT,
    FT_PCT: game.AWAY_FT_PCT,
    TOT_REB: game.AWAY_TOT_REB,
    AST: game.AWAY_AST,
    PF: game.AWAY_PF,
    STL: game.AWAY_STL,
    TOTAL_TURNOVERS: game.AWAY_TOTAL_TURNOVERS,
    BLK: game.AWAY_BLK,
    PTS: game.AWAY_PTS,
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-purple-900 text-white p-8">

      {/* Link back to teams matchup history */}
      <div className="mb-6">
        <Link
          href={`/team-history/${team}`}
          className="text-green-400 underline hover:text-green-300 transition"
        >
          ← Back to {formattedTeam}'s Match History
        </Link>
      </div>
      
      {/* Game Title with the associated date */}
      <div className="mb-10">
        <h1 className="text-4xl font-bold text-purple-300 mb-2">
          {game.AWAY_NAME} @ {game.HOME_NAME}
        </h1>
        <p className="text-md text-gray-300 mb-1">📅 {game.GAME_DATE}</p>
      </div>

      {/* Final score */}
      <div className="text-xl font-semibold text-white mb-8">
        Final Score:{" "}
        <span className="text-green-400">{game.AWAY_NAME} {awayStats.PTS}</span>
        <span className="mx-2"></span>
        <span className="text-green-300">{game.HOME_NAME} {homeStats.PTS}</span>
      </div>

      {/* Team Statistics */}
      <div className="bg-gray-800 p-6 rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold text-white mb-6">Team Stats</h2>
        {/* Displays the home and away stats */}
        <div className="grid gap-6">
          {[homeStats, awayStats].map((teamStat, index) => (
            <div key={index} className="bg-gray-900 p-4 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-purple-300 mb-3">
                {teamStat.NAME}
              </h3>

              {/* List of the team stats */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-gray-300">
                {Object.entries(teamStat).map(([key, value]) => {
                  if (key === "NAME") return null;

  
                  if (value === null || typeof value === "object") return null;

                  return (
                    <div
                      key={key}
                      className="flex justify-between border-b border-gray-700 py-1"
                    >
                      {/* Stat Label */}
                      <span className="font-medium text-white">
                        {key.replace(/_/g, " ")}:
                      </span>
                      {/* Stat Value */}
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
    </div>
  );
}
