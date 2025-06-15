"use client";

import { memo } from "react";
import { BasicDetailsSection } from "./basic-details-section";
import { ExamPatternSection } from "./exam-pattern-section";
import { ScheduleTimingSection } from "./schedule-timing";

export const FormSections = memo(function FormSections({ formData, sectionRefs, activeSection, handlers }) {
    return (
        <>
            <BasicDetailsSection handlers={handlers} formData={formData} sectionRef={(el) => (sectionRefs.current["basic-details"] = el)} isActive={activeSection === "basic-details"} />

            <ScheduleTimingSection handlers={handlers} formData={formData} sectionRef={(el) => (sectionRefs.current["schedule-timing"] = el)} isActive={activeSection === "schedule-timing"} />

            <ExamPatternSection handlers={handlers} formData={formData} sectionRef={(el) => (sectionRefs.current["exam-pattern"] = el)} isActive={activeSection === "exam-pattern"} />
        </>
    );
});
