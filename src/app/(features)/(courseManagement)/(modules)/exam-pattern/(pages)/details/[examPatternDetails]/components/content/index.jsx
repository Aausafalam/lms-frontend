import CourseContent from "@/app/(features)/(courseManagement)/(modules)/videos/page";
import { ExamDetailPreview } from "../../../../form/components/preview/exam-detail-preview";
import { sampleExamPatternData } from "../../../../form/utils/seeds";

const LessonDetailsContent = ({ activeTab }) => {
    switch (activeTab) {
        case "overview":
            return <ExamDetailPreview initialData={sampleExamPatternData} viewportWidth={1024} onDetailsPage={true} />;
        case "content":
            return <CourseContent />;
        case "assignments":
            return <div className="p-6">Assignments content will be displayed here</div>;
        case "quiz":
            return <div className="p-6">Quiz content will be displayed here</div>;
        default:
            return <ExamDetailPreview data={sampleExamPatternData} viewportWidth={1024} onDetailsPage={true} />;
    }
};

export default LessonDetailsContent;
