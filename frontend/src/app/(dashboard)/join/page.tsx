"use client"
import { useEffect, useState } from "react"
import { gql, useQuery, useMutation } from "@apollo/client"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, Users, Trophy, Search, Plus, MapPin } from 'lucide-react'
import { Input } from "@/components/ui/input"

const GET_HACKATHONS = gql`
  query GetHackathons {
    getHackathons {
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

const JOIN_HACKATHON = gql`
  mutation JoinHackathon($username: String!, $hackathonId: ID!) {
    joinHackathon(username: $username, hackathonId: $hackathonId) {
      id
      user {
        id
        name
        username
      }
      hackathon {
        id
        title
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

export default function JoinHackathonPage() {
  const [username, setUsername] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const router = useRouter()

  useEffect(() => {
    setUsername(getCookie("username"))
  }, [])

  const { data, loading, error, refetch } = useQuery(GET_HACKATHONS, {
    fetchPolicy: "network-only",
  })

  const [joinHackathon, { loading: joining }] = useMutation(JOIN_HACKATHON, {
    onCompleted: () => {
      refetch() // Refresh the data after joining
    },
    onError: (error) => {
      console.error('Error joining hackathon:', error.message)
      alert(`Failed to join hackathon: ${error.message}`)
    }
  })

  const handleJoinHackathon = async (hackathonId: string) => {
    if (!username) {
      alert('Please log in to join a hackathon')
      router.push('/login')
      return
    }

    try {
      await joinHackathon({
        variables: {
          username,
          hackathonId
        }
      })
      alert('Successfully joined the hackathon!')
    } catch (error) {
      console.error('Error joining hackathon:', error)
    }
  }

  const handleViewDetails = (hackathonId: string) => {
    router.push(`/hackathon/${hackathonId}`)
  }

  // Filter hackathons based on search term
  const filteredHackathons = data?.getHackathons?.filter((hackathon: any) => {
    const searchLower = searchTerm.toLowerCase()
    return (
      hackathon.title.toLowerCase().includes(searchLower) ||
      hackathon.description.toLowerCase().includes(searchLower) ||
      hackathon.theme.toLowerCase().includes(searchLower) ||
      hackathon.location.toLowerCase().includes(searchLower)
    )
  }) || []

  // Check if user is already a participant in a hackathon
  const isParticipant = (hackathon: any) => {
    return hackathon.participants?.some(
      (participant: any) => participant.user.username === username
    )
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

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-neutral-900 dark:to-neutral-800">
        <Card className="w-full max-w-md p-8 text-center">
          <div className="mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-4 border-blue-200 border-t-blue-600"></div>
          <CardTitle className="text-xl">Loading Hackathons...</CardTitle>
          <CardDescription className="mt-2">Getting available hackathons</CardDescription>
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-neutral-900 dark:via-neutral-800 dark:to-neutral-900 p-8">
      <div className="mx-auto max-w-7xl">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Discover & Join Hackathons</h1>

        <div className="mb-6 flex items-center space-x-4">
          <Input 
            placeholder="Search hackathons..." 
            className="max-w-sm" 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Button variant="outline">
            <Search className="h-4 w-4 mr-2" /> Search
          </Button>
        </div>

        {filteredHackathons.length === 0 ? (
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <CardContent className="p-8 text-center">
              <p className="text-gray-600 dark:text-gray-400">
                {searchTerm ? 'No hackathons found matching your search.' : 'No hackathons available at the moment.'}
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredHackathons.map((hackathon: any) => {
              const startDate = formatDate(hackathon.date)
              const endDate = formatDate(hackathon.endDate)
              const dateRange = `${startDate} - ${endDate}`
              const participantCount = hackathon.participants?.length || 0
              const isUserParticipant = isParticipant(hackathon)

              return (
                <Card key={hackathon.id} className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-shadow">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-xl">{hackathon.title}</CardTitle>
                      <div className="flex gap-2">
                        <Badge variant={hackathon.status === "Open for Registration" ? "default" : "secondary"}>
                          {hackathon.status}
                        </Badge>
                        {isUserParticipant && (
                          <Badge variant="secondary">Joined</Badge>
                        )}
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
                      {hackathon.status === "Open for Registration" && !isUserParticipant ? (
                        <Button 
                          className="flex-1 bg-blue-600 hover:bg-blue-700"
                          onClick={() => handleJoinHackathon(hackathon.id)}
                          disabled={joining}
                        >
                          {joining ? (
                            <>
                              <div className="h-4 w-4 mr-2 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                              Joining...
                            </>
                          ) : (
                            <>
                              <Plus className="h-4 w-4 mr-2" /> Join Hackathon
                            </>
                          )}
                        </Button>
                      ) : isUserParticipant ? (
                        <Button variant="secondary" className="flex-1" disabled>
                          Already Joined
                        </Button>
                      ) : (
                        <Button variant="outline" className="flex-1" disabled>
                          Registration Closed
                        </Button>
                      )}
                      <Button 
                        variant="outline" 
                        className="flex-1"
                        onClick={() => handleViewDetails(hackathon.id)}
                      >
                        <Trophy className="h-4 w-4 mr-2" /> View Details
                      </Button>
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
