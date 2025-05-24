"use client";

import { CourseHeader } from "./course-header";
import { CoursePreview } from "./course-preview";
import { CourseDetails } from "./course-details";
import { CourseSidebar } from "./course-sidebar";
import { courseData } from "./course-data";
import { DeviceProvider } from "./device-context";

export default function CourseOverviewPage() {
    return (
        <DeviceProvider>
            <div className="w-full">
                <CourseHeader course={courseData} />
                <div className="px-4 py-6 md:py-8 lg:flex gap-8 max-w-7xl mx-auto">
                    <CourseDetails course={courseData} />
                    <CourseSidebar course={courseData} />
                </div>
            </div>
        </DeviceProvider>
    );
}
