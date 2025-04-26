"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import axios from "axios";
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

      <div className="space-y-8">
  
</div>


      {/* Teams Section */}
      <div className="w-full max-w-6xl mt-20 bg-white/5 shadow-xl rounded-xl px-8 py-10 sm:px-12 sm:py-14 space-y-8 relative border border-white/20">
      <h2 className="text-5xl sm:text-5xl font-extrabold text-white text-center drop-shadow-xl mb-8 tracking-wide font-['Rajdhani']">
  NFL Teams 
</h2>
<div className="w-110 mx-auto h-1 bg-purple-500 rounded-full"></div>

        {conferences.map((conf) => (
          <div key={conf} className="mb-8">
            <motion.h3
  className={`text-4xl font-bold text-center my-4 ${conf === "AFC" ? "text-red-500" : "text-blue-400"}`}
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
                 {/* ChatGPT helped me set up links for each of the team to navigate to their team page: 
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


    </div>
  );
}

export default NFLTeams;