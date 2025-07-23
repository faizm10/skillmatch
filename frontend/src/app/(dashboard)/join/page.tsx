import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, Users, Trophy, Search, Plus } from 'lucide-react'
import { Input } from "@/components/ui/input"

const mockAvailableHackathons = [
  {
    id: 1,
    title: "Future of AI in Healthcare",
    description: "Innovate solutions for medical diagnostics, drug discovery, and patient care using AI.",
    date: "Dec 5-7, 2024",
    status: "Open",
    participants: 80,
    theme: "Healthcare AI",
    skillsNeeded: ["Python", "Machine Learning", "Data Science", "Medical Imaging"],
  },
  {
    id: 2,
    title: "Green Energy Hackathon",
    description: "Develop sustainable energy solutions and combat climate change.",
    date: "Jan 20-22, 2025",
    status: "Open",
    participants: 60,
    theme: "Renewable Energy",
    skillsNeeded: ["IoT", "Embedded Systems", "Data Analytics", "Electrical Engineering"],
  },
  {
    id: 3,
    title: "EdTech Innovation Sprint",
    description: "Create the next generation of educational tools and platforms.",
    date: "Feb 10-12, 2025",
    status: "Open",
    participants: 75,
    theme: "Education Technology",
    skillsNeeded: ["Web Development", "UI/UX", "Gamification", "Content Creation"],
  },
  {
    id: 4,
    title: "Smart City Challenge",
    description: "Design and prototype solutions for urban challenges like traffic, waste, and public safety.",
    date: "Mar 1-3, 2025",
    status: "Open",
    participants: 100,
    theme: "Urban Development",
    skillsNeeded: ["GIS", "Data Visualization", "Backend Development", "Sensor Networks"],
  },
]

export default function JoinHackathonPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-neutral-900 dark:via-neutral-800 dark:to-neutral-900 p-8">
      <div className="mx-auto max-w-7xl">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Discover & Join Hackathons</h1>

        <div className="mb-6 flex items-center space-x-4">
          <Input placeholder="Search hackathons..." className="max-w-sm" />
          <Button variant="outline">
            <Search className="h-4 w-4 mr-2" /> Search
          </Button>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {mockAvailableHackathons.map((hackathon) => (
            <Card key={hackathon.id} className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl">{hackathon.title}</CardTitle>
                  <Badge variant={hackathon.status === "Open" ? "default" : "secondary"}>
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
                <div>
                  <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Skills Needed:</p>
                  <div className="flex flex-wrap gap-1">
                    {hackathon.skillsNeeded.map((skill) => (
                      <Badge key={skill} variant="secondary" className="text-xs">{skill}</Badge>
                    ))}
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button className="flex-1 bg-blue-600 hover:bg-blue-700">
                    <Plus className="h-4 w-4 mr-2" /> Join Hackathon
                  </Button>
                  <Button variant="outline" className="flex-1">
                    <Trophy className="h-4 w-4 mr-2" /> View Details
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
