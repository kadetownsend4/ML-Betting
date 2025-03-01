//Used link to help with structure of code. https://chatgpt.com/c/6794242c-fa60-8012-a39d-fbb1501faf5b
// app/dashboard/page.tsx
// app/dashboard/page.tsx
// app/dashboard/page.tsx
import React from "react";

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-black text-white p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <h1 className="text-3xl font-bold text-green-400 mb-4">Dashboard</h1>
        <p className="text-gray-300">Analyze betting trends and player props.</p>

        {/* Main Dashboard Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          {/* Widget: Live Odds */}
          <div className="p-4 bg-gray-900 rounded-lg shadow-md border border-green-500">
            <h2 className="text-xl font-semibold text-green-400">Live Odds</h2>
            <p className="text-gray-400">Coming soon...</p>
          </div>

          {/* Widget: Top Player Props */}
          <div className="p-4 bg-gray-900 rounded-lg shadow-md border border-green-500">
            <h2 className="text-xl font-semibold text-green-400">Top Player Props</h2>
            <p className="text-gray-400">Coming soon...</p>
          </div>

          {/* Widget: Recent Betting Trends */}
          <div className="p-4 bg-gray-900 rounded-lg shadow-md border border-green-500">
            <h2 className="text-xl font-semibold text-green-400">Recent Betting Trends</h2>
            <p className="text-gray-400">Coming soon...</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

  