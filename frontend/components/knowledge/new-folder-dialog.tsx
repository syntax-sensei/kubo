"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface FolderNode {
  id: string
  name: string
  children?: FolderNode[]
  fileCount: number
}

interface NewFolderDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onCreateFolder: (name: string, parentId: string | null) => void
  folders: FolderNode[]
}

function flattenFolders(folders: FolderNode[], prefix = ""): { id: string; label: string }[] {
  const result: { id: string; label: string }[] = []

  for (const folder of folders) {
    result.push({ id: folder.id, label: prefix + folder.name })
    if (folder.children) {
      result.push(...flattenFolders(folder.children, prefix + folder.name + " / "))
    }
  }

  return result
}

export function NewFolderDialog({ open, onOpenChange, onCreateFolder, folders }: NewFolderDialogProps) {
  const [folderName, setFolderName] = useState("")
  const [parentId, setParentId] = useState<string | null>(null)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (folderName.trim()) {
      onCreateFolder(folderName.trim(), parentId)
      setFolderName("")
      setParentId(null)
      onOpenChange(false)
    }
  }

  const flatFolders = flattenFolders(folders)

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Create New Folder</DialogTitle>
            <DialogDescription>Add a new folder to organize your knowledge base sources.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="folder-name">Folder Name</Label>
              <Input
                id="folder-name"
                placeholder="e.g., Product Documentation"
                value={folderName}
                onChange={(e) => setFolderName(e.target.value)}
                autoFocus
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="parent-folder">Parent Folder (Optional)</Label>
              <Select
                value={parentId || "root"}
                onValueChange={(value) => setParentId(value === "root" ? null : value)}
              >
                <SelectTrigger id="parent-folder">
                  <SelectValue placeholder="Select parent folder" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="root">Root (No Parent)</SelectItem>
                  {flatFolders.map((folder) => (
                    <SelectItem key={folder.id} value={folder.id}>
                      {folder.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={!folderName.trim()}>
              Create Folder
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
