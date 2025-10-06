import type React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowUp, ArrowDown, Minus } from "lucide-react"
import { cn } from "@/lib/utils"

interface MetricCardProps {
  title: string
  value: string | number
  change?: number
  trend?: "up" | "down" | "neutral"
  icon?: React.ReactNode
}

export function MetricCard({ title, value, change, trend = "neutral", icon }: MetricCardProps) {
  const getTrendIcon = () => {
    switch (trend) {
      case "up":
        return <ArrowUp className="h-3 w-3" />
      case "down":
        return <ArrowDown className="h-3 w-3" />
      default:
        return <Minus className="h-3 w-3" />
    }
  }

  const getTrendColor = () => {
    switch (trend) {
      case "up":
        return "text-green-600"
      case "down":
        return "text-red-600"
      default:
        return "text-muted-foreground"
    }
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
        {icon && <div className="text-muted-foreground">{icon}</div>}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-semibold">{value}</div>
        {change !== undefined && (
          <div className={cn("mt-1 flex items-center gap-1 text-xs font-medium", getTrendColor())}>
            {getTrendIcon()}
            <span>{Math.abs(change)}% from last month</span>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
