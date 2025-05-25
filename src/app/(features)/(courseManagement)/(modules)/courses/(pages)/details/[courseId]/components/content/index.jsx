import React from "react";
import { CourseDetailPreview } from "../../../../form/components/preview/course-detail-preview";
import { sampleCourseData } from "../../../../form/utils/seeds";
import CourseModules from "@/app/(features)/(courseManagement)/(modules)/modules/page";

const CourseDetailsContent = ({ activeTab }) => {
    switch (activeTab) {
        case "overview":
            return <CourseDetailPreview data={sampleCourseData} viewportWidth={1024} onDetailsPage={true} />;
        case "modules":
            return <CourseModules onCourseDetailsPage={true} />;
        default:
            return <CourseDetailPreview data={sampleCourseData} viewportWidth={1024} onDetailsPage={true} />;
    }
};

export default CourseDetailsContent;
