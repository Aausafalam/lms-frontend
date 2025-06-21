"use client"

import { memo } from "react"
import { BasicInfoSection } from "./basic-info-section"
import { ConfigurationSection } from "./configuration-section"
import { SecuritySection } from "./security-section"

export const FormSections = memo(function FormSections({ formData, sectionRefs, activeSection, handlers }) {
  return (
    <>
      <BasicInfoSection
        handlers={handlers}
        formData={formData}
        sectionRef={(el) => (sectionRefs.current.basic = el)}
        isActive={activeSection === "basic"}
      />

      <ConfigurationSection
        handlers={handlers}
        formData={formData}
        sectionRef={(el) => (sectionRefs.current.configuration = el)}
        isActive={activeSection === "configuration"}
      />

      <SecuritySection
        handlers={handlers}
        formData={formData}
        sectionRef={(el) => (sectionRefs.current.security = el)}
        isActive={activeSection === "security"}
      />
    </>
  )
})
