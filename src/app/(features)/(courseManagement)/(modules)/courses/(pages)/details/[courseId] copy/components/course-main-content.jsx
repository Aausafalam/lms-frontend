"use client";

import { useState, useEffect, useRef } from "react";
import { CourseProgress } from "./sections/course-progress";
import { CourseInstructorQuick } from "./sections/course-instructor-quick";
import { CourseStats } from "./sections/course-stats";
import { CourseOverview } from "./sections/course-overview";
import { CourseCurriculum } from "./sections/course-curriculum";
import { CourseInstructor } from "./sections/course-instructor";
import { CourseReviews } from "./sections/course-reviews";
import { CourseFAQ } from "./sections/course-faq";
import { ChevronUpSquare, FileUser, FunctionSquare, RectangleVertical, SparklesIcon, Star, Table2Icon, TableOfContents, User } from "lucide-react";
import Tabs from "@/components/tab";

export function CourseMainContent({ course, isVideoPlaying, setIsVideoPlaying }) {
    const [activeTab, setActiveTab] = useState({ id: "overview", label: "Overview" });
    const tabsRef = useRef(null);

    const tabs = [
        {
            id: "overview",
            label: "Overview",
            icon: <SparklesIcon className="size-4" />,
            content: <CourseOverview course={course} />,
        },
        {
            id: "curriculum",
            label: "Curriculum",
            icon: <FileUser className="size-4" />,
            content: <CourseCurriculum curriculum={course.curriculum} />,
        },
        {
            id: "instructor",
            label: "Instructor",
            icon: <User className="size-4" />,
            content: <CourseInstructor instructor={course.instructor} />,
        },
        {
            id: "reviews",
            label: "Reviews",
            icon: <Star className="size-4" />,
            content: <CourseReviews reviews={course.reviews} />,
        },
        {
            id: "faq",
            label: "Faq",
            icon: <TableOfContents className="size-4" />,
            content: <CourseFAQ faqs={course.faqs} />,
        },
    ];

    // Animate tab indicator
    useEffect(() => {
        if (tabsRef.current) {
            const activeTabElement = tabsRef.current.querySelector(`[data-tab="${activeTab}"]`);
            const indicator = tabsRef.current.querySelector(".tab-indicator");

            if (activeTabElement && indicator) {
                const { offsetLeft, offsetWidth } = activeTabElement;
                indicator.style.left = `${offsetLeft}px`;
                indicator.style.width = `${offsetWidth}px`;
            }
        }
    }, [activeTab]);

    return (
        <>
            {/* Course Content Tabs */}
            <div className="mb-12 mt-2" id="overview">
                <Tabs defaultTab={activeTab} tabs={tabs} variant={"underline"} onTabChange={(tab) => setActiveTab(tab)} />
            </div>
        </>
    );
}
