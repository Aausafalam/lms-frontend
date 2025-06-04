"use client"

import { memo } from "react"
import { Accessibility, Clock, Volume2, Eye, Users } from "lucide-react"
import { FormSection } from "./form-section"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select } from "@/components/ui/select"

export const AccessibilitySection = memo(function AccessibilitySection({
  handlers = {},
  formData = {},
  sectionRef,
  isActive,
}) {
  const { handleAccessibilitySettingsChange } = handlers

  const accessibilitySettings = formData.accessibilitySettings || {
    enableExtendedTime: false,
    extendedTimeMultiplier: 1.5,
    enableScreenReader: false,
    enableHighContrast: false,
    enableLargeText: false,
    fontSizeMultiplier: 1.2,
    enableAudioQuestions: false,
    enableTextToSpeech: false,
    enableKeyboardNavigation: true,
    enableColorBlindSupport: false,
    enableBreakTime: false,
    breakTimeMinutes: 10,
    maxBreaks: 2,
    enableSpecialInstructions: false,
    specialInstructionsText: "",
    enableAlternativeFormats: false,
    supportedFormats: [],
  }

  const formatOptions = [
    { label: "Large Print", value: "large_print" },
    { label: "Braille", value: "braille" },
    { label: "Audio", value: "audio" },
    { label: "Sign Language", value: "sign_language" },
  ]

  return (
    <FormSection
      id="accessibility"
      title="Accessibility & Accommodations"
      icon={<Accessibility className="h-5 w-5" />}
      description="Configure accessibility features and special accommodations"
      sectionRef={sectionRef}
      isActive={isActive}
    >
      <div className="space-y-6">
        <div className="bg-blue-50 dark:bg-blue-950/10 rounded-lg p-4 border border-blue-100 dark:border-blue-900/20">
          <p className="text-sm text-blue-700 dark:text-blue-400 flex items-center gap-2">
            <Accessibility className="h-4 w-4" />
            <span>These settings ensure your exam is accessible to students with diverse needs and abilities.</span>
          </p>
        </div>

        <div className="space-y-4">
          <h4 className="font-medium text-gray-900 dark:text-white flex items-center">
            <Clock className="h-4 w-4 mr-2" />
            Time Accommodations
          </h4>

          <div className="grid grid-cols-1 gap-4 pl-6">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-base">Enable Extended Time</Label>
                <p className="text-sm text-muted-foreground">Allow additional time for students with special needs</p>
              </div>
              <Switch
                checked={accessibilitySettings.enableExtendedTime || false}
                onCheckedChange={(checked) => handleAccessibilitySettingsChange("enableExtendedTime", checked)}
              />
            </div>

            {accessibilitySettings.enableExtendedTime && (
              <div className="pl-6 grid grid-cols-1 gap-4">
                <Input
                  label="Extended Time Multiplier"
                  id="extendedTimeMultiplier"
                  name="extendedTimeMultiplier"
                  type="number"
                  step="0.1"
                  min="1"
                  max="3"
                  value={accessibilitySettings.extendedTimeMultiplier || ""}
                  onChange={(e) =>
                    handleAccessibilitySettingsChange("extendedTimeMultiplier", Number.parseFloat(e.target.value))
                  }
                  placeholder="1.5"
                  helperText="Multiply exam duration by this factor (e.g., 1.5 = 50% extra time)"
                />
              </div>
            )}

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-base">Enable Break Time</Label>
                <p className="text-sm text-muted-foreground">Allow students to take breaks during exam</p>
              </div>
              <Switch
                checked={accessibilitySettings.enableBreakTime || false}
                onCheckedChange={(checked) => handleAccessibilitySettingsChange("enableBreakTime", checked)}
              />
            </div>

            {accessibilitySettings.enableBreakTime && (
              <div className="pl-6 grid grid-cols-2 gap-4">
                <Input
                  label="Break Time (minutes)"
                  id="breakTimeMinutes"
                  name="breakTimeMinutes"
                  type="number"
                  min="1"
                  value={accessibilitySettings.breakTimeMinutes || ""}
                  onChange={(e) =>
                    handleAccessibilitySettingsChange("breakTimeMinutes", Number.parseInt(e.target.value, 10))
                  }
                  placeholder="10"
                  helperText="Duration of each break"
                />

                <Input
                  label="Maximum Breaks"
                  id="maxBreaks"
                  name="maxBreaks"
                  type="number"
                  min="1"
                  value={accessibilitySettings.maxBreaks || ""}
                  onChange={(e) => handleAccessibilitySettingsChange("maxBreaks", Number.parseInt(e.target.value, 10))}
                  placeholder="2"
                  helperText="Number of breaks allowed"
                />
              </div>
            )}
          </div>
        </div>

        <div className="space-y-4">
          <h4 className="font-medium text-gray-900 dark:text-white flex items-center">
            <Eye className="h-4 w-4 mr-2" />
            Visual Accommodations
          </h4>

          <div className="grid grid-cols-1 gap-4 pl-6">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-base">Enable High Contrast Mode</Label>
                <p className="text-sm text-muted-foreground">Increase contrast for better visibility</p>
              </div>
              <Switch
                checked={accessibilitySettings.enableHighContrast || false}
                onCheckedChange={(checked) => handleAccessibilitySettingsChange("enableHighContrast", checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-base">Enable Large Text</Label>
                <p className="text-sm text-muted-foreground">Increase font size for better readability</p>
              </div>
              <Switch
                checked={accessibilitySettings.enableLargeText || false}
                onCheckedChange={(checked) => handleAccessibilitySettingsChange("enableLargeText", checked)}
              />
            </div>

            {accessibilitySettings.enableLargeText && (
              <div className="pl-6">
                <Input
                  label="Font Size Multiplier"
                  id="fontSizeMultiplier"
                  name="fontSizeMultiplier"
                  type="number"
                  step="0.1"
                  min="1"
                  max="2"
                  value={accessibilitySettings.fontSizeMultiplier || ""}
                  onChange={(e) =>
                    handleAccessibilitySettingsChange("fontSizeMultiplier", Number.parseFloat(e.target.value))
                  }
                  placeholder="1.2"
                  helperText="Multiply font size by this factor"
                />
              </div>
            )}

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-base">Enable Color Blind Support</Label>
                <p className="text-sm text-muted-foreground">Use color-blind friendly color schemes</p>
              </div>
              <Switch
                checked={accessibilitySettings.enableColorBlindSupport || false}
                onCheckedChange={(checked) => handleAccessibilitySettingsChange("enableColorBlindSupport", checked)}
              />
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h4 className="font-medium text-gray-900 dark:text-white flex items-center">
            <Volume2 className="h-4 w-4 mr-2" />
            Audio Accommodations
          </h4>

          <div className="grid grid-cols-1 gap-4 pl-6">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-base">Enable Screen Reader Support</Label>
                <p className="text-sm text-muted-foreground">Optimize for screen reading software</p>
              </div>
              <Switch
                checked={accessibilitySettings.enableScreenReader || false}
                onCheckedChange={(checked) => handleAccessibilitySettingsChange("enableScreenReader", checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-base">Enable Text-to-Speech</Label>
                <p className="text-sm text-muted-foreground">Read questions aloud to students</p>
              </div>
              <Switch
                checked={accessibilitySettings.enableTextToSpeech || false}
                onCheckedChange={(checked) => handleAccessibilitySettingsChange("enableTextToSpeech", checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-base">Enable Audio Questions</Label>
                <p className="text-sm text-muted-foreground">Support for audio-based questions</p>
              </div>
              <Switch
                checked={accessibilitySettings.enableAudioQuestions || false}
                onCheckedChange={(checked) => handleAccessibilitySettingsChange("enableAudioQuestions", checked)}
              />
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h4 className="font-medium text-gray-900 dark:text-white flex items-center">
            <Users className="h-4 w-4 mr-2" />
            Additional Accommodations
          </h4>

          <div className="grid grid-cols-1 gap-4 pl-6">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-base">Enable Keyboard Navigation</Label>
                <p className="text-sm text-muted-foreground">Full keyboard navigation support</p>
              </div>
              <Switch
                checked={accessibilitySettings.enableKeyboardNavigation || false}
                onCheckedChange={(checked) => handleAccessibilitySettingsChange("enableKeyboardNavigation", checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-base">Enable Alternative Formats</Label>
                <p className="text-sm text-muted-foreground">Support for alternative question formats</p>
              </div>
              <Switch
                checked={accessibilitySettings.enableAlternativeFormats || false}
                onCheckedChange={(checked) => handleAccessibilitySettingsChange("enableAlternativeFormats", checked)}
              />
            </div>

            {accessibilitySettings.enableAlternativeFormats && (
              <div className="pl-6">
                <Select
                  label="Supported Formats"
                  name="supportedFormats"
                  placeholder="Select supported formats"
                  value={accessibilitySettings.supportedFormats || []}
                  onChange={(e) => handleAccessibilitySettingsChange("supportedFormats", e.target.value)}
                  options={formatOptions}
                  isMulti
                  helperText="Alternative formats available for this exam"
                />
              </div>
            )}

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-base">Enable Special Instructions</Label>
                <p className="text-sm text-muted-foreground">Add custom instructions for accommodations</p>
              </div>
              <Switch
                checked={accessibilitySettings.enableSpecialInstructions || false}
                onCheckedChange={(checked) => handleAccessibilitySettingsChange("enableSpecialInstructions", checked)}
              />
            </div>

            {accessibilitySettings.enableSpecialInstructions && (
              <div className="pl-6">
                <div className="space-y-2">
                  <Label htmlFor="specialInstructionsText">Special Instructions</Label>
                  <textarea
                    id="specialInstructionsText"
                    name="specialInstructionsText"
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
                    value={accessibilitySettings.specialInstructionsText || ""}
                    onChange={(e) => handleAccessibilitySettingsChange("specialInstructionsText", e.target.value)}
                    placeholder="Enter special instructions for students with accommodations..."
                  />
                  <p className="text-sm text-muted-foreground">
                    Instructions for students requiring special accommodations
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </FormSection>
  )
})
