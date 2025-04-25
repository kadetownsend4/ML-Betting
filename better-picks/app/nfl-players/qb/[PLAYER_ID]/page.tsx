// ChatGPT helped me format this page and get it connected to my flask route
// https://chatgpt.com/share/68030ca6-ca1c-800f-bed1-19bf6cd02b0a 

'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import axios from 'axios';
import Link from "next/link";

interface QBGameStats {
    PLAYER_NAME: string;
    WEEK: number;
    SEASON: number;
    SEASON_TYPE: string;
    RECENT_TEAM: string;
    OPPONENT_TEAM: string;
    POSITION: string;
    HEADSHOT_URL: string;
  
    OFFENSE_SNAPS: number;
    OFFENSE_PCT: number;
  
    COMPLETIONS: number;
    ATTEMPTS: number;
    PASSING_YARDS: number;
    PASSING_TDS: number;
    INTERCEPTIONS: number;
    SACKS: number;
    SACK_YARDS: number;
    PASSER_RATING: number;
    COMPLETION_PERCENTAGE: number;
    PASSING_EPA: number;
    PASSING_AIR_YARDS: number;
    PASSING_YARDS_AFTER_CATCH: number;
    PASSING_FIRST_DOWNS: number;
    PACR: number;
    DAKOTA: number;
  
    FANTASY_POINTS: number;
    FANTASY_POINTS_PPR: number;
  
    CARRIES: number;
    RUSHING_YARDS: number;
    RUSHING_TDS: number;
    RUSHING_FIRST_DOWNS: number;
    RUSHING_EPA: number;
  
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
}

