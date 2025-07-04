"use client"
import { useState } from "react"
import { useParams } from "next/navigation"
import ExamInterface from "./components/exam-interface"
import ExamHeader from "./components/exam-header"
import ExamSidebar from "./components/exam-sidebar"
import ExamSubmissionModal from "./components/exam-submission-modal"
import { useExamTaking } from "../../../hooks/useExamTaking"
import { Loader2 } from "lucide-react"

const TakeExamPage = () => {
  const { examId } = useParams()
  const [showSubmissionModal, setShowSubmissionModal] = useState(false)

  const {
    exam,
    questions,
    currentQuestionIndex,
    answers,
    timeRemaining,
    loading,
    error,
    handleAnswerChange,
    handleQuestionNavigation,
    handleSubmitExam,
    handleSaveAndNext,
    handleMarkForReview,
    isQuestionAnswered,
    isQuestionMarkedForReview,
  } = useExamTaking(examId)

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin text-orange-500 mx-auto mb-4" />
          <p className="text-gray-600 dark:text-gray-400">Loading exam...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <p className="text-red-600 dark:text-red-400 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600"
          >
            Retry
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Exam Header */}
      <ExamHeader exam={exam} timeRemaining={timeRemaining} onSubmit={() => setShowSubmissionModal(true)} />

      <div className="flex">
        {/* Main Content */}
        <div className="flex-1 p-6">
          <ExamInterface
            exam={exam}
            questions={questions}
            currentQuestionIndex={currentQuestionIndex}
            answers={answers}
            onAnswerChange={handleAnswerChange}
            onSaveAndNext={handleSaveAndNext}
            onMarkForReview={handleMarkForReview}
            onQuestionNavigation={handleQuestionNavigation}
            isQuestionAnswered={isQuestionAnswered}
            isQuestionMarkedForReview={isQuestionMarkedForReview}
          />
        </div>

        {/* Sidebar */}
        <div className="w-80 border-l border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
          <ExamSidebar
            questions={questions}
            currentQuestionIndex={currentQuestionIndex}
            answers={answers}
            onQuestionNavigation={handleQuestionNavigation}
            isQuestionAnswered={isQuestionAnswered}
            isQuestionMarkedForReview={isQuestionMarkedForReview}
          />
        </div>
      </div>

      {/* Submission Modal */}
      <ExamSubmissionModal
        isOpen={showSubmissionModal}
        onClose={() => setShowSubmissionModal(false)}
        onConfirm={handleSubmitExam}
        exam={exam}
        answers={answers}
        questions={questions}
      />
    </div>
  )
}

export default TakeExamPage
