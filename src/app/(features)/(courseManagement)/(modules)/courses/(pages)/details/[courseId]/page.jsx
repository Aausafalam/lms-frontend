"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { SidebarNavigation } from "./components/sidebar";
import CourseDetailsContent from "./components/content";
import CourseDetailsHeader from "./components/header";
import { ErrorBoundary } from "@/components/ErrorBoundary";

/**
 * Course Details Page Component
 * @description Main page component for displaying course details with tabbed navigation
 */
export default function CourseDetailsPage() {
    const [activeTab, setActiveTab] = useState("overview");
    const [isMobile, setIsMobile] = useState(false);
    const { courseId } = useParams();

    // Check if mobile view
    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 1024);
        };

        checkMobile();
        window.addEventListener("resize", checkMobile);
        return () => window.removeEventListener("resize", checkMobile);
    }, []);

    if (!courseId) {
        return (
            <div className="flex items-center justify-center h-64">
                <p className="text-gray-500">Course ID is required</p>
            </div>
        );
    }

    return (
        <ErrorBoundary>
            <div className="transition-colors duration-300  max-w-[1400px]">
                <CourseDetailsHeader courseId={courseId} />

                <div className="flex flex-col lg:flex-row gap-4 lg:gap-6">
                    {/* Mobile/Tablet: Horizontal scrolling navigation */}
                    {isMobile && (
                        <div className="w-full mb-4">
                            <SidebarNavigation activeTab={activeTab} setActiveTab={setActiveTab} />
                        </div>
                    )}

                    {/* Desktop: Sidebar navigation */}
                    {!isMobile && (
                        <div className="lg:w-48 flex-shrink-0">
                            <SidebarNavigation activeTab={activeTab} setActiveTab={setActiveTab} />
                        </div>
                    )}

                    {/* Main content */}
                    <div className="flex-1 min-w-0">
                        <CourseDetailsContent activeTab={activeTab} />
                    </div>
                </div>
            </div>
        </ErrorBoundary>
    );
}
