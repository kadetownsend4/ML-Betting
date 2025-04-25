'use client';

import Link from "next/link";

/**
 *
 * This component renders an error because we do not have a comprehensive set of stats for kickers yet.
 *
 * 
 * I quickly developed this page to simply display an error by giving ChatGPT my error message and breadcrumb from my other pages and told it to
 * display the error. This was a last minute fix to ensure no broken links. 
 *
 * Chat Link: https://chatgpt.com/share/680c124b-93d0-800f-b4de-718f2e5ec4a7 
 */
const KickerStats = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-purple-700 text-white p-8 font-sans">
    {/* Sticky Breadcrumb */}
    <div className="sticky top-0 z-50 bg-gradient-to-r from-black/80 via-purple-900/80 to-black/80 backdrop-blur-md py-3 px-4 rounded-b-lg shadow-lg border-b border-white/10 mb-8">
      <div className="text-sm text-gray-400 mb-6">
        <Link href="/" className="hover:text-green-300 transition">
          Home
        </Link>
        <span className="mx-2 text-white">›</span>
  
        <Link href="/nfl-teams" className="hover:text-green-300 transition">
          NFL Teams
        </Link>
      </div>
    </div>
  
    {/* No stats found message */}
    <div className="text-center p-6 bg-black/80 rounded-lg border border-gray-300 shadow-lg">
      <h2 className="text-2xl font-semibold text-gray-100 mb-4">No stats found for this player</h2>
      <p className="text-gray-400 mb-4">It seems we couldn't find any statistics for the selected player.</p>
      <p className="text-gray-400 mb-4">This means that they did not play much or have enough readily available data.</p>
      {/* Breadcrumb with a link to go back */}
      <div className="mb-4">
        <Link href="/nfl-teams" className="text-green-300 hover:text-green-500 font-medium">
          Go back to NFL Team's list to review other player's stats
        </Link>
      </div>
    </div>
  </div>
    );
};

export default KickerStats;
