/*
 * This React component fetches and displays weekly running stats based on the player ID from the URL. It retrieves player statistics 
 * through an API request, handles loading and error states, and presents the data in a table format. If no stats are found, a message is displayed. 
 * The component also includes sticky breadcrumb navigation for easy navigation.
 *
 * I used ChatGPT to help me format this page and get it connected to my flask route. I had developed these routes 
 * and had plenty of familiarity with them. After making the qb page, I simply copied the framework from that over to this page and
 * got some help from chat gpt generating new types and table columns. This greatly speed up the process of implementing these pages
 * since they were all so similar just displaying different positions and columns.
 *
 * Chat Link: https://chatgpt.com/share/68030ca6-ca1c-800f-bed1-19bf6cd02b0a
*/
'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import axios from 'axios';
import Link from "next/link";

interface RBGameStats {
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
  
    // Rushing stats
    CARRIES: number;
    RUSHING_YARDS: number;
    RUSHING_TDS: number;
    RUSHING_FUMBLES: number;
    RUSHING_FUMBLES_LOST: number;
    RUSHING_FIRST_DOWNS: number;
    RUSHING_EPA: number;
    RUSHING_2PT_CONVERSIONS: number;
  
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
  
    // Fantasy stats
    FANTASY_POINTS: number;
    FANTASY_POINTS_PPR: number;
  
    // Advanced rushing metrics
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
  }
  

const RBPlayerStats = () => {
    const { PLAYER_ID } = useParams();
    const playerId = PLAYER_ID as string;
  
    const [weeklyStats, setWeeklyStats] = useState<RBGameStats[]>([]);
    const [playerName, setPlayerName] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      if (playerId) {
        axios
          .get(`https://betterpicks-demo.onrender.com/rb/stats/${playerId}`)
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

      {/* RB Stats Table */}
<table className="min-w-full text-sm text-left border-collapse bg-gray-800 text-gray-100">
  <thead>
    <tr className="bg-gray-900 text-xs uppercase tracking-wider border-b border-gray-700">
      <th className="p-3">Week</th>
      <th className="p-3">Season</th>
      <th className="p-3">Opp</th>
      <th className="p-3">Car</th>
      <th className="p-3">Rush Yds</th>
      <th className="p-3">Rush TD</th>
      <th className="p-3">Rush 1D</th>
      <th className="p-3">Rush EPA</th>
      <th className="p-3">Rush Fum</th>
      <th className="p-3">Rush Fum Lost</th>
      <th className="p-3">Rush YBC</th>
      <th className="p-3">Rush YBC Avg</th>
      <th className="p-3">Rush YAC</th>
      <th className="p-3">Rush YAC Avg</th>
      <th className="p-3">BTK</th>
      <th className="p-3">Eff</th>
      <th className="p-3">% ≥8 Def</th>
      <th className="p-3">Time to LOS</th>
      <th className="p-3">Expected Rush Yds</th>
      <th className="p-3">RYOE</th>
      <th className="p-3">RYOE/Att</th>
      <th className="p-3">% Rush Over Expected</th>
      <th className="p-3">Rec</th>
      <th className="p-3">Tgt</th>
      <th className="p-3">Rec Yds</th>
      <th className="p-3">Rec TD</th>
      <th className="p-3">Rec 1D</th>
      <th className="p-3">Rec EPA</th>
      <th className="p-3">Rec Air Yds</th>
      <th className="p-3">YAC</th>
      <th className="p-3">Rec Fum</th>
      <th className="p-3">Rec Fum Lost</th>
      <th className="p-3">Fantasy</th>
      <th className="p-3">PPR</th>
    </tr>
  </thead>
  <tbody>
    {weeklyStats.map((game, index) => (
      <tr key={index} className="border-b border-gray-700 hover:bg-gray-700">
        <td className="p-3">{game.WEEK}</td>
        <td className="p-3">{game.SEASON}</td>
        <td className="p-3">{game.OPPONENT_TEAM}</td>
        <td className="p-3">{game.CARRIES}</td>
        <td className="p-3">{game.RUSHING_YARDS}</td>
        <td className="p-3">{game.RUSHING_TDS}</td>
        <td className="p-3">{game.RUSHING_FIRST_DOWNS}</td>
        <td className="p-3">{game.RUSHING_EPA?.toFixed(2)}</td>
        <td className="p-3">{game.RUSHING_FUMBLES}</td>
        <td className="p-3">{game.RUSHING_FUMBLES_LOST}</td>
        <td className="p-3">{game.RUSHING_YARDS_BEFORE_CONTACT}</td>
        <td className="p-3">{game.RUSHING_YARDS_BEFORE_CONTACT_AVG?.toFixed(2)}</td>
        <td className="p-3">{game.RUSHING_YARDS_AFTER_CONTACT}</td>
        <td className="p-3">{game.RUSHING_YARDS_AFTER_CONTACT_AVG?.toFixed(2)}</td>
        <td className="p-3">{game.RUSHING_BROKEN_TACKLES}</td>
        <td className="p-3">{game.EFFICIENCY?.toFixed(2)}</td>
        <td className="p-3">{game.PERCENT_ATTEMPTS_GTE_EIGHT_DEFENDERS?.toFixed(1)}%</td>
        <td className="p-3">{game.AVG_TIME_TO_LOS?.toFixed(2)}</td>
        <td className="p-3">{game.EXPECTED_RUSH_YARDS.toFixed(2)}</td>
        <td className="p-3">{game.RUSH_YARDS_OVER_EXPECTED.toFixed(2)}</td>
        <td className="p-3">{game.RUSH_YARDS_OVER_EXPECTED_PER_ATT?.toFixed(2)}</td>
        <td className="p-3">{game.RUSH_PCT_OVER_EXPECTED?.toFixed(1)}%</td>
        <td className="p-3">{game.RECEPTIONS}</td>
        <td className="p-3">{game.TARGETS}</td>
        <td className="p-3">{game.RECEIVING_YARDS}</td>
        <td className="p-3">{game.RECEIVING_TDS}</td>
        <td className="p-3">{game.RECEIVING_FIRST_DOWNS}</td>
        <td className="p-3">{game.RECEIVING_EPA?.toFixed(2)}</td>
        <td className="p-3">{game.RECEIVING_AIR_YARDS}</td>
        <td className="p-3">{game.RECEIVING_YARDS_AFTER_CATCH}</td>
        <td className="p-3">{game.RECEIVING_FUMBLES}</td>
        <td className="p-3">{game.RECEIVING_FUMBLES_LOST}</td>
        <td className="p-3">{game.FANTASY_POINTS?.toFixed(1)}</td>
        <td className="p-3">{game.FANTASY_POINTS_PPR?.toFixed(1)}</td>
      </tr>
    ))}
  </tbody>
</table>

    </div>
    </div> 
  );
}

export default RBPlayerStats;