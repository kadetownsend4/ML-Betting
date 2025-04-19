"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Dashboard from "../components/Dashboard";

type PlayerProp = {
  player: string;
  betType: string;
  prediction: string;
  outcome: number;
  result: string;
  analysis: string;
};

async function fetchPlayerPropData() {
  return [
    { player: "LeBron James", betType: "Points Over/Under", prediction: "Over 25.5", outcome: 28, result: "Won", analysis: "LeBron had a strong game, scoring above his average." },
    { player: "Giannis Antetokounmpo", betType: "Rebounds Over/Under", prediction: "Under 12.5", outcome: 15, result: "Lost", analysis: "Giannis dominated the boards unexpectedly." },
    { player: "Stephen Curry", betType: "Assists Over/Under", prediction: "Over 6.5", outcome: 8, result: "Won", analysis: "Curry was facilitating well and had a high assist game." },
    { player: "Kevin Durant", betType: "Points Over/Under", prediction: "Under 27.5", outcome: 24, result: "Won", analysis: "Durant struggled with shooting efficiency." },
    { player: "James Harden", betType: "Assists Over/Under", prediction: "Under 8.5", outcome: 9, result: "Lost", analysis: "Harden exceeded his assists due to heavy ball movement." },
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
    <Dashboard>
      {/* <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white px-6 py-10 flex flex-col items-center font-['Orbitron']"> */}
        {/* Title */}
        <h1 className="text-4xl font-bold text-purple-400 mt-10 mb-6 tracking-wide uppercase font-['Rajdhani']">
          AI Insights : Player Prop Analysis
        </h1>

        {/* Table Section */}
        <div className="w-full max-w-6xl bg-white/10 shadow-xl rounded-xl p-6">
          <div className="overflow-y-auto max-h-[500px] rounded-lg">
            <table className="w-full border-collapse border border-gray-700 text-lg">
              <thead className="bg-gray-800 text-purple-400">
                <tr>
                  <th className="border border-gray-700 px-4 py-3 text-left">Player</th>
                  <th className="border border-gray-700 px-4 py-3">Bet Type</th>
                  <th className="border border-gray-700 px-4 py-3">Prediction</th>
                  <th className="border border-gray-700 px-4 py-3">Outcome</th>
                  <th className="border border-gray-700 px-4 py-3">Result</th>
                  <th className="border border-gray-700 px-4 py-3">Analysis</th>
                </tr>
              </thead>
              <tbody>
                {props.map((prop, index) => (
                  <tr key={index} className="border border-gray-700 hover:bg-gray-800 transition">
                    <td className="border border-gray-700 px-4 py-3">{prop.player}</td>
                    <td className="border border-gray-700 px-4 py-3 text-center">{prop.betType}</td>
                    <td className="border border-gray-700 px-4 py-3 text-center">{prop.prediction}</td>
                    <td className="border border-gray-700 px-4 py-3 text-center">{prop.outcome}</td>
                    <td
                      className={`border border-gray-700 px-4 py-3 text-center font-bold ${
                        prop.result === "Won" ? "text-green-400" : "text-red-400"
                      }`}
                    >
                      {prop.result}
                    </td>
                    <td className="border border-gray-700 px-4 py-3">{prop.analysis}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Optional Back Button */}
        {/* <div className="mt-8">
          <Link href="/">
            <button className="bg-green-500 text-white px-6 py-3 rounded-xl text-lg font-semibold hover:bg-green-600 transition">
              Back to Home
            </button>
          </Link>
        </div> */}
      {/* </div> */}
    </Dashboard>
  );
}
