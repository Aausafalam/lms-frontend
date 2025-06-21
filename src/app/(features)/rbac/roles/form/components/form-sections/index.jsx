"use client"

import { memo } from "react"
import { BasicInfoSection } from "./basic-info-section"
import { PrivilegesSection } from "./privileges-section"
import { SettingsSection } from "./settings-section"

export const FormSections = memo(function FormSections({ formData, sectionRefs, activeSection, handlers }) {
  return (
    <>
      <BasicInfoSection
        handlers={handlers}
        formData={formData}
        sectionRef={(el) => (sectionRefs.current.basic = el)}
        isActive={activeSection === "basic"}
      />

      <PrivilegesSection
        handlers={handlers}
        formData={formData}
        sectionRef={(el) => (sectionRefs.current.privileges = el)}
        isActive={activeSection === "privileges"}
      />

      <SettingsSection
        handlers={handlers}
        formData={formData}
        sectionRef={(el) => (sectionRefs.current.settings = el)}
        isActive={activeSection === "settings"}
      />
    </>
  )
})
