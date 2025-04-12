function NFLTeams() {
    const [teams, setTeams] = useState<Team[]>([]);
    const [conference, setConference] = useState<"AFC" | "NFC">("AFC");
    const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  
    useEffect(() => {
      axios
        .get("/api/nfl-teams") // Replace with actual API
        .then((response) => setTeams(response.data))
        .catch((error) => console.error("Error fetching NFL teams:", error));
    }, []);
  
    const filteredTeams = teams.filter(team => team.CONFERENCE === conference);
  
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-blue-800 text-white p-10 flex flex-col items-center font-sans">
        {/* Header here... (same as before) */}
  
        <div className="w-full max-w-6xl mt-20 bg-white/5 shadow-xl rounded-xl px-8 py-10 sm:px-12 sm:py-14 space-y-8 relative z-50 border border-white/20">
          <h2 className="text-4xl sm:text-5xl font-extrabold text-white text-center drop-shadow-xl mb-8 tracking-wide font-['Rajdhani']">
            NFL Teams - {conference}
          </h2>
  
          {/* AFC/NFC Toggle */}
          <div className="flex justify-center gap-6 mb-8">
            <button
              onClick={() => setConference("AFC")}
              className={`px-6 py-2 rounded-full font-bold transition-colors ${
                conference === "AFC"
                  ? "bg-blue-500 text-white"
                  : "bg-white/10 text-gray-300 hover:bg-blue-700 hover:text-white"
              }`}
            >
              AFC
            </button>
            <button
              onClick={() => setConference("NFC")}
              className={`px-6 py-2 rounded-full font-bold transition-colors ${
                conference === "NFC"
                  ? "bg-red-500 text-white"
                  : "bg-white/10 text-gray-300 hover:bg-red-700 hover:text-white"
              }`}
            >
              NFC
            </button>
          </div>
  
          {/* Teams Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {filteredTeams.map((team, index) => (
              <div
                key={index}
                className="bg-gray-900 p-5 rounded-2xl shadow-xl border border-white/10 flex flex-col items-center justify-center transition-all duration-300 hover:shadow-2xl hover:scale-105 hover:bg-gray-800"
              >
                <h2 className="text-xl font-bold text-white text-center tracking-wide mb-2">
                  {team.TEAM_NAME}
                </h2>
                <p className="text-sm text-gray-300">
                  {team.TEAM_CITY}, {team.TEAM_STATE}
                </p>
                <p className="text-sm text-gray-400 italic">
                  Nickname: {team.TEAM_NICKNAME}
                </p>
                <p className="text-sm text-gray-500">
                  Founded: {team.TEAM_YEAR_FOUNDED}
                </p>
              </div>
            ))}
          </div>
        </div>
  
        {/* Latest Posts and Footer (same as before) */}
      </div>
    );
  }
  