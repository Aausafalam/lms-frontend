"use client"
import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  Clock,
  Calendar,
  Play,
  Pause,
  CheckCircle,
  AlertTriangle,
  Users,
  Timer,
  BookOpen,
  Award,
  Eye,
} from "lucide-react"
import { useNavigation } from "@/components/navigation"
import { formatDistanceToNow, format } from "date-fns"

const ExamCard = ({ exam, onStart, onResume }) => {
  const { navigate } = useNavigation()
  const [isHovered, setIsHovered] = useState(false)

  const getStatusConfig = (status) => {
    const configs = {
      upcoming: {
        color:
          "bg-orange-100 text-orange-700 border-orange-200 dark:bg-orange-950/30 dark:text-orange-300 dark:border-orange-800",
        icon: Clock,
        label: "Upcoming",
      },
      live: {
        color: "bg-red-100 text-red-700 border-red-200 dark:bg-red-950/30 dark:text-red-300 dark:border-red-800",
        icon: Play,
        label: "Live Now",
      },
      "in-progress": {
        color: "bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-950/30 dark:text-blue-300 dark:border-blue-800",
        icon: Pause,
        label: "In Progress",
      },
      completed: {
        color:
          "bg-green-100 text-green-700 border-green-200 dark:bg-green-950/30 dark:text-green-300 dark:border-green-800",
        icon: CheckCircle,
        label: "Completed",
      },
      missed: {
        color:
          "bg-yellow-100 text-yellow-700 border-yellow-200 dark:bg-yellow-950/30 dark:text-yellow-300 dark:border-yellow-800",
        icon: AlertTriangle,
        label: "Missed",
      },
    }
    return configs[status] || configs.upcoming
  }

  const statusConfig = getStatusConfig(exam.status)
  const StatusIcon = statusConfig.icon

  const handlePrimaryAction = () => {
    switch (exam.status) {
      case "live":
        onStart(exam.id)
        break
      case "in-progress":
        onResume(exam.id)
        break
      case "completed":
        navigate(`/exam-panel/results/${exam.id}`)
        break
      case "upcoming":
        navigate(`/exam-panel/details/${exam.id}`)
        break
      default:
        navigate(`/exam-panel/details/${exam.id}`)
    }
  }

  const getPrimaryActionText = () => {
    switch (exam.status) {
      case "live":
        return "Start Exam"
      case "in-progress":
        return "Resume"
      case "completed":
        return "View Results"
      case "upcoming":
        return "View Details"
      default:
        return "View Details"
    }
  }

  const getPrimaryActionIcon = () => {
    switch (exam.status) {
      case "live":
        return Play
      case "in-progress":
        return Pause
      case "completed":
        return Award
      case "upcoming":
        return Eye
      default:
        return Eye
    }
  }

  const PrimaryActionIcon = getPrimaryActionIcon()

  return (
    <Card
      className={`group relative overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-orange-500/10 border-gray-200 dark:border-gray-700 ${
        isHovered ? "border-orange-300 dark:border-orange-600" : ""
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <CardContent className="p-0">
        {/* Header */}
        <div className="relative p-4 pb-0">
          <div className="flex items-start justify-between mb-3">
            <Badge className={`${statusConfig.color} border`}>
              <StatusIcon className="h-3 w-3 mr-1" />
              {statusConfig.label}
            </Badge>
            {exam.isHighPriority && (
              <Badge className="bg-red-100 text-red-700 border-red-200 dark:bg-red-950/30 dark:text-red-300 dark:border-red-800">
                High Priority
              </Badge>
            )}
          </div>

          <h3 className="font-semibold text-gray-900 dark:text-white text-lg mb-2 line-clamp-2 group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors">
            {exam.name}
          </h3>

          <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 mb-4">{exam.description}</p>
        </div>

        {/* Exam Info */}
        <div className="px-4 pb-4">
          <div className="space-y-3">
            {/* Duration and Questions */}
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center text-gray-600 dark:text-gray-400">
                <Timer className="h-4 w-4 mr-2" />
                <span>{exam.duration} minutes</span>
              </div>
              <div className="flex items-center text-gray-600 dark:text-gray-400">
                <BookOpen className="h-4 w-4 mr-2" />
                <span>{exam.totalQuestions} questions</span>
              </div>
            </div>

            {/* Date and Time */}
            <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
              <Calendar className="h-4 w-4 mr-2" />
              <span>{exam.startDate ? format(new Date(exam.startDate), "MMM dd, yyyy 'at' HH:mm") : "Date TBD"}</span>
            </div>

            {/* Progress for in-progress exams */}
            {exam.status === "in-progress" && exam.progress && (
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">Progress</span>
                  <span className="font-medium text-gray-900 dark:text-white">
                    {exam.progress.answered}/{exam.totalQuestions}
                  </span>
                </div>
                <Progress value={(exam.progress.answered / exam.totalQuestions) * 100} className="h-2" />
              </div>
            )}

            {/* Score for completed exams */}
            {exam.status === "completed" && exam.score !== undefined && (
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">Score</span>
                  <span
                    className={`font-bold ${
                      exam.score >= 80
                        ? "text-green-600 dark:text-green-400"
                        : exam.score >= 60
                          ? "text-orange-600 dark:text-orange-400"
                          : "text-red-600 dark:text-red-400"
                    }`}
                  >
                    {exam.score}%
                  </span>
                </div>
                <Progress value={exam.score} className="h-2" />
              </div>
            )}

            {/* Participants */}
            {exam.participants && (
              <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                <Users className="h-4 w-4 mr-2" />
                <span>{exam.participants} participants</span>
              </div>
            )}

            {/* Time remaining for upcoming exams */}
            {exam.status === "upcoming" && exam.startDate && (
              <div className="flex items-center text-sm text-orange-600 dark:text-orange-400">
                <Clock className="h-4 w-4 mr-2" />
                <span>Starts {formatDistanceToNow(new Date(exam.startDate), { addSuffix: true })}</span>
              </div>
            )}
          </div>
        </div>

        {/* Action Button */}
        <div className="px-4 pb-4">
          <Button
            onClick={handlePrimaryAction}
            className={`w-full ${
              exam.status === "live"
                ? "bg-red-500 hover:bg-red-600 text-white"
                : exam.status === "in-progress"
                  ? "bg-blue-500 hover:bg-blue-600 text-white"
                  : "bg-orange-500 hover:bg-orange-600 text-white"
            } transition-all duration-200`}
            disabled={exam.status === "missed"}
          >
            <PrimaryActionIcon className="h-4 w-4 mr-2" />
            {getPrimaryActionText()}
          </Button>
        </div>
      </CardContent>

      {/* Hover Effect Overlay */}
      <div
        className={`absolute inset-0 bg-gradient-to-t from-orange-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none`}
      />
    </Card>
  )
}

export default ExamCard
