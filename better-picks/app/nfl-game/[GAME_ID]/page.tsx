// I used chat gpt to help generate the page based on the backend route and changed it according to certain specfications:
// https://chatgpt.com/share/68030ca6-ca1c-800f-bed1-19bf6cd02b0a 
'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { useRouter } from "next/router";
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

type QuarterbackGameStats = {
    // Core Info
    PLAYER_NAME: string;
    PLAYER_ABBR: string;
    GAME_ID: string;
    WEEK: number;
    RECENT_TEAM: string;
    OPPONENT_TEAM: string;
    SEASON: number;
    SEASON_TYPE: string;
    POSITION: string;
    HEADSHOT_URL: string;
  
    // Snap Counts
    OFFENSE_SNAPS: number;
    OFFENSE_PCT: number;
  
    // Passing Stats
    COMPLETIONS: number;
    ATTEMPTS: number;
    PASSING_YARDS: number;
    PASSING_TDS: number;
    INTERCEPTIONS: number;
    SACKS: number;
    SACK_YARDS: number;
    PASSING_EPA: number;
    PASSING_AIR_YARDS: number;
    PASSING_YARDS_AFTER_CATCH: number;
    PASSING_FIRST_DOWNS: number;
    PACR: number;
    DAKOTA: number;
    PASSER_RATING: number;
    COMPLETION_PERCENTAGE: number;
    FANTASY_POINTS: number;
    FANTASY_POINTS_PPR: number;
  
    // Rushing Stats
    CARRIES: number;
    RUSHING_YARDS: number;
    RUSHING_TDS: number;
    RUSHING_FUMBLES: number;
    RUSHING_FUMBLES_LOST: number;
    RUSHING_FIRST_DOWNS: number;
    RUSHING_EPA: number;
    RUSHING_YARDS_BEFORE_CONTACT: number;
    RUSHING_YARDS_AFTER_CONTACT: number;
    RUSHING_BROKEN_TACKLES: number;
  
    // Advanced + Pressure Metrics
    PASSING_DROPS: number;
    PASSING_DROP_PCT: number;
    PASSING_BAD_THROWS: number;
    PASSING_BAD_THROW_PCT: number;
    AVG_TIME_TO_THROW: number;
    AVG_COMPLETED_AIR_YARDS: number;
    AVG_INTENDED_AIR_YARDS: number;
    AVG_AIR_YARDS_DIFFERENTIAL: number;
    AGGRESSIVENESS: number;
    AVG_AIR_YARDS_TO_STICKS: number;
    AVG_AIR_DISTANCE: number;
    MAX_AIR_DISTANCE: number;
    TIMES_SACKED: number;
    TIMES_BLITZED: number;
    TIMES_HURRIED: number;
    TIMES_HIT: number;
    TIMES_PRESSURED: number;
    TIMES_PRESSURED_PCT: number;
  };
  


type RunningBackGameStats = {
    // Core Info
    PLAYER_NAME: string;
    PLAYER_ABBR: string;
    GAME_ID: string;
    WEEK: number;
    RECENT_TEAM: string;
    POSITION: string;
    HEADSHOT_URL: string;
  
    // Rushing Stats
    CARRIES: number;
    RUSHING_YARDS: number;
    RUSHING_TDS: number;
    RUSHING_FUMBLES: number;
    RUSHING_FUMBLES_LOST: number;
    RUSHING_FIRST_DOWNS: number;
    RUSHING_EPA: number;
    RUSHING_2PT_CONVERSIONS: number;
  
    // Receiving Stats
    RECEPTIONS: number;
    TARGETS: number;
    RECEIVING_YARDS: number;
    RECEIVING_TDS: number;
    RECEIVING_FUMBLES: number;
    RECEIVING_FUMBLES_LOST: number;
    RECEIVING_AIR_YARDS: number;
    RECEIVING_YARDS_AFTER_CATCH: number;
    RECEIVING_FIRST_DOWNS: number;
    RECEIVING_EPA: number;
  
    // Fantasy Stats
    FANTASY_POINTS: number;
    FANTASY_POINTS_PPR: number;
  
    // Advanced Rushing Metrics
    RUSHING_YARDS_BEFORE_CONTACT: number;
    RUSHING_YARDS_BEFORE_CONTACT_AVG: number;
    RUSHING_YARDS_AFTER_CONTACT: number;
    RUSHING_YARDS_AFTER_CONTACT_AVG: number;
    RUSHING_BROKEN_TACKLES: number;
    EFFICIENCY: number;
    PERCENT_ATTEMPTS_GTE_EIGHT_DEFENDERS: number;
    AVG_TIME_TO_LOS: number;
    EXPECTED_RUSH_YARDS: number;
    RUSH_YARDS_OVER_EXPECTED: number;
    RUSH_YARDS_OVER_EXPECTED_PER_ATT: number;
    RUSH_PCT_OVER_EXPECTED: number;
  };

