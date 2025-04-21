"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { FaFootballBall } from "react-icons/fa";
import axios from "axios";
import PostList from "../components/PostList";
import Dashboard from "../components/Dashboard";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";



type Team = {
  TEAM_NAME: string;
  TEAM_CONF: string;
  TEAM_DIVISION: string;
  TEAM_LOGO: string;
  TEAM_WORDMARK: string;
  TEAM_ABR: string;
};


const divisions = ["East", "North", "South", "West"];
const conferences = ["AFC", "NFC"];

function NFLTeams() {
  const [teams, setTeams] = useState<Team[]>([]);
  const [activeDropdown, setActiveDropdown] =useState<string | null>(null);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  useEffect(() => {
    axios
      .get("https://betterpicks-demo.onrender.com/nfl_teams")
      .then((response) => {
        console.log("Fetched NFL Teams Data:", response.data);
        setTeams(response.data);
      })
      .catch((error) => console.error("Error fetching NFL teams:", error));
  }, []);
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-purple-800 text-white p-10 flex flex-col items-center font-sans">
      <Dashboard>    

    </Dashboard> 

      <div className="mt-8">
  {selectedOption && selectedOption !== 'AFC' && selectedOption !== 'NFC' && (
    <div>
      <h3 className="text-3xl text-center text-green-400">
        Teams in {selectedOption}
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-6">
        {teams
          .filter(
            (team) =>
              team.TEAM_CONF === selectedOption.split(' ')[0] &&
              team.TEAM_DIVISION === selectedOption.split(' ')[1]
          )
          .map((team, index) => {
            const href = `/nfl-teams/${team.TEAM_ABR.toLowerCase()}`;
            console.log("Navigating to:", href);

            return (
              <Link key={index} href={href}>
                <div className="cursor-pointer bg-gray-900 p-5 rounded-2xl shadow-xl border border-white/10 flex flex-col items-center justify-center transition-all duration-300 hover:shadow-2xl hover:scale-105 hover:bg-gray-800">
                  <h2 className="text-xl font-bold text-white text-center tracking-wide mb-2">
                    {team.TEAM_NAME}
                  </h2>
                  <div className="mt-2 flex flex-col items-center gap-3">
                    <div className="relative w-[140px] h-[120px]">
                      <Image
                        src={team.TEAM_LOGO}
                        alt={`${team.TEAM_NAME} Logo`}
                        fill
                        className="rounded-md object-contain"
                        unoptimized
                      />
                    </div>
                    <div className="relative w-[150px] h-[35px]">
                      <Image
                        src={team.TEAM_WORDMARK}
                        alt={`${team.TEAM_NAME} Wordmark`}
                        fill
                        className="rounded-md object-contain"
                        unoptimized
                      />
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
      </div>
    </div>
  )}
</div>


      {/* Teams Section */}
      <div className="w-full max-w-6xl mt-20 bg-white/5 shadow-xl rounded-xl px-8 py-10 sm:px-12 sm:py-14 space-y-8 relative z-50 border border-white/20">
      <h2 className="text-4xl sm:text-5xl font-extrabold text-white text-center drop-shadow-xl mb-8 tracking-wide font-['Rajdhani']">
  NFL Teams by Division
</h2>

        {conferences.map((conf) => (
          <div key={conf} className="mb-8">
            <motion.h3
  className={`text-3xl font-bold text-center my-4 ${conf === "AFC" ? "text-red-500" : "text-blue-400"}`}
  initial={{ opacity: 0, y: -20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5, ease: "easeOut" }}
>
  {conf} Conference
</motion.h3>



            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {divisions.map((div) => {
                const filteredTeams = teams.filter(
                  (team) =>
                    team.TEAM_CONF?.toLowerCase().includes(conf.toLowerCase()) &&
                    team.TEAM_DIVISION?.toLowerCase().includes(div.toLowerCase())
                );
                 {/* ChatGPT helped me set up creating links for each of the teams: 
                  https://chatgpt.com/share/68030ca6-ca1c-800f-bed1-19bf6cd02b0a */}
                return (
                  <div key={div} className="bg-white/10 backdrop-blur-lg p-6 rounded-2xl shadow-2xl border border-white/10">
                    <h4 className="text-2xl font-semibold text-white text-center tracking-wide">
                      {conf} {div}
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-6 mt-4 justify-items-center">
                    {filteredTeams.map((team, index) => (
                      <Link
                        key={index}
                        href={`/nfl-teams/${team.TEAM_ABR}`}
                       className="w-52 h-60 bg-gray-700 p-5 rounded-2xl shadow-xl border border-white/10 flex flex-col items-center justify-center transition-all duration-300 hover:shadow-2xl hover:scale-105 hover:bg-gray-800"
                      >
                        <h2 className="text-xl font-bold text-white text-center tracking-wide mb-2">
                          {team.TEAM_NAME}
                        </h2>
                        <div className="mt-2 flex flex-col items-center gap-3">
                          <div className="relative w-[140px] h-[120px]">
                            <Image
                              src={team.TEAM_LOGO}
                              alt={`${team.TEAM_NAME} Logo`}
                              layout="fill"
                              objectFit="contain"
                              className="rounded-md"
                              unoptimized
                            />
                          </div>
                          {/* <div className="relative w-[150px] h-[35px]">
                            <Image
                              src={team.TEAM_WORDMARK}
                              alt={`${team.TEAM_NAME} Wordmark`}
                              layout="fill"
                              objectFit="contain"
                              className="rounded-md"
                              unoptimized
                            />
                          </div> */}
                        </div>
                      </Link>
                    ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      <footer className="mt-10 py-6 text-gray-400 text-sm">
  <p>
    <span className="text-red-400 uppercase">Disclaimer:</span> Please gamble responsibly. If you have a gambling problem, seek help from a professional organization such as{" "}
    <a
      href="https://www.ncpgambling.org/"
      target="_blank"
      rel="noopener noreferrer"
      className="text-red-400 font-bold underline hover:text-green-300 transition-colors duration-200"
    >
      National Council on Problem Gambling
    </a>.
  </p>
</footer>


    </div>
  );
}

export default NFLTeams;