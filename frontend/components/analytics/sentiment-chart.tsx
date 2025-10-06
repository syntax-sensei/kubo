"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { PolarAngleAxis, PolarGrid, Radar, RadarChart, ResponsiveContainer } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

const data = [
  { category: "Positive", value: 78 },
  { category: "Neutral", value: 15 },
  { category: "Negative", value: 7 },
]

const chartConfig = {
  value: {
    label: "Sentiment",
    color: "hsl(var(--chart-1))",
  },
}

export function SentimentChart() {
  return (
    <Card className="min-w-0">
      <CardHeader>
        <CardTitle>Sentiment Analysis</CardTitle>
        <CardDescription>Customer satisfaction breakdown</CardDescription>
      </CardHeader>
      <CardContent className="overflow-hidden">
        <ChartContainer config={chartConfig} className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart data={data}>
              <PolarGrid className="stroke-muted" />
              <PolarAngleAxis dataKey="category" className="text-xs" />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Radar
                name="Sentiment"
                dataKey="value"
                stroke="hsl(var(--chart-1))"
                fill="hsl(var(--chart-1))"
                fillOpacity={0.6}
              />
            </RadarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
