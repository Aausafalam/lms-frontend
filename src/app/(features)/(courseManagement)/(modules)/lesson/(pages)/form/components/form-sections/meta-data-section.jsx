"use client"

import { memo } from "react"
import { Settings, Tag, FolderOpen } from "lucide-react"
import { FormSection } from "./form-section"
import { Select } from "@/components/ui/select"

/**
 * Meta Data Section Component
 * Handles module categorization and metadata
 *
 * @param {Object} props - Component props
 * @param {Object} props.formData - Current form data
 * @param {Object} props.handlers - Form event handlers
 * @param {React.RefObject} props.sectionRef - Reference for section scrolling
 * @param {boolean} props.isActive - Whether this section is currently active
 */
export const MetaDataSection = memo(function MetaDataSection({ formData, handlers, sectionRef, isActive }) {
  const { handleInputChange } = handlers

  // Sample data - in real app, these would come from API
  const tags = [
    { label: "Essential", value: "essential" },
    { label: "Advanced", value: "advanced" },
    { label: "Popular", value: "popular" },
    { label: "Hands-on", value: "hands-on" },
    { label: "Theory", value: "theory" },
    { label: "Practical", value: "practical" },
  ]

  const categories = [
    { label: "Programming", value: "f5c81acb-2451-402f-9b6f-a4ee980f44b0" },
    { label: "Design", value: "design" },
    { label: "Business", value: "business" },
    { label: "Marketing", value: "marketing" },
    { label: "Data Science", value: "data-science" },
    { label: "Mobile Development", value: "mobile-dev" },
  ]

  return (
    <FormSection
      id="metadata"
      title="Module Metadata"
      icon={<Settings className="h-5 w-5" />}
      description="Configure module categorization and discovery settings"
      sectionRef={sectionRef}
      isActive={isActive}
    >
      <div className="space-y-6">
        {/* Tags */}
        <Select
          label="Tags"
          labelIcon={<Tag className="h-3.5 w-3.5" />}
          name="tags"
          placeholder="Select module tags"
          value={formData.tags || []}
          onChange={handleInputChange}
          options={tags}
          isMulti
          helperText="Tags help students discover your module"
        />

        {/* Categories */}
        <Select
          label="Categories"
          labelIcon={<FolderOpen className="h-3.5 w-3.5" />}
          name="categoryIds"
          placeholder="Select module categories"
          value={formData.categoryIds || []}
          onChange={handleInputChange}
          options={categories}
          isMulti
          helperText="Choose relevant categories for your module"
        />
      </div>
    </FormSection>
  )
})
