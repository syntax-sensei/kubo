"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendingUp } from "lucide-react"

const topics = [
  { name: "Pricing & Plans", count: 234, trend: 12 },
  { name: "Account Setup", count: 189, trend: 8 },
  { name: "API Integration", count: 156, trend: -3 },
  { name: "Billing Issues", count: 142, trend: 15 },
  { name: "Feature Requests", count: 98, trend: 5 },
]

export function TrendingTopics() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Trending Topics</CardTitle>
        <CardDescription>Most discussed topics this week</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {topics.map((topic, index) => (
            <div key={topic.name} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
                  {index + 1}
                </div>
                <div>
                  <div className="font-medium text-sm">{topic.name}</div>
                  <div className="text-xs text-muted-foreground">{topic.count} queries</div>
                </div>
              </div>
              <Badge variant={topic.trend > 0 ? "default" : "secondary"} className="gap-1">
                <TrendingUp className="h-3 w-3" />
                {topic.trend > 0 ? "+" : ""}
                {topic.trend}%
              </Badge>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
