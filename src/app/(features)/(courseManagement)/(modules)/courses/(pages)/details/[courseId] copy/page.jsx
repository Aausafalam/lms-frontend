"use client";

import { useState, useEffect } from "react";
import { CourseHero } from "./components/course-hero";
import { CourseContent } from "./components/course-content";
import { CourseFooterBanner } from "./components/course-footer-banner";
import { courseData } from "./data/course-data";
import { Breadcrumb } from "@/components/Breadcrumb";
import { Briefcase, LayoutDashboard } from "lucide-react";
import { SidebarNavigation } from "./components/sidebar";

export default function CourseDetailsPage({ course = courseData }) {
    const [isVideoPlaying, setIsVideoPlaying] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    // Handle scroll effect for premium feel
    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 100);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const breadcrumbItems = [
        {
            title: "Courses",
            href: "/courses",
            icon: <LayoutDashboard className="h-3.5 w-3.5" />,
        },
        {
            title: "Course Details",
            href: `courses/details/1`,
            icon: <Briefcase className="h-3.5 w-3.5" />,
        },
    ];

    return (
        <div className="transition-colors duration-300">
            <Breadcrumb items={breadcrumbItems} className={"mb-4"} />

            {/* <div className="flex gap-4"> */}
            {/* <SidebarNavigation activeSection={"overview"} />
                <div> */}
            {/* Hero Section with Course Banner */}
            <CourseHero course={course} isVideoPlaying={isVideoPlaying} setIsVideoPlaying={setIsVideoPlaying} />

            {/* Main Content */}
            <CourseContent course={course} isVideoPlaying={isVideoPlaying} setIsVideoPlaying={setIsVideoPlaying} />

            {/* Footer Banner */}
            <CourseFooterBanner course={course} />
            {/* </div> */}
            {/* </div> */}
        </div>
    );
}
