// // app/latest-games/page.tsx
// "use client";
// import { useState } from "react";

// export default function LatestGames() {
//   const [openDropdown, setOpenDropdown] = useState(null);

//   // Define the links for each dropdown option
//   const nbaLinks = [
//     "/nba/games",       // Latest Games link
//     "/nba/stats",       // Team Stats link
//     "/nba/player-analysis" // Player Analysis link
//   ];

//   const nflLinks = [
//     "/nfl/predictions",   // Game Predictions link
//     "/nfl/performance",   // Team Performance link
//     "/nfl/betting-insights" // Betting Insights link
//   ];

//   const accountLinks = [
//     "/account/profile",  // Profile link
//     "/account/settings", // Settings link
//     "/account/logout"    // Logout link
//   ];

//   const performanceLinks = [
//     "/performance/trends", // Trends link
//     "/performance/success-rate", // Success Rate link
//     "/performance/ai-insights"  // AI Insights link
//   ];

//   return (
//     <div className="min-h-screen bg-black text-white p-8 sm:p-20 flex flex-col justify-between"
//       style={{ backgroundImage: "url('/LEGOAT.jpeg')", backgroundSize: "cover", backgroundPosition: "center", backgroundBlendMode: "darken", backgroundColor: "rgba(0, 0, 0, 0.5)" }}>
      
//       <header className="flex justify-between items-center w-full py-4 px-8 bg-white/10 backdrop-blur-md rounded-lg shadow-lg">
//         <h1 className="text-2xl font-bold text-green-400 font-mono">Better Picks</h1>
//         <nav className="flex gap-6">
//           <Dropdown title="NBA" options={["Latest Games", "Team Stats", "Player Analysis"]}
//             isOpen={openDropdown === "NBA"} setOpenDropdown={setOpenDropdown} links={nbaLinks} />
//           <Dropdown title="NFL" options={["Game Predictions", "Team Performance", "Betting Insights"]}
//             isOpen={openDropdown === "NFL"} setOpenDropdown={setOpenDropdown} links={nflLinks} />
//           <Dropdown title="Account" options={["Profile", "Settings", "Logout"]}
//             isOpen={openDropdown === "Account"} setOpenDropdown={setOpenDropdown} links={accountLinks} />
//           <Dropdown title="Performance Analysis" options={["Trends", "Success Rate", "AI Insights"]}
//             isOpen={openDropdown === "Performance Analysis"} setOpenDropdown={setOpenDropdown} links={performanceLinks} />
//         </nav>
//       </header>

//       <main className="flex flex-col gap-8 items-center sm:items-start mt-16 flex-grow">
//         <h2 className="text-2xl sm:text-3xl font-extrabold text-center sm:text-left text-green-400">
//           Latest NBA Games
//         </h2>
//         <p className="text-sm sm:text-base text-center sm:text-left opacity-80">
//           This page will display the latest NBA games and their details.
//         </p>
//       </main>

//       <footer className="flex gap-6 flex-wrap items-center justify-center text-gray-300 text-sm mt-auto py-4">
//         <a className="hover:text-green-400 transition-colors" href="/features">Features</a>
//         <a className="hover:text-green-400 transition-colors" href="/pricing">Pricing</a>
//         <a className="hover:text-green-400 transition-colors" href="/contact">Contact Us</a>
//       </footer>
//     </div>
//   );
// }
