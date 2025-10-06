"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"
import { Send, X, Minimize2 } from "lucide-react"

interface ChatPreviewProps {
  brandColor: string
  greeting: string
  chatIcon?: string
  tone: string
  deviceMode: "mobile" | "desktop"
}

interface Message {
  id: string
  role: "user" | "assistant"
  content: string
}

export function ChatPreview({ brandColor, greeting, chatIcon, tone, deviceMode }: ChatPreviewProps) {
  const [isOpen, setIsOpen] = useState(true)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "assistant",
      content: greeting,
    },
  ])
  const [input, setInput] = useState("")

  const handleSend = () => {
    if (!input.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input,
    }

    setMessages([...messages, userMessage])
    setInput("")

    // Simulate bot response
    setTimeout(() => {
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: "Thanks for your message! I'm here to help you with any questions.",
      }
      setMessages((prev) => [...prev, botMessage])
    }, 1000)
  }

  return (
    <div className="relative flex h-full items-end justify-end p-8">
      {/* Chat widget button */}
      {!isOpen && (
        <Button
          size="icon"
          className="h-14 w-14 rounded-full shadow-lg transition-transform hover:scale-110"
          style={{ backgroundColor: brandColor }}
          onClick={() => setIsOpen(true)}
        >
          {chatIcon ? (
            <img src={chatIcon || "/placeholder.svg"} alt="Chat" className="h-6 w-6" />
          ) : (
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
              />
            </svg>
          )}
        </Button>
      )}

      {/* Chat window */}
      {isOpen && (
        <Card
          className={cn(
            "flex flex-col overflow-hidden shadow-2xl transition-all duration-300",
            deviceMode === "mobile" ? "h-[600px] w-[340px]" : "h-[600px] w-[400px]",
          )}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-4" style={{ backgroundColor: brandColor }}>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20">
                {chatIcon ? (
                  <img src={chatIcon || "/placeholder.svg"} alt="Bot" className="h-6 w-6" />
                ) : (
                  <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                    />
                  </svg>
                )}
              </div>
              <div>
                <h3 className="font-semibold text-white">Support Assistant</h3>
                <p className="text-xs text-white/80">Online</p>
              </div>
            </div>
            <div className="flex gap-1">
              <Button
                size="icon"
                variant="ghost"
                className="h-8 w-8 text-white hover:bg-white/20"
                onClick={() => setIsOpen(false)}
              >
                <Minimize2 className="h-4 w-4" />
              </Button>
              <Button
                size="icon"
                variant="ghost"
                className="h-8 w-8 text-white hover:bg-white/20"
                onClick={() => setIsOpen(false)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Messages */}
          <ScrollArea className="flex-1 bg-muted/30 p-4">
            <div className="space-y-4">
              {messages.map((message) => (
                <div key={message.id} className={cn("flex", message.role === "user" ? "justify-end" : "justify-start")}>
                  <div
                    className={cn(
                      "max-w-[80%] rounded-2xl px-4 py-2 text-sm",
                      message.role === "user"
                        ? "bg-primary text-primary-foreground"
                        : "bg-background text-foreground shadow-sm",
                    )}
                    style={message.role === "user" ? { backgroundColor: brandColor } : {}}
                  >
                    {message.content}
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>

          {/* Input */}
          <div className="border-t border-border bg-background p-4">
            <div className="flex gap-2">
              <Input
                placeholder="Type your message..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                className="flex-1"
              />
              <Button size="icon" onClick={handleSend} style={{ backgroundColor: brandColor }}>
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </Card>
      )}
    </div>
  )
}
