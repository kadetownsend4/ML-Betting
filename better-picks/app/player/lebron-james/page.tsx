// app/player/lebron-james/page.tsx
"use client";  // Make sure this file is treated as a client component

import { FaBasketballBall } from "react-icons/fa";

// Placeholder data for LeBron James (replace with actual API data later)
const lebronData = {
  name: "LeBron James",
  team: "Los Angeles Lakers",
  points: 27,
  assists: 8,
  rebounds: 7,
  overUnder: "Over",
  pointsProp: 27.5, // LeBron's points prop for betting
  assistProp: 8.5,  // LeBron's assists prop for betting
  reboundProp: 7.5, // LeBron's rebounds prop for betting
  imageUrl: "/path-to-lebron-image.jpg", // Placeholder for LeBron's image
};

export default function LeBronPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white p-10 flex flex-col items-center font-['Orbitron']">
      <header className="flex justify-between items-center w-full max-w-5xl py-5 px-10 bg-white/10 backdrop-blur-lg rounded-xl shadow-lg">
        <h1 className="text-4xl tracking-wide uppercase text-green-400 flex items-center gap-2 font-['Rajdhani']">
          <FaBasketballBall className="text-green-400" /> LeBron James: NBA Player Prop Analysis
        </h1>
      </header>

      <div className="w-full max-w-6xl mt-10 bg-white/10 backdrop-blur-lg shadow-lg rounded-xl p-6">
        <div className="flex flex-col items-center">
          {/* LeBron's Image */}
          <img
            src={lebronData.imageUrl}
            alt="LeBron James"
            className="w-48 h-48 rounded-full object-cover mb-6"
          />
          {/* LeBron's Player Details */}
          <h2 className="text-4xl font-bold text-green-400 text-center sm:text-left mb-6">{lebronData.name}</h2>
          <p className="text-lg text-gray-300">Team: {lebronData.team}</p>
          
          {/* Player Prop Analysis */}
          <div className="bg-gray-800 p-6 rounded-lg shadow-md text-center mt-6">
            <h3 className="text-xl font-bold text-green-400">Performance Props</h3>
            <p className="text-gray-300">Points Prop: {lebronData.pointsProp}</p>
            <p className="text-gray-300">Assists Prop: {lebronData.assistProp}</p>
            <p className="text-gray-300">Rebounds Prop: {lebronData.reboundProp}</p>

            {/* Over/Under Analysis */}
            <p className="text-gray-300 mt-4">Over/Under Prediction: {lebronData.overUnder}</p>
          </div>
        </div>
      </div>

      <footer className="mt-auto py-6 text-gray-400">
        <p>&copy; 2025 NBA Stats. All rights reserved.</p>
      </footer>
    </div>
  );
}
