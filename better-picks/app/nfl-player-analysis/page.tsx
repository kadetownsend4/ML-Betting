"use client";
import { FaFootballBall } from "react-icons/fa";
import Dashboard from "../components/Dashboard";
import Link from "next/link";  // Import Link for navigation

// NFL Player Data with relevant statistics
const playerData = [
    { name: "Patrick Mahomes", team: "Chiefs", passingYards: 320, touchdowns: 3, interceptions: 1 },
    { name: "Josh Allen", team: "Bills", passingYards: 280, touchdowns: 2, interceptions: 0 },
    { name: "Lamar Jackson", team: "Ravens", passingYards: 250, rushingYards: 75, touchdowns: 2 },
    { name: "Derrick Henry", team: "Ravens", rushingYards: 105, touchdowns: 1 },
    { name: "Ceedee Lamb", team: "Cowboys", receivingYards: 120, touchdowns: 2, receptions: 8 },
    { name: "Saquon Barkley", team: "Eagles", rushingYards: 150, touchdowns: 1 },
  ];

  export default function PlayerAnalysis() {
    return (
      <Dashboard>
        <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white p-10 flex flex-col items-center font-['Orbitron']">
          <div className="w-full max-w-6xl mt-10 bg-white/10 shadow-lg rounded-xl p-6">
            <h2 className="text-4xl font-bold text-green-400 text-center sm:text-left mb-6">NFL Player Prop Analysis</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
              {playerData.map((player, index) => (
                <div key={index} className="bg-gray-800 p-4 rounded-lg text-center shadow-md flex flex-col items-center min-h-[150px] w-full">
                  <h3 className="text-xl font-bold text-green-400 break-words leading-tight text-center">{player.name}</h3>
                  <p className="text-gray-300">{player.team}</p>
                  <Link href={`/player/${encodeURIComponent(player.name)}`}>
                    <button className="mt-auto px-4 py-2 bg-green-500 text-white font-bold rounded-lg hover:bg-green-600">
                      View Props
                    </button>
                  </Link>
                </div>
              ))}
            </div>
          </div>
  
          <footer className="mt-auto py-6 text-gray-400">
            <p>&copy; 2025 NFL Stats. All rights reserved.</p>
          </footer>
        </div>
      </Dashboard>
    );
  }
  
