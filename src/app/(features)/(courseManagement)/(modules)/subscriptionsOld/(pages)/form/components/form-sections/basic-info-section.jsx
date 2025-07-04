"use client"

import { memo } from "react"
import { FileText, CreditCard, Clock } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select } from "@/components/ui/select"
import { FormSection } from "@/components/formSection"

export const BasicInfoSection = memo(function BasicInfoSection({ sectionRef, isActive, formData = {}, handlers = {} }) {
  const { handleInputChange } = handlers

  const planTypes = [
    { label: "Monthly", value: "monthly" },
    { label: "Yearly", value: "yearly" },
    { label: "One-Time", value: "one-time" },
    { label: "Lifetime", value: "lifetime" },
    { label: "Weekly", value: "weekly" },
  ]

  return (
    <FormSection
      id="basic"
      title="Basic Information"
      icon={<FileText className="h-5 w-5" />}
      description="Enter the essential details about your subscription plan"
      sectionRef={sectionRef}
      isActive={isActive}
    >
      <div className="space-y-6">
        <Input
          label="Plan Name"
          labelIcon={<CreditCard className="h-3.5 w-3.5" />}
          id="planName"
          name="planName"
          placeholder="Enter plan name (e.g., Premium Monthly, Basic Yearly)"
          value={formData.planName || ""}
          onChange={handleInputChange}
          required
          helperText="Choose a clear, descriptive name for your subscription plan"
          error={!formData.planName ? "Plan name is required" : ""}
        />

        <Select
          label="Plan Type"
          labelIcon={<Clock className="h-3.5 w-3.5" />}
          name="planType"
          placeholder="Select plan type"
          value={formData.planType || ""}
          onChange={handleInputChange}
          options={planTypes}
          required
          helperText="Choose the billing frequency for this plan"
          error={!formData.planType ? "Plan type is required" : ""}
        />

        <Textarea
          label="Plan Description"
          labelIcon={<FileText className="h-3.5 w-3.5" />}
          id="description"
          name="description"
          placeholder="Describe what this subscription plan offers..."
          value={formData.description || ""}
          onChange={handleInputChange}
          required
          rows={4}
          helperText="A detailed description that helps users understand the value of this plan"
          error={!formData.description ? "Plan description is required" : ""}
        />
      </div>
    </FormSection>
  )
})
