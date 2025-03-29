"use client"; // Use this in Next.js (App Router) to enable client-side behavior

import { useState, useEffect } from "react";
import axios from "axios";
<<<<<<< HEAD
// PostList component that fetches and displays a list of posts from an API
export default function PostList() {
  // State variables to hold the posts, loading state, and error messages. 
  const [posts, setPosts] = useState([]); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // useEffect hook to fetch data from the API when the component mounts 
  useEffect(() => {
    // Async function to fetch data from the API
    const fetchData = async () => {
      try {
        // Fetching the data from the given API endpoint
        const response = await axios.get("https://www.balldontlie.io/api/v1/games?start_date=2024-03-01&end_date=2024-03-05");
        setPosts(response.data); // Storing the fetched data into the posts state 
      } catch (err) {
        setError("Failed to load posts"); // Setting an error message in case of failure.
      } finally {
        setLoading(false); // Marking the loading state as false after the request is complete 
      }
    };
    // Calling the fetchData function when the component mounts. 
    fetchData();
  }, []); // Empty dependency array ensures the effect runs only once on mount

  // Conditional rendering based on the loading state and error state
=======

export default function PostList() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://www.balldontlie.io/api/v1/games?start_date=2024-03-01&end_date=2024-03-05");
        setPosts(response.data);
      } catch (err) {
        setError("Failed to load posts");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

>>>>>>> bae9ee246ac9055185ff74bd2a5b692fadc0c7e9
  if (loading) return <p className="text-center text-gray-500">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="max-w-2xl mx-auto p-4">
<<<<<<< HEAD
      {/* Displaying the title of the posts section  */}
      <h1 className="text-2xl font-bold mb-4">Posts</h1>
      {/* Mapping through the fetched posts and displaying each one */}
      <ul className="space-y-4">
        {/* Only showing the first 10 posts for efficiency */}
        {posts.slice(0, 10).map((post: any) => (
          <li key={post.id} className="p-4 border border-gray-200 rounded-lg shadow-sm bg-white">
            {/* Displaying the post title */}
            <h2 className="text-lg font-semibold">{post.title}</h2>
            {/* Displaying the post body */}
=======
      <h1 className="text-2xl font-bold mb-4">Posts</h1>
      <ul className="space-y-4">
        {posts.slice(0, 10).map((post: any) => (
          <li key={post.id} className="p-4 border border-gray-200 rounded-lg shadow-sm bg-white">
            <h2 className="text-lg font-semibold">{post.title}</h2>
>>>>>>> bae9ee246ac9055185ff74bd2a5b692fadc0c7e9
            <p className="text-gray-600">{post.body}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
