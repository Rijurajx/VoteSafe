"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { electionService } from "@/services/election-service"
import type { Election } from "@/types/election"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { ArrowLeft, RefreshCw } from "lucide-react"
import { ResultBar } from "@/components/result-bar"

export default function ResultsPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [election, setElection] = useState<Election | null>(null)
  const [results, setResults] = useState<Record<number, number>>({})
  const [isLoading, setIsLoading] = useState(true)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [totalVotes, setTotalVotes] = useState(0)

  useEffect(() => {
    loadElectionAndResults()
  }, [params.id])

  const loadElectionAndResults = async () => {
    setIsLoading(true)
    setError(null)
    try {
      // Load election details
      const electionData = await electionService.getElectionById(params.id)
      setElection(electionData)

      // Load election results
      await loadResults()
    } catch (error) {
      setError(error instanceof Error ? error.message : "Failed to load election")
    } finally {
      setIsLoading(false)
    }
  }

  const loadResults = async () => {
    if (!params.id) return

    setIsRefreshing(true)
    try {
      const resultsData = await electionService.getElectionResults(params.id)
      setResults(resultsData)

      // Calculate total votes
      let total = 0
      Object.values(resultsData).forEach((count) => {
        total += count
      })
      setTotalVotes(total)
    } catch (error) {
      console.error("Error loading results:", error)
    } finally {
      setIsRefreshing(false)
    }
  }

  if (isLoading) {
    return (
      <div className="container mx-auto flex min-h-screen items-center justify-center">
        <div className="flex flex-col items-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
          <p className="mt-4 text-muted-foreground">Loading results...</p>
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
            <Button onClick={loadElectionAndResults}>Retry</Button>
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

  return (
    <div className="container mx-auto max-w-3xl py-8">
      <Button variant="ghost" className="mb-4" onClick={() => router.push("/dashboard")}>
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Dashboard
      </Button>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>{election.title}</CardTitle>
              <CardDescription>{election.description}</CardDescription>
            </div>
            <Button variant="outline" size="sm" onClick={loadResults} disabled={isRefreshing}>
              <RefreshCw className={`mr-2 h-4 w-4 ${isRefreshing ? "animate-spin" : ""}`} />
              Refresh
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h3 className="mb-2 text-lg font-medium">Results</h3>
            <p className="mb-4 text-sm text-muted-foreground">Total Votes: {totalVotes}</p>

            <div className="space-y-4">
              {election.candidates.map((candidate) => {
                const votes = results[candidate.id] || 0
                const percentage = totalVotes > 0 ? ((votes / totalVotes) * 100).toFixed(1) : "0.0"

                return (
                  <ResultBar
                    key={candidate.id}
                    candidate={candidate}
                    votes={votes}
                    percentage={Number.parseFloat(percentage)}
                    totalVotes={totalVotes}
                  />
                )
              })}
            </div>
          </div>

          <div className="rounded-lg bg-muted/30 p-4 text-center text-sm text-muted-foreground">
            {electionService.hasElectionEnded(election)
              ? "This election has ended. Final results are displayed above."
              : "Results are updated in real-time as votes are cast."}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

