import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

// Define TypeScript types for the player data
interface PlayerStats {
  passingYards: number;
  touchdowns: number;
  interceptions: number;
}

interface PlayerData {
  PLAYER_ID: string;
  PLAYER_NAME: string;
  POSITION: string;
  TEAM: string;
  STATS: PlayerStats;
}

const QBPlayerStats = () => {
  const router = useRouter();
  const { playerId } = router.query; // Extract playerId from the URL query parameters

  const [playerData, setPlayerData] = useState<PlayerData | null>(null);

  // Fetch player data when playerId changes
  useEffect(() => {
    if (playerId) {
      fetchPlayerData(playerId as string); // Typecast playerId to string
    }
  }, [playerId]);

  // Simulate fetching player data based on playerId (replace with actual API call)
  const fetchPlayerData = async (id: string) => {
    // Simulating fetching data (You can replace this with a real API call)
    const data: PlayerData = {
      PLAYER_ID: id,
      PLAYER_NAME: `Player ${id}`,
      POSITION: 'QB',
      TEAM: 'Team X',
      STATS: {
        passingYards: 4000,
        touchdowns: 35,
        interceptions: 10,
      },
    };
    setPlayerData(data);
  };

  if (!playerData) return <div>Loading...</div>;

  return (
    <div>
      <h1>{playerData.PLAYER_NAME} - QB Stats</h1>
      <div>
        <p><strong>Player ID:</strong> {playerData.PLAYER_ID}</p>
        <p><strong>Position:</strong> {playerData.POSITION}</p>
        <p><strong>Team:</strong> {playerData.TEAM}</p>
        <h2>Stats:</h2>
        <p><strong>Passing Yards:</strong> {playerData.STATS.passingYards}</p>
        <p><strong>Touchdowns:</strong> {playerData.STATS.touchdowns}</p>
        <p><strong>Interceptions:</strong> {playerData.STATS.interceptions}</p>
      </div>
    </div>
  );
};

export default QBPlayerStats;

