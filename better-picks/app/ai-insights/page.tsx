"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

// Import the Dashboard component
import Dashboard from "../components/Dashboard";  // Adjust the path according to your project structure

// Sample player prop bet data (replace with actual API data)

// Define the structure of your prop data
type PlayerProp = {
  player: string;
  betType: string;
  prediction: string;
  outcome: number;
  result: string;
  reason: string;
};

async function fetchPlayerPropData() {
  return [
    { player: "LeBron James", betType: "Points Over/Under", prediction: "Over 25.5", outcome: 28, result: "Won", reason: "LeBron had a strong game, scoring above his average." },
    { player: "Giannis Antetokounmpo", betType: "Rebounds Over/Under", prediction: "Under 12.5", outcome: 15, result: "Lost", reason: "Giannis dominated the boards unexpectedly." },
    { player: "Stephen Curry", betType: "Assists Over/Under", prediction: "Over 6.5", outcome: 8, result: "Won", reason: "Curry was facilitating well and had a high assist game." },
    { player: "Kevin Durant", betType: "Points Over/Under", prediction: "Under 27.5", outcome: 24, result: "Won", reason: "Durant struggled with shooting efficiency." },
    { player: "James Harden", betType: "Assists Over/Under", prediction: "Under 8.5", outcome: 9, result: "Lost", reason: "Harden exceeded his assists due to heavy ball movement." },
  ];
}

export default function PlayerPropAnalysisPage() {
  const [props, setProps] = useState<PlayerProp[]>([]);
  useEffect(() => {
    async function loadProps() {
      const data = await fetchPlayerPropData();
      setProps(data);
    }
    loadProps();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white p-10 flex flex-col items-center font-['Orbitron']">
      {/* Header with Navigation */}
      <header className="flex justify-between items-center w-full max-w-6xl py-5 px-10 bg-white/10 backdrop-blur-lg rounded-xl shadow-lg">
        <div className="flex items-center gap-10">
          {/* Player Prop Analysis Title */}
          <h1 className="text-4xl tracking-wide uppercase text-green-400 font-['Rajdhani']">
            AI Insights - Player Prop Analysis
          </h1>

          {/* Dashboard Component with Links */}
          <Dashboard /> {/* Dashboard component is rendered with links inside */}
        </div>
        
        {/* New Navigation with only relevant links */}
        <nav className="flex gap-8 text-lg">
          {/* Navigation links (e.g., Home, Latest Games, etc.) can go here if needed */}
        </nav>
      </header>

      {/* Scrollable Table Section */}
      <div className="w-full max-w-6xl mt-10 bg-white/10 backdrop-blur-lg shadow-lg rounded-xl p-6">
        <div className="overflow-y-auto max-h-[500px] rounded-lg p-2">
          <table className="w-full border-collapse border border-gray-700 text-lg">
            <thead className="sticky top-0 bg-gray-800 text-green-400">
              <tr>
                <th className="border border-gray-700 px-4 py-3 text-left">Player</th>
                <th className="border border-gray-700 px-4 py-3">Bet Type</th>
                <th className="border border-gray-700 px-4 py-3">Prediction</th>
                <th className="border border-gray-700 px-4 py-3">Outcome</th>
                <th className="border border-gray-700 px-4 py-3">Result</th>
                <th className="border border-gray-700 px-4 py-3">Reason</th>
              </tr>
            </thead>
            <tbody>
              {props.map((prop, index) => (
                <tr key={index} className="border border-gray-700">
                  <td className="border border-gray-700 px-4 py-3">{prop.player}</td>
                  <td className="border border-gray-700 px-4 py-3">{prop.betType}</td>
                  <td className="border border-gray-700 px-4 py-3">{prop.prediction}</td>
                  <td className="border border-gray-700 px-4 py-3">{prop.outcome}</td>
                  <td
                    className={`border border-gray-700 px-4 py-3 text-center font-bold ${
                      prop.result === "Won" ? "text-green-400" : "text-red-400"
                    }`}
                  >
                    {prop.result}
                  </td>
                  <td className="border border-gray-700 px-4 py-3">{prop.reason}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Optional Home Button */}
      {/* 
      <div className="mt-6">
        <Link href="/">
          <button className="bg-green-500 text-white px-6 py-3 rounded-xl text-lg font-semibold hover:bg-green-600 transition">
            Back to Home
          </button>
        </Link>
      </div>
      */}
    </div>
  );
}


