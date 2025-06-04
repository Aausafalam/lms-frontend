"use client"

import { memo } from "react"
import { Settings, Check, X } from "lucide-react"
import { FormSection } from "./form-section"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"

export const GlobalSettingsSection = memo(function GlobalSettingsSection({
  handlers = {},
  formData = {},
  sectionRef,
  isActive,
}) {
  const { handleInputChange, handleSwitchChange } = handlers

  // Ensure globalMarkingPolicy exists
  const globalMarkingPolicy = formData.globalMarkingPolicy || {
    defaultCorrectMark: 1,
    defaultNegativeMark: 0.33,
  }

  const handleMarkingPolicyChange = (e) => {
    const { name, value } = e.target
    const updatedPolicy = {
      ...globalMarkingPolicy,
      [name]: Number.parseFloat(value),
    }

    handleInputChange({
      target: {
        name: "globalMarkingPolicy",
        value: updatedPolicy,
      },
    })
  }

  return (
    <FormSection
      id="global-settings"
      title="Global Settings"
      icon={<Settings className="h-5 w-5" />}
      description="Configure global settings for the entire exam"
      sectionRef={sectionRef}
      isActive={isActive}
    >
      <div className="space-y-6">
        <div className="bg-blue-50 dark:bg-blue-950/10 rounded-lg p-4 border border-blue-100 dark:border-blue-900/20">
          <p className="text-sm text-blue-700 dark:text-blue-400 flex items-center gap-2">
            <Settings className="h-4 w-4" />
            <span>
              These settings apply to all sections and questions by default, but can be overridden at the section level.
            </span>
          </p>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <Input
            label="Default Marks for Correct Answer"
            labelIcon={<Check className="h-3.5 w-3.5" />}
            id="defaultCorrectMark"
            name="defaultCorrectMark"
            type="number"
            step="0.01"
            min="0"
            value={globalMarkingPolicy.defaultCorrectMark || ""}
            onChange={handleMarkingPolicyChange}
            placeholder="Enter default marks"
            helperText="Default marks awarded for correct answers"
          />

          <Input
            label="Default Negative Marks"
            labelIcon={<X className="h-3.5 w-3.5" />}
            id="defaultNegativeMark"
            name="defaultNegativeMark"
            type="number"
            step="0.01"
            min="0"
            value={globalMarkingPolicy.defaultNegativeMark || ""}
            onChange={handleMarkingPolicyChange}
            placeholder="Enter default negative marks"
            helperText="Default marks deducted for incorrect answers"
          />
        </div>

        <div className="space-y-4 pt-2">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label className="text-base">Shuffle Questions</Label>
              <p className="text-sm text-muted-foreground">Randomize the order of questions for each student</p>
            </div>
            <Switch
              checked={formData.shuffleQuestions || false}
              onCheckedChange={(checked) => handleSwitchChange("shuffleQuestions", checked)}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label className="text-base">Shuffle Sections</Label>
              <p className="text-sm text-muted-foreground">Randomize the order of sections for each student</p>
            </div>
            <Switch
              checked={formData.shuffleSections || false}
              onCheckedChange={(checked) => handleSwitchChange("shuffleSections", checked)}
            />
          </div>
        </div>
      </div>
    </FormSection>
  )
})
