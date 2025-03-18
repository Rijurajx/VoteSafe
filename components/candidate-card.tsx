"use client"

import { Card, CardContent } from "@/components/ui/card"
import type { Candidate } from "@/types/election"
import { User } from "lucide-react"

interface CandidateCardProps {
  candidate: Candidate
  isSelected: boolean
  onClick: () => void
}

export function CandidateCard({ candidate, isSelected, onClick }: CandidateCardProps) {
  return (
    <Card
      className={`cursor-pointer transition-all hover:bg-muted/50 ${
        isSelected ? "border-2 border-primary bg-primary/5" : ""
      }`}
      onClick={onClick}
    >
      <CardContent className="flex items-center gap-4 p-4">
        <div className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-full bg-muted">
          {candidate.imageUrl ? (
            <img
              src={candidate.imageUrl || "/placeholder.svg"}
              alt={candidate.name}
              className="h-full w-full object-cover"
            />
          ) : (
            <User className="h-6 w-6 text-muted-foreground" />
          )}
        </div>
        <div className="flex-1">
          <h3 className="font-medium">{candidate.name}</h3>
          <p className="text-sm text-muted-foreground">{candidate.party}</p>
          {candidate.manifesto && (
            <p className="mt-1 text-xs text-muted-foreground line-clamp-2">{candidate.manifesto}</p>
          )}
        </div>
        <div className="flex h-5 w-5 items-center justify-center rounded-full border-2 border-muted">
          {isSelected && <div className="h-3 w-3 rounded-full bg-primary"></div>}
        </div>
      </CardContent>
    </Card>
  )
}

