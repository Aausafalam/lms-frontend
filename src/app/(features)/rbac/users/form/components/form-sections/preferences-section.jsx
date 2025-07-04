"use client"

import { memo } from "react"
import { Settings, Bell, Globe, Palette, Clock } from "lucide-react"
import { Select } from "@/components/ui/select"
import { FormSection } from "@/components/formSection"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"

export const PreferencesSection = memo(function PreferencesSection({
  handlers = {},
  formData = {},
  sectionRef,
  isActive,
}) {
  const { handleInputChange } = handlers

  const handleSwitchChange = (field, checked) => {
    handleInputChange({
      target: {
        name: field,
        value: checked,
      },
    })
  }

  const languageOptions = [
    { label: "English", value: "en" },
    { label: "Spanish", value: "es" },
    { label: "French", value: "fr" },
    { label: "German", value: "de" },
    { label: "Italian", value: "it" },
    { label: "Portuguese", value: "pt" },
  ]

  const timezoneOptions = [
    { label: "UTC", value: "UTC" },
    { label: "Eastern Time", value: "America/New_York" },
    { label: "Central Time", value: "America/Chicago" },
    { label: "Mountain Time", value: "America/Denver" },
    { label: "Pacific Time", value: "America/Los_Angeles" },
    { label: "London", value: "Europe/London" },
    { label: "Paris", value: "Europe/Paris" },
    { label: "Tokyo", value: "Asia/Tokyo" },
  ]

  const themeOptions = [
    { label: "Light", value: "light" },
    { label: "Dark", value: "dark" },
    { label: "Auto (System)", value: "auto" },
  ]

  return (
    <FormSection
      id="preferences"
      title="User Preferences"
      icon={<Settings className="h-5 w-5" />}
      description="Configure user interface and notification preferences"
      sectionRef={sectionRef}
      isActive={isActive}
    >
      <div className="space-y-6">
        {/* Language & Region */}
        <div className="space-y-4">
          <h4 className="font-medium text-gray-900 dark:text-white flex items-center gap-2">
            <Globe className="w-4 w-4 text-orange-500" />
            Language & Region
          </h4>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Select
              label="Language"
              labelIcon={<Globe className="h-3.5 w-3.5" />}
              name="language"
              placeholder="Select language"
              value={formData.language || "en"}
              onChange={handleInputChange}
              options={languageOptions}
              helperText="Choose the user's preferred language"
            />

            <Select
              label="Timezone"
              labelIcon={<Clock className="h-3.5 w-3.5" />}
              name="timezone"
              placeholder="Select timezone"
              value={formData.timezone || "UTC"}
              onChange={handleInputChange}
              options={timezoneOptions}
              helperText="Set the user's timezone"
            />
          </div>
        </div>

        {/* Theme */}
        <div className="space-y-4">
          <h4 className="font-medium text-gray-900 dark:text-white flex items-center gap-2">
            <Palette className="w-4 w-4 text-orange-500" />
            Theme & Display
          </h4>

          <Select
            label="Theme"
            labelIcon={<Palette className="h-3.5 w-3.5" />}
            name="theme"
            placeholder="Select theme"
            value={formData.theme || "light"}
            onChange={handleInputChange}
            options={themeOptions}
            helperText="Choose the user's preferred theme"
          />
        </div>

        {/* Notifications */}
        <div className="space-y-4">
          <h4 className="font-medium text-gray-900 dark:text-white flex items-center gap-2">
            <Bell className="w-4 w-4 text-orange-500" />
            Notification Preferences
          </h4>

          <div className="space-y-3">
            <div className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
              <div className="flex items-center space-x-3">
                <Bell className="w-5 h-5 text-gray-400" />
                <div>
                  <Label className="text-sm font-medium">Email Notifications</Label>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Receive notifications via email</p>
                </div>
              </div>
              <Switch
                checked={formData.emailNotifications || false}
                onCheckedChange={(checked) => handleSwitchChange("emailNotifications", checked)}
              />
            </div>

            <div className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
              <div className="flex items-center space-x-3">
                <Bell className="w-5 h-5 text-gray-400" />
                <div>
                  <Label className="text-sm font-medium">Push Notifications</Label>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Receive browser push notifications</p>
                </div>
              </div>
              <Switch
                checked={formData.pushNotifications || false}
                onCheckedChange={(checked) => handleSwitchChange("pushNotifications", checked)}
              />
            </div>

            <div className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
              <div className="flex items-center space-x-3">
                <Bell className="w-5 h-5 text-gray-400" />
                <div>
                  <Label className="text-sm font-medium">SMS Notifications</Label>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Receive notifications via SMS</p>
                </div>
              </div>
              <Switch
                checked={formData.smsNotifications || false}
                onCheckedChange={(checked) => handleSwitchChange("smsNotifications", checked)}
              />
            </div>
          </div>
        </div>

        <div className="bg-orange-50 dark:bg-orange-950/10 rounded-lg p-4 border border-orange-100 dark:border-orange-900/20">
          <p className="text-sm text-orange-700 dark:text-orange-400 flex items-center gap-2">
            <Settings className="h-4 w-4" />
            <span>
              These preferences will be applied to the user's account and can be changed later by the user or
              administrators.
            </span>
          </p>
        </div>
      </div>
    </FormSection>
  )
})
