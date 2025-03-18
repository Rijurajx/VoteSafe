"use client"

import { useState, useEffect, use } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/providers/auth-provider"
import { electionService } from "@/services/election-service"
import type { Election } from "@/types/election"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { ArrowLeft, CheckCircle, VoteIcon as HowToVote, BarChart } from "lucide-react"
import { CandidateCard } from "@/components/candidate-card"
import { InPersonVotingInfo } from "@/components/in-person-voting-info"

export default function VotingPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter()
  const { user } = useAuth()
  const unwrappedParams = use(params) // ✅ Unwrap the Promise
  const electionId = unwrappedParams.id // ✅ Now `id` is accessible
  
  const [election, setElection] = useState<Election | null>(null)
  const [selectedCandidate, setSelectedCandidate] = useState<number | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [hasVoted, setHasVoted] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (electionId) {
      loadElection()
    }
  }, [electionId])

  const loadElection = async () => {
    setIsLoading(true)
    setError(null)
    try {
      const electionData = await electionService.getElectionById(electionId)
      setElection(electionData)
    } catch (error) {
      setError(error instanceof Error ? error.message : "Failed to load election")
    } finally {
      setIsLoading(false)
    }
  }


  const handleVote = async () => {
    if (!selectedCandidate || !user || !election) {
      return
    }

    setIsSubmitting(true)
    try {
      const success = await electionService.castVote(user.id, election.id, selectedCandidate)

      if (success) {
        setHasVoted(true)
      } else {
        throw new Error("Failed to cast vote")
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : "Failed to cast vote")
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isLoading) {
    return (
      <div className="container mx-auto flex min-h-screen items-center justify-center">
        <div className="flex flex-col items-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
          <p className="mt-4 text-muted-foreground">Loading election...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="container mx-auto max-w-3xl py-8">
        <Button variant="ghost" className="mb-4" onClick={() => router.push("/dashboard")}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Dashboard
        </Button>

        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12 text-center">
            <Alert variant="destructive" className="mb-4">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
            <Button onClick={loadElection}>Retry</Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (!election) {
    return (
      <div className="container mx-auto max-w-3xl py-8">
        <Button variant="ghost" className="mb-4" onClick={() => router.push("/dashboard")}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Dashboard
        </Button>

        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12 text-center">
            <p className="text-muted-foreground">Election not found</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (hasVoted) {
    return (
      <div className="container mx-auto max-w-3xl py-8">
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12 text-center">
            <CheckCircle className="mb-4 h-16 w-16 text-success" />
            <h2 className="mb-2 text-2xl font-bold">Vote Cast Successfully!</h2>
            <p className="mb-8 text-muted-foreground">
              Your vote has been securely recorded on the blockchain. Thank you for participating in the democratic
              process.
            </p>
            <div className="flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
              <Button variant="outline" onClick={() => router.push("/dashboard")}>
                Back to Dashboard
              </Button>
              <Button onClick={() => router.push(`/results/${election.id}`)}>
                <BarChart className="mr-2 h-4 w-4" />
                View Results
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="container mx-auto max-w-3xl py-8">
      <Button variant="ghost" className="mb-4" onClick={() => router.push("/dashboard")}>
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Dashboard
      </Button>

      <Card>
        <CardHeader>
          <CardTitle>{election.title}</CardTitle>
          <CardDescription>{election.description}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {election.isOnlineVotingAvailable ? (
            <div>
              <h3 className="mb-4 text-lg font-medium">Select a Candidate</h3>
              <div className="space-y-4">
                {election.candidates.map((candidate) => (
                  <CandidateCard
                    key={candidate.id}
                    candidate={candidate}
                    isSelected={selectedCandidate === candidate.id}
                    onClick={() => setSelectedCandidate(candidate.id)}
                  />
                ))}
              </div>
            </div>
          ) : (
            <InPersonVotingInfo votingBooths={election.votingBooths || []} />
          )}
        </CardContent>
        <CardFooter className="flex-col space-y-4">
          {election.isOnlineVotingAvailable ? (
            <>
              <Button className="w-full" onClick={handleVote} disabled={!selectedCandidate || isSubmitting}>
                {isSubmitting ? (
                  <>
                    <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-background border-t-transparent"></div>
                    Casting Vote...
                  </>
                ) : (
                  <>
                    <HowToVote className="mr-2 h-4 w-4" />
                    Cast Vote
                  </>
                )}
              </Button>
              <p className="text-center text-xs text-muted-foreground">
                Note: Your vote is secure and anonymous. Once cast, it cannot be changed.
              </p>
            </>
          ) : (
            <p className="text-center text-sm text-muted-foreground">
              This election requires in-person voting. Please visit your designated voting booth to cast your vote.
            </p>
          )}
        </CardFooter>
      </Card>
    </div>
  )
}

