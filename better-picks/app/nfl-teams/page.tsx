"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { FaFootballBall } from "react-icons/fa";
import axios from "axios";
import PostList from "../components/PostList";
import Dashboard from "../components/Dashboard";

type Team = {
  TEAM_NAME: string;
  TEAM_CONF: string;
  TEAM_DIVISION: string;
  TEAM_LOGO: string;
  TEAM_WORDMARK: string;
};

const divisions = ["East", "North", "South", "West"];
const conferences = ["AFC", "NFC"];

function NFLTeams() {
  const [teams, setTeams] = useState<Team[]>([]);

  useEffect(() => {
    axios
      .get("https://betterpicks-demo.onrender.com/fetch_teams")
      .then((response) => {
        console.log("Fetched Teams Data:", response.data); // Debugging log
        setTeams(response.data);
      })
      .catch((error) => console.error("Error fetching teams:", error));
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white p-10 flex flex-col items-center font-['Orbitron']">
      {/* Header Section */}
      <header className="flex justify-between items-center w-full max-w-5xl py-5 px-10 bg-white/10 backdrop-blur-lg rounded-xl shadow-lg relative z-10">
        <h1 className="text-4xl tracking-wide uppercase text-green-400 flex items-center gap-2 font-['Rajdhani']">
          <FaFootballBall className="text-green-400" /> NFL Teams
        </h1>
        <Dashboard />
      </header>

      {/* Teams Section */}
      <div className="w-full max-w-6xl mt-10 bg-white/10 backdrop-blur-lg shadow-lg rounded-xl p-6 relative z-50">
        <h2 className="text-4xl font-bold text-green-400 text-center mb-4">NFL Teams by Division</h2>

        {conferences.map((conf) => (
          <div key={conf} className="mb-8">
            <h3
              className={`text-3xl font-bold text-center my-4 ${
                conf === "AFC" ? "text-red-500" : "text-blue-400"
                }`}
                >
              {conf} Conference
            </h3>


            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {divisions.map((div) => {
                const filteredTeams = teams.filter(
                  (team) =>
                    team.TEAM_CONF?.toLowerCase().includes(conf.toLowerCase()) &&
                    team.TEAM_DIVISION?.toLowerCase().includes(div.toLowerCase())
                );

                return (
                  <div key={div} className="bg-gray-800 p-6 rounded-lg shadow-lg">
                    <h4 className="text-2xl font-semibold text-green-400 text-center">
                      {conf} {div}
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-6 mt-4 justify-center">
                      {filteredTeams.map((team, index) => (
                        <div
                          key={index}
                          className="bg-gray-900 p-4 rounded-lg shadow-md flex flex-col items-center justify-center"
                        >
                          <h2 className="text-xl font-semibold text-white text-center">{team.TEAM_NAME}</h2>

                          <div className="mt-4 flex flex-col items-center">
                            {/* Team Logo */}
                            <div className="relative w-[140px] h-[120px] mb-2">
                              <Image
                                src={team.TEAM_LOGO}
                                alt={`${team.TEAM_NAME} Logo`}
                                layout="fill"
                                objectFit="contain"
                                className="rounded-lg"
                                unoptimized
                              />
                            </div>

                            {/* Team Wordmark */}
                            <div className="relative w-[150px] h-[35px]">
                              <Image
                                src={team.TEAM_WORDMARK}
                                alt={`${team.TEAM_NAME} Wordmark`}
                                layout="fill"
                                objectFit="contain"
                                className="rounded-lg"
                                unoptimized
                              />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Posts Section */}
      <div className="mt-10">
        <h2 className="text-4xl font-bold text-green-400 text-center sm:text-left mb-4">
          Latest NFL Posts
        </h2>
        <PostList />
      </div>

      {/* Footer Section */}
      <footer className="mt-auto py-6 text-gray-400">
        <p>&copy; 2025 NFL Stats. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default NFLTeams;
