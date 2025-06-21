"use client"

import { memo } from "react"
import { Settings, Folder } from "lucide-react"
import { Select } from "@/components/ui/select"
import { FormSection } from "@/components/formSection"

export const PrivilegeGroupSection = memo(function PrivilegeGroupSection({
  handlers = {},
  formData = {},
  sectionRef,
  isActive,
}) {
  const { handleInputChange } = handlers

  const privilegeGroupOptions = [
    { label: "User Management", value: "1" },
    { label: "Course Management", value: "2" },
    { label: "Content Administration", value: "3" },
    { label: "System Configuration", value: "4" },
    { label: "Reporting & Analytics", value: "5" },
    { label: "Financial Management", value: "6" },
    { label: "Communication Tools", value: "7" },
    { label: "Integration Management", value: "8" },
  ]

  return (
    <FormSection
      id="group"
      title="Privilege Group"
      icon={<Settings className="h-5 w-5" />}
      description="Assign this privilege to a logical group for better organization"
      sectionRef={sectionRef}
      isActive={isActive}
    >
      <div className="space-y-6">
        <Select
          label="Privilege Group"
          labelIcon={<Folder className="h-3.5 w-3.5" />}
          name="privilegeGroupId"
          placeholder="Select privilege group"
          value={formData.privilegeGroupId || ""}
          onChange={handleInputChange}
          options={privilegeGroupOptions}
          required
          helperText="Choose the group this privilege belongs to"
          error={!formData.privilegeGroupId ? "Privilege group is required" : ""}
        />

        <div className="bg-orange-50 dark:bg-orange-950/10 rounded-lg p-4 border border-orange-100 dark:border-orange-900/20">
          <p className="text-sm text-orange-700 dark:text-orange-400 flex items-center gap-2">
            <Settings className="h-4 w-4" />
            <span>
              Privilege groups help organize related permissions together. This makes it easier to manage and assign
              privileges to roles.
            </span>
          </p>
        </div>
      </div>
    </FormSection>
  )
})
