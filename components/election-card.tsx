"use client"

import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import type { Election } from "@/types/election"
import { electionService } from "@/services/election-service"
import { CalendarDays, Users, Globe, MapPin } from "lucide-react"

interface ElectionCardProps {
  election: Election
  isVerified: boolean
  onClick: () => void
}

export function ElectionCard({ election, isVerified, onClick }: ElectionCardProps) {
  const isActive = electionService.isElectionOngoing(election)
  const isUpcoming = !electionService.hasElectionStarted(election)
  const isEnded = electionService.hasElectionEnded(election)

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  const getStatusBadge = () => {
    if (isActive) {
      return <span className="rounded-full bg-success/10 px-2 py-1 text-xs font-medium text-success">Active</span>
    }
    if (isUpcoming) {
      return <span className="rounded-full bg-primary/10 px-2 py-1 text-xs font-medium text-primary">Upcoming</span>
    }
    if (isEnded) {
      return (
        <span className="rounded-full bg-destructive/10 px-2 py-1 text-xs font-medium text-destructive">Ended</span>
      )
    }
    return null
  }

  return (
    <Card className="overflow-hidden">
      <CardContent className="p-6">
        <div className="mb-4 flex items-start justify-between">
          <h3 className="text-lg font-medium">{election.title}</h3>
          {getStatusBadge()}
        </div>
        <p className="mb-4 text-sm text-muted-foreground">{election.description}</p>
        <div className="space-y-2 text-sm">
          <div className="flex items-center text-muted-foreground">
            <CalendarDays className="mr-2 h-4 w-4" />
            {formatDate(election.startDate)} - {formatDate(election.endDate)}
          </div>
          <div className="flex items-center text-muted-foreground">
            <Users className="mr-2 h-4 w-4" />
            {election.candidates.length} Candidates
          </div>
          <div className="flex items-center text-muted-foreground">
            {election.isOnlineVotingAvailable ? (
              <Globe className="mr-2 h-4 w-4" />
            ) : (
              <MapPin className="mr-2 h-4 w-4" />
            )}
            {election.isOnlineVotingAvailable ? "Online Voting Available" : "In-Person Voting Only"}
          </div>
          {!election.isOnlineVotingAvailable && (
            <div className="mt-2 rounded-md bg-primary/10 p-2 text-xs text-primary">
              Click to view nearest voting booths and waiting times
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter className="bg-muted/20 px-6 py-4">
        <Button className="w-full" onClick={onClick} disabled={!isActive || !isVerified}>
          {isActive
            ? isVerified
              ? election.isOnlineVotingAvailable
                ? "Vote Online"
                : "View Voting Booths"
              : "Complete Verification First"
            : isUpcoming
              ? "Coming Soon"
              : "Voting Ended"}
        </Button>
      </CardFooter>
    </Card>
  )
}

