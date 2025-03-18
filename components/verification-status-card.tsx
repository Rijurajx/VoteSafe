import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle, Clock } from "lucide-react"

interface VerificationStatusCardProps {
  isVerified: boolean
  idVerified: boolean
  faceVerified: boolean
}

export function VerificationStatusCard({ isVerified, idVerified, faceVerified }: VerificationStatusCardProps) {
  // Determine the message based on verification status
  const getMessage = () => {
    if (isVerified) {
      return "Your identity has been verified. You can now participate in voting."
    } else if (idVerified && faceVerified) {
      // This is a fallback in case isVerified is not set properly
      return "Both ID and face verification completed. You can now participate in voting."
    } else if (idVerified) {
      return "ID verified. Please complete face verification."
    } else {
      return "Please complete the verification steps to participate in voting."
    }
  }

  // If both ID and face are verified but isVerified is false, we should still show as verified
  // This is a safety check in case the isVerified flag wasn't updated properly
  const effectivelyVerified = isVerified || (idVerified && faceVerified)

  return (
    <Card className={`border-l-4 ${effectivelyVerified ? "border-l-success" : "border-l-warning"}`}>
      <CardContent className="flex items-center gap-4 p-4">
        <div className={`rounded-full p-2 ${effectivelyVerified ? "bg-success/10" : "bg-warning/10"}`}>
          {effectivelyVerified ? (
            <CheckCircle className="h-6 w-6 text-success" />
          ) : (
            <Clock className="h-6 w-6 text-warning" />
          )}
        </div>
        <div>
          <h3 className="font-medium">{effectivelyVerified ? "Verified" : "Verification Pending"}</h3>
          <p className="text-sm text-muted-foreground">{getMessage()}</p>
        </div>
      </CardContent>
    </Card>
  )
}

