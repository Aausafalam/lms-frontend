"use client"

import { memo } from "react"
import { motion } from "framer-motion"
import { Award, Lightbulb, CheckCircle2, X } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { CourseFormSection } from "./course-form-section"

/**
 * CourseRequirementsSection - A form section component for managing course requirements
 *
 * This component allows course creators to add, edit, and remove requirements for their course.
 * Requirements are prerequisites that students should have before taking the course.
 *
 * @param {Object} props - Component props
 * @param {Object} props.handlers - Object containing event handlers for the form
 * @param {Object} props.formData - Form data object containing requirements array
 * @param {Object} props.sectionRef - React ref for scrolling to this section
 * @param {boolean} props.isActive - Whether this section is currently active
 * @returns {JSX.Element} Rendered requirements section
 */
export const CourseRequirementsSection = memo(function CourseRequirementsSection({
  handlers = {},
  formData = { requirements: [] },
  sectionRef,
  isActive,
}) {
  // Destructure handlers for better readability
  const { handleRequirementChange, removeRequirement, addRequirement } = handlers

  // Animation configuration for list items
  const listItemAnimation = {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.3 },
  }

  // Ensure requirements array exists to prevent errors
  const requirements = Array.isArray(formData.requirements) ? formData.requirements : []

  return (
    <CourseFormSection
      id="requirements"
      title="Course Requirements"
      icon={<Award className="h-5 w-5" />}
      description="List the skills or knowledge students should have before starting this course"
      sectionRef={sectionRef}
      isActive={isActive}
    >
      <div className="space-y-6">
        {/* Informational box with tips */}
        <div className="bg-blue-50 dark:bg-blue-950/10 rounded-lg p-4 border border-blue-100 dark:border-blue-900/20">
          <p className="text-sm text-blue-700 dark:text-blue-400 flex items-center gap-2">
            <Lightbulb className="h-4 w-4" />
            <span>
              Clear requirements help students understand if this course is right for them. Be specific about necessary
              skills or knowledge.
            </span>
          </p>
        </div>

        {/* Requirements list */}
        <div className="space-y-4">
          {requirements.map((requirement, index) => (
            <motion.div
              key={index}
              {...listItemAnimation}
              className="flex items-center gap-2"
              aria-label={`Requirement ${index + 1}`}
            >
              {/* Requirement number indicator */}
              <div className="flex-shrink-0 w-8 h-8 mt-[-0.85rem] rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400 font-medium">
                {index + 1}
              </div>

              {/* Requirement input field */}
              <Input
                value={requirement || ""}
                onChange={(e) => handleRequirementChange(index, e.target.value)}
                placeholder={`Requirement ${index + 1}`}
                aria-label={`Requirement ${index + 1}`}
              />

              {/* Remove button - only shown if there's more than one requirement */}
              {requirements.length > 1 && (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => removeRequirement(index)}
                  className="h-10 w-11 rounded-full text-red-500 hover:text-red-700 hover:bg-red-100 dark:hover:bg-red-900/20 mt-[-0.85rem]"
                  aria-label={`Remove requirement ${index + 1}`}
                  title="Remove this requirement"
                >
                  <X className="h-4 w-4" />
                </Button>
              )}
            </motion.div>
          ))}

          {/* Empty state message when no requirements exist */}
          {requirements.length === 0 && (
            <div className="text-center py-6 text-gray-500 dark:text-gray-400">
              <Award className="h-12 w-12 mx-auto mb-3 opacity-40" />
              <p>No requirements added yet.</p>
              <p className="text-sm">Add your first requirement to get started.</p>
            </div>
          )}

          {/* Add new requirement button */}
          <Button
            variant="outline"
            onClick={addRequirement}
            className="mt-2 bg-blue-50 text-blue-600 border-blue-200 hover:bg-blue-100 dark:bg-blue-950/20 dark:text-blue-400 dark:border-blue-900/30 dark:hover:bg-blue-950/30"
            aria-label="Add requirement"
          >
            <CheckCircle2 className="h-4 w-4 mr-2" />
            Add Requirement
          </Button>

          {/* Helper text with examples */}
          {requirements.length > 0 && (
            <div className="mt-4 text-[0.8rem] text-gray-500 dark:text-gray-400">
              <p className="font-medium mb-1">Example requirements:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Basic understanding of HTML and CSS</li>
                <li>A computer with at least 8GB of RAM</li>
                <li>Familiarity with JavaScript fundamentals</li>
                <li>No prior knowledge needed - beginners welcome!</li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </CourseFormSection>
  )
})
