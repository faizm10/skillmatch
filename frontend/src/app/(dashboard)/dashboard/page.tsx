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
import {
  User,
  Mail,
  Calendar,
  Trophy,
  Users,
  Search,
  Settings,
  Plus,
  TrendingUp,
  Award,
  Clock,
  Star,
} from "lucide-react";
import Link from "next/link";

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
      hackathons {
        id
        joinedAt
        hackathon {
          id
          title
          status
          date
          endDate
        }
      }
    }
  }
`;

function getCookie(name: string) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(";").shift() || null;
  return null;
}

// Mock data for recommendations (will be replaced with real data later)

const mockRecommendations = [
  {
    id: 1,
    name: "Sarah Chen",
    skills: ["React", "Python", "UI/UX"],
    match: 92,
  },
  {
    id: 2,
    name: "Alex Rodriguez",
    skills: ["Node.js", "GraphQL", "AWS"],
    match: 89,
  },
  {
    id: 3,
    name: "Emma Thompson",
    skills: ["Machine Learning", "TensorFlow"],
    match: 87,
  },
];

// Calculate stats from user data
const calculateUserStats = (user: any) => {
  if (!user || !user.hackathons) {
    return {
      hackathonsJoined: 0,
      teamsFormed: 0, // This would need team data from backend
      projectsCompleted: 0, // This would need project data from backend
      matchScore: 0,
    };
  }

  const hackathonsJoined = user.hackathons.length;
  const completedHackathons = user.hackathons.filter(
    (hp: any) => hp.hackathon.status === "Completed"
  ).length;

  // Calculate a simple match score based on skills and interests
  const skillCount = user.skills ? user.skills.length : 0;
  const interestCount = user.interests ? user.interests.length : 0;
  const matchScore = Math.min(
    100,
    Math.max(0, skillCount * 5 + interestCount * 3 + hackathonsJoined * 2)
  );

  return {
    hackathonsJoined,
    teamsFormed: Math.floor(hackathonsJoined * 0.7), // Mock calculation for now
    projectsCompleted: completedHackathons,
    matchScore,
  };
};

// Format dates like in hackathons page
const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

// Calculate recent activity from user data
const calculateRecentActivity = (user: any) => {
  if (!user || !user.hackathons) {
    return [];
  }

  return user.hackathons
    .slice(0, 5) // Get last 5 hackathons
    .map((hp: any, index: number) => ({
      id: hp.id,
      type: "hackathon" as const,
      title: hp.hackathon.title,
      // date: formatDate(hp.joinedAt), // Format the joinedAt date properly
      status: hp.hackathon.status.toLowerCase(),
      hackathonId: hp.hackathon.id,
    }))
    .sort(
      (a: any, b: any) =>
        new Date(b.date).getTime() - new Date(a.date).getTime()
    );
};

export default function DashboardPage() {
  const [username, setUsername] = useState<string | null>(null);
  const router = useRouter();
  const clickSettings = () => {
  // This function will handle the click event for the settings button
  
  // For now, we can just redirect to a settings page
  router.push("/dashboard/settings");
}
  useEffect(() => {
    setUsername(getCookie("username"));
  }, []);

  const { data, loading, error } = useQuery(GET_USER, {
    variables: { username },
    skip: !username,
    fetchPolicy: "network-only",
  });

  const handleLogout = () => {
    document.cookie =
      "username=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    router.push("/login");
  };

  if (!username) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-8 dark:from-neutral-900 dark:to-neutral-800">
        <Card className="w-full max-w-md p-8 text-center shadow-xl">
          <div className="mb-6">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900">
              <User className="h-8 w-8 text-blue-600 dark:text-blue-400" />
            </div>
            <CardTitle className="text-2xl font-bold text-gray-900 dark:text-gray-100">
              Welcome to SkillMatch
            </CardTitle>
            <CardDescription className="mt-2 text-gray-600 dark:text-gray-400">
              Please log in to access your hackathon dashboard
            </CardDescription>
          </div>
          <Button
            onClick={() => router.push("/login")}
            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
          >
            Go to Login
          </Button>
        </Card>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-neutral-900 dark:to-neutral-800">
        <Card className="w-full max-w-md p-8 text-center">
          <div className="mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-4 border-blue-200 border-t-blue-600"></div>
          <CardTitle className="text-xl">Loading Dashboard...</CardTitle>
          <CardDescription className="mt-2">
            Getting your latest data
          </CardDescription>
        </Card>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-red-50 to-pink-100 dark:from-neutral-900 dark:to-red-900">
        <Card className="w-full max-w-md p-8 text-center border-red-200 dark:border-red-800">
          <CardTitle className="text-red-600 dark:text-red-400">
            Something went wrong
          </CardTitle>
          <CardDescription className="mt-2 text-gray-600 dark:text-gray-400">
            {error.message}
          </CardDescription>
          <Button onClick={handleLogout} variant="destructive" className="mt-6">
            Return to Login
          </Button>
        </Card>
      </div>
    );
  }

  const user = data?.getUser;
  if (!user) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-yellow-50 to-orange-100 dark:from-neutral-900 dark:to-yellow-900">
        <Card className="w-full max-w-md p-8 text-center">
          <CardTitle className="text-yellow-600 dark:text-yellow-400">
            Profile Not Found
          </CardTitle>
          <CardDescription className="mt-2">
            We couldn't find your profile data
          </CardDescription>
          <Button onClick={handleLogout} variant="outline" className="mt-6">
            Return to Login
          </Button>
        </Card>
      </div>
    );
  }

  const userStats = calculateUserStats(user);
  const recentActivity = calculateRecentActivity(user);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-neutral-900 dark:via-neutral-800 dark:to-neutral-900">
      {/* The header with SidebarTrigger is now in app/(dashboard)/layout.tsx */}
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <Card className="border-0 bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-xl">
            <CardContent className="p-8">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-3xl font-bold mb-2">
                    Welcome back, {user.name}! 👋
                  </h2>
                  <p className="text-blue-100 text-lg">
                    Ready to build something amazing?
                  </p>
                </div>
                <div className="hidden sm:block">
                  <div className="flex items-center space-x-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold">
                        {userStats.matchScore}%
                      </div>
                      <div className="text-xs text-blue-200">Match Score</div>
                    </div>
                    <div className="h-12 w-px bg-blue-400"></div>
                    <div className="text-center">
                      <div className="text-2xl font-bold">
                        {userStats.hackathonsJoined}
                      </div>
                      <div className="text-xs text-blue-200">Hackathons</div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        {/* Stats Grid */}
        <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {userStats.hackathonsJoined}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Hackathons Joined
                  </p>
                </div>
                <Calendar className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {userStats.teamsFormed}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Teams Formed
                  </p>
                </div>
                <Users className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {userStats.projectsCompleted}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Projects Done
                  </p>
                </div>
                <Award className="h-8 w-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {userStats.matchScore}%
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Match Score
                  </p>
                </div>
                <TrendingUp className="h-8 w-8 text-orange-600" />
              </div>
            </CardContent>
          </Card>
        </div>
        {/* Main Content Grid */}
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Profile Section */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader className="border-b border-gray-100 dark:border-gray-800">
                <CardTitle className="flex items-center text-xl">
                  <User className="h-5 w-5 mr-2 text-blue-600" />
                  Your Profile
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-6">
                  <div className="flex items-center space-x-4">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 text-xl font-bold text-white">
                      {user.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                        {user.name}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 flex items-center">
                        <Mail className="h-4 w-4 mr-1" />
                        {user.email}
                      </p>
                      <p className="text-gray-600 dark:text-gray-400">
                        @{user.username}
                      </p>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                      Bio
                    </h4>
                    <p className="text-gray-700 dark:text-gray-300">
                      {user.bio ||
                        "No bio provided yet. Add one to help teammates get to know you better!"}
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-3">
                      Skills
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {user.skills && user.skills.length > 0 ? (
                        user.skills.map((skill: string) => (
                          <Badge
                            key={skill}
                            className="bg-blue-100 text-blue-800 hover:bg-blue-200 dark:bg-blue-900/30 dark:text-blue-400 px-3 py-1"
                          >
                            {skill}
                          </Badge>
                        ))
                      ) : (
                        <p className="text-gray-500 italic">
                          No skills listed yet. Add some to help others find
                          you!
                        </p>
                      )}
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-3">
                      Interests
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {user.interests && user.interests.length > 0 ? (
                        user.interests.map((interest: string) => (
                          <Badge
                            key={interest}
                            className="bg-purple-100 text-purple-800 hover:bg-purple-200 dark:bg-purple-900/30 dark:text-purple-400 px-3 py-1"
                          >
                            {interest}
                          </Badge>
                        ))
                      ) : (
                        <p className="text-gray-500 italic">
                          No interests listed yet. Share what excites you!
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="flex space-x-3 pt-4">
                    
                    <Button className="bg-blue-600 hover:bg-blue-700" onClick={clickSettings} >
                      <Settings className="h-4 w-4 mr-2" />
                      Edit Profile
                    </Button>
                    <Button variant="outline">
                      <Search className="h-4 w-4 mr-2" />
                      Find Teams
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
            {/* Recent Activity */}
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader className="border-b border-gray-100 dark:border-gray-800">
                <CardTitle className="flex items-center text-xl">
                  <Clock className="h-5 w-5 mr-2 text-green-600" />
                  Recent Activity
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  {recentActivity.length > 0 ? (
                    recentActivity.map((activity: any) => (
                      <div
                        key={activity.id}
                        className="flex items-center space-x-4 p-3 rounded-lg bg-gray-50 dark:bg-gray-800/50"
                      >
                        <div
                          className={`flex h-10 w-10 items-center justify-center rounded-full ${
                            activity.type === "hackathon"
                              ? "bg-blue-100 text-blue-600"
                              : activity.type === "team"
                              ? "bg-green-100 text-green-600"
                              : "bg-purple-100 text-purple-600"
                          }`}
                        >
                          {activity.type === "hackathon" ? (
                            <Calendar className="h-5 w-5" />
                          ) : activity.type === "team" ? (
                            <Users className="h-5 w-5" />
                          ) : (
                            <Award className="h-5 w-5" />
                          )}
                        </div>
                        <div className="flex-1">
                          <p className="font-medium text-gray-900 dark:text-white">
                            {activity.title}
                          </p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {activity.date}
                          </p>
                        </div>
                        <Badge
                          variant={
                            activity.status === "completed"
                              ? "default"
                              : "secondary"
                          }
                        >
                          {activity.status}
                        </Badge>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                      <Calendar className="h-12 w-12 mx-auto mb-3 text-gray-300" />
                      <p>No recent activity</p>
                      <p className="text-sm">
                        Join your first hackathon to see activity here!
                      </p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <a href="/join">
                  <Button className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">
                    <Plus className="h-4 w-4 mr-2" />
                    Join Hackathon
                  </Button>
                </a>
                <a href="/dashboard/hackathons">
                  <Button variant="outline" className="w-full">
                    <Search className="h-4 w-4 mr-2" />
                    Find Teammates
                  </Button>
                </a>
                {/* <Button variant="outline" className="w-full">
                  <Trophy className="h-4 w-4 mr-2" />
                  Browse Projects
                </Button> */}
              </CardContent>
            </Card>
            {/* Recommended Teammates */}
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg flex items-center">
                  <Star className="h-5 w-5 mr-2 text-yellow-500" />
                  Recommended Teammates
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {mockRecommendations.map((person) => (
                  <div
                    key={person.id}
                    className="p-3 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-gray-900 dark:text-white">
                        {person.name}
                      </h4>
                      <Badge className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
                        {person.match}% match
                      </Badge>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {person.skills.slice(0, 2).map((skill) => (
                        <Badge
                          key={skill}
                          variant="outline"
                          className="text-xs"
                        >
                          {skill}
                        </Badge>
                      ))}
                      {person.skills.length > 2 && (
                        <Badge variant="outline" className="text-xs">
                          +{person.skills.length - 2} more
                        </Badge>
                      )}
                    </div>
                  </div>
                ))}
                <Button variant="outline" className="w-full">
                  View All Recommendations
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
