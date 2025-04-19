"use client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import Image from "next/image";

type PredictionGame = {
  GAME_ID: number;
  GAME_DATE: string;
  HOME_TEAM: string;
  AWAY_TEAM: string;
  HOME_W_PROB: number;
  AWAY_W_PROB: number;
  HOME_LOGO: string;
  AWAY_LOGO: string;
  TEAM_W: number;
};

const features = ["OG", "OG3", "REG", "FE", "CF"];
const models = ["LR", "DT", "SVM", "GNB", "GB", "KNN", "MLP", "RF"];

export default function TeamPredictionsPage() {
  const { team } = useParams();
  const [selectedFeature, setSelectedFeature] = useState("");
  const [selectedModel, setSelectedModel] = useState("");
  const [predictions, setPredictions] = useState<PredictionGame[]>([]);
  const [teamName, setTeamName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [mode, setMode] = useState<"team" | "date">("team");
  const [selectedDate, setSelectedDate] = useState("");



  useEffect(() => {
    if (team) {
      const formatted = team.toString().replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase());
      setTeamName(formatted);
    }
  }, [team]);

  useEffect(() => {
    if (mode === "team" && team && selectedFeature && selectedModel) {
      setLoading(true);
      setError(null);
  
      const formattedTeam = team.toString().replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase());
      
      const url = `https://betterpicks-demo.onrender.com/NBAPredictions/team/${formattedTeam}/${selectedFeature}/${selectedModel}`;
      console.log("📡 Hitting URL:", url);
  
      axios
        .get(url)
        .then((res) => {
          if (!res.data || res.data.length === 0) {
            throw new Error("No predictions found.");
          }
          setPredictions(res.data);
        })
        .catch((err) => {
          console.error("❌ Prediction fetch failed:", err);
          setError("Could not load predictions. Please try another combination.");
        })
        .finally(() => setLoading(false));
    }
  }, [team, selectedFeature, selectedModel, mode]);
  
  
  
  

  return (

    
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-purple-900 text-white p-8 font-sans">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-10 border-b-2 border-purple-500 pb-4">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-purple-300 tracking-wide uppercase">
          {teamName} Predictions
        </h1>
        <Link href={`/team-history/${team}`} className="text-green-400 mt-4 sm:mt-0 hover:underline">
          ← Back to History
        </Link>
      </div>

      <div className="flex gap-4 mb-6">
  <button
    onClick={() => setMode("team")}
    className={`px-4 py-2 rounded ${mode === "team" ? "bg-purple-700" : "bg-gray-700"} text-white`}
  >
    By Team
  </button>
  <button
    onClick={() => setMode("date")}
    className={`px-4 py-2 rounded ${mode === "date" ? "bg-purple-700" : "bg-gray-700"} text-white`}
  >
    By Date
  </button>
</div>


{mode === "date" && (
  <div className="mb-6">
    <label className="block mb-2 text-purple-200">Select Game Date:</label>
    <input
      type="date"
      value={selectedDate}
      onChange={(e) => setSelectedDate(e.target.value)}
      className="p-3 w-full sm:w-64 bg-gray-800 text-white rounded"
    />
  </div>
)}


      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">
        <div>
          <label className="block mb-2 font-semibold text-purple-200">Select Feature:</label>
          <select
            className="w-full p-3 rounded bg-gray-800 text-white"
            onChange={(e) => setSelectedFeature(e.target.value)}
            value={selectedFeature}
          >
            <option value="">-- Choose Feature --</option>
            {features.map((f) => (
              <option key={f} value={f}>{f}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block mb-2 font-semibold text-purple-200">Select Model:</label>
          <select
            className="w-full p-3 rounded bg-gray-800 text-white"
            onChange={(e) => setSelectedModel(e.target.value)}
            value={selectedModel}
          >
            <option value="">-- Choose Model --</option>
            {models.map((m) => (
              <option key={m} value={m}>{m}</option>
            ))}
          </select>
        </div>
      </div>

      {loading && (
  <p className="text-center text-gray-400 text-lg">Loading predictions...</p>
)}

    {!loading && error && (
    <p className="text-center text-red-400 text-lg">{error}</p>
    )}

    {!loading && predictions.length === 0 && !error && (
    <p className="text-center text-yellow-400 text-lg">
        No predictions found. Try another model/feature combo.
    </p>
    )}


      {predictions.length > 0 && (
        <ul className="space-y-5">
          {predictions.map((game) => (
            <li key={game.GAME_ID} className="bg-gray-800 p-5 rounded-xl shadow-lg border border-white/10">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <Image src={game.AWAY_LOGO} alt={game.AWAY_TEAM} width={40} height={40} />
                  <span className="font-bold text-lg">{game.AWAY_TEAM}</span>
                  <span className="mx-2 text-purple-300">@</span>
                  <span className="font-bold text-lg">{game.HOME_TEAM}</span>
                  <Image src={game.HOME_LOGO} alt={game.HOME_TEAM} width={40} height={40} />
                </div>
                <p className="text-sm text-gray-400">Date: {game.GAME_DATE}</p>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 text-center gap-3 text-sm text-gray-200">
                <div>
                  <p className="text-purple-300">Home Win %</p>
                  <p className="text-green-400 text-xl font-bold">{(game.HOME_W_PROB * 100).toFixed(1)}%</p>
                </div>
                <div>
                  <p className="text-purple-300">Away Win %</p>
                  <p className="text-blue-400 text-xl font-bold">{(game.AWAY_W_PROB * 100).toFixed(1)}%</p>
                </div>
                <div>
                  <p className="text-purple-300">Actual Win</p>
                  <p className="text-white font-semibold">{game.TEAM_W === 1 ? "Win" : "Loss"}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
