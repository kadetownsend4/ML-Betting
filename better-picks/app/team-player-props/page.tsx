"use client";

import { useState, useEffect } from "react";
import Dashboard from "../components/Dashboard";

export default function NFLTeams() {
  const teams = [
    { id: "1", name: "Arizona Cardinals", logo: "/nfl-logos/arizona-cardinals.png" },
    { id: "2", name: "Atlanta Falcons", logo: "/nfl-logos/atlanta-falcons.png" },
    { id: "3", name: "Baltimore Ravens", logo: "/nfl-logos/baltimore-ravens.png" },
    { id: "4", name: "Buffalo Bills", logo: "/nfl-logos/buffalo-bills.png" },
    { id: "5", name: "Carolina Panthers", logo: "/nfl-logos/carolina-panthers.png" },
    { id: "6", name: "Chicago Bears", logo: "/nfl-logos/chicago-bears.png" },
  ];

  const postsData: Record<string, { id: string; title: string; body: string }[]> = {
    "Arizona Cardinals": [
      { id: "1", title: "Quarterbacks", body: "Kyler Murray" },
      { id: "2", title: "Running Backs", body: "James Connor, Trey Benson" },
      { id: "3", title: "Wide Receivers", body: "Marvin Harrison Jr, Zay Jones, Michael Wilson" },
      { id: "4", title: "Tight Ends", body: "Trey McBride" },
      { id: "5", title: "Kicker", body: "Chad Ryland" },
    ],
    "Atlanta Falcons": [
      { id: "1", title: "Quarterbacks", body: "Michael Penix Jr" },
      { id: "2", title: "Running Backs", body: "Bijan Robinson, Tyler Allgeier" },
      { id: "3", title: "Wide Receivers", body: "Drake London, Ray-Ray McCloud III, Darnell Mooney" },
      { id: "4", title: "Tight Ends", body: "Kyle Pitts" },
      { id: "5", title: "Kicker", body: "Younghoe Koo" },
    ],
    "Baltimore Ravens": [
      { id: "1", title: "Quarterbacks", body: "Lamar Jackson" },
      { id: "2", title: "Running Backs", body: "J.K. Dobbins" },
    ],
  };

  const [selectedTeam, setSelectedTeam] = useState<string>("");
  const [posts, setPosts] = useState<{ id: string; title: string; body: string }[]>([]);

  useEffect(() => {
    if (selectedTeam) {
      setPosts(postsData[selectedTeam] || []);
    }
  }, [selectedTeam]);

  return (
    <Dashboard>
      <div className="w-full max-w-6xl mt-20 bg-white/5 shadow-xl rounded-xl px-8 py-10 sm:px-12 sm:py-14 space-y-8 border border-white/20 text-white font-['Orbitron']">
        
        {/* Header with Dropdown */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <h2 className="text-4xl sm:text-5xl font-extrabold text-purple-400 tracking-wide">
            NFL Player Prop Positions
          </h2>

          <select
            value={selectedTeam}
            onChange={(e) => setSelectedTeam(e.target.value)}
            className="w-full sm:w-72 p-3 rounded-md bg-gray-800 text-white border border-white/10 focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            <option value="" disabled>Select a Team</option>
            {teams.map((team) => (
              <option key={team.id} value={team.name}>
                {team.name}
              </option>
            ))}
          </select>
        </div>

        {/* Team info */}
        {selectedTeam && (
          <>
            <div className="flex items-center gap-3 mt-6">
              <img
                src={teams.find((t) => t.name === selectedTeam)?.logo || ""}
                alt={selectedTeam}
                className="w-10 h-10"
              />
              <h3 className="text-2xl font-semibold">
                Player Prop Positions: {selectedTeam}
              </h3>
            </div>

            <ul className="space-y-4">
              {posts.map((post) => (
                <li
                  key={post.id}
                  className="p-4 border border-gray-700 rounded-lg bg-gray-900"
                >
                  <h4 className="text-lg font-semibold">{post.title}</h4>
                  <div className="text-purple-300">
                    {post.body.split(",").map((player, idx) => (
                      <div key={idx}>
                        <a
                          href={`https://www.example.com/players/${player.trim()}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:underline"
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

        <footer className="mt-10 py-6 text-gray-400 text-sm text-center">
          <p>&copy; 2025 NFL Stats. All rights reserved.</p>
        </footer>
      </div>
    </Dashboard>
  );
}
