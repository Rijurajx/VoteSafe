"use client"

import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import { motion, useScroll, useInView, AnimatePresence, useTransform } from "framer-motion"
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
  Sparkles,
  Zap,
  Users,
  Menu,
  X,
  MousePointer,
  Phone,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"




// Animation variants
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 },
  },
}

const fadeInLeft = {
  hidden: { opacity: 0, x: -50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, type: "spring", stiffness: 100, damping: 15 },
  },
}



const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
}

const scaleUp = {
  hidden: { scale: 0.8, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: { type: "spring", stiffness: 100, damping: 15 },
  },
}



export default function LandingPage() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("verification")
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrollY, setScrollY] = useState(0)
  const [hasScrolled, setHasScrolled] = useState(false)

  // Refs for scroll animations
  const heroRef = useRef(null)
  const featuresRef = useRef(null)
  const howItWorksRef = useRef(null)
  const trustRef = useRef(null)
  const testimonialsRef = useRef(null)
  const statsRef = useRef(null)

  // Check if sections are in view
  const heroInView = useInView(heroRef, { once: false, amount: 0.3 })
  const featuresInView = useInView(featuresRef, { once: true, amount: 0.2 })
  const howItWorksInView = useInView(howItWorksRef, { once: true, amount: 0.2 })
  const trustInView = useInView(trustRef, { once: true, amount: 0.2 })
  const testimonialsInView = useInView(testimonialsRef, { once: true, amount: 0.2 })
  const statsInView = useInView(statsRef, { once: true, amount: 0.3 })

  // Scroll progress for parallax effects
  const { scrollYProgress } = useScroll()
  const heroY = useTransform(scrollYProgress, [0, 0.2], [0, -50])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0.5])

  // Handle scroll for navbar transparency
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
      if (window.scrollY > 100) {
        setHasScrolled(true)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Detect device type for animations
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])



  return (
    <div className="flex min-h-screen flex-col">
      {/* Navigation */}
      <header
        className={`sticky top-0 z-40 transition-all duration-300 ${scrollY > 50 ? "bg-background/95 backdrop-blur-md shadow-sm" : "bg-transparent"
          }`}
      >
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <motion.div
              initial={{ rotate: -10, scale: 0.9 }}
              animate={{ rotate: 0, scale: 1 }}
              transition={{ duration: 0.5, type: "spring" }}
              className="relative"
            >
              <VoteIcon className="h-6 w-6 text-primary" />
              <motion.div
                className="absolute -inset-1 rounded-full bg-primary/20"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: [1, 1.5, 1], opacity: [0.7, 0, 0] }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, repeatDelay: 3 }}
              />
            </motion.div>
            <motion.span
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-600"
            >
              VoteSafe
            </motion.span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            <motion.nav
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex items-center gap-6"
            >
              <a
                href="#features"
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors relative group"
              >
                Features
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300"></span>
              </a>
              <a
                href="#how-it-works"
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors relative group"
              >
                How It Works
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300"></span>
              </a>
              <a
                href="#testimonials"
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors relative group"
              >
                Testimonials
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300"></span>
              </a>
            </motion.nav>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex items-center gap-4"
            >
              <Button variant="ghost" onClick={() => router.push("/login")} className="relative overflow-hidden group">
                <span className="relative z-10">Login</span>
                <span className="absolute inset-0 bg-primary/10 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></span>
              </Button>
              <Button
                onClick={() => router.push("/register")}
                className="relative overflow-hidden group bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-600/90 transition-all duration-300"
              >
                <span className="relative z-10">Get Started</span>
                <span className="absolute inset-0 bg-white/10 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></span>
              </Button>
            </motion.div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button variant="ghost" size="icon" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="relative">
              <AnimatePresence mode="wait">
                {mobileMenuOpen ? (
                  <motion.div
                    key="close"
                    initial={{ opacity: 0, rotate: -90 }}
                    animate={{ opacity: 1, rotate: 0 }}
                    exit={{ opacity: 0, rotate: 90 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X className="h-5 w-5" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ opacity: 0, rotate: 90 }}
                    animate={{ opacity: 1, rotate: 0 }}
                    exit={{ opacity: 0, rotate: -90 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu className="h-5 w-5" />
                  </motion.div>
                )}
              </AnimatePresence>
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden border-t bg-background/95 backdrop-blur-md"
            >
              <div className="container py-4 flex flex-col gap-4">
                <motion.a
                  href="#features"
                  className="py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.1 }}
                >
                  Features
                </motion.a>
                <motion.a
                  href="#how-it-works"
                  className="py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  How It Works
                </motion.a>
                <motion.a
                  href="#testimonials"
                  className="py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  Testimonials
                </motion.a>
                <motion.div
                  className="flex flex-col gap-2 pt-2 border-t"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  <Button variant="ghost" onClick={() => router.push("/login")} className="justify-start">
                    Login
                  </Button>
                  <Button
                    onClick={() => router.push("/register")}
                    className="bg-gradient-to-r from-primary to-blue-600"
                  >
                    Get Started
                  </Button>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Hero Section */}
      <section
        ref={heroRef}
        className="relative overflow-hidden bg-gradient-to-b from-background to-muted/30 py-24 md:py-32"
      >
        <motion.div
          style={{ y: heroY, opacity: heroOpacity }}
          className="container relative z-10 flex flex-col items-center text-center"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center rounded-full border bg-background/80 backdrop-blur-sm px-3 py-1 text-sm text-muted-foreground mb-6 shadow-sm"
          >
            <motion.div
              animate={{ rotate: [0, 15, 0] }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
            >
              <Sparkles className="mr-1 h-3.5 w-3.5 text-primary" />
            </motion.div>
            <span>Secure, Transparent, Accessible</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-3xl text-4xl font-bold tracking-tight md:text-6xl lg:text-7xl"
          >
            AI-Powered Verification for{" "}
            <span className="bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent relative">
              Secure Voting
              <motion.span
                className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-blue-600"
                initial={{ scaleX: 0, originX: 0 }}
                animate={heroInView ? { scaleX: 1 } : { scaleX: 0 }}
                transition={{ duration: 1, delay: 1 }}
              />
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-6 max-w-2xl text-lg text-muted-foreground md:text-xl"
          >
            VoteSafe combines advanced AI verification with cutting-edge security to ensure secure, transparent, and
            accessible voting for everyone.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-10 flex flex-col gap-4 sm:flex-row"
          >
            <Button
              size="lg"
              onClick={() => router.push("/register")}
              className="group relative overflow-hidden bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-600/90"
            >
              <span className="relative z-10 flex items-center">
                Get Started
                <motion.div
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY, repeatType: "loop" }}
                >
                  <ArrowRight className="ml-2 h-4 w-4" />
                </motion.div>
              </span>
              <span className="absolute inset-0 bg-white/10 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></span>
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => router.push("/login")}
              className="group relative overflow-hidden"
            >
              <span className="relative z-10">Login to Vote</span>
              <span className="absolute inset-0 bg-primary/10 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></span>
            </Button>
          </motion.div>

          {/* Device indicator */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="mt-16 flex items-center gap-6"
          >
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <MousePointer className="h-4 w-4" />
              <span className="hidden md:inline">Desktop Ready</span>
            </div>
            <div className="h-4 w-px bg-muted-foreground/30" />
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Phone className="h-4 w-4" />
              <span className="hidden md:inline">Mobile Optimized</span>
            </div>
          </motion.div>

          {/* Scroll indicator - only visible before scrolling */}
          {!hasScrolled && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 1 }}
              className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
            >
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
                className="flex flex-col items-center"
              >
                <span className="text-xs text-muted-foreground mb-2">Scroll to explore</span>
                <div className="w-6 h-10 border-2 border-muted-foreground/30 rounded-full flex justify-center">
                  <motion.div
                    animate={{ y: [0, 15, 0] }}
                    transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
                    className="w-1.5 h-1.5 bg-primary rounded-full mt-2"
                  />
                </div>
              </motion.div>
            </motion.div>
          )}
        </motion.div>

        {/* Background elements */}
        <div className="absolute -top-40 right-0 h-[500px] w-[500px] rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute -bottom-40 left-0 h-[500px] w-[500px] rounded-full bg-blue-500/10 blur-3xl" />

        {/* Floating elements */}
        <motion.div
          animate={{
            y: [0, -20, 0],
            rotate: [0, 5, 0],
          }}
          transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
          className="absolute top-1/4 right-[15%] w-16 h-16 bg-primary/20 rounded-lg backdrop-blur-md hidden lg:block"
        />
        <motion.div
          animate={{
            y: [0, 20, 0],
            rotate: [0, -5, 0],
          }}
          transition={{ duration: 10, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
          className="absolute bottom-1/4 left-[15%] w-12 h-12 bg-blue-500/20 rounded-full backdrop-blur-md hidden lg:block"
        />

        {/* Mobile floating elements */}
        <motion.div
          animate={{
            y: [0, -10, 0],
            rotate: [0, 3, 0],
          }}
          transition={{ duration: 6, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
          className="absolute top-1/3 right-[10%] w-8 h-8 bg-primary/20 rounded-lg backdrop-blur-md md:hidden"
        />
        <motion.div
          animate={{
            y: [0, 10, 0],
            rotate: [0, -3, 0],
          }}
          transition={{ duration: 7, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
          className="absolute bottom-1/3 left-[10%] w-6 h-6 bg-blue-500/20 rounded-full backdrop-blur-md md:hidden"
        />
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 overflow-hidden" ref={featuresRef}>
        <div className="container">
          <motion.div
            variants={fadeIn}
            initial="hidden"
            animate={featuresInView ? "visible" : "hidden"}
            className="mx-auto mb-16 max-w-2xl text-center"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={featuresInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
                Why Choose <span className="text-primary">VoteSafe</span>?
              </h2>
              <p className="mt-4 text-muted-foreground">
                Our platform combines cutting-edge technology with user-friendly design to make voting secure and
                accessible.
              </p>
            </motion.div>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate={featuresInView ? "visible" : "hidden"}
            className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
          >
            {/* Feature 1 */}
            <motion.div variants={scaleUp}>
              <Card className="group relative overflow-hidden border-none shadow-md transition-all hover:shadow-lg hover:-translate-y-1 duration-300">
                <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-blue-600/10 opacity-0 transition-opacity group-hover:opacity-100" />
                <CardContent className="flex flex-col items-center p-6 text-center">
                  <div className="mb-4 rounded-full bg-primary/10 p-3 relative overflow-hidden group-hover:bg-primary/20 transition-colors duration-300">
                    <motion.div whileHover={{ rotate: 360 }} transition={{ duration: 0.5 }}>
                      <Fingerprint className="h-6 w-6 text-primary" />
                    </motion.div>
                    <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full scale-0 group-hover:scale-100" />
                  </div>
                  <h3 className="mb-2 text-xl font-medium">Biometric Verification</h3>
                  <p className="text-muted-foreground">
                    Multi-factor verification using government ID and facial recognition ensures only eligible voters
                    participate.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            {/* Feature 2 */}
            <motion.div variants={scaleUp}>
              <Card className="group relative overflow-hidden border-none shadow-md transition-all hover:shadow-lg hover:-translate-y-1 duration-300">
                <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-blue-600/10 opacity-0 transition-opacity group-hover:opacity-100" />
                <CardContent className="flex flex-col items-center p-6 text-center">
                  <div className="mb-4 rounded-full bg-primary/10 p-3 relative overflow-hidden group-hover:bg-primary/20 transition-colors duration-300">
                    <motion.div whileHover={{ scale: 1.2 }} transition={{ duration: 0.3 }}>
                      <Lock className="h-6 w-6 text-primary" />
                    </motion.div>
                    <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full scale-0 group-hover:scale-100" />
                  </div>
                  <h3 className="mb-2 text-xl font-medium">Advanced Security</h3>
                  <p className="text-muted-foreground">
                    End-to-end encryption and AI-powered verification ensure your vote is secure and tamper-proof.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            {/* Feature 3 */}
            <motion.div variants={scaleUp}>
              <Card className="group relative overflow-hidden border-none shadow-md transition-all hover:shadow-lg hover:-translate-y-1 duration-300">
                <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-blue-600/10 opacity-0 transition-opacity group-hover:opacity-100" />
                <CardContent className="flex flex-col items-center p-6 text-center">
                  <div className="mb-4 rounded-full bg-primary/10 p-3 relative overflow-hidden group-hover:bg-primary/20 transition-colors duration-300">
                    <motion.div
                      animate={{ rotate: [0, 360] }}
                      transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                    >
                      <Globe className="h-6 w-6 text-primary" />
                    </motion.div>
                    <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full scale-0 group-hover:scale-100" />
                  </div>
                  <h3 className="mb-2 text-xl font-medium">Accessible Voting</h3>
                  <p className="text-muted-foreground">
                    Vote online or find the nearest polling station with real-time waiting times and directions.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>

          {/* Mobile-optimized feature callout */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={featuresInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-16 p-6 rounded-xl bg-gradient-to-r from-primary/5 to-blue-600/5 border border-primary/10 shadow-sm"
          >
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="flex-shrink-0">
                <div className="rounded-full bg-primary/10 p-4">
                  <Phone className="h-6 w-6 text-primary" />
                </div>
              </div>
              <div className="flex-1 text-center md:text-left">
                <h3 className="text-xl font-medium mb-2">Mobile-First Experience</h3>
                <p className="text-muted-foreground">
                  Vote securely from anywhere using our mobile-optimized platform, designed for all screen sizes and
                  devices.
                </p>
              </div>
              <div className="mt-4 md:mt-0">
                <Button
                  onClick={() => router.push("/register")}
                  className="group relative overflow-hidden bg-gradient-to-r from-primary to-blue-600"
                >
                  <span className="relative z-10 flex items-center">
                    Try Now
                    <motion.div
                      animate={{ x: [0, 5, 0] }}
                      transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
                    >
                      <ChevronRight className="ml-2 h-4 w-4" />
                    </motion.div>
                  </span>
                  <span className="absolute inset-0 bg-white/10 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></span>
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="bg-muted/30 py-20 overflow-hidden" ref={howItWorksRef}>
        <div className="container">
          <motion.div
            variants={fadeIn}
            initial="hidden"
            animate={howItWorksInView ? "visible" : "hidden"}
            className="mx-auto mb-16 max-w-2xl text-center"
          >
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
              How <span className="text-primary">VoteSafe</span> Works
            </h2>
            <p className="mt-4 text-muted-foreground">
              Our simple three-step process ensures secure and accessible voting for all eligible citizens.
            </p>
          </motion.div>

          <motion.div variants={fadeIn} initial="hidden" animate={howItWorksInView ? "visible" : "hidden"}>
            <Tabs defaultValue="verification" className="mx-auto max-w-4xl" onValueChange={setActiveTab}>
              <div className="mb-8 flex justify-center">
                <TabsList className="grid w-full max-w-md grid-cols-3 p-1 relative overflow-hidden rounded-full bg-muted/50 backdrop-blur-sm">
                  <div
                    className="absolute h-full bg-primary/10 rounded-full transition-all duration-300 z-0"
                    style={{
                      left: activeTab === "verification" ? "0%" : activeTab === "voting" ? "33.33%" : "66.66%",
                      width: "33.33%",
                    }}
                  />
                  <TabsTrigger value="verification" className="relative z-10 transition-all duration-300 rounded-full">
                    <div className="flex items-center gap-1.5">
                      <Fingerprint className="h-4 w-4" />
                      <span className="hidden sm:inline">Verification</span>
                      <span className="sm:hidden">Verify</span>
                    </div>
                  </TabsTrigger>
                  <TabsTrigger value="voting" className="relative z-10 transition-all duration-300 rounded-full">
                    <div className="flex items-center gap-1.5">
                      <VoteIcon className="h-4 w-4" />
                      <span className="hidden sm:inline">Voting</span>
                      <span className="sm:hidden">Vote</span>
                    </div>
                  </TabsTrigger>
                  <TabsTrigger value="results" className="relative z-10 transition-all duration-300 rounded-full">
                    <div className="flex items-center gap-1.5">
                      <BarChart3 className="h-4 w-4" />
                      <span className="hidden sm:inline">Results</span>
                      <span className="sm:hidden">Results</span>
                    </div>
                  </TabsTrigger>
                </TabsList>
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <TabsContent value="verification" className="rounded-xl border bg-card p-6 shadow-sm">
                    <div className="flex justify-center">
                      <div className="max-w-xl text-center">
                        <h3 className="mb-4 text-2xl font-medium">Secure Identity Verification</h3>
                        <div className="space-y-4">
                          {[
                            {
                              title: "Government ID Verification",
                              description: "Upload your government-issued ID for secure verification",
                            },
                            {
                              title: "Facial Recognition",
                              description: "Complete a quick facial scan to confirm your identity",
                            },
                            {
                              title: "AI-Powered Verification",
                              description: "Advanced AI algorithms ensure your identity is securely verified",
                            },
                          ].map((item, i) => (
                            <div key={i} className="flex items-start gap-3">
                              <div className="mt-1 rounded-full bg-primary/10 p-1">
                                <CheckCircle2 className="h-4 w-4 text-primary" />
                              </div>
                              <div className="text-left">
                                <h4 className="font-medium">{item.title}</h4>
                                <p className="text-sm text-muted-foreground">{item.description}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                        <Button
                          className="mt-6 group relative overflow-hidden"
                          onClick={() => router.push("/register")}
                        >
                          <span className="relative z-10 flex items-center">
                            Start Verification
                            <ChevronRight className="ml-2 h-4 w-4" />
                          </span>
                          <span className="absolute inset-0 bg-primary/10 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></span>
                        </Button>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="voting" className="rounded-xl border bg-card p-6 shadow-sm">
                    <div className="flex justify-center">
                      <div className="max-w-xl text-center">
                        <h3 className="mb-4 text-2xl font-medium">Flexible Voting Options</h3>
                        <div className="space-y-4">
                          {[
                            {
                              title: "Online Voting",
                              description: "Vote securely from anywhere using your mobile device or computer",
                            },
                            {
                              title: "In-Person Voting",
                              description: "Find the nearest polling station with real-time waiting times",
                            },
                            {
                              title: "Secure Ballot Casting",
                              description: "Your vote is encrypted and anonymously recorded with advanced security",
                            },
                          ].map((item, i) => (
                            <div key={i} className="flex items-start gap-3">
                              <div className="mt-1 rounded-full bg-primary/10 p-1">
                                <CheckCircle2 className="h-4 w-4 text-primary" />
                              </div>
                              <div className="text-left">
                                <h4 className="font-medium">{item.title}</h4>
                                <p className="text-sm text-muted-foreground">{item.description}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                        <Button
                          className="mt-6 group relative overflow-hidden"
                          onClick={() => router.push("/login")}
                        >
                          <span className="relative z-10 flex items-center">
                            Access Elections
                            <ChevronRight className="ml-2 h-4 w-4" />
                          </span>
                          <span className="absolute inset-0 bg-primary/10 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></span>
                        </Button>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="results" className="rounded-xl border bg-card p-6 shadow-sm">
                    <div className="flex justify-center">
                      <div className="max-w-xl text-center">
                        <h3 className="mb-4 text-2xl font-medium">Transparent Results</h3>
                        <div className="space-y-4">
                          {[
                            {
                              title: "Real-Time Results",
                              description: "View election results as they come in with live updates",
                            },
                            {
                              title: "Secure Verification",
                              description: "All results are securely verified for complete transparency",
                            },
                            {
                              title: "Data Visualization",
                              description: "Interactive charts and graphs make results easy to understand",
                            },
                          ].map((item, i) => (
                            <div key={i} className="flex items-start gap-3">
                              <div className="mt-1 rounded-full bg-primary/10 p-1">
                                <CheckCircle2 className="h-4 w-4 text-primary" />
                              </div>
                              <div className="text-left">
                                <h4 className="font-medium">{item.title}</h4>
                                <p className="text-sm text-muted-foreground">{item.description}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                        <Button
                          className="mt-6 group relative overflow-hidden"
                          onClick={() => router.push("/login")}
                        >
                          <span className="relative z-10 flex items-center">
                            View Results
                            <ChevronRight className="ml-2 h-4 w-4" />
                          </span>
                          <span className="absolute inset-0 bg-primary/10 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></span>
                        </Button>
                      </div>
                    </div>
                  </TabsContent>

                </motion.div>
              </AnimatePresence>
            </Tabs>
          </motion.div>

          {/* Step indicators */}
          <motion.div
            variants={fadeIn}
            initial="hidden"
            animate={howItWorksInView ? "visible" : "hidden"}
            transition={{ delay: 0.4 }}
            className="mx-auto mt-12 max-w-3xl"
          >
            <div className="flex justify-between">
              <div className="flex flex-1 items-center">
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className={`flex h-10 w-10 items-center justify-center rounded-full transition-colors duration-300 ${activeTab === "verification" ? "bg-primary text-primary-foreground" : "border border-muted-foreground/30 bg-background"}`}
                >
                  1
                </motion.div>
                <div
                  className={`h-1 flex-1 transition-colors duration-500 ${activeTab === "verification" || activeTab === "voting" || activeTab === "results" ? "bg-primary" : "bg-muted-foreground/30"}`}
                ></div>
              </div>
              <div className="flex flex-1 items-center">
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className={`flex h-10 w-10 items-center justify-center rounded-full transition-colors duration-300 ${activeTab === "voting" || activeTab === "results" ? "bg-primary text-primary-foreground" : "border border-muted-foreground/30 bg-background"}`}
                >
                  2
                </motion.div>
                <div
                  className={`h-1 flex-1 transition-colors duration-500 ${activeTab === "voting" || activeTab === "results" ? "bg-primary" : "bg-muted-foreground/30"}`}
                ></div>
              </div>
              <div className="flex items-center">
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className={`flex h-10 w-10 items-center justify-center rounded-full transition-colors duration-300 ${activeTab === "results" ? "bg-primary text-primary-foreground" : "border border-muted-foreground/30 bg-background"}`}
                >
                  3
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-20 overflow-hidden" ref={trustRef}>
        <div className="container">
          <motion.div
            variants={fadeIn}
            initial="hidden"
            animate={trustInView ? "visible" : "hidden"}
            className="mx-auto mb-16 max-w-2xl text-center"
          >
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
              Trusted and <span className="text-primary">Secure</span>
            </h2>
            <p className="mt-4 text-muted-foreground">
              VoteSafe combines multiple security layers to ensure the integrity of every election.
            </p>
          </motion.div>

          <div className="grid gap-8 md:grid-cols-2">
            <motion.div
              variants={fadeInLeft}
              initial="hidden"
              animate={trustInView ? "visible" : "hidden"}
              transition={{ delay: 0.2 }}
              className="flex flex-col justify-center"
            >
              <div className="space-y-6">
                <motion.div
                  whileHover={{ x: 5 }}
                  className="flex items-start gap-4 p-4 rounded-lg hover:bg-muted/50 transition-colors duration-300"
                >
                  <div className="rounded-full bg-primary/10 p-2">
                    <ShieldCheck className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium">Advanced Encryption</h3>
                    <p className="text-muted-foreground">
                      End-to-end encryption protects your personal data and voting choices.
                    </p>
                  </div>
                </motion.div>
                <motion.div
                  whileHover={{ x: 5 }}
                  className="flex items-start gap-4 p-4 rounded-lg hover:bg-muted/50 transition-colors duration-300"
                >
                  <div className="rounded-full bg-primary/10 p-2">
                    <Fingerprint className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium">AI-Powered Verification</h3>
                    <p className="text-muted-foreground">
                      Advanced AI algorithms ensure accurate identity verification.
                    </p>
                  </div>
                </motion.div>
                <motion.div
                  whileHover={{ x: 5 }}
                  className="flex items-start gap-4 p-4 rounded-lg hover:bg-muted/50 transition-colors duration-300"
                >
                  <div className="rounded-full bg-primary/10 p-2">
                    <Zap className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium">Real-time Monitoring</h3>
                    <p className="text-muted-foreground">
                      Continuous system monitoring prevents fraud and ensures election integrity.
                    </p>
                  </div>
                </motion.div>
              </div>
            </motion.div>
            <motion.div
              variants={scaleUp}
              initial="hidden"
              animate={trustInView ? "visible" : "hidden"}
              className="flex items-center justify-center"
            >
              <div className="overflow-hidden rounded-lg shadow-md relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-blue-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <img
                  src="https://media.kasperskydaily.com/wp-content/uploads/sites/92/2020/10/16044143/M187_Digital-voting-header.png"
                  alt="Security Visualization"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      

      {/* Floating Action Button (Mobile Only) */}
      <div className="fixed bottom-6 right-6 z-50 md:hidden">
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 1, type: "spring" }}
        >
          <Button
            onClick={() => router.push("/register")}
            className="h-14 w-14 rounded-full bg-gradient-to-r from-primary to-blue-600 shadow-lg flex items-center justify-center"
          >
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
            >
              <VoteIcon className="h-6 w-6" />
            </motion.div>
          </Button>
        </motion.div>
      </div>

      {/* Footer */}
      <footer className="border-t bg-muted/30">
        <div className="container py-12">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            <div>
              <div className="flex items-center gap-2">
                <VoteIcon className="h-6 w-6 text-primary" />
                <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-600">
                  VoteSafe
                </span>
              </div>
              <p className="mt-4 text-sm text-muted-foreground">
                Secure, transparent, and accessible voting for everyone through AI-powered verification.
              </p>
              <div className="mt-4 flex space-x-4">
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-twitter"
                  >
                    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                  </svg>
                </a>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-facebook"
                  >
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                  </svg>
                </a>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-instagram"
                  >
                    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line>
                  </svg>
                </a>
              </div>
            </div>
            <div>
              <h3 className="mb-4 text-sm font-semibold">Product</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a href="#" className="hover:text-foreground transition-colors duration-200">
                    Features
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground transition-colors duration-200">
                    Security
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground transition-colors duration-200">
                    Verification
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground transition-colors duration-200">
                    Mobile App
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="mb-4 text-sm font-semibold">Resources</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a href="#" className="hover:text-foreground transition-colors duration-200">
                    Documentation
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground transition-colors duration-200">
                    Help Center
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground transition-colors duration-200">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground transition-colors duration-200">
                    Terms of Service
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="mb-4 text-sm font-semibold">Contact</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a href="#" className="hover:text-foreground transition-colors duration-200">
                    support@votesafe.com
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground transition-colors duration-200">
                    +1 (555) 123-4567
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground transition-colors duration-200">
                    123 Democracy Ave, Secure City
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-12 border-t pt-6">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-center text-sm text-muted-foreground">
                © {new Date().getFullYear()} VoteSafe. All rights reserved.
              </p>
              <div className="mt-4 md:mt-0 flex space-x-4 text-sm text-muted-foreground">
                <a href="#" className="hover:text-foreground transition-colors duration-200">
                  Privacy
                </a>
                <a href="#" className="hover:text-foreground transition-colors duration-200">
                  Terms
                </a>
                <a href="#" className="hover:text-foreground transition-colors duration-200">
                  Cookies
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}



