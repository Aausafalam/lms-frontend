"use client"

import { memo } from "react"
import { Settings, Code, Tag } from "lucide-react"
import { Select } from "@/components/ui/select"
import { FormSection } from "@/components/formSection"

export const ConfigurationSection = memo(function ConfigurationSection({
  handlers = {},
  formData = {},
  sectionRef,
  isActive,
}) {
  const { handleInputChange } = handlers

  const methodOptions = [
    { label: "GET", value: "GET" },
    { label: "POST", value: "POST" },
    { label: "PUT", value: "PUT" },
    { label: "DELETE", value: "DELETE" },
    { label: "PATCH", value: "PATCH" },
  ]

  const typeOptions = [
    { label: "API", value: "API" },
    { label: "WEB", value: "WEB" },
    { label: "WEBHOOK", value: "WEBHOOK" },
  ]

  return (
    <FormSection
      id="configuration"
      title="Route Configuration"
      icon={<Settings className="h-5 w-5" />}
      description="Configure the technical details of your route"
      sectionRef={sectionRef}
      isActive={isActive}
    >
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Select
            label="HTTP Method"
            labelIcon={<Code className="h-3.5 w-3.5" />}
            name="method"
            placeholder="Select HTTP method"
            value={formData.method || ""}
            onChange={handleInputChange}
            options={methodOptions}
            required
            helperText="The HTTP method for this route"
            error={!formData.method ? "HTTP method is required" : ""}
          />

          <Select
            label="Route Type"
            labelIcon={<Tag className="h-3.5 w-3.5" />}
            name="type"
            placeholder="Select route type"
            value={formData.type || ""}
            onChange={handleInputChange}
            options={typeOptions}
            required
            helperText="The type/category of this route"
            error={!formData.type ? "Route type is required" : ""}
          />
        </div>
      </div>
    </FormSection>
  )
})
