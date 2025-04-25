"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import axios from "axios";
import Image from "next/image";


// Used this link to help get this page created. Spent a lot of time going back and forth to help understand what we really wanted. 
// https://chatgpt.com/share/67f94e3c-40b8-8004-b6e5-ef6286f74945
// https://chatgpt.com/c/67fb021a-8610-8004-9ea2-7caf90762f32



/**
 * This page displays the full matchup history for a specific NBA team. It dynamically reads a
 * team nickname from the URL and gets the basic team information from the backend and 
 * then gets a list of all the previous matchups that the team played 
 */

type Game = {
  GAME_ID: number;
  DATE: string;
  HOME_TEAM: string;
  AWAY_TEAM: string;
  CITY: string;
};

// Main component to display a teams matchups history
export default function TeamHistoryPage() {
  const { team } = useParams(); // Get the team dynamically 
  const [games, setGames] = useState<Game[]>([]); // All of the games for each team
  const [teamInfo, setTeamInfo] = useState<any | null>(null); // Additional team information 

  // Get the team information and matchup history 
  useEffect(() => {
    if (team) {
      // Converts to readable nickname 
      const formattedNickname = team.toString().replace(/-/g, " ").replace(/\b\w/g, l => l.toUpperCase());
  
      // Get all the teams and then find the matching one to display all of their games
      axios
        .get("https://betterpicks-demo.onrender.com/NBATeams")
        .then((res) => {
          const match = res.data.find(
            (t: any) => t.TEAM_NICKNAME.toLowerCase() === formattedNickname.toLowerCase()
          );
          setTeamInfo(match);
          // Returns the full matchups history of the specified team
          return axios.get(`https://betterpicks-demo.onrender.com/NBAMatchups/${formattedNickname}`);
        })
        .then((res) => setGames(res.data))
        .catch((err) => console.error("Error loading team data:", err));
    }
  }, [team]);
  
  
  
  const formattedTitle = team?.toString().replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase());

  return (
<div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-purple-900 text-white p-8 font-sans">
{/* Displaying team header */}
{teamInfo && (
  <div className="flex items-center gap-4 mb-10 border-b-2 border-purple-500 pb-4">
    <Image
      src={teamInfo.TEAM_LOGO}
      alt={`${teamInfo.TEAM_NAME} logo`}
      width={60}
      height={60}
      className="drop-shadow-lg"
    />
    <h1 className="text-4xl sm:text-5xl font-extrabold text-purple-300 tracking-wide uppercase">
      {formattedTitle} Match History
    </h1>
  </div>
)}
    
{/* List of games */}
<ul className="space-y-4">
{/* Breadcrumb navigation  (Home > NBA Teams > Team) */}
<div className="sticky top-0 z-50 bg-gradient-to-r from-black/80 via-purple-900/80 to-black/80 backdrop-blur-md py-3 px-4 rounded-b-lg shadow-lg border-b border-white/10 mb-8">
<div className="text-sm text-gray-400 mb-6">
  <Link href="/" className="hover:text-purple-300 transition">Home</Link>
  <span className="mx-2 text-white">›</span>
  <Link href="/latest-games" className="hover:text-purple-300 transition">NBA Teams</Link>
  <span className="mx-2 text-white">›</span>
  <span className="text-purple-300 font-semibold">{formattedTitle}</span>
</div>
</div>

{/* Maps through each game and creates a link to the details of the game page */}
{games.map((game) => (
  <Link
    key={game.GAME_ID}
    href={`/team-history/${team}/${game.GAME_ID}`}
    className="block"
  >
    <li className="bg-gradient-to-br from-gray-800 to-gray-500 p-5 rounded-xl border border-white/10 shadow-lg hover:shadow-purple-500/30 transition-transform duration-300 hover:scale-[1.02] cursor-pointer">
      <p className="text-lg font-bold">{game.AWAY_TEAM} @ {game.HOME_TEAM}</p>
      <p className="text-sm text-gray-400">Date: {game.DATE} | Location: {game.CITY}</p>
    </li>
  </Link>
))}
      {/* Back to home button */}
      </ul>
      <div className="mt-6">
        <Link href="/" className="text-green-400 underline">← Back to Home</Link>
      </div>
    </div>
  );
}
