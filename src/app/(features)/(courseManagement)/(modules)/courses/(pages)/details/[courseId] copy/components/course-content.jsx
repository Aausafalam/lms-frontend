"use client";

import { CourseCallToAction } from "./course-call-to-action";
import { CourseMainContent } from "./course-main-content";
import { CourseRelated } from "./course-related";
import { CourseSidebar } from "./course-sidebar";

export function CourseContent({ course, isVideoPlaying, setIsVideoPlaying }) {
    return (
        <div className="container mx-auto px-6">
            {/* Main Content */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
                <div className="lg:col-span-2 space-y-12">
                    <CourseMainContent course={course} isVideoPlaying={isVideoPlaying} setIsVideoPlaying={setIsVideoPlaying} />
                </div>
                <div className="lg:col-span-1 mt-12">
                    {/* Sidebar with Course Details */}
                    <CourseSidebar course={course} setIsVideoPlaying={setIsVideoPlaying} />
                </div>
            </div>

            {/* Related Courses */}
            <CourseRelated relatedCourses={course.relatedCourses} />

            {/* Call to Action */}
            <CourseCallToAction course={course} />
        </div>
    );
}
