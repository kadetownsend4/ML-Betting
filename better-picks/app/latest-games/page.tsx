"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { FaBasketballBall } from "react-icons/fa";
import PostList from "../components/PostList";
<<<<<<< HEAD
<<<<<<< HEAD
import Dashboard from "../components/Dashboard";

// A mapping of NBA teams to their logo image paths.
=======

>>>>>>> bae9ee246ac9055185ff74bd2a5b692fadc0c7e9
=======
import Dashboard from "../components/Dashboard";

// A mapping of NBA teams to their logo image paths.
>>>>>>> f8f41c148148be63db8269515895cad2be595b51
const teamLogos: Record<string, string> = {
  "Boston Celtics": "/logos/celtics.jpg",
  "Miami Heat": "/logos/heat.jpg",
  "Los Angeles Lakers": "/logos/lakers.jpg",
  "Golden State Warriors": "/logos/warriors.jpg",
  "Milwaukee Bucks": "/logos/bucks.jpg",
  "Brooklyn Nets": "/logos/nets.jpg",
  "Philadelphia 76ers": "/logos/76ers.jpg",
  "New York Knicks": "/logos/knicks.jpg",
  "Chicago Bulls": "/logos/bulls.jpg",
  "Phoenix Suns": "/logos/suns.jpg",
  "Dallas Mavericks": "/logos/mavs.jpg",
  "Denver Nuggets": "/logos/nuggets.jpg",
  "Houston Rockets": "/logos/rockets.jpg",
  "Memphis Grizzlies": "/logos/grizzlies.jpg",
  "Atlanta Hawks": "/logos/hawks.jpg",
  "New Orleans Pelicans": "/logos/pelicans.jpg",
  "Indiana Pacers": "/logos/pacers.jpg",
  "Toronto Raptors": "/logos/raptors.jpg",
  "Washington Wizards": "/logos/wizards.jpg",
  "Sacramento Kings": "/logos/kings.jpg",
  "Orlando Magic": "/logos/magic.jpg",
  "Utah Jazz": "/logos/jazz.jpg",
  "Charlotte Hornets": "/logos/hornets.jpg",
  "Detroit Pistons": "/logos/pistons.jpg",
  "Minnesota Timberwolves": "/logos/wolves.jpg",
  "Oklahoma City Thunder": "/logos/thunder.jpg",
  "San Antonio Spurs": "/logos/spurs.jpg",
  "Cleveland Cavaliers": "/logos/cavs.jpg",
  "LA Clippers": "/logos/clippers.jpg",
  "Portland Trail Blazers": "/logos/trailblazers.jpg",
};

<<<<<<< HEAD
<<<<<<< HEAD
// Fetch game data dynamically (replace with actual API)
=======
//Fetch game data dynamically (replace with actual API)
//Fetch game data dynamically (replace with actual API)
>>>>>>> bae9ee246ac9055185ff74bd2a5b692fadc0c7e9
=======
// Fetch game data dynamically (replace with actual API)
>>>>>>> f8f41c148148be63db8269515895cad2be595b51
async function fetchRecentGames() {
  return [
    { home: "Boston Celtics", away: "Miami Heat", homeScore: 112, awayScore: 107, date: "2024-03-01" },
    { home: "Los Angeles Lakers", away: "Golden State Warriors", homeScore: 125, awayScore: 119, date: "2024-02-29" },
    { home: "Milwaukee Bucks", away: "Brooklyn Nets", homeScore: 108, awayScore: 99, date: "2024-02-28" },
    { home: "Philadelphia 76ers", away: "New York Knicks", homeScore: 101, awayScore: 97, date: "2024-02-27" },
    { home: "Chicago Bulls", away: "Phoenix Suns", homeScore: 110, awayScore: 115, date: "2024-02-26" },
    { home: "Dallas Mavericks", away: "Denver Nuggets", homeScore: 108, awayScore: 102, date: "2024-02-25" },
    { home: "Houston Rockets", away: "Memphis Grizzlies", homeScore: 99, awayScore: 105, date: "2024-02-24" },
    { home: "Atlanta Hawks", away: "New Orleans Pelicans", homeScore: 107, awayScore: 108, date: "2024-02-23" },
    { home: "Indiana Pacers", away: "Toronto Raptors", homeScore: 120, awayScore: 117, date: "2024-02-22" },
    { home: "Washington Wizards", away: "Sacramento Kings", homeScore: 98, awayScore: 110, date: "2024-02-21" },
    { home: "Orlando Magic", away: "Utah Jazz", homeScore: 105, awayScore: 102, date: "2024-02-20" },
    { home: "Charlotte Hornets", away: "Detroit Pistons", homeScore: 102, awayScore: 99, date: "2024-02-19" },
    { home: "Minnesota Timberwolves", away: "Oklahoma City Thunder", homeScore: 118, awayScore: 121, date: "2024-02-18" },
    { home: "San Antonio Spurs", away: "Cleveland Cavaliers", homeScore: 97, awayScore: 112, date: "2024-02-17" },
    { home: "Portland Trail Blazers", away: "LA Clippers", homeScore: 95, awayScore: 108, date: "2024-02-16" },
  ];
}

