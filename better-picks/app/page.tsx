"use client";
import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import Dashboard from "../app/components/Dashboard";


// Navigation menu structure containing categorized links.
const menuItems = [
  {
    title: "NBA",
    links: [
      { name: "Latest Games", path: "/latest-games" },
      { name: "Predictions", path: "/nba-predictions"},
      { name: "Team Stats", path: "/team-stats" },
      { name: "Player Prop Analysis", path: "/player-analysis" },
    ],
  },
  {
    title: "NFL",
    links: [
      { name: "NFL Teams", path: "/nfl-teams" },
      { name: "NFL Schedule", path: "/nfl-schedule" },
      { name: "Team Based Player Props", path: "/team-player-props" },
      { name: "Player Prop Analysis", path: "/nfl-player-analysis" },
      { name: "Betting Insights", path: "/nfl/betting-insights" },
    ],
  },
  {
    title: "Performance Analysis",
    links: [
      { name: "Trending Player Props", path: "/trends" },
      { name: "NBA Defense vs Position", path: "/defense-vs-position" },
      { name: "Prop Streak & Success Rate", path: "/prop-streak-success-rate" },
      { name: "AI Insights", path: "/ai-insights" },
    ],
  },
  {
    title: "Account",
    links: [
      { name: "Profile", path: "/account/profile" },
      { name: "Settings", path: "/account/settings" },
      { name: "Login", path: "/account/login" },
    ],
  },
];

/**
 * Home component representing the main landing page with navigation,
 * main content, and a footer.
 */
export default function Home() {
    const [activeDropdown, setActiveDropdown] = useState<string | null>(null); // Fixed here
  
    return (
      <>
        <div className="min-h-screen text-white p-8 sm:p-20 flex flex-col justify-between relative overflow-hidden bg-cover bg-center"
          style={{ backgroundImage: "url('/LEBRONN.png')" }}
        >
        {/* Overlay */}
          <div className="absolute inset-0 bg-black/30 z-0"></div>

          <Dashboard>
          </Dashboard>
  
          {/* Main Content Section */}
          <main className="flex flex-col gap-8 items-center sm:items-start mt-16 flex-grow">
            <h2 className="text-3xl font-extrabold text-white drop-shadow-2xl">
              Your Ultimate Sports Betting Analyzer
            </h2>
            <p className="text-lg sm:text-xl font-extrabold text-white opacity-95 drop-shadow-2xl">
              Gain the edge with AI-driven betting insights, real-time analytics, and expert picks.
            </p>
  
            <div className="flex gap-6 items-center flex-col sm:flex-row">
              <Link
              href="/account/register"
              className="rounded-full transition-all transform hover:scale-105 flex items-center justify-center bg-gradient-to-r from-green-400 to-green-600 text-black font-bold shadow-2xl border-2 border-white text-lg sm:text-xl h-12 sm:h-14 px-8 sm:px-10"
              >
                Get Started
              </Link>
  
              <Link
              href="/learn-more"
              className="rounded-full transition-all transform hover:scale-105 flex items-center justify-center bg-black/80 text-white font-bold shadow-xl border-2 border-gray-400 hover:bg-gray-700 text-lg sm:text-xl h-12 sm:h-14 px-8 sm:px-10"
              >
                Learn More
              </Link>
            </div>
          </main>

          {/* Footer Section
          <footer className="flex gap-8 flex-wrap font-extrabold items-center justify-center text-white text-base mt-auto py-6">
            <a className="hover:text-green-400 transition-colors" href="/features">Features</a>
            <a className="hover:text-green-400 transition-colors" href="/pricing">Pricing</a>
            <a className="hover:text-green-400 transition-colors" href="/contact">Contact Us</a>
          </footer> */}

          {/* Footer Section*/}
          <footer className="mt-10 text-center text-white text-lg font-black drop-shadow-xl">
  <p>
    <span className="text-red-400 uppercase">Disclaimer:</span> Please gamble responsibly. If you have a gambling problem, seek help from a professional organization such as  
    <a 
      href="https://www.ncpgambling.org/" 
      target="_blank" 
      rel="noopener noreferrer" 
      className="text-purple-400 font-bold underline hover:text-purple-300 transition-colors duration-200"
    >
      {" "}National Council on Problem Gambling
    </a>.
  </p>
</footer>

        </div>
      </>
    );
  }
