"use client";

import { useState, useEffect } from "react";
import { CourseHero } from "./components/course/course-hero";
import { CourseNavigation } from "./components/course/course-navigation";
import { CourseContent } from "./components/course/course-content";
import { CourseFooterBanner } from "./components/course/course-footer-banner";
import { courseData } from "./data/course-data";

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

    return (
        <div className="transition-colors duration-300">
            {/* Hero Section with Course Banner */}
            <CourseHero course={course} isVideoPlaying={isVideoPlaying} setIsVideoPlaying={setIsVideoPlaying} />

            {/* Course Navigation Bar */}
            {/* <CourseNavigation scrolled={scrolled} /> */}

            {/* Main Content */}
            <CourseContent course={course} isVideoPlaying={isVideoPlaying} setIsVideoPlaying={setIsVideoPlaying} />

            {/* Footer Banner */}
            <CourseFooterBanner course={course} />
        </div>
    );
}
