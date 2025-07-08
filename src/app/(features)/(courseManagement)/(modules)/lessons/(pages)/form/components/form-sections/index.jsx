"use client";

import { memo } from "react";
import { BasicInfoSection } from "./basic-info-section";
import { MediaSection } from "./media-section";
import { ContentSection } from "./content-section";
import { LearningOutcomesSection } from "./learning-outcomes-section";
import { PreRequisitesSection } from "./pre-requisites";
import { MetaDataSection } from "./meta-data-section";
import { AttachmentsSection } from "./attachments-section";
import { InstructorsSection } from "./instructors";
import { ResourcesSection } from "./resources-section";

/**
 * Form Sections Container Component
 * Renders all form sections in the correct order
 *
 * @param {Object} props - Component props
 * @param {Object} props.formData - Current form data
 * @param {Object} props.sectionRefs - References to each section for scrolling
 * @param {string} props.activeSection - Currently active section ID
 * @param {Object} props.handlers - Form event handlers
 */
export const FormSections = memo(function FormSections({ formData, sectionRefs, activeSection, handlers }) {
    return (
        <>
            {/* Basic Information */}
            <BasicInfoSection handlers={handlers} formData={formData} sectionRef={(el) => (sectionRefs.current.basic = el)} isActive={activeSection === "basic"} />

            {/* Media Assets */}
            <MediaSection handlers={handlers} formData={formData} sectionRef={(el) => (sectionRefs.current.media = el)} isActive={activeSection === "media"} />

            {/* Lesson Content */}
            <ContentSection handlers={handlers} formData={formData} sectionRef={(el) => (sectionRefs.current.content = el)} isActive={activeSection === "content"} />

            {/* Learning Outcomes */}
            <LearningOutcomesSection handlers={handlers} formData={formData} sectionRef={(el) => (sectionRefs.current["learning-outcomes"] = el)} isActive={activeSection === "learning-outcomes"} />

            {/* Prerequisites */}
            <PreRequisitesSection handlers={handlers} formData={formData} sectionRef={(el) => (sectionRefs.current.prerequisites = el)} isActive={activeSection === "prerequisites"} />

            {/* Metadata */}
            <InstructorsSection handlers={handlers} formData={formData} sectionRef={(el) => (sectionRefs.current.instructors = el)} isActive={activeSection === "instructors"} />

            {/* Metadata */}
            <MetaDataSection handlers={handlers} formData={formData} sectionRef={(el) => (sectionRefs.current.metadata = el)} isActive={activeSection === "metadata"} />

            {/* Attachments */}
            <AttachmentsSection handlers={handlers} formData={formData} sectionRef={(el) => (sectionRefs.current.attachments = el)} isActive={activeSection === "attachments"} />

            {/* Resources */}
            <ResourcesSection handlers={handlers} formData={formData} sectionRef={(el) => (sectionRefs.current.resources = el)} isActive={activeSection === "resources"} />
        </>
    );
});
