"use client"

import { memo } from "react"
import { motion } from "framer-motion"
import { Lightbulb, X, Plus, Star } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { FormSection } from "@/components/formSection"
import { Select } from "@/components/ui/select"

/**
 * Features Section Component
 * Manages skills/features that students will gain
 *
 * @param {Object} props - Component props
 * @param {Object} props.handlers - Form event handlers
 * @param {Object} props.formData - Current form data with features array
 * @param {React.RefObject} props.sectionRef - Reference for section scrolling
 * @param {boolean} props.isActive - Whether this section is currently active
 */
export const FeaturesSection = memo(function FeaturesSection({
  handlers = {},
  formData = { features: [] },
  sectionRef,
  isActive,
}) {
  const { handleFeatureChange, removeFeature, addFeature } = handlers

  // Animation configuration
  const listItemAnimation = {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.3 },
  }

  // Ensure features array exists
  const features = Array.isArray(formData.features) ? formData.features : []

  // Skill level options
  const skillLevels = [
    { label: "Beginner", value: "Beginner" },
    { label: "Intermediate", value: "Intermediate" },
    { label: "Advanced", value: "Advanced" },
    { label: "Expert", value: "Expert" },
  ]

  return (
    <FormSection
      id="features"
      title="Course Features & Skills"
      icon={<Star className="h-5 w-5" />}
      description="Define the key skills and features students will master"
      sectionRef={sectionRef}
      isActive={isActive}
    >
      <div className="space-y-6">
        {/* Guidance Box */}
        <div className="bg-purple-50 dark:bg-purple-950/10 rounded-lg p-4 border border-purple-100 dark:border-purple-900/20">
          <p className="text-sm text-purple-700 dark:text-purple-400 flex items-center gap-2">
            <Lightbulb className="h-4 w-4" />
            <span>
              List specific technologies, tools, or skills students will learn. This helps with course discoverability.
            </span>
          </p>
        </div>

        {/* Features List */}
        <div className="space-y-4">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              {...listItemAnimation}
              className="grid grid-cols-1 md:grid-cols-[2fr,1fr,auto] gap-3 items-start"
            >
              {/* Feature Name */}
              <Input
                placeholder="Feature/Skill name (e.g., React.js, Python, Data Analysis)"
                value={feature.name || ""}
                onChange={(e) => handleFeatureChange(index, "name", e.target.value)}
                aria-label={`Feature ${index + 1} name`}
              />

              {/* Skill Level */}
              <Select
                placeholder="Proficiency level"
                options={skillLevels}
                value={feature.level || ""}
                onChange={(e) => handleFeatureChange(index, "level", e.target.value)}
                aria-label={`Feature ${index + 1} level`}
              />

              {/* Remove Button */}
              {features.length > 1 && (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => removeFeature(index)}
                  className="h-10 w-10 rounded-full text-red-500 hover:text-red-700 hover:bg-red-100 dark:hover:bg-red-900/20"
                  aria-label={`Remove feature ${index + 1}`}
                  title="Remove this feature"
                >
                  <X className="h-4 w-4" />
                </Button>
              )}
            </motion.div>
          ))}

          {/* Empty State */}
          {features.length === 0 && (
            <div className="text-center py-6 text-gray-500 dark:text-gray-400">
              <Star className="h-12 w-12 mx-auto mb-3 opacity-40" />
              <p>No features added yet.</p>
              <p className="text-sm">Add skills and technologies students will learn.</p>
            </div>
          )}

          {/* Add Button */}
          <Button
            variant="outline"
            onClick={addFeature}
            className="mt-2 bg-purple-50 text-purple-600 border-purple-200 hover:bg-purple-100 dark:bg-purple-950/20 dark:text-purple-400 dark:border-purple-900/30 dark:hover:bg-purple-950/30"
            aria-label="Add feature"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Feature
          </Button>
        </div>
      </div>
    </FormSection>
  )
})
