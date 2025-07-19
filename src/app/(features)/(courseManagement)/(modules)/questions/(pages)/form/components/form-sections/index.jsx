"use client";

import { memo } from "react";
import { BasicDetailsSection } from "./basic-details-section";
import { QuestionContentSection } from "./question-content-section";

export const FormSections = memo(function FormSections({ formData, sectionRefs, activeSection, handlers }) {
    return (
        <>
            <BasicDetailsSection handlers={handlers} formData={formData} sectionRef={(el) => (sectionRefs.current["basic-details"] = el)} isActive={activeSection === "basic-details"} />

            <QuestionContentSection handlers={handlers} formData={formData} sectionRef={(el) => (sectionRefs.current["question-content"] = el)} isActive={activeSection === "question-content"} />
        </>
    );
});
