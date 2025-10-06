"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { FileText, LinkIcon, Type, MoreVertical, Eye, RefreshCw, Trash2 } from "lucide-react"
import { cn } from "@/lib/utils"

interface FileCardProps {
  id: string
  name: string
  type: "file" | "url" | "text"
  status: "synced" | "syncing" | "error"
  progress?: number
  onDelete: (id: string) => void
  onResync: (id: string) => void
}

export function FileCard({ id, name, type, status, progress = 100, onDelete, onResync }: FileCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  const getIcon = () => {
    switch (type) {
      case "file":
        return FileText
      case "url":
        return LinkIcon
      case "text":
        return Type
    }
  }

  const getStatusColor = () => {
    switch (status) {
      case "synced":
        return "bg-green-500"
      case "syncing":
        return "bg-blue-500"
      case "error":
        return "bg-red-500"
    }
  }

  const Icon = getIcon()

  return (
    <Card
      className={cn(
        "group relative cursor-pointer transition-all duration-200 hover:shadow-md",
        isHovered && "ring-2 ring-primary/20",
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          {/* Icon with progress ring */}
          <div className="relative">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
              <Icon className="h-5 w-5 text-muted-foreground" />
            </div>
            {status === "syncing" && (
              <svg className="absolute -inset-1 h-12 w-12 animate-spin" viewBox="0 0 50 50">
                <circle
                  cx="25"
                  cy="25"
                  r="20"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeDasharray={`${progress * 1.25} 125`}
                  className="text-primary"
                  transform="rotate(-90 25 25)"
                />
              </svg>
            )}
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2">
              <h3 className="font-medium text-sm text-foreground truncate">{name}</h3>
              <div className="flex items-center gap-1">
                {/* Status indicator */}
                <div className={cn("h-2 w-2 rounded-full", getStatusColor())} />

                {/* Actions menu */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className={cn(
                        "h-6 w-6 opacity-0 transition-opacity group-hover:opacity-100",
                        isHovered && "opacity-100",
                      )}
                    >
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem className="gap-2">
                      <Eye className="h-4 w-4" />
                      Preview
                    </DropdownMenuItem>
                    <DropdownMenuItem className="gap-2" onClick={() => onResync(id)}>
                      <RefreshCw className="h-4 w-4" />
                      Resync
                    </DropdownMenuItem>
                    <DropdownMenuItem className="gap-2 text-destructive" onClick={() => onDelete(id)}>
                      <Trash2 className="h-4 w-4" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>

            <div className="mt-1 flex items-center gap-2 text-xs text-muted-foreground">
              <span className="capitalize">{type}</span>
              <span>•</span>
              <span className="capitalize">{status}</span>
              {status === "syncing" && <span>• {progress}%</span>}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
