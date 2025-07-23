import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, Users, Code, LinkIcon, MessageSquare, Plus, UserPlus, Trophy } from 'lucide-react'
import { notFound } from "next/navigation"

const mockHackathons = [
  {
    id: "ai-innovation-2024",
    title: "AI Innovation Challenge 2024",
    description: "Develop groundbreaking AI solutions for real-world problems. This hackathon focuses on leveraging the latest advancements in artificial intelligence to create impactful and scalable applications across various domains, including healthcare, education, and environmental sustainability. Participants will have access to expert mentors, cutting-edge tools, and a collaborative environment to bring their ideas to life.",
    date: "Oct 26-28, 2024",
    location: "Virtual",
    status: "Open for Registration",
    theme: "Artificial Intelligence",
    prizes: ["$5,000 Cash", "Mentorship", "Cloud Credits"],
    rules: "Teams of 1-4. Submissions must include a working prototype and a presentation.",
    schedule: [
      { time: "Oct 26, 9:00 AM", event: "Opening Ceremony & Keynote" },
      { time: "Oct 26, 10:00 AM", event: "Team Formation & Brainstorming" },
      { time: "Oct 27, 9:00 AM", event: "Mid-point Check-in & Workshops" },
      { time: "Oct 28, 12:00 PM", event: "Submission Deadline" },
      { time: "Oct 28, 2:00 PM", event: "Judging & Presentations" },
      { time: "Oct 28, 5:00 PM", event: "Awards Ceremony" },
    ],
    organizers: ["Tech Innovators Inc.", "AI Guild"],
    sponsors: ["Google Cloud", "Microsoft Azure", "NVIDIA"],
    currentParticipants: 150,
    maxParticipants: 200,
    hasTeam: false, // Mock: true if user has a team for this hackathon
  },
  {
    id: "web3-summit",
    title: "Web3 Summit: Decentralized Future",
    description: "Build the next generation of decentralized applications on blockchain. Explore DeFi, NFTs, DAOs, and more.",
    date: "Nov 10-12, 2024",
    location: "Hybrid (Online & NYC)",
    status: "Registration Closed",
    theme: "Blockchain & Decentralization",
    prizes: ["$7,000 Crypto", "Incubator Spot", "Hardware Wallets"],
    rules: "Teams of 1-5. Focus on innovation and security.",
    schedule: [],
    organizers: ["Blockchain Builders", "Decentralized Future DAO"],
    sponsors: ["Ethereum Foundation", "Solana Labs"],
    currentParticipants: 120,
    maxParticipants: 120,
    hasTeam: true,
  },
]

export default function HackathonDetailPage({ params }: { params: { id: string } }) {
  const hackathon = mockHackathons.find((h) => h.id === params.id)

  if (!hackathon) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-neutral-900 dark:via-neutral-800 dark:to-neutral-900 p-8">
      <div className="mx-auto max-w-7xl">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">{hackathon.title}</h1>
        <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">{hackathon.description}</p>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Overview Card */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader className="border-b border-gray-100 dark:border-gray-800">
                <CardTitle className="flex items-center text-xl">
                  <Trophy className="h-5 w-5 mr-2 text-blue-600" />
                  Hackathon Overview
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Date</p>
                    <p className="text-gray-900 dark:text-white">{hackathon.date}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Location</p>
                    <p className="text-gray-900 dark:text-white">{hackathon.location}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Theme</p>
                    <Badge variant="secondary">{hackathon.theme}</Badge>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Participants</p>
                    <p className="text-gray-900 dark:text-white">{hackathon.currentParticipants} / {hackathon.maxParticipants}</p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  <Badge variant={hackathon.status === "Open for Registration" ? "default" : "destructive"}>
                    {hackathon.status}
                  </Badge>
                </div>
                <div className="flex gap-3 pt-4">
                  {hackathon.status === "Open for Registration" && !hackathon.hasTeam && (
                    <Button className="bg-blue-600 hover:bg-blue-700">
                      <Plus className="h-4 w-4 mr-2" /> Register Now
                    </Button>
                  )}
                  {hackathon.status === "Open for Registration" && (
                    <Button variant="outline" asChild>
                      <a href={`/hackathon/${hackathon.id}/team`}>
                        <UserPlus className="h-4 w-4 mr-2" /> Find Teammates
                      </a>
                    </Button>
                  )}
                  {hackathon.hasTeam && (
                    <Button variant="secondary" asChild>
                      <a href={`/dashboard/team`}>
                        <Users className="h-4 w-4 mr-2" /> View My Team
                      </a>
                    </Button>
                  )}
                  <Button variant="ghost" asChild>
                    <a href={`/hackathon/${hackathon.id}/chat`}>
                      <MessageSquare className="h-4 w-4 mr-2" /> Chat
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Schedule */}
            {hackathon.schedule.length > 0 && (
              <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
                <CardHeader className="border-b border-gray-100 dark:border-gray-800">
                  <CardTitle className="flex items-center text-xl">
                    <Calendar className="h-5 w-5 mr-2 text-orange-600" />
                    Schedule
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <ol className="relative border-l border-gray-200 dark:border-gray-700">
                    {hackathon.schedule.map((item, index) => (
                      <li key={index} className="mb-6 ml-4">
                        <div className="absolute w-3 h-3 bg-blue-600 rounded-full mt-1.5 -left-1.5 border border-white dark:border-gray-900 dark:bg-blue-900"></div>
                        <time className="mb-1 text-sm font-normal leading-none text-gray-600 dark:text-gray-400">{item.time}</time>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{item.event}</h3>
                      </li>
                    ))}
                  </ol>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar: Prizes, Rules, Organizers, Sponsors */}
          <div className="space-y-6">
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg">Prizes</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {hackathon.prizes.map((prize, index) => (
                  <div key={index} className="flex items-center text-gray-700 dark:text-gray-300">
                    <Trophy className="h-4 w-4 mr-2 text-yellow-500" /> {prize}
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg">Rules</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 dark:text-gray-300 text-sm">{hackathon.rules}</p>
              </CardContent>
            </Card>

            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg">Organizers</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {hackathon.organizers.map((org, index) => (
                  <div key={index} className="flex items-center text-gray-700 dark:text-gray-300">
                    <Users className="h-4 w-4 mr-2 text-purple-600" /> {org}
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg">Sponsors</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {hackathon.sponsors.map((sponsor, index) => (
                  <div key={index} className="flex items-center text-gray-700 dark:text-gray-300">
                    <LinkIcon className="h-4 w-4 mr-2 text-green-600" /> {sponsor}
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
