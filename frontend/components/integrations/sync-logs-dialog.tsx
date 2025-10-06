"use client"

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { CheckCircle2, XCircle, Clock } from "lucide-react"

interface SyncLog {
  id: string
  integration: string
  timestamp: string
  status: "success" | "error" | "pending"
  message: string
  itemsProcessed?: number
}

interface SyncLogsDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  logs: SyncLog[]
}

export function SyncLogsDialog({ open, onOpenChange, logs }: SyncLogsDialogProps) {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "success":
        return <CheckCircle2 className="h-4 w-4 text-green-600" />
      case "error":
        return <XCircle className="h-4 w-4 text-red-600" />
      case "pending":
        return <Clock className="h-4 w-4 text-blue-600" />
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Sync Logs</DialogTitle>
          <DialogDescription>View recent synchronization activity across all integrations</DialogDescription>
        </DialogHeader>

        <ScrollArea className="h-[400px] pr-4">
          <div className="space-y-3">
            {logs.map((log) => (
              <div key={log.id} className="flex gap-3 rounded-lg border border-border p-3">
                <div className="mt-0.5">{getStatusIcon(log.status)}</div>
                <div className="flex-1 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-sm">{log.integration}</span>
                    <span className="text-xs text-muted-foreground">{log.timestamp}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{log.message}</p>
                  {log.itemsProcessed && (
                    <Badge variant="secondary" className="text-xs">
                      {log.itemsProcessed} items processed
                    </Badge>
                  )}
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  )
}
