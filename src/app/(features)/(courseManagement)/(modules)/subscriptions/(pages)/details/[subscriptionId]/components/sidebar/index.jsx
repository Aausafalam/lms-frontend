"use client"

import { FileText, BookOpen, BarChart3, Settings } from "lucide-react"
import SidebarMenu from "@/components/sidebarMenu"

export function SidebarNavigation({ activeTab, setActiveTab }) {
  const navigationItems = [
    { id: "overview", label: "Overview", icon: <FileText className="h-4 w-4" /> },
    { id: "courses", label: "Courses", icon: <BookOpen className="h-4 w-4" /> },
    { id: "analytics", label: "Analytics", icon: <BarChart3 className="h-4 w-4" /> },
    { id: "settings", label: "Settings", icon: <Settings className="h-4 w-4" /> },
  ]

  return (
    <div className="sticky top-8 max-w-48">
      <SidebarMenu navigationItems={navigationItems} onClick={setActiveTab} activeSection={activeTab} />
    </div>
  )
}
