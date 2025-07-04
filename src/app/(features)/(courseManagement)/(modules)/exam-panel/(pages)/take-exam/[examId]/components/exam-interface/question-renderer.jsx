"use client"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"

const QuestionRenderer = ({ question, answer, onAnswerChange }) => {
  const renderQuestionContent = () => {
    return (
      <div className="space-y-4">
        {/* Question Text */}
        <div className="prose dark:prose-invert max-w-none">
          <div
            className="text-gray-900 dark:text-white leading-relaxed"
            dangerouslySetInnerHTML={{ __html: question.questionText }}
          />
        </div>

        {/* Question Image */}
        {question.image && (
          <div className="my-4">
            <img
              src={question.image || "/placeholder.svg"}
              alt="Question illustration"
              className="max-w-full h-auto rounded-lg border border-gray-200 dark:border-gray-700"
            />
          </div>
        )}

        {/* Answer Options */}
        {renderAnswerOptions()}
      </div>
    )
  }

  const renderAnswerOptions = () => {
    switch (question.type) {
      case "MCQ":
        return renderMCQOptions()
      case "MSQ":
        return renderMSQOptions()
      case "NUMERIC":
        return renderNumericInput()
      case "SUBJECTIVE":
        return renderSubjectiveInput()
      default:
        return <p className="text-gray-500">Unsupported question type</p>
    }
  }

  const renderMCQOptions = () => {
    return (
      <RadioGroup value={answer || ""} onValueChange={onAnswerChange} className="space-y-3">
        {question.options?.map((option, index) => (
          <div key={index} className="flex items-start space-x-3">
            <RadioGroupItem value={option.id || index.toString()} id={`option-${index}`} className="mt-1" />
            <Label
              htmlFor={`option-${index}`}
              className="flex-1 cursor-pointer text-gray-900 dark:text-white leading-relaxed"
            >
              <div dangerouslySetInnerHTML={{ __html: option.text }} />
              {option.image && (
                <img
                  src={option.image || "/placeholder.svg"}
                  alt={`Option ${index + 1}`}
                  className="mt-2 max-w-xs h-auto rounded border border-gray-200 dark:border-gray-700"
                />
              )}
            </Label>
          </div>
        ))}
      </RadioGroup>
    )
  }

  const renderMSQOptions = () => {
    const selectedAnswers = answer || []

    const handleMSQChange = (optionId, checked) => {
      let newAnswers
      if (checked) {
        newAnswers = [...selectedAnswers, optionId]
      } else {
        newAnswers = selectedAnswers.filter((id) => id !== optionId)
      }
      onAnswerChange(newAnswers)
    }

    return (
      <div className="space-y-3">
        {question.options?.map((option, index) => (
          <div key={index} className="flex items-start space-x-3">
            <Checkbox
              id={`option-${index}`}
              checked={selectedAnswers.includes(option.id || index.toString())}
              onCheckedChange={(checked) => handleMSQChange(option.id || index.toString(), checked)}
              className="mt-1"
            />
            <Label
              htmlFor={`option-${index}`}
              className="flex-1 cursor-pointer text-gray-900 dark:text-white leading-relaxed"
            >
              <div dangerouslySetInnerHTML={{ __html: option.text }} />
              {option.image && (
                <img
                  src={option.image || "/placeholder.svg"}
                  alt={`Option ${index + 1}`}
                  className="mt-2 max-w-xs h-auto rounded border border-gray-200 dark:border-gray-700"
                />
              )}
            </Label>
          </div>
        ))}
      </div>
    )
  }

  const renderNumericInput = () => {
    return (
      <div className="space-y-3">
        <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">Enter your numerical answer:</Label>
        <Input
          type="number"
          value={answer || ""}
          onChange={(e) => onAnswerChange(e.target.value)}
          placeholder="Enter your answer"
          className="max-w-xs"
          step="any"
        />
        {question.unit && <p className="text-sm text-gray-600 dark:text-gray-400">Unit: {question.unit}</p>}
      </div>
    )
  }

  const renderSubjectiveInput = () => {
    return (
      <div className="space-y-3">
        <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">Write your answer:</Label>
        <Textarea
          value={answer || ""}
          onChange={(e) => onAnswerChange(e.target.value)}
          placeholder="Type your answer here..."
          className="min-h-[150px]"
          maxLength={question.maxLength || 1000}
        />
        {question.maxLength && (
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {(answer || "").length}/{question.maxLength} characters
          </p>
        )}
      </div>
    )
  }

  return (
    <Card className="border-gray-200 dark:border-gray-700">
      <CardContent className="p-6">{renderQuestionContent()}</CardContent>
    </Card>
  )
}

export default QuestionRenderer
