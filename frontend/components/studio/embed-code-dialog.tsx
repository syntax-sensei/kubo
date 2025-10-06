"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Copy, Check } from "lucide-react"

interface EmbedCodeDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  config: {
    brandColor: string
    greeting: string
  }
}

export function EmbedCodeDialog({ open, onOpenChange, config }: EmbedCodeDialogProps) {
  const [copied, setCopied] = useState(false)

  const embedCode = ` SupportAI Chatbot 
<script>
  window.supportAIConfig = {
    brandColor: "${config.brandColor}",
    greeting: "${config.greeting}",
    position: "bottom-right"
  };
</script>
<script src="https://cdn.supportai.com/widget.js" async></script>`

  const reactCode = `import { SupportAIWidget } from '@supportai/react'

function App() {
  return (
    <SupportAIWidget
      brandColor="${config.brandColor}"
      greeting="${config.greeting}"
      position="bottom-right"
    />
  )
}`

  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Embed Your Chatbot</DialogTitle>
          <DialogDescription>Copy the code below and paste it into your website</DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="html" className="mt-4">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="html">HTML</TabsTrigger>
            <TabsTrigger value="react">React</TabsTrigger>
          </TabsList>

          <TabsContent value="html" className="space-y-4">
            <div className="relative">
              <Textarea value={embedCode} readOnly rows={10} className="font-mono text-xs" />
              <Button
                size="sm"
                variant="outline"
                className="absolute right-2 top-2 gap-2 bg-background"
                onClick={() => handleCopy(embedCode)}
              >
                {copied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                {copied ? "Copied!" : "Copy"}
              </Button>
            </div>
            <p className="text-sm text-muted-foreground">
              Paste this code before the closing {"</body>"} tag on your website
            </p>
          </TabsContent>

          <TabsContent value="react" className="space-y-4">
            <div className="relative">
              <Textarea value={reactCode} readOnly rows={10} className="font-mono text-xs" />
              <Button
                size="sm"
                variant="outline"
                className="absolute right-2 top-2 gap-2 bg-background"
                onClick={() => handleCopy(reactCode)}
              >
                {copied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                {copied ? "Copied!" : "Copy"}
              </Button>
            </div>
            <p className="text-sm text-muted-foreground">Install the package: npm install @supportai/react</p>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}
