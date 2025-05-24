"use client"

import { memo } from "react"
import { motion } from "framer-motion"
import { Users, Lightbulb, CheckCircle2, X } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { CourseFormSection } from "./course-form-section"

/**
 * CourseTargetAudienceSection - A form section component for defining the target audience
 *
 * This component allows course creators to specify who their course is designed for,
 * helping potential students understand if the course is right for them.
 *
 * @param {Object} props - Component props
 * @param {Object} props.handlers - Object containing event handlers for the form
 * @param {Object} props.formData - Form data object containing target audience array
 * @param {Object} props.sectionRef - React ref for scrolling to this section
 * @param {boolean} props.isActive - Whether this section is currently active
 * @returns {JSX.Element} Rendered target audience section
 */
export const CourseTargetAudienceSection = memo(function CourseTargetAudienceSection({
  handlers = {},
  formData = { targetAudience: [] },
  sectionRef,
  isActive,
}) {
  // Destructure handlers for better readability
  const { handleTargetAudienceChange, removeTargetAudience, addTargetAudience } = handlers

  // Animation configuration for list items
  const listItemAnimation = {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.3 },
  }

  // Ensure target audience array exists to prevent errors
  const targetAudience = Array.isArray(formData.targetAudience) ? formData.targetAudience : []

  return (
    <CourseFormSection
      id="targetAudience"
      title="Target Audience"
      icon={<Users className="h-5 w-5" />}
      description="Define who this course is designed for"
      sectionRef={sectionRef}
      isActive={isActive}
    >
      <div className="space-y-6">
        {/* Informational box with tips */}
        <div className="bg-blue-50 dark:bg-blue-950/10 rounded-lg p-4 border border-blue-100 dark:border-blue-900/20">
          <p className="text-sm text-blue-700 dark:text-blue-400 flex items-center gap-2">
            <Lightbulb className="h-4 w-4" />
            <span>
              Clearly defining your target audience helps attract the right students and sets proper expectations.
            </span>
          </p>
        </div>

        {/* Target audience list */}
        <div className="space-y-4">
          {targetAudience.map((audience, index) => (
            <motion.div
              key={index}
              {...listItemAnimation}
              className="flex items-center gap-2"
              aria-label={`Target audience ${index + 1}`}
            >
              {/* Audience number indicator */}
              <div className="flex-shrink-0 w-8 h-8 mt-[-0.85rem] rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400 font-medium">
                {index + 1}
              </div>

              {/* Audience input field */}
              <Input
                value={audience || ""}
                onChange={(e) => handleTargetAudienceChange(index, e.target.value)}
                placeholder={`Target audience ${index + 1}`}
                aria-label={`Target audience ${index + 1}`}
              />

              {/* Remove button - only shown if there's more than one audience */}
              {targetAudience.length > 1 && (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => removeTargetAudience(index)}
                  className="h-10 w-11 rounded-full text-red-500 hover:text-red-700 hover:bg-red-100 dark:hover:bg-red-900/20 mt-[-0.85rem]"
                  aria-label={`Remove target audience ${index + 1}`}
                  title="Remove this target audience"
                >
                  <X className="h-4 w-4" />
                </Button>
              )}
            </motion.div>
          ))}

          {/* Empty state message when no target audience exists */}
          {targetAudience.length === 0 && (
            <div className="text-center py-6 text-gray-500 dark:text-gray-400">
              <Users className="h-12 w-12 mx-auto mb-3 opacity-40" />
              <p>No target audience defined yet.</p>
              <p className="text-sm">Add your first target audience to get started.</p>
            </div>
          )}

          {/* Add new target audience button */}
          <Button
            variant="outline"
            onClick={addTargetAudience}
            className="mt-2 bg-blue-50 text-blue-600 border-blue-200 hover:bg-blue-100 dark:bg-blue-950/20 dark:text-blue-400 dark:border-blue-900/30 dark:hover:bg-blue-950/30"
            aria-label="Add target audience"
          >
            <CheckCircle2 className="h-4 w-4 mr-2" />
            Add Target Audience
          </Button>

          {/* Helper text with examples */}
          {targetAudience.length > 0 && (
            <div className="mt-4 text-[0.8rem] text-gray-500 dark:text-gray-400">
              <p className="font-medium mb-1">Example target audiences:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Web developers looking to learn React</li>
                <li>Beginners with no prior programming experience</li>
                <li>UX designers wanting to improve their prototyping skills</li>
                <li>Marketing professionals interested in data analytics</li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </CourseFormSection>
  )
})