const QBPlayerStats = () => {
    const { PLAYER_ID } = useParams();
    const playerId = PLAYER_ID as string;
  
    const [weeklyStats, setWeeklyStats] = useState<QBGameStats[]>([]);
    const [playerName, setPlayerName] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      if (playerId) {
        axios
          .get(`https://betterpicks-demo.onrender.com/qb/stats/${playerId}`)
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


      {/* Stats Table */}
<table className="min-w-full text-sm text-left border-collapse bg-gray-800 text-gray-100">
  <thead>
    <tr className="bg-gray-900 text-xs uppercase tracking-wider border-b border-gray-700">
      <th className="p-3">Week</th>
      <th className="p-3">Season</th>
      <th className="p-3">Opp</th>
      <th className="p-3">Snaps</th>
      <th className="p-3">Snap%</th>
      <th className="p-3">Cmp/Att</th>
      <th className="p-3">Cmp%</th>
      <th className="p-3">Yds</th>
      <th className="p-3">TD</th>
      <th className="p-3">INT</th>
      <th className="p-3">Rating</th>
      <th className="p-3">EPA</th>
      <th className="p-3">Air Yds</th>
      <th className="p-3">YAC</th>
      <th className="p-3">1D</th>
      <th className="p-3">PACR</th>
      <th className="p-3">DAKOTA</th>
      <th className="p-3">Car</th>
      <th className="p-3">Rush Yds</th>
      <th className="p-3">Rush TD</th>
      <th className="p-3">Rush 1D</th>
      <th className="p-3">Rush EPA</th>
      <th className="p-3">Fantasy</th>
      <th className="p-3">PPR</th>
      <th className="p-3">Drops</th>
      <th className="p-3">Drop%</th>
      <th className="p-3">Bad Throws</th>
      <th className="p-3">Bad Throw%</th>
      <th className="p-3">Time to Throw</th>
      <th className="p-3">CAY</th>
      <th className="p-3">IAY</th>
      <th className="p-3">AY Diff</th>
      <th className="p-3">AGG%</th>
      <th className="p-3">AY to Sticks</th>
      <th className="p-3">Air Dist</th>
      <th className="p-3">Max Air</th>
      <th className="p-3">Sacks</th>
      <th className="p-3">Sack Yds</th>
      <th className="p-3">Times Sacked</th>
      <th className="p-3">Blitzed</th>
      <th className="p-3">Hurried</th>
      <th className="p-3">Hit</th>
      <th className="p-3">Pressured</th>
      <th className="p-3">Press%</th>
    </tr>
  </thead>
  <tbody>
    {weeklyStats.map((game, index) => (
      <tr key={index} className="border-b border-gray-700 hover:bg-gray-700">
        <td className="p-3">{game.WEEK}</td>
        <td className="p-3">{game.SEASON}</td>
        <td className="p-3">{game.OPPONENT_TEAM}</td>
        <td className="p-3">{game.OFFENSE_SNAPS}</td>
        <td className="p-3">{game.OFFENSE_PCT?.toFixed(1)}%</td>
        <td className="p-3">{game.COMPLETIONS}/{game.ATTEMPTS}</td>
        <td className="p-3">{game.COMPLETION_PERCENTAGE?.toFixed(1)}%</td>
        <td className="p-3">{game.PASSING_YARDS}</td>
        <td className="p-3">{game.PASSING_TDS}</td>
        <td className="p-3">{game.INTERCEPTIONS}</td>
        <td className="p-3">{game.PASSER_RATING?.toFixed(1)}</td>
        <td className="p-3">{game.PASSING_EPA?.toFixed(2)}</td>
        <td className="p-3">{game.PASSING_AIR_YARDS}</td>
        <td className="p-3">{game.PASSING_YARDS_AFTER_CATCH}</td>
        <td className="p-3">{game.PASSING_FIRST_DOWNS}</td>
        <td className="p-3">{game.PACR?.toFixed(2)}</td>
        <td className="p-3">{game.DAKOTA?.toFixed(2)}</td>
        <td className="p-3">{game.CARRIES}</td>
        <td className="p-3">{game.RUSHING_YARDS}</td>
        <td className="p-3">{game.RUSHING_TDS}</td>
        <td className="p-3">{game.RUSHING_FIRST_DOWNS}</td>
        <td className="p-3">{game.RUSHING_EPA?.toFixed(2)}</td>
        <td className="p-3">{game.FANTASY_POINTS?.toFixed(1)}</td>
        <td className="p-3">{game.FANTASY_POINTS_PPR?.toFixed(1)}</td>
        <td className="p-3">{game.PASSING_DROPS}</td>
        <td className="p-3">{game.PASSING_DROP_PCT?.toFixed(1)}%</td>
        <td className="p-3">{game.PASSING_BAD_THROWS}</td>
        <td className="p-3">{game.PASSING_BAD_THROW_PCT?.toFixed(1)}%</td>
        <td className="p-3">{game.AVG_TIME_TO_THROW?.toFixed(2)}</td>
        <td className="p-3">{game.AVG_COMPLETED_AIR_YARDS?.toFixed(1)}</td>
        <td className="p-3">{game.AVG_INTENDED_AIR_YARDS?.toFixed(1)}</td>
        <td className="p-3">{game.AVG_AIR_YARDS_DIFFERENTIAL?.toFixed(1)}</td>
        <td className="p-3">{game.AGGRESSIVENESS?.toFixed(2)}</td>
        <td className="p-3">{game.AVG_AIR_YARDS_TO_STICKS?.toFixed(1)}</td>
        <td className="p-3">{game.AVG_AIR_DISTANCE?.toFixed(1)}</td>
        <td className="p-3">{game.MAX_AIR_DISTANCE?.toFixed(1)}</td>
        <td className="p-3">{game.TIMES_SACKED}</td>
        <td className="p-3">{game.SACK_YARDS}</td>
        <td className="p-3">{game.TIMES_SACKED}</td>
        <td className="p-3">{game.TIMES_BLITZED}</td>
        <td className="p-3">{game.TIMES_HURRIED}</td>
        <td className="p-3">{game.TIMES_HIT}</td>
        <td className="p-3">{game.TIMES_PRESSURED}</td>
        <td className="p-3">{game.TIMES_PRESSURED_PCT?.toFixed(2)}%</td>
      </tr>
    ))}
  </tbody>
</table>
    </div>
    </div> 
  );
}

export default QBPlayerStats;