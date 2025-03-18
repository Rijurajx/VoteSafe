export class InPersonVotingService {
  // Simulate fetching waiting time from an API
  async getWaitingTime(boothId: string): Promise<number> {
    // In a real app, this would make an API call
    await new Promise((resolve) => setTimeout(resolve, 500)) // Simulate API delay
    return Math.floor(Math.random() * 60) // Random waiting time between 0-59 minutes
  }
}

export const inPersonVotingService = new InPersonVotingService()

