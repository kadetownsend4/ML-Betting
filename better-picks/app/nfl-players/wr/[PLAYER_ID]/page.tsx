// ChatGPT helped me format this page and get it connected to my flask route
// https://chatgpt.com/share/68030ca6-ca1c-800f-bed1-19bf6cd02b0a 
'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import axios from 'axios';
import Link from "next/link";

interface WRGameStats {
    // Core player/game info
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
  
    // Receiving stats
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
  }
  

const WRPlayerStats = () => {
    const { PLAYER_ID } = useParams();
    const playerId = PLAYER_ID as string;
  
    const [weeklyStats, setWeeklyStats] = useState<WRGameStats[]>([]);
    const [playerName, setPlayerName] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      if (playerId) {
        axios
          .get(`https://betterpicks-demo.onrender.com/receiving/stats/${playerId}`)
          .then((res) => {
            const data = res.data;
            setWeeklyStats(data);
            if (data.length > 0) setPlayerName(data[0].PLAYER_NAME);
          })
          .catch((err) => {
            console.error('❌ Error fetching QB stats', err);
          })
          .finally(() => setLoading(false));
      }
    }, [playerId]);
  
    if (loading) return <div>Loading player stats...</div>;
    if (!weeklyStats.length) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-green-700 text-white p-8 font-sans">
  {/* Sticky Breadcrumb */}
  <div className="sticky top-0 z-50 bg-gradient-to-r from-black/80 via-green-900/80 to-black/80 backdrop-blur-md py-3 px-4 rounded-b-lg shadow-lg border-b border-white/10 mb-8">
    <div className="text-sm text-gray-400 mb-6">
      <Link href="/" className="hover:text-green-300 transition">
        Home
      </Link>
      <span className="mx-2 text-white">›</span>

      <Link href="/nfl-teams" className="hover:text-green-300 transition">
        NFL Teams
      </Link>

      <span className="text-white font-semibold">{playerName}</span>
    </div>
  </div>

  {/* No stats found message */}
  <div className="text-center p-6 bg-black/80 rounded-lg border border-gray-300 shadow-lg">
    <h2 className="text-2xl font-semibold text-gray-100 mb-4">No stats found for this player</h2>
    <p className="text-gray-400 mb-4">It seems we couldn't find any statistics for the selected player.</p>
    <p className="text-gray-400 mb-4">This means that they did not play much or have enough readily available data.</p>
    {/* Breadcrumb with a link to go back */}
    <div className="mb-4">
      <Link href="/nfl-teams" className="text-green-300 hover:text-green-500 font-medium">
        Go back to NFL Team's list to review other player's stats
      </Link>
    </div>
  </div>
