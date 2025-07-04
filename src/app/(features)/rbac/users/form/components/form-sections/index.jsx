"use client";

import { memo } from "react";
import { BasicInfoSection } from "./basic-info-section";
import { ContactSection } from "./contact-section";
import { RolesSection } from "./roles-section";
import { SecuritySection } from "./security-section";
import { PreferencesSection } from "./preferences-section";

export const FormSections = memo(function FormSections({ formData, sectionRefs, activeSection, handlers }) {
    return (
        <>
            <BasicInfoSection handlers={handlers} formData={formData} sectionRef={(el) => (sectionRefs.current.basic = el)} isActive={activeSection === "basic"} />

            <ContactSection handlers={handlers} formData={formData} sectionRef={(el) => (sectionRefs.current.contact = el)} isActive={activeSection === "contact"} />

            <RolesSection handlers={handlers} formData={formData} sectionRef={(el) => (sectionRefs.current.roles = el)} isActive={activeSection === "roles"} />

            <SecuritySection handlers={handlers} formData={formData} sectionRef={(el) => (sectionRefs.current.security = el)} isActive={activeSection === "security"} />

            <PreferencesSection handlers={handlers} formData={formData} sectionRef={(el) => (sectionRefs.current.preferences = el)} isActive={activeSection === "preferences"} />
        </>
    );
});

export default FormSections;
