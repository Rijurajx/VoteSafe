import type { Candidate } from "@/types/election"
import { User } from "lucide-react"

interface ResultBarProps {
  candidate: Candidate
  votes: number
  percentage: number
  totalVotes: number
}

export function ResultBar({ candidate, votes, percentage, totalVotes }: ResultBarProps) {
  return (
    <div className="space-y-2">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full bg-muted">
          {candidate.imageUrl ? (
            <img
              src={candidate.imageUrl || "/placeholder.svg"}
              alt={candidate.name}
              className="h-full w-full object-cover"
            />
          ) : (
            <User className="h-5 w-5 text-muted-foreground" />
          )}
        </div>
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">{candidate.name}</p>
              <p className="text-xs text-muted-foreground">{candidate.party}</p>
            </div>
            <div className="text-right">
              <p className="font-medium">{votes} votes</p>
              <p className="text-xs text-muted-foreground">{percentage}%</p>
            </div>
          </div>
        </div>
      </div>
      <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
        <div className="h-full rounded-full bg-primary" style={{ width: `${percentage}%` }}></div>
      </div>
    </div>
  )
}

