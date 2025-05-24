"use client"

import { memo } from "react"
import { BasicInfoSection } from "./basic-info-section"
import { MediaSection } from "./media-section"
import { ContentSection } from "./content-section"
import { ObjectivesSection } from "./objectives-section"
import { PreRequisitesSection } from "./pre-requisites"
import { PriceSection } from "./price-section"
import { CertificateSection } from "./certificate-section"
import { SkillsSection } from "./skills-section"
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

      <MediaSection
        handlers={handlers}
        formData={formData}
        sectionRef={(el) => (sectionRefs.current.media = el)}
        isActive={activeSection === "media"}
      />

      <ContentSection
        handlers={handlers}
        formData={formData}
        sectionRef={(el) => (sectionRefs.current.content = el)}
        isActive={activeSection === "content"}
      />

      <ObjectivesSection
        handlers={handlers}
        formData={formData}
        sectionRef={(el) => (sectionRefs.current.objectives = el)}
        isActive={activeSection === "objectives"}
      />

      <PreRequisitesSection
        handlers={handlers}
        formData={formData}
        sectionRef={(el) => (sectionRefs.current.prerequisites = el)}
        isActive={activeSection === "prerequisites"}
      />

      <PriceSection
        handlers={handlers}
        formData={formData}
        sectionRef={(el) => (sectionRefs.current.price = el)}
        isActive={activeSection === "price"}
      />

      <CertificateSection
        handlers={handlers}
        formData={formData}
        sectionRef={(el) => (sectionRefs.current.certificate = el)}
        isActive={activeSection === "certificate"}
      />

      <SkillsSection
        handlers={handlers}
        formData={formData}
        sectionRef={(el) => (sectionRefs.current.skills = el)}
        isActive={activeSection === "skills"}
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
