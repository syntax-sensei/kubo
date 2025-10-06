"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { PageHeader } from "@/components/page-header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { FileUploadDialog } from "@/components/knowledge/file-upload-dialog"
import { NewFolderDialog } from "@/components/knowledge/new-folder-dialog"
import { FileCard } from "@/components/knowledge/file-card"
import { FolderTree } from "@/components/knowledge/folder-tree"
import { Plus, Search, FolderPlus } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface FileItem {
  id: string
  name: string
  type: "file" | "url" | "text"
  status: "synced" | "syncing" | "error"
  progress?: number
  folderId: string | null
}

interface FolderNode {
  id: string
  name: string
  children?: FolderNode[]
  fileCount: number
}

const initialFolders: FolderNode[] = [
  {
    id: "1",
    name: "Product Documentation",
    fileCount: 12,
    children: [
      { id: "1-1", name: "Getting Started", fileCount: 5 },
      { id: "1-2", name: "API Reference", fileCount: 7 },
    ],
  },
  {
    id: "2",
    name: "FAQs",
    fileCount: 8,
  },
  {
    id: "3",
    name: "Support Articles",
    fileCount: 15,
  },
]

const initialFiles: FileItem[] = [
  { id: "1", name: "Installation Guide.pdf", type: "file", status: "synced", folderId: "1-1" },
  { id: "2", name: "Quick Start Tutorial.pdf", type: "file", status: "synced", folderId: "1-1" },
  { id: "3", name: "https://docs.example.com/api", type: "url", status: "syncing", progress: 65, folderId: "1-2" },
  { id: "4", name: "Pricing FAQ", type: "text", status: "synced", folderId: "2" },
  { id: "5", name: "Troubleshooting Common Issues", type: "text", status: "synced", folderId: "3" },
  { id: "6", name: "Account Management.pdf", type: "file", status: "error", folderId: "3" },
]

