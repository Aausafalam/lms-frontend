"use client"

import { memo } from "react"
import { Clock, ArrowLeft, ArrowRight, Navigation, AlertTriangle } from "lucide-react"
import { FormSection } from "./form-section"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"

export const AttemptRulesSection = memo(function AttemptRulesSection({
  handlers = {},
  formData = {},
  sectionRef,
  isActive,
}) {
  const { handleInputChange, handleAttemptRuleChange } = handlers

  // Ensure attemptRules exists
  const attemptRules = formData.attemptRules || {
    maxSectionsToAttempt: 0,
    minSectionsToAttempt: 0,
    allowSectionNavigation: true,
    allowQuestionNavigation: true,
    allowBackNavigation: true,
    autoSubmitOnTimeEnd: true,
    showUnattemptedCount: true,
  }

  return (
    <FormSection
      id="attempt-rules"
      title="Attempt Rules"
      icon={<Clock className="h-5 w-5" />}
      description="Configure how students can attempt the exam"
      sectionRef={sectionRef}
      isActive={isActive}
    >
      <div className="space-y-6">
        <div className="bg-yellow-50 dark:bg-yellow-950/10 rounded-lg p-4 border border-yellow-100 dark:border-yellow-900/20">
          <p className="text-sm text-yellow-700 dark:text-yellow-400 flex items-center gap-2">
            <AlertTriangle className="h-4 w-4" />
            <span>These settings control how students navigate through the exam and attempt questions.</span>
          </p>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <Input
            label="Maximum Sections to Attempt"
            id="maxSectionsToAttempt"
            name="maxSectionsToAttempt"
            type="number"
            min="0"
            value={attemptRules.maxSectionsToAttempt || ""}
            onChange={(e) => handleAttemptRuleChange("maxSectionsToAttempt", Number.parseInt(e.target.value, 10))}
            placeholder="Enter maximum sections"
            helperText="0 means all sections"
          />

          <Input
            label="Minimum Sections to Attempt"
            id="minSectionsToAttempt"
            name="minSectionsToAttempt"
            type="number"
            min="0"
            value={attemptRules.minSectionsToAttempt || ""}
            onChange={(e) => handleAttemptRuleChange("minSectionsToAttempt", Number.parseInt(e.target.value, 10))}
            placeholder="Enter minimum sections"
            helperText="0 means no minimum requirement"
          />
        </div>

        <div className="space-y-4 pt-2">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label className="text-base flex items-center">
                <Navigation className="h-4 w-4 mr-2" />
                Allow Section Navigation
              </Label>
              <p className="text-sm text-muted-foreground">Students can navigate between different sections</p>
            </div>
            <Switch
              checked={attemptRules.allowSectionNavigation || false}
              onCheckedChange={(checked) => handleAttemptRuleChange("allowSectionNavigation", checked)}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label className="text-base flex items-center">
                <ArrowRight className="h-4 w-4 mr-2" />
                Allow Question Navigation
              </Label>
              <p className="text-sm text-muted-foreground">Students can navigate between questions within a section</p>
            </div>
            <Switch
              checked={attemptRules.allowQuestionNavigation || false}
              onCheckedChange={(checked) => handleAttemptRuleChange("allowQuestionNavigation", checked)}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label className="text-base flex items-center">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Allow Back Navigation
              </Label>
              <p className="text-sm text-muted-foreground">Students can go back to previous questions</p>
            </div>
            <Switch
              checked={attemptRules.allowBackNavigation || false}
              onCheckedChange={(checked) => handleAttemptRuleChange("allowBackNavigation", checked)}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label className="text-base flex items-center">
                <Clock className="h-4 w-4 mr-2" />
                Auto-Submit on Time End
              </Label>
              <p className="text-sm text-muted-foreground">Automatically submit the exam when time runs out</p>
            </div>
            <Switch
              checked={attemptRules.autoSubmitOnTimeEnd || false}
              onCheckedChange={(checked) => handleAttemptRuleChange("autoSubmitOnTimeEnd", checked)}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label className="text-base">Show Unattempted Count</Label>
              <p className="text-sm text-muted-foreground">Display the number of unattempted questions</p>
            </div>
            <Switch
              checked={attemptRules.showUnattemptedCount || false}
              onCheckedChange={(checked) => handleAttemptRuleChange("showUnattemptedCount", checked)}
            />
          </div>
        </div>
      </div>
    </FormSection>
  )
})
