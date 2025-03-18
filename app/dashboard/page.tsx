"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/providers/auth-provider"
import { electionService } from "@/services/election-service"
import type { Election } from "@/types/election"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { VoteIcon as HowToVote, LogOut, BadgeCheck, AlertTriangle, RefreshCw } from "lucide-react"
import { VerificationStatusCard } from "@/components/verification-status-card"
import { DashboardCard } from "@/components/dashboard-card"
import { ElectionCard } from "@/components/election-card"

export default function DashboardPage() {
  const router = useRouter()
  const { user, logout, isAuthenticated, updateUser } = useAuth()
  const [activeElections, setActiveElections] = useState<Election[]>([])
  const [isLoadingElections, setIsLoadingElections] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login")
    }
  }, [isAuthenticated, router])

  useEffect(() => {
    loadElections()
  }, [])

  // Check if both verifications are complete but isVerified is not set
  useEffect(() => {
    if (user && !user.isVerified && user.voterIdImageUrl && user.faceImageUrl) {
      // If both verifications are complete but isVerified is false, update it
      updateUser({ isVerified: true })
    }
  }, [user, updateUser])

  const loadElections = async () => {
    setIsLoadingElections(true)
    setError(null)
    try {
      const elections = await electionService.getActiveElections()
      setActiveElections(elections)
      if (elections.length === 0) {
        setError("No active elections found. This might be a data issue.")
      }
    } catch (error) {
      console.error("Error loading elections:", error)
      setError("Failed to load elections. Please try again.")
    } finally {
      setIsLoadingElections(false)
    }
  }

  const handleLogout = async () => {
    await logout()
    router.push("/login")
  }

  if (!user) {
    return null
  }

  // Explicitly check if these properties exist
  const hasIdVerification = !!user.voterIdImageUrl
  const hasFaceVerification = !!user.faceImageUrl

  // Consider a user verified if both ID and face are verified, even if isVerified flag is not set
  const effectivelyVerified = user.isVerified || (hasIdVerification && hasFaceVerification)

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <HowToVote className="h-6 w-6 text-primary" />
            <h1 className="text-xl font-bold">VoteSafe Dashboard</h1>
          </div>
          <Button variant="ghost" size="icon" onClick={handleLogout}>
            <LogOut className="h-5 w-5" />
          </Button>
        </div>
      </header>
      <main className="container py-6">
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Welcome, {user.name}</h2>
            <p className="text-muted-foreground">Complete your verification to participate in voting</p>
          </div>

          <VerificationStatusCard
            isVerified={effectivelyVerified}
            idVerified={hasIdVerification}
            faceVerified={hasFaceVerification}
          />

          <div>
            <h3 className="mb-4 text-xl font-bold">Verification Steps</h3>
            <div className="grid gap-4 md:grid-cols-2">
              <DashboardCard
                title="Government ID Verification"
                description="Upload your Voter ID for verification"
                icon={<BadgeCheck className="h-6 w-6" />}
                status={hasIdVerification ? "Completed" : "Pending"}
                statusColor={hasIdVerification ? "success" : "warning"}
                onClick={() => router.push("/verification/id")}
              />
              <DashboardCard
                title="Face Verification"
                description="Verify your identity with facial recognition"
                icon={<BadgeCheck className="h-6 w-6" />}
                status={hasFaceVerification ? "Completed" : hasIdVerification ? "Pending" : "Locked"}
                statusColor={hasFaceVerification ? "success" : hasIdVerification ? "warning" : "destructive"}
                onClick={() => router.push("/verification/face")}
                disabled={!hasIdVerification}
              />
            </div>
          </div>

          <div>
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-xl font-bold">Active Elections</h3>
              {isLoadingElections ? (
                <RefreshCw className="h-5 w-5 animate-spin text-muted-foreground" />
              ) : (
                <Button variant="ghost" size="sm" onClick={loadElections}>
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Refresh
                </Button>
              )}
            </div>

            {isLoadingElections ? (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-6 text-center">
                  <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
                  <p className="mt-4 text-muted-foreground">Loading elections...</p>
                </CardContent>
              </Card>
            ) : activeElections.length === 0 ? (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-6 text-center">
                  <AlertTriangle className="mb-2 h-8 w-8 text-muted-foreground" />
                  <p>No active elections at the moment</p>
                  {error && <p className="mt-2 text-sm text-destructive">{error}</p>}
                </CardContent>
              </Card>
            ) : (
              <div className="grid gap-4 md:grid-cols-2">
                {activeElections.map((election) => (
                  <ElectionCard
                    key={election.id}
                    election={election}
                    isVerified={effectivelyVerified}
                    onClick={() => {
                      if (!effectivelyVerified) {
                        // Show a message about completing verification
                        setError("Please complete both verification steps to access elections")
                        return
                      }
                      router.push(`/voting/${election.id}`)
                    }}
                  />
                ))}
              </div>
            )}

            {error && <div className="mt-4 rounded-md bg-destructive/10 p-3 text-sm text-destructive">{error}</div>}
          </div>
        </div>
      </main>
    </div>
  )
}

