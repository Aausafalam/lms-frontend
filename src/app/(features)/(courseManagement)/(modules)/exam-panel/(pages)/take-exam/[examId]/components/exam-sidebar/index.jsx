"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { CheckCircle, Circle, Flag, AlertCircle } from "lucide-react"

const ExamSidebar = ({
  questions,
  currentQuestionIndex,
  answers,
  onQuestionNavigation,
  isQuestionAnswered,
  isQuestionMarkedForReview,
}) => {
  const getQuestionStatus = (index) => {
    const questionId = questions[index]?.id
    const answered = isQuestionAnswered(index)
    const marked = isQuestionMarkedForReview(index)

    if (answered && marked) return "answered-marked"
    if (answered) return "answered"
    if (marked) return "marked"
    return "not-visited"
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case "answered":
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case "answered-marked":
        return <Flag className="h-4 w-4 text-purple-600" />
      case "marked":
        return <Flag className="h-4 w-4 text-yellow-600" />
      default:
        return <Circle className="h-4 w-4 text-gray-400" />
    }
  }

  const getStatusColor = (status, isCurrent) => {
    if (isCurrent) {
      return "bg-orange-500 text-white border-orange-500"
    }

    switch (status) {
      case "answered":
        return "bg-green-100 text-green-700 border-green-200 hover:bg-green-200 dark:bg-green-950/30 dark:text-green-300 dark:border-green-800"
      case "answered-marked":
        return "bg-purple-100 text-purple-700 border-purple-200 hover:bg-purple-200 dark:bg-purple-950/30 dark:text-purple-300 dark:border-purple-800"
      case "marked":
        return "bg-yellow-100 text-yellow-700 border-yellow-200 hover:bg-yellow-200 dark:bg-yellow-950/30 dark:text-yellow-300 dark:border-yellow-800"
      default:
        return "bg-gray-100 text-gray-700 border-gray-200 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600"
    }
  }

  const answeredCount = questions.filter((_, index) => isQuestionAnswered(index)).length
  const markedCount = questions.filter((_, index) => isQuestionMarkedForReview(index)).length
  const notVisitedCount = questions.length - answeredCount - markedCount

  return (
    <div className="h-full overflow-y-auto p-4 space-y-4">
      {/* Progress Overview */}
      <Card className="border-gray-200 dark:border-gray-700">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">Progress Overview</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600 dark:text-gray-400">Answered</span>
              <span className="font-medium">
                {answeredCount}/{questions.length}
              </span>
            </div>
            <Progress value={(answeredCount / questions.length) * 100} className="h-2" />
          </div>

          <div className="grid grid-cols-2 gap-3 text-sm">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <span className="text-gray-600 dark:text-gray-400">Answered: {answeredCount}</span>
            </div>
            <div className="flex items-center gap-2">
              <Flag className="h-4 w-4 text-yellow-600" />
              <span className="text-gray-600 dark:text-gray-400">Marked: {markedCount}</span>
            </div>
            <div className="flex items-center gap-2">
              <Circle className="h-4 w-4 text-gray-400" />
              <span className="text-gray-600 dark:text-gray-400">Not Visited: {notVisitedCount}</span>
            </div>
            <div className="flex items-center gap-2">
              <AlertCircle className="h-4 w-4 text-orange-600" />
              <span className="text-gray-600 dark:text-gray-400">Current: 1</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Question Navigation */}
      <Card className="border-gray-200 dark:border-gray-700">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">Question Navigation</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-5 gap-2">
            {questions.map((question, index) => {
              const status = getQuestionStatus(index)
              const isCurrent = index === currentQuestionIndex

              return (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  onClick={() => onQuestionNavigation(index)}
                  className={`h-10 w-10 p-0 relative ${getStatusColor(status, isCurrent)} transition-all duration-200`}
                >
                  <span className="font-medium">{index + 1}</span>
                  <div className="absolute -top-1 -right-1">{getStatusIcon(status)}</div>
                </Button>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Legend */}
      <Card className="border-gray-200 dark:border-gray-700">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">Legend</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="space-y-2 text-sm">
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 bg-green-100 border border-green-200 rounded flex items-center justify-center">
                <CheckCircle className="h-3 w-3 text-green-600" />
              </div>
              <span className="text-gray-600 dark:text-gray-400">Answered</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 bg-yellow-100 border border-yellow-200 rounded flex items-center justify-center">
                <Flag className="h-3 w-3 text-yellow-600" />
              </div>
              <span className="text-gray-600 dark:text-gray-400">Marked for Review</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 bg-purple-100 border border-purple-200 rounded flex items-center justify-center">
                <Flag className="h-3 w-3 text-purple-600" />
              </div>
              <span className="text-gray-600 dark:text-gray-400">Answered & Marked</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 bg-gray-100 border border-gray-200 rounded flex items-center justify-center">
                <Circle className="h-3 w-3 text-gray-400" />
              </div>
              <span className="text-gray-600 dark:text-gray-400">Not Visited</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 bg-orange-500 border border-orange-500 rounded flex items-center justify-center">
                <span className="text-white text-xs font-bold">1</span>
              </div>
              <span className="text-gray-600 dark:text-gray-400">Current Question</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default ExamSidebar