<<<<<<< HEAD
<<<<<<< HEAD
// Main component to render the latest games page
export default function LatestGames() {
  // State hook to store the list of games.
=======

export default function LatestGames() {
>>>>>>> bae9ee246ac9055185ff74bd2a5b692fadc0c7e9
=======
// Main component to render the latest games page
export default function LatestGames() {
  // State hook to store the list of games.
>>>>>>> f8f41c148148be63db8269515895cad2be595b51
  const [games, setGames] = useState<
    { home: string; away: string; homeScore: number; awayScore: number; date: string }[]
  >([]);

<<<<<<< HEAD
<<<<<<< HEAD
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white p-10 flex flex-col items-center font-['Orbitron']">
      {/* Header Section */}
      <header className="flex justify-between items-center w-full max-w-5xl py-5 px-10 bg-white/10 backdrop-blur-lg rounded-xl shadow-lg relative z-10">
        {/* Title Section*/}
        <h1 className="text-4xl tracking-wide uppercase text-green-400 flex items-center gap-2 font-['Rajdhani']">
          <FaBasketballBall className="text-green-400" /> NBA Latest Games
        </h1>
        
        {/* Replacing Navigation with Dashboard Component */}
        <Dashboard />
      </header>

      {/* Scrollable Scores Section */}
      <div className="w-full max-w-5xl mt-10 bg-white/10 backdrop-blur-lg shadow-lg rounded-xl p-6 relative z-50">
      <h2 className="text-4xl font-bold text-green-400 text-center sm:text-left mb-4">Recent NBA Games</h2>
      <div className="overflow-y-auto max-h-[500px] rounded-lg p-2 relative z-50">
      <table className="w-full border-collapse border border-gray-700 text-lg">
=======
  // useEffect(() => {
  //   async function loadGames() {
  //     const recentGames = await fetchRecentGames();
  //     const sortedGames = recentGames.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  //     setGames(sortedGames);
  //   }
  //   loadGames();
  // }, []);

=======
>>>>>>> f8f41c148148be63db8269515895cad2be595b51
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white p-10 flex flex-col items-center font-['Orbitron']">
      {/* Header Section */}
      <header className="flex justify-between items-center w-full max-w-5xl py-5 px-10 bg-white/10 backdrop-blur-lg rounded-xl shadow-lg relative z-10">
        {/* Title Section*/}
        <h1 className="text-4xl tracking-wide uppercase text-green-400 flex items-center gap-2 font-['Rajdhani']">
          <FaBasketballBall className="text-green-400" /> NBA Latest Games
        </h1>
        
        {/* Replacing Navigation with Dashboard Component */}
        <Dashboard />
      </header>

      {/* Scrollable Scores Section */}
<<<<<<< HEAD
      <div className="w-full max-w-5xl mt-10 bg-white/10 backdrop-blur-lg shadow-lg rounded-xl p-6">
        <h2 className="text-4xl font-bold text-green-400 text-center sm:text-left mb-4">Recent NBA Games</h2>
        <div className="overflow-y-auto max-h-[500px] rounded-lg p-2">
          <table className="w-full border-collapse border border-gray-700 text-lg">
>>>>>>> bae9ee246ac9055185ff74bd2a5b692fadc0c7e9
=======
      <div className="w-full max-w-5xl mt-10 bg-white/10 backdrop-blur-lg shadow-lg rounded-xl p-6 relative z-50">
      <h2 className="text-4xl font-bold text-green-400 text-center sm:text-left mb-4">Recent NBA Games</h2>
      <div className="overflow-y-auto max-h-[500px] rounded-lg p-2 relative z-50">
      <table className="w-full border-collapse border border-gray-700 text-lg">
>>>>>>> f8f41c148148be63db8269515895cad2be595b51
            <thead className="bg-gray-800 text-green-400">
              <tr>
                <th className="border border-gray-700 px-6 py-3 text-left">Date</th>
                <th className="border border-gray-700 px-6 py-3 text-left">Home Team</th>
                <th className="border border-gray-700 px-6 py-3">Score</th>
                <th className="border border-gray-700 px-6 py-3 text-left">Away Team</th>
              </tr>
            </thead>
            <tbody>
<<<<<<< HEAD
<<<<<<< HEAD
              {/* Map over the games array to render each game */}
=======
>>>>>>> bae9ee246ac9055185ff74bd2a5b692fadc0c7e9
=======
              {/* Map over the games array to render each game */}
>>>>>>> f8f41c148148be63db8269515895cad2be595b51
              {games.map((game, index) => (
                <tr key={index} className="border border-gray-700">
                  <td className="border border-gray-700 px-6 py-3">{game.date}</td>
                  <td className="border border-gray-700 px-6 py-3 flex items-center gap-3">
<<<<<<< HEAD
<<<<<<< HEAD
                    {/* Display Home Team Logo and Name */}
=======
>>>>>>> bae9ee246ac9055185ff74bd2a5b692fadc0c7e9
=======
                    {/* Display Home Team Logo and Name */}
>>>>>>> f8f41c148148be63db8269515895cad2be595b51
                    <Image src={teamLogos[game.home]} alt={game.home} width={35} height={35} className="rounded-full" unoptimized />
                    <span>{game.home}</span>
                  </td>
                  <td className="border border-gray-700 px-6 py-3 text-center">{game.homeScore} - {game.awayScore}</td>
                  <td className="border border-gray-700 px-6 py-3 flex items-center gap-3">
<<<<<<< HEAD
<<<<<<< HEAD
                    {/* Display Away Team Logo and Name */}
=======
>>>>>>> bae9ee246ac9055185ff74bd2a5b692fadc0c7e9
=======
                    {/* Display Away Team Logo and Name */}
>>>>>>> f8f41c148148be63db8269515895cad2be595b51
                    <Image src={teamLogos[game.away]} alt={game.away} width={35} height={35} className="rounded-full" unoptimized />
                    <span>{game.away}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

<<<<<<< HEAD
<<<<<<< HEAD
        {/* 🏀 Insert PostList component below the games table
=======
        {/* 🏀 Insert PostList component below the games table */}
>>>>>>> bae9ee246ac9055185ff74bd2a5b692fadc0c7e9
=======
        {/* 🏀 Insert PostList component below the games table
>>>>>>> f8f41c148148be63db8269515895cad2be595b51
        <div className="mt-10">
          <h2 className="text-4xl font-bold text-green-400 text-center sm:text-left mb-4">
            Latest NBA Posts
          </h2>
          <PostList />
<<<<<<< HEAD
<<<<<<< HEAD
        </div> */}
      </div>
      
      {/* Footer Section */}
=======
        </div>
      </div>

>>>>>>> bae9ee246ac9055185ff74bd2a5b692fadc0c7e9
=======
        </div> */}
      </div>
      
      {/* Footer Section */}
>>>>>>> f8f41c148148be63db8269515895cad2be595b51
      <footer className="mt-auto py-6 text-gray-400">
        <p>&copy; 2025 NBA Stats. All rights reserved.</p>
      </footer>
    </div>
  );
}
