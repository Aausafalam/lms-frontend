"use client"

import { memo } from "react"
import { Shield, Users, Lock } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Select } from "@/components/ui/select"
import { FormSection } from "@/components/formSection"

export const AccessSection = memo(function AccessSection({ handlers = {}, formData = {}, sectionRef, isActive }) {
  const { handleInputChange } = handlers

  const accessTypes = [
    { label: "Full Course Access", value: "full-course" },
    { label: "Specific Modules Only", value: "specific-modules" },
    { label: "Limited Time Access", value: "limited-time" },
    { label: "Preview Access", value: "preview" },
    { label: "Community Access", value: "community" },
  ]

  const supportLevels = [
    { label: "Basic Support", value: "basic" },
    { label: "Priority Support", value: "priority" },
    { label: "Premium Support", value: "premium" },
    { label: "No Support", value: "none" },
  ]

  return (
    <FormSection
      id="access"
      title="Access & Limits"
      icon={<Shield className="h-5 w-5" />}
      description="Define what users can access and any limitations"
      sectionRef={sectionRef}
      isActive={isActive}
    >
      <div className="space-y-6">
        <Select
          label="Access Type"
          labelIcon={<Lock className="h-3.5 w-3.5" />}
          name="accessType"
          placeholder="Select access type"
          value={formData.accessType || ""}
          onChange={handleInputChange}
          options={accessTypes}
          required
          helperText="What level of access does this plan provide?"
          error={!formData.accessType ? "Access type is required" : ""}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="User Limit (Optional)"
            labelIcon={<Users className="h-3.5 w-3.5" />}
            id="userLimit"
            name="userLimit"
            type="number"
            min="1"
            value={formData.userLimit || ""}
            onChange={handleInputChange}
            placeholder="Enter user limit"
            helperText="Maximum number of users (leave empty for unlimited)"
          />

          <Input
            label="Device Limit (Optional)"
            labelIcon={<Shield className="h-3.5 w-3.5" />}
            id="deviceLimit"
            name="deviceLimit"
            type="number"
            min="1"
            value={formData.deviceLimit || ""}
            onChange={handleInputChange}
            placeholder="Enter device limit"
            helperText="Maximum devices per user (leave empty for unlimited)"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Download Limit (Optional)"
            labelIcon={<Shield className="h-3.5 w-3.5" />}
            id="downloadLimit"
            name="downloadLimit"
            type="number"
            min="0"
            value={formData.downloadLimit || ""}
            onChange={handleInputChange}
            placeholder="Enter download limit"
            helperText="Maximum downloads per month (leave empty for unlimited)"
          />

          <Select
            label="Support Level"
            labelIcon={<Users className="h-3.5 w-3.5" />}
            name="supportLevel"
            placeholder="Select support level"
            value={formData.supportLevel || "basic"}
            onChange={handleInputChange}
            options={supportLevels}
            helperText="Level of customer support included"
          />
        </div>

        <div className="bg-orange-50 dark:bg-orange-950/10 rounded-lg p-4 border border-orange-100 dark:border-orange-900/20">
          <p className="text-sm text-orange-700 dark:text-orange-400">
            <strong>Tip:</strong> Leave limits empty for unlimited access. Consider your server resources when setting
            limits.
          </p>
        </div>
      </div>
    </FormSection>
  )
})
