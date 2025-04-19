import { useRouter } from 'next/router';

const PlayerPage = () => {
  const router = useRouter();
  const { PLAYER_ID } = router.query;

  if (!PLAYER_ID) {
    return <p>Loading player data...</p>;
  }

  return (
    <div>
      <h1>Player Details for ID: {PLAYER_ID}</h1>
      {/* Fetch and display player data based on PLAYER_ID */}
    </div>
  );
};

export default PlayerPage;