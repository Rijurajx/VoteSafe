import type { Election } from "@/types/election"
import { blockchainService } from "./blockchain-service"

class ElectionService {
  private mockElections: Election[] = [
    {
      id: "1",
      title: "Presidential Election 2024",
      description: "National presidential election for the term 2024-2028",
      startDate: this.getDateString(-1), // Started yesterday
      endDate: this.getDateString(7), // Ends in 7 days
      candidates: [
        {
          id: 1,
          name: "Jane Smith",
          party: "Progressive Party",
          imageUrl: "/placeholder.svg?height=100&width=100",
          manifesto: "Building a better future for all citizens with focus on healthcare and education.",
        },
        {
          id: 2,
          name: "John Doe",
          party: "Conservative Party",
          imageUrl: "/placeholder.svg?height=100&width=100",
          manifesto: "Strengthening the economy and creating jobs through business-friendly policies.",
        },
        {
          id: 3,
          name: "Alex Johnson",
          party: "Independent",
          imageUrl: "/placeholder.svg?height=100&width=100",
          manifesto: "A fresh approach to politics with focus on environmental sustainability.",
        },
      ],
      isActive: true,
      isOnlineVotingAvailable: true,
    },
    {
      id: "2",
      title: "Local City Council Election",
      description: "Election for city council members for the next 4-year term",
      startDate: this.getDateString(-2), // Started 2 days ago
      endDate: this.getDateString(5), // Ends in 5 days
      candidates: [
        {
          id: 1,
          name: "Sarah Williams",
          party: "Community First",
          imageUrl: "/placeholder.svg?height=100&width=100",
          manifesto: "Improving local infrastructure and community services.",
        },
        {
          id: 2,
          name: "Michael Brown",
          party: "City Development",
          imageUrl: "/placeholder.svg?height=100&width=100",
          manifesto: "Economic development and job creation for our city.",
        },
      ],
      isActive: true,
      isOnlineVotingAvailable: false,
      votingBooths: [
        {
          id: "booth1",
          name: "City Hall",
          address: "123 Main Street, Downtown",
          latitude: 40.7128,
          longitude: -74.006,
        },
        {
          id: "booth2",
          name: "Central Library",
          address: "456 Park Avenue, Midtown",
          latitude: 40.758,
          longitude: -73.9855,
        },
        {
          id: "booth3",
          name: "Community Center",
          address: "789 Broadway, Uptown",
          latitude: 40.8075,
          longitude: -73.9626,
        },
      ],
    },
    {
      id: "3",
      title: "School Board Election",
      description: "Election for school board representatives",
      startDate: this.getDateString(0), // Started today
      endDate: this.getDateString(3), // Ends in 3 days
      candidates: [
        {
          id: 1,
          name: "David Wilson",
          party: "Education First",
          imageUrl: "/placeholder.svg?height=100&width=100",
          manifesto: "Improving educational standards and teacher support.",
        },
        {
          id: 2,
          name: "Lisa Garcia",
          party: "Future Leaders",
          imageUrl: "/placeholder.svg?height=100&width=100",
          manifesto: "Modernizing curriculum and school facilities.",
        },
        {
          id: 3,
          name: "Robert Taylor",
          party: "Community Schools",
          imageUrl: "/placeholder.svg?height=100&width=100",
          manifesto: "Strengthening the connection between schools and communities.",
        },
      ],
      isActive: true,
      isOnlineVotingAvailable: false,
      votingBooths: [
        {
          id: "booth4",
          name: "Central High School",
          address: "100 Education Blvd, East Side",
          latitude: 40.729,
          longitude: -73.994,
        },
        {
          id: "booth5",
          name: "West Elementary School",
          address: "200 Learning Lane, West Side",
          latitude: 40.748,
          longitude: -74.009,
        },
      ],
    },
  ]

  // Helper method to get date strings relative to today
  private getDateString(daysFromNow: number): string {
    const date = new Date()
    date.setDate(date.getDate() + daysFromNow)
    return date.toISOString()
  }

  async getActiveElections(): Promise<Election[]> {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Force all elections to be active for demo purposes
    return this.mockElections
  }

  async getElectionById(id: string): Promise<Election> {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 800))
    const election = this.mockElections.find((e) => e.id === id)
    if (!election) {
      throw new Error("Election not found")
    }
    return election
  }

  async getElectionResults(electionId: string): Promise<Record<number, number>> {
    // Simulate API call to get results from blockchain
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // Mock results
    const election = this.mockElections.find((e) => e.id === electionId)
    if (!election) {
      throw new Error("Election not found")
    }

    const results: Record<number, number> = {}
    election.candidates.forEach((candidate) => {
      results[candidate.id] = Math.floor(Math.random() * 1000)
    })

    return results
  }

  async castVote(userId: string, electionId: string, candidateId: number): Promise<boolean> {
    try {
      // Check if user has already voted
      const hasVoted = await blockchainService.hasUserVoted(userId, electionId)
      if (hasVoted) {
        throw new Error("User has already voted in this election")
      }

      // Record vote on blockchain
      const transactionHash = await blockchainService.recordVote(userId, electionId, candidateId)
      console.log(`Vote recorded with transaction hash: ${transactionHash}`)

      return true
    } catch (error) {
      console.error("Error casting vote:", error)
      return false
    }
  }

  isElectionOngoing(election: Election): boolean {
    // For demo purposes, always return true
    return true
  }

  hasElectionStarted(election: Election): boolean {
    // For demo purposes, always return true
    return true
  }

  hasElectionEnded(election: Election): boolean {
    // For demo purposes, always return false
    return false
  }
}

export const electionService = new ElectionService()

