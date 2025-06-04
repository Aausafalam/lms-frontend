"use client";

import { memo } from "react";
import { BasicInfoSection } from "./basic-info-section";
import { MediaSection } from "./media-section";
import { ContentSection } from "./content-section";
import { LearningOutcomesSection } from "./learning-outcomes-section";
import { PreRequisitesSection } from "./pre-requisites-section";
import { LessonOrderSection } from "./lesson-order-section";
import { InstructorsSection } from "./instructors-section";
import { AttachmentsSection } from "./attachments-section";
import { ResourcesSection } from "./resources-section";

export const FormSections = memo(function FormSections({ formData, sectionRefs, activeSection, handlers }) {
    return (
        <>
            <BasicInfoSection handlers={handlers} formData={formData} sectionRef={(el) => (sectionRefs.current.basic = el)} isActive={activeSection === "basic"} />

            <MediaSection handlers={handlers} formData={formData} sectionRef={(el) => (sectionRefs.current.media = el)} isActive={activeSection === "media"} />

            <ContentSection handlers={handlers} formData={formData} sectionRef={(el) => (sectionRefs.current.content = el)} isActive={activeSection === "content"} />

            <LearningOutcomesSection handlers={handlers} formData={formData} sectionRef={(el) => (sectionRefs.current["learning-outcomes"] = el)} isActive={activeSection === "learning-outcomes"} />

            <PreRequisitesSection handlers={handlers} formData={formData} sectionRef={(el) => (sectionRefs.current.prerequisites = el)} isActive={activeSection === "prerequisites"} />

            <LessonOrderSection handlers={handlers} formData={formData} sectionRef={(el) => (sectionRefs.current.metadata = el)} isActive={activeSection === "lesson-order"} />

            <InstructorsSection handlers={handlers} formData={formData} sectionRef={(el) => (sectionRefs.current.instructors = el)} isActive={activeSection === "instructors"} />

            <AttachmentsSection handlers={handlers} formData={formData} sectionRef={(el) => (sectionRefs.current.attachments = el)} isActive={activeSection === "attachments"} />

            <ResourcesSection handlers={handlers} formData={formData} sectionRef={(el) => (sectionRefs.current.resources = el)} isActive={activeSection === "resources"} />
        </>
    );
});
