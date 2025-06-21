"use client"

import { memo } from "react"
import { FileText, UserCheck } from "lucide-react"
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
      description="Enter the essential details about your role"
      sectionRef={sectionRef}
      isActive={isActive}
    >
      <div className="space-y-6">
        <Input
          label="Role Name"
          labelIcon={<UserCheck className="h-3.5 w-3.5" />}
          id="name"
          name="name"
          placeholder="Enter role name (e.g., Administrator)"
          value={formData.name || ""}
          onChange={handleInputChange}
          required
          helperText="A unique name for this role"
          error={!formData.name ? "Role name is required" : ""}
        />

        <Textarea
          label="Description"
          labelIcon={<FileText className="h-3.5 w-3.5" />}
          id="description"
          name="description"
          placeholder="Describe the purpose and responsibilities of this role..."
          value={formData.description || ""}
          onChange={handleInputChange}
          rows={4}
          helperText="A detailed description of what this role encompasses"
        />
      </div>
    </FormSection>
  )
})
