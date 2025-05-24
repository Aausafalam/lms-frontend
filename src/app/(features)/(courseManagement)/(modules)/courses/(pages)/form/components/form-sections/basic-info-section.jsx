"use client"
import { memo } from "react"
import { FileText, Bookmark, Clock } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { CalendarIcon } from "lucide-react"
import { FormSection } from "./form-section"

export const BasicInfoSection = memo(function BasicInfoSection({ sectionRef, isActive, formData = {}, handlers = {} }) {
  // Destructure handlers for better readability
  const { handleInputChange } = handlers

  return (
    <FormSection
      id="basic"
      title="Basic Information"
      icon={<FileText className="h-5 w-5" />}
      description="Enter the basic details about your course"
      sectionRef={sectionRef}
      isActive={isActive}
    >
      <div className="space-y-6">
        {/* Title field */}
        <Input
          label="Title"
          labelIcon={<Bookmark className="h-3.5 w-3.5" />}
          id="title"
          name="title"
          placeholder="Enter course title"
          value={formData.title || ""}
          onChange={handleInputChange}
          required
        />

        {/* Short description field */}
        <Textarea
          label="Short Description"
          labelIcon={<FileText className="h-3.5 w-3.5" />}
          id="shortDescription"
          name="shortDescription"
          placeholder="Brief overview of the course"
          value={formData.shortDescription || ""}
          onChange={handleInputChange}
          required
        />

        {/* Date and duration fields - arranged in a responsive grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Published At"
            labelIcon={<CalendarIcon className="h-3.5 w-3.5" />}
            id="publishedAt"
            name="publishedAt"
            placeholder="Pick a date"
            value={formData.publishedAt || ""}
            onChange={handleInputChange}
            type="date"
            required
          />

          <Input
            label="Estimated Duration"
            labelIcon={<Clock className="h-3.5 w-3.5" />}
            id="estimatedDuration"
            name="estimatedDuration"
            min="1"
            value={formData.estimatedDuration || ""}
            onChange={handleInputChange}
            placeholder="Enter estimated duration (in hours)"
            required
          />
        </div>
      </div>
    </FormSection>
  )
})
