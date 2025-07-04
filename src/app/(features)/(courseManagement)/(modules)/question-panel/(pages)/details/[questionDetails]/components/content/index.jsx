import { QuestionDetailPreview } from "../../../../form/components/preview/components/question-detail-preview";
import { sampleQuestionData } from "../../../../form/utils/seeds";

const QuestionDetailsContent = ({ activeTab }) => {
    switch (activeTab) {
        case "overview":
            return <QuestionDetailPreview initialData={sampleQuestionData} viewportWidth={1200} onDetailsPage={true} />;
        case "analytics":
            return <div className="p-6">Question analytics and performance data will be displayed here</div>;
        case "usage":
            return <div className="p-6">Question usage history and exam associations will be displayed here</div>;
        case "versions":
            return <div className="p-6">Question version history will be displayed here</div>;
        default:
            return <QuestionDetailPreview initialData={sampleQuestionData} viewportWidth={1200} onDetailsPage={true} />;
    }
};

export default QuestionDetailsContent;
