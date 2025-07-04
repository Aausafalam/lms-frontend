"use client"
import ExamCard from "../exam-card"
import ExamListItem from "../exam-list-item"
import { EmptyState } from "@/components/emptyState"
import { Loader2, BookOpen, Search } from "lucide-react"
import { useExamFiltering } from "../../hooks/useExamFiltering"

const ExamList = ({ exams, loading, viewMode, activeFilter, searchQuery, onExamStart, onExamResume }) => {
  const filteredExams = useExamFiltering(exams, activeFilter, searchQuery)

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin text-orange-500 mx-auto mb-4" />
          <p className="text-gray-600 dark:text-gray-400">Loading exams...</p>
        </div>
      </div>
    )
  }

  if (filteredExams.length === 0) {
    const getEmptyStateProps = () => {
      if (searchQuery) {
        return {
          icon: Search,
          title: "No exams found",
          description: `No exams match your search "${searchQuery}". Try adjusting your search terms.`,
          actionLabel: "Clear Search",
          onAction: () => window.location.reload(),
        }
      }

      switch (activeFilter) {
        case "upcoming":
          return {
            icon: BookOpen,
            title: "No upcoming exams",
            description: "You don't have any upcoming exams scheduled. Check back later for new exams.",
          }
        case "completed":
          return {
            icon: BookOpen,
            title: "No completed exams",
            description: "You haven't completed any exams yet. Start taking exams to see your results here.",
          }
        case "in-progress":
          return {
            icon: BookOpen,
            title: "No exams in progress",
            description: "You don't have any exams currently in progress.",
          }
        default:
          return {
            icon: BookOpen,
            title: "No exams available",
            description: "There are no exams available at the moment. Check back later for new exams.",
          }
      }
    }

    const emptyStateProps = getEmptyStateProps()

    return (
      <EmptyState
        {...emptyStateProps}
        className="bg-orange-50/50 dark:bg-orange-950/10 border-orange-200 dark:border-orange-800/30"
      />
    )
  }

  return (
    <div className="space-y-6">
      {viewMode === "grid" ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredExams.map((exam) => (
            <ExamCard key={exam.id} exam={exam} onStart={onExamStart} onResume={onExamResume} />
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {filteredExams.map((exam) => (
            <ExamListItem key={exam.id} exam={exam} onStart={onExamStart} onResume={onExamResume} />
          ))}
        </div>
      )}
    </div>
  )
}

export default ExamList
