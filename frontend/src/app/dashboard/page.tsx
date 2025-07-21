"use client";

import { useEffect, useState } from "react";
import { gql, useQuery } from "@apollo/client";

const GET_USER = gql`
  query GetUser($username: String!) {
    getUser(username: $username) {
      id
      name
      email
      username
      bio
      skills
      interests
      createdAt
    }
  }
`;

export default function DashboardPage() {
  const [username, setUsername] = useState<string | null>(null);

  useEffect(() => {
    // Assume username is stored in localStorage after login
    setUsername(localStorage.getItem("username"));
  }, []);

  const { data, loading, error } = useQuery(GET_USER, {
    variables: { username },
    skip: !username,
  });

  if (!username) {
    return <div className="p-8">No user logged in.</div>;
  }
  if (loading) return <div className="p-8">Loading...</div>;
  if (error) return <div className="p-8 text-red-600">Error: {error.message}</div>;
  const user = data?.getUser;
  if (!user) return <div className="p-8">User not found.</div>;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-blue-50 dark:bg-neutral-900">
      <div className="w-full max-w-2xl bg-white dark:bg-neutral-800 rounded shadow p-8 mt-8">
        <h1 className="text-3xl font-bold mb-4">Welcome, {user.name}!</h1>
        <p className="mb-2 text-gray-700 dark:text-gray-300">Email: {user.email}</p>
        <p className="mb-2 text-gray-700 dark:text-gray-300">Username: {user.username}</p>
        <p className="mb-2 text-gray-700 dark:text-gray-300">Bio: {user.bio}</p>
        <p className="mb-2 text-gray-700 dark:text-gray-300">Skills: {user.skills.join(", ")}</p>
        <p className="mb-4 text-gray-700 dark:text-gray-300">Interests: {user.interests.join(", ")}</p>
      </div>
    </div>
  );
} 