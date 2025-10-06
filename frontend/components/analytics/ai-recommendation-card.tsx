"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Sparkles, ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"

interface Recommendation {
  id: string
  title: string
  description: string
  priority: "high" | "medium" | "low"
  action: string
}

interface AIRecommendationCardProps {
  recommendations: Recommendation[]
  onActionClick: (id: string) => void
}

export function AIRecommendationCard({ recommendations, onActionClick }: AIRecommendationCardProps) {
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "border-red-200 bg-red-50 text-red-700"
      case "medium":
        return "border-orange-200 bg-orange-50 text-orange-700"
      default:
        return "border-blue-200 bg-blue-50 text-blue-700"
    }
  }

  return (
    <Card className="sticky top-6">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-primary" />
          AI Recommendations
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {recommendations.map((rec) => (
          <div
            key={rec.id}
            className={cn(
              "space-y-3 rounded-lg border p-4 transition-all hover:shadow-md",
              rec.priority === "high" && "animate-pulse",
            )}
          >
            <div className="flex items-start justify-between gap-2">
              <h4 className="font-medium text-sm leading-tight">{rec.title}</h4>
              <Badge variant="outline" className={getPriorityColor(rec.priority)}>
                {rec.priority}
              </Badge>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">{rec.description}</p>
            <Button
              size="sm"
              variant="outline"
              className="w-full gap-2 bg-transparent"
              onClick={() => onActionClick(rec.id)}
            >
              {rec.action}
              <ArrowRight className="h-3 w-3" />
            </Button>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
