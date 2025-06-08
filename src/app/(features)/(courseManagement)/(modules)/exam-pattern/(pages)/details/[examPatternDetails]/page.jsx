"use client";

import { Breadcrumb } from "@/components/Breadcrumb";
import { LayoutDashboard, FileText, Settings } from "lucide-react";
import ExamPatternDetailsContent from "./components/content";
import { useState } from "react";
import { useQueryParams } from "@/lib/hooks/useQuery";

/**
 * ExamPatternDetailsPage Component
 * Main page for displaying detailed exam pattern information
 */
export default function ExamPatternDetailsPage({}) {
    const [activeTab, setActiveTab] = useState("overview");
    const { courseId } = useQueryParams();
    // Enhanced breadcrumb with better navigation structure
    const breadcrumbItems = [
        {
            title: "Course",
            href: "/courses",
            icon: <LayoutDashboard className="h-3.5 w-3.5" />,
        },
        {
            title: "Exam Patterns",
            href: `/courses/details/${courseId}`,
            icon: <FileText className="h-3.5 w-3.5" />,
        },
        {
            title: "Pattern Details",
            // href: `/exam-patterns/details/1`,
            icon: <Settings className="h-3.5 w-3.5" />,
        },
    ];

    return (
        <div className="transition-colors duration-300">
            {/* Header */}
            <Breadcrumb items={breadcrumbItems} className="mb-4" />
            {/* Main Content Area */}
            <div className="flex gap-4 w-full">
                {/* <SidebarNavigation activeTab={activeTab} setActiveTab={setActiveTab} /> */}
                {/* Content Area */}
                <div className="max-w-[1225px] m-auto">
                    <ExamPatternDetailsContent activeTab={activeTab} />
                </div>
            </div>
        </div>
    );
}
