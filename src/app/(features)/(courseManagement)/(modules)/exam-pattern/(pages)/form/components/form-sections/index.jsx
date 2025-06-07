"use client";

import { memo } from "react";
import { BasicInfoSection } from "./basic-info-section";
import { SectionsManager } from "./sections-manager";
import { GlobalSettingsSection } from "./global-settings-section";
import { AttemptRulesSection } from "./attempt-rules-section";
import { UIConfigSection } from "./ui-config-section";
import { SecurityProctoringSection } from "./security-proctoring-section";
import { AccessControlSection } from "./access-control-section";
import { ResultsAnalyticsSection } from "./results-analytics-section";
import { NotificationsSection } from "./notifications-section";

export const FormSections = memo(function FormSections({ formData, sectionRefs, activeSection, handlers }) {
    return (
        <>
            <BasicInfoSection handlers={handlers} formData={formData} sectionRef={(el) => (sectionRefs.current.basic = el)} isActive={activeSection === "basic"} />

            <SectionsManager handlers={handlers} formData={formData} sectionRef={(el) => (sectionRefs.current.sections = el)} isActive={activeSection === "sections"} />

            <GlobalSettingsSection handlers={handlers} formData={formData} sectionRef={(el) => (sectionRefs.current["global-settings"] = el)} isActive={activeSection === "global-settings"} />

            <SecurityProctoringSection
                handlers={handlers}
                formData={formData}
                sectionRef={(el) => (sectionRefs.current["security-proctoring"] = el)}
                isActive={activeSection === "security-proctoring"}
            />

            <AccessControlSection handlers={handlers} formData={formData} sectionRef={(el) => (sectionRefs.current["scheduling-access"] = el)} isActive={activeSection === "scheduling-access"} />

            <AttemptRulesSection handlers={handlers} formData={formData} sectionRef={(el) => (sectionRefs.current["attempt-rules"] = el)} isActive={activeSection === "attempt-rules"} />

            <ResultsAnalyticsSection handlers={handlers} formData={formData} sectionRef={(el) => (sectionRefs.current["results-analytics"] = el)} isActive={activeSection === "results-analytics"} />

            <NotificationsSection handlers={handlers} formData={formData} sectionRef={(el) => (sectionRefs.current["notifications"] = el)} isActive={activeSection === "notifications"} />

            <UIConfigSection handlers={handlers} formData={formData} sectionRef={(el) => (sectionRefs.current["ui-config"] = el)} isActive={activeSection === "ui-config"} />
        </>
    );
});
