"use client";
import { useState, useEffect } from "react";
import Dashboard from "../components/Dashboard";
import Link from "next/link";

type TeamInfo = {
  TEAM_ID: string;
  TEAM_NAME: string;
  TEAM_ABR: string;
  TEAM_LOGO: string;
};

type SeasonAverages = {
  TEAM: string;
  TOTAL_GAMES: number;
  AVG_TOTAL_YARDS: number;
  AVG_TOTAL_TDS: number;
  AVG_PASSING_TDS: number;
  AVG_RUSHING_TDS: number;
  AVG_NUM_PLAYS: number;
  AVG_EPA: number;
  AVG_SUCCESS_RATE: number;
  AVG_TOTAL_RUSH_YARDS: number;
  AVG_TOTAL_PASS_YARDS: number;
  AVG_PASS_ATTEMPTS: number;
  AVG_RUSH_ATTEMPTS: number;
  AVG_COMPLETE_PASSES: number;
  AVG_INCOMPLETE_PASSES: number;
  AVG_SACKS: number;
  AVG_TOTAL_PENALTY_YARDS: number;
  AVG_FUMBLES_LOST: number;
  AVG_INTERCEPTIONS: number;
  AVG_THIRD_DOWN_CONVERTED: number;
  AVG_FOURTH_DOWN_CONVERTED: number;
  AVG_WP: number;
  AVG_HOME_WP: number;
  AVG_AWAY_WP: number;
};

type TeamData = {
  teamInfo: TeamInfo;
  seasonAverages: SeasonAverages;
};



const NFLTeamStats: React.FC = () => {
  const [teamsData, setTeamsData] = useState<TeamData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchTeamsData = async () => {
      try {
        const teamsResponse = await fetch('https://betterpicks-demo.onrender.com/nfl_teams');
        const teams: TeamInfo[] = await teamsResponse.json();

        const teamDataPromises = teams.map(async (team) => {
          const seasonAvgResponse = await fetch(`https://betterpicks-demo.onrender.com/nfl_teams/${team.TEAM_ABR}/season_avg`);
          const seasonAvgData = await seasonAvgResponse.json();
          return {
            teamInfo: team,
            seasonAverages: seasonAvgData.season_averages,
          };
        });

        const allTeamsData = await Promise.all(teamDataPromises);
        setTeamsData(allTeamsData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching team data:', error);
        setLoading(false);
      }
    };

    fetchTeamsData();
  }, []);

//   if (loading) {
//     return <div>Loading NFL Team Statistics...</div>;
//   }

  return (

    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-purple-800 text-white p-10 space-y-8 font-sans">
        <Dashboard></Dashboard>

      <h1 className="text-5xl sm:text-5xl font-extrabold text-white text-center drop-shadow-xl mb-8 tracking-wide font-['Rajdhani']">NFL Teams Season Averages</h1>
      <div className="w-110 mx-auto h-1 bg-purple-500 rounded-full"></div>
      <div className="overflow-x-auto bg-white/10 shadow-xl rounded-2xl p-6 border border-white/20">
      <table className="min-w-full border border-gray-700 text-sm sm:text-base">
      <thead className="bg-gray-900 text-white-300 sticky top-0 z-10">

            
  <tr>
    {[
      "Logo", "Team",  "Games", "Total Yards", "Total TDs", "Passing TDs", "Rushing TDs",
      "Num Plays", "EPA", "Success Rate", "Rush Yards", "Pass Yards", "Pass Attempts",
      "Rush Attempts", "Completions", "Incompletions", "Sacks", "Penalty Yards",
      "Fumbles Lost", "Interceptions", "3rd Down Conv", "4th Down Conv", 
      "Win Prob", "Home WP", "Away WP"
    ].map((header) => (
      <th key={header} className="px-4 py-2 border border-gray-700 text-center whitespace-nowrap g-white sticky bg-gray sticky top-0 z-10">
        {header}
      </th>
    ))}
  </tr>
</thead>
<tbody>
  {teamsData.map(({ teamInfo, seasonAverages }) => (
    <tr key={teamInfo.TEAM_ID} className="border border-gray-700">
      <td className="px-4 py-2 text-center">
      <Link href={`/nfl-teams/${teamInfo.TEAM_ABR}`}>
        <img
          src={teamInfo.TEAM_LOGO}
          alt={`${teamInfo.TEAM_NAME} logo`}
          className="h-10 mx-auto transition-transform duration-150"
        />
      </Link>
    </td> 
      <td className="px-4 py-2 text-center font-semibold">{teamInfo.TEAM_NAME}</td>
      <td className="px-4 py-2 text-center">{seasonAverages.TOTAL_GAMES}</td>
      <td className="px-4 py-2 text-center">{seasonAverages.AVG_TOTAL_YARDS}</td>
      <td className="px-4 py-2 text-center">{seasonAverages.AVG_TOTAL_TDS}</td>
      <td className="px-4 py-2 text-center">{seasonAverages.AVG_PASSING_TDS}</td>
      <td className="px-4 py-2 text-center">{seasonAverages.AVG_RUSHING_TDS}</td>
      <td className="px-4 py-2 text-center">{seasonAverages.AVG_NUM_PLAYS}</td>
      <td className="px-4 py-2 text-center">{seasonAverages.AVG_EPA}</td>
      <td className="px-4 py-2 text-center">{seasonAverages.AVG_SUCCESS_RATE}</td>
      <td className="px-4 py-2 text-center">{seasonAverages.AVG_TOTAL_RUSH_YARDS}</td>
      <td className="px-4 py-2 text-center">{seasonAverages.AVG_TOTAL_PASS_YARDS}</td>
      <td className="px-4 py-2 text-center">{seasonAverages.AVG_PASS_ATTEMPTS}</td>
      <td className="px-4 py-2 text-center">{seasonAverages.AVG_RUSH_ATTEMPTS}</td>
      <td className="px-4 py-2 text-center">{seasonAverages.AVG_COMPLETE_PASSES}</td>
      <td className="px-4 py-2 text-center">{seasonAverages.AVG_INCOMPLETE_PASSES}</td>
      <td className="px-4 py-2 text-center">{seasonAverages.AVG_SACKS}</td>
      <td className="px-4 py-2 text-center">{seasonAverages.AVG_TOTAL_PENALTY_YARDS}</td>
      <td className="px-4 py-2 text-center">{seasonAverages.AVG_FUMBLES_LOST}</td>
      <td className="px-4 py-2 text-center">{seasonAverages.AVG_INTERCEPTIONS}</td>
      <td className="px-4 py-2 text-center">{seasonAverages.AVG_THIRD_DOWN_CONVERTED}</td>
      <td className="px-4 py-2 text-center">{seasonAverages.AVG_FOURTH_DOWN_CONVERTED}</td>
      <td className="px-4 py-2 text-center">{seasonAverages.AVG_WP}</td>
      <td className="px-4 py-2 text-center">{seasonAverages.AVG_HOME_WP}</td>
      <td className="px-4 py-2 text-center">{seasonAverages.AVG_AWAY_WP}</td>
    </tr>
  ))}
</tbody>

        </table>
      </div>
    </div>
  );
};

export default NFLTeamStats;
