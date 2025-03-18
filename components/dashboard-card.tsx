"use client"

import { Card, CardContent } from "@/components/ui/card"
import type { ReactNode } from "react"

interface DashboardCardProps {
  title: string
  description: string
  icon: ReactNode
  status: string
  statusColor: "success" | "warning" | "destructive" | "default"
  onClick: () => void
  disabled?: boolean
}

export function DashboardCard({
  title,
  description,
  icon,
  status,
  statusColor,
  onClick,
  disabled = false,
}: DashboardCardProps) {
  const getStatusColorClasses = () => {
    switch (statusColor) {
      case "success":
        return "bg-success/10 text-success"
      case "warning":
        return "bg-warning/10 text-warning"
      case "destructive":
        return "bg-destructive/10 text-destructive"
      default:
        return "bg-muted text-muted-foreground"
    }
  }

  return (
    <Card
      className={`transition-all hover:shadow-md ${disabled ? "opacity-70" : ""}`}
      onClick={disabled ? undefined : onClick}
    >
      <CardContent className={`flex items-center gap-4 p-4 ${disabled ? "" : "cursor-pointer"}`}>
        <div className="rounded-full bg-primary/10 p-3 text-primary">{icon}</div>
        <div className="flex-1">
          <h3 className="font-medium">{title}</h3>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
        <div className={`rounded-full px-3 py-1 text-xs font-medium ${getStatusColorClasses()}`}>{status}</div>
      </CardContent>
    </Card>
  )
}

