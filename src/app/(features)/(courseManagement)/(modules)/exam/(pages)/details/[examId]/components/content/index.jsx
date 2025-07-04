import { sampleExamData } from "../../../../form/utils/seeds";
import { ExamDetailPreview } from "../../../../form/components/preview/exam-detail-preview";
import QuestionPanel from "@/app/(features)/(courseManagement)/(modules)/question-panel/page";

const ExamContent = ({ activeTab }) => {
    switch (activeTab) {
        case "overview":
            return <ExamDetailPreview initialData={sampleExamData} viewportWidth={1024} onDetailsPage={true} />;
        case "questions":
            return <QuestionPanel />;
        default:
            return <ExamDetailPreview initialData={sampleExamData} viewportWidth={1024} onDetailsPage={true} />;
    }
};

export default ExamContent;
