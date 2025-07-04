"use client"

import { memo } from "react"
import { Settings, RefreshCw, DollarSign } from "lucide-react"
import { FormSection } from "@/components/formSection"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"

export const SettingsSection = memo(function SettingsSection({ handlers = {}, formData = {}, sectionRef, isActive }) {
  const { handleInputChange, handleSwitchChange } = handlers

  return (
    <FormSection
      id="settings"
      title="Cancellation & Refund Settings"
      icon={<Settings className="h-5 w-5" />}
      description="Configure cancellation and refund policies"
      sectionRef={sectionRef}
      isActive={isActive}
    >
      <div className="space-y-6">
        <div className="bg-orange-50 dark:bg-orange-950/10 rounded-lg p-4 border border-orange-100 dark:border-orange-900/20">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-orange-100 dark:bg-orange-900/30 rounded-lg">
                <DollarSign className="h-4 w-4 text-orange-600 dark:text-orange-400" />
              </div>
              <div>
                <Label htmlFor="cancellation.isRefundable" className="text-sm font-medium">
                  Refundable Plan
                </Label>
                <p className="text-xs text-gray-500 dark:text-gray-400">Allow refunds for this plan</p>
              </div>
            </div>
            <Switch
              id="cancellation.isRefundable"
              checked={formData.cancellation?.isRefundable || false}
              onCheckedChange={(checked) => handleSwitchChange("cancellation.isRefundable", checked)}
            />
          </div>

          {formData.cancellation?.isRefundable && (
            <div className="space-y-4 mt-4">
              <p className="text-sm text-orange-700 dark:text-orange-400 mb-3">
                <strong>Refund Settings:</strong> Configure the refund policy
              </p>
              <Input
                label="Refund Window (Days)"
                labelIcon={<RefreshCw className="h-3.5 w-3.5" />}
                id="cancellation.refundWindowDays"
                name="cancellation.refundWindowDays"
                type="number"
                min="0"
                max="365"
                value={formData.cancellation?.refundWindowDays || ""}
                onChange={handleInputChange}
                placeholder="Enter refund window in days"
                helperText="Number of days customers can request a refund"
              />
            </div>
          )}
        </div>

        <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
          <h4 className="font-medium text-gray-900 dark:text-white mb-2">Plan Status</h4>
          <div className="flex items-center justify-between p-3 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800">
            <div>
              <Label htmlFor="isActive" className="text-sm font-medium">
                Active Plan
              </Label>
              <p className="text-xs text-gray-500 dark:text-gray-400">Make this plan available for purchase</p>
            </div>
            <Switch
              id="isActive"
              checked={formData.isActive || false}
              onCheckedChange={(checked) => handleSwitchChange("isActive", checked)}
            />
          </div>
        </div>
      </div>
    </FormSection>
  )
})
