"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import {
  ShieldCheck,
  VoteIcon,
  Lock,
  Fingerprint,
  BarChart3,
  Globe,
  ChevronRight,
  CheckCircle2,
  ArrowRight,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function LandingPage() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("verification")

  return (
    <div className="flex min-h-screen flex-col">
      {/* Navigation */}
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <VoteIcon className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">VoteSafe</span>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" onClick={() => router.push("/login")}>
              Login
            </Button>
            <Button onClick={() => router.push("/register")}>Get Started</Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-background to-muted/30 py-24 md:py-32">
        <div className="container relative z-10 flex flex-col items-center text-center">
          <div className="inline-flex items-center rounded-full border bg-background px-3 py-1 text-sm text-muted-foreground mb-6">
            <ShieldCheck className="mr-1 h-3.5 w-3.5 text-primary" />
            <span>Secure, Transparent, Accessible</span>
          </div>
          <h1 className="max-w-3xl text-4xl font-bold tracking-tight md:text-6xl lg:text-7xl">
            Decentralized Verification for{" "}
            <span className="bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
              Secure Voting
            </span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-muted-foreground md:text-xl">
            VoteSafe combines AI-powered verification with blockchain technology to ensure secure, transparent, and
            accessible voting for everyone.
          </p>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <Button size="lg" onClick={() => router.push("/register")}>
              Get Started
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button size="lg" variant="outline" onClick={() => router.push("/login")}>
              Login to Vote
            </Button>
          </div>
        </div>

        {/* Background elements */}
        <div className="absolute -top-40 right-0 h-[500px] w-[500px] rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute -bottom-40 left-0 h-[500px] w-[500px] rounded-full bg-blue-500/10 blur-3xl" />
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container">
          <div className="mx-auto mb-16 max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">Why Choose VoteSafe?</h2>
            <p className="mt-4 text-muted-foreground">
              Our platform combines cutting-edge technology with user-friendly design to make voting secure and
              accessible.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {/* Feature 1 */}
            <Card className="border-none shadow-md">
              <CardContent className="flex flex-col items-center p-6 text-center">
                <div className="mb-4 rounded-full bg-primary/10 p-3">
                  <Fingerprint className="h-6 w-6 text-primary" />
                </div>
                <h3 className="mb-2 text-xl font-medium">Biometric Verification</h3>
                <p className="text-muted-foreground">
                  Multi-factor verification using government ID and facial recognition ensures only eligible voters
                  participate.
                </p>
              </CardContent>
            </Card>

            {/* Feature 2 */}
            <Card className="border-none shadow-md">
              <CardContent className="flex flex-col items-center p-6 text-center">
                <div className="mb-4 rounded-full bg-primary/10 p-3">
                  <Lock className="h-6 w-6 text-primary" />
                </div>
                <h3 className="mb-2 text-xl font-medium">Blockchain Security</h3>
                <p className="text-muted-foreground">
                  All votes are securely recorded on a blockchain, making them immutable, transparent, and tamper-proof.
                </p>
              </CardContent>
            </Card>

            {/* Feature 3 */}
            <Card className="border-none shadow-md">
              <CardContent className="flex flex-col items-center p-6 text-center">
                <div className="mb-4 rounded-full bg-primary/10 p-3">
                  <Globe className="h-6 w-6 text-primary" />
                </div>
                <h3 className="mb-2 text-xl font-medium">Accessible Voting</h3>
                <p className="text-muted-foreground">
                  Vote online or find the nearest polling station with real-time waiting times and directions.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="bg-muted/30 py-20">
        <div className="container">
          <div className="mx-auto mb-16 max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">How VoteSafe Works</h2>
            <p className="mt-4 text-muted-foreground">
              Our simple three-step process ensures secure and accessible voting for all eligible citizens.
            </p>
          </div>

          <Tabs defaultValue="verification" className="mx-auto max-w-4xl" onValueChange={setActiveTab}>
            <div className="mb-8 flex justify-center">
              <TabsList className="grid w-full max-w-md grid-cols-3">
                <TabsTrigger value="verification">Verification</TabsTrigger>
                <TabsTrigger value="voting">Voting</TabsTrigger>
                <TabsTrigger value="results">Results</TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="verification" className="rounded-lg border bg-card p-6 shadow-sm">
              <div className="grid gap-8 md:grid-cols-2">
                <div>
                  <h3 className="mb-4 text-2xl font-medium">Secure Identity Verification</h3>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="mt-1 rounded-full bg-primary/10 p-1">
                        <CheckCircle2 className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-medium">Government ID Verification</h4>
                        <p className="text-sm text-muted-foreground">
                          Upload your government-issued ID for secure verification
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="mt-1 rounded-full bg-primary/10 p-1">
                        <CheckCircle2 className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-medium">Facial Recognition</h4>
                        <p className="text-sm text-muted-foreground">
                          Complete a quick facial scan to confirm your identity
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="mt-1 rounded-full bg-primary/10 p-1">
                        <CheckCircle2 className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-medium">Blockchain Verification</h4>
                        <p className="text-sm text-muted-foreground">
                          Your verification is securely recorded on the blockchain
                        </p>
                      </div>
                    </div>
                  </div>
                  <Button className="mt-6" onClick={() => router.push("/register")}>
                    Start Verification
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
                <div className="flex items-center justify-center">
                  <div className="overflow-hidden rounded-lg border">
                    <img
                      src="/placeholder.svg?height=300&width=400"
                      alt="Verification Process"
                      className="h-full w-full object-cover"
                    />
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="voting" className="rounded-lg border bg-card p-6 shadow-sm">
              <div className="grid gap-8 md:grid-cols-2">
                <div>
                  <h3 className="mb-4 text-2xl font-medium">Flexible Voting Options</h3>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="mt-1 rounded-full bg-primary/10 p-1">
                        <CheckCircle2 className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-medium">Online Voting</h4>
                        <p className="text-sm text-muted-foreground">
                          Vote securely from anywhere using your mobile device or computer
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="mt-1 rounded-full bg-primary/10 p-1">
                        <CheckCircle2 className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-medium">In-Person Voting</h4>
                        <p className="text-sm text-muted-foreground">
                          Find the nearest polling station with real-time waiting times
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="mt-1 rounded-full bg-primary/10 p-1">
                        <CheckCircle2 className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-medium">Secure Ballot Casting</h4>
                        <p className="text-sm text-muted-foreground">
                          Your vote is encrypted and anonymously recorded on the blockchain
                        </p>
                      </div>
                    </div>
                  </div>
                  <Button className="mt-6" onClick={() => router.push("/login")}>
                    Access Elections
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
                <div className="flex items-center justify-center">
                  <div className="overflow-hidden rounded-lg border">
                    <img
                      src="/placeholder.svg?height=300&width=400"
                      alt="Voting Process"
                      className="h-full w-full object-cover"
                    />
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="results" className="rounded-lg border bg-card p-6 shadow-sm">
              <div className="grid gap-8 md:grid-cols-2">
                <div>
                  <h3 className="mb-4 text-2xl font-medium">Transparent Results</h3>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="mt-1 rounded-full bg-primary/10 p-1">
                        <CheckCircle2 className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-medium">Real-Time Results</h4>
                        <p className="text-sm text-muted-foreground">
                          View election results as they come in with live updates
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="mt-1 rounded-full bg-primary/10 p-1">
                        <CheckCircle2 className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-medium">Blockchain Verification</h4>
                        <p className="text-sm text-muted-foreground">
                          All results are verifiable on the blockchain for complete transparency
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="mt-1 rounded-full bg-primary/10 p-1">
                        <CheckCircle2 className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-medium">Data Visualization</h4>
                        <p className="text-sm text-muted-foreground">
                          Interactive charts and graphs make results easy to understand
                        </p>
                      </div>
                    </div>
                  </div>
                  <Button className="mt-6" onClick={() => router.push("/login")}>
                    View Results
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
                <div className="flex items-center justify-center">
                  <div className="overflow-hidden rounded-lg border">
                    <img
                      src="/placeholder.svg?height=300&width=400"
                      alt="Results Dashboard"
                      className="h-full w-full object-cover"
                    />
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>

          {/* Step indicators */}
          <div className="mx-auto mt-12 max-w-3xl">
            <div className="flex justify-between">
              <div className="flex flex-1 items-center">
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-full ${activeTab === "verification" ? "bg-primary text-primary-foreground" : "border border-muted-foreground/30 bg-background"}`}
                >
                  1
                </div>
                <div
                  className={`h-1 flex-1 ${activeTab === "verification" || activeTab === "voting" || activeTab === "results" ? "bg-primary" : "bg-muted-foreground/30"}`}
                ></div>
              </div>
              <div className="flex flex-1 items-center">
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-full ${activeTab === "voting" || activeTab === "results" ? "bg-primary text-primary-foreground" : "border border-muted-foreground/30 bg-background"}`}
                >
                  2
                </div>
                <div
                  className={`h-1 flex-1 ${activeTab === "voting" || activeTab === "results" ? "bg-primary" : "bg-muted-foreground/30"}`}
                ></div>
              </div>
              <div className="flex items-center">
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-full ${activeTab === "results" ? "bg-primary text-primary-foreground" : "border border-muted-foreground/30 bg-background"}`}
                >
                  3
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-20">
        <div className="container">
          <div className="mx-auto mb-16 max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">Trusted and Secure</h2>
            <p className="mt-4 text-muted-foreground">
              VoteSafe combines multiple security layers to ensure the integrity of every election.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            <div className="flex flex-col justify-center">
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="rounded-full bg-primary/10 p-2">
                    <ShieldCheck className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium">Advanced Encryption</h3>
                    <p className="text-muted-foreground">
                      End-to-end encryption protects your personal data and voting choices.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="rounded-full bg-primary/10 p-2">
                    <Fingerprint className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium">AI-Powered Verification</h3>
                    <p className="text-muted-foreground">
                      Advanced AI algorithms ensure accurate identity verification.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="rounded-full bg-primary/10 p-2">
                    <BarChart3 className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium">Transparent Auditing</h3>
                    <p className="text-muted-foreground">
                      Public blockchain records allow for independent verification of results.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <div className="overflow-hidden rounded-lg">
                <img
                  src="/placeholder.svg?height=400&width=500"
                  alt="Security Visualization"
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* Footer */}
      <footer className="border-t bg-muted/30">
        <div className="container py-12">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            <div>
              <div className="flex items-center gap-2">
                <VoteIcon className="h-6 w-6 text-primary" />
                <span className="text-xl font-bold">VoteSafe</span>
              </div>
              <p className="mt-4 text-sm text-muted-foreground">
                Secure, transparent, and accessible voting for everyone through decentralized verification.
              </p>
            </div>
            <div>
              <h3 className="mb-4 text-sm font-semibold">Product</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a href="#" className="hover:text-foreground">
                    Features
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground">
                    Security
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground">
                    Blockchain
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground">
                    Verification
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="mb-4 text-sm font-semibold">Resources</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a href="#" className="hover:text-foreground">
                    Documentation
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground">
                    Help Center
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground">
                    Terms of Service
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="mb-4 text-sm font-semibold">Contact</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a href="#" className="hover:text-foreground">
                    support@votesafe.com
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground">
                    +1 (555) 123-4567
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground">
                    123 Democracy Ave, Secure City
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-12 border-t pt-6">
            <p className="text-center text-sm text-muted-foreground">
              © {new Date().getFullYear()} VoteSafe. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}

