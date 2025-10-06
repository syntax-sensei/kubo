"use client"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { User, Bot } from "lucide-react"

interface Message {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp: string
  score?: number
}

interface ConversationThreadProps {
  messages: Message[]
  selectedMessageId?: string
  onSelectMessage: (id: string) => void
}

export function ConversationThread({ messages, selectedMessageId, onSelectMessage }: ConversationThreadProps) {
  const getScoreColor = (score?: number) => {
    if (!score) return ""
    if (score >= 80) return "border-green-200 bg-green-50 text-green-700"
    if (score >= 60) return "border-orange-200 bg-orange-50 text-orange-700"
    return "border-red-200 bg-red-50 text-red-700"
  }

  return (
    <div className="space-y-4">
      {messages.map((message) => (
        <div
          key={message.id}
          className={cn(
            "cursor-pointer rounded-lg border-2 p-4 transition-all hover:shadow-md",
            selectedMessageId === message.id ? "border-primary bg-primary/5" : "border-transparent bg-muted/30",
          )}
          onClick={() => onSelectMessage(message.id)}
        >
          <div className="flex items-start gap-3">
            <div
              className={cn(
                "flex h-8 w-8 shrink-0 items-center justify-center rounded-full",
                message.role === "user" ? "bg-blue-100 text-blue-600" : "bg-purple-100 text-purple-600",
              )}
            >
              {message.role === "user" ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
            </div>
            <div className="flex-1 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium capitalize">{message.role}</span>
                <div className="flex items-center gap-2">
                  {message.score && (
                    <Badge variant="outline" className={getScoreColor(message.score)}>
                      {message.score}/100
                    </Badge>
                  )}
                  <span className="text-xs text-muted-foreground">{message.timestamp}</span>
                </div>
              </div>
              <p className="text-sm leading-relaxed text-foreground">{message.content}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
