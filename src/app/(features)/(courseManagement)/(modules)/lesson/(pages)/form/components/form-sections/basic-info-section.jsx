"use client"
import { memo } from "react"
import { FileText, Bookmark, Clock, Hash } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { FormSection } from "./form-section"

/**
 * Basic Information Section Component
 * Handles module name, summary, duration, and module order
 * All fields are required for module creation
 */
export const BasicInfoSection = memo(function BasicInfoSection({ sectionRef, isActive, formData = {}, handlers = {} }) {
  const { handleInputChange } = handlers

  return (
    <FormSection
      id="basic"
      title="Basic Information"
      icon={<FileText className="h-5 w-5" />}
      description="Enter the essential details about your module"
      sectionRef={sectionRef}
      isActive={isActive}
    >
      <div className="space-y-6">
        {/* Module Name - Required */}
        <Input
          label="Module Name *"
          labelIcon={<Bookmark className="h-3.5 w-3.5" />}
          id="name"
          name="name"
          placeholder="Enter module name"
          value={formData.name || ""}
          onChange={handleInputChange}
          required
          helperText="Choose a clear, descriptive name for your module"
          error={!formData.name ? "Module name is required" : ""}
        />

        <div className="flex gap-4 mb-0">
          {/* Module Order - Required */}
          <Input
            label="Module Order *"
            labelIcon={<Hash className="h-3.5 w-3.5" />}
            id="moduleOrder"
            name="moduleOrder"
            type="number"
            min="1"
            placeholder="e.g., 1, 2, 3"
            value={formData.moduleOrder || ""}
            onChange={handleInputChange}
            required
            helperText="Order of this module in the course"
            error={
              !formData.moduleOrder || formData.moduleOrder < 1 ? "Module order is required and must be at least 1" : ""
            }
            className="mb-0"
          />
          {/* Duration - Required */}
          <Input
            label="Estimated Duration (minutes) *"
            labelIcon={<Clock className="h-3.5 w-3.5" />}
            id="duration"
            name="duration"
            type="number"
            min="1"
            value={formData.duration || ""}
            onChange={handleInputChange}
            placeholder="Enter estimated duration"
            required
            helperText="Total time needed to complete the module"
            error={
              !formData.duration || formData.duration < 1 ? "Duration is required and must be at least 1 minute" : ""
            }
            className="mb-0"
          />
        </div>

        {/* Summary - Required */}
        <Textarea
          label="Module Summary *"
          labelIcon={<FileText className="h-3.5 w-3.5" />}
          id="summary"
          name="summary"
          placeholder="Brief overview of the module"
          value={formData.summary || ""}
          onChange={handleInputChange}
          required
          rows={3}
          helperText="A concise description that appears in module listings"
          error={!formData.summary ? "Module summary is required" : ""}
        />
      </div>
    </FormSection>
  )
})
