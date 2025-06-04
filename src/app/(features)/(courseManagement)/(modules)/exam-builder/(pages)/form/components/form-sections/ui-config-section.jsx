"use client"

import { memo } from "react"
import { Globe, Type, Clock, Languages, Accessibility } from "lucide-react"
import { FormSection } from "./form-section"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Select } from "@/components/ui/select"

export const UIConfigSection = memo(function UIConfigSection({ handlers = {}, formData = {}, sectionRef, isActive }) {
  const { handleUIConfigChange } = handlers

  // Ensure uiConfig exists
  const uiConfig = formData.uiConfig || {
    theme: "default",
    fontSize: "medium",
    showTimer: true,
    languageSelector: true,
    accessibleMode: false,
  }

  const themeOptions = [
    { label: "Default", value: "default" },
    { label: "Railway Theme", value: "railway-theme" },
    { label: "High Contrast", value: "high-contrast" },
    { label: "Minimal", value: "minimal" },
  ]

  const fontSizeOptions = [
    { label: "Small", value: "small" },
    { label: "Medium", value: "medium" },
    { label: "Large", value: "large" },
    { label: "Extra Large", value: "extra-large" },
  ]

  return (
    <FormSection
      id="ui-config"
      title="UI Configuration"
      icon={<Globe className="h-5 w-5" />}
      description="Configure the user interface for the exam"
      sectionRef={sectionRef}
      isActive={isActive}
    >
      <div className="space-y-6">
        <div className="grid grid-cols-2 gap-6">
          <Select
            label="Theme"
            labelIcon={<Globe className="h-3.5 w-3.5" />}
            name="theme"
            value={uiConfig.theme || "default"}
            onChange={(e) => handleUIConfigChange("theme", e.target.value)}
            options={themeOptions}
            placeholder="Select theme"
          />

          <Select
            label="Font Size"
            labelIcon={<Type className="h-3.5 w-3.5" />}
            name="fontSize"
            value={uiConfig.fontSize || "medium"}
            onChange={(e) => handleUIConfigChange("fontSize", e.target.value)}
            options={fontSizeOptions}
            placeholder="Select font size"
          />
        </div>

        <div className="space-y-4 pt-2">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label className="text-base flex items-center">
                <Clock className="h-4 w-4 mr-2" />
                Show Timer
              </Label>
              <p className="text-sm text-muted-foreground">Display a countdown timer during the exam</p>
            </div>
            <Switch
              checked={uiConfig.showTimer || false}
              onCheckedChange={(checked) => handleUIConfigChange("showTimer", checked)}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label className="text-base flex items-center">
                <Languages className="h-4 w-4 mr-2" />
                Language Selector
              </Label>
              <p className="text-sm text-muted-foreground">Allow students to switch between available languages</p>
            </div>
            <Switch
              checked={uiConfig.languageSelector || false}
              onCheckedChange={(checked) => handleUIConfigChange("languageSelector", checked)}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label className="text-base flex items-center">
                <Accessibility className="h-4 w-4 mr-2" />
                Accessible Mode
              </Label>
              <p className="text-sm text-muted-foreground">Enable additional accessibility features</p>
            </div>
            <Switch
              checked={uiConfig.accessibleMode || false}
              onCheckedChange={(checked) => handleUIConfigChange("accessibleMode", checked)}
            />
          </div>
        </div>
      </div>
    </FormSection>
  )
})
