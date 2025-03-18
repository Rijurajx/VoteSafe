"use client"

import { useState, useEffect } from "react"
import type { VotingBooth } from "@/types/election"
import { inPersonVotingService } from "@/services/in-person-voting-service"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { MapPin, Clock, Navigation } from "lucide-react"

interface InPersonVotingInfoProps {
  votingBooths: VotingBooth[]
}

export function InPersonVotingInfo({ votingBooths }: InPersonVotingInfoProps) {
  const [selectedBooth, setSelectedBooth] = useState<VotingBooth | null>(null)
  const [waitingTime, setWaitingTime] = useState<number | null>(null)
  const [distances, setDistances] = useState<Record<string, number>>({})

  // Simulate distances to voting booths
  useEffect(() => {
    if (votingBooths.length > 0) {
      // Simulate user location and calculate distances
      const simulatedDistances: Record<string, number> = {}

      votingBooths.forEach((booth) => {
        // Generate a random distance between 0.5 and 10 km
        simulatedDistances[booth.id] = Number.parseFloat((Math.random() * 9.5 + 0.5).toFixed(1))
      })

      setDistances(simulatedDistances)

      // Auto-select the nearest booth
      const sortedBooths = [...votingBooths].sort((a, b) => simulatedDistances[a.id] - simulatedDistances[b.id])

      if (sortedBooths.length > 0) {
        setSelectedBooth(sortedBooths[0])
      }
    }
  }, [votingBooths])

  // Get waiting time for selected booth
  useEffect(() => {
    if (selectedBooth) {
      inPersonVotingService.getWaitingTime(selectedBooth.id).then(setWaitingTime)
    }
  }, [selectedBooth])

  const handleBoothSelect = (boothId: string) => {
    const booth = votingBooths.find((b) => b.id === boothId)
    setSelectedBooth(booth || null)
  }

  const handleGetDirections = () => {
    if (selectedBooth) {
      const url = `https://www.google.com/maps/dir/?api=1&destination=${selectedBooth.latitude},${selectedBooth.longitude}`
      window.open(url, "_blank")
    }
  }

  if (votingBooths.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>In-Person Voting Information</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-center py-4 text-muted-foreground">No voting booths available for this election.</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>In-Person Voting Information</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <label htmlFor="boothSelect" className="mb-2 block text-sm font-medium">
            Select nearest voting booth
          </label>
          <Select value={selectedBooth?.id} onValueChange={handleBoothSelect}>
            <SelectTrigger id="boothSelect">
              <SelectValue placeholder="Select a voting booth" />
            </SelectTrigger>
            <SelectContent>
              {votingBooths
                .sort((a, b) => (distances[a.id] || 999) - (distances[b.id] || 999))
                .map((booth) => (
                  <SelectItem key={booth.id} value={booth.id}>
                    {booth.name} ({distances[booth.id]} km away)
                  </SelectItem>
                ))}
            </SelectContent>
          </Select>
        </div>

        {selectedBooth && (
          <>
            <div className="flex items-start space-x-3 p-4 rounded-lg border bg-card">
              <MapPin className="h-5 w-5 text-primary mt-0.5" />
              <div className="flex-1">
                <h3 className="font-semibold">{selectedBooth.name}</h3>
                <p className="text-sm text-muted-foreground mb-2">{selectedBooth.address}</p>
                <div className="flex items-center text-sm text-muted-foreground">
                  <span>Distance: {distances[selectedBooth.id]} km</span>
                </div>
              </div>
              <Button variant="outline" size="sm" className="shrink-0" onClick={handleGetDirections}>
                <Navigation className="mr-2 h-4 w-4" />
                Directions
              </Button>
            </div>

            {waitingTime !== null && (
              <div className="flex items-center space-x-3 rounded-lg border p-4 bg-card">
                <Clock className="h-5 w-5 text-primary" />
                <div>
                  <p className="text-sm font-medium">Estimated waiting time</p>
                  <p className="text-2xl font-bold">{waitingTime} minutes</p>
                </div>
              </div>
            )}
          </>
        )}
      </CardContent>
    </Card>
  )
}

