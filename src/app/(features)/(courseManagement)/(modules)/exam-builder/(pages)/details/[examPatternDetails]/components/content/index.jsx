import CourseContent from "@/app/(features)/(courseManagement)/(modules)/videos/page";
import { sampleExamBuilderData } from "../../../../form/utils/seeds";
import { ExamBuilderDetailPreview } from "../../../../form/components/preview/exam-builder-detail-preview";

const LessonDetailsContent = ({ activeTab }) => {
    switch (activeTab) {
        case "overview":
            return <ExamBuilderDetailPreview initialData={sampleExamBuilderData} viewportWidth={1024} onDetailsPage={true} />;
        case "content":
            return <CourseContent />;
        case "assignments":
            return <div className="p-6">Assignments content will be displayed here</div>;
        case "quiz":
            return <div className="p-6">Quiz content will be displayed here</div>;
        default:
            return <ExamBuilderDetailPreview initialData={sampleExamBuilderData} viewportWidth={1024} onDetailsPage={true} />;
    }
};

export default LessonDetailsContent;
