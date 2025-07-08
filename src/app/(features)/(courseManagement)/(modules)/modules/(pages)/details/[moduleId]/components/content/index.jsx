"use client";

import { useParams } from "next/navigation";
import { ModuleDetailPreview } from "../../../../form/components/preview/module-detail-preview";
import ExamPattern from "@/app/(features)/(courseManagement)/(modules)/exam-pattern/page";
import Exam from "@/app/(features)/(courseManagement)/(modules)/exam/page";
import { sampleModuleData } from "../../../../form/utils/seeds";

/**
 * Module Details Content Component
 * @description Renders different content based on active tab
 */
const ModuleDetailsContent = ({ activeTab }) => {
    const { moduleId } = useParams();

    const renderContent = () => {
        switch (activeTab) {
            case "overview":
                return <ModuleDetailPreview initialData={sampleModuleData} onDetailsPage={true} />;
            case "lessons":
                return "<LessonsModules onModuleDetailsPage={moduleId} />";
            case "exam-pattern":
                return <ExamPattern onModuleDetailsPage={moduleId} />;
            case "exam":
                return <Exam onModuleDetailsPage={moduleId} />;
            default:
                return <ModuleDetailPreview initialData={sampleModuleData} onDetailsPage={true} />;
        }
    };

    return <div className="module-details-content">{renderContent()}</div>;
};

export default ModuleDetailsContent;
