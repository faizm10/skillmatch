"use client"

import type React from "react"

import { useState } from "react"
import { gql, useMutation } from "@apollo/client"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"

const LOGIN = gql`

  mutation Login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      id
      name
      email
      username
      bio
      skills
      interests
      createdAt
    }
  }
`

export default function LoginPage() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [errorMsg, setErrorMsg] = useState("")
  const router = useRouter()

  const [login, { loading }] = useMutation(LOGIN, {
    onCompleted: (data) => {
      setErrorMsg("")
      // Set username cookie for middleware
      document.cookie = `username=${username}; path=/`
      router.push("/dashboard")
    },
    onError: (error) => {
      setErrorMsg(error.message)
    },
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrorMsg("")
    if (!username || !password) {
      setErrorMsg("Please enter both username and password.")
      return
    }
    try {
      await login({ variables: { username, password } })
    } catch (err) {
      
    }
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-blue-50 p-4 dark:bg-neutral-900 sm:p-8">
      <Card className="w-full max-w-md p-6 shadow-lg sm:p-8">
        <CardHeader className="mb-6 p-0 text-center">
          <CardTitle className="text-3xl font-bold text-blue-700 dark:text-blue-400">Welcome Back!</CardTitle>
          <CardDescription className="mt-2 text-neutral-600 dark:text-neutral-400">
            Log in to find your next hackathon team.
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid gap-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter your username"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
              />
            </div>
            <Button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800"
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login"}
            </Button>
            {errorMsg && <p className="mt-4 text-center text-sm text-red-600">{errorMsg}</p>}
          </form>
          <p className="mt-6 text-center text-sm text-neutral-600 dark:text-neutral-400">
            Don't have an account?{" "}
            <a href="/signup" className="font-medium text-blue-600 hover:underline dark:text-blue-400">
              Sign up
            </a>
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
