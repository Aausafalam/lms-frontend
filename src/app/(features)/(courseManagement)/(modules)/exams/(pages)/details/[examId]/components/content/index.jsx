"use client";

import { useParams } from "next/navigation";
import { ExamDetailPreview } from "../../../../form/components/preview/exam-detail-preview";
import { sampleExamData } from "../../../../form/utils/seeds";
import QuestionPanel from "@/app/(features)/(courseManagement)/(modules)/questions/page";

/**
 * Exam Details Content Component
 * @description Renders different content based on active tab
 */
const ExamDetailsContent = ({ activeTab }) => {
    const { examId } = useParams();

    const renderContent = () => {
        switch (activeTab) {
            case "overview":
                return <ExamDetailPreview initialData={sampleExamData} onDetailsPage={true} />;
            case "questions":
                return <QuestionPanel />;
            default:
                return <ExamDetailPreview initialData={sampleExamData} onDetailsPage={true} />;
        }
    };

    return <div className="exam-details-content">{renderContent()}</div>;
};

export default ExamDetailsContent;
