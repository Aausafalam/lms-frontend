"use client";

import { memo } from "react";
import { BasicInfoSection } from "./basic-info-section";
import { MediaSection } from "./media-section";
import { ContentSection } from "./content-section";
import { ObjectivesSection } from "./objectives-section";
import { ResourcesSection } from "./resources-section";
import { SettingsSection } from "./settings-section";
import { PreRequisitesSection } from "./pre-requisites";

export const FormSections = memo(function FormSections({ formData, sectionRefs, activeSection, handlers }) {
    return (
        <>
            <BasicInfoSection handlers={handlers} formData={formData} sectionRef={(el) => (sectionRefs.current.basic = el)} isActive={activeSection === "basic"} />

            <MediaSection handlers={handlers} formData={formData} sectionRef={(el) => (sectionRefs.current.media = el)} isActive={activeSection === "media"} />

            <ContentSection handlers={handlers} formData={formData} sectionRef={(el) => (sectionRefs.current.content = el)} isActive={activeSection === "content"} />

            <ObjectivesSection handlers={handlers} formData={formData} sectionRef={(el) => (sectionRefs.current.objectives = el)} isActive={activeSection === "objectives"} />

            <PreRequisitesSection handlers={handlers} formData={formData} sectionRef={(el) => (sectionRefs.current.prerequisites = el)} isActive={activeSection === "prerequisites"} />

            <ResourcesSection handlers={handlers} formData={formData} sectionRef={(el) => (sectionRefs.current.resources = el)} isActive={activeSection === "resources"} />

            <SettingsSection handlers={handlers} formData={formData} sectionRef={(el) => (sectionRefs.current.settings = el)} isActive={activeSection === "settings"} />
        </>
    );
});
