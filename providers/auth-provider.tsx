"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { auth } from "@/lib/firebase"
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, onAuthStateChanged, User as FirebaseUser } from "firebase/auth"

export interface User {
  id: string
  name: string
  email: string
  isVerified: boolean
  voterIdImageUrl?: string
  faceImageUrl?: string
}

interface AuthContextType {
  user: User | null
  isAuthenticated: boolean
  login: (email: string, password: string) => Promise<boolean>
  register: (name: string, email: string, password: string) => Promise<boolean>
  logout: () => Promise<void>
  updateUser: (userData: Partial<User>) => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false)

  useEffect(() => {
    // Listen for auth state changes
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        const formattedUser: User = {
          id: firebaseUser.uid,
          name: firebaseUser.displayName || "User",
          email: firebaseUser.email || "",
          isVerified: firebaseUser.emailVerified,
        }
        setUser(formattedUser)
        setIsAuthenticated(true)
        localStorage.setItem("user", JSON.stringify(formattedUser))
      } else {
        setUser(null)
        setIsAuthenticated(false)
        localStorage.removeItem("user")
      }
    })

    return () => unsubscribe()
  }, [])

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password)
      const firebaseUser = userCredential.user

      const formattedUser: User = {
        id: firebaseUser.uid,
        name: firebaseUser.displayName || "User",
        email: firebaseUser.email || "",
        isVerified: firebaseUser.emailVerified,
      }

      setUser(formattedUser)
      setIsAuthenticated(true)
      localStorage.setItem("user", JSON.stringify(formattedUser))
      return true
    } catch (error) {
      console.error("Login failed:", error)
      return false
    }
  }

  const register = async (name: string, email: string, password: string): Promise<boolean> => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password)
      const firebaseUser = userCredential.user

      const formattedUser: User = {
        id: firebaseUser.uid,
        name: name,
        email: firebaseUser.email || "",
        isVerified: firebaseUser.emailVerified,
      }

      setUser(formattedUser)
      setIsAuthenticated(true)
      localStorage.setItem("user", JSON.stringify(formattedUser))
      return true
    } catch (error) {
      console.error("Registration failed:", error)
      return false
    }
  }

  const logout = async (): Promise<void> => {
    try {
      await signOut(auth)
      setUser(null)
      setIsAuthenticated(false)
      localStorage.removeItem("user")
    } catch (error) {
      console.error("Logout failed:", error)
    }
  }

  const updateUser = (userData: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...userData }
      setUser(updatedUser)
      localStorage.setItem("user", JSON.stringify(updatedUser))
    }
  }

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, register, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
