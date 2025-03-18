"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/providers/auth-provider"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { ArrowLeft, Upload, CheckCircle, AlertTriangle } from "lucide-react"
import { aiService } from "@/services/ai-service"
import { blockchainService } from "@/services/blockchain-service"

export default function IDVerificationPage() {
  const router = useRouter()
  const { user, updateUser } = useAuth()
  const [file, setFile] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [isUploading, setIsUploading] = useState(false)
  const [isVerifying, setIsVerifying] = useState(false)
  const [isVerified, setIsVerified] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (selectedFile) {
      setFile(selectedFile)
      const url = URL.createObjectURL(selectedFile)
      setPreviewUrl(url)
      setError(null)
    }
  }

  const handleUpload = async () => {
    if (!file) {
      setError("Please select a file to upload")
      return
    }

    setIsUploading(true)
    setError(null)

    try {
      // Simulate upload delay
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // In a real app, this would upload the file to a server
      const uploadedUrl = "/placeholder.svg?height=300&width=500" // Mock URL

      if (user) {
        // Update user with ID image URL
        updateUser({ voterIdImageUrl: uploadedUrl })
      }

      setIsUploading(false)
    } catch (error) {
      setError("Failed to upload ID. Please try again.")
      setIsUploading(false)
    }
  }

  const handleVerify = async () => {
    if (!user?.voterIdImageUrl) {
      setError("Please upload your ID first")
      return
    }

    setIsVerifying(true)
    setError(null)

    try {
      // Verify ID using AI service
      const verificationResult = await aiService.verifyVoterId(user.voterIdImageUrl)

      if (verificationResult.isValid) {
        // Record verification on blockchain
        try {
          // Use recordVerification instead of storeVerification
          await blockchainService.recordVerification(user.id, true)

          // Update user verification status - but don't set isVerified to true yet
          // We'll set isVerified to true only after face verification
          setIsVerified(true)
        } catch (error) {
          console.error("Blockchain verification error:", error)
          setError("Failed to record verification on blockchain. Please try again.")
        }
      } else {
        setError(`ID verification failed: ${verificationResult.message}`)
      }
    } catch (error) {
      console.error("Verification error:", error)
      setError("Failed to verify ID. Please try again.")
    } finally {
      setIsVerifying(false)
    }
  }

  return (
    <div className="container mx-auto max-w-3xl py-8">
      <Button variant="ghost" className="mb-4" onClick={() => router.push("/dashboard")}>
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Dashboard
      </Button>

      <Card>
        <CardHeader>
          <CardTitle>Government ID Verification</CardTitle>
          <CardDescription>
            Upload your government-issued ID for verification. This is required to participate in voting.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {error && (
            <Alert variant="destructive">
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {isVerified ? (
            <div className="flex flex-col items-center justify-center py-6 text-center">
              <CheckCircle className="mb-4 h-16 w-16 text-success" />
              <h2 className="mb-2 text-2xl font-bold">ID Verification Successful!</h2>
              <p className="text-muted-foreground">
                Your ID has been verified and securely recorded. Please proceed to face verification.
              </p>
              <Button className="mt-6" onClick={() => router.push("/verification/face")}>
                Continue to Face Verification
              </Button>
            </div>
          ) : (
            <>
              <div className="flex flex-col items-center justify-center rounded-lg border border-dashed p-6">
                {previewUrl ? (
                  <div className="mb-4">
                    <img
                      src={previewUrl || "/placeholder.svg"}
                      alt="ID Preview"
                      className="max-h-64 rounded-lg object-contain"
                    />
                  </div>
                ) : (
                  <div className="mb-4 flex h-32 w-full items-center justify-center rounded-lg bg-muted">
                    <Upload className="h-8 w-8 text-muted-foreground" />
                  </div>
                )}

                <div className="flex flex-col items-center">
                  <p className="mb-2 text-sm text-muted-foreground">
                    {previewUrl ? "Click below to choose a different file" : "Click below to select your ID"}
                  </p>
                  <label htmlFor="id-upload">
                    <div className="cursor-pointer rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90">
                      {previewUrl ? "Change File" : "Select File"}
                    </div>
                    <input
                      id="id-upload"
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleFileChange}
                      disabled={isUploading}
                    />
                  </label>
                </div>
              </div>

              <div className="flex flex-col space-y-2">
                <Button onClick={handleUpload} disabled={!file || isUploading || !!user?.voterIdImageUrl}>
                  {isUploading ? (
                    <>
                      <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-background border-t-transparent"></div>
                      Uploading...
                    </>
                  ) : user?.voterIdImageUrl ? (
                    "ID Uploaded"
                  ) : (
                    "Upload ID"
                  )}
                </Button>

                <Button
                  onClick={handleVerify}
                  disabled={!user?.voterIdImageUrl || isVerifying}
                  variant={user?.voterIdImageUrl ? "default" : "outline"}
                >
                  {isVerifying ? (
                    <>
                      <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-background border-t-transparent"></div>
                      Verifying...
                    </>
                  ) : (
                    "Verify ID"
                  )}
                </Button>
              </div>
            </>
          )}
        </CardContent>
        <CardFooter className="flex-col space-y-2 text-center text-sm text-muted-foreground">
          <p>Your ID will be securely processed and verified using AI.</p>
          <p>Verification results will be stored on the blockchain for security and transparency.</p>
        </CardFooter>
      </Card>
    </div>
  )
}

