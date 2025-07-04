"use client"

import { FileText, BookOpen, Target, PresentationIcon, GraduationCap } from "lucide-react"
import SidebarMenu from "@/components/sidebarMenu"

export function SidebarNavigation({ activeTab, setActiveTab }) {
  const navigationItems = [
    { id: "overview", label: "Overview", icon: <FileText className="h-4 w-4" /> },
    { id: "content", label: "Content", icon: <BookOpen className="h-4 w-4" /> },
    { id: "lessons", label: "Lessons", icon: <GraduationCap className="h-4 w-4" /> },
    { id: "assignments", label: "Assignments", icon: <PresentationIcon className="h-4 w-4" /> },
    { id: "quiz", label: "Quiz", icon: <Target className="h-4 w-4" /> },
  ]

  return (
    <div className="sticky top-8 max-w-48">
      <SidebarMenu navigationItems={navigationItems} onClick={setActiveTab} activeSection={activeTab} />
    </div>
  )
}
