"use client"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, CheckCircle, Clock, AlertTriangle, Play, Pause } from "lucide-react"

const ExamFilters = ({ activeFilter, setActiveFilter, examCounts }) => {
  const filters = [
    {
      id: "all",
      label: "All Exams",
      icon: Calendar,
      count: examCounts?.total || 0,
      color: "bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600",
    },
    {
      id: "upcoming",
      label: "Upcoming",
      icon: Clock,
      count: examCounts?.upcoming || 0,
      color:
        "bg-orange-100 text-orange-700 hover:bg-orange-200 dark:bg-orange-950/30 dark:text-orange-300 dark:hover:bg-orange-950/50",
    },
    {
      id: "live",
      label: "Live Now",
      icon: Play,
      count: examCounts?.live || 0,
      color: "bg-red-100 text-red-700 hover:bg-red-200 dark:bg-red-950/30 dark:text-red-300 dark:hover:bg-red-950/50",
    },
    {
      id: "in-progress",
      label: "In Progress",
      icon: Pause,
      count: examCounts?.inProgress || 0,
      color:
        "bg-blue-100 text-blue-700 hover:bg-blue-200 dark:bg-blue-950/30 dark:text-blue-300 dark:hover:bg-blue-950/50",
    },
    {
      id: "completed",
      label: "Completed",
      icon: CheckCircle,
      count: examCounts?.completed || 0,
      color:
        "bg-green-100 text-green-700 hover:bg-green-200 dark:bg-green-950/30 dark:text-green-300 dark:hover:bg-green-950/50",
    },
    {
      id: "missed",
      label: "Missed",
      icon: AlertTriangle,
      count: examCounts?.missed || 0,
      color:
        "bg-yellow-100 text-yellow-700 hover:bg-yellow-200 dark:bg-yellow-950/30 dark:text-yellow-300 dark:hover:bg-yellow-950/50",
    },
  ]

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-4 mb-6">
      <div className="flex flex-wrap gap-2">
        {filters.map((filter) => (
          <Button
            key={filter.id}
            variant={activeFilter === filter.id ? "default" : "ghost"}
            size="sm"
            onClick={() => setActiveFilter(filter.id)}
            className={`h-10 px-4 ${
              activeFilter === filter.id ? "bg-orange-500 hover:bg-orange-600 text-white" : filter.color
            } transition-all duration-200`}
          >
            <filter.icon className="h-4 w-4 mr-2" />
            <span className="font-medium">{filter.label}</span>
            {filter.count > 0 && (
              <Badge
                className={`ml-2 h-5 px-1.5 text-xs ${
                  activeFilter === filter.id
                    ? "bg-white/20 text-white hover:bg-white/30"
                    : "bg-gray-200 text-gray-700 dark:bg-gray-600 dark:text-gray-300"
                }`}
              >
                {filter.count}
              </Badge>
            )}
          </Button>
        ))}
      </div>
    </div>
  )
}

export default ExamFilters
