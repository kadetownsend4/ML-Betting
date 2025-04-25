/**
 *
 * This component renders a comprehensive view of an NFL game, displaying team statistics and individual player statistics for quarterbacks, running backs, 
 * and receivers. It dynamically fetches data based on the provided GAME_ID parameter.
 *
 * 
 * I developed this page based on my backend routes that I developed to return the team game stats and player game stats. I gave it my routes
 * and other pages that we had done to get started. It was a long iterative process which was tedious as there were container issues and I was 
 * having trouble figuring out exactly how to style the page in the way that I wanted it. I was struggling with displaying the player data in the correct
 * manner. Eventually, I got it working for the qb for the home team and copied that framework over to all the other positions. Chat and I were going
 * back and forth on this process for a while. Below is the link to the session:
 *
 * Chat Link: https://chatgpt.com/share/68030ca6-ca1c-800f-bed1-19bf6cd02b0a
 */

'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import axios from 'axios';
import Dashboard from "../../components/Dashboard";


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
  
// Function for displaying game page. It contains the game data, qb, rb, and rec stat types
// along with the loading and error types
  export default function GamePage() {
    const { GAME_ID } = useParams();
    const gameId = GAME_ID as string;
  
    const [gameData, setGameData] = useState<GameData | null>(null);
    const [quarterbackStats, setQuarterbackStats] = useState<QuarterbackGameStats[]>([]);
    const [runningbackStats, setRunningbackStats] = useState<RunningBackGameStats[]>([]);
    const [receiverStats, setReceiverStats] = useState<ReceiverGameStats[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    /**
     * Fetches all necessary data for the game page based on the game ID.
     * This includes team stats and individual stats for quarterbacks, running backs, and receivers.
     * Handles loading and error states gracefully.
     */
    useEffect(() => {
      if (gameId) {
        const fetchData = async () => {
          setLoading(true);
          try {
            // Fetch game data
            const gameDataResponse = await axios.get<GameData>(
              `https://betterpicks-demo.onrender.com/nfl_games/${gameId}/team_stats`
            );
            setGameData(gameDataResponse.data);
          } catch (err) {
            console.error('Error loading game data:', err);
            setGameData(null);
          }
    
          try {
            const qbStatsResponse = await axios.get<QuarterbackGameStats[]>(
              `https://betterpicks-demo.onrender.com/qb/stats/game/${gameId}`
            );
            setQuarterbackStats(qbStatsResponse.data);
          } catch (err) {
            console.error('Error loading QB stats:', err);
            setQuarterbackStats([]); // default to empty array
          }
    
          try {
            const rbStatsResponse = await axios.get<RunningBackGameStats[]>(
              `https://betterpicks-demo.onrender.com/rb/stats/game/${gameId}`
            );
            setRunningbackStats(rbStatsResponse.data);
          } catch (err) {
            console.error('Error loading RB stats:', err);
            setRunningbackStats([]); // default to empty array
          }
    
          try {
            const recStatsResponse = await axios.get<ReceiverGameStats[]>(
              `https://betterpicks-demo.onrender.com/rec/stats/game/${gameId}`
            );
            setReceiverStats(recStatsResponse.data);
          } catch (err) {
            console.error('Error loading receiver stats:', err);
            setReceiverStats([]); // default to empty array
          }
    
          setLoading(false);
        };
  
        fetchData();
      }
    }, [gameId]);
  
    if (loading) {
      return <div>Loading...</div>;
    }
    // Ensure gameData exists before rendering the page
    if (!gameData) return <div>No game data available.</div>;
  
    if (error) {
      return <div>{error}</div>;
    }
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-purple-800 text-white p-10 flex flex-col items-center font-sans ">


     <Dashboard>
   
     </Dashboard>
     <div className="space-y-8 mt-10">
        
     
  <div className="flex flex-col items-center mb-12 ">
  <h2 className="text-4xl text-white font-extrabold tracking-widest mb-6 font-['Rajdhani'] uppercase">
    Week {gameData.WEEK}
  </h2>
  </div>

  <div className="w-full max-w-[1075px]">
  <div className="flex items-center justify-center gap-12 bg-gray-800 px-10 py-4 rounded-2xl shadow-xl">
      {/* Team 1 */}
      <div className="flex items-center gap-4">
        <img
          src={gameData.team_stats[0].TEAM.TEAM_LOGO}
          alt={`${gameData.team_stats[0].TEAM.TEAM_NAME} logo`}
          className="h-14 w-14 object-contain"
        />
        <div className="flex flex-col items-start">
          <span className="text-2xl font-bold font-['Rajdhani'] tracking-wide">
            {gameData.team_stats[0].TEAM.TEAM_NAME}
          </span>
          <span className="text-2xl font-extrabold text-white-300 font-['Rajdhani']">
            {gameData.team_stats[0].SCORE}
          </span>
        </div>
      </div>

      {/* VS */}
      <span className="text-3xl font-extrabold tracking-widest font-['Rajdhani'] text-white">
        VS
      </span>

      {/* Team 2 */}
      <div className="flex items-center gap-4">
        <img
          src={gameData.team_stats[1].TEAM.TEAM_LOGO}
          alt={`${gameData.team_stats[1].TEAM.TEAM_NAME} logo`}
          className="h-14 w-14 object-contain"
        />
        <div className="flex flex-col items-start">
          <span className="text-2xl font-bold font-['Rajdhani'] tracking-wide">
            {gameData.team_stats[1].TEAM.TEAM_NAME}
          </span>
          <span className="text-2xl font-extrabold text-white-300 font-['Rajdhani']">
            {gameData.team_stats[1].SCORE}
          </span>
        </div>
      </div>
    </div>
  </div>





<div className="bg-gray-800 border border-white/10 rounded-xl p-6 shadow-xl space-y-12 w-full max-w-[1600px]">
{/* Team Stats */}
<div className="flex flex-col items-center">
<div className="text-center mb-6">
    <h2 className="text-3xl font-extrabold font-['Rajdhani'] tracking-wider uppercase">
        Team Stats 
    </h2>
    </div>
  
  <div className="overflow-x-auto w-full max-w-5xl">
    <table className="w-full text-sm text-left border-collapse bg-gray-800 text-gray-100">
      <thead>
        <tr className="bg-gray-900 text-xs uppercase tracking-wider border-b border-gray-700">
          <th className="p-3">Team</th>
          <th className="p-3">Score</th>
          <th className="p-3">Opp Score</th>
          <th className="p-3">Total Yards</th>
          <th className="p-3">Pass Yards</th>
          <th className="p-3">Rush Yards</th>
          <th className="p-3">Total TDs</th>
          <th className="p-3">Pass TDs</th>
          <th className="p-3">Rush TDs</th>
          <th className="p-3">EPA</th>
          <th className="p-3">Success Rate</th>
          <th className="p-3">Plays</th>
          <th className="p-3">Pass Att</th>
          <th className="p-3">Rush Att</th>
          <th className="p-3">Sacks</th>
          <th className="p-3">INTs</th>
          <th className="p-3">Fumbles Lost</th>
          <th className="p-3">Pen Yards</th>
          <th className="p-3">3rd Down Conv</th>
          <th className="p-3">4th Down Conv</th>
          <th className="p-3">Win Prob</th>
        </tr>
      </thead>
      <tbody>
        {gameData.team_stats.map((team, index) => (
          <tr key={index} className="border-b border-gray-700 hover:bg-gray-700">
            <td className="p-3 flex items-center space-x-3 min-w-[180px]">
              <img src={team.TEAM.TEAM_LOGO} alt={team.TEAM.TEAM_ABR} className="w-8 h-8 object-contain" />
              <span className="whitespace-nowrap">{team.TEAM.TEAM_NAME}</span>
            </td>
            <td className="p-3">{team.SCORE}</td>
            <td className="p-3">{team.OPPONENT_SCORE}</td>
            <td className="p-3">{team.TOTAL_YARDS}</td>
            <td className="p-3">{team.TOTAL_PASS_YARDS}</td>
            <td className="p-3">{team.TOTAL_RUSH_YARDS}</td>
            <td className="p-3">{team.TOTAL_TDS}</td>
            <td className="p-3">{team.PASSING_TDS}</td>
            <td className="p-3">{team.RUSHING_TDS}</td>
            <td className="p-3">{team.AVG_EPA?.toFixed(2)}</td>
            <td className="p-3">{(team.SUCCESS_RATE * 100).toFixed(1)}%</td>
            <td className="p-3">{team.NUM_PLAYS}</td>
            <td className="p-3">{team.PASS_ATTEMPTS}</td>
            <td className="p-3">{team.RUSH_ATTEMPTS}</td>
            <td className="p-3">{team.SACKS}</td>
            <td className="p-3">{team.INTERCEPTIONS}</td>
            <td className="p-3">{team.FUMBLES_LOST}</td>
            <td className="p-3">{team.TOTAL_PENALTY_YARDS}</td>
            <td className="p-3">{team.THIRD_DOWN_CONVERTED}</td>
            <td className="p-3">{team.FOURTH_DOWN_CONVERTED}</td>
            <td className="p-3">{(team.WP * 100).toFixed(1)}%</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
</div>
</div>



  <div className="bg-gray-800 border border-white/10 rounded-xl p-6 shadow-xl space-y-12 w-full max-w-[1600px]">
  <div className="text-center mb-6">
  <h2 className="text-3xl font-extrabold font-['Rajdhani'] tracking-wider uppercase">
    Top Player Performances — {gameData.HOME_TEAM}
  </h2>
</div>
  {/* Quarterbacks */}
  <div className="flex flex-col items-center">
    <h2 className="text-2xl font-bold text-center mb-4">Quarterbacks</h2>
    <div className="overflow-x-auto w-full max-w-5xl">
      <table className="w-full text-sm text-left border-collapse bg-gray-800 text-gray-100">
        <thead>
        <tr className="bg-gray-900 text-xs uppercase tracking-wider border-b border-gray-700">
  <th className="p-3">Player</th>
  <th className="p-3">Cmp</th>
  <th className="p-3">Att</th>
  <th className="p-3">Yds</th>
  <th className="p-3">TD</th>
  <th className="p-3">Fantasy</th>
  <th className="p-3">Int</th>
  <th className="p-3">Sacks</th>
  <th className="p-3">Sack Yds</th>
  <th className="p-3">Passer Rating</th>
  <th className="p-3">Completion %</th>
  <th className="p-3">Rush Yds</th>
  <th className="p-3">Rush TD</th>
  <th className="p-3">Rush Yards Before Contact</th>
  <th className="p-3">Rush Yards After Contact</th>
  <th className="p-3">Rush Broken Tackles</th>
  <th className="p-3">Passing EPA</th>
  <th className="p-3">Passing Air Yards</th>
  <th className="p-3">Passing YAC</th>
  <th className="p-3">Passing First Downs</th>
  <th className="p-3">PACR</th>
  <th className="p-3">Dakota</th>
  <th className="p-3">Passing Drops</th>
  <th className="p-3">Passing Bad Throws</th>
  <th className="p-3">Avg Time to Throw</th>
  <th className="p-3">Aggressiveness</th>
  <th className="p-3">Times Pressured</th>
  <th className="p-3">Times Sacked</th>
  <th className="p-3">Times Blitzed</th>
</tr>
</thead>
<tbody>
  {quarterbackStats
    .filter((qb) => qb.RECENT_TEAM === gameData.HOME_TEAM)
    .map((qb) => (
      <tr key={qb.PLAYER_NAME} className="border-b border-gray-700 hover:bg-gray-700">
        <td className="p-3 flex items-center space-x-3 min-w-[200px]">
        <img src={qb.HEADSHOT_URL} alt={qb.PLAYER_NAME} className="w-8 h-8 rounded-full object-cover shrink-0" />
        <span className="whitespace-nowrap">{qb.PLAYER_NAME}</span>
        </td>
        <td className="p-3">{qb.COMPLETIONS}</td>
        <td className="p-3">{qb.ATTEMPTS}</td>
        <td className="p-3">{qb.PASSING_YARDS}</td>
        <td className="p-3">{qb.PASSING_TDS}</td>
        <td className="p-3">{qb.FANTASY_POINTS?.toFixed(1)}</td>
        <td className="p-3">{qb.INTERCEPTIONS}</td>
        <td className="p-3">{qb.SACKS}</td>
        <td className="p-3">{qb.SACK_YARDS}</td>
        <td className="p-3">{qb.PASSER_RATING}</td>
        <td className="p-3">{qb.COMPLETION_PERCENTAGE?.toFixed(1)}%</td>
        <td className="p-3">{qb.RUSHING_YARDS}</td>
        <td className="p-3">{qb.RUSHING_TDS}</td>
        <td className="p-3">{qb.RUSHING_YARDS_BEFORE_CONTACT}</td>
        <td className="p-3">{qb.RUSHING_YARDS_AFTER_CONTACT}</td>
        <td className="p-3">{qb.RUSHING_BROKEN_TACKLES}</td>
        <td className="p-3">{qb.PASSING_EPA}</td>
        <td className="p-3">{qb.PASSING_AIR_YARDS}</td>
        <td className="p-3">{qb.PASSING_YARDS_AFTER_CATCH}</td>
        <td className="p-3">{qb.PASSING_FIRST_DOWNS}</td>
        <td className="p-3">{qb.PACR}</td>
        <td className="p-3">{qb.DAKOTA}</td>
        <td className="p-3">{qb.PASSING_DROPS}</td>
        <td className="p-3">{qb.PASSING_BAD_THROWS}</td>
        <td className="p-3">{qb.AVG_TIME_TO_THROW}</td>
        <td className="p-3">{qb.AGGRESSIVENESS}</td>
        <td className="p-3">{qb.TIMES_PRESSURED}</td>
        <td className="p-3">{qb.TIMES_SACKED}</td>
        <td className="p-3">{qb.TIMES_BLITZED}</td>
      </tr>
    ))}
</tbody>
      </table>
    </div>
  </div>

  {/* Running Backs */}
<div className="flex flex-col items-center">
  <h2 className="text-2xl font-bold text-center mb-4">Running Backs</h2>
  <div className="overflow-x-auto w-full max-w-5xl">
    <table className="w-3/4 text-sm text-left border-collapse bg-gray-800 text-gray-100">
      <thead>
      <tr className="bg-gray-900 text-xs uppercase tracking-wider border-b border-gray-700">
          <th className="p-3">Player</th>
          <th className="p-3">Carries</th>
          <th className="p-3">Rush Yds</th>
          <th className="p-3">Yds/Carry</th>
          <th className="p-3">Rush TD</th>
          <th className="p-3">Rush Fumbles</th>
          <th className="p-3">Rush Fumbles Lost</th>
          <th className="p-3">First Downs</th>
          <th className="p-3">Rushing EPA</th>
          <th className="p-3">2PT Conversions</th>
          <th className="p-3">Receptions</th>
          <th className="p-3">Targets</th>
          <th className="p-3">Rec Yards</th>
          <th className="p-3">Rec TDs</th>
          <th className="p-3">Rec Fumbles</th>
          <th className="p-3">Rec Fumbles Lost</th>
          <th className="p-3">Air Yards</th>
          <th className="p-3">YAC</th>
          <th className="p-3">Fantasy Points</th>
          <th className="p-3">Fantasy PPR</th>
          <th className="p-3">Yards Before Contact</th>
          <th className="p-3">Yards After Contact</th>
          <th className="p-3">Broken Tackles</th>
          <th className="p-3">Efficiency</th>
          <th className="p-3">Attempts vs 8+ Defenders</th>
          <th className="p-3">Avg Time to Loss</th>
          <th className="p-3">Expected Rush Yards</th>
          <th className="p-3">Rush Yds Over Expected</th>
          <th className="p-3">Rush Pct Over Expected</th>
        </tr>
      </thead>
      <tbody>
        {runningbackStats
          .filter((rb) => rb.RECENT_TEAM === gameData.HOME_TEAM)
          .map((rb) => (
            <tr key={rb.PLAYER_NAME} className="border-b border-gray-700 hover:bg-gray-700">
              <td className="p-3 flex items-center space-x-3 min-w-[200px]">
                <img src={rb.HEADSHOT_URL} alt={rb.PLAYER_NAME} className="w-8 h-8 rounded-full object-cover" />
                <span>{rb.PLAYER_NAME}</span>
              </td>
              <td className="p-3">{rb.CARRIES}</td>
              <td className="p-3">{rb.RUSHING_YARDS}</td>
              <td className="p-3">{(rb.RUSHING_YARDS / rb.CARRIES)?.toFixed(2)}</td> {/* Yards per carry */}
              <td className="p-3">{rb.RUSHING_TDS}</td>
              <td className="p-3">{rb.RUSHING_FUMBLES}</td>
              <td className="p-3">{rb.RUSHING_FUMBLES_LOST}</td>
              <td className="p-3">{rb.RUSHING_FIRST_DOWNS}</td>
              <td className="p-3">{rb.RUSHING_EPA}</td>
              <td className="p-3">{rb.RUSHING_2PT_CONVERSIONS}</td>
              <td className="p-3">{rb.RECEPTIONS}</td>
              <td className="p-3">{rb.TARGETS}</td>
              <td className="p-3">{rb.RECEIVING_YARDS}</td>
              <td className="p-3">{rb.RECEIVING_TDS}</td>
              <td className="p-3">{rb.RECEIVING_FUMBLES}</td>
              <td className="p-3">{rb.RECEIVING_FUMBLES_LOST}</td>
              <td className="p-3">{rb.RECEIVING_AIR_YARDS}</td>
              <td className="p-3">{rb.RECEIVING_YARDS_AFTER_CATCH}</td>
              <td className="p-3">{rb.FANTASY_POINTS?.toFixed(1)}</td>
              <td className="p-3">{rb.FANTASY_POINTS_PPR?.toFixed(1)}</td>
              <td className="p-3">{rb.RUSHING_YARDS_BEFORE_CONTACT}</td>
              <td className="p-3">{rb.RUSHING_YARDS_AFTER_CONTACT}</td>
              <td className="p-3">{rb.RUSHING_BROKEN_TACKLES}</td>
              <td className="p-3">{rb.EFFICIENCY?.toFixed(2)}</td>
              <td className="p-3">{rb.PERCENT_ATTEMPTS_GTE_EIGHT_DEFENDERS?.toFixed(2)}</td>
              <td className="p-3">{rb.AVG_TIME_TO_LOS?.toFixed(2)}</td>
              <td className="p-3">{rb.EXPECTED_RUSH_YARDS?.toFixed(1)}</td>
              <td className="p-3">{rb.RUSH_YARDS_OVER_EXPECTED?.toFixed(1)}</td>
              <td className="p-3">{rb.RUSH_PCT_OVER_EXPECTED?.toFixed(1)}</td>
            </tr>
          ))}
      </tbody>
    </table>
  </div>
</div>


  {/* Receivers */}
<h2 className="text-2xl font-bold text-center mb-4">Receivers</h2>

{/* Wrap the table with overflow-x-auto */}
<div className="overflow-x-auto w-full max-w-5xl">
  <table className="w-full text-sm text-left border-collapse bg-gray-800 text-gray-100">
    <thead>
      <tr className="bg-gray-900 text-xs uppercase tracking-wider border-b border-gray-700">
        <th className="p-3">Player</th>
        <th className="p-3">Rec</th>
        <th className="p-3">Targets</th>
        <th className="p-3">Yards</th>
        <th className="p-3">TD</th>
        <th className="p-3">Fantasy</th>
        <th className="p-3">YAC</th>
        <th className="p-3">First Downs</th>
        <th className="p-3">2PT Conversions</th>
        <th className="p-3">Fumbles</th>
        <th className="p-3">Fumbles Lost</th>
        <th className="p-3">Air Yards</th>
        <th className="p-3">Broken Tackles</th>
        <th className="p-3">Target Share</th>
        <th className="p-3">RACR</th>
        <th className="p-3">WOPR</th>
        <th className="p-3">Cushion</th>
        <th className="p-3">Separation</th>
        <th className="p-3">Intended Air Yards</th>
        <th className="p-3">Intended Air Yard Share</th>
        <th className="p-3">YAC Above Expectation</th>
        <th className="p-3">EPA</th>
        <th className="p-3">Broken Tackles</th>
        <th className="p-3">Receiving RAT</th>
        <th className="p-3">Special Teams TD</th>
      </tr>
    </thead>
    <tbody>
      {receiverStats
        .filter((wr) => wr.RECENT_TEAM === gameData.HOME_TEAM)
        .map((wr) => (
          <tr key={wr.PLAYER_NAME} className="border-b border-gray-700 hover:bg-gray-700">
        <td className="p-3 flex items-center space-x-3 min-w-[200px]">
              <img src={wr.HEADSHOT_URL} alt={wr.PLAYER_NAME} className="w-8 h-8 rounded-full object-cover" />
              <span>{wr.PLAYER_NAME}</span>
            </td>
            <td className="p-3">{wr.RECEPTIONS}</td>
            <td className="p-3">{wr.TARGETS}</td>
            <td className="p-3">{wr.RECEIVING_YARDS}</td>
            <td className="p-3">{wr.RECEIVING_TDS}</td>
            <td className="p-3">{wr.FANTASY_POINTS?.toFixed(1)}</td>
            <td className="p-3">{wr.RECEIVING_YARDS_AFTER_CATCH}</td>
            <td className="p-3">{wr.RECEIVING_FIRST_DOWNS}</td>
            <td className="p-3">{wr.RECEIVING_2PT_CONVERSIONS}</td>
            <td className="p-3">{wr.RECEIVING_FUMBLES}</td>
            <td className="p-3">{wr.RECEIVING_FUMBLES_LOST}</td>
            <td className="p-3">{wr.RECEIVING_AIR_YARDS}</td>
            <td className="p-3">{wr.RECEIVING_BROKEN_TACKLES}</td>
            <td className="p-3">{wr.TARGET_SHARE?.toFixed(2)}</td>
            <td className="p-3">{wr.RACR?.toFixed(2)}</td>
            <td className="p-3">{wr.WOPR?.toFixed(2)}</td>
            <td className="p-3">{wr.AVG_CUSHION?.toFixed(2)}</td>
            <td className="p-3">{wr.AVG_SEPARATION?.toFixed(2)}</td>
            <td className="p-3">{wr.AVG_INTENDED_AIR_YARDS?.toFixed(2)}</td>
            <td className="p-3">{wr.PERCENT_SHARE_OF_INTENDED_AIR_YARDS?.toFixed(2)}</td>
            <td className="p-3">{wr.AVG_YAC_ABOVE_EXPECTATION?.toFixed(2)}</td>
            <td className="p-3">{wr.RECEIVING_EPA?.toFixed(2)}</td>
            <td className="p-3">{wr.RECEIVING_BROKEN_TACKLES}</td>
            <td className="p-3">{wr.RECEIVING_RAT?.toFixed(2)}</td>
            <td className="p-3">{wr.SPECIAL_TEAMS_TDS}</td>
          </tr>
        ))}
    </tbody>
  </table>

  </div>
</div>

<div className="space-y-8">
  <div className="bg-gray-800 border border-white/10 rounded-xl p-6 shadow-xl space-y-12 w-full max-w-[1600px]">
  
  <div className="text-center mb-6">
    <h2 className="text-3xl font-extrabold font-['Rajdhani'] tracking-wider uppercase">
        Top Player Performances — {gameData.AWAY_TEAM}
    </h2>
    </div>
  
    {/* Quarterbacks - Away Team */}
    <div className="flex flex-col items-center">
      <h2 className="text-2xl font-bold text-center mb-4">Quarterbacks</h2>
      <div className="overflow-x-auto w-full max-w-5xl">
        <table className="w-full text-sm text-left border-collapse bg-gray-800 text-gray-100">
          <thead>
            <tr className="bg-gray-900 text-xs uppercase tracking-wider border-b border-gray-700">
              <th className="p-3">Player</th>
              <th className="p-3">Cmp</th>
              <th className="p-3">Att</th>
              <th className="p-3">Yds</th>
              <th className="p-3">TD</th>
              <th className="p-3">Fantasy</th>
              <th className="p-3">Int</th>
              <th className="p-3">Sacks</th>
              <th className="p-3">Sack Yds</th>
              <th className="p-3">Passer Rating</th>
              <th className="p-3">Completion %</th>
              <th className="p-3">Rush Yds</th>
              <th className="p-3">Rush TD</th>
              <th className="p-3">Rush Yards Before Contact</th>
              <th className="p-3">Rush Yards After Contact</th>
              <th className="p-3">Rush Broken Tackles</th>
              <th className="p-3">Passing EPA</th>
              <th className="p-3">Passing Air Yards</th>
              <th className="p-3">Passing YAC</th>
              <th className="p-3">Passing First Downs</th>
              <th className="p-3">PACR</th>
              <th className="p-3">Dakota</th>
              <th className="p-3">Passing Drops</th>
              <th className="p-3">Passing Bad Throws</th>
              <th className="p-3">Avg Time to Throw</th>
              <th className="p-3">Aggressiveness</th>
              <th className="p-3">Times Pressured</th>
              <th className="p-3">Times Sacked</th>
              <th className="p-3">Times Blitzed</th>
            </tr>
          </thead>
          <tbody>
            {quarterbackStats
              .filter((qb) => qb.RECENT_TEAM === gameData.AWAY_TEAM)
              .map((qb) => (
                <tr key={qb.PLAYER_NAME} className="border-b border-gray-700 hover:bg-gray-700">
                  <td className="p-3 flex items-center space-x-3 min-w-[200px]">
                    <img src={qb.HEADSHOT_URL} alt={qb.PLAYER_NAME} className="w-8 h-8 rounded-full object-cover shrink-0" />
                    <span className="whitespace-nowrap">{qb.PLAYER_NAME}</span>
                  </td>
                  <td className="p-3">{qb.COMPLETIONS}</td>
                  <td className="p-3">{qb.ATTEMPTS}</td>
                  <td className="p-3">{qb.PASSING_YARDS}</td>
                  <td className="p-3">{qb.PASSING_TDS}</td>
                  <td className="p-3">{qb.FANTASY_POINTS?.toFixed(1)}</td>
                  <td className="p-3">{qb.INTERCEPTIONS}</td>
                  <td className="p-3">{qb.SACKS}</td>
                  <td className="p-3">{qb.SACK_YARDS}</td>
                  <td className="p-3">{qb.PASSER_RATING}</td>
                  <td className="p-3">{qb.COMPLETION_PERCENTAGE?.toFixed(1)}%</td>
                  <td className="p-3">{qb.RUSHING_YARDS}</td>
                  <td className="p-3">{qb.RUSHING_TDS}</td>
                  <td className="p-3">{qb.RUSHING_YARDS_BEFORE_CONTACT}</td>
                  <td className="p-3">{qb.RUSHING_YARDS_AFTER_CONTACT}</td>
                  <td className="p-3">{qb.RUSHING_BROKEN_TACKLES}</td>
                  <td className="p-3">{qb.PASSING_EPA}</td>
                  <td className="p-3">{qb.PASSING_AIR_YARDS}</td>
                  <td className="p-3">{qb.PASSING_YARDS_AFTER_CATCH}</td>
                  <td className="p-3">{qb.PASSING_FIRST_DOWNS}</td>
                  <td className="p-3">{qb.PACR}</td>
                  <td className="p-3">{qb.DAKOTA}</td>
                  <td className="p-3">{qb.PASSING_DROPS}</td>
                  <td className="p-3">{qb.PASSING_BAD_THROWS}</td>
                  <td className="p-3">{qb.AVG_TIME_TO_THROW}</td>
                  <td className="p-3">{qb.AGGRESSIVENESS}</td>
                  <td className="p-3">{qb.TIMES_PRESSURED}</td>
                  <td className="p-3">{qb.TIMES_SACKED}</td>
                  <td className="p-3">{qb.TIMES_BLITZED}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>

    {/* Running Backs - Away Team */}
    <div className="flex flex-col items-center">
      <h2 className="text-2xl font-bold text-center mb-4">Running Backs </h2>
      <div className="overflow-x-auto w-full max-w-5xl">
        <table className="w-3/4 text-sm text-left border-collapse bg-gray-800 text-gray-100">
          <thead>
            <tr className="bg-gray-900 text-xs uppercase tracking-wider border-b border-gray-700">
              <th className="p-3">Player</th>
              <th className="p-3">Carries</th>
              <th className="p-3">Rush Yds</th>
              <th className="p-3">Yds/Carry</th>
              <th className="p-3">Rush TD</th>
              <th className="p-3">Rush Fumbles</th>
              <th className="p-3">Rush Fumbles Lost</th>
              <th className="p-3">First Downs</th>
              <th className="p-3">Rushing EPA</th>
              <th className="p-3">2PT Conversions</th>
              <th className="p-3">Receptions</th>
              <th className="p-3">Targets</th>
              <th className="p-3">Rec Yards</th>
              <th className="p-3">Rec TDs</th>
              <th className="p-3">Rec Fumbles</th>
              <th className="p-3">Rec Fumbles Lost</th>
              <th className="p-3">Air Yards</th>
              <th className="p-3">YAC</th>
              <th className="p-3">Fantasy Points</th>
              <th className="p-3">Fantasy PPR</th>
              <th className="p-3">Yards Before Contact</th>
              <th className="p-3">Yards After Contact</th>
              <th className="p-3">Broken Tackles</th>
              <th className="p-3">Efficiency</th>
              <th className="p-3">Attempts vs 8+ Defenders</th>
              <th className="p-3">Avg Time to Loss</th>
              <th className="p-3">Expected Rush Yards</th>
              <th className="p-3">Rush Yds Over Expected</th>
              <th className="p-3">Rush Pct Over Expected</th>
            </tr>
          </thead>
          <tbody>
            {runningbackStats
              .filter((rb) => rb.RECENT_TEAM === gameData.AWAY_TEAM)
              .map((rb) => (
                <tr key={rb.PLAYER_NAME} className="border-b border-gray-700 hover:bg-gray-700">
                  <td className="p-3 flex items-center space-x-3 min-w-[200px]">
                    <img src={rb.HEADSHOT_URL} alt={rb.PLAYER_NAME} className="w-8 h-8 rounded-full object-cover shrink-0" />
                    <span className="whitespace-nowrap">{rb.PLAYER_NAME}</span>
                  </td>
                  <td className="p-3">{rb.CARRIES}</td>
              <td className="p-3">{rb.RUSHING_YARDS}</td>
              <td className="p-3">{(rb.RUSHING_YARDS / rb.CARRIES)?.toFixed(2)}</td> {/* Yards per carry */}
              <td className="p-3">{rb.RUSHING_TDS}</td>
              <td className="p-3">{rb.RUSHING_FUMBLES}</td>
              <td className="p-3">{rb.RUSHING_FUMBLES_LOST}</td>
              <td className="p-3">{rb.RUSHING_FIRST_DOWNS}</td>
              <td className="p-3">{rb.RUSHING_EPA}</td>
              <td className="p-3">{rb.RUSHING_2PT_CONVERSIONS}</td>
              <td className="p-3">{rb.RECEPTIONS}</td>
              <td className="p-3">{rb.TARGETS}</td>
              <td className="p-3">{rb.RECEIVING_YARDS}</td>
              <td className="p-3">{rb.RECEIVING_TDS}</td>
              <td className="p-3">{rb.RECEIVING_FUMBLES}</td>
              <td className="p-3">{rb.RECEIVING_FUMBLES_LOST}</td>
              <td className="p-3">{rb.RECEIVING_AIR_YARDS}</td>
              <td className="p-3">{rb.RECEIVING_YARDS_AFTER_CATCH}</td>
              <td className="p-3">{rb.FANTASY_POINTS?.toFixed(1)}</td>
              <td className="p-3">{rb.FANTASY_POINTS_PPR?.toFixed(1)}</td>
              <td className="p-3">{rb.RUSHING_YARDS_BEFORE_CONTACT}</td>
              <td className="p-3">{rb.RUSHING_YARDS_AFTER_CONTACT}</td>
              <td className="p-3">{rb.RUSHING_BROKEN_TACKLES}</td>
              <td className="p-3">{rb.EFFICIENCY?.toFixed(2)}</td>
              <td className="p-3">{rb.PERCENT_ATTEMPTS_GTE_EIGHT_DEFENDERS?.toFixed(2)}</td>
              <td className="p-3">{rb.AVG_TIME_TO_LOS?.toFixed(2)}</td>
              <td className="p-3">{rb.EXPECTED_RUSH_YARDS?.toFixed(1)}</td>
              <td className="p-3">{rb.RUSH_YARDS_OVER_EXPECTED?.toFixed(1)}</td>
              <td className="p-3">{rb.RUSH_PCT_OVER_EXPECTED?.toFixed(1)}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>

    {/* Receivers */}
<h2 className="text-2xl font-bold text-center mb-4">Receivers</h2>

{/* Wrap the table with overflow-x-auto */}
<div className="overflow-x-auto w-full max-w-5xl">
  <table className="w-full text-sm text-left border-collapse bg-gray-800 text-gray-100">
    <thead>
      <tr className="bg-gray-900 text-xs uppercase tracking-wider border-b border-gray-700">
        <th className="p-3">Player</th>
        <th className="p-3">Rec</th>
        <th className="p-3">Targets</th>
        <th className="p-3">Yards</th>
        <th className="p-3">TD</th>
        <th className="p-3">Fantasy</th>
        <th className="p-3">YAC</th>
        <th className="p-3">First Downs</th>
        <th className="p-3">2PT Conversions</th>
        <th className="p-3">Fumbles</th>
        <th className="p-3">Fumbles Lost</th>
        <th className="p-3">Air Yards</th>
        <th className="p-3">Broken Tackles</th>
        <th className="p-3">Target Share</th>
        <th className="p-3">RACR</th>
        <th className="p-3">WOPR</th>
        <th className="p-3">Cushion</th>
        <th className="p-3">Separation</th>
        <th className="p-3">Intended Air Yards</th>
        <th className="p-3">Intended Air Yard Share</th>
        <th className="p-3">YAC Above Expectation</th>
        <th className="p-3">EPA</th>
        <th className="p-3">Broken Tackles</th>
        <th className="p-3">Receiving RAT</th>
        <th className="p-3">Special Teams TD</th>
      </tr>
    </thead>
    <tbody>
      {receiverStats
        .filter((wr) => wr.RECENT_TEAM === gameData.AWAY_TEAM)
        .map((wr) => (
          <tr key={wr.PLAYER_NAME} className="border-b border-gray-700 hover:bg-gray-700">
        <td className="p-3 flex items-center space-x-3 min-w-[200px]">
              <img src={wr.HEADSHOT_URL} alt={wr.PLAYER_NAME} className="w-8 h-8 rounded-full object-cover" />
              <span>{wr.PLAYER_NAME}</span>
            </td>
            <td className="p-3">{wr.RECEPTIONS}</td>
            <td className="p-3">{wr.TARGETS}</td>
            <td className="p-3">{wr.RECEIVING_YARDS}</td>
            <td className="p-3">{wr.RECEIVING_TDS}</td>
            <td className="p-3">{wr.FANTASY_POINTS?.toFixed(1)}</td>
            <td className="p-3">{wr.RECEIVING_YARDS_AFTER_CATCH}</td>
            <td className="p-3">{wr.RECEIVING_FIRST_DOWNS}</td>
            <td className="p-3">{wr.RECEIVING_2PT_CONVERSIONS}</td>
            <td className="p-3">{wr.RECEIVING_FUMBLES}</td>
            <td className="p-3">{wr.RECEIVING_FUMBLES_LOST}</td>
            <td className="p-3">{wr.RECEIVING_AIR_YARDS}</td>
            <td className="p-3">{wr.RECEIVING_BROKEN_TACKLES}</td>
            <td className="p-3">{wr.TARGET_SHARE?.toFixed(2)}</td>
            <td className="p-3">{wr.RACR?.toFixed(2)}</td>
            <td className="p-3">{wr.WOPR?.toFixed(2)}</td>
            <td className="p-3">{wr.AVG_CUSHION?.toFixed(2)}</td>
            <td className="p-3">{wr.AVG_SEPARATION?.toFixed(2)}</td>
            <td className="p-3">{wr.AVG_INTENDED_AIR_YARDS?.toFixed(2)}</td>
            <td className="p-3">{wr.PERCENT_SHARE_OF_INTENDED_AIR_YARDS?.toFixed(2)}</td>
            <td className="p-3">{wr.AVG_YAC_ABOVE_EXPECTATION?.toFixed(2)}</td>
            <td className="p-3">{wr.RECEIVING_EPA?.toFixed(2)}</td>
            <td className="p-3">{wr.RECEIVING_BROKEN_TACKLES}</td>
            <td className="p-3">{wr.RECEIVING_RAT?.toFixed(2)}</td>
            <td className="p-3">{wr.SPECIAL_TEAMS_TDS}</td>
          </tr>
        ))}
    </tbody>
  </table>
  </div>
</div>





  </div>
</div>
  </div>
  );
}
