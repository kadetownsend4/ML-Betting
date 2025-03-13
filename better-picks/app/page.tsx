"use client";
import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

const menuItems = [
  {
    title: "NBA",
    links: [
      { name: "Latest Games", path: "/latest-games" },
      { name: "Team Stats", path: "/team-stats" },
      { name: "Player Analysis", path: "/player-analysis" },
    ],
  },
  {
    title: "NFL",
    links: [
      { name: "Game Predictions", path: "/nfl/predictions" },
      { name: "Team Performance", path: "/nfl/performance" },
      { name: "Betting Insights", path: "/nfl/betting-insights" },
    ],
  },
  {
    title: "Performance Analysis",
    links: [
      { name: "Trending Player Props", path: "/trends" },
      { name: "NBA Defense vs Position", path: "/defense-vs-position" },
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

export default function Home() {
    const [activeDropdown, setActiveDropdown] = useState(null);
  
    return (
      <>
        <div className="min-h-screen text-white p-8 sm:p-20 flex flex-col justify-between relative overflow-hidden bg-gradient">
          {/* Header */}
          <header className="flex justify-between items-center w-full py-4 px-8 bg-white/10 backdrop-blur-md rounded-lg shadow-lg border border-white/15">
            <h1 className="text-3xl font-extrabold text-purple-500 font-mono">Better Picks</h1>
            <nav className="flex space-x-10 relative">
              {menuItems.map((item, index) => (
                <div
                  key={index}
                  className="relative group flex flex-col items-center"
                  onMouseEnter={() => setActiveDropdown(item.title)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <button className="text-lg font-semibold hover:text-green-400 transition">
                    {item.title}
                  </button>
  
                  {/* Animated Dropdown - Centered */}
                  <AnimatePresence>
                    {activeDropdown === item.title && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="absolute left-1/8 mt-2 w-40 bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl shadow-xl p-3"
                        onMouseEnter={() => setActiveDropdown(item.title)}
                        onMouseLeave={() => setActiveDropdown(null)}
                      >
                        {item.links.map((link, idx) => (
                          <Link
                            key={idx}
                            href={link.path}
                            className="block px-4 py-2 bg-transparent hover:bg-white/20 rounded-lg transition-all duration-200 ease-in-out text-center w-full"
                          >
                            {link.name}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </nav>
          </header>
  
          {/* Main Content */}
          <main className="flex flex-col gap-8 items-center sm:items-start mt-16 flex-grow">
            <h2 className="text-3xl font-extrabold text-center sm:text-left text-purple-500 mb-4">
              Your Ultimate Sports Betting Analyzer
            </h2>
            <p className="text-lg sm:text-xl text-center sm:text-left text-purple-500 opacity-100 mb-4">
              Gain the edge with AI-driven betting insights, real-time analytics, and expert picks.
            </p>
  
            <div className="flex gap-6 items-center flex-col sm:flex-row">
              <Link
                href="/dashboard"
                className="rounded-full border border-transparent transition-all transform hover:scale-105 flex items-center justify-center bg-gradient-to-r from-green-400 to-green-600 text-black font-semibold gap-2 text-lg sm:text-xl h-12 sm:h-14 px-8 sm:px-10 shadow-md hover:shadow-xl"
              >
                Get Started
              </Link>
  
              <Link
                className="rounded-full border border-gray-500 transition-all transform hover:scale-105 flex items-center justify-center hover:bg-gray-600 hover:border-transparent text-lg sm:text-xl h-12 sm:h-14 px-8 sm:px-10 shadow-md"
                href="/learn-more"
              >
                Learn More
              </Link>
            </div>
          </main>
  
          {/* Footer */}
          <footer className="flex gap-8 flex-wrap items-center justify-center text-gray-300 text-base mt-auto py-6">
            <a className="hover:text-green-400 transition-colors" href="/features">Features</a>
            <a className="hover:text-green-400 transition-colors" href="/pricing">Pricing</a>
            <a className="hover:text-green-400 transition-colors" href="/contact">Contact Us</a>
          </footer>
        </div>
      </>
    );
  }
  

    //   {/* Animated Gradient Background */}
    //   <style jsx>{
    //     @keyframes gradient {
    //       0% {
    //         background-position: 0% 50%;
    //       }
    //       50% {
    //         background-position: 100% 50%;
    //       }
    //       100% {
    //         background-position: 0% 50%;
    //       }
    //     }

    //     .bg-gradient {
    //       background: linear-gradient(270deg, #1a1a2e, #16213e, #0f3460, #e94560);
    //       background-size: 400% 400%;
    //       animation: gradient 10s ease infinite;
    //     }
    //   }</style>
//     </div>
//   );
// }