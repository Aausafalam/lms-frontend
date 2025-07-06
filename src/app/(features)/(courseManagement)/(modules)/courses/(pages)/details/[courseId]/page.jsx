"use client";

import { useState } from "react";
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
    const { courseId } = useParams();

    if (!courseId) {
        return (
            <div className="flex items-center justify-center h-64">
                <p className="text-gray-500">Course ID is required</p>
            </div>
        );
    }

    return (
        <ErrorBoundary>
            <div className="transition-colors duration-300 max-w-[1400px]">
                <CourseDetailsHeader courseId={courseId} />

                <div className="flex gap-4">
                    <SidebarNavigation activeTab={activeTab} setActiveTab={setActiveTab} />
                    <div className="w-full">
                        <CourseDetailsContent activeTab={activeTab} />
                    </div>
                </div>
            </div>
        </ErrorBoundary>
    );
}
