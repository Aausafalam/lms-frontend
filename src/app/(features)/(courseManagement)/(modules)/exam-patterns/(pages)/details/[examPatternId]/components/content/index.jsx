"use client";

import { useParams } from "next/navigation";
import { ExamPatternDetailPreview } from "../../../../form/components/preview/exam-pattern-detail-preview";
import { sampleExamPatternData } from "../../../../form/utils/seeds";
import Exam from "@/app/(features)/(courseManagement)/(modules)/exams/page";

/**
 * ExamPattern Details Content Component
 * @description Renders different content based on active tab
 */
const ExamPatternDetailsContent = ({ activeTab }) => {
    const { examPatternId } = useParams();

    const renderContent = () => {
        switch (activeTab) {
            case "overview":
                return <ExamPatternDetailPreview initialData={sampleExamPatternData} onDetailsPage={true} />;
            case "exam":
                return <Exam onExamPatternDetailsPage={examPatternId} />;
            default:
                return <ExamPatternDetailPreview initialData={sampleExamPatternData} onDetailsPage={true} />;
        }
    };

    return <div className="examPattern-details-content">{renderContent()}</div>;
};

export default ExamPatternDetailsContent;
