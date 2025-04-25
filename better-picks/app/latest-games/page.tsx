"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import axios from "axios";
import Dashboard from "../components/Dashboard";
import Link from "next/link";

// Used these conversations to help me get started with the latest games page. 
// There is multiple links as I worked on this file throughout the semester and different conversations were started throughout this time. 
// https://chatgpt.com/c/67bb9730-9408-8009-88d7-3f78d70fbfaf
// https://chatgpt.com/c/67d34f72-04b4-8009-ab07-3a3dbae0b825
// https://chatgpt.com/c/67d4332c-65e4-8009-9bfe-ff70c1bc806d
// https://chatgpt.com/c/67c49e05-f0f0-8004-9d0b-afc1a5311569
// https://chatgpt.com/c/67f94023-b218-8004-b933-ee59b2f8bf75
// https://chatgpt.com/c/67fb021a-8610-8004-9ea2-7caf90762f32

/**
 * This page displays a view of all the NBA teams divided up by their conference and division. 
 * Each of the team cards link to that teams full matchup history
 */



// Map NBA teams to their respective conferences and teams
const divisionMap: Record<string, { conference: string; teams: string[] }> = {
  Atlantic: {
    conference: "Eastern",
    teams: ["Celtics", "Nets", "Knicks", "76ers", "Raptors"],
  },
  Central: {
    conference: "Eastern",
    teams: ["Bulls", "Cavaliers", "Pistons", "Pacers", "Bucks"],
  },
  Southeast: {
    conference: "Eastern",
    teams: ["Hawks", "Hornets", "Heat", "Magic", "Wizards"],
  },
  Northwest: {
    conference: "Western",
    teams: ["Nuggets", "Timberwolves", "Thunder", "Trail Blazers", "Jazz"],
  },
  Pacific: {
    conference: "Western",
    teams: ["Warriors", "Clippers", "Lakers", "Suns", "Kings"],
  },
  Southwest: {
    conference: "Western",
    teams: ["Mavericks", "Rockets", "Grizzlies", "Pelicans", "Spurs"],
  },
};


// Type definition for a team object
type Team = {
  TEAM_ID: number;
  TEAM_NAME: string;
  TEAM_ABR: string;
  TEAM_NICKNAME: string;
  TEAM_CITY: string;
  TEAM_STATE: string;
  TEAM_YEAR_FOUNDED: number;
  TEAM_LOGO: string;
};

// Main component for displaying all NBA teams 
function NBATeams() {
  const [teams, setTeams] = useState<Team[]>([]); // State to store the fetched teams 

  // Fetch the NBA teams from the backend 
  useEffect(() => {
    axios
      .get("https://betterpicks-demo.onrender.com/NBATeams")
      .then((response) => setTeams(response.data))
      .catch((error) => console.error("Error fetching NBA teams:", error));
  }, []);

  // Group teams by conference and division
  const groupedByConference: Record<string, Record<string, Team[]>> = {};
  Object.entries(divisionMap).forEach(([division, { conference, teams: nicknames }]) => {
    if (!groupedByConference[conference]) groupedByConference[conference] = {};
    groupedByConference[conference][division] = [];

    // Matches the backend data based on the team nickname
    nicknames.forEach((nickname) => {
      const team = teams.find((t) => t.TEAM_NICKNAME === nickname);
      if (team) groupedByConference[conference][division].push(team);
    });
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-purple-800 text-white p-10 flex flex-col items-center font-sans">
    <Dashboard></Dashboard>
      
      {/* Main Card Container */}
      <div className="w-full max-w-6xl mt-20 bg-white/5 shadow-xl rounded-xl px-8 py-10 sm:px-12 sm:py-14 space-y-8 relative border border-white/20">
        {/* Main Header */}
        <h2 className="text-4xl sm:text-5xl font-extrabold text-white text-center drop-shadow-xl mb-8 tracking-wide font-['Rajdhani']">
          NBA Teams 
        </h2>

        {/* Loops through the conferences */}
        {Object.entries(groupedByConference).map(([conference, divisions]) => (
          <div key={conference} className="mb-12">
            <h2 className="text-4xl font-extrabold text-center text-purple-300 mb-12 border-b-2 border-purple-400 pb-2 tracking-wide uppercase">
              {conference} Conference
            </h2>
            {/* Loops through the divisions */}
            {Object.entries(divisions).map(([division, teams]) => (
              <div key={division} className="mb-10">
                <h3 className="text-2xl sm:text-3xl font-bold text-center text-white bg-white/10 backdrop-blur-sm px-4 py-2 rounded-xl shadow-inner border border-white/10 mb-6 uppercase tracking-wide">
                  {division} Division
                </h3>

                {/* Teams Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                  {teams.map((team) => (
                    <Link
                      key={team.TEAM_ID}
                      href={`/team-history/${team.TEAM_NICKNAME.toLowerCase().replace(/\s+/g, "-")}`}
                    >
                      <div className="bg-gray-700 p-4 rounded-2xl shadow-xl border border-white/10 flex flex-col items-center justify-between transition-all duration-300 hover:shadow-2xl hover:scale-105 hover:bg-gray-800 cursor-pointer h-full min-h-[200px]">
                      <h2 className="text-xl font-bold text-white text-center tracking-wide mb-2">
                          {team.TEAM_NAME}
                        </h2>
                        {/* Team Logos */}
                        <Image
                          src={team.TEAM_LOGO}
                          alt={`${team.TEAM_NAME} logo`}
                          width={120}
                          height={120}
                          className="mb-4"
                        />
                       
          
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* Footer Section */}
      <footer className="mt-10 py-6 text-gray-400 text-sm">
        <div className="flex justify-center gap-6 mb-4">
          <a href="/privacy-policy" className="hover:text-green-400 transition-colors">
            Privacy Policy
          </a>
          <a href="/terms" className="hover:text-green-400 transition-colors">
            Terms of Service
          </a>
        </div>
        {/* Disclaimer */}
        <p>
          <span className="text-red-400 uppercase">Disclaimer:</span> Please gamble responsibly. If you have a gambling problem, seek help from a professional organization such as{" "}
          <a
            href="https://www.ncpgambling.org/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-green-400 font-bold underline hover:text-green-300 transition-colors duration-200"
          >
            National Council on Problem Gambling
          </a>.
        </p>
      </footer>
    </div>
  );
}

export default NBATeams;
