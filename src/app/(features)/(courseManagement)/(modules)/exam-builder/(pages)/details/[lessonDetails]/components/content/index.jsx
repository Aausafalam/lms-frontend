import CourseContent from "@/app/(features)/(courseManagement)/(modules)/content/page";
import { LessonDetailPreview } from "../../../../form/components/preview/exam-detail-preview";
import { sampleLessonData } from "../../../../form/utils/seeds";

const LessonDetailsContent = ({ activeTab }) => {
    switch (activeTab) {
        case "overview":
            return <LessonDetailPreview initialData={sampleLessonData} viewportWidth={1024} onDetailsPage={true} />;
        case "content":
            return <CourseContent />;
        case "assignments":
            return <div className="p-6">Assignments content will be displayed here</div>;
        case "quiz":
            return <div className="p-6">Quiz content will be displayed here</div>;
        default:
            return <LessonDetailPreview initialData={sampleLessonData} viewportWidth={1024} onDetailsPage={true} />;
    }
};

export default LessonDetailsContent;
