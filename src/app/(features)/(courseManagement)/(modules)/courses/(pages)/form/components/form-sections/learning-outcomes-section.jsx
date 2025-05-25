"use client"
import { memo } from "react"
import { motion } from "framer-motion"
import { Target, Lightbulb, CheckCircle2, X, GraduationCap } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { FormSection } from "./form-section"

/**
 * Learning Outcomes Section Component
 * Manages what students will learn from the course
 *
 * @param {Object} props - Component props
 * @param {Object} props.handlers - Form event handlers
 * @param {Object} props.formData - Current form data with learningOutcomes array
 * @param {React.RefObject} props.sectionRef - Reference for section scrolling
 * @param {boolean} props.isActive - Whether this section is currently active
 */
export const LearningOutcomesSection = memo(function LearningOutcomesSection({
  handlers = {},
  formData = { learningOutcomes: [] },
  sectionRef,
  isActive,
}) {
  const { handleLearningOutcomeChange, removeLearningOutcome, addLearningOutcome } = handlers

  // Animation configuration for list items
  const listItemAnimation = {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.3 },
  }

  // Ensure learning outcomes array exists
  const outcomes = Array.isArray(formData.learningOutcomes) ? formData.learningOutcomes : []

  return (
    <FormSection
      id="learning-outcomes"
      title="Learning Outcomes"
      icon={<GraduationCap className="h-5 w-5" />}
      description="Define what students will achieve after completing this course"
      sectionRef={sectionRef}
      isActive={isActive}
    >
      <div className="space-y-6">
        {/* Guidance Box */}
        <div className="bg-blue-50 dark:bg-blue-950/10 rounded-lg p-4 border border-blue-100 dark:border-blue-900/20">
          <p className="text-sm text-blue-700 dark:text-blue-400 flex items-center gap-2">
            <Lightbulb className="h-4 w-4" />
            <span>
              Write specific, measurable outcomes. Start with action verbs like "Create," "Analyze," "Implement," or
              "Design."
            </span>
          </p>
        </div>

        {/* Learning Outcomes List */}
        <div className="space-y-4">
          {outcomes.map((outcome, index) => (
            <motion.div
              key={index}
              {...listItemAnimation}
              className="flex items-center gap-2"
              aria-label={`Learning outcome ${index + 1}`}
            >
              {/* Outcome Number */}
              <div className="flex-shrink-0 w-8 h-8 mt-[-0.85rem] rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400 font-medium">
                {index + 1}
              </div>

              {/* Outcome Input */}
              <Input
                value={outcome || ""}
                onChange={(e) => handleLearningOutcomeChange(index, e.target.value)}
                placeholder={`Learning outcome ${index + 1}`}
                aria-label={`Learning outcome ${index + 1}`}
              />

              {/* Remove Button */}
              {outcomes.length > 1 && (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => removeLearningOutcome(index)}
                  className="h-10 w-11 rounded-full text-red-500 hover:text-red-700 hover:bg-red-100 dark:hover:bg-red-900/20 mt-[-0.85rem]"
                  aria-label={`Remove learning outcome ${index + 1}`}
                  title="Remove this outcome"
                >
                  <X className="h-4 w-4" />
                </Button>
              )}
            </motion.div>
          ))}

          {/* Empty State */}
          {outcomes.length === 0 && (
            <div className="text-center py-6 text-gray-500 dark:text-gray-400">
              <Target className="h-12 w-12 mx-auto mb-3 opacity-40" />
              <p>No learning outcomes added yet.</p>
              <p className="text-sm">Add your first outcome to get started.</p>
            </div>
          )}

          {/* Add Button */}
          <Button
            variant="outline"
            onClick={addLearningOutcome}
            className="mt-2 bg-blue-50 text-blue-600 border-blue-200 hover:bg-blue-100 dark:bg-blue-950/20 dark:text-blue-400 dark:border-blue-900/30 dark:hover:bg-blue-950/30"
            aria-label="Add learning outcome"
          >
            <CheckCircle2 className="h-4 w-4 mr-2" />
            Add Learning Outcome
          </Button>

          {/* Examples */}
          {outcomes.length > 0 && (
            <div className="mt-4 text-sm text-gray-500 dark:text-gray-400">
              <p className="font-medium mb-1">Example outcomes:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Build a complete web application using React and Node.js</li>
                <li>Implement authentication and authorization systems</li>
                <li>Deploy applications to cloud platforms</li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </FormSection>
  )
})
