"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { PageHeader } from "@/components/page-header"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { IntegrationCard } from "@/components/integrations/integration-card"
import { SyncLogsDialog } from "@/components/integrations/sync-logs-dialog"
import { History, RefreshCw } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface Integration {
  id: string
  name: string
  description: string
  logo: string
  status: "connected" | "syncing" | "failed" | "disconnected"
  autoLearn: boolean
}

const initialIntegrations: Integration[] = [
  {
    id: "zendesk",
    name: "Zendesk",
    description: "Sync support tickets and help articles",
    logo: "/zendesk-logo.png",
    status: "connected",
    autoLearn: true,
  },
  {
    id: "notion",
    name: "Notion",
    description: "Import documentation and knowledge base",
    logo: "/notion-logo.png",
    status: "syncing",
    autoLearn: true,
  },
  {
    id: "intercom",
    name: "Intercom",
    description: "Connect conversations and help center",
    logo: "/generic-chat-bubble-logo.png",
    status: "connected",
    autoLearn: false,
  },
  {
    id: "zoho",
    name: "Zoho Desk",
    description: "Integrate support tickets and articles",
    logo: "/zoho-logo.png",
    status: "disconnected",
    autoLearn: false,
  },
  {
    id: "confluence",
    name: "Confluence",
    description: "Sync team documentation and wikis",
    logo: "/confluence-logo.png",
    status: "failed",
    autoLearn: false,
  },
  {
    id: "slack",
    name: "Slack",
    description: "Learn from channel conversations",
    logo: "/slack-logo.png",
    status: "disconnected",
    autoLearn: false,
  },
]

const syncLogs = [
  {
    id: "1",
    integration: "Zendesk",
    timestamp: "2 minutes ago",
    status: "success" as const,
    message: "Successfully synced new articles",
    itemsProcessed: 12,
  },
  {
    id: "2",
    integration: "Notion",
    timestamp: "5 minutes ago",
    status: "pending" as const,
    message: "Syncing workspace pages...",
  },
  {
    id: "3",
    integration: "Intercom",
    timestamp: "1 hour ago",
    status: "success" as const,
    message: "Updated help center articles",
    itemsProcessed: 8,
  },
  {
    id: "4",
    integration: "Confluence",
    timestamp: "2 hours ago",
    status: "error" as const,
    message: "Authentication failed. Please reconnect.",
  },
  {
    id: "5",
    integration: "Zendesk",
    timestamp: "3 hours ago",
    status: "success" as const,
    message: "Synced ticket responses",
    itemsProcessed: 45,
  },
]

export default function IntegrationsPage() {
  const [integrations, setIntegrations] = useState<Integration[]>(initialIntegrations)
  const [showLogs, setShowLogs] = useState(false)
  const { toast } = useToast()

  const handleToggleAutoLearn = (id: string, enabled: boolean) => {
    setIntegrations(integrations.map((int) => (int.id === id ? { ...int, autoLearn: enabled } : int)))
    toast({
      title: enabled ? "Auto-learn enabled" : "Auto-learn disabled",
      description: `${integrations.find((i) => i.id === id)?.name} will ${enabled ? "now" : "no longer"} automatically sync new content`,
    })
  }

  const handleConnect = (id: string) => {
    setIntegrations(integrations.map((int) => (int.id === id ? { ...int, status: "syncing" } : int)))
    toast({
      title: "Connecting...",
      description: "Setting up integration",
    })

    // Simulate connection
    setTimeout(() => {
      setIntegrations(integrations.map((int) => (int.id === id ? { ...int, status: "connected" } : int)))
      toast({
        title: "Connected!",
        description: "Integration is now active",
      })
    }, 2000)
  }

  const handleSyncAll = () => {
    toast({
      title: "Syncing all integrations",
      description: "This may take a few minutes",
    })
  }

  const connectedCount = integrations.filter((i) => i.status === "connected").length
  const syncingCount = integrations.filter((i) => i.status === "syncing").length
  const autoLearnCount = integrations.filter((i) => i.autoLearn && i.status === "connected").length

  return (
    <DashboardLayout>
      <PageHeader
        title="Integrations"
        description="Connect external tools and enable auto-sync"
        action={
          <div className="flex gap-2">
            <Button variant="outline" className="gap-2 bg-transparent" onClick={() => setShowLogs(true)}>
              <History className="h-4 w-4" />
              View Logs
            </Button>
            <Button className="gap-2" onClick={handleSyncAll}>
              <RefreshCw className="h-4 w-4" />
              Sync All
            </Button>
          </div>
        }
      />

      {/* Stats */}
      <div className="mb-8 grid gap-4 md:grid-cols-3">
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-semibold">{connectedCount}</div>
            <p className="text-sm text-muted-foreground">Connected Integrations</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-semibold">{autoLearnCount}</div>
            <p className="text-sm text-muted-foreground">Auto-Learning Enabled</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-semibold">{syncingCount}</div>
            <p className="text-sm text-muted-foreground">Currently Syncing</p>
          </CardContent>
        </Card>
      </div>

      {/* Integration cards */}
      <div className="grid gap-6 md:grid-cols-2">
        {integrations.map((integration) => (
          <IntegrationCard
            key={integration.id}
            name={integration.name}
            description={integration.description}
            logo={integration.logo}
            status={integration.status}
            autoLearn={integration.autoLearn}
            onToggleAutoLearn={(enabled) => handleToggleAutoLearn(integration.id, enabled)}
            onConnect={() => handleConnect(integration.id)}
            onConfigure={() => {
              toast({
                title: "Configure integration",
                description: `Opening settings for ${integration.name}`,
              })
            }}
          />
        ))}
      </div>

      <SyncLogsDialog open={showLogs} onOpenChange={setShowLogs} logs={syncLogs} />
    </DashboardLayout>
  )
}
