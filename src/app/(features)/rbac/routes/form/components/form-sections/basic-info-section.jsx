"use client"

import { memo } from "react"
import { FileText, Route, Globe } from "lucide-react"
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
      description="Enter the essential details about your API route"
      sectionRef={sectionRef}
      isActive={isActive}
    >
      <div className="space-y-6">
        <Input
          label="Route Name"
          labelIcon={<Route className="h-3.5 w-3.5" />}
          id="name"
          name="name"
          placeholder="Enter route name (e.g., Get Users)"
          value={formData.name || ""}
          onChange={handleInputChange}
          required
          helperText="A descriptive name for this API route"
          error={!formData.name ? "Route name is required" : ""}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Base Path"
            labelIcon={<Globe className="h-3.5 w-3.5" />}
            id="basePath"
            name="basePath"
            placeholder="/api/v1"
            value={formData.basePath || ""}
            onChange={handleInputChange}
            required
            helperText="The base path for your API"
            error={!formData.basePath ? "Base path is required" : ""}
          />

          <Input
            label="Endpoint"
            labelIcon={<Route className="h-3.5 w-3.5" />}
            id="endPoint"
            name="endPoint"
            placeholder="/users"
            value={formData.endPoint || ""}
            onChange={handleInputChange}
            required
            helperText="The specific endpoint path"
            error={!formData.endPoint ? "Endpoint is required" : ""}
          />
        </div>

        <Textarea
          label="Description"
          labelIcon={<FileText className="h-3.5 w-3.5" />}
          id="description"
          name="description"
          placeholder="Describe what this route does..."
          value={formData.description || ""}
          onChange={handleInputChange}
          rows={3}
          helperText="A detailed description of the route's functionality"
        />
      </div>
    </FormSection>
  )
})
