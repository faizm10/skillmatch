import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, Users, Trophy, Search } from 'lucide-react'

const mockHackathons = [
  {
    id: 1,
    title: "AI Innovation Challenge 2024",
    description: "Develop groundbreaking AI solutions for real-world problems.",
    date: "Oct 26-28, 2024",
    status: "Registered",
    participants: 150,
    theme: "Artificial Intelligence",
  },
  {
    id: 2,
    title: "Web3 Summit: Decentralized Future",
    description: "Build the next generation of decentralized applications on blockchain.",
    date: "Nov 10-12, 2024",
    status: "Recommended",
    participants: 120,
    theme: "Blockchain",
  },
  {
    id: 3,
    title: "Sustainable Tech Hackathon",
    description: "Innovate for a greener planet with sustainable technology solutions.",
    date: "Dec 1-3, 2024",
    status: "Recommended",
    participants: 90,
    theme: "Green Tech",
  },
  {
    id: 4,
    title: "FinTech Revolution",
    description: "Transform the financial industry with cutting-edge fintech solutions.",
    date: "Jan 15-17, 2025",
    status: "Recommended",
    participants: 180,
    theme: "Finance",
  },
]

export default function HackathonsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-neutral-900 dark:via-neutral-800 dark:to-neutral-900 p-8">
      <div className="mx-auto max-w-7xl">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Your Hackathons</h1>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {mockHackathons.map((hackathon) => (
            <Card key={hackathon.id} className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl">{hackathon.title}</CardTitle>
                  <Badge variant={hackathon.status === "Registered" ? "default" : "secondary"}>
                    {hackathon.status}
                  </Badge>
                </div>
                <CardDescription className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                  <Calendar className="h-4 w-4 mr-1" /> {hackathon.date}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-700 dark:text-gray-300">{hackathon.description}</p>
                <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
                  <div className="flex items-center">
                    <Users className="h-4 w-4 mr-1" /> {hackathon.participants} Participants
                  </div>
                  <Badge variant="outline" className="text-xs">{hackathon.theme}</Badge>
                </div>
                <div className="flex gap-2">
                  <Button className="flex-1 bg-blue-600 hover:bg-blue-700">
                    <Trophy className="h-4 w-4 mr-2" /> View Details
                  </Button>
                  {hackathon.status === "Recommended" && (
                    <Button variant="outline" className="flex-1">
                      <Search className="h-4 w-4 mr-2" /> Find Team
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
