import CourseVideos from "@/app/(features)/(courseManagement)/(modules)/videos/page";
import { LessonDetailPreview } from "../../../../form/components/preview/lesson-detail-preview";
import { sampleLessonData } from "../../../../form/utils/seeds";

const LessonDetailsContent = ({ activeTab }) => {
    switch (activeTab) {
        case "overview":
            return <LessonDetailPreview initialData={sampleLessonData} viewportWidth={1024} onDetailsPage={true} />;
        case "videos":
            return <CourseVideos />;
        case "assignments":
            return <div className="p-6 text-center text-gray-500">Assignments content will be displayed here</div>;
        case "quiz":
            return <div className="p-6 text-center text-gray-500">Quiz content will be displayed here</div>;
        default:
            return <LessonDetailPreview initialData={sampleLessonData} viewportWidth={1024} onDetailsPage={true} />;
    }
};

export default LessonDetailsContent;
