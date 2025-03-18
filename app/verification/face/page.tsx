"use client"

import { useState, useRef, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/providers/auth-provider"
import { blockchainService } from "@/services/blockchain-service"
import { aiService } from "@/services/ai-service"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { ArrowLeft, Camera, CheckCircle, AlertTriangle } from "lucide-react"

export default function FaceVerificationPage() {
  const router = useRouter()
  const { user, updateUser } = useAuth()
  const [isCapturing, setIsCapturing] = useState(false)
  const [capturedImage, setCapturedImage] = useState<string | null>(null)
  const [isVerifying, setIsVerifying] = useState(false)
  const [isVerified, setIsVerified] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [cameraStatus, setCameraStatus] = useState<string>("Click 'Start Camera' to begin")
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const streamRef = useRef<MediaStream | null>(null)
  const [videoElementReady, setVideoElementReady] = useState(false)

  // Check if ID verification is completed
  useEffect(() => {
    if (user && !user.voterIdImageUrl) {
      // Redirect to ID verification if not completed
      router.push("/verification/id")
    }
  }, [user, router])

  // Ensure video element is ready
  useEffect(() => {
    if (videoRef.current) {
      setVideoElementReady(true)
    }
  }, [])

  // Cleanup function for camera stream
  useEffect(() => {
    return () => {
      stopCamera()
    }
  }, [])

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => {
        track.stop()
      })
      streamRef.current = null
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null
    }
    setIsCapturing(false)
  }

  const startCamera = async () => {
    setError(null)
    setCameraStatus("Initializing camera...")
    stopCamera() // Stop any existing stream

    // Ensure video element exists before proceeding
    if (!videoRef.current) {
      console.error("Video element not found")
      setError("Video element not found. Please refresh the page and try again.")
      setCameraStatus("Camera error - see details above")
      return
    }

    try {
      console.log("Requesting camera access...")

      // First, check if getUserMedia is supported
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        throw new Error("Camera access is not supported in this browser")
      }

      // Try to get the camera stream
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: false,
      })

      console.log("Camera access granted, setting up video element...")

      // Store the stream in the ref
      streamRef.current = stream

      // Double check video element exists
      if (!videoRef.current) {
        throw new Error("Video element not found after stream initialization")
      }

      // Set the stream as the source for the video element
      videoRef.current.srcObject = stream

      // Set up event listeners for when the video is ready
      videoRef.current.onloadedmetadata = () => {
        console.log("Video metadata loaded")
        if (videoRef.current) {
          videoRef.current
            .play()
            .then(() => {
              console.log("Video started playing")
              setIsCapturing(true)
              setCameraStatus("Camera active - position your face in the frame")
            })
            .catch((err) => {
              console.error("Error playing video:", err)
              setCameraStatus("Error starting video playback")
            })
        }
      }
    } catch (err) {
      console.error("Camera error:", err)
      let errorMessage = "Could not access camera. "

      if (err instanceof Error) {
        if (err.name === "NotAllowedError" || err.name === "PermissionDeniedError") {
          errorMessage += "Please grant camera permissions and try again."
        } else if (err.name === "NotFoundError" || err.name === "DevicesNotFoundError") {
          errorMessage += "No camera device found."
        } else if (err.name === "NotReadableError" || err.name === "TrackStartError") {
          errorMessage += "Camera is already in use by another application."
        } else {
          errorMessage += err.message
        }
      }

      setError(errorMessage)
      setCameraStatus("Camera error - see details above")
      setIsCapturing(false)
      stopCamera()
    }
  }

  const captureImage = () => {
    if (!videoRef.current || !canvasRef.current || !streamRef.current) {
      setError("Camera is not properly initialized")
      return
    }

    try {
      const video = videoRef.current
      const canvas = canvasRef.current
      const context = canvas.getContext("2d")

      if (!context) {
        throw new Error("Could not get canvas context")
      }

      // Set canvas size to match video dimensions
      canvas.width = video.videoWidth
      canvas.height = video.videoHeight

      // Draw the current video frame
      context.drawImage(video, 0, 0, canvas.width, canvas.height)

      // Get the image data
      const imageDataUrl = canvas.toDataURL("image/png")
      setCapturedImage(imageDataUrl)
      setCameraStatus("Image captured successfully")

      // Stop the camera
      stopCamera()
    } catch (err) {
      console.error("Error capturing image:", err)
      setError("Failed to capture image. Please try again.")
    }
  }

  const retakePhoto = () => {
    setCapturedImage(null)
    startCamera()
  }

  const handleVerify = async () => {
    if (!capturedImage) {
      setError("Please capture your photo first")
      return
    }

    if (!user?.voterIdImageUrl) {
      setError("Please complete ID verification first")
      return
    }

    setIsVerifying(true)
    setError(null)

    try {
      // In a real app, we would upload the captured image to a server
      const uploadedUrl = capturedImage // Use the actual captured image

      // Update user with face image URL
      updateUser({ faceImageUrl: uploadedUrl })

      // Verify face using AI service
      const verificationResult = await aiService.verifyFace(uploadedUrl, user.voterIdImageUrl)

      if (verificationResult.isValid) {
        // Record verification on blockchain
        await blockchainService.recordVerification(user.id, true)

        // Update user verification status - THIS IS THE KEY CHANGE
        // We need to set isVerified to true after face verification is complete
        updateUser({
          faceImageUrl: uploadedUrl,
          isVerified: true, // Set isVerified to true
        })

        setIsVerified(true)
      } else {
        setError(`Face verification failed: ${verificationResult.message}`)
      }
    } catch (error) {
      console.error("Verification error:", error)
      setError("Failed to verify face. Please try again.")
    } finally {
      setIsVerifying(false)
    }
  }

  // For demo purposes only
  const handleBypassVerification = async () => {
    setIsVerifying(true)
    setError(null)

    try {
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Make sure to update both faceImageUrl AND isVerified
      updateUser({
        faceImageUrl: "/placeholder.svg?height=300&width=300",
        isVerified: true, // This is the key change
      })

      setIsVerified(true)
    } catch (error) {
      setError("Failed to verify. Please try again.")
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
          <CardTitle>Face Verification</CardTitle>
          <CardDescription>
            Complete your identity verification by taking a photo of your face using your camera.
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
              <h2 className="mb-2 text-2xl font-bold">Verification Successful!</h2>
              <p className="text-muted-foreground">Your identity has been verified and securely recorded.</p>
              <Button className="mt-6" onClick={() => router.push("/dashboard")}>
                Return to Dashboard
              </Button>
            </div>
          ) : (
            <>
              <div className="overflow-hidden rounded-lg border bg-background">
                <div className="relative aspect-video w-full">
                  {/* Always render the video element but hide it when not capturing */}
                  <video
                    ref={videoRef}
                    autoPlay
                    playsInline
                    muted
                    className="h-full w-full object-cover"
                    style={{ display: isCapturing ? "block" : "none" }}
                  />

                  {!isCapturing && capturedImage && (
                    <img
                      src={capturedImage || "/placeholder.svg"}
                      alt="Captured face"
                      className="h-full w-full object-cover"
                    />
                  )}

                  {!isCapturing && !capturedImage && (
                    <div className="flex h-full w-full flex-col items-center justify-center bg-muted">
                      <Camera className="mb-4 h-12 w-12 text-muted-foreground" />
                      <p className="text-sm text-muted-foreground">{cameraStatus}</p>
                    </div>
                  )}
                </div>

                <div className="flex justify-center border-t bg-muted/50 p-4">
                  {isCapturing ? (
                    <Button onClick={captureImage}>
                      <Camera className="mr-2 h-4 w-4" />
                      Take Photo
                    </Button>
                  ) : capturedImage ? (
                    <Button variant="outline" onClick={retakePhoto}>
                      Retake Photo
                    </Button>
                  ) : (
                    <Button onClick={startCamera}>
                      <Camera className="mr-2 h-4 w-4" />
                      Start Camera
                    </Button>
                  )}
                </div>
              </div>

              {/* Always render the canvas element but keep it hidden */}
              <canvas ref={canvasRef} className="hidden" />

              <div className="flex flex-col space-y-2">
                {capturedImage && (
                  <Button onClick={handleVerify} disabled={isVerifying} className="w-full">
                    {isVerifying ? (
                      <>
                        <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-background border-t-transparent"></div>
                        Verifying...
                      </>
                    ) : (
                      "Verify Identity"
                    )}
                  </Button>
                )}

                <div className="relative my-4">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-background px-2 text-muted-foreground">Or use demo mode</span>
                  </div>
                </div>

                <Button
                  variant="secondary"
                  onClick={handleBypassVerification}
                  disabled={isVerifying}
                  className="w-full"
                >
                  Demo: Complete Verification
                </Button>
              </div>
            </>
          )}
        </CardContent>
        <CardFooter className="flex-col space-y-2 text-center text-sm text-muted-foreground">
          <p>Your face will be securely processed and compared with your ID using AI.</p>
          <p>Verification results will be stored on the blockchain for security and transparency.</p>
        </CardFooter>
      </Card>
    </div>
  )
}

