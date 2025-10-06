"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { PageHeader } from "@/components/page-header"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ConversationThread } from "@/components/coach/conversation-thread"
import { AIFeedbackPanel } from "@/components/coach/ai-feedback-panel"
import { TrainingScenarioCard } from "@/components/coach/training-scenario-card"
import { RefreshCw, GraduationCap } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

const sampleConversation = [
  {
    id: "1",
    role: "user" as const,
    content: "How do I reset my password?",
    timestamp: "2:34 PM",
  },
  {
    id: "2",
    role: "assistant" as const,
    content:
      "To reset your password, click on 'Forgot Password' on the login page and follow the instructions sent to your email.",
    timestamp: "2:34 PM",
    score: 85,
  },
  {
    id: "3",
    role: "user" as const,
    content: "I didn't receive any email",
    timestamp: "2:35 PM",
  },
  {
    id: "4",
    role: "assistant" as const,
    content: "Check your spam folder. If it's not there, I can resend it.",
    timestamp: "2:35 PM",
    score: 65,
  },
  {
    id: "5",
    role: "user" as const,
    content: "Still nothing. This is frustrating!",
    timestamp: "2:36 PM",
  },
  {
    id: "6",
    role: "assistant" as const,
    content: "I understand your frustration. Let me help you directly. Can you provide your email address?",
    timestamp: "2:36 PM",
    score: 92,
  },
]

const feedbackData = {
  "2": {
    score: 85,
    strengths: ["Clear step-by-step instructions", "Professional tone"],
    improvements: ["Could offer alternative solutions upfront", "Missing empathy for user's situation"],
    suggestion:
      "Try: 'I understand password issues can be frustrating. To reset your password, click 'Forgot Password' on the login page. If you don't receive the email within 5 minutes, please check your spam folder or let me know so I can help you directly.'",
  },
  "4": {
    score: 65,
    strengths: ["Provided troubleshooting step", "Offered to help further"],
    improvements: ["Too brief and transactional", "Didn't acknowledge user's concern", "Could be more proactive"],
    suggestion:
      "Try: 'I apologize for the inconvenience. Let's check your spam folder first - sometimes our emails end up there. If you still don't see it after checking, I'll personally resend it to you right away and make sure it goes through.'",
  },
  "6": {
    score: 92,
    strengths: [
      "Acknowledged user's emotion",
      "Took ownership of the problem",
      "Offered direct assistance",
      "Clear next step",
    ],
    improvements: ["Could mention expected resolution time"],
    suggestion:
      "Excellent response! To make it even better, add: 'I'll have this resolved for you within the next few minutes.'",
  },
}

const trainingScenarios = [
  {
    id: "1",
    title: "Handling Angry Customers",
    description: "Learn de-escalation techniques and empathy-driven responses",
    difficulty: "advanced" as const,
    duration: "15 min",
    objective: "Score 85+",
  },
  {
    id: "2",
    title: "Technical Troubleshooting",
    description: "Guide users through complex technical issues step-by-step",
    difficulty: "intermediate" as const,
    duration: "10 min",
    objective: "Score 80+",
  },
  {
    id: "3",
    title: "Product Recommendations",
    description: "Practice suggesting the right products based on customer needs",
    difficulty: "beginner" as const,
    duration: "8 min",
    objective: "Score 75+",
  },
  {
    id: "4",
    title: "Billing Disputes",
    description: "Handle sensitive billing conversations with professionalism",
    difficulty: "advanced" as const,
    duration: "12 min",
    objective: "Score 90+",
  },
]

export default function CoachPage() {
  const [selectedMessageId, setSelectedMessageId] = useState<string | null>(null)
  const { toast } = useToast()

  const selectedFeedback = selectedMessageId ? feedbackData[selectedMessageId as keyof typeof feedbackData] : null

  const handleApplySuggestion = () => {
    toast({
      title: "Suggestion applied!",
      description: "The improved response has been saved to your knowledge base",
    })
  }

  const handleStartScenario = (id: string) => {
    const scenario = trainingScenarios.find((s) => s.id === id)
    toast({
      title: "Starting scenario",
      description: `Loading "${scenario?.title}"...`,
    })
  }

  const handleAnalyzeNew = () => {
    toast({
      title: "Analyzing conversations",
      description: "Finding recent conversations to review...",
    })
  }

  return (
    <DashboardLayout>
      <PageHeader
        title="AI Conversation Coach"
        description="Get real-time feedback and improve your chatbot responses"
        action={
          <Button variant="outline" className="gap-2 bg-transparent" onClick={handleAnalyzeNew}>
            <RefreshCw className="h-4 w-4" />
            Analyze New
          </Button>
        }
      />

      <Tabs defaultValue="review" className="space-y-6">
        <TabsList>
          <TabsTrigger value="review">Review Conversations</TabsTrigger>
          <TabsTrigger value="training">Training Scenarios</TabsTrigger>
        </TabsList>

        <TabsContent value="review" className="space-y-6">
          <div className="grid gap-6 lg:grid-cols-2">
            {/* Conversation thread */}
            <div className="space-y-4">
              <h3 className="font-semibold text-lg">Recent Conversation</h3>
              <ConversationThread
                messages={sampleConversation}
                selectedMessageId={selectedMessageId || undefined}
                onSelectMessage={setSelectedMessageId}
              />
            </div>

            {/* AI feedback */}
            <div className="space-y-4">
              <h3 className="font-semibold text-lg">AI Analysis</h3>
              <AIFeedbackPanel feedback={selectedFeedback} onApplySuggestion={handleApplySuggestion} />
            </div>
          </div>
        </TabsContent>

        <TabsContent value="training" className="space-y-6">
          <div className="rounded-lg border border-border bg-muted/30 p-6">
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                <GraduationCap className="h-6 w-6 text-primary" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-lg">Practice Makes Perfect</h3>
                <p className="mt-1 text-sm text-muted-foreground leading-relaxed">
                  Train your chatbot with realistic scenarios. Each scenario provides instant AI feedback to help you
                  improve response quality and customer satisfaction.
                </p>
              </div>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {trainingScenarios.map((scenario) => (
              <TrainingScenarioCard
                key={scenario.id}
                title={scenario.title}
                description={scenario.description}
                difficulty={scenario.difficulty}
                duration={scenario.duration}
                objective={scenario.objective}
                onStart={() => handleStartScenario(scenario.id)}
              />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  )
}