</div>
  );
}

  return  (
    <div className="w-fit mx-auto">
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-purple-700 text-white p-8 font-sans">
         {/* Player Title Section */}
<div className="flex items-center gap-4 mb-12 border-b-2 border-purple-500 pb-4">
  <div className="relative w-[80px] h-[80px] sm:w-[120px] sm:h-[120px]">
    <img
      src={weeklyStats[0]?.HEADSHOT_URL}
      alt={`${playerName}'s headshot`}
      className="w-full h-full object-cover square-full shadow-lg"
    />
  </div>
  <div>
    <h1 className="text-4xl sm:text-5xl font-extrabold text-white-300 tracking-wide uppercase">
      {playerName}
    </h1>
    <p className="text-sm font-extrabold sm:text-base text-white-400 tracking-wide mt-1">
      {weeklyStats[0]?.POSITION} — {weeklyStats[0]?.RECENT_TEAM}
    </p>
  </div>
</div>

 {/* Sticky Breadcrumb */}
 <div className="sticky top-0 z-50 bg-gradient-to-r from-black/80 via-purple-900/80 to-black/80 backdrop-blur-md py-3 px-4 rounded-b-lg shadow-lg border-b border-white/10 mb-8">
            <div className="text-sm text-gray-400 mb-6">
            <Link href="/" className="hover:text-green-300 transition">Home</Link>
            <span className="mx-2 text-white">›</span>

            <Link href="/nfl-teams" className="hover:text-green-300 transition">NFL Teams</Link>
            <span className="mx-2 text-white">›</span>

            <Link
            href={`/nfl-teams/${encodeURIComponent(weeklyStats[0]?.RECENT_TEAM ?? '')}`}
            className="hover:text-green-300 transition"
            >
            {weeklyStats[0]?.RECENT_TEAM}
            </Link>
            <span className="mx-2 text-white">›</span>

            <span className="text-white font-semibold">{playerName}</span>
            </div>
        </div>

        <table className="min-w-full text-sm text-left border-collapse bg-gray-800 text-gray-100">
  <thead>
    <tr className="bg-gray-900 text-xs uppercase tracking-wider border-b border-gray-700">
      <th className="p-2">Week</th>
      <th className="p-2">Season</th>
      <th className="p-2">Player</th>
      <th className="p-2">Team</th>
      <th className="p-2">Opponent</th>
      <th className="p-2">Rec</th>
      <th className="p-2">Targets</th>
      <th className="p-2">Rec Yds</th>
      <th className="p-2">Rec TD</th>
      <th className="p-2">Rec Fum</th>
      <th className="p-2">Fum Lost</th>
      <th className="p-2">Air Yds</th>
      <th className="p-2">YAC</th>
      <th className="p-2">1st Downs</th>
      <th className="p-2">EPA</th>
      <th className="p-2">2PT Convs</th>
      <th className="p-2">RACR</th>
      <th className="p-2">Tgt Share</th>
      <th className="p-2">Air Yds Share</th>
      <th className="p-2">WOPR</th>
      <th className="p-2">ST TD</th>
      <th className="p-2">Fantasy</th>
      <th className="p-2">PPR</th>
      <th className="p-2">Broken Tackles</th>
      <th className="p-2">Drops</th>
      <th className="p-2">Drop %</th>
      <th className="p-2">INT</th>
      <th className="p-2">Rat</th>
      <th className="p-2">Avg Cushion</th>
      <th className="p-2">Avg Separation</th>
      <th className="p-2">Avg Intended Air Yards</th>
      <th className="p-2">Share of Intended Air Yards</th>
      <th className="p-2">Avg YAC</th>
      <th className="p-2">Avg Expected YAC</th>
      <th className="p-2">YAC Above Expectation</th>
    </tr>
  </thead>
  <tbody>
    {weeklyStats.map((game, index) => (
      <tr key={index} className="border-b border-gray-700 hover:bg-gray-700">
        <td className="p-2">{game.WEEK}</td>
        <td className="p-2">{game.SEASON}</td>
        <td className="p-2">{game.PLAYER_NAME}</td>
        <td className="p-2">{game.RECENT_TEAM}</td>
        <td className="p-2">{game.OPPONENT_TEAM}</td>
        <td className="p-2">{game.RECEPTIONS}</td>
        <td className="p-2">{game.TARGETS}</td>
        <td className="p-2">{game.RECEIVING_YARDS}</td>
        <td className="p-2">{game.RECEIVING_TDS}</td>
        <td className="p-2">{game.RECEIVING_FUMBLES}</td>
        <td className="p-2">{game.RECEIVING_FUMBLES_LOST}</td>
        <td className="p-2">{game.RECEIVING_AIR_YARDS}</td>
        <td className="p-2">{game.RECEIVING_YARDS_AFTER_CATCH}</td>
        <td className="p-2">{game.RECEIVING_FIRST_DOWNS}</td>
        <td className="p-2">{game.RECEIVING_EPA?.toFixed(2)}</td>
        <td className="p-2">{game.RECEIVING_2PT_CONVERSIONS}</td>
        <td className="p-2">{game.RACR?.toFixed(2)}</td>
        <td className="p-2">{game.TARGET_SHARE?.toFixed(2)}</td>
        <td className="p-2">{game.AIR_YARDS_SHARE?.toFixed(2)}</td>
        <td className="p-2">{game.WOPR?.toFixed(2)}</td>
        <td className="p-2">{game.SPECIAL_TEAMS_TDS}</td>
        <td className="p-2">{game.FANTASY_POINTS?.toFixed(1)}</td>
        <td className="p-2">{game.FANTASY_POINTS_PPR?.toFixed(1)}</td>
        <td className="p-2">{game.RECEIVING_BROKEN_TACKLES}</td>
        <td className="p-2">{game.RECEIVING_DROP}</td>
        <td className="p-2">{game.RECEIVING_DROP_PCT?.toFixed(2)}%</td>
        <td className="p-2">{game.RECEIVING_INT}</td>
        <td className="p-2">{game.RECEIVING_RAT?.toFixed(2)}</td>
        <td className="p-2">{game.AVG_CUSHION?.toFixed(2)}</td>
        <td className="p-2">{game.AVG_SEPARATION?.toFixed(2)}</td>
        <td className="p-2">{game.AVG_INTENDED_AIR_YARDS?.toFixed(2)}</td>
        <td className="p-2">{game.PERCENT_SHARE_OF_INTENDED_AIR_YARDS?.toFixed(2)}%</td>
        <td className="p-2">{game.AVG_YAC?.toFixed(2)}</td>
        <td className="p-2">{game.AVG_EXPECTED_YAC?.toFixed(2)}</td>
        <td className="p-2">{game.AVG_YAC_ABOVE_EXPECTATION?.toFixed(2)}</td>
      </tr>
    ))}
  </tbody>
</table>


    </div>
    </div> 
  );
}

export default WRPlayerStats;