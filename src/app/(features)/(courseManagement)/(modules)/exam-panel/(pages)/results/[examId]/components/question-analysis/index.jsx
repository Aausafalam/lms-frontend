"use client"
import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, XCircle, Clock, Flag, ChevronLeft, ChevronRight } from "lucide-react"

const QuestionAnalysis = ({ results }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const questions = results?.questionAnalysis || []
  const currentQuestion = questions[currentQuestionIndex]

  if (!questions.length) {
    return (
      <Card className="border-gray-200 dark:border-gray-700">
        <CardContent className="p-8 text-center">
          <p className="text-gray-500 dark:text-gray-400">No question analysis available.</p>
        </CardContent>
      </Card>
    )
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case "correct":
        return <CheckCircle className="h-5 w-5 text-green-500" />
      case "wrong":
        return <XCircle className="h-5 w-5 text-red-500" />
      case "skipped":
        return <Clock className="h-5 w-5 text-gray-500" />
      default:
        return <Flag className="h-5 w-5 text-yellow-500" />
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case "correct":
        return "bg-green-100 text-green-700 border-green-200 dark:bg-green-950/30 dark:text-green-300 dark:border-green-800"
      case "wrong":
        return "bg-red-100 text-red-700 border-red-200 dark:bg-red-950/30 dark:text-red-300 dark:border-red-800"
      case "skipped":
        return "bg-gray-100 text-gray-700 border-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600"
      default:
        return "bg-yellow-100 text-yellow-700 border-yellow-200 dark:bg-yellow-950/30 dark:text-yellow-300 dark:border-yellow-800"
    }
  }

  return (
    <div className="space-y-6">
      {/* Question Navigation */}
      <Card className="border-gray-200 dark:border-gray-700">
        <CardHeader>
          <CardTitle>Question Navigation</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-10 gap-2 mb-4">
            {questions.map((question, index) => (
              <Button
                key={index}
                variant={index === currentQuestionIndex ? "default" : "outline"}
                size="sm"
                onClick={() => setCurrentQuestionIndex(index)}
                className={`h-10 w-10 p-0 relative ${
                  index === currentQuestionIndex
                    ? "bg-orange-500 hover:bg-orange-600 text-white"
                    : "border-gray-200 dark:border-gray-600"
                }`}
              >
                <span className="font-medium">{index + 1}</span>
                <div className="absolute -top-1 -right-1">{getStatusIcon(question.status)}</div>
              </Button>
            ))}
          </div>

          <div className="flex items-center justify-between">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentQuestionIndex(Math.max(0, currentQuestionIndex - 1))}
              disabled={currentQuestionIndex === 0}
              className="border-gray-200 dark:border-gray-600"
            >
              <ChevronLeft className="h-4 w-4 mr-2" />
              Previous
            </Button>

            <span className="text-sm text-gray-600 dark:text-gray-400">
              Question {currentQuestionIndex + 1} of {questions.length}
            </span>

            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentQuestionIndex(Math.min(questions.length - 1, currentQuestionIndex + 1))}
              disabled={currentQuestionIndex === questions.length - 1}
              className="border-gray-200 dark:border-gray-600"
            >
              Next
              <ChevronRight className="h-4 w-4 ml-2" />
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Current Question Analysis */}
      {currentQuestion && (
        <Card className="border-gray-200 dark:border-gray-700">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Question {currentQuestionIndex + 1} Analysis</CardTitle>
              <Badge className={getStatusColor(currentQuestion.status)}>
                {getStatusIcon(currentQuestion.status)}
                <span className="ml-2 capitalize">{currentQuestion.status}</span>
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Question Text */}
            <div>
              <h4 className="font-medium text-gray-900 dark:text-white mb-2">Question:</h4>
              <div
                className="prose dark:prose-invert max-w-none text-gray-700 dark:text-gray-300"
                dangerouslySetInnerHTML={{ __html: currentQuestion.questionText }}
              />
            </div>

            {/* Answer Analysis */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Your Answer */}
              <div>
                <h4 className="font-medium text-gray-900 dark:text-white mb-2">Your Answer:</h4>
                <div
                  className={`p-3 rounded-lg border ${
                    currentQuestion.status === "correct"
                      ? "bg-green-50 border-green-200 dark:bg-green-950/30 dark:border-green-800"
                      : currentQuestion.status === "wrong"
                        ? "bg-red-50 border-red-200 dark:bg-red-950/30 dark:border-red-800"
                        : "bg-gray-50 border-gray-200 dark:bg-gray-700 dark:border-gray-600"
                  }`}
                >
                  <p className="text-gray-900 dark:text-white">{currentQuestion.userAnswer || "Not answered"}</p>
                </div>
              </div>

              {/* Correct Answer */}
              <div>
                <h4 className="font-medium text-gray-900 dark:text-white mb-2">Correct Answer:</h4>
                <div className="p-3 rounded-lg border bg-green-50 border-green-200 dark:bg-green-950/30 dark:border-green-800">
                  <p className="text-gray-900 dark:text-white">{currentQuestion.correctAnswer}</p>
                </div>
              </div>
            </div>

            {/* Explanation */}
            {currentQuestion.explanation && (
              <div>
                <h4 className="font-medium text-gray-900 dark:text-white mb-2">Explanation:</h4>
                <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg dark:bg-blue-950/30 dark:border-blue-800">
                  <div
                    className="prose dark:prose-invert max-w-none text-gray-700 dark:text-gray-300"
                    dangerouslySetInnerHTML={{ __html: currentQuestion.explanation }}
                  />
                </div>
              </div>
            )}

            {/* Question Stats */}
            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-gray-200 dark:border-gray-700">
              <div className="text-center">
                <p className="text-lg font-bold text-gray-900 dark:text-white">{currentQuestion.marks || 0}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Marks</p>
              </div>
              <div className="text-center">
                <p className="text-lg font-bold text-gray-900 dark:text-white">{currentQuestion.timeTaken || "0s"}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Time Taken</p>
              </div>
              <div className="text-center">
                <p className="text-lg font-bold text-gray-900 dark:text-white">
                  {currentQuestion.difficulty || "Medium"}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Difficulty</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

export default QuestionAnalysis
