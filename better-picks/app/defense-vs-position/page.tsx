"use client";
import { FaShieldAlt } from "react-icons/fa";
import Dashboard from "../components/Dashboard";
import nbaTeams from "./data/nbaTeams"; // Assuming a separate file stores team data

const teamStats = [
    { team: "Atlanta Hawks", logo: "/logos/hawks.jpg", PTS: 110.5, REBS: 44.2, ASTS: 25.1, "3PM": 12.3, STL: 7.5, BLK: 5.6, TO: 14.0 },
    { team: "Boston Celtics", logo: "/logos/celtics.jpg", PTS: 110.5, REBS: 44.2, ASTS: 25.1, "3PM": 12.3, STL: 7.5, BLK: 5.6, TO: 14.0 },
    { team: "Brooklyn Nets", logo: "/logos/nets.jpg", PTS: 110.5, REBS: 44.2, ASTS: 25.1, "3PM": 12.3, STL: 7.5, BLK: 5.6, TO: 14.0 },
    { team: "Charlotte Hornets", logo: "/logos/lakers.jpg", PTS: 110.5, REBS: 44.2, ASTS: 25.1, "3PM": 12.3, STL: 7.5, BLK: 5.6, TO: 14.0 },
    { team: "Chicago Bulls", logo: "/logos/bulls.jpg", PTS: 110.5, REBS: 44.2, ASTS: 25.1, "3PM": 12.3, STL: 7.5, BLK: 5.6, TO: 14.0 },
    { team: "Cleveland Cavaliers", logo: "/logos/cavs.jpg", PTS: 110.5, REBS: 44.2, ASTS: 25.1, "3PM": 12.3, STL: 7.5, BLK: 5.6, TO: 14.0 },
    { team: "Dallas Mavericks", logo: "/logos/mavs.jpg", PTS: 110.5, REBS: 44.2, ASTS: 25.1, "3PM": 12.3, STL: 7.5, BLK: 5.6, TO: 14.0 },
    { team: "Denver Nuggets", logo: "/logos/nuggets.jpg", PTS: 110.5, REBS: 44.2, ASTS: 25.1, "3PM": 12.3, STL: 7.5, BLK: 5.6, TO: 14.0 },
    { team: "Detroit Pistons", logo: "/logos/pistons.jpg", PTS: 110.5, REBS: 44.2, ASTS: 25.1, "3PM": 12.3, STL: 7.5, BLK: 5.6, TO: 14.0 },
    { team: "Golden State Warriors", logo: "/logos/warriors.jpg", PTS: 110.5, REBS: 44.2, ASTS: 25.1, "3PM": 12.3, STL: 7.5, BLK: 5.6, TO: 14.0 },
    { team: "Houston Rockets", logo: "/logos/rockets.jpg", PTS: 110.5, REBS: 44.2, ASTS: 25.1, "3PM": 12.3, STL: 7.5, BLK: 5.6, TO: 14.0 },
    { team: "Indiana Pacers", logo: "/logos/pacers.jpg", PTS: 110.5, REBS: 44.2, ASTS: 25.1, "3PM": 12.3, STL: 7.5, BLK: 5.6, TO: 14.0 },
    { team: "LA Clippers", logo: "/logos/clippers.jpg", PTS: 110.5, REBS: 44.2, ASTS: 25.1, "3PM": 12.3, STL: 7.5, BLK: 5.6, TO: 14.0 },
    { team: "LA Lakers", logo: "/logos/lakers.jpg", PTS: 110.5, REBS: 44.2, ASTS: 25.1, "3PM": 12.3, STL: 7.5, BLK: 5.6, TO: 14.0 },
    { team: "Memphis Grizzlies", logo: "/logos/grizzlies.jpg", PTS: 110.5, REBS: 44.2, ASTS: 25.1, "3PM": 12.3, STL: 7.5, BLK: 5.6, TO: 14.0 },
    { team: "Miami Heat", logo: "/logos/heat.jpg", PTS: 110.5, REBS: 44.2, ASTS: 25.1, "3PM": 12.3, STL: 7.5, BLK: 5.6, TO: 14.0 },
    { team: "Milwaukee Bucks", logo: "/logos/bucks.jpg", PTS: 110.5, REBS: 44.2, ASTS: 25.1, "3PM": 12.3, STL: 7.5, BLK: 5.6, TO: 14.0 },
    { team: "Minnesota Timberwolves", logo: "/logos/wolves.jpg", PTS: 110.5, REBS: 44.2, ASTS: 25.1, "3PM": 12.3, STL: 7.5, BLK: 5.6, TO: 14.0 },
    { team: "New Orleans Pelicans", logo: "/logos/pelicans.jpg", PTS: 110.5, REBS: 44.2, ASTS: 25.1, "3PM": 12.3, STL: 7.5, BLK: 5.6, TO: 14.0 },
    { team: "New York Knicks", logo: "/logos/knicks.jpg", PTS: 110.5, REBS: 44.2, ASTS: 25.1, "3PM": 12.3, STL: 7.5, BLK: 5.6, TO: 14.0 },
    { team: "Oklahoma City Thunder", logo: "/logos/thunder.jpg", PTS: 110.5, REBS: 44.2, ASTS: 25.1, "3PM": 12.3, STL: 7.5, BLK: 5.6, TO: 14.0 },
    { team: "Orlando Magic", logo: "/logos/magic.jpg", PTS: 110.5, REBS: 44.2, ASTS: 25.1, "3PM": 12.3, STL: 7.5, BLK: 5.6, TO: 14.0 },
    { team: "Philadelphia 76ers", logo: "/logos/76ers.jpg", PTS: 110.5, REBS: 44.2, ASTS: 25.1, "3PM": 12.3, STL: 7.5, BLK: 5.6, TO: 14.0 },
    { team: "Phoenix Suns", logo: "/logos/suns.jpg", PTS: 110.5, REBS: 44.2, ASTS: 25.1, "3PM": 12.3, STL: 7.5, BLK: 5.6, TO: 14.0 },
    { team: "Portland Trail Blazers", logo: "/logos/trailblazers.jpg", PTS: 110.5, REBS: 44.2, ASTS: 25.1, "3PM": 12.3, STL: 7.5, BLK: 5.6, TO: 14.0 },
    { team: "Sacremento Kings", logo: "/logos/kings.jpg", PTS: 110.5, REBS: 44.2, ASTS: 25.1, "3PM": 12.3, STL: 7.5, BLK: 5.6, TO: 14.0 },
    { team: "San Antonio Spurs", logo: "/logos/spurs.jpg", PTS: 110.5, REBS: 44.2, ASTS: 25.1, "3PM": 12.3, STL: 7.5, BLK: 5.6, TO: 14.0 },
    { team: "Toronto Raptors", logo: "/logos/raptors.jpg", PTS: 110.5, REBS: 44.2, ASTS: 25.1, "3PM": 12.3, STL: 7.5, BLK: 5.6, TO: 14.0 },
    { team: "Utah Jazz", logo: "/logos/jazz.jpg", PTS: 110.5, REBS: 44.2, ASTS: 25.1, "3PM": 12.3, STL: 7.5, BLK: 5.6, TO: 14.0 },
    { team: "Washington Wizards", logo: "/logos/wizards.jpg", PTS: 110.5, REBS: 44.2, ASTS: 25.1, "3PM": 12.3, STL: 7.5, BLK: 5.6, TO: 14.0 },

];

