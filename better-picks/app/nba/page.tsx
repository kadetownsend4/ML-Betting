// app/nba/page.tsx
import React from "react";

const NBA = () => {
  return (
    <div className="min-h-screen bg-black text-white p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <h1 className="text-3xl font-bold text-green-400 mb-4">NBA Betting Analysis</h1>
        <p className="text-gray-300">Stay updated with the latest NBA games, team stats, and player insights.</p>

        {/* Section: Latest Games */}
        <div className="mt-6 p-4 bg-gray-900 rounded-lg shadow-md border border-green-500">
          <h2 className="text-xl font-semibold text-green-400">Latest Games</h2>
          <p className="text-gray-400">Coming soon...</p>
        </div>

        {/* Section: Team Stats */}
        <div className="mt-6 p-4 bg-gray-900 rounded-lg shadow-md border border-green-500">
          <h2 className="text-xl font-semibold text-green-400">Team Stats</h2>
          <p className="text-gray-400">Coming soon...</p>
        </div>

        {/* Section: Player Analysis */}
        <div className="mt-6 p-4 bg-gray-900 rounded-lg shadow-md border border-green-500">
          <h2 className="text-xl font-semibold text-green-400">Player Analysis</h2>
          <p className="text-gray-400">Coming soon...</p>
        </div>
      </div>
    </div>
  );
};

export default NBA;
