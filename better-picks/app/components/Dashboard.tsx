"use client";
import { useState } from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";

const menuItems = [
  {
    title: "Home", path:"/home"
  },
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
      { name: "Trends", path: "/performance/trends" },
      { name: "Success Rate", path: "/performance/success-rate" },
      { name: "AI Insights", path: "/performance/ai-insights" },
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

const Dashboard: React.FC = () => {
  const [activeDropdown, setActiveDropdown] = useState(null);

  return (
    <header className="flex justify-between items-center w-full py-4 px-8 relative z-50 bg-gray-900 text-green-500">
      <nav className="flex space-x-10 relative">
      {menuItems.map((item, index) => (
      <div
        key={index}
        className="relative group"
        onMouseEnter={() => setActiveDropdown(item.title)}
        onMouseLeave={() => setActiveDropdown(null)}
      >
        <button className="text-lg font-semibold hover:text-white transition flex items-center">
          {item.title} {item.links && <ChevronDown size={25} className="ml-1" />}
        </button>
        {activeDropdown === item.title && item.links && (
          <div className="absolute left-0 mt-2 w-40 bg-gray-800 rounded-md shadow-lg border border-gray-200 z-50">
            {item.links.map((link, idx) => (
              <Link
                key={idx}
                href={link.path}
                className="block px-4 py-2 text-lg font-semibold hover:text-white transition text-center w-full text-green-500"
                >
                  {link.name}
                </Link>
              ))}
            </div>
            )}
          </div>
        ))}
      </nav>
    </header>
  );
};

export default Dashboard;
