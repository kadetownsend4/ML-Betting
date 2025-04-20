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
    if (!weeklyStats.length) return <div>No stats found for this player.</div>;

  return  (
    // <div className="bg-gray-50 p-6 rounded-lg shadow-md">
    //   <div className="flex items-center space-x-4 mb-6">
    //     <div>
    //       <h1 className="text-3xl font-bold text-gray-800">{playerName} - Weekly QB Stats</h1>
    //       <div className="text-sm text-gray-500">
    //         <p>{weeklyStats[0]?.POSITION} - {weeklyStats[0]?.RECENT_TEAM}</p>
    //       </div>
    //     </div>
    //   </div>
    <div className="w-fit mx-auto">
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-green-700 text-white p-8 font-sans">
        {/* Sticky Breadcrumb */}
        <div className="sticky top-0 z-50 bg-gradient-to-r from-black/80 via-green-900/80 to-black/80 backdrop-blur-md py-3 px-4 rounded-b-lg shadow-lg border-b border-white/10 mb-8">
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

      {/* Player Info */}
        <div className="flex items-center space-x-6 mb-8 bg-black/30 p-4 rounded-xl shadow-md">
        <img
            src={weeklyStats[0]?.HEADSHOT_URL}
            alt={`${playerName}'s headshot`}
            className="w-40 h-40 rounded-full object-cover border-4 border-white shadow-lg"
        />
        <div className="text-white">
            <h2 className="font-bold text-3xl mb-2">{playerName}</h2>
            <p className="text-sm text-white/100 tracking-wide">
            {weeklyStats[0]?.POSITION} — {weeklyStats[0]?.RECENT_TEAM}
            </p>
        </div>
        </div>

      {/* Stats Table */}
<table className="min-w-full text-sm text-left border-collapse bg-gray-800 text-gray-100">
  <thead>
    <tr className="bg-gray-900 text-xs uppercase tracking-wider border-b border-gray-700">
      <th className="p-3">Week</th>
      <th className="p-3">Season</th>
      <th className="p-3">Opp</th>
      <th className="p-3">Team</th>
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
        <td className="p-3">{game.RECENT_TEAM}</td>
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