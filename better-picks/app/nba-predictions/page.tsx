"use client";
import { useEffect, useState } from "react";
import axios from "axios"; // Client for API Requests
import Link from "next/link";
import Image from "next/image";
import Dashboard from "../components/Dashboard"; // Custom Dashboard Component

// Used ChatGPT to help me structure this page with these links below. It was a long process as I was encountering lots of errors with displaying the correct data.
// I was able to display everything correctly though with the help of these links and Tim and Kade. 
// https://chatgpt.com/share/6801552c-89f8-8004-9875-e4db021f4355
// https://chatgpt.com/share/680543c5-7134-8004-9b5a-e73cd2e032d5



// Define the types that match the backend
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
  TEAM_W_LOOK?: string;
};


// Options for user selections
const features = ["OG", "OG3", "REG", "FE", "CF"];
const models = ["LR", "DT", "SVM", "GNB", "GB", "KNN", "MLP", "RF"];
const teams = [
  "Hawks", "Celtics", "Nets", "Hornets", "Bulls", "Cavaliers", "Mavericks",
  "Nuggets", "Pistons", "Warriors", "Rockets", "Pacers", "Clippers", "Lakers",
  "Grizzlies", "Heat", "Bucks", "Timberwolves", "Pelicans", "Knicks", "Thunder",
  "Magic", "76ers", "Suns", "Trail Blazers", "Kings", "Spurs", "Raptors",
  "Jazz", "Wizards"
];

// Main component which handles the NBA predictions
export default function TeamPredictionsPage() {
  // State hooks 
  const [selectedFeature, setSelectedFeature] = useState(""); // Feature Sets
  const [selectedModel, setSelectedModel] = useState(""); // Models
  const [selectedTeam, setSelectedTeam] = useState(""); // Selected NBA team
  const [selectedDate, setSelectedDate] = useState(""); // Selected date 
  const [predictions, setPredictions] = useState<PredictionGame[]>([]); // List of predictions
  const [loading, setLoading] = useState(false); 
  const [error, setError] = useState<string | null>(null); // Error if API fails
  const [mode, setMode] = useState<"team" | "date">("team"); //  Mode to search by team or date
  
  // Gets the predictions when the user changes the input of the selected options
  useEffect(() => {
    // Fetches by team
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

    // Fetches by date
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
      <Dashboard></Dashboard>

      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="w-full max-w-6xl mx-auto flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-10 px-4 sm:px-0 py-6 border-b border-purple-600">
          <div className="flex-1">
            <h1 className="text-4xl sm:text-5xl font-extrabold text-purple-300 tracking-wide uppercase">
              NBA Predictions
            </h1>
            <p className="text-sm text-purple-200 mt-2 sm:mt-1 leading-relaxed">
              {mode === "team" && selectedTeam && selectedFeature && selectedModel &&
                `Predictions for ${selectedTeam} using ${selectedFeature} + ${selectedModel}`}
              {mode === "date" && selectedDate && selectedFeature && selectedModel &&
                `Predictions for ${selectedDate} using ${selectedFeature} + ${selectedModel}`}
            </p>
          </div>

          <div className="shrink-0">
          {/* Goes back to the NBA teams */}
          <Link
          href="/latest-games"
          className="text-green-400 hover:text-green-300 hover:underline text-sm sm:text-base"
          >
      ← Go to All Teams
    </Link>
  </div>
        </div>

        {/* Mode Toggle between Team and Date*/}
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
        {/* Filters for Team/Date, Features, and Models */}
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

  {/* Choose Feature */}
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

  {/* Choose Model */}
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
            // Calculate which team is predicted to win
            // If the home teams win probability is higher then the home team will be predicted to win, otherwise predict the away team. 
            const predictedWinner = game.HOME_W_PROB > game.AWAY_W_PROB ? "HOME" : "AWAY";
            
            // Determines the actual winner after the game. 
            // If TEAM_W === 1 then the home team won
            // Otherwise if TEAM_W_LOOK matches with the home team then that means the away team has won 
            const actualWinner = game.TEAM_W === 1
            ? game.TEAM_W_LOOK // Home team won 

            : (game.TEAM_W_LOOK === game.HOME_TEAM ? game.AWAY_TEAM : game.HOME_TEAM); // Away team won

            return (
              <li
                key={game.GAME_ID}
                className="bg-gray-900 p-6 rounded-xl shadow-lg border border-white/10 hover:border-purple-400 transition"
              >
                {/* Game Title */}
                <div className="flex items-center justify-between mb-4 flex-wrap gap-4">
                  <div className="flex items-center gap-4">
                    <Image src={game.AWAY_LOGO} alt={game.AWAY_TEAM} width={40} height={40} className="rounded" />
                    <span className={"text-lg font-semibold"}>
                      {game.AWAY_TEAM}
                    </span>
                    <span className="mx-2 text-purple-300 font-bold">@</span>
                    <span className={"text-lg font-semibold"}>
                      {game.HOME_TEAM}
                    </span>
                    <Image src={game.HOME_LOGO} alt={game.HOME_TEAM} width={40} height={40} className="rounded" />
                  </div>
                  <p className="text-sm text-gray-400">Date: {game.GAME_DATE}</p>
                </div>
                {/* Prediction Details */}
                <div className="grid grid-cols-2 sm:grid-cols-4 text-center gap-4 text-sm text-gray-200">
                  {/* Away Win Probability */}
                  <div>
                    <p className="text-purple-300">Away Win %</p>
                    <p className="text-green-400 text-xl font-bold">{(game.AWAY_W_PROB * 100).toFixed(1)}%</p>
                  </div>
                  {/* Home Win Probability */}
                  <div>
                    <p className="text-purple-300">Home Win %</p>
                    <p className="text-blue-400 text-xl font-bold">{(game.HOME_W_PROB * 100).toFixed(1)}%</p>
                  </div>

                  {/* Predicted Winner */}
                  <div className="col-span-2 sm:col-span-1">
                    <p className="text-purple-300">Predicted Winner</p>
                    <p className={`text-white font-semibold ${predictedWinner === "HOME" ? "text-green-300" : "text-blue-300"}`}>
                      {predictedWinner === "HOME" ? game.HOME_TEAM : game.AWAY_TEAM}
                    </p>
                  </div>
                  {/* Actual Winner */}
                  {actualWinner && (
              <div className="col-span-2 sm:col-span-1">
                <p className="text-purple-300">Actual Winner</p>
                <p className={`text-white font-semibold ${actualWinner === game.HOME_TEAM ? "text-green-300" : "text-blue-300"}`}>
                  {actualWinner}
                </p>
              </div>
            )}
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