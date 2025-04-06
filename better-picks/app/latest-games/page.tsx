"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { FaBasketballBall } from "react-icons/fa";
import axios from "axios";
import PostList from "../components/PostList";
import Dashboard from "../components/Dashboard";

type Team = {
  TEAM_NAME: string;
  TEAM_CONF: string;
  TEAM_DIV: string;
  TEAM_LOGO: string;
  TEAM_WORDMARK: string;
};

const divisions = ["Atlantic", "Central", "Southeast", "Northwest", "Pacific", "Southwest"];
const conferences = ["Eastern", "Western"];

function NBATeams() {
  const [teams, setTeams] = useState<Team[]>([]);

  useEffect(() => {
    axios
      .get("https://betterpicks-demo.onrender.com/fetch_nba_teams")
      .then((response) => {
        console.log("Fetched Teams Data:", response.data);
        setTeams(response.data);
      })
      .catch((error) => console.error("Error fetching teams:", error));
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white p-10 flex flex-col items-center font-['Orbitron']">
      {/* Header Section */}
      <header className="flex justify-between items-center w-full max-w-5xl py-5 px-10 bg-white/10 backdrop-blur-lg rounded-xl shadow-lg relative z-10">
        {/* <h1 className="text-4xl tracking-wide uppercase text-orange-400 flex items-center gap-2 font-['Rajdhani']">
          <FaBasketballBall className="text-orange-400" /> NBA Teams
        </h1> */}
        <Dashboard />
      </header>

      {/* Teams Section */}
      <div className="w-full max-w-5xl mt-10 bg-white/10 shadow-lg rounded-xl p-6 relative z-10">
      <h2 className="text-4xl font-bold text-green-400 text-center mb-4">NBA Latest Games</h2>
        <h2 className="text-4xl font-bold text-orange-400 text-center mb-4">NBA Teams by Division</h2>
        
        {conferences.map((conf) => (
          <div key={conf} className="mb-8">
            <h3 className="text-3xl font-bold text-blue-400 text-center my-4">{conf} Conference</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {divisions.filter(div => teams.some(team => team.TEAM_CONF === conf && team.TEAM_DIV === div)).map((div) => (
                <div key={div} className="bg-gray-800 p-4 rounded-lg shadow-lg">
                  <h4 className="text-2xl font-semibold text-orange-400 text-center">{div} Division</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                    {teams
                      .filter((team) => team.TEAM_CONF === conf && team.TEAM_DIV === div)
                      .map((team, index) => (
                        <div key={index} className="bg-gray-900 p-3 rounded-lg text-center">
                          <h2 className="text-xl font-semibold text-white">{team.TEAM_NAME}</h2>
                          <div className="flex justify-center gap-4 mt-2">
                            <Image src={team.TEAM_LOGO} alt={`${team.TEAM_NAME} Logo`} width={60} height={60} className="rounded-lg" unoptimized />
                            <Image src={team.TEAM_WORDMARK} alt={`${team.TEAM_NAME} Wordmark`} width={150} height={40} className="rounded-lg" unoptimized />
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Posts Section */}
      <div className="mt-10">
        <h2 className="text-4xl font-bold text-orange-400 text-center sm:text-left mb-4">Latest NBA Posts</h2>
        <PostList />
      </div>

      {/* Footer Section */}
      <footer className="mt-auto py-6 text-gray-400">
        <p>&copy; 2025 NBA Stats. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default NBATeams;
