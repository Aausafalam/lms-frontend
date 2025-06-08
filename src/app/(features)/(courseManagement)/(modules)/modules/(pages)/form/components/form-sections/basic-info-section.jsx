"use client"

import { memo } from "react"
import { FileText, Bookmark, Clock, Tag, Folder } from "lucide-react"
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

  const categories = [
    { label: "Science", value: "science" },
    { label: "Mathematics", value: "mathematics" },
    { label: "Technology", value: "technology" },
    { label: "Engineering", value: "engineering" },
    { label: "Arts", value: "arts" },
    { label: "Business", value: "business" },
  ]

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
        <Input
          label="Module Name"
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Select
            label="Categories"
            labelIcon={<Folder className="h-3.5 w-3.5" />}
            name="categoryIds"
            placeholder="Select module categories"
            value={formData.categoryIds || []}
            onChange={handleInputChange}
            options={categories}
            isMulti
            helperText="Categories help organize your modules"
          />
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
        </div>

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
          helperText="Total time needed to complete the module"
          error={
            !formData.duration || formData.duration < 1 ? "Duration is required and must be at least 1 minute" : ""
          }
        />

        <Textarea
          label="Module Summary"
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
