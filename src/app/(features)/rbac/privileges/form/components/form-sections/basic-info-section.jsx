"use client"

import { memo } from "react"
import { FileText, Key } from "lucide-react"
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
      description="Enter the essential details about your privilege"
      sectionRef={sectionRef}
      isActive={isActive}
    >
      <div className="space-y-6">
        <Input
          label="Privilege Name"
          labelIcon={<Key className="h-3.5 w-3.5" />}
          id="name"
          name="name"
          placeholder="Enter privilege name (e.g., User Create)"
          value={formData.name || ""}
          onChange={handleInputChange}
          required
          helperText="A unique name for this privilege"
          error={!formData.name ? "Privilege name is required" : ""}
        />

        <Textarea
          label="Description"
          labelIcon={<FileText className="h-3.5 w-3.5" />}
          id="description"
          name="description"
          placeholder="Describe what this privilege allows users to do..."
          value={formData.description || ""}
          onChange={handleInputChange}
          rows={4}
          helperText="A detailed description of what permissions this privilege grants"
        />
      </div>
    </FormSection>
  )
})
