"use client"

import type React from "react"

import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Upload, LinkIcon, FileText } from "lucide-react"

interface FileUploadDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onUpload: (data: { type: string; content: string; name: string }) => void
}

export function FileUploadDialog({ open, onOpenChange, onUpload }: FileUploadDialogProps) {
  const [fileName, setFileName] = useState("")
  const [url, setUrl] = useState("")
  const [text, setText] = useState("")
  const [textTitle, setTextTitle] = useState("")

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setFileName(file.name)
      // Simulate upload
      setTimeout(() => {
        onUpload({ type: "file", content: file.name, name: file.name })
        onOpenChange(false)
        setFileName("")
      }, 500)
    }
  }

  const handleUrlSubmit = () => {
    if (url) {
      onUpload({ type: "url", content: url, name: new URL(url).hostname })
      onOpenChange(false)
      setUrl("")
    }
  }

  const handleTextSubmit = () => {
    if (text && textTitle) {
      onUpload({ type: "text", content: text, name: textTitle })
      onOpenChange(false)
      setText("")
      setTextTitle("")
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Add New Source</DialogTitle>
          <DialogDescription>Upload documents, add URLs, or paste text content</DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="file" className="mt-4">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="file" className="gap-2">
              <Upload className="h-4 w-4" />
              File
            </TabsTrigger>
            <TabsTrigger value="url" className="gap-2">
              <LinkIcon className="h-4 w-4" />
              URL
            </TabsTrigger>
            <TabsTrigger value="text" className="gap-2">
              <FileText className="h-4 w-4" />
              Text
            </TabsTrigger>
          </TabsList>

          <TabsContent value="file" className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="file">Upload Document</Label>
              <div className="flex items-center gap-2">
                <Input
                  id="file"
                  type="file"
                  accept=".pdf,.docx,.txt,.md"
                  onChange={handleFileUpload}
                  className="cursor-pointer"
                />
              </div>
              <p className="text-xs text-muted-foreground">Supports PDF, DOCX, TXT, and MD files</p>
            </div>
          </TabsContent>

          <TabsContent value="url" className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="url">Website URL</Label>
              <Input
                id="url"
                type="url"
                placeholder="https://example.com/docs"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
              />
              <p className="text-xs text-muted-foreground">We'll extract content from the webpage</p>
            </div>
            <Button onClick={handleUrlSubmit} disabled={!url} className="w-full">
              Add URL
            </Button>
          </TabsContent>

          <TabsContent value="text" className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                placeholder="FAQ: Pricing"
                value={textTitle}
                onChange={(e) => setTextTitle(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="content">Content</Label>
              <Textarea
                id="content"
                placeholder="Paste your content here..."
                value={text}
                onChange={(e) => setText(e.target.value)}
                rows={6}
              />
            </div>
            <Button onClick={handleTextSubmit} disabled={!text || !textTitle} className="w-full">
              Add Text
            </Button>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}
