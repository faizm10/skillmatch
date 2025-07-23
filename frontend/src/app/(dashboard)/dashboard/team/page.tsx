import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Users, User, Mail, MessageSquare, Plus, Settings, LinkIcon, Calendar1 } from 'lucide-react'
import { Calendar } from "@/components/ui/calendar"

const mockTeam = {
  name: "Code Crusaders",
  description: "A passionate team focused on building innovative web applications with a strong emphasis on user experience and clean code.",
  hackathon: "AI Innovation Challenge 2024",
  members: [
    { id: 1, name: "Alice Johnson", role: "Frontend Lead", skills: ["React", "TypeScript", "UI/UX"], email: "alice@example.com" },
    { id: 2, name: "Bob Smith", role: "Backend Lead", skills: ["Node.js", "GraphQL", "PostgreSQL"], email: "bob@example.com" },
    { id: 3, name: "Charlie Brown", role: "ML Engineer", skills: ["Python", "TensorFlow", "Data Science"], email: "charlie@example.com" },
  ],
  project: {
    name: "EcoTrack App",
    description: "An application to monitor and reduce personal carbon footprint using AI-driven insights.",
    status: "In Progress",
    repoUrl: "https://github.com/code-crusaders/ecotrack",
  },
  communication: {
    chatLink: "#", // Placeholder for chat link
    meetingLink: "#", // Placeholder for meeting link
  }
}

export default function TeamPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-neutral-900 dark:via-neutral-800 dark:to-neutral-900 p-8">
      <div className="mx-auto max-w-7xl">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Your Team</h1>

        {mockTeam ? (
          <div className="grid gap-8 lg:grid-cols-3">
            {/* Team Overview */}
            <div className="lg:col-span-2 space-y-6">
              <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
                <CardHeader className="border-b border-gray-100 dark:border-gray-800">
                  <CardTitle className="flex items-center text-xl">
                    <Users className="h-5 w-5 mr-2 text-blue-600" />
                    {mockTeam.name}
                  </CardTitle>
                  <CardDescription className="text-gray-600 dark:text-gray-400">
                    Participating in: <span className="font-medium text-blue-600 dark:text-blue-400">{mockTeam.hackathon}</span>
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-6 space-y-4">
                  <p className="text-gray-700 dark:text-gray-300">{mockTeam.description}</p>
                  <div className="flex space-x-3">
                    <Button className="bg-blue-600 hover:bg-blue-700">
                      <Settings className="h-4 w-4 mr-2" /> Manage Team
                    </Button>
                    <Button variant="outline">
                      <MessageSquare className="h-4 w-4 mr-2" /> Team Chat
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Team Members */}
              <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
                <CardHeader className="border-b border-gray-100 dark:border-gray-800">
                  <CardTitle className="flex items-center text-xl">
                    <User className="h-5 w-5 mr-2 text-purple-600" />
                    Team Members
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6 space-y-4">
                  {mockTeam.members.map((member) => (
                    <div key={member.id} className="flex items-center space-x-4 p-3 rounded-lg bg-gray-50 dark:bg-gray-800/50">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-blue-600 text-lg font-bold">
                        {member.name.charAt(0).toUpperCase()}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-900 dark:text-white">{member.name}</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{member.role}</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400 flex items-center"><Mail className="h-3 w-3 mr-1" />{member.email}</p>
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {member.skills.map((skill) => (
                          <Badge key={skill} variant="outline" className="text-xs">{skill}</Badge>
                        ))}
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>

            {/* Project Details & Communication */}
            <div className="space-y-6">
              <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-lg">Current Project</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <h3 className="font-semibold text-gray-900 dark:text-white">{mockTeam.project.name}</h3>
                  <p className="text-gray-700 dark:text-gray-300 text-sm">{mockTeam.project.description}</p>
                  <Badge variant="secondary">{mockTeam.project.status}</Badge>
                  {mockTeam.project.repoUrl && (
                    <Button variant="outline" className="w-full" asChild>
                      <a href={mockTeam.project.repoUrl} target="_blank" rel="noopener noreferrer">
                        <LinkIcon className="h-4 w-4 mr-2" /> GitHub Repo
                      </a>
                    </Button>
                  )}
                </CardContent>
              </Card>

              <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-lg">Communication</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button className="w-full bg-green-600 hover:bg-green-700" asChild>
                    <a href={mockTeam.communication.chatLink} target="_blank" rel="noopener noreferrer">
                      <MessageSquare className="h-4 w-4 mr-2" /> Open Team Chat
                    </a>
                  </Button>
                  <Button variant="outline" className="w-full" asChild>
                    <a href={mockTeam.communication.meetingLink} target="_blank" rel="noopener noreferrer">
                      <Calendar1 className="h-4 w-4 mr-2" /> Schedule Meeting
                    </a>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        ) : (
          <Card className="w-full max-w-2xl mx-auto p-8 text-center bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <CardTitle className="text-2xl font-bold text-gray-900 dark:text-white mb-4">You're not in a team yet!</CardTitle>
            <CardDescription className="text-gray-600 dark:text-gray-400 mb-6">
              Join a hackathon and find teammates to start building amazing projects.
            </CardDescription>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Plus className="h-4 w-4 mr-2" /> Find a Team
            </Button>
          </Card>
        )}
      </div>
    </div>
  )
}
