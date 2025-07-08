"use client"

import { memo } from "react"
import { FileText, Bookmark, Clock, Tag } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select } from "@/components/ui/select"
import { FormSection } from "@/components/formSection"

export const BasicInfoSection = memo(function BasicInfoSection({ sectionRef, isActive, formData = {}, handlers = {} }) {
  const { handleInputChange } = handlers

  const tags = [
    { label: "Physics", value: "physics" },
    { label: "Class 12", value: "class12" },
    { label: "CBSE", value: "cbse" },
    { label: "Electrostatics", value: "electrostatics" },
    { label: "Essential", value: "essential" },
    { label: "Advanced", value: "advanced" },
  ]

  return (
    <FormSection
      id="basic"
      title="Basic Information"
      icon={<FileText className="h-5 w-5" />}
      description="Enter the essential details about your lesson"
      sectionRef={sectionRef}
      isActive={isActive}
    >
      <div className="space-y-6">
        <Input
          label="Lesson Name"
          labelIcon={<Bookmark className="h-3.5 w-3.5" />}
          id="name"
          name="name"
          placeholder="Enter lesson name"
          value={formData.name || ""}
          onChange={handleInputChange}
          required
          helperText="Choose a clear, descriptive name for your lesson"
          error={!formData.name ? "Lesson name is required" : ""}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Select
            label="Tags"
            labelIcon={<Tag className="h-3.5 w-3.5" />}
            name="tags"
            placeholder="Select lesson tags"
            value={formData.tags || []}
            onChange={handleInputChange}
            options={tags}
            isMulti
            helperText="Tags help students discover your lesson"
          />
          <Input
            label="Estimated Duration (minutes)"
            labelIcon={<Clock className="h-3.5 w-3.5" />}
            id="duration"
            name="duration"
            type="number"
            min="1"
            value={formData.duration || ""}
            onChange={handleInputChange}
            placeholder="Enter estimated duration"
            required
            helperText="Total time needed to complete the lesson"
            error={
              !formData.duration || formData.duration < 1 ? "Duration is required and must be at least 1 minute" : ""
            }
          />
        </div>

        <Textarea
          label="Lesson Summary"
          labelIcon={<FileText className="h-3.5 w-3.5" />}
          id="summary"
          name="summary"
          placeholder="Brief overview of the lesson"
          value={formData.summary || ""}
          onChange={handleInputChange}
          required
          rows={3}
          helperText="A concise description that appears in lesson listings"
          error={!formData.summary ? "Lesson summary is required" : ""}
        />
      </div>
    </FormSection>
  )
})
