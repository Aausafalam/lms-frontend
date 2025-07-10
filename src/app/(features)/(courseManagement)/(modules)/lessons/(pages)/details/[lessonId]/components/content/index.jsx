"use client";

import { useParams } from "next/navigation";
import { LessonDetailPreview } from "../../../../form/components/preview/lesson-detail-preview";
import { sampleLessonData } from "../../../../form/utils/seeds";
import CourseVideos from "@/app/(features)/(courseManagement)/(modules)/videos/page";

/**
 * Lesson Details Content Component
 * @description Renders different content based on active tab
 */
const LessonDetailsContent = ({ activeTab }) => {
    const { lessonId } = useParams();

    const renderContent = () => {
        switch (activeTab) {
            case "overview":
                return <LessonDetailPreview initialData={sampleLessonData} onDetailsPage={true} />;
            case "video":
                return <CourseVideos />;
            default:
                return <LessonDetailPreview initialData={sampleLessonData} onDetailsPage={true} />;
        }
    };

    return <div className="lesson-details-content">{renderContent()}</div>;
};

export default LessonDetailsContent;
