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
<div className="min-h-screen flex flex-col items-center bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white p-10">
<header className="w-full max-w-4xl py-6 px-8 bg-white/10 backdrop-blur-lg rounded-xl shadow-lg flex items-center justify-between">
        <h1 className="text-3xl md:text-4xl tracking-wide uppercase text-green-400 flex items-center gap-3 font-['Rajdhani']">
          <FaBasketballBall className="text-green-400 text-2xl md:text-3xl" />
          {lebronData.name}: Player Prop Analysis  
        </h1>
      </header>

      <div className="w-full max-w-6xl mt-10 bg-white/10 backdrop-blur-lg shadow-lg rounded-xl p-6">
        <div className="flex flex-col items-center">
          {/* LeBron's Image */}
          <img
            src={lebronData.imageUrl}
            alt={lebronData.name}
            className="w-40 h-40 md:w-48 md:h-48 rounded-full object-cover shadow-md border-4 border-green-400"
          />
          {/* LeBron's Player Details */}
          <h2 className="text-4xl font-bold text-green-400 text-center sm:text-left mb-6">{lebronData.name}</h2>
          <p className="text-lg text-gray-300">Team: {lebronData.team}</p>
          
          {/* Player Prop Analysis */}


          <div className="bg-gray-800 p-6 rounded-lg shadow-lg text-center mt-6 w-full">
            <h3 className="text-xl font-semibold text-green-400"> Performance Props</h3>
            
            <div className="mt-4 space-y-3 text-lg">
              <p className="text-gray-300">
                  <span className="text-green-300 font-semibold">Points Prop:</span> {lebronData.pointsProp}
              </p>
              <p className="text-gray-300">
                <span className="text-green-300 font semibold"> Assists Prop </span> {lebronData.assistProp}
              </p>
              <p className="mt-4 space-y-3 text-lg">
                <span className="text-green-300 font-semibold"> Rebounds Prop </span> {lebronData.reboundProp}
              </p>

            </div>
            <p className="text-gray-400 text-lg font-medium mt-4">
              Over/Under Prediction: <span className="text-green-400"> {lebronData.overUnder} </span>

            </p>

          </div>
          </div>
          </div>


      <footer className="mt-auto py-6 text-gray-500 text-sm">
        <p>&copy; 2025 NBA Stats. All rights reserved.</p>
      </footer>
    </div>
  );
}
