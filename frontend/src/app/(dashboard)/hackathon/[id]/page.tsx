"use client"
import { useEffect, useState } from "react"
import { gql, useQuery, useMutation } from "@apollo/client"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, Users, Code, LinkIcon, MessageSquare, Plus, UserPlus, Trophy } from 'lucide-react'
import { notFound } from "next/navigation"

const GET_HACKATHON = gql`
  query GetHackathon($id: ID!) {
    getHackathon(id: $id) {
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
      rules
      organizers
      sponsors
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

export default function HackathonDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const [id, setId] = useState<string | null>(null)
  const [username, setUsername] = useState<string | null>(null)
  const router = useRouter()

  useEffect(() => {
    const loadParams = async () => {
      const { id: hackathonId } = await params
      setId(hackathonId)
    }
    loadParams()
    setUsername(getCookie("username"))
  }, [params])

  const { data, loading, error, refetch } = useQuery(GET_HACKATHON, {
    variables: { id },
    skip: !id,
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

  const handleJoinHackathon = async () => {
    if (!username) {
      alert('Please log in to join a hackathon')
      router.push('/login')
      return
    }

    try {
      await joinHackathon({
        variables: {
          username,
          hackathonId: id
        }
      })
      alert('Successfully joined the hackathon!')
    } catch (error) {
      console.error('Error joining hackathon:', error)
    }
  }

  if (!id) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-4 border-blue-200 border-t-blue-600"></div>
          <p>Loading hackathon...</p>
        </div>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-neutral-900 dark:to-neutral-800">
        <Card className="w-full max-w-md p-8 text-center">
          <div className="mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-4 border-blue-200 border-t-blue-600"></div>
          <CardTitle className="text-xl">Loading Hackathon...</CardTitle>
          <CardDescription className="mt-2">Getting hackathon details</CardDescription>
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

  const hackathon = data?.getHackathon
  if (!hackathon) {
    notFound()
  }

  // Check if current user is already a participant
  const isParticipant = hackathon.participants?.some(
    (participant: any) => participant.user.username === username
  )

  // Format dates
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    })
  }

  const startDate = formatDate(hackathon.date)
  const endDate = formatDate(hackathon.endDate)
  const dateRange = `${startDate} - ${endDate}`

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
                    <p className="text-gray-900 dark:text-white">{dateRange}</p>
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
                    <p className="text-gray-900 dark:text-white">{hackathon.participants?.length || 0} / {hackathon.maxParticipants}</p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  <Badge variant={hackathon.status === "Open for Registration" ? "default" : "destructive"}>
                    {hackathon.status}
                  </Badge>
                  {isParticipant && (
                    <Badge variant="secondary">You're Registered</Badge>
                  )}
                </div>
                <div className="flex gap-3 pt-4">
                  {hackathon.status === "Open for Registration" && !isParticipant && (
                    <Button 
                      className="bg-blue-600 hover:bg-blue-700"
                      onClick={handleJoinHackathon}
                      disabled={joining}
                    >
                      {joining ? (
                        <>
                          <div className="h-4 w-4 mr-2 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                          Joining...
                        </>
                      ) : (
                        <>
                          <Plus className="h-4 w-4 mr-2" /> 
                          Join Hackathon
                        </>
                      )}
                    </Button>
                  )}
                  {isParticipant && (
                    <Button variant="secondary" asChild>
                      <a href={`/hackathon/${hackathon.id}/team`}>
                        <UserPlus className="h-4 w-4 mr-2" /> Find Teammates
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

            {/* Rules */}
              <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
                <CardHeader className="border-b border-gray-100 dark:border-gray-800">
                  <CardTitle className="flex items-center text-xl">
                  <Code className="h-5 w-5 mr-2 text-green-600" />
                  Rules & Guidelines
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                <p className="text-gray-700 dark:text-gray-300">{hackathon.rules}</p>
                </CardContent>
              </Card>
          </div>

          {/* Sidebar: Prizes, Organizers, Sponsors */}
          <div className="space-y-6">
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg">Prizes</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {hackathon.prizes.map((prize: string, index: number) => (
                  <div key={index} className="flex items-center text-gray-700 dark:text-gray-300">
                    <Trophy className="h-4 w-4 mr-2 text-yellow-500" /> {prize}
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg">Organizers</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {hackathon.organizers.map((org: string, index: number) => (
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
                {hackathon.sponsors.map((sponsor: string, index: number) => (
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
