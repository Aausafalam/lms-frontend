"use client";

import { Breadcrumb } from "@/components/Breadcrumb";
import { LayoutDashboard, Briefcase } from "lucide-react";
import { SidebarNavigation } from "./components/sidebar";
import LessonDetailsContent from "./components/content";
import { useState } from "react";

export default function LessonDetailsPage() {
    const [activeTab, setActiveTab] = useState("overview");

    const breadcrumbItems = [
        {
            title: "Course",
            href: "/courses",
            icon: <LayoutDashboard className="h-3.5 w-3.5" />,
        },
        {
            title: "Modules",
            href: "/modules",
            icon: <LayoutDashboard className="h-3.5 w-3.5" />,
        },
        {
            title: "Lessons",
            href: "/lessons",
            icon: <LayoutDashboard className="h-3.5 w-3.5" />,
        },
        {
            title: "Lesson Details",
            href: "lessons/details/1",
            icon: <Briefcase className="h-3.5 w-3.5" />,
        },
    ];

    return (
        <div className="min-h-screen transition-colors duration-300">
            <div className="">
                <Breadcrumb items={breadcrumbItems} className="mb-4" />

                <div className="flex gap-4">
                    {/* Sidebar - Sticky on desktop */}
                    <div className="lg:col-span-1">
                        <SidebarNavigation activeTab={activeTab} setActiveTab={setActiveTab} />
                    </div>

                    {/* Main Content - Scrollable */}
                    <div className="lg:col-span-4">
                        <div className="dark:border-gray-700 overflow-hidden">
                            <div className="max-h-[85vh] overflow-y-auto pr-2 pb-4">
                                <LessonDetailsContent activeTab={activeTab} />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Mobile Tab Navigation */}
                <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 p-4">
                    <div className="flex justify-around">
                        {["overview", "content", "assignments", "quiz"].map((tab) => (
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
