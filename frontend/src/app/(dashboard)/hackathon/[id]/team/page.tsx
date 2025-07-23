import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Users, Mail, Search, Plus, MessageSquare, CheckCircle2, XCircle } from 'lucide-react'
import { notFound } from "next/navigation"

const mockHackathons = [
  {
    id: "ai-innovation-2024",
    title: "AI Innovation Challenge 2024",
    description: "Develop groundbreaking AI solutions for real-world problems.",
    status: "Open for Registration",
    recommendedTeammates: [
      { id: 1, name: "Sarah Chen", skills: ["React", "Python", "UI/UX"], match: 92, bio: "Frontend enthusiast with a knack for design." },
      { id: 2, name: "Alex Rodriguez", skills: ["Node.js", "GraphQL", "AWS"], match: 89, bio: "Backend wizard, loves scalable architectures." },
      { id: 3, name: "Emma Thompson", skills: ["Machine Learning", "TensorFlow"], match: 87, bio: "AI/ML specialist, passionate about data." },
      { id: 4, name: "David Lee", skills: ["DevOps", "Docker", "Kubernetes"], match: 85, bio: "Ensuring smooth deployments and infrastructure." },
    ],
    teamRequests: [
      { id: 101, from: "Innovators Guild", status: "pending" },
      { id: 102, from: "Data Dreamers", status: "accepted" },
    ],
    myTeam: null, // Set to { name: "My Team Name", members: [...] } if user has a team
  },
  {
    id: "web3-summit",
    title: "Web3 Summit: Decentralized Future",
    description: "Build the next generation of decentralized applications on blockchain.",
    status: "Registration Closed",
    recommendedTeammates: [],
    teamRequests: [],
    myTeam: {
      name: "Decentralized Dapps",
      members: [
        { id: 5, name: "Grace Hopper", role: "Lead Dev", skills: ["Solidity", "Web3.js"] },
        { id: 6, name: "Alan Turing", role: "Smart Contract Auditor", skills: ["Auditing", "Security"] },
      ],
    },
  },
]

export default async function HackathonTeamPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const hackathon = mockHackathons.find((h) => h.id === id)

  if (!hackathon) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-neutral-900 dark:via-neutral-800 dark:to-neutral-900 p-8">
      <div className="mx-auto max-w-7xl">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          Team Finder for {hackathon.title}
        </h1>
        <p className="text-gray-700 dark:text-gray-300 mb-6">{hackathon.description}</p>

        {hackathon.myTeam ? (
          <Card className="w-full bg-white/80 backdrop-blur-sm border-0 shadow-lg mb-8">
            <CardHeader className="border-b border-gray-100 dark:border-gray-800">
              <CardTitle className="flex items-center text-xl">
                <Users className="h-5 w-5 mr-2 text-blue-600" />
                Your Team: {hackathon.myTeam.name}
              </CardTitle>
              <CardDescription>You are already part of a team for this hackathon.</CardDescription>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              {hackathon.myTeam.members.map((member) => (
                <div key={member.id} className="flex items-center space-x-4 p-3 rounded-lg bg-gray-50 dark:bg-gray-800/50">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 text-blue-600 text-lg font-bold">
                    {member.name.charAt(0).toUpperCase()}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900 dark:text-white">{member.name}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{member.role}</p>
                  </div>
                  <Button variant="outline" size="sm">
                    <MessageSquare className="h-4 w-4 mr-2" /> Message
                  </Button>
                </div>
              ))}
              <Button className="w-full bg-blue-600 hover:bg-blue-700">
                <Users className="h-4 w-4 mr-2" /> View Team Dashboard
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-8 lg:grid-cols-3">
            {/* Recommended Teammates */}
            <div className="lg:col-span-2 space-y-6">
              <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
                <CardHeader className="border-b border-gray-100 dark:border-gray-800">
                  <CardTitle className="flex items-center text-xl">
                    <Search className="h-5 w-5 mr-2 text-green-600" />
                    Recommended Teammates
                  </CardTitle>
                  <CardDescription>Based on your skills and interests.</CardDescription>
                </CardHeader>
                <CardContent className="p-6 space-y-4">
                  {hackathon.recommendedTeammates.length > 0 ? (
                    hackathon.recommendedTeammates.map((person) => (
                      <div key={person.id} className="p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-medium text-gray-900 dark:text-white">{person.name}</h4>
                          <Badge className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">{person.match}% match</Badge>
                        </div>
                        <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">{person.bio}</p>
                        <div className="flex flex-wrap gap-1 mb-3">
                          {person.skills.map((skill) => (
                            <Badge key={skill} variant="outline" className="text-xs">{skill}</Badge>
                          ))}
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                            <MessageSquare className="h-4 w-4 mr-2" /> Message
                          </Button>
                          <Button variant="outline" size="sm">
                            <Plus className="h-4 w-4 mr-2" /> Invite to Team
                          </Button>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-500 italic">No recommendations found. Try updating your profile!</p>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Team Requests & Create Team */}
            <div className="space-y-6">
              <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-lg">Team Requests</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {hackathon.teamRequests.length > 0 ? (
                    hackathon.teamRequests.map((request) => (
                      <div key={request.id} className="flex items-center justify-between p-3 rounded-lg border border-gray-200 dark:border-gray-700">
                        <div>
                          <p className="font-medium text-gray-900 dark:text-white">{request.from}</p>
                          <Badge variant="secondary" className="mt-1">{request.status}</Badge>
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">
                            <CheckCircle2 className="h-4 w-4 text-green-500" />
                          </Button>
                          <Button size="sm" variant="outline">
                            <XCircle className="h-4 w-4 text-red-500" />
                          </Button>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-500 italic text-sm">No pending team requests.</p>
                  )}
                </CardContent>
              </Card>

              <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-lg">Create a New Team</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-gray-700 dark:text-gray-300 text-sm">
                    Can't find the perfect team? Start your own!
                  </p>
                  <Input placeholder="Team Name" />
                  <Button className="w-full bg-blue-600 hover:bg-blue-700">
                    <Plus className="h-4 w-4 mr-2" /> Create Team
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
