"use client"
import { useState } from "react"
import ExamPanelHeader from "./components/header"
import ExamList from "./components/exam-list"
import ExamFilters from "./components/filters"
import ExamStats from "./components/stats"
import { useExamPanel } from "./hooks/useExamPanel"

const ExamPanel = () => {
  const [activeFilter, setActiveFilter] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [viewMode, setViewMode] = useState("grid")

  const { exams, loading, stats, refreshData, handleExamStart, handleExamResume } = useExamPanel()

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Header */}
        <ExamPanelHeader
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          viewMode={viewMode}
          setViewMode={setViewMode}
          onRefresh={refreshData}
        />

        {/* Stats Overview */}
        <ExamStats stats={stats} />

        {/* Filters */}
        <ExamFilters activeFilter={activeFilter} setActiveFilter={setActiveFilter} examCounts={stats} />

        {/* Exam List */}
        <ExamList
          exams={exams}
          loading={loading}
          viewMode={viewMode}
          activeFilter={activeFilter}
          searchQuery={searchQuery}
          onExamStart={handleExamStart}
          onExamResume={handleExamResume}
        />
      </div>
    </div>
  )
}

export default ExamPanel
