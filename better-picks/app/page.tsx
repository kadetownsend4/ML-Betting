"use client";
import Image from "next/image";
import { useState } from "react";
import Link from 'next/link';

const Dropdown = ({ title, options, isOpen, setOpenDropdown, links }) => {
  return (
    <div className="relative group">
      <button
        onClick={() => setOpenDropdown(isOpen ? null : title)}
        className="text-white px-4 py-2 bg-gray-800 rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-green-400 transition-all duration-200"
      >
        {title}
      </button>
      {isOpen && (
        <ul className="absolute left-0 mt-2 w-48 bg-gray-800 border border-gray-700 rounded-md shadow-lg transition-all duration-200 transform opacity-0 group-hover:opacity-100">
          {options.map((option, index) => (
            <li key={index} className="px-4 py-2 hover:bg-gray-700 cursor-pointer transition-all duration-150">
              <Link href={links[index]} passHref>
                {option}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default function Home() {
  const [openDropdown, setOpenDropdown] = useState(null);

  const linksNBA = ["/latest-games", "/team-stats", "/player-analysis"];
  const nflLinks = ["/nfl/predictions", "/nfl/performance", "/nfl/betting-insights"];
  const accountLinks = ["/account/profile", "/account/settings", "/account/logout"];
  const performanceLinks = ["/performance/trends", "/performance/success-rate", "/performance/ai-insights"];

  return (
    <div className="min-h-screen bg-black text-white p-8 sm:p-20 flex flex-col justify-between"
      style={{ backgroundImage: "url('/background.jpg')", backgroundSize: "cover", backgroundPosition: "center", backgroundBlendMode: "darken", backgroundColor: "rgba(0, 0, 0, 0.6)" }}>

      <header className="flex justify-between items-center w-full py-4 px-8 bg-white/10 backdrop-blur-md rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold text-green-400 font-mono">Better Picks</h1>
        <nav className="flex gap-6">
          <Dropdown title="NBA" options={["Latest Games", "Team Stats", "Player Analysis"]}
            isOpen={openDropdown === "NBA"} setOpenDropdown={setOpenDropdown} links={linksNBA} />
          <Dropdown title="NFL" options={["Game Predictions", "Team Performance", "Betting Insights"]}
            isOpen={openDropdown === "NFL"} setOpenDropdown={setOpenDropdown} links={nflLinks} />
          <Dropdown title="Account" options={["Profile", "Settings", "Logout"]}
            isOpen={openDropdown === "Account"} setOpenDropdown={setOpenDropdown} links={accountLinks} />
          <Dropdown title="Performance Analysis" options={["Trends", "Success Rate", "AI Insights"]}
            isOpen={openDropdown === "Performance Analysis"} setOpenDropdown={setOpenDropdown} links={performanceLinks} />
        </nav>
      </header>

      <main className="flex flex-col gap-8 items-center sm:items-start mt-16 flex-grow">
        <h2 className="text-3xl font-extrabold text-center sm:text-left text-green-400 mb-4">
          Your Ultimate Sports Betting Analyzer
        </h2>
        <p className="text-lg sm:text-xl text-center sm:text-left opacity-80 mb-8">
          Gain the edge with AI-driven betting insights, real-time analytics, and expert picks.
        </p>

        <div className="flex gap-6 items-center flex-col sm:flex-row">
          <a
            className="rounded-full border border-transparent transition-all transform hover:scale-105 flex items-center justify-center bg-green-500 text-black font-semibold gap-2 hover:bg-green-600 text-lg sm:text-xl h-12 sm:h-14 px-8 sm:px-10 shadow-md"
            href="/dashboard"
          >
            Get Started
          </a>
          <a
            className="rounded-full border border-gray-500 dark:border-gray-300 transition-all transform hover:scale-105 flex items-center justify-center hover:bg-gray-600 dark:hover:bg-gray-400 hover:border-transparent text-lg sm:text-xl h-12 sm:h-14 px-8 sm:px-10 shadow-md"
            href="/about"
          >
            Learn More
          </a>
        </div>
      </main>

      <footer className="flex gap-8 flex-wrap items-center justify-center text-gray-300 text-base mt-auto py-6">
        <a className="hover:text-green-400 transition-colors" href="/features">Features</a>
        <a className="hover:text-green-400 transition-colors" href="/pricing">Pricing</a>
        <a className="hover:text-green-400 transition-colors" href="/contact">Contact Us</a>
      </footer>
    </div>
  );
}
