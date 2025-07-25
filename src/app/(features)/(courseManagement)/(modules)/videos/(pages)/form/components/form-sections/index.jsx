"use client";

import { memo } from "react";
import { BasicInfoSection } from "./basic-info-section";
import { MediaSection } from "./media-section";
import { ContentSection } from "./content-section";
import { MetaDataSection } from "./meta-data-section";
import { AttachmentsSection } from "./attachments-section";
import { InstructorsSection } from "./instructors";
import { TranscriptSection } from "./transcript-section";

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

            {/* Video Content */}
            <ContentSection handlers={handlers} formData={formData} sectionRef={(el) => (sectionRefs.current.content = el)} isActive={activeSection === "content"} />

            {/* Transcript Content */}
            <TranscriptSection handlers={handlers} formData={formData} sectionRef={(el) => (sectionRefs.current.transcript = el)} isActive={activeSection === "transcript"} />

            {/* Metadata */}
            <InstructorsSection handlers={handlers} formData={formData} sectionRef={(el) => (sectionRefs.current.instructors = el)} isActive={activeSection === "instructors"} />

            {/* Metadata */}
            <MetaDataSection handlers={handlers} formData={formData} sectionRef={(el) => (sectionRefs.current.metadata = el)} isActive={activeSection === "metadata"} />

            {/* Attachments */}
            <AttachmentsSection handlers={handlers} formData={formData} sectionRef={(el) => (sectionRefs.current.attachments = el)} isActive={activeSection === "attachments"} />
        </>
    );
});
