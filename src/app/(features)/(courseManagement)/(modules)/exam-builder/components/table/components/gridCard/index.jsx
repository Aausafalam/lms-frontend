"use client"
import { useNavigation } from "@/components/navigation"
import { useParams } from "next/navigation"
import { Calendar, Clock, Code, BookOpen, CheckCircle, Tag } from "lucide-react"

export default function ExamBuilderCard({ data }) {
  const { navigate } = useNavigation()
  const { courseId } = useParams()

  const handleCardClick = () => {
    navigate(`/exam-builder/details/${data.id}?courseId=${courseId}`)
  }

  // Helper function to get status color and styles
  const getStatusStyles = (status) => {
    switch (status?.toUpperCase()) {
      case "PUBLISHED":
        return {
          bg: "bg-emerald-50 border border-emerald-200",
          text: "text-emerald-700",
          dot: "bg-emerald-500",
        }
      case "SCHEDULED":
        return {
          bg: "bg-blue-50 border border-blue-200",
          text: "text-blue-700",
          dot: "bg-blue-500",
        }
      case "DRAFT":
        return {
          bg: "bg-amber-50 border border-amber-200",
          text: "text-amber-700",
          dot: "bg-amber-500",
        }
      case "COMPLETED":
        return {
          bg: "bg-gray-50 border border-gray-200",
          text: "text-gray-700",
          dot: "bg-gray-500",
        }
      default:
        return {
          bg: "bg-gray-50 border border-gray-200",
          text: "text-gray-700",
          dot: "bg-gray-500",
        }
    }
  }

  const statusStyles = getStatusStyles(data.status)
  const formatDate = (dateString) => {
    if (!dateString) return "Not set"
    return new Date(dateString).toLocaleDateString()
  }

  const formatTime = (timeString) => {
    if (!timeString) return "Not set"
    return timeString
  }

  return (
    <div
      className="group relative h-full overflow-hidden rounded-xl bg-white shadow-md border border-gray-200/60 transition-all duration-400 hover:shadow-2xl hover:shadow-orange-500/8 hover:border-orange-300/60 dark:bg-gray-900/95 dark:border-gray-800/60 dark:hover:border-orange-500/40 cursor-pointer backdrop-blur-sm"
      onClick={handleCardClick}
    >
      {/* Header Section */}
      <div className="relative p-3 pb-0">
        <div className="flex justify-between items-start mb-3">
          {/* Status Badge */}
          <div
            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium ${statusStyles.bg} ${statusStyles.text} transition-all duration-300`}
          >
            <div className={`w-1.5 h-1.5 rounded-full ${statusStyles.dot}`} />
            <span className="capitalize">{data.status?.toLowerCase() || "draft"}</span>
          </div>

          {/* Published Badge */}
          {data.isPublished && (
            <div className="inline-flex items-center gap-1 bg-green-50 border border-green-200 text-green-700 px-2 py-1 rounded-md text-xs font-medium">
              <CheckCircle className="w-3 h-3" />
              <span>Live</span>
            </div>
          )}
        </div>

        {/* Title */}
        <h3 className="text-sm font-semibold leading-tight text-gray-900 dark:text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-orange-600 group-hover:to-pink-600 group-hover:bg-clip-text transition-all duration-300 mb-2 line-clamp-2">
          {data.name || "Untitled Exam"}
        </h3>

        {/* Exam Code */}
        <div className="flex items-center gap-1 mb-2">
          <Code className="w-3 h-3 text-gray-500 dark:text-gray-400" />
          <span className="text-xs text-gray-600 dark:text-gray-400 font-mono">{data.examCode || "No code"}</span>
        </div>

        {/* Description */}
        <p className="text-xs leading-relaxed text-gray-600 dark:text-gray-400 mb-3 line-clamp-2 group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors duration-300">
          {data.description || "No description provided for this exam."}
        </p>
      </div>

      {/* Stats Section */}
      <div className="px-2 pb-2">
        <div className="p-2 rounded-lg bg-gradient-to-r from-gray-50 to-slate-50 dark:from-gray-800/50 dark:to-slate-800/30 group-hover:from-gray-100 group-hover:to-slate-100 dark:group-hover:from-gray-800/70 dark:group-hover:to-slate-800/50 transition-all duration-300 border border-gray-100 dark:border-gray-700">
          {/* Exam Details */}
          <div className="grid grid-cols-2 gap-3 mb-3">
            <div className="flex items-center gap-2">
              <div className="flex items-center justify-center w-6 h-6 rounded-md bg-slate-100 border border-slate-200 dark:bg-slate-800 dark:border-slate-700">
                <BookOpen className="w-3.5 h-3.5 text-slate-600 dark:text-slate-400" />
              </div>
              <div>
                <p className="text-xs font-semibold text-gray-900 dark:text-white capitalize">
                  {data.examType || "N/A"}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 -mt-0.5">Type</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <div className="flex items-center justify-center w-6 h-6 rounded-md bg-slate-100 border border-slate-200 dark:bg-slate-800 dark:border-slate-700">
                <Clock className="w-3.5 h-3.5 text-slate-600 dark:text-slate-400" />
              </div>
              <div>
                <p className="text-xs font-semibold text-gray-900 dark:text-white">{data.durationInMinutes || 0}m</p>
                <p className="text-xs text-gray-500 dark:text-gray-400 -mt-0.5">Duration</p>
              </div>
            </div>
          </div>

          {/* Schedule Info */}
          <div className="space-y-1">
            <div className="flex items-center justify-between text-xs">
              <span className="text-gray-600 dark:text-gray-400 flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                Start:
              </span>
              <span className="font-medium text-gray-900 dark:text-white">
                {formatDate(data.startDate)} {formatTime(data.startTime)}
              </span>
            </div>

            {data.endTime && (
              <div className="flex items-center justify-between text-xs">
                <span className="text-gray-600 dark:text-gray-400">End:</span>
                <span className="font-medium text-gray-900 dark:text-white">{formatTime(data.endTime)}</span>
              </div>
            )}
          </div>

          {/* Tags */}
          {data.tags && data.tags.length > 0 && (
            <div className="mt-2 pt-2 border-t border-gray-200 dark:border-gray-600">
              <div className="flex flex-wrap gap-1">
                {data.tags.slice(0, 2).map((tag, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-xs bg-orange-50 text-orange-700 border border-orange-200"
                  >
                    <Tag className="w-2.5 h-2.5" />
                    {tag}
                  </span>
                ))}
                {data.tags.length > 2 && (
                  <span className="text-xs text-gray-500 dark:text-gray-400">+{data.tags.length - 2} more</span>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
