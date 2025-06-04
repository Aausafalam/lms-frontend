"use client"

import { memo } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select } from "@/components/ui/select"
import { Trash2 } from "lucide-react"

export const QuestionGroupForm = memo(function QuestionGroupForm({ group = {}, onChange, onRemove }) {
  const questionTypeOptions = [
    { label: "Multiple Choice Question", value: "MCQ" },
    { label: "Multiple Select Question", value: "MSQ" },
    { label: "Numeric Answer", value: "Numeric" },
  ]

  const handleRangeChange = (index, value) => {
    const newRange = [...(group.range || [1, 10])]
    newRange[index] = Number.parseInt(value, 10)
    onChange("range", newRange)
  }

  return (
    <div className="space-y-4">
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
          />
          <span className="mt-6">to</span>
          <Input
            label="Question Range End"
            id="rangeEnd"
            name="rangeEnd"
            type="number"
            min="1"
            value={group.range?.[1] || ""}
            onChange={(e) => handleRangeChange(1, e.target.value)}
            placeholder="End"
          />
        </div>

        <Select
          label="Question Type"
          name="questionType"
          value={group.questionType || "MCQ"}
          onChange={(e) => onChange("questionType", e.target.value)}
          options={questionTypeOptions}
          placeholder="Select question type"
        />
      </div>

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
        />
      </div>

      <div className="flex justify-end">
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
