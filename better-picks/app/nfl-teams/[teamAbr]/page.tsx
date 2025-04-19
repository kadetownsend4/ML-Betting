"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import Image from "next/image";

interface Player {
  PLAYER_NAME: string;
  POSITION: string;
}

interface Game {
  WEEK: number;
  OPPONENT_NAME: string;
  RESULT: string;
}

interface TeamDetails {
  team_name: string;
  team_logo: string;
  team_wordmark: string;
}

export default function TeamDetailsPage() {
  const { teamAbr } = useParams();
  const [players, setPlayers] = useState<Player[]>([]);
  const [schedule, setSchedule] = useState<Game[]>([]);
  const [teamInfo, setTeamInfo] = useState<TeamDetails | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (teamAbr) {
      const formattedAbr = teamAbr.toString().toUpperCase();
      console.log("🟡 Team Abbreviation:", formattedAbr);
  
      axios
        .get("https://betterpicks-demo.onrender.com/nfl_teams")
        .then((res) => {
          console.log("✅ All NFL Teams Fetched:", res.data);
  
          const match = res.data.find(
            (t: any) => t.TEAM_ABR.toUpperCase() === formattedAbr
          );
          console.log("🔍 Matched Team:", match);
  
          if (!match) {
            console.error("❌ Team not found");
            setLoading(false);
            return;
          }
  
          setTeamInfo({
            team_name: match.TEAM_NAME,
            team_logo: match.TEAM_LOGO,
            team_wordmark: match.TEAM_WORDMARK,
          });
  
          axios
            .get(`https://betterpicks-demo.onrender.com/nfl_teams/${formattedAbr}/schedule`)
            .then((res) => {
              console.log("📅 Schedule Fetched:", res.data);
              setSchedule(res.data.schedule || []);
            })
            .catch((err) => console.error("❌ Error fetching schedule", err));
  
          axios
            .get(`https://betterpicks-demo.onrender.com/nfl_teams/${formattedAbr}/players`)
            .then((res) => {
              console.log("👥 Players Fetched:", res.data);
              setPlayers(res.data.players || []);
            })
            .catch((err) => console.error("❌ Error fetching players", err))
            .finally(() => setLoading(false));
        })
        .catch((err) => {
          console.error("❌ Error fetching teams", err);
          setLoading(false);
        });
    }
  }, [teamAbr]);
  

  if (loading) {
    return <p className="text-white text-center mt-10">Loading team data...</p>;
  }

  if (!teamInfo) {
    return <p className="text-red-400 text-center mt-10">Team not found.</p>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-green-700 text-white p-8 font-sans">
      <div className="flex flex-col items-center mb-12">
        <div className="relative w-[140px] h-[120px] mb-4">
          <Image src={teamInfo.team_logo} alt="Team Logo" fill className="object-contain" unoptimized />
        </div>
        <h1 className="text-4xl font-extrabold text-green-300 tracking-wide">
          {teamInfo.team_name}
        </h1>
        <div className="relative w-[180px] h-[40px] mt-3">
          <Image src={teamInfo.team_wordmark} alt="Wordmark" fill className="object-contain" unoptimized />
        </div>
      </div>

      {/* Schedule */}
      <section className="mb-14">
        <h2 className="text-3xl font-bold text-white mb-6 border-b border-white/20 pb-2">
          Season Schedule
        </h2>
        <ul className="space-y-3">
          {schedule.map((game, index) => (
            <li key={index} className="bg-gray-800 rounded-lg px-6 py-4 flex justify-between items-center">
              <span className="text-lg">Week {game.WEEK}: vs {game.OPPONENT_NAME}</span>
              <span className="font-bold text-green-400">{game.RESULT}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Players */}
      <section>
        <h2 className="text-3xl font-bold text-white mb-6 border-b border-white/20 pb-2">
          Team Roster
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {players.map((player, i) => (
            <div key={i} className="bg-gray-900 p-4 rounded-lg shadow-lg text-center">
              <p className="text-white font-semibold">{player.PLAYER_NAME}</p>
              <p className="text-gray-400 text-sm">{player.POSITION}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
