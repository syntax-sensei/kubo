"use client"

import type { ReactNode } from "react"
import { useState } from "react"
import { Sidebar } from "./sidebar"
import { cn } from "@/lib/utils"

interface DashboardLayoutProps {
  children: ReactNode
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const [isCollapsed, setIsCollapsed] = useState(false)

  return (
    <div className="min-h-screen bg-background">
      <Sidebar isCollapsed={isCollapsed} onToggleCollapse={() => setIsCollapsed(!isCollapsed)} />
      <main className={cn("transition-all duration-300", isCollapsed ? "lg:pl-20" : "lg:pl-64")}>
        <div className="mx-auto max-w-7xl p-4 sm:p-6 lg:p-8">{children}</div>
      </main>
    </div>
  )
}