type ReceiverGameStats = {
    // Core Info
    PLAYER_NAME: string;
    PLAYER_ABBR: string;
    GAME_ID: string;
    WEEK: number;
    RECENT_TEAM: string;
    OPPONENT_TEAM: string;
    SEASON: number;
    SEASON_TYPE: string;
    POSITION: string;
    HEADSHOT_URL: string;
  
    // Receiving Stats
    RECEPTIONS: number;
    TARGETS: number;
    RECEIVING_YARDS: number;
    RECEIVING_TDS: number;
    RECEIVING_FUMBLES: number;
    RECEIVING_FUMBLES_LOST: number;
    RECEIVING_AIR_YARDS: number;
    RECEIVING_YARDS_AFTER_CATCH: number;
    RECEIVING_FIRST_DOWNS: number;
    RECEIVING_EPA: number;
    RECEIVING_2PT_CONVERSIONS: number;
  
    // Advanced Receiving Metrics
    RACR: number;
    TARGET_SHARE: number;
    AIR_YARDS_SHARE: number;
    WOPR: number;
  
    // Special Teams & Fantasy
    SPECIAL_TEAMS_TDS: number;
    FANTASY_POINTS: number;
    FANTASY_POINTS_PPR: number;
  
    // Extra Advanced Receiving Metrics
    RECEIVING_BROKEN_TACKLES: number;
    RECEIVING_DROP: number;
    RECEIVING_DROP_PCT: number;
    RECEIVING_INT: number;
    RECEIVING_RAT: number;
  
    // Tracking Metrics
    AVG_CUSHION: number;
    AVG_SEPARATION: number;
    AVG_INTENDED_AIR_YARDS: number;
    PERCENT_SHARE_OF_INTENDED_AIR_YARDS: number;
    AVG_YAC: number;
    AVG_EXPECTED_YAC: number;
    AVG_YAC_ABOVE_EXPECTATION: number;
  };
  
  

export default function GamePage() {
  const { GAME_ID } = useParams();
  const gameId = GAME_ID as string;
  const [gameData, setGameData] = useState<GameData | null>(null);
  const [quarterbackStats, setQuarterbackStats] = useState<QuarterbackGameStats[] | null>(null);
  const [runningbackStats, setRunningbackStats] = useState<RunningBackGameStats[] | null>(null);
  const [receiverStats, setReceiverStats] = useState<ReceiverGameStats[] | null>(null);
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

        // Fetch quarterback stats
      axios
      .get<QuarterbackGameStats[]>(`https://betterpicks-demo.onrender.com/nfl_games/${gameId}/quarterback_stats`)
      .then((res) => {
        setQuarterbackStats(res.data);
      })
      .catch((err) => {
        console.error('Failed to load quarterback stats:', err);
      });

    // Fetch running back stats
    axios
      .get<RunningBackGameStats[]>(`https://betterpicks-demo.onrender.com/nfl_games/${gameId}/runningback_stats`)
      .then((res) => {
        setRunningbackStats(res.data);
      })
      .catch((err) => {
        console.error('Failed to load running back stats:', err);
      });

    // Fetch receiver stats
    axios
      .get<ReceiverGameStats[]>(`https://betterpicks-demo.onrender.com/nfl_games/${gameId}/receiver_stats`)
      .then((res) => {
        setReceiverStats(res.data);
      })
      .catch((err) => {
        console.error('Failed to load receiver stats:', err);
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
