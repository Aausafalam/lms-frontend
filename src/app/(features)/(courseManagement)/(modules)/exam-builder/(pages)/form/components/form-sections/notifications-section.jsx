"use client"

import { memo } from "react"
import { Mail, Bell, MessageSquare, Clock, Users } from "lucide-react"
import { FormSection } from "./form-section"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select } from "@/components/ui/select"

export const NotificationsSection = memo(function NotificationsSection({
  handlers = {},
  formData = {},
  sectionRef,
  isActive,
}) {
  const { handleNotificationSettingsChange } = handlers

  const notificationSettings = formData.notificationSettings || {
    enableEmailNotifications: true,
    enableSMSNotifications: false,
    enablePushNotifications: true,
    sendExamReminders: true,
    reminderIntervals: [24, 1], // hours before exam
    sendResultNotifications: true,
    sendStartNotifications: true,
    sendSubmissionConfirmation: true,
    customEmailTemplate: false,
    emailSubjectTemplate: "",
    emailBodyTemplate: "",
    notifyInstructors: true,
    notifyAdmins: false,
    enableAutoReminders: true,
    reminderFrequency: "daily",
  }

  const reminderFrequencyOptions = [
    { label: "Daily", value: "daily" },
    { label: "Weekly", value: "weekly" },
    { label: "Custom", value: "custom" },
  ]

  const studentName = "John Doe"
  const examName = "Math Exam"
  const timeRemaining = "1 hour"
  const examDate = "2023-10-15"

  return (
    <FormSection
      id="notifications"
      title="Notifications & Communications"
      icon={<Mail className="h-5 w-5" />}
      description="Configure notification settings and communication templates"
      sectionRef={sectionRef}
      isActive={isActive}
    >
      <div className="space-y-6">
        <div className="space-y-4">
          <h4 className="font-medium text-gray-900 dark:text-white flex items-center">
            <Bell className="h-4 w-4 mr-2" />
            Notification Channels
          </h4>

          <div className="grid grid-cols-1 gap-4 pl-6">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-base">Enable Email Notifications</Label>
                <p className="text-sm text-muted-foreground">Send notifications via email</p>
              </div>
              <Switch
                checked={notificationSettings.enableEmailNotifications || false}
                onCheckedChange={(checked) => handleNotificationSettingsChange("enableEmailNotifications", checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-base">Enable SMS Notifications</Label>
                <p className="text-sm text-muted-foreground">Send notifications via SMS</p>
              </div>
              <Switch
                checked={notificationSettings.enableSMSNotifications || false}
                onCheckedChange={(checked) => handleNotificationSettingsChange("enableSMSNotifications", checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-base">Enable Push Notifications</Label>
                <p className="text-sm text-muted-foreground">Send browser/app push notifications</p>
              </div>
              <Switch
                checked={notificationSettings.enablePushNotifications || false}
                onCheckedChange={(checked) => handleNotificationSettingsChange("enablePushNotifications", checked)}
              />
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h4 className="font-medium text-gray-900 dark:text-white flex items-center">
            <Clock className="h-4 w-4 mr-2" />
            Exam Notifications
          </h4>

          <div className="grid grid-cols-1 gap-4 pl-6">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-base">Send Exam Reminders</Label>
                <p className="text-sm text-muted-foreground">Remind students about upcoming exams</p>
              </div>
              <Switch
                checked={notificationSettings.sendExamReminders || false}
                onCheckedChange={(checked) => handleNotificationSettingsChange("sendExamReminders", checked)}
              />
            </div>

            {notificationSettings.sendExamReminders && (
              <div className="pl-6">
                <div className="space-y-2">
                  <Label>Reminder Intervals (hours before exam)</Label>
                  <div className="flex gap-2">
                    <Input
                      placeholder="24"
                      value={notificationSettings.reminderIntervals?.[0] || ""}
                      onChange={(e) => {
                        const newIntervals = [...(notificationSettings.reminderIntervals || [])]
                        newIntervals[0] = Number.parseInt(e.target.value, 10)
                        handleNotificationSettingsChange("reminderIntervals", newIntervals)
                      }}
                      className="w-20"
                    />
                    <Input
                      placeholder="1"
                      value={notificationSettings.reminderIntervals?.[1] || ""}
                      onChange={(e) => {
                        const newIntervals = [...(notificationSettings.reminderIntervals || [])]
                        newIntervals[1] = Number.parseInt(e.target.value, 10)
                        handleNotificationSettingsChange("reminderIntervals", newIntervals)
                      }}
                      className="w-20"
                    />
                  </div>
                  <p className="text-sm text-muted-foreground">Send reminders at these intervals before exam start</p>
                </div>
              </div>
            )}

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-base">Send Start Notifications</Label>
                <p className="text-sm text-muted-foreground">Notify when exam becomes available</p>
              </div>
              <Switch
                checked={notificationSettings.sendStartNotifications || false}
                onCheckedChange={(checked) => handleNotificationSettingsChange("sendStartNotifications", checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-base">Send Submission Confirmation</Label>
                <p className="text-sm text-muted-foreground">Confirm successful exam submission</p>
              </div>
              <Switch
                checked={notificationSettings.sendSubmissionConfirmation || false}
                onCheckedChange={(checked) => handleNotificationSettingsChange("sendSubmissionConfirmation", checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-base">Send Result Notifications</Label>
                <p className="text-sm text-muted-foreground">Notify when results are available</p>
              </div>
              <Switch
                checked={notificationSettings.sendResultNotifications || false}
                onCheckedChange={(checked) => handleNotificationSettingsChange("sendResultNotifications", checked)}
              />
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h4 className="font-medium text-gray-900 dark:text-white flex items-center">
            <Users className="h-4 w-4 mr-2" />
            Recipient Settings
          </h4>

          <div className="grid grid-cols-1 gap-4 pl-6">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-base">Notify Instructors</Label>
                <p className="text-sm text-muted-foreground">Send notifications to exam instructors</p>
              </div>
              <Switch
                checked={notificationSettings.notifyInstructors || false}
                onCheckedChange={(checked) => handleNotificationSettingsChange("notifyInstructors", checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-base">Notify Administrators</Label>
                <p className="text-sm text-muted-foreground">Send notifications to system administrators</p>
              </div>
              <Switch
                checked={notificationSettings.notifyAdmins || false}
                onCheckedChange={(checked) => handleNotificationSettingsChange("notifyAdmins", checked)}
              />
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h4 className="font-medium text-gray-900 dark:text-white flex items-center">
            <MessageSquare className="h-4 w-4 mr-2" />
            Email Templates
          </h4>

          <div className="grid grid-cols-1 gap-4 pl-6">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-base">Use Custom Email Template</Label>
                <p className="text-sm text-muted-foreground">Customize email notification templates</p>
              </div>
              <Switch
                checked={notificationSettings.customEmailTemplate || false}
                onCheckedChange={(checked) => handleNotificationSettingsChange("customEmailTemplate", checked)}
              />
            </div>

            {notificationSettings.customEmailTemplate && (
              <div className="pl-6 space-y-4">
                <Input
                  label="Email Subject Template"
                  id="emailSubjectTemplate"
                  name="emailSubjectTemplate"
                  value={notificationSettings.emailSubjectTemplate || ""}
                  onChange={(e) => handleNotificationSettingsChange("emailSubjectTemplate", e.target.value)}
                  placeholder="Exam Reminder: {examName} - {timeRemaining}"
                  helperText="Use {examName}, {studentName}, {timeRemaining} as placeholders"
                />

                <div className="space-y-2">
                  <Label htmlFor="emailBodyTemplate">Email Body Template</Label>
                  <Textarea
                    id="emailBodyTemplate"
                    name="emailBodyTemplate"
                    rows={6}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
                    value={notificationSettings.emailBodyTemplate || ""}
                    onChange={(e) => handleNotificationSettingsChange("emailBodyTemplate", e.target.value)}
                    placeholder={`Dear ${studentName},\n\nThis is a reminder that your exam '${examName}' is scheduled to start in ${timeRemaining} on ${examDate}.\n\nBest regards,\nExam Team`}
                  />
                  <p className="text-sm text-muted-foreground">
                    Use {studentName}, {examName}, {timeRemaining}, {examDate} as placeholders
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="space-y-4">
          <h4 className="font-medium text-gray-900 dark:text-white">Auto Reminder Settings</h4>

          <div className="grid grid-cols-1 gap-4 pl-6">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-base">Enable Auto Reminders</Label>
                <p className="text-sm text-muted-foreground">Automatically send periodic reminders</p>
              </div>
              <Switch
                checked={notificationSettings.enableAutoReminders || false}
                onCheckedChange={(checked) => handleNotificationSettingsChange("enableAutoReminders", checked)}
              />
            </div>

            {notificationSettings.enableAutoReminders && (
              <div className="pl-6">
                <Select
                  label="Reminder Frequency"
                  name="reminderFrequency"
                  value={notificationSettings.reminderFrequency || "daily"}
                  onChange={(e) => handleNotificationSettingsChange("reminderFrequency", e.target.value)}
                  options={reminderFrequencyOptions}
                  helperText="How often to send automatic reminders"
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </FormSection>
  )
})
