"use client"

import { memo } from "react"
import { BasicInfoSection } from "./basic-info-section"
import { PricingSection } from "./pricing-section"
import { AccessSection } from "./access-section"
import { CoursesSection } from "./courses-section"
import { FeaturesSection } from "./features-section"
import { MetadataSection } from "./metadata-section"
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

      <PricingSection
        handlers={handlers}
        formData={formData}
        sectionRef={(el) => (sectionRefs.current.pricing = el)}
        isActive={activeSection === "pricing"}
      />

      <AccessSection
        handlers={handlers}
        formData={formData}
        sectionRef={(el) => (sectionRefs.current.access = el)}
        isActive={activeSection === "access"}
      />

      <CoursesSection
        handlers={handlers}
        formData={formData}
        sectionRef={(el) => (sectionRefs.current.courses = el)}
        isActive={activeSection === "courses"}
      />

      <FeaturesSection
        handlers={handlers}
        formData={formData}
        sectionRef={(el) => (sectionRefs.current.features = el)}
        isActive={activeSection === "features"}
      />

      <MetadataSection
        handlers={handlers}
        formData={formData}
        sectionRef={(el) => (sectionRefs.current.metadata = el)}
        isActive={activeSection === "metadata"}
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
