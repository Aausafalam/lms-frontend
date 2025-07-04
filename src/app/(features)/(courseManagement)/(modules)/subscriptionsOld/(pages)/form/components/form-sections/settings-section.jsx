"use client"

import { memo } from "react"
import { Settings, Award, Eye, Shield, Gift } from "lucide-react"
import { FormSection } from "@/components/formSection"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"

export const SettingsSection = memo(function SettingsSection({ handlers = {}, formData = {}, sectionRef, isActive }) {
  const { handleInputChange, handleSwitchChange } = handlers

  return (
    <FormSection
      id="settings"
      title="Plan Settings"
      icon={<Settings className="h-5 w-5" />}
      description="Configure additional settings and flags for your subscription plan"
      sectionRef={sectionRef}
      isActive={isActive}
    >
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
                  <Eye className="h-4 w-4 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <Label htmlFor="isActive" className="text-sm font-medium">
                    Active Plan
                  </Label>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Make this plan available for purchase</p>
                </div>
              </div>
              <Switch
                id="isActive"
                checked={formData.isActive || false}
                onCheckedChange={(checked) => handleSwitchChange("isActive", checked)}
              />
            </div>

            <div className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-yellow-100 dark:bg-yellow-900/30 rounded-lg">
                  <Award className="h-4 w-4 text-yellow-600 dark:text-yellow-400" />
                </div>
                <div>
                  <Label htmlFor="isPopular" className="text-sm font-medium">
                    Popular Plan
                  </Label>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Highlight as most popular choice</p>
                </div>
              </div>
              <Switch
                id="isPopular"
                checked={formData.isPopular || false}
                onCheckedChange={(checked) => handleSwitchChange("isPopular", checked)}
              />
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                  <Gift className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <Label htmlFor="isTrial" className="text-sm font-medium">
                    Trial Plan
                  </Label>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Offer as a free trial option</p>
                </div>
              </div>
              <Switch
                id="isTrial"
                checked={formData.isTrial || false}
                onCheckedChange={(checked) => handleSwitchChange("isTrial", checked)}
              />
            </div>

            <div className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                  <Shield className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                </div>
                <div>
                  <Label htmlFor="hasCertificate" className="text-sm font-medium">
                    Certificate Included
                  </Label>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Include completion certificate</p>
                </div>
              </div>
              <Switch
                id="hasCertificate"
                checked={formData.hasCertificate || false}
                onCheckedChange={(checked) => handleSwitchChange("hasCertificate", checked)}
              />
            </div>
          </div>
        </div>

        {formData.isTrial && (
          <div className="space-y-4">
            <div className="bg-blue-50 dark:bg-blue-950/10 rounded-lg p-4 border border-blue-100 dark:border-blue-900/20">
              <p className="text-sm text-blue-700 dark:text-blue-400 mb-3">
                <strong>Trial Plan Settings:</strong> Configure the free trial period
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="Trial Duration (Days)"
                  id="trialDuration"
                  name="trialDuration"
                  type="number"
                  min="1"
                  max="365"
                  value={formData.trialDuration || ""}
                  onChange={handleInputChange}
                  placeholder="Enter trial duration"
                  helperText="How many days of free access"
                />
                <Input
                  label="Trial User Limit"
                  id="trialUserLimit"
                  name="trialUserLimit"
                  type="number"
                  min="1"
                  value={formData.trialUserLimit || ""}
                  onChange={handleInputChange}
                  placeholder="Enter user limit for trial"
                  helperText="Maximum users for trial (optional)"
                />
              </div>
            </div>
          </div>
        )}

        <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
          <h4 className="font-medium text-gray-900 dark:text-white mb-2">Additional Settings</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Sort Order"
              id="sortOrder"
              name="sortOrder"
              type="number"
              min="0"
              value={formData.sortOrder || ""}
              onChange={handleInputChange}
              placeholder="Enter sort order"
              helperText="Display order (lower numbers first)"
            />
            <Input
              label="Max Enrollments"
              id="maxEnrollments"
              name="maxEnrollments"
              type="number"
              min="1"
              value={formData.maxEnrollments || ""}
              onChange={handleInputChange}
              placeholder="Enter max enrollments"
              helperText="Maximum total enrollments (optional)"
            />
          </div>
        </div>
      </div>
    </FormSection>
  )
})
