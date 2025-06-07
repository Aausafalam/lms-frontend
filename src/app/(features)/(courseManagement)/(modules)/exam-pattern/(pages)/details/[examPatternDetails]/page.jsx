"use client";

import { Breadcrumb } from "@/components/Breadcrumb";
import { LayoutDashboard, FileText, Settings } from "lucide-react";
import { SidebarNavigation } from "./components/sidebar";
import ExamPatternDetailsContent from "./components/content";
import { useState } from "react";

/**
 * ExamPatternDetailsPage Component
 * Main page for displaying detailed exam pattern information
 */
export default function ExamPatternDetailsPage({}) {
    const [activeTab, setActiveTab] = useState("overview");

    // Enhanced breadcrumb with better navigation structure
    const breadcrumbItems = [
        {
            title: "Dashboard",
            href: "/dashboard",
            icon: <LayoutDashboard className="h-3.5 w-3.5" />,
        },
        {
            title: "Exam Patterns",
            href: "/exam-patterns",
            icon: <FileText className="h-3.5 w-3.5" />,
        },
        {
            title: "Pattern Details",
            href: `/exam-patterns/details/1`,
            icon: <Settings className="h-3.5 w-3.5" />,
        },
    ];

    return (
        <div className="transition-colors duration-300">
            {/* Header */}
            <Breadcrumb items={breadcrumbItems} className="mb-4" />
            {/* Main Content Area */}
            <div className="flex gap-4">
                <SidebarNavigation activeTab={activeTab} setActiveTab={setActiveTab} />
                {/* Content Area */}
                <div className="w-full">
                    <ExamPatternDetailsContent activeTab={activeTab} />
                </div>
            </div>
        </div>
    );
}
