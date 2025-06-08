"use client"

import { memo } from "react"
import { motion } from "framer-motion"
import { Target, Lightbulb, CheckCircle2, X, GraduationCap } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { FormSection } from "@/components/formSection"

export const LearningOutcomesSection = memo(function LearningOutcomesSection({
  handlers = {},
  formData = { learningOutcomes: [] },
  sectionRef,
  isActive,
}) {
  const { handleLearningOutcomeChange, removeLearningOutcome, addLearningOutcome } = handlers

  const listItemAnimation = {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.3 },
  }

  const outcomes = Array.isArray(formData.learningOutcomes) ? formData.learningOutcomes : []

  return (
    <FormSection
      id="learning-outcomes"
      title="Learning Outcomes"
      icon={<GraduationCap className="h-5 w-5" />}
      description="Define what students will achieve after completing this module"
      sectionRef={sectionRef}
      isActive={isActive}
    >
      <div className="space-y-6">
        <div className="bg-blue-50 dark:bg-blue-950/10 rounded-lg p-4 border border-blue-100 dark:border-blue-900/20">
          <p className="text-sm text-blue-700 dark:text-blue-400 flex items-center gap-2">
            <Lightbulb className="h-4 w-4" />
            <span>
              Write specific, measurable outcomes. Start with action verbs like "Understand," "Apply," "Calculate," or
              "Analyze."
            </span>
          </p>
        </div>

        <div className="space-y-4">
          {outcomes.map((outcome, index) => (
            <motion.div
              key={index}
              {...listItemAnimation}
              className="flex items-center gap-2"
              aria-label={`Learning outcome ${index + 1}`}
            >
              <div className="flex-shrink-0 w-8 h-8 mt-[-0.85rem] rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400 font-medium">
                {index + 1}
              </div>

              <Input
                value={outcome || ""}
                onChange={(e) => handleLearningOutcomeChange(index, e.target.value)}
                placeholder={`Learning outcome ${index + 1}`}
                aria-label={`Learning outcome ${index + 1}`}
              />

              {outcomes.length > 1 && (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => removeLearningOutcome(index)}
                  className="h-10 w-11 rounded-full text-red-500 hover:text-red-700 hover:bg-red-100 dark:hover:bg-red-900/20 mt-[-0.85rem]"
                  aria-label={`Remove learning outcome ${index + 1}`}
                >
                  <X className="h-4 w-4" />
                </Button>
              )}
            </motion.div>
          ))}

          {outcomes.length === 0 && (
            <div className="text-center py-6 text-gray-500 dark:text-gray-400">
              <Target className="h-12 w-12 mx-auto mb-3 opacity-40" />
              <p>No learning outcomes added yet.</p>
              <p className="text-sm">Add your first outcome to get started.</p>
            </div>
          )}

          <Button
            variant="outline"
            onClick={addLearningOutcome}
            className="mt-2 bg-blue-50 text-blue-600 border-blue-200 hover:bg-blue-100 dark:bg-blue-950/20 dark:text-blue-400 dark:border-blue-900/30 dark:hover:bg-blue-950/30"
            aria-label="Add learning outcome"
          >
            <CheckCircle2 className="h-4 w-4 mr-2" />
            Add Learning Outcome
          </Button>

          {outcomes.length > 0 && (
            <div className="mt-4 text-sm text-gray-500 dark:text-gray-400">
              <p className="font-medium mb-1">Example outcomes:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Understand the nature of electric charge</li>
                <li>Apply Coulomb's Law to solve problems</li>
                <li>Calculate electric field strength</li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </FormSection>
  )
})
