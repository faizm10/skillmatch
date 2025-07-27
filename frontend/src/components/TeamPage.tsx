"use client"
import { useEffect, useState } from "react"
import { gql, useQuery } from "@apollo/client"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Users, Search, Plus, MessageSquare, CheckCircle2, Github, Linkedin, Globe, ArrowLeft } from 'lucide-react'
import { notFound } from "next/navigation"

const GET_HACKATHON_PARTICIPANTS = gql`
  query GetHackathonParticipants($id: ID!) {
    getHackathon(id: $id) {
      id
      title
      description
      status
      participants {
        user {
          id
          name
          username
          bio
          skills
          interests
          github
          linkedin
          website
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

export default function TeamPage({ hackathonId }: { hackathonId: string }) {
  const [username, setUsername] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [skillFilter, setSkillFilter] = useState("")
  const router = useRouter()

  useEffect(() => {
    setUsername(getCookie("username"))
  }, [])

  const { data, loading, error } = useQuery(GET_HACKATHON_PARTICIPANTS, {
    variables: { id: hackathonId },
    fetchPolicy: "network-only",
  })

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-neutral-900 dark:to-neutral-800">
        <Card className="w-full max-w-md p-8 text-center">
          <div className="mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-4 border-blue-200 border-t-blue-600"></div>
          <CardTitle className="text-xl">Loading Participants...</CardTitle>
          <CardDescription className="mt-2">Getting all hackathon participants</CardDescription>
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

  const participants = hackathon.participants || []
  const currentUser = participants.find((p: any) => p.user.username === username)

  // Filter participants based on search and skill filter
  const filteredParticipants = participants.filter((participant: any) => {
    const user = participant.user
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.bio?.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesSkillFilter = !skillFilter || 
                              user.skills.some((skill: string) => 
                                skill.toLowerCase().includes(skillFilter.toLowerCase())
                              )

    return matchesSearch && matchesSkillFilter
  })

  // Get all unique skills for filter dropdown
  const allSkills = Array.from(new Set(
    participants.flatMap((p: any) => p.user.skills)
  )).sort() as string[]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-neutral-900 dark:via-neutral-800 dark:to-neutral-900 p-8">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center mb-4">
            <Button 
              variant="ghost" 
              onClick={() => router.back()}
              className="mr-4"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Find Teammates - {hackathon.title}
            </h1>
          </div>
          <p className="text-gray-700 dark:text-gray-300 mb-6">{hackathon.description}</p>
          
          {/* Stats */}
          <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400 mb-6">
            <span className="flex items-center">
              <Users className="h-4 w-4 mr-1" />
              {participants.length} participants
            </span>
            {currentUser && (
              <span className="flex items-center">
                <CheckCircle2 className="h-4 w-4 mr-1 text-green-500" />
                You're registered
              </span>
            )}
          </div>
        </div>

        {/* Search and Filter */}
        <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg mb-8">
          <CardContent className="p-6">
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
                  Search Participants
                </label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search by name, username, or bio..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
                  Filter by Skill
                </label>
                <select
                  value={skillFilter}
                  onChange={(e) => setSkillFilter(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white"
                >
                  <option value="">All Skills</option>
                  {allSkills.map((skill: string) => (
                    <option key={skill} value={skill}>{skill}</option>
                  ))}
                </select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Participants Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredParticipants.map((participant: any) => {
            const user = participant.user
            const isCurrentUser = user.username === username

            return (
              <Card key={user.id as string} className={`bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-shadow ${isCurrentUser ? 'ring-2 ring-blue-500' : ''}`}>
                <CardHeader className="pb-4">
                  <div className="flex items-center space-x-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 text-lg font-bold text-white">
                      {user.name.charAt(0).toUpperCase()}
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-lg">{user.name}</CardTitle>
                      <CardDescription>@{user.username}</CardDescription>
                      {isCurrentUser && (
                        <Badge variant="secondary" className="mt-1">You</Badge>
                      )}
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Bio */}
                  {user.bio && (
                    <div>
                      <p className="text-sm text-gray-700 dark:text-gray-300 line-clamp-3">
                        {user.bio}
                      </p>
                    </div>
                  )}

                  {/* Skills */}
                  <div>
                    <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">Skills</h4>
                    <div className="flex flex-wrap gap-1">
                      {user.skills.slice(0, 4).map((skill: string) => (
                        <Badge key={skill} variant="outline" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                      {user.skills.length > 4 && (
                        <Badge variant="outline" className="text-xs">
                          +{user.skills.length - 4} more
                        </Badge>
                      )}
                    </div>
                  </div>

                  {/* Interests */}
                  <div>
                    <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">Interests</h4>
                    <div className="flex flex-wrap gap-1">
                      {user.interests.slice(0, 3).map((interest: string) => (
                        <Badge key={interest} variant="secondary" className="text-xs">
                          {interest}
                        </Badge>
                      ))}
                      {user.interests.length > 3 && (
                        <Badge variant="secondary" className="text-xs">
                          +{user.interests.length - 3} more
                        </Badge>
                      )}
                    </div>
                  </div>

                  {/* Social Links */}
                  <div className="flex space-x-2 pt-2">
                    {user.github && (
                      <Button variant="ghost" size="sm" asChild>
                        <a href={user.github} target="_blank" rel="noopener noreferrer">
                          <Github className="h-4 w-4" />
                        </a>
                      </Button>
                    )}
                    {user.linkedin && (
                      <Button variant="ghost" size="sm" asChild>
                        <a href={user.linkedin} target="_blank" rel="noopener noreferrer">
                          <Linkedin className="h-4 w-4" />
                        </a>
                      </Button>
                    )}
                    {user.website && (
                      <Button variant="ghost" size="sm" asChild>
                        <a href={user.website} target="_blank" rel="noopener noreferrer">
                          <Globe className="h-4 w-4" />
                        </a>
                      </Button>
                    )}
                  </div>

                  {/* Action Buttons */}
                  {!isCurrentUser && (
                    <div className="flex space-x-2 pt-2">
                      <Button size="sm" className="flex-1">
                        <MessageSquare className="h-4 w-4 mr-2" />
                        Message
                      </Button>
                      <Button size="sm" variant="outline">
                        <Plus className="h-4 w-4 mr-2" />
                        Invite
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            )
          })}
        </div>

        {filteredParticipants.length === 0 && (
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <CardContent className="p-8 text-center">
              <Users className="h-16 w-16 mx-auto text-gray-400 mb-4" />
              <CardTitle className="text-xl mb-2">No Participants Found</CardTitle>
              <CardDescription>
                Try adjusting your search terms or skill filter to find more participants.
              </CardDescription>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
} 