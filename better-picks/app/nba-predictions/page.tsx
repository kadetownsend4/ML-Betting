"use client";
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
  TEAM_W?: number;
};

const features = ["OG", "OG3", "REG", "FE", "CF"];
const models = ["LR", "DT", "SVM", "GNB", "GB", "KNN", "MLP", "RF"];
const teams = [
  "Hawks", "Celtics", "Nets", "Hornets", "Bulls", "Cavaliers", "Mavericks",
  "Nuggets", "Pistons", "Warriors", "Rockets", "Pacers", "Clippers", "Lakers",
  "Grizzlies", "Heat", "Bucks", "Timberwolves", "Pelicans", "Knicks", "Thunder",
  "Magic", "76ers", "Suns", "Trail Blazers", "Kings", "Spurs", "Raptors",
  "Jazz", "Wizards"
];


export default function TeamPredictionsPage() {
  const [selectedFeature, setSelectedFeature] = useState("");
  const [selectedModel, setSelectedModel] = useState("");
  const [selectedTeam, setSelectedTeam] = useState(""); // 👈 NEW internal team state
  const [selectedDate, setSelectedDate] = useState("");
  const [predictions, setPredictions] = useState<PredictionGame[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [mode, setMode] = useState<"team" | "date">("team");

  useEffect(() => {
    if (mode === "team" && selectedTeam && selectedFeature && selectedModel) {
      setLoading(true);
      setError(null);

      const url = `https://betterpicks-demo.onrender.com/NBAPredictions/team/${selectedTeam}/${selectedFeature}/${selectedModel}`;
      console.log("📡 Team URL:", url);

      axios
        .get(url)
        .then((res) => {
          if (!res.data || res.data.length === 0) throw new Error("No predictions found.");
          setPredictions(res.data);
        })
        .catch((err) => {
          console.error("❌ Team prediction fetch failed:", err);
          setError("Could not load predictions for this team.");
        })
        .finally(() => setLoading(false));
    }

    if (mode === "date" && selectedDate && selectedFeature && selectedModel) {
      setLoading(true);
      setError(null);

      const url = `https://betterpicks-demo.onrender.com/NBAPredictions/date/${selectedDate}/${selectedFeature}/${selectedModel}`;
      console.log("📡 Date URL:", url);

      axios
        .get(url)
        .then((res) => {
          if (!res.data || res.data.length === 0) throw new Error("No predictions found.");
          setPredictions(res.data);
        })
        .catch((err) => {
          console.error("❌ Date prediction fetch failed:", err);
          setError("Could not load predictions for that date.");
        })
        .finally(() => setLoading(false));
    }
  }, [selectedTeam, selectedDate, selectedFeature, selectedModel, mode]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-purple-900 text-white px-4 sm:px-10 py-10 font-sans">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-10 pb-4 border-b border-purple-600">
          <div>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-purple-300 tracking-wide uppercase">
              NBA Predictions
            </h1>
            <p className="text-sm text-purple-200 mt-1">
              {mode === "team" && selectedTeam && selectedFeature && selectedModel &&
                `Predictions for ${selectedTeam} using ${selectedFeature} + ${selectedModel}`}
              {mode === "date" && selectedDate && selectedFeature && selectedModel &&
                `Predictions for ${selectedDate} using ${selectedFeature} + ${selectedModel}`}
            </p>
          </div>
          <Link href="/latest-games" className="text-green-400 mt-4 sm:mt-0 hover:underline text-sm sm:text-base">
            ← Back to All Teams
          </Link>
        </div>

        {/* Mode Toggle */}
        <div className="flex gap-4 mb-8">
          <button
            onClick={() => setMode("team")}
            className={`px-5 py-2 rounded-lg transition-all ${
              mode === "team" ? "bg-purple-700" : "bg-gray-700"
            }`}
          >
            By Team
          </button>
          <button
            onClick={() => setMode("date")}
            className={`px-5 py-2 rounded-lg transition-all ${
              mode === "date" ? "bg-purple-700" : "bg-gray-700"
            }`}
          >
            By Date
          </button>
        </div>

        <div className="bg-gray-800 py-4 px-6 rounded-lg shadow-md mb-8 flex flex-wrap justify-center gap-4">
  {mode === "team" && (
    <div className="w-full sm:w-[330px]">
      <label className="block mb-1 text-purple-200 font-medium">Select Team</label>
      <select
        value={selectedTeam}
        onChange={(e) => setSelectedTeam(e.target.value)}
        className="w-full p-3 rounded bg-gray-900 text-white"
      >
        <option value="">-- Choose a Team --</option>
        {teams.map((team) => (
          <option key={team} value={team}>{team}</option>
        ))}
      </select>
    </div>
  )}

  {mode === "date" && (
    <div className="w-full sm:w-[330px]">
      <label className="block mb-1 text-purple-200 font-medium">Select Date</label>
      <input
        type="date"
        value={selectedDate}
        onChange={(e) => setSelectedDate(e.target.value)}
        className="w-full p-3 rounded bg-gray-900 text-white"
      />
    </div>
  )}

  <div className="w-full sm:w-[330px]">
    <label className="block mb-1 text-purple-200 font-medium">Select Feature</label>
    <select
      value={selectedFeature}
      onChange={(e) => setSelectedFeature(e.target.value)}
      className="w-full p-3 rounded bg-gray-900 text-white"
    >
      <option value="">-- Choose Feature --</option>
      {features.map((f) => (
        <option key={f} value={f}>{f}</option>
      ))}
    </select>
  </div>

  <div className="w-full sm:w-[330px]">
    <label className="block mb-1 text-purple-200 font-medium">Select Model</label>
    <select
      value={selectedModel}
      onChange={(e) => setSelectedModel(e.target.value)}
      className="w-full p-3 rounded bg-gray-900 text-white"
    >
      <option value="">-- Choose Model --</option>
      {models.map((m) => (
        <option key={m} value={m}>{m}</option>
      ))}
    </select>
  </div>
</div>


        {/* Status Messages */}
        {loading && <p className="text-center text-gray-400 text-lg">Loading predictions...</p>}
        {!loading && error && <p className="text-center text-red-400 text-lg">{error}</p>}
        {!loading && predictions.length === 0 && !error && (
          <p className="text-center text-yellow-400 text-lg">No predictions found. Try another combination.</p>
        )}

        {/* Prediction Cards */}
        {predictions.length > 0 && (
          <ul className="space-y-6">
          {predictions.map((game) => {
            const predictedWinner = game.HOME_W_PROB > game.AWAY_W_PROB ? "HOME" : "AWAY";
            return (
              <li
                key={game.GAME_ID}
                className="bg-gray-900 p-6 rounded-xl shadow-lg border border-white/10 hover:border-purple-400 transition"
              >
                <div className="flex items-center justify-between mb-4 flex-wrap gap-4">
                  <div className="flex items-center gap-4">
                    <Image src={game.AWAY_LOGO} alt={game.AWAY_TEAM} width={40} height={40} className="rounded" />
                    <span className={`text-lg font-semibold ${predictedWinner === "AWAY" ? "text-green-500 font-extrabold" : ""}`}>
                      {game.AWAY_TEAM}
                    </span>
                    <span className="mx-2 text-purple-300 font-bold">@</span>
                    <span className={`text-lg font-semibold ${predictedWinner === "HOME" ? "text-green-500 font-extrabold" : ""}`}>
                      {game.HOME_TEAM}
                    </span>
                    <Image src={game.HOME_LOGO} alt={game.HOME_TEAM} width={40} height={40} className="rounded" />
                  </div>
                  <p className="text-sm text-gray-400">Date: {game.GAME_DATE}</p>
                </div>
        
                <div className="grid grid-cols-2 sm:grid-cols-4 text-center gap-4 text-sm text-gray-200">
                  <div>
                    <p className="text-purple-300">Home Win %</p>
                    <p className="text-green-400 text-xl font-bold">{(game.HOME_W_PROB * 100).toFixed(1)}%</p>
                  </div>
                  <div>
                    <p className="text-purple-300">Away Win %</p>
                    <p className="text-blue-400 text-xl font-bold">{(game.AWAY_W_PROB * 100).toFixed(1)}%</p>
                  </div>
        
                  {game.TEAM_W !== undefined && (
                    <div className="col-span-2 sm:col-span-1">
                      <p className="text-purple-300">Actual Win</p>
                      <p className={`text-white font-semibold ${game.TEAM_W === 1 ? "text-green-300" : "text-red-400"}`}>
                        {game.TEAM_W === 1 ? "Win" : "Loss"}
                      </p>
                    </div>
                  )}
        
                  <div className="col-span-2 sm:col-span-1">
                    <p className="text-purple-300">Predicted Winner</p>
                    <p className={`text-white font-semibold ${predictedWinner === "HOME" ? "text-green-300" : "text-blue-300"}`}>
                      {predictedWinner === "HOME" ? game.HOME_TEAM : game.AWAY_TEAM}
                    </p>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
        
        )}
      </div>
    </div>
  );
}