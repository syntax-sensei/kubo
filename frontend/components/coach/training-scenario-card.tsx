"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Play, Clock, Target } from "lucide-react"

interface TrainingScenarioCardProps {
  title: string
  description: string
  difficulty: "beginner" | "intermediate" | "advanced"
  duration: string
  objective: string
  onStart: () => void
}

export function TrainingScenarioCard({
  title,
  description,
  difficulty,
  duration,
  objective,
  onStart,
}: TrainingScenarioCardProps) {
  const getDifficultyColor = () => {
    switch (difficulty) {
      case "beginner":
        return "border-green-200 bg-green-50 text-green-700"
      case "intermediate":
        return "border-orange-200 bg-orange-50 text-orange-700"
      case "advanced":
        return "border-red-200 bg-red-50 text-red-700"
    }
  }

  return (
    <Card className="group transition-all hover:shadow-lg">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-lg">{title}</CardTitle>
            <CardDescription className="mt-2">{description}</CardDescription>
          </div>
          <Badge variant="outline" className={getDifficultyColor()}>
            {difficulty}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            {duration}
          </div>
          <div className="flex items-center gap-1">
            <Target className="h-4 w-4" />
            {objective}
          </div>
        </div>
        <Button className="w-full gap-2 transition-transform group-hover:scale-105" onClick={onStart}>
          <Play className="h-4 w-4" />
          Start Scenario
        </Button>
      </CardContent>
    </Card>
  )
}
