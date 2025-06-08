"use client";

import { Breadcrumb } from "@/components/Breadcrumb";
import { LayoutDashboard, Briefcase } from "lucide-react";
import { SidebarNavigation } from "./components/sidebar";
import ModuleDetailsContent from "./components/content";
import { useState } from "react";

export default function ModuleDetailsPage() {
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
            title: "Module Details",
            href: "modules/details/1",
            icon: <Briefcase className="h-3.5 w-3.5" />,
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
                                <ModuleDetailsContent activeTab={activeTab} />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Mobile Tab Navigation */}
                <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 p-4">
                    <div className="flex justify-around">
                        {["overview", "content", "lessons", "assignments", "quiz"].map((tab) => (
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
