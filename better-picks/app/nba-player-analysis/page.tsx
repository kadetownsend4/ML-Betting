"use client";
import { FaBasketballBall } from "react-icons/fa";
import Dashboard from "../components/Dashboard";
import Link from "next/link";  // Import Link for navigation

const playerData = [
  { name: "LeBron James", team: "Lakers", points: 27, assists: 8, rebounds: 7 },
  { name: "Stephen Curry", team: "Warriors", points: 30, assists: 6, rebounds: 5 },
  { name: "Giannis Antetokounmpo", team: "Bucks", points: 29, assists: 5, rebounds: 11 },
  { name: "Luka Dončić", team: "Lakers", points: 32, assists: 9, rebounds: 8 },
  { name: "Kevin Durant", team: "Suns", points: 28, assists: 7, rebounds: 6 },
  { name: "Jayson Tatum", team: "Celtics", points: 26, assists: 4, rebounds: 8 },
];

export default function PlayerAnalysis() {
  return (
    <Dashboard>
        <div className="w-full max-w-6xl mt-20 bg-white/5 shadow-xl rounded-xl px-8 py-10 sm:px-12 sm:py-14 space-y-8 relative z-50 border border-white/20">
          <h2 className="text-4xl sm:text-5xl font-extrabold text-white text-center drop-shadow-xl mb-8 tracking-wide font-['Rajdhani']">
            NBA Player Prop Analysis
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
            {playerData.map((player, index) => (
              <div key={index} className="bg-gray-900 p-5 rounded-2xl shadow-xl border border-white/10 flex flex-col items-center justify-center transition-all duration-300 hover:shadow-2xl hover:scale-105 hover:bg-gray-800">
                <h3 className="text-xl font-bold text-white text-center tracking-wide mb-2">{player.name}</h3>
                <p className="text-sm text-gray-300">{player.team}</p>
                <Link href={`/player/${encodeURIComponent(player.name.toLowerCase().replace(/\s+/g, "-"))}`}>
                  <button className="mt-auto px-4 py-2 bg-purple-500 text-white font-bold rounded-lg hover:bg-purple-600 transition-all duration-300 ease-in-out">
                    View Props
                  </button>
                </Link>
              </div>
            ))}
          </div>

        <footer className="mt-10 py-6 text-gray-400 text-sm">
          {/* <div className="flex justify-center gap-6 mb-4">
            <a href="/privacy-policy" className="hover:text-purple-400 transition-colors">
              Privacy Policy
            </a>
            <a href="/terms" className="hover:text-purple-400 transition-colors">
              Terms of Service
            </a>
          </div> */}
          <p>
            {/* <span className="text-red-400 uppercase">Disclaimer:</span> Please gamble responsibly. If you have a gambling problem, seek help from a professional organization such as{" "}
            <a
              href="https://www.ncpgambling.org/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-green-400 font-bold underline hover:text-green-300 transition-colors duration-200"
            >
              National Council on Problem Gambling
            </a>. */}
          </p>
        </footer>
      </div>
    </Dashboard>
  );
}
