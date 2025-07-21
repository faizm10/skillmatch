"use client";

import { gql, useQuery } from "@apollo/client";

const GET_USERS = gql`
  query {
    getUsers {
      id
      name
      email
    }
  }
`;

export default function TestPage() {
  const { data, loading, error } = useQuery(GET_USERS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold">Users</h1>
      <ul>
        {data?.getUsers?.map((user: any) => (
          <li key={user.id}>
            {user.name} — {user.email}
          </li>
        ))}
      </ul>
    </div>
  );
}
