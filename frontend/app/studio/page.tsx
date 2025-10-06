"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { PageHeader } from "@/components/page-header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ChatPreview } from "@/components/studio/chat-preview"
import { ColorPicker } from "@/components/studio/color-picker"
import { EmbedCodeDialog } from "@/components/studio/embed-code-dialog"
import { Code, Sparkles, Monitor, Smartphone } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function StudioPage() {
  const [brandColor, setBrandColor] = useState("#6366f1")
  const [greeting, setGreeting] = useState("Hi there! How can I help you today?")
  const [tone, setTone] = useState("friendly")
  const [chatIcon, setChatIcon] = useState("")
  const [deviceMode, setDeviceMode] = useState<"mobile" | "desktop">("desktop")
  const [showEmbedDialog, setShowEmbedDialog] = useState(false)
  const { toast } = useToast()

  const handlePublish = () => {
    toast({
      title: "Publishing chatbot...",
      description: "Your changes are being deployed",
    })

    setTimeout(() => {
      toast({
        title: "Published successfully!",
        description: "Your chatbot is now live",
      })
    }, 2000)
  }

  const handleGenerateEmbed = () => {
    setShowEmbedDialog(true)
  }

  return (
    <DashboardLayout>
      <PageHeader
        title="Chatbot Studio"
        description="Customize your chatbot's appearance and behavior"
        action={
          <div className="flex gap-2">
            <Button variant="outline" className="gap-2 bg-transparent" onClick={handleGenerateEmbed}>
              <Code className="h-4 w-4" />
              Get Embed Code
            </Button>
            <Button className="gap-2" onClick={handlePublish}>
              <Sparkles className="h-4 w-4" />
              Publish
            </Button>
          </div>
        }
      />

      <div className="grid gap-6 lg:grid-cols-[400px_1fr]">
        {/* Customization sidebar */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Appearance</CardTitle>
              <CardDescription>Customize colors and branding</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <ColorPicker label="Brand Color" value={brandColor} onChange={setBrandColor} />

              <div className="space-y-2">
                <Label htmlFor="icon">Chat Icon URL (optional)</Label>
                <Input
                  id="icon"
                  placeholder="https://example.com/icon.png"
                  value={chatIcon}
                  onChange={(e) => setChatIcon(e.target.value)}
                />
                <p className="text-xs text-muted-foreground">Leave empty to use default icon</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Behavior</CardTitle>
              <CardDescription>Configure tone and messaging</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="greeting">Greeting Message</Label>
                <Textarea
                  id="greeting"
                  value={greeting}
                  onChange={(e) => setGreeting(e.target.value)}
                  rows={3}
                  placeholder="Enter your greeting message..."
                />
                <p className="text-xs text-muted-foreground">{greeting.length}/200 characters</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="tone">Conversation Tone</Label>
                <Select value={tone} onValueChange={setTone}>
                  <SelectTrigger id="tone">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="friendly">Friendly & Casual</SelectItem>
                    <SelectItem value="professional">Professional</SelectItem>
                    <SelectItem value="formal">Formal</SelectItem>
                    <SelectItem value="playful">Playful & Fun</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Advanced Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Show typing indicator</Label>
                  <p className="text-xs text-muted-foreground">Display when bot is thinking</p>
                </div>
                <input type="checkbox" defaultChecked className="h-4 w-4" />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Sound notifications</Label>
                  <p className="text-xs text-muted-foreground">Play sound on new messages</p>
                </div>
                <input type="checkbox" className="h-4 w-4" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Live preview */}
        <Card className="flex flex-col">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Live Preview</CardTitle>
                <CardDescription>See how your chatbot looks</CardDescription>
              </div>
              <Tabs value={deviceMode} onValueChange={(v) => setDeviceMode(v as "mobile" | "desktop")}>
                <TabsList>
                  <TabsTrigger value="desktop" className="gap-2">
                    <Monitor className="h-4 w-4" />
                    Desktop
                  </TabsTrigger>
                  <TabsTrigger value="mobile" className="gap-2">
                    <Smartphone className="h-4 w-4" />
                    Mobile
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </CardHeader>
          <CardContent className="flex-1 bg-muted/30">
            <ChatPreview
              brandColor={brandColor}
              greeting={greeting}
              chatIcon={chatIcon}
              tone={tone}
              deviceMode={deviceMode}
            />
          </CardContent>
        </Card>
      </div>

      <EmbedCodeDialog open={showEmbedDialog} onOpenChange={setShowEmbedDialog} config={{ brandColor, greeting }} />
    </DashboardLayout>
  )
}
