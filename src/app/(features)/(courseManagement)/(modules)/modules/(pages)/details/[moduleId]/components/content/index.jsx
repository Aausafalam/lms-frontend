"use client";

import { useParams } from "next/navigation";
import { ModuleDetailPreview } from "../../../../form/components/preview/module-detail-preview";
import ExamPattern from "@/app/(features)/(courseManagement)/(modules)/exam-patterns/page";
import Exam from "@/app/(features)/(courseManagement)/(modules)/exams/page";
import { sampleModuleData } from "../../../../form/utils/seeds";
import Lessons from "@/app/(features)/(courseManagement)/(modules)/lessons/page";

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
                return <Lessons onModuleDetailsPage={moduleId} />;
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
