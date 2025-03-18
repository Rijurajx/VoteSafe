export interface Candidate {
  id: number
  name: string
  party: string
  imageUrl?: string
  manifesto?: string
}

export interface VotingBooth {
  id: string
  name: string
  address: string
  latitude: number
  longitude: number
}

export interface Election {
  id: string
  title: string
  description: string
  startDate: string
  endDate: string
  candidates: Candidate[]
  isActive: boolean
  isOnlineVotingAvailable: boolean
  votingBooths?: VotingBooth[]
}