export default function DefenseVsNBA() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white p-10 flex flex-col items-center font-['Orbitron']">
      {/* Header with Navigation */}
      <header className="flex justify-between items-center w-full max-w-5xl py-5 px-10 bg-white/10 backdrop-blur-lg rounded-xl shadow-lg">
        <h1 className="text-4xl tracking-wide uppercase text-green-400 flex items-center gap-2 font-['Rajdhani']">
          <FaShieldAlt className="text-green-400" /> NBA Defense Stats
        </h1>
        <nav className="flex gap-8 text-lg">
          <Dashboard />
        </nav>
      </header>

      {/* Defensive Stats Table */}
      <div className="w-full max-w-5xl mt-10 bg-white/10 backdrop-blur-lg shadow-lg rounded-xl p-6">
        <h2 className="text-4xl font-bold text-green-400 text-center sm:text-left mb-4">Defensive Team Stats</h2>
        <div className="overflow-y-auto max-h-[500px] rounded-lg p-2">
          <table className="w-full border-collapse border border-gray-700 text-lg">
            <thead className="sticky top-0 bg-gray-800 text-green-400">
              <tr>
                <th className="border border-gray-700 px-6 py-3 text-left">Team</th>
                <th className="border border-gray-700 px-6 py-3">PTS</th>
                <th className="border border-gray-700 px-6 py-3">REBS</th>
                <th className="border border-gray-700 px-6 py-3">ASTS</th>
                <th className="border border-gray-700 px-6 py-3">3PM</th>
                <th className="border border-gray-700 px-6 py-3">STL</th>
                <th className="border border-gray-700 px-6 py-3">BLK</th>
                <th className="border border-gray-700 px-6 py-3">TO</th>
              </tr>
            </thead>
            <tbody>
              {teamStats.map((team, index) => (
                <tr key={index} className="border border-gray-700">
                  <td className="border border-gray-700 px-6 py-3 flex items-center gap-3">
                    <img src={team.logo} alt={team.team} className="w-8 h-8" /> {team.team}
                  </td>
                  <td className="border border-gray-700 px-6 py-3 text-center">{team.PTS}</td>
                  <td className="border border-gray-700 px-6 py-3 text-center">{team.REBS}</td>
                  <td className="border border-gray-700 px-6 py-3 text-center">{team.ASTS}</td>
                  <td className="border border-gray-700 px-6 py-3 text-center">{team["3PM"]}</td>
                  <td className="border border-gray-700 px-6 py-3 text-center">{team.STL}</td>
                  <td className="border border-gray-700 px-6 py-3 text-center">{team.BLK}</td>
                  <td className="border border-gray-700 px-6 py-3 text-center">{team.TO}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <footer className="mt-auto py-6 text-gray-400">
        <p>&copy; 2025 NBA Defense Stats. All rights reserved.</p>
      </footer>
    </div>
  );
}
