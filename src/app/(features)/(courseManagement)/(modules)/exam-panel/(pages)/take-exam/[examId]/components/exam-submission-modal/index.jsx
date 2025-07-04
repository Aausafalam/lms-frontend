"use client"
import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { CheckCircle, Circle, AlertTriangle, Send, X } from "lucide-react"

const ExamSubmissionModal = ({ isOpen, onClose, onConfirm, exam, answers, questions }) => {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const answeredCount = Object.keys(answers).length
  const unansweredCount = questions.length - answeredCount
  const completionPercentage = (answeredCount / questions.length) * 100

  const handleSubmit = async () => {
    setIsSubmitting(true)
    try {
      await onConfirm()
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Send className="h-5 w-5 text-orange-500" />
            Submit Exam
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Warning Message */}
          {unansweredCount > 0 && (
            <Card className="border-yellow-200 bg-yellow-50 dark:border-yellow-800 dark:bg-yellow-950/30">
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="h-5 w-5 text-yellow-600 dark:text-yellow-400 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-yellow-800 dark:text-yellow-200 mb-1">Incomplete Exam</h4>
                    <p className="text-sm text-yellow-700 dark:text-yellow-300">
                      You have {unansweredCount} unanswered question{unansweredCount !== 1 ? "s" : ""}. Once submitted,
                      you cannot make any changes.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Exam Summary */}
          <Card className="border-gray-200 dark:border-gray-700">
            <CardContent className="p-6">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Exam Summary</h3>

              <div className="space-y-4">
                {/* Progress */}
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">Completion Progress</span>
                    <span className="font-medium">
                      {answeredCount}/{questions.length} questions
                    </span>
                  </div>
                  <Progress value={completionPercentage} className="h-2" />
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center gap-3 p-3 bg-green-50 dark:bg-green-950/30 rounded-lg border border-green-200 dark:border-green-800">
                    <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400" />
                    <div>
                      <p className="font-medium text-green-800 dark:text-green-200">{answeredCount}</p>
                      <p className="text-xs text-green-600 dark:text-green-400">Answered</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                    <Circle className="h-5 w-5 text-gray-500" />
                    <div>
                      <p className="font-medium text-gray-800 dark:text-gray-200">{unansweredCount}</p>
                      <p className="text-xs text-gray-600 dark:text-gray-400">Unanswered</p>
                    </div>
                  </div>
                </div>

                {/* Exam Details */}
                <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-600 dark:text-gray-400">Exam:</span>
                      <p className="font-medium text-gray-900 dark:text-white">{exam?.name}</p>
                    </div>
                    <div>
                      <span className="text-gray-600 dark:text-gray-400">Total Questions:</span>
                      <p className="font-medium text-gray-900 dark:text-white">{questions.length}</p>
                    </div>
                    <div>
                      <span className="text-gray-600 dark:text-gray-400">Duration:</span>
                      <p className="font-medium text-gray-900 dark:text-white">{exam?.duration} minutes</p>
                    </div>
                    <div>
                      <span className="text-gray-600 dark:text-gray-400">Completion:</span>
                      <p className="font-medium text-gray-900 dark:text-white">{Math.round(completionPercentage)}%</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Confirmation Message */}
          <Card className="border-orange-200 bg-orange-50 dark:border-orange-800 dark:bg-orange-950/30">
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <AlertTriangle className="h-5 w-5 text-orange-600 dark:text-orange-400 mt-0.5" />
                <div>
                  <h4 className="font-medium text-orange-800 dark:text-orange-200 mb-1">Final Submission</h4>
                  <p className="text-sm text-orange-700 dark:text-orange-300">
                    Are you sure you want to submit your exam? This action cannot be undone, and you will not be able to
                    make any changes after submission.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
            <Button
              variant="outline"
              onClick={onClose}
              disabled={isSubmitting}
              className="border-gray-200 dark:border-gray-600 bg-transparent"
            >
              <X className="h-4 w-4 mr-2" />
              Cancel
            </Button>

            <Button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="bg-orange-500 hover:bg-orange-600 text-white"
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                  Submitting...
                </>
              ) : (
                <>
                  <Send className="h-4 w-4 mr-2" />
                  Submit Exam
                </>
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default ExamSubmissionModal
