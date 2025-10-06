"use client"

import { DashboardLayout } from "@/components/dashboard-layout"
import { PageHeader } from "@/components/page-header"
import { Button } from "@/components/ui/button"
import { MetricCard } from "@/components/analytics/metric-card"
import { AIRecommendationCard } from "@/components/analytics/ai-recommendation-card"
import { PerformanceChart } from "@/components/analytics/performance-chart"
import { SentimentChart } from "@/components/analytics/sentiment-chart"
import { TrendingTopics } from "@/components/analytics/trending-topics"
import { Download, MessageSquare, CheckCircle2, Clock, Smile } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

const recommendations = [
  {
    id: "1",
    title: "Users confused about pricing",
    description:
      "15% of queries mention pricing confusion. Consider updating your pricing FAQ with clearer tier comparisons.",
    priority: "high" as const,
    action: "Update FAQ",
  },
  {
    id: "2",
    title: "API documentation requests",
    description: "Growing interest in API integration. Add more code examples to your knowledge base.",
    priority: "medium" as const,
    action: "Add Examples",
  },
  {
    id: "3",
    title: "Positive feedback on response time",
    description: "Users are praising quick responses. Keep up the good work!",
    priority: "low" as const,
    action: "View Feedback",
  },
]

export default function AnalyticsPage() {
  const { toast } = useToast()

  const handleRecommendationAction = (id: string) => {
    const rec = recommendations.find((r) => r.id === id)
    toast({
      title: "Taking action",
      description: `Navigating to ${rec?.action}...`,
    })
  }

  const handleExport = () => {
    toast({
      title: "Exporting data",
      description: "Your analytics report will be ready shortly",
    })
  }

  return (
    <DashboardLayout>
      <PageHeader
        title="Analytics"
        description="View insights, metrics, and AI recommendations"
        action={
          <Button variant="outline" className="gap-2 bg-transparent" onClick={handleExport}>
            <Download className="h-4 w-4" />
            Export Report
          </Button>
        }
      />

      <div className="grid gap-6 xl:grid-cols-[1fr_350px]">
        <div className="min-w-0 space-y-6">
          {/* Key metrics */}
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <MetricCard
              title="Total Queries"
              value="1,234"
              change={12}
              trend="up"
              icon={<MessageSquare className="h-4 w-4" />}
            />
            <MetricCard
              title="Resolution Rate"
              value="87%"
              change={5}
              trend="up"
              icon={<CheckCircle2 className="h-4 w-4" />}
            />
            <MetricCard
              title="Avg Response Time"
              value="2.3s"
              change={-15}
              trend="up"
              icon={<Clock className="h-4 w-4" />}
            />
            <MetricCard
              title="Satisfaction Score"
              value="4.6/5"
              change={3}
              trend="up"
              icon={<Smile className="h-4 w-4" />}
            />
          </div>

          {/* Charts */}
          <div className="grid gap-6 min-w-0 lg:grid-cols-2">
            <PerformanceChart />
            <SentimentChart />
          </div>

          {/* Trending topics */}
          <TrendingTopics />
        </div>

        {/* AI Recommendations sidebar */}
        <div className="xl:sticky xl:top-6 xl:self-start">
          <AIRecommendationCard recommendations={recommendations} onActionClick={handleRecommendationAction} />
        </div>
      </div>
    </DashboardLayout>
  )
}
