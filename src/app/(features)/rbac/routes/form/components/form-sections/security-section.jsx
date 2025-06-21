"use client"

import { memo } from "react"
import { Shield, Lock, Unlock } from "lucide-react"
import { FormSection } from "@/components/formSection"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"

export const SecuritySection = memo(function SecuritySection({ handlers = {}, formData = {}, sectionRef, isActive }) {
  const { handleInputChange } = handlers

  const handleSwitchChange = (checked) => {
    handleInputChange({
      target: {
        name: "isPublic",
        value: checked,
      },
    })
  }

  return (
    <FormSection
      id="security"
      title="Security Settings"
      icon={<Shield className="h-5 w-5" />}
      description="Configure access control and security settings"
      sectionRef={sectionRef}
      isActive={isActive}
    >
      <div className="space-y-6">
        <div className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
          <div className="flex items-center space-x-3">
            <div
              className={`p-2 rounded-lg ${formData.isPublic ? "bg-green-100 dark:bg-green-900/30" : "bg-red-100 dark:bg-red-900/30"}`}
            >
              {formData.isPublic ? (
                <Unlock className="h-5 w-5 text-green-600 dark:text-green-400" />
              ) : (
                <Lock className="h-5 w-5 text-red-600 dark:text-red-400" />
              )}
            </div>
            <div>
              <Label className="text-sm font-medium">Public Access</Label>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {formData.isPublic
                  ? "This route can be accessed without authentication"
                  : "This route requires authentication and proper permissions"}
              </p>
            </div>
          </div>
          <Switch checked={formData.isPublic || false} onCheckedChange={handleSwitchChange} />
        </div>

        <div className="bg-blue-50 dark:bg-blue-950/10 rounded-lg p-4 border border-blue-100 dark:border-blue-900/20">
          <p className="text-sm text-blue-700 dark:text-blue-400 flex items-center gap-2">
            <Shield className="h-4 w-4" />
            <span>
              {formData.isPublic
                ? "Public routes bypass all authentication and authorization checks."
                : "Protected routes will require users to have appropriate privileges to access."}
            </span>
          </p>
        </div>
      </div>
    </FormSection>
  )
})
