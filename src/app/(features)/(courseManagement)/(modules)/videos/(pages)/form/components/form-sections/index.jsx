"use client";

import { memo } from "react";
import { BasicInfoSection } from "./basic-info-section";
import { MediaSection } from "./media-section";
import { ContentSection } from "./content-section";
import { TranscriptSection } from "./transcript-section";
import { InstructorsSection } from "./instructors-section";
import { MetaDataSection } from "./metadata-section";
import { AttachmentsSection } from "./attachment-section";

export const FormSections = memo(function FormSections({ formData, sectionRefs, activeSection, handlers }) {
    return (
        <>
            <BasicInfoSection handlers={handlers} formData={formData} sectionRef={(el) => (sectionRefs.current.basic = el)} isActive={activeSection === "basic"} />

            <MediaSection handlers={handlers} formData={formData} sectionRef={(el) => (sectionRefs.current.media = el)} isActive={activeSection === "media"} />

            <ContentSection handlers={handlers} formData={formData} sectionRef={(el) => (sectionRefs.current.content = el)} isActive={activeSection === "content"} />

            <TranscriptSection handlers={handlers} formData={formData} sectionRef={(el) => (sectionRefs.current.transcript = el)} isActive={activeSection === "transcript"} />

            <InstructorsSection handlers={handlers} formData={formData} sectionRef={(el) => (sectionRefs.current.instructors = el)} isActive={activeSection === "instructors"} />

            <MetaDataSection handlers={handlers} formData={formData} sectionRef={(el) => (sectionRefs.current.instructors = el)} isActive={activeSection === "metadata"} />

            {/* Attachments */}
            <AttachmentsSection handlers={handlers} formData={formData} sectionRef={(el) => (sectionRefs.current.attachments = el)} isActive={activeSection === "attachments"} />
        </>
    );
});
