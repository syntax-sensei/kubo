"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Database, Zap, Palette, BarChart3, MessageSquare, Menu, X, Sparkles, ChevronLeft } from "lucide-react"
import { Button } from "@/components/ui/button"

const navigation = [
  {
    name: "Knowledge Base",
    href: "/knowledge",
    icon: Database,
    description: "Manage your content sources",
  },
  {
    name: "Integrations",
    href: "/integrations",
    icon: Zap,
    description: "Connect external tools",
  },
  {
    name: "Chatbot Studio",
    href: "/studio",
    icon: Palette,
    description: "Customize your bot",
  },
  {
    name: "Analytics",
    href: "/analytics",
    icon: BarChart3,
    description: "View insights & metrics",
  },
  {
    name: "Conversations",
    href: "/conversations",
    icon: MessageSquare,
    description: "AI coaching & feedback",
  },
]

interface SidebarProps {
  isCollapsed: boolean
  onToggleCollapse: () => void
}

export function Sidebar({ isCollapsed, onToggleCollapse }: SidebarProps) {
  const pathname = usePathname()
  const [isMobileOpen, setIsMobileOpen] = useState(false)

  return (
    <>
      {/* Mobile menu button */}
      <Button
        variant="ghost"
        size="icon"
        className="fixed top-4 left-4 z-50 lg:hidden"
        onClick={() => setIsMobileOpen(!isMobileOpen)}
      >
        {isMobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </Button>

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed left-0 top-0 z-40 h-screen border-r border-sidebar-border bg-sidebar transition-all duration-300 ease-in-out",
          isCollapsed ? "w-20" : "w-64",
          isMobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0",
        )}
      >
        <div className="flex h-full flex-col">
          {/* Logo */}
          <div className="flex h-16 items-center gap-2 border-b border-sidebar-border px-6">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary">
              <Sparkles className="h-5 w-5 text-primary-foreground" />
            </div>
            {!isCollapsed && <span className="font-sans text-lg font-semibold text-sidebar-foreground">SupportAI</span>}
          </div>

          {/* Navigation */}
          <nav className="flex-1 space-y-1 overflow-y-auto p-4">
            {navigation.map((item) => {
              const isActive = pathname === item.href
              const Icon = item.icon

              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsMobileOpen(false)}
                  className={cn(
                    "group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200",
                    isActive
                      ? "bg-sidebar-accent text-sidebar-accent-foreground shadow-sm"
                      : "text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground",
                    isCollapsed && "justify-center px-2",
                  )}
                  title={isCollapsed ? item.name : undefined}
                >
                  <Icon
                    className={cn(
                      "h-5 w-5 shrink-0 transition-colors",
                      isActive ? "text-primary" : "text-muted-foreground group-hover:text-primary",
                    )}
                  />
                  {!isCollapsed && (
                    <div className="flex flex-col">
                      <span>{item.name}</span>
                      {isActive && <span className="text-xs text-muted-foreground">{item.description}</span>}
                    </div>
                  )}
                </Link>
              )
            })}
          </nav>

          {/* User section */}
          <div className="border-t border-sidebar-border p-4">
            <div
              className={cn(
                "flex items-center gap-3 rounded-lg bg-sidebar-accent/30 px-3 py-2.5",
                isCollapsed && "justify-center px-2",
              )}
            >
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-semibold text-primary-foreground">
                JD
              </div>
              {!isCollapsed && (
                <div className="flex-1 text-sm">
                  <div className="font-medium text-sidebar-foreground">John Doe</div>
                  <div className="text-xs text-muted-foreground">john@company.com</div>
                </div>
              )}
            </div>
          </div>
        </div>

        <Button
          variant="ghost"
          size="icon"
          className="absolute -right-3 top-20 hidden h-6 w-6 rounded-full border border-sidebar-border bg-sidebar shadow-md hover:bg-sidebar-accent lg:flex"
          onClick={onToggleCollapse}
        >
          <ChevronLeft className={cn("h-4 w-4 transition-transform", isCollapsed && "rotate-180")} />
        </Button>
      </aside>

      {/* Mobile overlay */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 z-30 bg-background/80 backdrop-blur-sm lg:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}
    </>
  )
}
