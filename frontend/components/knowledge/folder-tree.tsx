"use client"

import { useState } from "react"
import { ChevronRight, Folder, FolderOpen, Trash2, MoreVertical } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

interface FolderNode {
  id: string
  name: string
  children?: FolderNode[]
  fileCount: number
}

interface FolderTreeProps {
  folders: FolderNode[]
  selectedFolder: string | null
  onSelectFolder: (folderId: string | null) => void
  onDeleteFolder: (folderId: string) => void
}

function FolderItem({
  folder,
  level = 0,
  selectedFolder,
  onSelectFolder,
  onDeleteFolder,
}: {
  folder: FolderNode
  level?: number
  selectedFolder: string | null
  onSelectFolder: (folderId: string | null) => void
  onDeleteFolder: (folderId: string) => void
}) {
  const [isExpanded, setIsExpanded] = useState(true)
  const isSelected = selectedFolder === folder.id
  const hasChildren = folder.children && folder.children.length > 0

  return (
    <div>
      <div className="flex items-center group min-w-0">
        {hasChildren ? (
          <Button
            variant="ghost"
            size="sm"
            className="h-7 w-7 p-0 hover:bg-accent flex-shrink-0"
            onClick={(e) => {
              e.stopPropagation()
              setIsExpanded(!isExpanded)
            }}
          >
            <ChevronRight className={cn("h-4 w-4 transition-transform", isExpanded && "rotate-90")} />
          </Button>
        ) : (
          <div className="w-7 flex-shrink-0" />
        )}

        <Button
          variant="ghost"
          className={cn(
            "flex-1 justify-start gap-2 px-2 py-1.5 h-auto font-normal min-w-0",
            isSelected && "bg-accent text-accent-foreground",
          )}
          style={{ paddingLeft: `${level * 12 + 8}px` }}
          onClick={() => onSelectFolder(folder.id)}
        >
          {isSelected ? (
            <FolderOpen className="h-4 w-4 text-primary flex-shrink-0" />
          ) : (
            <Folder className="h-4 w-4 text-muted-foreground flex-shrink-0" />
          )}
          <span className="flex-1 truncate text-sm min-w-0">{folder.name}</span>
          <span className="text-xs text-muted-foreground flex-shrink-0">{folder.fileCount}</span>
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              className="h-7 w-7 p-0 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0"
              onClick={(e) => e.stopPropagation()}
            >
              <MoreVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem
              className="text-destructive focus:text-destructive"
              onClick={(e) => {
                e.stopPropagation()
                onDeleteFolder(folder.id)
              }}
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Delete Folder
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {hasChildren && isExpanded && (
        <div>
          {folder.children!.map((child) => (
            <FolderItem
              key={child.id}
              folder={child}
              level={level + 1}
              selectedFolder={selectedFolder}
              onSelectFolder={onSelectFolder}
              onDeleteFolder={onDeleteFolder}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export function FolderTree({ folders, selectedFolder, onSelectFolder, onDeleteFolder }: FolderTreeProps) {
  return (
    <div className="space-y-1">
      <Button
        variant="ghost"
        className={cn(
          "w-full justify-start gap-2 px-2 py-1.5 h-auto font-normal min-w-0",
          selectedFolder === null && "bg-accent text-accent-foreground",
        )}
        onClick={() => onSelectFolder(null)}
      >
        <Folder className="h-4 w-4 text-muted-foreground flex-shrink-0" />
        <span className="flex-1 text-sm">All Files</span>
      </Button>

      {folders.map((folder) => (
        <FolderItem
          key={folder.id}
          folder={folder}
          selectedFolder={selectedFolder}
          onSelectFolder={onSelectFolder}
          onDeleteFolder={onDeleteFolder}
        />
      ))}
    </div>
  )
}
