export interface VerificationResult {
  isValid: boolean
  message: string
  data?: Record<string, any>
}

export interface VerificationRecord {
  userId: string
  idNumber: string
  idType: string
  verificationTime: string
  isVerified: boolean
  verificationMethod: string
}

