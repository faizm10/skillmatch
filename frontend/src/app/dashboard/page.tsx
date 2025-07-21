"use client";

import { useEffect, useState } from "react";
import { gql, useQuery } from "@apollo/client";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

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

function getCookie(name: string) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(';').shift() || null;
  return null;
}

export default function DashboardPage() {
  const [username, setUsername] = useState<string | null>(null);
  const [ready, setReady] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const cookieUsername = getCookie("username");
    setUsername(cookieUsername);
    setReady(true);
  }, []);

  const { data, loading, error } = useQuery(GET_USER, {
    variables: { username },
    skip: !ready || !username,
    fetchPolicy: "network-only",
    errorPolicy: "all", //debugging purposes
    onError: (error) => {
      console.error("GraphQL Error:", error);
      console.error("Network Error:", error.networkError);
      console.error("GraphQL Errors:", error.graphQLErrors);
    },
    onCompleted: (data) => {
      console.log("Query completed successfully:", data);
    }
  });

  if (!ready) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-blue-50 p-8 dark:bg-neutral-900">
        <Card className="w-full max-w-md p-6 text-center">
          <CardTitle>Loading...</CardTitle>
          <CardDescription className="mt-2">Checking login status.</CardDescription>
        </Card>
      </div>
    );
  }

  if (!username) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-blue-50 p-8 dark:bg-neutral-900">
        <Card className="w-full max-w-md p-6 text-center">
          <CardTitle className="mb-4">Not Logged In</CardTitle>
          <CardDescription className="mb-6">
            Please log in to view your dashboard.
          </CardDescription>
          <Button onClick={() => router.push("/login")}>Go to Login</Button>
        </Card>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-blue-50 p-8 dark:bg-neutral-900">
        <Card className="w-full max-w-md p-6 text-center">
          <CardTitle>Loading...</CardTitle>
          <CardDescription className="mt-2">Loading your data.</CardDescription>
        </Card>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-blue-50 p-8 dark:bg-neutral-900">
        <Card className="w-full max-w-md p-6 text-center">
          <CardTitle className="text-red-600">Error Loading Data</CardTitle>
          <CardDescription className="mt-2">
            An error occurred: {error.message}. Please try again.
          </CardDescription>
          <Button onClick={handleLogout} className="mt-6">
            Logout
          </Button>
        </Card>
      </div>
    );
  }

  const user = data?.getUser;

  if (!user) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-blue-50 p-8 dark:bg-neutral-900">
        <Card className="w-full max-w-md p-6 text-center">
          <CardTitle className="mb-4">User Not Found</CardTitle>
          <CardDescription className="mb-6">
            The requested user could not be found.
          </CardDescription>
          <Button onClick={handleLogout}>Logout</Button>
        </Card>
      </div>
    );
  }

  function handleLogout() {
    document.cookie = "username=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    router.push("/login");
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-blue-50 p-8 dark:bg-neutral-900">
      <Card className="w-full max-w-2xl p-8">
        <CardHeader>
          <CardTitle className="mb-2 text-2xl font-bold">Welcome, {user.name}!</CardTitle>
          <CardDescription className="mb-4">
            Here are your details and interests.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4 p-0">
          <div>
            <p className="text-md font-medium text-neutral-700 dark:text-neutral-300">
              Email:
            </p>
            <p className="text-lg text-neutral-800 dark:text-neutral-200">{user.email}</p>
          </div>
          <div>
            <p className="text-md font-medium text-neutral-700 dark:text-neutral-300">
              Username:
            </p>
            <p className="text-lg text-neutral-800 dark:text-neutral-200">{user.username}</p>
          </div>
          <div>
            <p className="text-md font-medium text-neutral-700 dark:text-neutral-300">
              Bio:
            </p>
            <p className="text-lg text-neutral-800 dark:text-neutral-200">{user.bio || "No bio provided."}</p>
          </div>
          <div>
            <p className="text-md font-medium text-neutral-700 dark:text-neutral-300">
              Skills:
            </p>
            <div className="flex flex-wrap gap-2">
              {user.skills && user.skills.length > 0 ? (
                user.skills.map((skill: string, idx: number) => (
                  <Badge key={idx} className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                    {skill}
                  </Badge>
                ))
              ) : (
                <span className="text-neutral-500">No skills listed.</span>
              )}
            </div>
          </div>
          <div>
            <p className="text-md font-medium text-neutral-700 dark:text-neutral-300">
              Interests:
            </p>
            <div className="flex flex-wrap gap-2">
              {user.interests && user.interests.length > 0 ? (
                user.interests.map((interest: string, idx: number) => (
                  <Badge key={idx} className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                    {interest}
                  </Badge>
                ))
              ) : (
                <span className="text-neutral-500">No interests listed.</span>
              )}
            </div>
          </div>
          <Button onClick={handleLogout} className="mt-8 w-full">
            Logout
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
