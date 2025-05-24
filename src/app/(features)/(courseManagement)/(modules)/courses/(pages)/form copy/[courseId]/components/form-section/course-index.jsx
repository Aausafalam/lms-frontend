"use client"

import { memo } from "react"
import { CourseBasicInfoSection } from "./course-basic-info-section"
import { CourseMediaSection } from "./course-media-section"
import { CourseCurriculumSection } from "./course-curriculum-section"
import { CourseInstructorsSection } from "./course-instructors-section"
import { CoursePricingSection } from "./course-pricing-section"
import { CourseRequirementsSection } from "./course-requirements-section"
import { CourseTargetAudienceSection } from "./course-target-audience-section"
import { CourseSettingsSection } from "./course-settings-section"

export const CourseFormSections = memo(function CourseFormSections({ formData, sectionRefs, activeSection, handlers }) {
  return (
    <>
      <CourseBasicInfoSection
        handlers={handlers}
        formData={formData}
        sectionRef={(el) => (sectionRefs.current.basic = el)}
        isActive={activeSection === "basic"}
      />

      <CourseMediaSection
        handlers={handlers}
        formData={formData}
        sectionRef={(el) => (sectionRefs.current.media = el)}
        isActive={activeSection === "media"}
      />

      <CourseCurriculumSection
        handlers={handlers}
        formData={formData}
        sectionRef={(el) => (sectionRefs.current.curriculum = el)}
        isActive={activeSection === "curriculum"}
      />

      <CourseInstructorsSection
        handlers={handlers}
        formData={formData}
        sectionRef={(el) => (sectionRefs.current.instructors = el)}
        isActive={activeSection === "instructors"}
      />

      <CoursePricingSection
        handlers={handlers}
        formData={formData}
        sectionRef={(el) => (sectionRefs.current.pricing = el)}
        isActive={activeSection === "pricing"}
      />

      <CourseRequirementsSection
        handlers={handlers}
        formData={formData}
        sectionRef={(el) => (sectionRefs.current.requirements = el)}
        isActive={activeSection === "requirements"}
      />

      <CourseTargetAudienceSection
        handlers={handlers}
        formData={formData}
        sectionRef={(el) => (sectionRefs.current.targetAudience = el)}
        isActive={activeSection === "targetAudience"}
      />

      <CourseSettingsSection
        handlers={handlers}
        formData={formData}
        sectionRef={(el) => (sectionRefs.current.settings = el)}
        isActive={activeSection === "settings"}
      />
    </>
  )
})
