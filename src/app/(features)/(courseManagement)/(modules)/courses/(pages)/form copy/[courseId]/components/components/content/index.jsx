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
            <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-950 dark:to-gray-900">
                <div className="max-w-screen-xl mx-auto">
                    <div className="p-4 md:p-8">
                        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Course Overview Preview</h1>
                        <p className="text-gray-600 dark:text-gray-400 mb-6">Preview how your course will look on different devices</p>
                        <CoursePreview>
                            <div className="w-full">
                                <CourseHeader course={courseData} />
                                <div className="px-4 py-6 md:py-8 lg:flex gap-8 max-w-7xl mx-auto">
                                    <CourseDetails course={courseData} />
                                    <CourseSidebar course={courseData} />
                                </div>
                            </div>
                        </CoursePreview>
                    </div>
                </div>
            </div>
        </DeviceProvider>
    );
}
