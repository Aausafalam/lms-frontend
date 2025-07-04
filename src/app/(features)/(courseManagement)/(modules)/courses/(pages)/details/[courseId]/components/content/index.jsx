import React from "react";
import { CourseDetailPreview } from "../../../../form/components/preview/course-detail-preview";
import { sampleCourseData } from "../../../../form/utils/seeds";
import CourseModules from "@/app/(features)/(courseManagement)/(modules)/modules/page";
import { useParams } from "next/navigation";
import ExamPattern from "@/app/(features)/(courseManagement)/(modules)/exam-pattern/page";
import Exam from "@/app/(features)/(courseManagement)/(modules)/exam/page";

const CourseDetailsContent = ({ activeTab }) => {
    const { courseId } = useParams();
    switch (activeTab) {
        case "overview":
            return <CourseDetailPreview initialData={sampleCourseData} viewportWidth={1024} onDetailsPage={true} />;
        case "modules":
            return <CourseModules onCourseDetailsPage={courseId} />;
        case "exam-pattern":
            return <ExamPattern onCourseDetailsPage={courseId} />;
        case "exam":
            return <Exam onCourseDetailsPage={courseId} />;
        default:
            return <CourseDetailPreview initialData={sampleCourseData} viewportWidth={1024} onDetailsPage={true} />;
    }
};

export default CourseDetailsContent;
