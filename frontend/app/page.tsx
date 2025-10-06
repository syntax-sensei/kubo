import { DashboardLayout } from "@/components/dashboard-layout"
import { PageHeader } from "@/components/page-header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Database, Zap, Palette, BarChart3, MessageSquare, ArrowRight } from "lucide-react"

const features = [
  {
    title: "Knowledge Base",
    description: "Upload documents, add URLs, and manage your content sources",
    icon: Database,
    href: "/knowledge",
    color: "text-blue-600",
    bgColor: "bg-blue-50",
  },
  {
    title: "Auto-Sync Integrations",
    description: "Connect Zendesk, Notion, Intercom, and more for real-time updates",
    icon: Zap,
    href: "/integrations",
    color: "text-purple-600",
    bgColor: "bg-purple-50",
  },
  {
    title: "Chatbot Studio",
    description: "Customize your bot's appearance, tone, and behavior",
    icon: Palette,
    href: "/studio",
    color: "text-pink-600",
    bgColor: "bg-pink-50",
  },
  {
    title: "Analytics Dashboard",
    description: "Track performance, sentiment, and get AI-driven insights",
    icon: BarChart3,
    href: "/analytics",
    color: "text-green-600",
    bgColor: "bg-green-50",
  },
  {
    title: "AI Conversation Coach",
    description: "Review interactions and improve responses with AI feedback",
    icon: MessageSquare,
    href: "/conversations",
    color: "text-orange-600",
    bgColor: "bg-orange-50",
  },
]

export default function HomePage() {
  return (
    <DashboardLayout>
      <PageHeader
        title="Welcome to SupportAI"
        description="Your AI-powered customer support platform"
        action={
          <Button size="lg" className="gap-2">
            Get Started
            <ArrowRight className="h-4 w-4" />
          </Button>
        }
      />

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {features.map((feature) => {
          const Icon = feature.icon
          return (
            <Card
              key={feature.title}
              className="group cursor-pointer transition-all duration-200 hover:shadow-lg hover:-translate-y-1"
            >
              <CardHeader>
                <div className={`mb-3 flex h-12 w-12 items-center justify-center rounded-xl ${feature.bgColor}`}>
                  <Icon className={`h-6 w-6 ${feature.color}`} />
                </div>
                <CardTitle className="text-xl">{feature.title}</CardTitle>
                <CardDescription className="text-base leading-relaxed">{feature.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="ghost" className="gap-2 px-0 text-primary group-hover:gap-3 transition-all">
                  Explore
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Quick stats */}
      <div className="mt-12 grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Total Conversations</CardDescription>
            <CardTitle className="text-3xl font-semibold">1,234</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              <span className="text-green-600 font-medium">+12%</span> from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Resolution Rate</CardDescription>
            <CardTitle className="text-3xl font-semibold">87%</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              <span className="text-green-600 font-medium">+5%</span> from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Avg Response Time</CardDescription>
            <CardTitle className="text-3xl font-semibold">2.3s</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              <span className="text-green-600 font-medium">-0.5s</span> from last month
            </p>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
