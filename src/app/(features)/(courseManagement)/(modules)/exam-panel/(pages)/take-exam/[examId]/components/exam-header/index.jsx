"use client"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Clock, AlertTriangle, Send } from "lucide-react"
import { formatTime } from "../../../../../utils/timeUtils"

const ExamHeader = ({ exam, timeRemaining, onSubmit }) => {
  const [isTimeWarning, setIsTimeWarning] = useState(false)

  useEffect(() => {
    // Show warning when less than 10 minutes remaining
    setIsTimeWarning(timeRemaining <= 600) // 600 seconds = 10 minutes
  }, [timeRemaining])

  return (
    <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 py-4 sticky top-0 z-50">
      <div className="flex items-center justify-between">
        {/* Exam Info */}
        <div className="flex items-center gap-4">
          <div>
            <h1 className="text-xl font-bold text-gray-900 dark:text-white">{exam?.name}</h1>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {exam?.examCode} • {exam?.totalQuestions} Questions
            </p>
          </div>
          <Badge className="bg-green-100 text-green-700 border-green-200 dark:bg-green-950/30 dark:text-green-300 dark:border-green-800">
            In Progress
          </Badge>
        </div>

        {/* Timer and Actions */}
        <div className="flex items-center gap-4">
          {/* Timer */}
          <div
            className={`flex items-center gap-2 px-4 py-2 rounded-lg border ${
              isTimeWarning
                ? "bg-red-50 border-red-200 text-red-700 dark:bg-red-950/30 dark:border-red-800 dark:text-red-300"
                : "bg-gray-50 border-gray-200 text-gray-700 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300"
            }`}
          >
            <Clock className={`h-5 w-5 ${isTimeWarning ? "text-red-500" : "text-gray-500"}`} />
            <span className="font-mono text-lg font-bold">{formatTime(timeRemaining)}</span>
            {isTimeWarning && <AlertTriangle className="h-4 w-4 text-red-500" />}
          </div>

          {/* Submit Button */}
          <Button onClick={onSubmit} className="bg-orange-500 hover:bg-orange-600 text-white">
            <Send className="h-4 w-4 mr-2" />
            Submit Exam
          </Button>
        </div>
      </div>
    </div>
  )
}

export default ExamHeader
