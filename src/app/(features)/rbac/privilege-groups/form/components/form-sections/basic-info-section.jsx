"use client"

import { memo } from "react"
import { FileText, Tag } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { FormSection } from "@/components/formSection"

export const BasicInfoSection = memo(function BasicInfoSection({ sectionRef, isActive, formData = {}, handlers = {} }) {
  const { handleInputChange } = handlers

  return (
    <FormSection
      id="basic"
      title="Basic Information"
      icon={<FileText className="h-5 w-5" />}
      description="Enter the essential details about your privilege group"
      sectionRef={sectionRef}
      isActive={isActive}
    >
      <div className="space-y-6">
        <Input
          label="Group Name"
          labelIcon={<Tag className="h-3.5 w-3.5" />}
          id="name"
          name="name"
          placeholder="Enter privilege group name (e.g., User Management)"
          value={formData.name || ""}
          onChange={handleInputChange}
          required
          helperText="A unique name for this privilege group"
          error={!formData.name ? "Group name is required" : ""}
        />

        <Textarea
          label="Description"
          labelIcon={<FileText className="h-3.5 w-3.5" />}
          id="description"
          name="description"
          placeholder="Describe the purpose and scope of this privilege group..."
          value={formData.description || ""}
          onChange={handleInputChange}
          rows={4}
          helperText="A detailed description of what permissions this group contains"
        />
      </div>
    </FormSection>
  )
})
