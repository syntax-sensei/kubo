"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Sparkles, ThumbsUp, ThumbsDown, AlertCircle, CheckCircle2, Lightbulb } from "lucide-react"

interface Feedback {
  score: number
  strengths: string[]
  improvements: string[]
  suggestion: string
}

interface AIFeedbackPanelProps {
  feedback: Feedback | null
  onApplySuggestion: () => void
}

export function AIFeedbackPanel({ feedback, onApplySuggestion }: AIFeedbackPanelProps) {
  if (!feedback) {
    return (
      <Card className="h-full">
        <CardContent className="flex h-full items-center justify-center p-12">
          <div className="text-center text-muted-foreground">
            <Sparkles className="mx-auto mb-3 h-12 w-12 opacity-50" />
            <p className="text-sm">Select a message to see AI feedback</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  const getScoreColor = () => {
    if (feedback.score >= 80) return "text-green-600"
    if (feedback.score >= 60) return "text-orange-600"
    return "text-red-600"
  }

  return (
    <Card className="h-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-primary" />
              AI Feedback
            </CardTitle>
            <CardDescription>Analysis and improvement suggestions</CardDescription>
          </div>
          <div className={`text-3xl font-bold ${getScoreColor()}`}>{feedback.score}/100</div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Strengths */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-sm font-semibold text-green-600">
            <CheckCircle2 className="h-4 w-4" />
            What Worked Well
          </div>
          <div className="space-y-2">
            {feedback.strengths.map((strength, index) => (
              <div key={index} className="flex items-start gap-2 rounded-lg bg-green-50 p-3 text-sm">
                <ThumbsUp className="mt-0.5 h-4 w-4 shrink-0 text-green-600" />
                <span className="text-green-900">{strength}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Improvements */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-sm font-semibold text-orange-600">
            <AlertCircle className="h-4 w-4" />
            Areas for Improvement
          </div>
          <div className="space-y-2">
            {feedback.improvements.map((improvement, index) => (
              <div key={index} className="flex items-start gap-2 rounded-lg bg-orange-50 p-3 text-sm">
                <ThumbsDown className="mt-0.5 h-4 w-4 shrink-0 text-orange-600" />
                <span className="text-orange-900">{improvement}</span>
              </div>
            ))}
          </div>
        </div>

        {/* AI Suggestion */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-sm font-semibold text-primary">
            <Lightbulb className="h-4 w-4" />
            AI Suggestion
          </div>
          <div className="rounded-lg border-2 border-primary/20 bg-primary/5 p-4">
            <p className="mb-4 text-sm leading-relaxed">{feedback.suggestion}</p>
            <Button className="w-full gap-2" onClick={onApplySuggestion}>
              <Sparkles className="h-4 w-4" />
              Apply This Suggestion
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
