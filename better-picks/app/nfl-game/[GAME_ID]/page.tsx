// I used chat gpt to help generate the page based on the backend route and changed it according to certain specfications:
// https://chatgpt.com/share/68030ca6-ca1c-800f-bed1-19bf6cd02b0a 
'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import axios from 'axios';

type TeamInfo = {
  TEAM_ID: number;
  TEAM_NAME: string;
  TEAM_ABR: string;
  TEAM_LOGO: string;
  TEAM_WORDMARK?: string;
};

type TeamGameStats = {
  TEAM: TeamInfo;
  IS_HOME: boolean;
  SCORE: number;
  OPPONENT_SCORE: number;
  TOTAL_YARDS: number;
  TOTAL_PASS_YARDS: number;
  TOTAL_RUSH_YARDS: number;
  TOTAL_TDS: number;
  AVG_EPA: number;
  SUCCESS_RATE: number;
  [key: string]: any; // fallback for extra fields
};

type GameData = {
  GAME_ID: string;
  WEEK: number;
  HOME_TEAM: string;
  AWAY_TEAM: string;
  team_stats: TeamGameStats[];
};

export default function GamePage() {
  const params = useParams();
  const gameId = params?.gameId as string;
  const [gameData, setGameData] = useState<GameData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (gameId) {
      axios
        .get<GameData>(`https://betterpicks-demo.onrender.com/nfl_games/${gameId}/team_stats`)
        .then((res) => {
          setGameData(res.data);
        })
        .catch((err) => {
          console.error('Failed to load game stats:', err);
        })
        .finally(() => setLoading(false));
    }
  }, [gameId]);

  if (loading) return <div className="text-white text-center mt-10">Loading...</div>;
  if (!gameData) return <div className="text-red-400 text-center mt-10">Game not found</div>;

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <h1 className="text-3xl font-bold text-center mb-10 tracking-wide font-['Rajdhani']">
        Week {gameData.WEEK} — {gameData.HOME_TEAM} vs {gameData.AWAY_TEAM}
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto">
        {gameData.team_stats.map((teamStats, index) => (
          <div
            key={index}
            className="bg-gray-800 border border-white/10 rounded-xl p-6 shadow-xl"
          >
            <div className="flex flex-col items-center mb-4">
              <img
                src={teamStats.TEAM.TEAM_LOGO}
                alt={`${teamStats.TEAM.TEAM_NAME} logo`}
                className="w-16 h-16 mb-2"
              />
              <h2 className="text-xl font-bold">{teamStats.TEAM.TEAM_NAME}</h2>
              <p className="text-sm text-gray-400">
                {teamStats.IS_HOME ? 'Home' : 'Away'} Team
              </p>
              <h3 className="text-3xl mt-2 font-semibold">
                {teamStats.SCORE}{' '}
                <span className="text-gray-500">–</span> {teamStats.OPPONENT_SCORE}
              </h3>
            </div>

            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="text-gray-400">Total Yards:</div>
              <div>{teamStats.TOTAL_YARDS}</div>

              <div className="text-gray-400">Pass Yards:</div>
              <div>{teamStats.TOTAL_PASS_YARDS}</div>

              <div className="text-gray-400">Rush Yards:</div>
              <div>{teamStats.TOTAL_RUSH_YARDS}</div>

              <div className="text-gray-400">Total TDs:</div>
              <div>{teamStats.TOTAL_TDS}</div>

              <div className="text-gray-400">Avg EPA:</div>
              <div>{teamStats.AVG_EPA?.toFixed(2)}</div>

              <div className="text-gray-400">Success Rate:</div>
              <div>{(teamStats.SUCCESS_RATE * 100).toFixed(1)}%</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
