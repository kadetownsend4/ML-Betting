"use client"; // Use this in Next.js (App Router) to enable client-side behavior

import { useState, useEffect } from "react";
import { FaFootballBall } from "react-icons/fa";
import Dashboard from "../components/Dashboard"; // Adjust the import path to your project structure

// Basic NFL Teams Component
export default function NFLTeams() {
  // Static teams data with logos
  const teams = [
    { id: "1", name: "Arizona Cardinals", logo: "/nfl-logos/arizona-cardinals.png" },
    { id: "2", name: "Atlanta Falcons", logo: "/nfl-logos/atlanta-falcons.png" },
    { id: "3", name: "Baltimore Ravens", logo: "/nfl-logos/baltimore-ravens.png" },
    { id: "4", name: "Buffalo Bills", logo: "/nfl-logos/buffalo-bills.png" },
    { id: "5", name: "Carolina Panthers", logo: "/nfl-logos/carolina-panthers.png" },
    { id: "6", name: "Chicago Bears", logo: "/nfl-logos/chicago-bears.png" },
  ];

  // Static posts data
  const postsData = {
    "Arizona Cardinals": [
      { id: "1", title: "Quarterbacks", body: "Kyler Murray" },
      { id: "2", title: "Running Backs", body: "James Connor, Trey Benson" },
    ],
    "Atlanta Falcons": [
      { id: "3", title: "Quarterbacks", body: "Desmond Ridder" },
      { id: "4", title: "Running Backs", body: "Tyler Allgeier" },
    ],
    "Baltimore Ravens": [
      { id: "5", title: "Quarterbacks", body: "Lamar Jackson" },
      { id: "6", title: "Running Backs", body: "J.K. Dobbins" },
    ],
    // Add posts for other teams as needed
  };

  const [selectedTeam, setSelectedTeam] = useState<string>("");
  const [posts, setPosts] = useState<{ id: string; title: string; body: string }[]>([]);

  useEffect(() => {
    if (selectedTeam) {
      setPosts(postsData[selectedTeam] || []); // Set posts for selected team
    }
  }, [selectedTeam]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white p-10 flex flex-col items-center font-['Orbitron']">
      {/* Header Section */}
      <header className="flex justify-between items-center w-full max-w-5xl py-5 px-10 bg-white/10 backdrop-blur-lg rounded-xl shadow-lg relative z-10">
        <h1 className="text-4xl tracking-wide uppercase text-green-400 flex items-center gap-2 font-['Rajdhani']">
          <FaFootballBall className="text-green-400" /> Team Based Player Props
        </h1>
        <Dashboard /> {/* Import and display the Dashboard component next to the title */}
      </header>

      {/* Custom Dropdown for Selecting Team */}
      <div className="w-full max-w-5xl mt-10 bg-white/10 backdrop-blur-lg shadow-lg rounded-xl p-6 relative z-50">
        <h2 className="text-4xl font-bold text-green-400 text-center mb-4">NFL Player Prop Positions</h2>

        <div className="mb-4">
          <label htmlFor="team" className="text-lg font-semibold">Choose a Team:</label>

          {/* Custom Dropdown */}
          <div className="relative">
            <button
              className="mt-2 p-2 border rounded-md w-full bg-gray-800 text-white flex items-center justify-between"
              onClick={() => document.getElementById('team-dropdown')?.classList.toggle('hidden')}
            >
              {selectedTeam ? (
                <div className="flex items-center">
                  <img src={teams.find(team => team.name === selectedTeam)?.logo || ''} alt={selectedTeam} className="w-6 h-6 mr-2" />
                  {selectedTeam}
                </div>
              ) : (
                "Select a Team"
              )}
            </button>
            <div
              id="team-dropdown"
              className="absolute left-0 right-0 mt-2 bg-gray-800 text-white rounded-lg shadow-lg max-h-60 overflow-y-auto hidden"
            >
              {teams.map((team) => (
                <button
                  key={team.id}
                  onClick={() => {
                    setSelectedTeam(team.name);
                    document.getElementById('team-dropdown')?.classList.add('hidden');
                  }}
                  className="flex items-center p-2 hover:bg-gray-700 w-full text-left"
                >
                  <img src={team.logo} alt={team.name} className="w-6 h-6 mr-2" />
                  {team.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Display posts for selected team */}
        {selectedTeam && (
          <>
            <h1 className="text-2xl font-bold mb-4">Player Prop Positions: {selectedTeam}</h1>
            <ul className="space-y-4">
              {posts.map((post) => (
                <li key={post.id} className="p-4 border border-gray-200 rounded-lg shadow-sm bg-gray-900">
                  <h2 className="text-lg font-semibold">{post.title}</h2>
                  <div className="text-green-400">
                    {post.body.split(',').map((player, index) => (
                      <div key={index} className="group relative">
                        {/* Player name as a link */}
                        <a
                          href={`https://www.example.com/players/${player.trim()}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-green-400 hover:text-white-600 group-hover:underline"
                        >
                          {player.trim()}
                        </a>
                      </div>
                    ))}
                  </div>
                </li>
              ))}
            </ul>
          </>
        )}
      </div>

      {/* Footer Section */}
      <footer className="mt-auto py-6 text-gray-400">
        <p>&copy; 2025 NFL Stats. All rights reserved.</p>
      </footer>
    </div>
  );
}
