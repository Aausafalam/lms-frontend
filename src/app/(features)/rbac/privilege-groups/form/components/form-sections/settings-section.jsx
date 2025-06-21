"use client"

import { memo } from "react"
import { Settings, Shield, CheckCircle, XCircle } from "lucide-react"
import { FormSection } from "@/components/formSection"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"

export const SettingsSection = memo(function SettingsSection({ handlers = {}, formData = {}, sectionRef, isActive }) {
  const { handleInputChange } = handlers

  const handleSwitchChange = (checked) => {
    handleInputChange({
      target: {
        name: "isActive",
        value: checked,
      },
    })
  }

  return (
    <FormSection
      id="settings"
      title="Group Settings"
      icon={<Settings className="h-5 w-5" />}
      description="Configure the status and behavior of this privilege group"
      sectionRef={sectionRef}
      isActive={isActive}
    >
      <div className="space-y-6">
        <div className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
          <div className="flex items-center space-x-3">
            <div
              className={`p-2 rounded-lg ${formData.isActive ? "bg-green-100 dark:bg-green-900/30" : "bg-gray-100 dark:bg-gray-900/30"}`}
            >
              {formData.isActive ? (
                <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400" />
              ) : (
                <XCircle className="h-5 w-5 text-gray-600 dark:text-gray-400" />
              )}
            </div>
            <div>
              <Label className="text-sm font-medium">Active Status</Label>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {formData.isActive
                  ? "This privilege group is active and can be assigned to roles"
                  : "This privilege group is inactive and cannot be used"}
              </p>
            </div>
          </div>
          <Switch
            checked={formData.isActive || false}
            onCheckedChange={handleSwitchChange}
          />
        </div>

        <div className="bg-orange-50 dark:bg-orange-950/10 rounded-lg p-4 border border-orange-100 dark:border-orange-900/20">
          <p className="text-sm text-orange-700 dark:text-orange-400 flex items-center gap-2">
            <Shield className="h-4 w-4" />
            <span>
              {formData.isActive
                ? "Active privilege groups can be assigned to roles and will be available for permission management."
                : "Inactive privilege groups are hidden from role assignment and cannot grant permissions."}
            </span>
          </p>
        </div>
      </div>
    </FormSection>
  )
})
