"use client"

import { memo } from "react"
import { Save, Clock, AlertTriangle } from "lucide-react"
import { FormSection } from "./form-section"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"

export const SubmissionRulesSection = memo(function SubmissionRulesSection({
  handlers = {},
  formData = {},
  sectionRef,
  isActive,
}) {
  const { handleSubmissionRuleChange } = handlers

  // Ensure submissionRules exists
  const submissionRules = formData.submissionRules || {
    allowManualSubmit: true,
    autoSubmitOnTimeout: true,
    confirmBeforeSubmit: true,
  }

  return (
    <FormSection
      id="submission-rules"
      title="Submission Rules"
      icon={<Save className="h-5 w-5" />}
      description="Configure how the exam can be submitted"
      sectionRef={sectionRef}
      isActive={isActive}
    >
      <div className="space-y-6">
        <div className="bg-yellow-50 dark:bg-yellow-950/10 rounded-lg p-4 border border-yellow-100 dark:border-yellow-900/20">
          <p className="text-sm text-yellow-700 dark:text-yellow-400 flex items-center gap-2">
            <AlertTriangle className="h-4 w-4" />
            <span>These settings control how and when the exam can be submitted by students.</span>
          </p>
        </div>

        <div className="space-y-4 pt-2">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label className="text-base flex items-center">
                <Save className="h-4 w-4 mr-2" />
                Allow Manual Submit
              </Label>
              <p className="text-sm text-muted-foreground">
                Students can manually submit their exam before time runs out
              </p>
            </div>
            <Switch
              checked={submissionRules.allowManualSubmit || false}
              onCheckedChange={(checked) => handleSubmissionRuleChange("allowManualSubmit", checked)}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label className="text-base flex items-center">
                <Clock className="h-4 w-4 mr-2" />
                Auto-Submit on Timeout
              </Label>
              <p className="text-sm text-muted-foreground">Automatically submit the exam when time runs out</p>
            </div>
            <Switch
              checked={submissionRules.autoSubmitOnTimeout || false}
              onCheckedChange={(checked) => handleSubmissionRuleChange("autoSubmitOnTimeout", checked)}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label className="text-base">Confirm Before Submit</Label>
              <p className="text-sm text-muted-foreground">Show a confirmation dialog before submitting the exam</p>
            </div>
            <Switch
              checked={submissionRules.confirmBeforeSubmit || false}
              onCheckedChange={(checked) => handleSubmissionRuleChange("confirmBeforeSubmit", checked)}
            />
          </div>
        </div>
      </div>
    </FormSection>
  )
})
