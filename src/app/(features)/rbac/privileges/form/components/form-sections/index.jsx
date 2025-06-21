"use client"

import { memo } from "react"
import { BasicInfoSection } from "./basic-info-section"
import { PrivilegeGroupSection } from "./privilege-group-section"
import { RoutesSection } from "./routes-section"
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

      <PrivilegeGroupSection
        handlers={handlers}
        formData={formData}
        sectionRef={(el) => (sectionRefs.current.group = el)}
        isActive={activeSection === "group"}
      />

      <RoutesSection
        handlers={handlers}
        formData={formData}
        sectionRef={(el) => (sectionRefs.current.routes = el)}
        isActive={activeSection === "routes"}
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
