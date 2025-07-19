"use client";

import { useParams } from "next/navigation";
import { QuestionDetailPreview } from "../../../../form/components/preview/components/question-detail-preview";
import { sampleQuestionData } from "../../../../form/utils/seeds";

/**
 * Question Details Content Component
 * @description Renders different content based on active tab
 */
const QuestionDetailsContent = ({ activeTab }) => {
    const { questionId } = useParams();

    const renderContent = () => {
        switch (activeTab) {
            case "overview":
                return <QuestionDetailPreview viewPort={"desktop"} initialData={sampleQuestionData} onDetailsPage={true} />;
            default:
                return <QuestionDetailPreview  viewPort={"desktop"} initialData={sampleQuestionData} onDetailsPage={true} />;
        }
    };

    return <div className="question-details-content">{renderContent()}</div>;
};

export default QuestionDetailsContent;