export default function KnowledgePage() {
  const [isUploadOpen, setIsUploadOpen] = useState(false)
  const [isNewFolderOpen, setIsNewFolderOpen] = useState(false)
  const [files, setFiles] = useState<FileItem[]>(initialFiles)
  const [folders, setFolders] = useState<FolderNode[]>(initialFolders)
  const [selectedFolder, setSelectedFolder] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const { toast } = useToast()

  const handleUpload = (data: { type: string; content: string; name: string }) => {
    const newFile: FileItem = {
      id: Date.now().toString(),
      name: data.name,
      type: data.type as "file" | "url" | "text",
      status: "syncing",
      progress: 0,
      folderId: selectedFolder,
    }

    setFiles([newFile, ...files])

    toast({
      title: "Source added",
      description: `${data.name} is being processed`,
    })

    // Simulate processing
    let progress = 0
    const interval = setInterval(() => {
      progress += 10
      if (progress <= 100) {
        setFiles((prev) =>
          prev.map((f) =>
            f.id === newFile.id ? { ...f, progress, status: progress === 100 ? "synced" : "syncing" } : f,
          ),
        )
      } else {
        clearInterval(interval)
      }
    }, 300)
  }

  const handleDelete = (id: string) => {
    setFiles(files.filter((f) => f.id !== id))
    toast({
      title: "Source deleted",
      description: "The source has been removed from your knowledge base",
    })
  }

  const handleResync = (id: string) => {
    setFiles(
      files.map((f) =>
        f.id === id
          ? {
              ...f,
              status: "syncing",
              progress: 0,
            }
          : f,
      ),
    )

    toast({
      title: "Resyncing",
      description: "The source is being reprocessed",
    })

    // Simulate resync
    let progress = 0
    const interval = setInterval(() => {
      progress += 15
      if (progress <= 100) {
        setFiles((prev) =>
          prev.map((f) => (f.id === id ? { ...f, progress, status: progress === 100 ? "synced" : "syncing" } : f)),
        )
      } else {
        clearInterval(interval)
      }
    }, 200)
  }

  const handleCreateFolder = (name: string, parentId: string | null) => {
    const newFolder: FolderNode = {
      id: Date.now().toString(),
      name,
      fileCount: 0,
    }

    if (parentId === null) {
      // Add to root level
      setFolders([...folders, newFolder])
    } else {
      // Add as child to parent folder
      const addToParent = (folderList: FolderNode[]): FolderNode[] => {
        return folderList.map((folder) => {
          if (folder.id === parentId) {
            return {
              ...folder,
              children: [...(folder.children || []), newFolder],
            }
          }
          if (folder.children) {
            return {
              ...folder,
              children: addToParent(folder.children),
            }
          }
          return folder
        })
      }
      setFolders(addToParent(folders))
    }

    toast({
      title: "Folder created",
      description: `${name} has been added to your knowledge base`,
    })
  }

  const handleDeleteFolder = (folderId: string) => {
    const deleteFromTree = (folderList: FolderNode[]): FolderNode[] => {
      return folderList
        .filter((folder) => folder.id !== folderId)
        .map((folder) => ({
          ...folder,
          children: folder.children ? deleteFromTree(folder.children) : undefined,
        }))
    }

    setFolders(deleteFromTree(folders))

    // Also delete files in that folder
    setFiles(files.filter((f) => f.folderId !== folderId))

    // Clear selection if deleted folder was selected
    if (selectedFolder === folderId) {
      setSelectedFolder(null)
    }

    toast({
      title: "Folder deleted",
      description: "The folder and its contents have been removed",
    })
  }

  const filteredFiles = files.filter((file) => {
    const matchesFolder = selectedFolder === null || file.folderId === selectedFolder
    const matchesSearch = file.name.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesFolder && matchesSearch
  })

  return (
    <DashboardLayout>
      <PageHeader
        title="Knowledge Base"
        description="Manage your content sources and documentation"
        action={
          <div className="flex gap-2">
            <Button variant="outline" className="gap-2 bg-transparent" onClick={() => setIsNewFolderOpen(true)}>
              <FolderPlus className="h-4 w-4" />
              New Folder
            </Button>
            <Button className="gap-2" onClick={() => setIsUploadOpen(true)}>
              <Plus className="h-4 w-4" />
              New Source
            </Button>
          </div>
        }
      />

      <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
        {/* Folder sidebar */}
        <Card className="h-fit max-h-[calc(100vh-12rem)] flex flex-col">
          <CardHeader className="flex-shrink-0">
            <CardTitle className="text-base">Folders</CardTitle>
          </CardHeader>
          <CardContent className="overflow-y-auto flex-1">
            <FolderTree
              folders={folders}
              selectedFolder={selectedFolder}
              onSelectFolder={setSelectedFolder}
              onDeleteFolder={handleDeleteFolder}
            />
          </CardContent>
        </Card>

        {/* Files grid */}
        <div className="space-y-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search files..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>

          {/* Stats */}
          <div className="grid gap-4 md:grid-cols-3">
            <Card>
              <CardContent className="pt-6">
                <div className="text-2xl font-semibold">{files.length}</div>
                <p className="text-sm text-muted-foreground">Total Sources</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="text-2xl font-semibold">{files.filter((f) => f.status === "synced").length}</div>
                <p className="text-sm text-muted-foreground">Synced</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="text-2xl font-semibold">{files.filter((f) => f.status === "syncing").length}</div>
                <p className="text-sm text-muted-foreground">Processing</p>
              </CardContent>
            </Card>
          </div>

          {/* Files */}
          {filteredFiles.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <p className="text-muted-foreground">No sources found</p>
                <Button className="mt-4 gap-2" onClick={() => setIsUploadOpen(true)}>
                  <Plus className="h-4 w-4" />
                  Add Your First Source
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-4 md:grid-cols-2">
              {filteredFiles.map((file) => (
                <FileCard
                  key={file.id}
                  id={file.id}
                  name={file.name}
                  type={file.type}
                  status={file.status}
                  progress={file.progress}
                  onDelete={handleDelete}
                  onResync={handleResync}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      <FileUploadDialog open={isUploadOpen} onOpenChange={setIsUploadOpen} onUpload={handleUpload} />
      <NewFolderDialog
        open={isNewFolderOpen}
        onOpenChange={setIsNewFolderOpen}
        onCreateFolder={handleCreateFolder}
        folders={folders}
      />
    </DashboardLayout>
  )
}
