"use client"

import { memo } from "react"
import { Calendar, Clock, Users, Key, CheckCircle } from "lucide-react"
import { FormSection } from "./form-section"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select } from "@/components/ui/select"

export const SchedulingAccessSection = memo(function SchedulingAccessSection({
  handlers = {},
  formData = {},
  sectionRef,
  isActive,
}) {
  const { handleSchedulingSettingsChange } = handlers

  const schedulingSettings = formData.schedulingSettings || {
    enableScheduling: false,
    startDate: "",
    endDate: "",
    startTime: "",
    endTime: "",
    timeZone: "UTC",
    maxAttempts: 1,
    attemptCooldown: 0,
    enableAccessCode: false,
    accessCode: "",
    allowedUserGroups: [],
    enablePrerequisites: false,
    prerequisiteExams: [],
    enableGracePeriod: false,
    gracePeriodMinutes: 15,
    enableLateSubmission: false,
    lateSubmissionPenalty: 0,
  }

  const timeZoneOptions = [
    { label: "UTC", value: "UTC" },
    { label: "EST (Eastern)", value: "America/New_York" },
    { label: "PST (Pacific)", value: "America/Los_Angeles" },
    { label: "IST (India)", value: "Asia/Kolkata" },
    { label: "GMT (London)", value: "Europe/London" },
    { label: "CET (Central Europe)", value: "Europe/Paris" },
  ]

  const userGroupOptions = [
    { label: "All Students", value: "all_students" },
    { label: "Premium Students", value: "premium_students" },
    { label: "Class 12", value: "class_12" },
    { label: "Engineering Students", value: "engineering" },
    { label: "Medical Students", value: "medical" },
  ]

  return (
    <FormSection
      id="scheduling-access"
      title="Scheduling & Access Control"
      icon={<Calendar className="h-5 w-5" />}
      description="Configure when and who can access the exam"
      sectionRef={sectionRef}
      isActive={isActive}
    >
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label className="text-base flex items-center">
              <Calendar className="h-4 w-4 mr-2" />
              Enable Scheduling
            </Label>
            <p className="text-sm text-muted-foreground">Set specific dates and times for exam availability</p>
          </div>
          <Switch
            checked={schedulingSettings.enableScheduling || false}
            onCheckedChange={(checked) => handleSchedulingSettingsChange("enableScheduling", checked)}
          />
        </div>

        {schedulingSettings.enableScheduling && (
          <div className="space-y-4 pl-6 border-l-2 border-blue-100 dark:border-blue-900/30">
            <div className="grid grid-cols-2 gap-4">
              <Input
                label="Start Date"
                id="startDate"
                name="startDate"
                type="date"
                value={schedulingSettings.startDate || ""}
                onChange={(e) => handleSchedulingSettingsChange("startDate", e.target.value)}
                helperText="When the exam becomes available"
              />

              <Input
                label="End Date"
                id="endDate"
                name="endDate"
                type="date"
                value={schedulingSettings.endDate || ""}
                onChange={(e) => handleSchedulingSettingsChange("endDate", e.target.value)}
                helperText="When the exam closes"
              />
            </div>

            <div className="grid grid-cols-3 gap-4">
              <Input
                label="Start Time"
                id="startTime"
                name="startTime"
                type="time"
                value={schedulingSettings.startTime || ""}
                onChange={(e) => handleSchedulingSettingsChange("startTime", e.target.value)}
              />

              <Input
                label="End Time"
                id="endTime"
                name="endTime"
                type="time"
                value={schedulingSettings.endTime || ""}
                onChange={(e) => handleSchedulingSettingsChange("endTime", e.target.value)}
              />

              <Select
                label="Time Zone"
                name="timeZone"
                value={schedulingSettings.timeZone || "UTC"}
                onChange={(e) => handleSchedulingSettingsChange("timeZone", e.target.value)}
                options={timeZoneOptions}
              />
            </div>
          </div>
        )}

        <div className="space-y-4">
          <h4 className="font-medium text-gray-900 dark:text-white flex items-center">
            <Users className="h-4 w-4 mr-2" />
            Access Control
          </h4>

          <div className="grid grid-cols-2 gap-6">
            <Input
              label="Maximum Attempts"
              labelIcon={<CheckCircle className="h-3.5 w-3.5" />}
              id="maxAttempts"
              name="maxAttempts"
              type="number"
              min="1"
              value={schedulingSettings.maxAttempts || ""}
              onChange={(e) => handleSchedulingSettingsChange("maxAttempts", Number.parseInt(e.target.value, 10))}
              placeholder="Enter max attempts"
              helperText="Number of times a student can attempt"
            />

            <Input
              label="Attempt Cooldown (hours)"
              labelIcon={<Clock className="h-3.5 w-3.5" />}
              id="attemptCooldown"
              name="attemptCooldown"
              type="number"
              min="0"
              value={schedulingSettings.attemptCooldown || ""}
              onChange={(e) => handleSchedulingSettingsChange("attemptCooldown", Number.parseInt(e.target.value, 10))}
              placeholder="Enter cooldown period"
              helperText="Hours between attempts"
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label className="text-base flex items-center">
                <Key className="h-4 w-4 mr-2" />
                Enable Access Code
              </Label>
              <p className="text-sm text-muted-foreground">Require a code to access the exam</p>
            </div>
            <Switch
              checked={schedulingSettings.enableAccessCode || false}
              onCheckedChange={(checked) => handleSchedulingSettingsChange("enableAccessCode", checked)}
            />
          </div>

          {schedulingSettings.enableAccessCode && (
            <div className="pl-6">
              <Input
                label="Access Code"
                id="accessCode"
                name="accessCode"
                value={schedulingSettings.accessCode || ""}
                onChange={(e) => handleSchedulingSettingsChange("accessCode", e.target.value)}
                placeholder="Enter access code"
                helperText="Students must enter this code to start the exam"
              />
            </div>
          )}

          <Select
            label="Allowed User Groups"
            labelIcon={<Users className="h-3.5 w-3.5" />}
            name="allowedUserGroups"
            placeholder="Select user groups"
            value={schedulingSettings.allowedUserGroups || []}
            onChange={(e) => handleSchedulingSettingsChange("allowedUserGroups", e.target.value)}
            options={userGroupOptions}
            isMulti
            helperText="Which user groups can access this exam"
          />
        </div>

        <div className="space-y-4">
          <h4 className="font-medium text-gray-900 dark:text-white">Advanced Settings</h4>

          <div className="grid grid-cols-2 gap-6">
            <Input
              label="Grace Period (minutes)"
              id="gracePeriodMinutes"
              name="gracePeriodMinutes"
              type="number"
              min="0"
              value={schedulingSettings.gracePeriodMinutes || ""}
              onChange={(e) =>
                handleSchedulingSettingsChange("gracePeriodMinutes", Number.parseInt(e.target.value, 10))
              }
              placeholder="Enter grace period"
              helperText="Extra time after exam ends"
            />

            <Input
              label="Late Submission Penalty (%)"
              id="lateSubmissionPenalty"
              name="lateSubmissionPenalty"
              type="number"
              min="0"
              max="100"
              value={schedulingSettings.lateSubmissionPenalty || ""}
              onChange={(e) =>
                handleSchedulingSettingsChange("lateSubmissionPenalty", Number.parseInt(e.target.value, 10))
              }
              placeholder="Enter penalty percentage"
              helperText="Marks deducted for late submission"
            />
          </div>
        </div>
      </div>
    </FormSection>
  )
})
