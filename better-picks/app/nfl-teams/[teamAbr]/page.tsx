"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";

interface Player {
  PLAYER_NAME: string;
  POSITION: string;
  PLAYER_ID: string;
}

interface Game {
  GAME_ID: string;
  WEEK: number;
  OPPONENT_NAME: string;
  OPPONENT_LOGO: string;
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
      axios
        .get("https://betterpicks-demo.onrender.com/nfl_teams")
        .then((res) => {
          const match = res.data.find(
            (t: any) => t.TEAM_ABR.toUpperCase() === formattedAbr
          );

          if (!match) {
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
            .then((res) => setSchedule(res.data.schedule || []))
            .catch((err) => console.error("❌ Error fetching schedule", err));

          axios
            .get(`https://betterpicks-demo.onrender.com/nfl_teams/${formattedAbr}/players`)
            .then((res) => setPlayers(res.data.players || []))
            .catch((err) => console.error("❌ Error fetching players", err))
            .finally(() => setLoading(false));
        })
        .catch((err) => {
          console.error("❌ Error fetching teams", err);
          setLoading(false);
        });
    }
  }, [teamAbr]);

  const groupByPosition = (players: Player[]) => {
    const positionOrder = ["QB", "RB", "WR", "TE", "K"];
    const grouped: Record<string, Player[]> = {};
  
    // Group players by position
    players.forEach((player) => {
      const pos = player.POSITION || "Unknown";
      if (!grouped[pos]) {
        grouped[pos] = [];
      }
      grouped[pos].push(player);
    });
  
    // Sort grouped keys by custom order, with fallback for unknowns
    const sortedGrouped: Record<string, Player[]> = {};
  
    // First add in custom ordered positions
    positionOrder.forEach((pos) => {
      if (grouped[pos]) {
        sortedGrouped[pos] = grouped[pos];
      }
    });
  
    // Then add any remaining positions that weren't in the custom order
    Object.keys(grouped).forEach((pos) => {
      if (!positionOrder.includes(pos)) {
        sortedGrouped[pos] = grouped[pos];
      }
    });
  
    return sortedGrouped;
  };

  const groupedPlayers = groupByPosition(players);

  if (loading) return <p className="text-white text-center mt-10">Loading team data...</p>;
  if (!teamInfo) return <p className="text-red-400 text-center mt-10">Team not found.</p>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-purple-700 text-white p-8 font-sans">
    
     {/* Team Title Section */}
     <div className="flex items-center gap-4 mb-12 border-b-2 border-purple-500 pb-4">
        <div className="relative w-[80px] h-[80px] sm:w-[100px] sm:h-[100px]">

        <Image src={teamInfo.team_logo} alt="Team Logo" fill className="object-contain" unoptimized />
        </div>
        <div>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-white-300 tracking-wide uppercase">
            {teamInfo.team_name}
        </h1>
        </div>
    </div> 

    {/* Sticky Breadcrumb */}
    <div className="sticky top-0 z-50 bg-gradient-to-r from-black/80 via-purple-900/80 to-black/80 backdrop-blur-md py-3 px-4 rounded-b-lg shadow-lg border-b border-white/10 mb-8">
        <div className="text-sm text-gray-400 mb-6">
        <Link href="/" className="hover:text-purple-300 transition">Home</Link>
        <span className="mx-2 text-white">›</span>
        <Link href="/nfl-teams" className="hover:text-white-300 transition">NFL Teams</Link>
        <span className="mx-2 text-white">›</span>
        <span className="text-white-300 font-semibold">{teamInfo?.team_name}</span>
        </div>
    </div>

      {/* 🟢 Players */}
      <section className="mb-14">
        <h2 className="text-3xl font-bold text-white mb-6 border-b border-white/20 pb-2">Team Roster</h2>
        {Object.entries(groupedPlayers).map(([position, playersInPos]) => (
          <div key={position} className="mb-6">
            <h3 className="text-2xl font-semibold text-white-300 mb-2">{position}</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {playersInPos.map((player) => (
               <Link
               key={player.PLAYER_ID}
               href={`/nfl-players/${player.POSITION.toLowerCase()}/${player.PLAYER_ID}`}
               className="bg-gray-900 p-4 rounded-lg shadow-lg text-center hover:bg-gray-800 transition duration-200"
             >
               <p className="text-white font-semibold">{player.PLAYER_NAME}</p>
               <p className="text-gray-400 text-sm">{player.POSITION}</p>
             </Link>
              ))}
            </div>
          </div>
        ))}
      </section>

      {/* 📅 Schedule */}
      <section>
        <h2 className="text-3xl font-bold text-white mb-6 border-b border-white/20 pb-2">Season Schedule</h2>
        <ul className="space-y-3">
          {schedule.map((game, index) => (
            <li key={index}>
              <Link
                href={`/nfl-game/${game.GAME_ID}`}
                className="bg-gray-800 rounded-lg px-6 py-4 flex justify-between items-center hover:bg-gray-700 transition duration-200"
              >
                <span className="text-lg">Week {game.WEEK}: vs {game.OPPONENT_NAME}</span>
                <span className="font-bold text-green-400">{game.RESULT}</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
