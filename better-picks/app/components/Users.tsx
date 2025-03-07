'use client';

import { useEffect, useState } from 'react';

const Users = () => {
  const [users, setUsers] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetch('/api/users')
      .then((res) => res.json())
      .then((data) => {
        console.log("Raw API Response:", data); // Log API response

        if (!Array.isArray(data)) {
          console.warn("Unexpected API response format:", data);
          setError("Invalid data format received");
          return;
        }

        setUsers(data);
      })
      .catch((err) => {
        console.error('Error fetching users:', err);
        setError("Failed to fetch users");
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Loading users...</p>;
  if (error) return <p className="text-red-500">Error: {error}</p>;

  return (
    <div>
      <h2>Users List</h2>
      <ul>
        {users.map((user: any) => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default Users;
