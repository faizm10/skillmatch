"use client"
import { useEffect, useState } from "react"
import { gql, useQuery } from "@apollo/client"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, Users, Trophy, Search, MapPin, Clock } from 'lucide-react'

const GET_USER_HACKATHONS = gql`
  query GetUserHackathons($username: String!) {
    getUserHackathons(username: $username) {
      id
      title
      description
      date
      endDate
      location
      status
      theme
      maxParticipants
      prizes
      participants {
        user {
          id
          name
          username
        }
      }
    }
  }
`

function getCookie(name: string) {
  const value = `; ${document.cookie}`
  const parts = value.split(`; ${name}=`)
  if (parts.length === 2) return parts.pop()?.split(";").shift() || null
  return null
}

export default function HackathonsPage() {
  const [username, setUsername] = useState<string | null>(null)
  const router = useRouter()

  useEffect(() => {
    setUsername(getCookie("username"))
  }, [])

  const { data, loading, error } = useQuery(GET_USER_HACKATHONS, {
    variables: { username },
    skip: !username,
    fetchPolicy: "network-only",
  })

  const handleViewDetails = (hackathonId: string) => {
    router.push(`/hackathon/${hackathonId}`)
  }

  const handleFindTeam = (hackathonId: string) => {
    router.push(`/hackathon/${hackathonId}/team`)
  }

  // Format dates
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    })
  }

  // Get hackathon status based on dates
  const getHackathonStatus = (startDate: string, endDate: string) => {
    const now = new Date()
    const start = new Date(startDate)
    const end = new Date(endDate)
    
    if (now < start) {
      return "Upcoming"
    } else if (now >= start && now <= end) {
      return "In Progress"
    } else {
      return "Completed"
    }
  }

  if (!username) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-neutral-900 dark:to-neutral-800">
        <Card className="w-full max-w-md p-8 text-center">
          <CardTitle className="text-xl mb-4">Please Log In</CardTitle>
          <CardDescription className="mb-6">You need to be logged in to view your hackathons</CardDescription>
          <Button onClick={() => router.push('/login')} className="w-full">
            Go to Login
          </Button>
        </Card>
      </div>
    )
  }

  if (loading) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-neutral-900 dark:to-neutral-800">
      <Card className="w-full max-w-md p-8 text-center border-0 shadow-xl bg-white/80 dark:bg-neutral-800/80 backdrop-blur-sm">
        {/* Animated Logo/Icon */}
        <div className="relative mx-auto mb-6 h-20 w-20">
          {/* Outer rotating ring */}
          <div className="absolute inset-0 rounded-full border-4 border-blue-200 dark:border-blue-800 animate-spin"></div>
          {/* Inner pulsing circle */}
          <div className="absolute inset-2 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 animate-pulse opacity-80"></div>
          {/* Center icon */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="h-8 w-8 rounded-lg bg-white dark:bg-neutral-800 flex items-center justify-center shadow-sm">
              <svg className="h-5 w-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
          </div>
        </div>

        {/* Animated text */}
        <CardTitle className="text-xl mb-3 text-gray-800 dark:text-gray-100">
          Loading Your Hackathons
          <span className="inline-flex ml-1">
            <span className="animate-bounce">.</span>
            <span className="animate-bounce" style={{ animationDelay: '0.1s' }}>.</span>
            <span className="animate-bounce" style={{ animationDelay: '0.2s' }}>.</span>
          </span>
        </CardTitle>
        
        <CardDescription className="text-gray-600 dark:text-gray-300 mb-6">
          Getting your registered hackathons
        </CardDescription>

        {/* Progress bar */}
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mb-4 overflow-hidden">
          <div className="h-full bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full animate-pulse"></div>
        </div>

        {/* Loading steps animation */}
        <div className="space-y-2 text-sm text-gray-500 dark:text-gray-400">
          <div className="flex items-center justify-center space-x-2">
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-ping"></div>
            <span>Fetching your data...</span>
          </div>
        </div>
      </Card>
    </div>
  )
}

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-red-50 to-pink-100 dark:from-neutral-900 dark:to-red-900">
        <Card className="w-full max-w-md p-8 text-center border-red-200 dark:border-red-800">
          <CardTitle className="text-red-600 dark:text-red-400">Something went wrong</CardTitle>
          <CardDescription className="mt-2 text-gray-600 dark:text-gray-400">{error.message}</CardDescription>
          <Button onClick={() => router.push('/dashboard')} variant="destructive" className="mt-6">
            Return to Dashboard
          </Button>
        </Card>
      </div>
    )
  }

  const userHackathons = data?.getUserHackathons || []

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-neutral-900 dark:via-neutral-800 dark:to-neutral-900 p-8">
      <div className="mx-auto max-w-7xl">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Your Hackathons</h1>

        {userHackathons.length === 0 ? (
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <CardContent className="p-8 text-center">
              <div className="mb-4">
                <Trophy className="h-16 w-16 mx-auto text-gray-400" />
              </div>
              <CardTitle className="text-xl mb-2">No Hackathons Yet</CardTitle>
              <CardDescription className="mb-6">
                You haven't joined any hackathons yet. Start exploring and join your first hackathon!
              </CardDescription>
              <Button onClick={() => router.push('/join')} className="bg-blue-600 hover:bg-blue-700">
                <Search className="h-4 w-4 mr-2" /> Browse Hackathons
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {userHackathons.map((hackathon: any) => {
              const startDate = formatDate(hackathon.date)
              const endDate = formatDate(hackathon.endDate)
              const dateRange = `${startDate} - ${endDate}`
              const participantCount = hackathon.participants?.length || 0
              const status = getHackathonStatus(hackathon.date, hackathon.endDate)

              return (
                <Card key={hackathon.id} className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-shadow">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-xl">{hackathon.title}</CardTitle>
                      <div className="flex gap-2">
                        <Badge variant={status === "In Progress" ? "default" : status === "Upcoming" ? "secondary" : "outline"}>
                          {status}
                        </Badge>
                        <Badge variant="default">Registered</Badge>
                      </div>
                    </div>
                    <CardDescription className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                      <Calendar className="h-4 w-4 mr-1" /> {dateRange}
                    </CardDescription>
                    <CardDescription className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                      <MapPin className="h-4 w-4 mr-1" /> {hackathon.location}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-gray-700 dark:text-gray-300 line-clamp-3">{hackathon.description}</p>
                    <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
                      <div className="flex items-center">
                        <Users className="h-4 w-4 mr-1" /> {participantCount} / {hackathon.maxParticipants} Participants
                      </div>
                      <Badge variant="outline" className="text-xs">{hackathon.theme}</Badge>
                    </div>
                    <div className="flex gap-2">
                      <Button 
                        className="flex-1 bg-blue-600 hover:bg-blue-700"
                        onClick={() => handleViewDetails(hackathon.id)}
                      >
                        <Trophy className="h-4 w-4 mr-2" /> View Details
                      </Button>
                      {status === "Upcoming" && (
                        <Button 
                          variant="outline" 
                          className="flex-1"
                          onClick={() => handleFindTeam(hackathon.id)}
                        >
                          <Search className="h-4 w-4 mr-2" /> Find Team
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
