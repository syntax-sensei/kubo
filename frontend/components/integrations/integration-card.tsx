"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { CheckCircle2, AlertCircle, Loader2, Settings } from "lucide-react"

interface IntegrationCardProps {
  name: string
  description: string
  logo: string
  status: "connected" | "syncing" | "failed" | "disconnected"
  autoLearn?: boolean
  onToggleAutoLearn?: (enabled: boolean) => void
  onConnect?: () => void
  onConfigure?: () => void
}

export function IntegrationCard({
  name,
  description,
  logo,
  status,
  autoLearn = false,
  onToggleAutoLearn,
  onConnect,
  onConfigure,
}: IntegrationCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  const getStatusBadge = () => {
    switch (status) {
      case "connected":
        return (
          <Badge variant="outline" className="gap-1 border-green-200 bg-green-50 text-green-700">
            <CheckCircle2 className="h-3 w-3" />
            Connected
          </Badge>
        )
      case "syncing":
        return (
          <Badge variant="outline" className="gap-1 border-blue-200 bg-blue-50 text-blue-700">
            <Loader2 className="h-3 w-3 animate-spin" />
            Syncing
          </Badge>
        )
      case "failed":
        return (
          <Badge variant="outline" className="gap-1 border-red-200 bg-red-50 text-red-700">
            <AlertCircle className="h-3 w-3" />
            Failed
          </Badge>
        )
      default:
        return (
          <Badge variant="outline" className="border-gray-200 bg-gray-50 text-gray-700">
            Not Connected
          </Badge>
        )
    }
  }

  return (
    <Card
      className={cn(
        "group relative transition-all duration-200 hover:shadow-lg",
        status === "syncing" && "ring-2 ring-blue-200 animate-pulse",
        isHovered && "scale-[1.02]",
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-muted p-2">
              <img src={logo || "/placeholder.svg"} alt={name} className="h-full w-full object-contain" />
            </div>
            <div>
              <CardTitle className="text-lg">{name}</CardTitle>
              <CardDescription className="mt-1">{description}</CardDescription>
            </div>
          </div>
          {getStatusBadge()}
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {status === "connected" && onToggleAutoLearn && (
          <div className="flex items-center justify-between rounded-lg border border-border bg-muted/30 p-3">
            <div className="space-y-0.5">
              <div className="text-sm font-medium">Auto-Learn from new content</div>
              <div className="text-xs text-muted-foreground">Automatically sync new FAQs and articles</div>
            </div>
            <Switch checked={autoLearn} onCheckedChange={onToggleAutoLearn} />
          </div>
        )}

        <div className="flex gap-2">
          {status === "disconnected" && onConnect && (
            <Button onClick={onConnect} className="flex-1">
              Connect
            </Button>
          )}
          {status === "connected" && onConfigure && (
            <Button variant="outline" onClick={onConfigure} className="flex-1 gap-2 bg-transparent">
              <Settings className="h-4 w-4" />
              Configure
            </Button>
          )}
          {status === "failed" && onConnect && (
            <Button variant="destructive" onClick={onConnect} className="flex-1">
              Reconnect
            </Button>
          )}
        </div>

        {status === "syncing" && (
          <div className="space-y-2">
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Syncing data...</span>
              <span>67%</span>
            </div>
            <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
              <div className="h-full w-2/3 rounded-full bg-primary transition-all duration-500" />
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
