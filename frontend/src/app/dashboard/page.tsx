"use client";

export default function DashboardPage() {
  // Mock dashboard data
  const user = {
    name: "Alice Example",
    email: "alice@example.com",
    bio: "Full-stack developer passionate about hackathons.",
    skills: ["JavaScript", "React", "Node.js"],
    interests: ["AI", "Web Development", "Design"],
  };
  const projects = [
    { name: "Hackathon Project 1", status: "In Progress" },
    { name: "Open Source Contribution", status: "Completed" },
  ];

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-blue-50 dark:bg-neutral-900">
      <div className="w-full max-w-2xl bg-white dark:bg-neutral-800 rounded shadow p-8 mt-8">
        <h1 className="text-3xl font-bold mb-4">Welcome, {user.name}!</h1>
        <p className="mb-2 text-gray-700 dark:text-gray-300">Email: {user.email}</p>
        <p className="mb-2 text-gray-700 dark:text-gray-300">Bio: {user.bio}</p>
        <p className="mb-2 text-gray-700 dark:text-gray-300">Skills: {user.skills.join(", ")}</p>
        <p className="mb-4 text-gray-700 dark:text-gray-300">Interests: {user.interests.join(", ")}</p>
        <h2 className="text-xl font-semibold mb-2">Your Projects</h2>
        <ul className="list-disc pl-6">
          {projects.map((project, idx) => (
            <li key={idx} className="mb-1">
              <span className="font-medium">{project.name}</span> - <span className="text-sm text-gray-500">{project.status}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
} 