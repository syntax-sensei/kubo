"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Area, AreaChart, CartesianGrid, XAxis, YAxis, ResponsiveContainer } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

const data = [
  { date: "Jan 1", answered: 45, unanswered: 12 },
  { date: "Jan 8", answered: 52, unanswered: 10 },
  { date: "Jan 15", answered: 61, unanswered: 8 },
  { date: "Jan 22", answered: 58, unanswered: 11 },
  { date: "Jan 29", answered: 67, unanswered: 7 },
  { date: "Feb 5", answered: 73, unanswered: 6 },
  { date: "Feb 12", answered: 81, unanswered: 5 },
]

const chartConfig = {
  answered: {
    label: "Answered",
    color: "hsl(var(--chart-1))",
  },
  unanswered: {
    label: "Unanswered",
    color: "hsl(var(--chart-2))",
  },
}

export function PerformanceChart() {
  return (
    <Card className="min-w-0">
      <CardHeader>
        <CardTitle>Query Performance</CardTitle>
        <CardDescription>Answered vs unanswered queries over time</CardDescription>
      </CardHeader>
      <CardContent className="overflow-hidden">
        <ChartContainer config={chartConfig} className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
              <XAxis dataKey="date" className="text-xs" />
              <YAxis className="text-xs" />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Area
                type="monotone"
                dataKey="answered"
                stackId="1"
                stroke="hsl(var(--chart-1))"
                fill="hsl(var(--chart-1))"
                fillOpacity={0.6}
              />
              <Area
                type="monotone"
                dataKey="unanswered"
                stackId="1"
                stroke="hsl(var(--chart-2))"
                fill="hsl(var(--chart-2))"
                fillOpacity={0.6}
              />
            </AreaChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
