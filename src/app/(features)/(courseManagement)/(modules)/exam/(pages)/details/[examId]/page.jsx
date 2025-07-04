"use client";

import { Breadcrumb } from "@/components/Breadcrumb";
import { LayoutDashboard, FileText, Settings } from "lucide-react";
import { useState } from "react";
import { useQueryParams } from "@/lib/hooks/useQuery";
import ExamContent from "./components/content";
import { SidebarNavigation } from "./components/sidebar";

/**
 * ExamDetailsPage Component
 * Main page for displaying detailed exam  information
 */
export default function ExamDetailsPage({}) {
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
            title: "Exam",
            href: `/courses/details/${courseId}`,
            icon: <FileText className="h-3.5 w-3.5" />,
        },
        {
            title: "Exam Details",
            icon: <Settings className="h-3.5 w-3.5" />,
        },
    ];

    return (
        <div className="min-h-screen transition-colors duration-300">
            <div className="">
                <Breadcrumb items={breadcrumbItems} className="mb-4" />

                <div className="flex gap-4">
                    {/* Sidebar - Sticky on desktop */}
                    <div className="">
                        <SidebarNavigation activeTab={activeTab} setActiveTab={setActiveTab} />
                    </div>

                    {/* Main Content - Scrollable */}
                    <div className="w-full">
                        <div className="dark:border-gray-700 overflow-hidden w-full">
                            <div className="w-full">
                                <ExamContent activeTab={activeTab} />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Mobile Tab Navigation */}
                <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 p-4">
                    <div className="flex justify-around">
                        {["overview", "questions"].map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                                    activeTab === tab
                                        ? "bg-orange-100 text-orange-700 dark:bg-orange-900 dark:text-orange-300"
                                        : "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                                }`}
                            >
                                {tab.charAt(0).toUpperCase() + tab.slice(1)}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
