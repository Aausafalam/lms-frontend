"use client"

import { memo } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select } from "@/components/ui/select"
import { Trash2, ArrowUp, ArrowDown } from "lucide-react"

/**
 * QuestionGroupForm Component
 * Form for editing individual question group properties
 * Includes move up/down functionality for reordering
 */
export const QuestionGroupForm = memo(function QuestionGroupForm({
  group = {},
  onChange,
  onRemove,
  onMoveUp,
  onMoveDown,
  canMoveUp = false,
  canMoveDown = false,
}) {
  const questionTypeOptions = [
    { label: "Multiple Choice Question", value: "MCQ" },
    { label: "Multiple Select Question", value: "MSQ" },
    { label: "Numeric Answer", value: "Numeric" },
    { label: "True/False", value: "TrueFalse" },
    { label: "Fill in the Blanks", value: "FillBlanks" },
  ]

  /**
   * Handle question range changes
   * Ensures valid range values
   */
  const handleRangeChange = (index, value) => {
    const newRange = [...(group.range || [1, 10])]
    const numValue = Number.parseInt(value, 10)

    // Validate range values
    if (index === 0) {
      // Start range should be positive and less than end
      newRange[index] = Math.max(1, numValue)
      if (newRange[1] && newRange[0] > newRange[1]) {
        newRange[1] = newRange[0]
      }
    } else {
      // End range should be greater than or equal to start
      newRange[index] = Math.max(newRange[0] || 1, numValue)
    }

    onChange("range", newRange)
  }

  return (
    <div className="space-y-4">
      {/* Question Range Configuration */}
      <div className="grid grid-cols-2 gap-4">
        <div className="flex items-center gap-2">
          <Input
            label="Question Range Start"
            id="rangeStart"
            name="rangeStart"
            type="number"
            min="1"
            value={group.range?.[0] || ""}
            onChange={(e) => handleRangeChange(0, e.target.value)}
            placeholder="Start"
            className="border-orange-200 focus:border-orange-500"
          />
          <span className="mt-6 text-orange-600 font-medium">to</span>
          <Input
            label="Question Range End"
            id="rangeEnd"
            name="rangeEnd"
            type="number"
            min="1"
            value={group.range?.[1] || ""}
            onChange={(e) => handleRangeChange(1, e.target.value)}
            placeholder="End"
            className="border-orange-200 focus:border-orange-500"
          />
        </div>

        <Select
          label="Question Type"
          name="questionType"
          value={group.questionType || "MCQ"}
          onChange={(e) => onChange("questionType", e.target.value)}
          options={questionTypeOptions}
          placeholder="Select question type"
          fieldClassName="border-orange-200 focus:border-orange-500"
        />
      </div>

      {/* Marking Scheme */}
      <div className="grid grid-cols-2 gap-4">
        <Input
          label="Marks for Correct Answer"
          id="marksPerQuestion"
          name="marksPerQuestion"
          type="number"
          step="0.01"
          min="0"
          value={group.marksPerQuestion || ""}
          onChange={(e) => onChange("marksPerQuestion", Number.parseFloat(e.target.value))}
          placeholder="Enter marks"
          helperText="Points awarded for correct answers"
          className="border-orange-200 focus:border-orange-500"
        />

        <Input
          label="Negative Marks for Wrong Answer"
          id="negativeMarks"
          name="negativeMarks"
          type="number"
          step="0.01"
          min="0"
          value={group.negativeMarks || ""}
          onChange={(e) => onChange("negativeMarks", Number.parseFloat(e.target.value))}
          placeholder="Enter negative marks"
          helperText="Points deducted for incorrect answers"
          className="border-orange-200 focus:border-orange-500"
        />
      </div>

      {/* Action Buttons */}
      <div className="flex justify-between items-center pt-2">
        <div className="flex gap-2">
          {/* Move Up/Down Buttons */}
          <Button
            variant="outline"
            size="sm"
            onClick={onMoveUp}
            disabled={!canMoveUp}
            className="text-orange-600 border-orange-200 hover:bg-orange-50 disabled:opacity-50"
          >
            <ArrowUp className="h-4 w-4 mr-1" />
            Move Up
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={onMoveDown}
            disabled={!canMoveDown}
            className="text-orange-600 border-orange-200 hover:bg-orange-50 disabled:opacity-50"
          >
            <ArrowDown className="h-4 w-4 mr-1" />
            Move Down
          </Button>
        </div>

        {/* Remove Button */}
        <Button
          variant="ghost"
          size="sm"
          onClick={onRemove}
          className="text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20"
        >
          <Trash2 className="h-4 w-4 mr-1" />
          Remove Group
        </Button>
      </div>
    </div>
  )
})
