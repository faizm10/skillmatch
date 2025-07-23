import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Send, User, MessageSquare } from 'lucide-react'
import { notFound } from "next/navigation"

const mockHackathons = [
  {
    id: "ai-innovation-2024",
    title: "AI Innovation Challenge 2024",
    teamChat: [
      { id: 1, user: "Alice Johnson", message: "Hey team, any progress on the data preprocessing module?", time: "10:00 AM" },
      { id: 2, user: "Bob Smith", message: "Almost done, just fixing a minor bug. Will push to dev branch soon.", time: "10:05 AM" },
      { id: 3, user: "Charlie Brown", message: "Great! I've started on the model training script.", time: "10:15 AM" },
      { id: 4, user: "Alice Johnson", message: "Awesome! Let's sync up at 2 PM to review.", time: "10:20 AM" },
    ],
  },
  {
    id: "web3-summit",
    title: "Web3 Summit: Decentralized Future",
    teamChat: [
      { id: 1, user: "Grace Hopper", message: "Morning team! Any updates on the smart contract audit?", time: "09:30 AM" },
      { id: 2, user: "Alan Turing", message: "Found a potential reentrancy vulnerability, working on a fix.", time: "09:45 AM" },
    ],
  },
]

export default function HackathonChatPage({ params }: { params: { id: string } }) {
  const hackathon = mockHackathons.find((h) => h.id === params.id)

  if (!hackathon) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-neutral-900 dark:via-neutral-800 dark:to-neutral-900 p-8">
      <div className="mx-auto max-w-3xl">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
          Team Chat for {hackathon.title}
        </h1>

        <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg h-[70vh] flex flex-col">
          <CardHeader className="border-b border-gray-100 dark:border-gray-800">
            <CardTitle className="flex items-center text-xl">
              <MessageSquare className="h-5 w-5 mr-2 text-blue-600" />
              Team Discussion
            </CardTitle>
          </CardHeader>
          <CardContent className="flex-1 p-6 overflow-y-auto space-y-4">
            {hackathon.teamChat.length > 0 ? (
              hackathon.teamChat.map((message) => (
                <div key={message.id} className="flex items-start space-x-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 text-sm font-bold">
                    {message.user.charAt(0).toUpperCase()}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <p className="font-medium text-gray-900 dark:text-white">{message.user}</p>
                      <span className="text-xs text-gray-500 dark:text-gray-400">{message.time}</span>
                    </div>
                    <p className="text-gray-700 dark:text-gray-300">{message.message}</p>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center text-gray-500 italic py-10">No messages yet. Start the conversation!</div>
            )}
          </CardContent>
          <div className="p-4 border-t border-gray-100 dark:border-gray-800 flex items-center space-x-2">
            <Input placeholder="Type your message..." className="flex-1" />
            <Button>
              <Send className="h-4 w-4" />
              <span className="sr-only">Send message</span>
            </Button>
          </div>
        </Card>
      </div>
    </div>
  )
}
