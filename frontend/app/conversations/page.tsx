import { DashboardLayout } from "@/components/dashboard-layout"
import { PageHeader } from "@/components/page-header"

export default function ConversationsPage() {
  return (
    <DashboardLayout>
      <PageHeader title="AI Conversation Coach" description="Review recent interactions and improve responses" />
      <div className="text-muted-foreground">Conversations content coming soon...</div>
    </DashboardLayout>
  )
}
