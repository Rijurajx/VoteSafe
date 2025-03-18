"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/providers/auth-provider"
import { VoteIcon as HowToVote } from "lucide-react"

export default function SplashScreen() {
  const router = useRouter()
  const { isAuthenticated } = useAuth()

  useEffect(() => {
    // Redirect after a delay
    const timer = setTimeout(() => {
      if (isAuthenticated) {
        router.push("/dashboard")
      } else {
        router.push("/login")
      }
    }, 2000)

    return () => clearTimeout(timer)
  }, [isAuthenticated, router])

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background">
      <div className="flex flex-col items-center space-y-6 text-center">
        <HowToVote className="h-20 w-20 text-primary" />
        <h1 className="text-4xl font-bold tracking-tight">VoteSafe</h1>
        <p className="text-lg text-muted-foreground">Secure Decentralized Voting</p>
        <div className="mt-8">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
        </div>
      </div>
    </div>
  )
}

