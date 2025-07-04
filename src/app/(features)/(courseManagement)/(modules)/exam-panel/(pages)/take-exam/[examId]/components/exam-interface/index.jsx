"use client"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ChevronLeft, ChevronRight, Flag, Save, BookOpen } from "lucide-react"
import QuestionRenderer from "./question-renderer"

const ExamInterface = ({
  exam,
  questions,
  currentQuestionIndex,
  answers,
  onAnswerChange,
  onSaveAndNext,
  onMarkForReview,
  onQuestionNavigation,
  isQuestionAnswered,
  isQuestionMarkedForReview,
}) => {
  const currentQuestion = questions[currentQuestionIndex]
  const isLastQuestion = currentQuestionIndex === questions.length - 1
  const isFirstQuestion = currentQuestionIndex === 0

  if (!currentQuestion) {
    return (
      <div className="flex items-center justify-center h-96">
        <p className="text-gray-600 dark:text-gray-400">No question available</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Question Header */}
      <Card className="border-gray-200 dark:border-gray-700">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <Badge className="bg-orange-100 text-orange-700 border-orange-200 dark:bg-orange-950/30 dark:text-orange-300 dark:border-orange-800">
                <BookOpen className="h-3 w-3 mr-1" />
                Question {currentQuestionIndex + 1} of {questions.length}
              </Badge>
              {currentQuestion.marks && <Badge variant="outline">{currentQuestion.marks} marks</Badge>}
              {isQuestionMarkedForReview(currentQuestionIndex) && (
                <Badge className="bg-yellow-100 text-yellow-700 border-yellow-200 dark:bg-yellow-950/30 dark:text-yellow-300 dark:border-yellow-800">
                  <Flag className="h-3 w-3 mr-1" />
                  Marked for Review
                </Badge>
              )}
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={() => onMarkForReview(currentQuestionIndex)}
              className={`${
                isQuestionMarkedForReview(currentQuestionIndex)
                  ? "bg-yellow-50 border-yellow-200 text-yellow-700 hover:bg-yellow-100 dark:bg-yellow-950/30 dark:border-yellow-800 dark:text-yellow-300"
                  : "border-gray-200 dark:border-gray-600"
              }`}
            >
              <Flag className="h-4 w-4 mr-2" />
              {isQuestionMarkedForReview(currentQuestionIndex) ? "Unmark" : "Mark for Review"}
            </Button>
          </div>

          {/* Question Content */}
          <QuestionRenderer
            question={currentQuestion}
            answer={answers[currentQuestion.id]}
            onAnswerChange={(answer) => onAnswerChange(currentQuestion.id, answer)}
          />
        </CardContent>
      </Card>

      {/* Navigation */}
      <div className="flex items-center justify-between">
        <Button
          variant="outline"
          onClick={() => onQuestionNavigation(currentQuestionIndex - 1)}
          disabled={isFirstQuestion}
          className="border-gray-200 dark:border-gray-600"
        >
          <ChevronLeft className="h-4 w-4 mr-2" />
          Previous
        </Button>

        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            onClick={() => onSaveAndNext()}
            className="border-orange-200 text-orange-700 hover:bg-orange-50 dark:border-orange-800 dark:text-orange-300 dark:hover:bg-orange-950/30"
          >
            <Save className="h-4 w-4 mr-2" />
            Save & Continue
          </Button>

          {!isLastQuestion && (
            <Button
              onClick={() => onQuestionNavigation(currentQuestionIndex + 1)}
              className="bg-orange-500 hover:bg-orange-600 text-white"
            >
              Next
              <ChevronRight className="h-4 w-4 ml-2" />
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}

export default ExamInterface
